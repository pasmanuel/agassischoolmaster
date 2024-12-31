let currentSection = 1;

function validateCurrentSection() {
    const currentFormSection = document.querySelector('.form-section.active');
    const requiredFields = currentFormSection.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach((field) => {
        const errorMessage = field.nextElementSibling;
        if (errorMessage && errorMessage.classList.contains('error-message')) {
            errorMessage.remove();
        }
        field.classList.remove('error');

        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');

            const error = document.createElement('span');
            error.className = 'error-message';
            error.textContent = 'This field is required';
            field.parentNode.appendChild(error);
        }
    });

    return isValid;
}

function nextSection() {
    // Only validate if we're not on the last section
    if (currentSection < document.querySelectorAll('.form-section').length && !validateCurrentSection()) {
        return; // Prevent navigating to the next section if validation fails
    }

    const totalSections = document.querySelectorAll('.form-section').length;
    if (currentSection < totalSections) {
        currentSection++;
        updateNavigation();
        navigateTo(currentSection);
    }
}

function prevSection() {
    // No validation on the "Back" button; simply move to the previous section
    if (currentSection > 1) {
        currentSection--;
        updateNavigation();
        navigateTo(currentSection);
    }
}

function navigateTo(sectionNumber) {
    const sections = document.querySelectorAll('.form-section');
    const navLinks = document.querySelectorAll('.side-nav a');

    // Remove the 'active' class from all sections and nav links
    sections.forEach((section) => section.classList.remove('active'));
    navLinks.forEach((link) => link.classList.remove('highlight'));

    // Add the 'active' class to the current section
    const selectedSection = document.getElementById('section' + sectionNumber);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }

    // Highlight the corresponding nav link
    if (navLinks[sectionNumber - 1]) {
        navLinks[sectionNumber - 1].classList.add('highlight');
    }
}

function updateNavigation() {
    const prevButton = document.querySelector('.form-navigation .secondary');
    const nextButton = document.querySelector('.form-navigation .primary');

    const totalSections = document.querySelectorAll('.form-section').length;

    prevButton.disabled = currentSection === 1;
    nextButton.textContent = currentSection === totalSections ? 'Submit' : 'Next';
}

function validateAllSections() {
    const sections = document.querySelectorAll('.form-section');
    let allValid = true;

    sections.forEach((section) => {
        const requiredFields = section.querySelectorAll('[required]');
        requiredFields.forEach((field) => {
            if (!field.value.trim()) {
                allValid = false;
                field.classList.add('error');

                const error = document.createElement('span');
                error.className = 'error-message';
                error.textContent = 'This field is required';
                field.parentNode.appendChild(error);
            }
        });
    });

    return allValid;
}

function handleSubmit(event) {
    event.preventDefault(); // Prevent form submission
    
    // Only validate on form submission (not during "Back" or "Next")
    if (!validateAllSections()) {
        alert("Please fill in all required fields before submitting.");
        return;
    }

    alert("Form submitted successfully!");
}
