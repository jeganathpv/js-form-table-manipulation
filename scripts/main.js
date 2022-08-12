
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
    if(!(validateEmail() && validateName() && validateMobileNumber() && form['dob'].value != '' && form['address'].value != null)){
        document.getElementById('invalidForm').style.display = ''
        return;
    }else{
        document.getElementById('invalidForm').style.display = 'none'
    }

    let usersAge = getAgeFromDateString(form['dob'].value)
    let usersEmail = form['email'].value
    let user = {
        name: form['name'].value,
        mobile: form['mobile'].value,
        email: usersEmail,
        address: form['address'].value,
        dob: form['dob'].value,
        age: usersAge
    }
    if(isAdult(usersAge)){
        if(adults.find(user => user.email === usersEmail)){
            document.getElementById('alreadyExists').style.display = ''
            return
        }
        adults.push(user);
    }else{
        if(children.find(user => user.email === usersEmail)){
            document.getElementById('alreadyExists').style.display = ''
            return
        }
        children.push(user);
    }

    // Show/hide message
    document.getElementById('invalidForm').style.display = 'none'
    document.getElementById('alreadyExists').style.display = 'none'
    document.getElementById('successRegistration').style.display = ''

    setTimeout(() => {
        document.getElementById("contact").reset();
        document.getElementById('successRegistration').style.display = 'none'
    }, 3000)
}

function validateName() {
    let value = document.getElementById("name-field").value
    let result = value.length <= 32
    if(result){
        hideNameValidation()
    }else{
        document.getElementById('nameValidationMsg').style.display = ''
    }
    return result
}

function hideNameValidation(){
    document.getElementById('nameValidationMsg').style.display = 'none'
}

function validateEmail() {
    let value = document.getElementById("email-field").value
    isValidEmail = value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,3}/)
    if(!isValidEmail) {
        document.getElementById('emailValidationMsg').style.display = ''
        return false
    }else{
        hideEmailValidation()
        return true
    }
}

function hideEmailValidation() {
    document.getElementById('emailValidationMsg').style.display = 'none'
}

function validateMobileNumber() {
    let value = document.getElementById("mobile-field").value
    let hasMatch = value.match(/^[6-9][0-9]{9}/);
    if(!(hasMatch != null && value.length === 10)) {
        document.getElementById('mobileValidationMsg').style.display = ''
        return false
    }else{
        hideMobileValidation()
        return true
    }
}

function hideMobileValidation() {
    document.getElementById('mobileValidationMsg').style.display = 'none'
}

function onFocusAddressField($event){
    let value = $event.value;
    if(value.length < 120) {
        document.getElementById('show-char-count').style.display = ``
        document.getElementById('show-max-length').style.display = 'none'
        document.getElementById('show-char-count').innerHTML = `${value.length}/120 characters used`
    }else{
        document.getElementById('show-char-count').style.display = 'none'
        document.getElementById('show-max-length').style.display = ''
    }
}

function onBlurAddressField(){
    document.getElementById('show-max-length').style.display = 'none'
    document.getElementById('show-char-count').style.display = 'none'
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