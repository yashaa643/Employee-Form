let marriedElement = document.querySelector('#married');
let unmarriedElement = document.querySelector('#unmarried');
let spouseElement = document.querySelector('#spouse');
let otherElement = document.querySelector('#other')
let modal = document.getElementById("submit-modal");
let close = document.getElementById("close-btn");
let empDetails = {};

const clickEvent = function (id, action) {
    document.getElementById(id).addEventListener('click', action);
}

const hasWhiteSpace = function (string) {
    return string.indexOf(' ') >= 0;
}

const setSpouseStatus = function () {

    if (marriedElement.checked === true) {
        spouseElement.disabled = false;
        spouseElement.required = true;
    }
    if (unmarriedElement.checked === true) {
        spouseElement.disabled = true;
        spouseElement.required = false;
    }
}

const resetForm = function () {
    console.log("resetting");
    document.getElementById('emp-form').reset();
}

const closeModal = function () {
    modal.style.display = 'none';
    document.getElementById("emp-form").submit();
}

const displayModal = function () {

    document.getElementById("firstname").innerHTML = empDetails.fname;
    document.getElementById("lastname").innerHTML = empDetails.lname;
    document.getElementById("gender").innerHTML = empDetails.gender;
    document.getElementById("marital").innerHTML = empDetails.marital;
    if (marriedElement.checked === true)
        document.getElementById("spousename").innerHTML = empDetails.spouse;
    else
    document.getElementById("spousename").innerHTML = "NA";
    document.getElementById("otherdetails").innerHTML = empDetails.other;
    modal.style.display = 'block';
    clickEvent('close-btn', closeModal);
}

const validateForm = function () {
    let fname = document.forms["emp-form"]["fname"].value;
    let lname = document.forms["emp-form"]["lname"].value;
    let spouse = document.forms["emp-form"]["spouse"].value;
    let other = document.forms["emp-form"]["other"].value;
    let tnc = document.forms["emp-form"]["tnc"].checked;
    let gender = document.forms["emp-form"]["gender"].value;
    let marital = document.forms["emp-form"]["marital"].value;

    if (fname === "") {
        alert("Please enter a First Name");
        return false;
    }

    if (hasWhiteSpace(fname)) {
        alert("Name should not have any white-space");
        document.getElementById("fname").autofocus = true;
        return false;
    }

    if (lname === "") {
        alert("Please enter a Last Name");
        return false;
    }

    if (hasWhiteSpace(lname)) {
        alert("Name should not have any white-space");
        document.getElementById("lname").autofocus = true;
        return false;
    }

    if (spouse === "" && marriedElement.checked === true) {
        alert("Please enter a Spouse name");
        return false;
    }

    if (hasWhiteSpace(spouse)) {
        alert("Spouse Name should not have any white-space");
        document.getElementById("fname").autofocus = true;
        return false;
    }

    if (other === "") {
        alert("Please enter the Other details");
        return false;
    }

    if (tnc === false) {
        alert("Please accept terms and condition");
        return false;
    }

    empDetails.fname = fname;
    empDetails.lname = lname;
    empDetails.spouse = spouse;
    empDetails.other = other;
    empDetails.gender = gender;
    empDetails.marital = marital;

    return true;
}

const saveEvent = function (event) {
    event.preventDefault();
    if (validateForm()) {
        displayModal();
    }
}

const spouseStatusListener = function () {
    clickEvent('married', setSpouseStatus);
    clickEvent('unmarried', setSpouseStatus);
}

const resetFormListener = function () {
    clickEvent('reset-btn', resetForm);
}

const saveEventListener = function () {
    clickEvent('save-btn', saveEvent);
}

spouseStatusListener();
resetFormListener();
saveEventListener();