let currentSection = 1;

function updateNavigation() {
    const sections = document.querySelectorAll('.form-section');
    const navLinks = document.querySelectorAll('.side-nav ul li a');

    sections.forEach((section, index) => {
        section.classList.remove('active');
        if (index + 1 === currentSection) {
            section.classList.add('active');
        }
    });

    navLinks.forEach((link, index) => {
        link.classList.remove('active');
        if (index + 1 === currentSection) {
            link.classList.add('active');
        }
    });
}

function validateCurrentSection() {
    // Get the current section
    const currentFormSection = document.querySelector('.form-section.active');

    // Find all required fields in the current section
    const requiredFields = currentFormSection.querySelectorAll('[required]');
    let isValid = true;

    // Validate each field
    requiredFields.forEach((field) => {
        // Reset previous error message and styles
        const errorMessage = field.nextElementSibling;
        if (errorMessage && errorMessage.classList.contains('error-message')) {
            errorMessage.remove();
        }
        field.classList.remove('error');

        if (!field.value.trim()) {
            isValid = false;

            // Highlight invalid fields
            field.classList.add('error');

            // Create and display an error message
            const error = document.createElement('span');
            error.className = 'error-message';
            error.textContent = 'This field is required';
            field.parentNode.appendChild(error);
        }
    });

    return isValid;
}

function nextSection() {
    // Validate the current section before moving to the next
    if (!validateCurrentSection()) {
        return; // Stop navigation if validation fails
    }

    const totalSections = document.querySelectorAll('.form-section').length;
    if (currentSection < totalSections) {
        currentSection++;
        updateNavigation();
    }
}
