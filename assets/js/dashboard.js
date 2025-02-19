document.addEventListener('DOMContentLoaded', () => {
    const rfidInput = document.getElementById('rfidInput');
    const scanButton = document.querySelector('.scan-button');
    const scanStatus = document.getElementById('scanStatus');
    const scanResult = document.getElementById('scanResult');
    const studentName = document.getElementById('studentName');
    const studentCourse = document.getElementById('studentCourse');
    const studentYearSection = document.getElementById('studentYearSection');
    const leaderboardList = document.getElementById('leaderboardList');

    let lastScanTime = 0;
    const SCAN_COOLDOWN = 2000; // 2 seconds cooldown between scans

    // Handle RFID Input and Button Click
    async function handleCheckIn(rfidNumber) {
        const currentTime = Date.now();
        if (currentTime - lastScanTime < SCAN_COOLDOWN) {
            showToast('Please wait before scanning again', 'error');
            return;
        }
        lastScanTime = currentTime;

        try {
            // Validate RFID
            if (!rfidNumber || rfidNumber.length < 8) {
                throw new Error('Invalid RFID number. Must be at least 8 characters.');
            }

            // Update status
            scanStatus.textContent = 'Processing...';
            scanResult.classList.add('hidden');

            // Make API request
            const response = await fetch(API_ENDPOINTS.checkIn.create, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    rfid_number: rfidNumber,
                    device_id: 'MAIN_SCANNER',
                    check_in_time: new Date().toISOString()
                })
            });

            // Parse response
            let data;
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                throw new Error('Invalid response format from server');
            }

            // Handle non-200 responses
            if (!response.ok) {
                throw new Error(data.message || 'Failed to check in');
            }

            // Clear input and show success
            rfidInput.value = '';
            rfidInput.focus();

            // Update UI with success
            scanStatus.textContent = 'Check-in successful!';
            scanStatus.style.backgroundColor = 'var(--success-color)';
            scanStatus.style.color = 'white';

            // Show student info
            if (data.data && data.data.student) {
                scanResult.classList.remove('hidden');
                studentName.textContent = `${data.data.student.first_name} ${data.data.student.last_name}`;
                studentCourse.textContent = data.data.student.course || '-';
                studentYearSection.textContent = 
                    `${data.data.student.year_level || '-'} - ${data.data.student.section || '-'}`;
            }

            // Show success toast
            showToast('Check-in successful');

            // Refresh leaderboard
            await loadLeaderboard();

        } catch (error) {
            console.error('Check-in error:', error);
            
            // Update UI with error
            scanStatus.textContent = error.message || 'Error checking in';
            scanStatus.style.backgroundColor = 'var(--danger-color)';
            scanStatus.style.color = 'white';
            scanResult.classList.add('hidden');
            
            // Show error toast
            showToast(error.message || 'Failed to check in', 'error');
        }

        // Reset status after delay
        setTimeout(() => {
            scanStatus.textContent = 'Ready to scan';
            scanStatus.style.backgroundColor = 'var(--background-color)';
            scanStatus.style.color = 'var(--text-primary)';
        }, 3000);
    }

    // Create a form wrapper for the RFID input
    const scannerForm = document.createElement('form');
    scannerForm.className = 'scanner-input';
    rfidInput.parentNode.replaceChild(scannerForm, rfidInput);
    scannerForm.appendChild(rfidInput);
    scannerForm.appendChild(scanButton);

    // Handle form submission
    scannerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const rfidNumber = rfidInput.value.trim();
        handleCheckIn(rfidNumber);
    });

    // Remove the input event listener and only handle button click through form submission
    scanButton.type = 'submit';

    // Load Leaderboard
    async function loadLeaderboard() {
        try {
            const response = await fetch(API_ENDPOINTS.leaderboard.get);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to load leaderboard');
            }

            // Clear existing list
            leaderboardList.innerHTML = '';

            // Create leaderboard items
            data.data.forEach((item, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${item.full_name}</td>
                    <td>${item.course || '-'}</td>
                    <td>${item.year_level || '-'} - ${item.section || '-'}</td>
                    <td>${item.visit_count}</td>
                `;
                leaderboardList.appendChild(row);
            });
        } catch (error) {
            console.error('Leaderboard error:', error);
            showToast('Failed to load leaderboard', 'error');
        }
    }

    // Initial setup
    loadLeaderboard();
    rfidInput.focus();
    scanStatus.textContent = 'Ready to scan';
}); 