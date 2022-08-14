// To hold users while rendering table
currentUsers = [];
isAdult = true;

function activateMenu($event) {
    let wholeMenuItem = document.getElementById('menuItems');
    for (let menu of wholeMenuItem.children) {
        if (menu.className.includes('menu')) {
            menu.className = 'menu'
        }
    }
    document.getElementById('searchText').value = ''
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
    if (!(validateEmail() && validateName() && validateMobileNumber() && form['dob'].value != '' && form['address'].value != null)) {
        document.getElementById('invalidForm').style.display = ''
        return;
    } else {
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

    let users = getUsersFromStorage()
    if (users.find(user => user.email.toLowerCase() === usersEmail.toLowerCase())) {
        document.getElementById('alreadyExists').style.display = ''
        return
    }
    users.push(user);

    setUsersIntoStorage(users)

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
    if (result) {
        hideNameValidation()
    } else {
        document.getElementById('nameValidationMsg').style.display = ''
    }
    return result
}

function hideNameValidation() {
    document.getElementById('nameValidationMsg').style.display = 'none'
}

function validateEmail() {
    let value = document.getElementById("email-field").value
    isValidEmail = value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,3}/)
    if (!isValidEmail) {
        document.getElementById('emailValidationMsg').style.display = ''
        return false
    } else {
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
    if (!(hasMatch != null && value.length === 10)) {
        document.getElementById('mobileValidationMsg').style.display = ''
        return false
    } else {
        hideMobileValidation()
        return true
    }
}

function hideMobileValidation() {
    document.getElementById('mobileValidationMsg').style.display = 'none'
}

function onFocusAddressField($event) {
    let value = $event.value;
    if (value.length < 120) {
        document.getElementById('show-char-count').style.display = ``
        document.getElementById('show-max-length').style.display = 'none'
        document.getElementById('show-char-count').innerHTML = `${value.length}/120 characters used`
    } else {
        document.getElementById('show-char-count').style.display = 'none'
        document.getElementById('show-max-length').style.display = ''
    }
}

function onBlurAddressField() {
    document.getElementById('show-max-length').style.display = 'none'
    document.getElementById('show-char-count').style.display = 'none'
}

function getUsersFromStorage() {
    let users = localStorage.getItem('users')
    return users == null ? [] : JSON.parse(users)
}

function setUsersIntoStorage(users) {
    localStorage.setItem('users', JSON.stringify(users))
}

function setCurrentState(isAdult) {
    localStorage.setItem('isAdult', isAdult)
}

function renderTableContent() {

    // Show hide table/form
    document.getElementById('user-details').style.display = ''
    document.getElementById('contact-form').style.display = 'none'

    let hasSearchText = document.getElementById('searchText').value.length > 0
    if (currentUsers.length == 0) {
        document.getElementById('table-body').style.display = 'none'
        document.getElementById('no-content').style.display = hasSearchText ? 'none' : ''
        document.getElementById('no-search-content').style.display = hasSearchText ? '' : 'none'
        return
    }

    document.getElementById('no-search-content').style.display = 'none'
    document.getElementById('no-content').style.display = 'none'

    let tempTableBodyTemplate = ''
    for (let user of currentUsers) {
        tempTableBodyTemplate += `<tr class="${user.age % 2 ? 'odd-row' : 'even-row'}">
                    <td class="row-cell" title="${user.name}">${user.name}</td>
                    <td class="row-cell" title="${user.email}">${user.email}</td>
                    <td class="row-cell" title="${user.mobile}">${user.mobile}</td>
                    <td class="row-cell" title="${user.age}">${user.age}</td>
                    <td class="row-cell" title="${user.address}">${user.address}</td>
                    <td class="row-cell"><div onclick="deleteUserFromTable('${user.email}')"><i class="fa-solid fa-ban delete" title="Delete User"></i></div></td>
                </tr>`
    }

    if (hasSearchText || currentUsers.length > 5) {
        document.getElementById('search-user').style.display = ''
    } else {
        document.getElementById('search-user').style.display = 'none'
    }
    document.getElementById('table-body').style.display = ''
    document.getElementById('table-body').innerHTML = tempTableBodyTemplate;
}

function setUsersByState() {
    let users = getUsersFromStorage()
    let isAdult = localStorage.getItem('isAdult') === 'true'
    currentUsers = users.filter(user => isAdultUser(user.age) === isAdult)
}

function deleteUserFromTable(email) {
    let users = getUsersFromStorage()
    let index = users.findIndex(user => user.email == email)
    if (index > -1) {
        users.splice(index, 1);
        setUsersIntoStorage(users);
    }

    renderTableContent();
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

function isAdultUser(age) {
    return age >= 18;
}

function searchUser($event) {
    let users = getUsersFromStorage()
    let searchText = $event.value
    if (searchText.length === 0) {
        setUsersByState()
    } else {
        currentUsers = users.filter(user => user.email.includes(searchText) || user.name.includes(searchText))
    }
    renderTableContent()
}

function logout() {
    localStorage.clear()
}