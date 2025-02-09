// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// API Endpoints
const API_ENDPOINTS = {
    students: {
        list: `${API_BASE_URL}/students`,
        create: `${API_BASE_URL}/students`,
        update: (id) => `${API_BASE_URL}/students/${id}`,
        delete: (id) => `${API_BASE_URL}/students/${id}`,
        get: (id) => `${API_BASE_URL}/students/${id}`
    },
    checkIn: {
        create: `${API_BASE_URL}/check-in`,
        verify: (rfid) => `${API_BASE_URL}/check-in/verify/${rfid}`
    },
    visits: {
        list: `${API_BASE_URL}/visits`
    },
    leaderboard: {
        get: `${API_BASE_URL}/leaderboard`
    }
};

// Toast Notification Helper
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.style.display = 'block';

    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// Error Handler
function handleError(error) {
    console.error('API Error:', error);
    showToast(error.message || 'An error occurred', 'error');
} 