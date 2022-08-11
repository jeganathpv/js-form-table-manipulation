
// Properties for form validation
isValidForm = false;
isValidName = false;
isValidEmail = false;
isValidMobileNumber = false;

adults = []
children = []


function activateMenu($event) {
    let wholeMenuItem = document.getElementById('menuItems');
    for(let menu of wholeMenuItem.children){
        menu.className = 'menu'
    }
    $event.classList.add('active')
}

function rerenderForm() {
    isValidForm = false;
    isValidName = false;
    isValidEmail = false;
    isValidMobileNumber = false;
    document.getElementById('emailValidationMsg').style.display = 'none'
    document.getElementById('nameValidationMsg').style.display = 'none'
    document.getElementById('show-max-length').style.display = 'none'
    document.getElementById('show-char-count').style.display = 'none'
    document.getElementById('nameValidationMsg').style.display = 'none'
    document.getElementById('mobileValidationMsg').style.display = 'none'
    document.getElementById('successRegistration').style.display = 'none'
    document.getElementById('invalidForm').style.display = 'none'

    // Show hide table/form
    document.getElementById('user-details').style.display = 'none'
    document.getElementById('contact-form').style.display = ''

    
}

function onSubmitContactForm() {
    let form = document.getElementById('contact');
    if(!(isValidEmail && isValidName && isValidMobileNumber && form['dob'].value != '' && form['address'].value != null)){
        document.getElementById('invalidForm').style.display = ''
        return;
    }

    let usersAge = getAgeFromDateString(form['dob'].value)
    let user = {
        name: form['name'].value,
        mobile: form['mobile'].value,
        email: form['email'].value,
        address: form['address'].value,
        dob: form['dob'].value,
        age: usersAge
    }
    if(isAdult(usersAge)){
        adults.push(user);
    }else{
        children.push(user);
    }
    document.getElementById('successRegistration').style.display = ''

}

function validateEmail($event) {
    let value = $event.value.toString();
    isValidEmail = value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,3}/)
    if(!isValidEmail) {
        document.getElementById('emailValidationMsg').style.display = ''
    }else{
        hideEmailValidation()
    }
}

function hideEmailValidation() {
    document.getElementById('emailValidationMsg').style.display = 'none'
}

function validateMobileNumber($event) {
    let value = $event.value.toString();
    let hasMatch = value.match(/^[6-9][0-9]{9}/);
    isValidMobileNumber == hasMatch != null && value.length === 10
    if(!(hasMatch != null && value.length === 10)) {
        document.getElementById('mobileValidationMsg').style.display = ''
    }else{
        hideMobileValidation()
    }
}

function hideMobileValidation() {
    document.getElementById('mobileValidationMsg').style.display = 'none'
}

function renderTableContent(isAdult) {


        // Show hide table/form
        document.getElementById('user-details').style.display = ''
        document.getElementById('contact-form').style.display = 'none'
}


function getAgeFromDateString(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function isAdult(age) {
    return age >= 18;
}