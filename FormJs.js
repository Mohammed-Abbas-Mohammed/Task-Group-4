document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cutomerData');
    const message = document.getElementById('errorMessages');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const fullName = form.fName.value.trim();
        const email = form.Email.value.trim();
        const phone = form.phone.value.trim();
        
        if (!validateForm(fullName, email, phone)) {
            message.textContent = 'Please fill out all fields correctly.';
            message.style.color = 'red';
            return;
        }
        
        if (isDuplicate(fullName, email, phone)) {
            message.textContent = 'Duplicate entry detected.';
            message.style.color = 'red';
            return;
        }

        saveEntry(fullName, email, phone);
        message.textContent = 'Form submitted successfully!';
        form.reset();
    });
});

function validateForm(fullName, email, phone) {
    const nameRegex = /^[a-zA-Z\s]+$/;
    const phoneRegex =/^01(0|1|2|5)[0-9]{8}$/;  
    
    return nameRegex.test(fullName) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && phoneRegex.test(phone);
}

function isDuplicate(fullName, email, phone) {
    const entries = JSON.parse(localStorage.getItem('formEntries')) || [];
    return entries.some(entry => entry.fullName === fullName && entry.email === email && entry.phone === phone);
}

function saveEntry(fullName, email, phone) {
    const entries = JSON.parse(localStorage.getItem('formEntries')) || [];
    entries.push({ fullName, email, phone });
    localStorage.setItem('formEntries', JSON.stringify(entries));
}
