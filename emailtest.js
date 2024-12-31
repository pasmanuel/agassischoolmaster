// (function(){
//     emailjs.init("e-lTUtMtrPr7emzfq");
// })();

// function sendMail(params) {
//     emailjs.send("service_5cr6hxg", "template_xrujnn7", params)
//         .then(function(response) {
//             console.log('SUCCESS!', response.status, response.text);
//             alert('Form submitted successfully');
//         })
//         .catch(function(error) {
//             console.error('FAILED...', error);
//             alert('Form submission failed. Please try again.');
//         });
// }

// function handleSubmit(event) {
//     event.preventDefault(); 

    
//     let params = {
//         firstname: document.getElementById('firstname').value,
//         middlename: document.getElementById('middlename').value,
//         lastname: document.getElementById('lastname').value,
//         dob: document.getElementById('dob').value,
//         pob: document.getElementById('pob').value,
//         gender: document.getElementById('gender').value,
//         religion: document.getElementById('religion').value,
//         address: document.getElementById('address').value,
//         telephone: document.getElementById('telephone').value,
//         email: document.getElementById('email').value,
//         ghanacard: document.getElementById('ghanacard').value,
//         grade: document.getElementById('grade').value,
//         previousSchool: document.getElementById('previousSchool').value,
//         fathername: document.getElementById('fathersname').value, // Fix here
//         faddress: document.getElementById('faddress').value,
//         fjob: document.getElementById('fjob').value,
//         freligion: document.getElementById('freligion').value,
//         fphone: document.getElementById('fphone').value,
//         fmail: document.getElementById('fmail').value,
//         mothername: document.getElementById('mothersname').value, // Fix here
//         maddress: document.getElementById('maddress').value,
//         mjob: document.getElementById('mjob').value,
//         mreligion: document.getElementById('mreligion').value,
//         mphone: document.getElementById('mphone').value,
//         mmail: document.getElementById('mmail').value,
//         gname: document.getElementById('gname').value,
//         gaddress: document.getElementById('gaddress').value,
//         gjob: document.getElementById('gjob').value,
//         greligion: document.getElementById('greligion').value,
//         gphone: document.getElementById('gphone').value,
//         gmail: document.getElementById('gmail').value,
//         econtact: document.getElementById('econtact').value,
//         ephone: document.getElementById('ephone').value,
//         erelationship: document.getElementById('erelationship').value,
//         secontact: document.getElementById('secontact').value,
//         sephone: document.getElementById('sephone').value,
//         serelationship: document.getElementById('serelationship').value,
//         acceptance: document.querySelector('input[name="i-accept"]:checked')?.value || "Not Specified"
//     };
    
      
//      console.log(params); 

//     sendMail(params);
// }



// Forms validation

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
    if (!validateCurrentSection()) {
        return; // Stop navigation if validation fails
    }

    const totalSections = document.querySelectorAll('.form-section').length;
    if (currentSection < totalSections) {
        currentSection++;
        updateNavigation();
        navigateTo(currentSection);
    }
}

function prevSection() {
    if (currentSection > 1) {
        currentSection--;
        updateNavigation();
        navigateTo(currentSection);
    }
}

function navigateTo(sectionNumber) {
    const sections = document.querySelectorAll('.form-section');
    sections.forEach((section) => {
        section.classList.remove('active');
    });

    const selectedSection = document.getElementById('section' + sectionNumber);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
}

function updateNavigation() {
    const prevButton = document.querySelector('.form-navigation .secondary');
    const nextButton = document.querySelector('.form-navigation .primary');

    if (currentSection === 1) {
        prevButton.disabled = true; // Disable the back button on the first section
    } else {
        prevButton.disabled = false;
    }

    const totalSections = document.querySelectorAll('.form-section').length;
    if (currentSection === totalSections) {
        nextButton.textContent = 'Submit'; // Change "Next" to "Submit" on the last section
    } else {
        nextButton.textContent = 'Next';
    }
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

function handleSubmit() {
    if (!validateAllSections()) {
        alert("Please fill in all required fields before submitting.");
        return;
    }

    alert("Form submitted successfully!");
    // Optionally, you can make the actual form submission to a server or API here
}
