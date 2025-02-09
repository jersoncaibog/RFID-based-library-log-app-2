document.addEventListener('DOMContentLoaded', () => {
    const studentModal = document.getElementById('studentModal');
    const studentForm = document.getElementById('studentForm');
    const addStudentBtn = document.getElementById('addStudentBtn');
    const closeBtn = document.querySelector('.close-btn');
    const cancelBtn = document.getElementById('cancelBtn');
    const searchInput = document.getElementById('searchInput');
    const courseFilter = document.getElementById('courseFilter');
    const yearFilter = document.getElementById('yearFilter');
    const sectionFilter = document.getElementById('sectionFilter');
    const studentsTableBody = document.getElementById('studentsTableBody');
    const pagination = document.getElementById('pagination');

    let currentPage = 1;
    const itemsPerPage = 10;
    let students = [];
    let filteredStudents = [];

    // Load initial data
    loadStudents();

    // Event Listeners
    addStudentBtn.addEventListener('click', () => {
        openModal();
    });

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    studentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(studentForm);
        const studentData = Object.fromEntries(formData.entries());

        try {
            const isEditing = studentForm.dataset.editing === 'true';
            const url = isEditing 
                ? API_ENDPOINTS.students.update(studentForm.dataset.studentId)
                : API_ENDPOINTS.students.create;
            
            const response = await fetch(url, {
                method: isEditing ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(studentData)
            });

            const data = await response.json();

            if (response.ok) {
                showToast(isEditing ? 'Student updated successfully' : 'Student added successfully');
                closeModal();
                loadStudents();
            } else {
                throw new Error(data.message || 'Failed to save student');
            }
        } catch (error) {
            handleError(error);
        }
    });

    // Search and Filter Event Listeners
    searchInput.addEventListener('input', filterStudents);
    courseFilter.addEventListener('change', filterStudents);
    yearFilter.addEventListener('change', filterStudents);
    sectionFilter.addEventListener('change', filterStudents);

    // Functions
    async function loadStudents() {
        try {
            const response = await fetch(API_ENDPOINTS.students.list);
            const data = await response.json();

            if (response.ok) {
                students = data.data;
                loadFilters(); // Load filters after getting student data
                filterStudents(); // Apply initial filtering
            } else {
                throw new Error(data.message || 'Failed to load students');
            }
        } catch (error) {
            handleError(error);
        }
    }

    function loadFilters() {
        // Get unique values
        const courses = new Set();
        const years = new Set();
        const sections = new Set();

        students.forEach(student => {
            if (student.course) courses.add(student.course);
            if (student.year_level) years.add(student.year_level);
            if (student.section) sections.add(student.section);
        });

        // Sort the values
        const sortedCourses = Array.from(courses).sort();
        const sortedYears = Array.from(years).sort();
        const sortedSections = Array.from(sections).sort();

        // Update course filter
        courseFilter.innerHTML = '<option value="">All Courses</option>';
        sortedCourses.forEach(course => {
            courseFilter.add(new Option(course, course));
        });

        // Update year filter
        yearFilter.innerHTML = '<option value="">All Years</option>';
        sortedYears.forEach(year => {
            yearFilter.add(new Option(year, year));
        });

        // Update section filter
        sectionFilter.innerHTML = '<option value="">All Sections</option>';
        sortedSections.forEach(section => {
            sectionFilter.add(new Option(section, section));
        });
    }

    function filterStudents() {
        const searchTerm = searchInput.value.toLowerCase();
        const courseValue = courseFilter.value;
        const yearValue = yearFilter.value;
        const sectionValue = sectionFilter.value;

        filteredStudents = students.filter(student => {
            const matchesSearch = 
                (student.first_name && student.first_name.toLowerCase().includes(searchTerm)) ||
                (student.last_name && student.last_name.toLowerCase().includes(searchTerm)) ||
                (student.rfid_number && student.rfid_number.toLowerCase().includes(searchTerm));
            
            const matchesCourse = !courseValue || student.course === courseValue;
            const matchesYear = !yearValue || student.year_level === yearValue;
            const matchesSection = !sectionValue || student.section === sectionValue;

            return matchesSearch && matchesCourse && matchesYear && matchesSection;
        });

        currentPage = 1;
        renderTable();
        renderPagination();
    }

    function renderTable() {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedStudents = filteredStudents.slice(start, end);

        studentsTableBody.innerHTML = '';

        paginatedStudents.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.rfid_number}</td>
                <td>${student.first_name} ${student.last_name}</td>
                <td>${student.course || '-'}</td>
                <td>${student.year_level || '-'}</td>
                <td>${student.section || '-'}</td>
                <td>
                    <div class="action-buttons">
                        <button onclick="editStudent(${student.student_id})" class="icon-button" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteStudent(${student.student_id})" class="icon-button" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            studentsTableBody.appendChild(row);
        });
    }

    function renderPagination() {
        const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
        pagination.innerHTML = '';

        if (totalPages <= 1) return;

        // Previous button
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderTable();
                renderPagination();
            }
        });
        pagination.appendChild(prevButton);

        // Page buttons
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.classList.toggle('active', i === currentPage);
            pageButton.addEventListener('click', () => {
                currentPage = i;
                renderTable();
                renderPagination();
            });
            pagination.appendChild(pageButton);
        }

        // Next button
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderTable();
                renderPagination();
            }
        });
        pagination.appendChild(nextButton);
    }

    function openModal(student = null) {
        studentForm.reset();
        if (student) {
            studentForm.dataset.editing = 'true';
            studentForm.dataset.studentId = student.student_id;
            Object.keys(student).forEach(key => {
                const input = studentForm.elements[key];
                if (input) input.value = student[key];
            });
            document.getElementById('modalTitle').textContent = 'Edit Student';
        } else {
            studentForm.dataset.editing = 'false';
            delete studentForm.dataset.studentId;
            document.getElementById('modalTitle').textContent = 'Add Student';
        }
        studentModal.classList.add('active');
    }

    function closeModal() {
        studentModal.classList.remove('active');
    }

    // Global functions for table actions
    window.editStudent = async (studentId) => {
        try {
            const response = await fetch(API_ENDPOINTS.students.get(studentId));
            const data = await response.json();

            if (response.ok) {
                openModal(data.data);
            } else {
                throw new Error(data.message || 'Failed to load student data');
            }
        } catch (error) {
            handleError(error);
        }
    };

    window.deleteStudent = async (studentId) => {
        if (!confirm('Are you sure you want to delete this student?')) {
            return;
        }

        try {
            const response = await fetch(API_ENDPOINTS.students.delete(studentId), {
                method: 'DELETE'
            });

            const data = await response.json();

            if (response.ok) {
                showToast('Student deleted successfully');
                loadStudents();
            } else {
                throw new Error(data.message || 'Failed to delete student');
            }
        } catch (error) {
            handleError(error);
        }
    };
}); 