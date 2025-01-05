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



































   
     // Multiselect Dropdown Functionality
     document.querySelectorAll('.select-box').forEach(selectBox => {
        const optionsContainer = selectBox.nextElementSibling;
    
        // Toggle the dropdown visibility
        selectBox.addEventListener('click', () => {
            optionsContainer.classList.toggle('show');
            selectBox.classList.toggle('active'); // Add active class for arrow rotation
        });
    
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!selectBox.contains(e.target) && !optionsContainer.contains(e.target)) {
                optionsContainer.classList.remove('show');
                selectBox.classList.remove('active'); // Remove active class for arrow rotation
            }
        });
    
        // Close dropdown on tab/escape key press
        selectBox.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' || e.key === 'Tab') {
                optionsContainer.classList.remove('show');
                selectBox.classList.remove('active'); // Remove active class for arrow rotation
            }
        });
    
        // Update the select box text when an option is selected
        optionsContainer.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const selectedOptions = Array.from(optionsContainer.querySelectorAll('input[type="checkbox"]:checked'))
                    .map(checkbox => checkbox.parentElement.textContent.trim())
                    .join(', ');
    
                // Update the select box text
                selectBox.textContent = selectedOptions || selectBox.getAttribute('data-placeholder');
            });
        });
    });
    
    // Form Navigation and Validation
    let currentSection = 1;
    
    function validateCurrentSection() {
        const currentFormSection = document.querySelector('.form-section.active');
        const requiredFields = currentFormSection.querySelectorAll('[required]');
        let isValid = true;
    
        // Clear all existing error messages
        currentFormSection.querySelectorAll('.error-message').forEach(error => error.remove());
    
        requiredFields.forEach((field) => {
            field.classList.remove('error');
    
            // Handle standard input fields
            if (field.tagName === 'INPUT' || field.tagName === 'SELECT') {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
    
                    const error = document.createElement('span');
                    error.className = 'error-message';
                    error.textContent = 'This field is required';
                    field.parentNode.appendChild(error);
                }
            }
    
            // Handle custom multiselect dropdowns
            if (field.classList.contains('select-box')) {
                const optionsContainer = field.nextElementSibling;
                const checkedOptions = optionsContainer.querySelectorAll('input[type="checkbox"]:checked');
    
                if (checkedOptions.length === 0) {
                    isValid = false;
                    field.classList.add('error');
    
                    const error = document.createElement('span');
                    error.className = 'error-message';
                    error.textContent = 'Please select at least one option';
                    field.parentNode.appendChild(error);
                }
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
                // Handle standard input fields
                if (field.tagName === 'INPUT' || field.tagName === 'SELECT') {
                    if (!field.value.trim()) {
                        allValid = false;
                        field.classList.add('error');
    
                        const error = document.createElement('span');
                        error.className = 'error-message';
                        error.textContent = 'This field is required';
                        field.parentNode.appendChild(error);
                    }
                }
    
                // Handle custom multiselect dropdowns
                if (field.classList.contains('select-box')) {
                    const optionsContainer = field.nextElementSibling;
                    const checkedOptions = optionsContainer.querySelectorAll('input[type="checkbox"]:checked');
    
                    if (checkedOptions.length === 0) {
                        allValid = false;
                        field.classList.add('error');
    
                        const error = document.createElement('span');
                        error.className = 'error-message';
                        error.textContent = 'Please select at least one option';
                        field.parentNode.appendChild(error);
                    }
                }
            });
        });
    
        return allValid;
    }
    
    function handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission
    
        // Validate all sections
        if (!validateAllSections()) {
            alert("Please fill in all required fields before submitting.");
            return;
        }
    
        // Get the form element
        const form = document.getElementById('admission-form');
    
        // Create a FormData object from the form
        const formData = new FormData(form);
    
        // Send the form data to Formspree using fetch
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert("Form submitted successfully!");
                form.reset(); // Optionally reset the form after submission
            } else {
                response.json().then(data => {
                    alert(`Error: ${data.error}`); // Show the error message from Formspree
                });
            }
        })
        .catch(error => {
            alert("There was an error submitting the form. Please try again.");
            console.error(error);
        });
    }
    
    
         
    
    
    
    