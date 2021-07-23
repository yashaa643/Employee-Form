let maritalElement = document.querySelector('#maritalSelect')
let spouseElement = document.querySelector('#spouse');
let otherElement = document.querySelector('#other')
let modal = document.getElementById("submit-modal");
let close = document.getElementById("close-btn");
let errElement = document.getElementById("err");
let empDetails = {};

const clickEvent = function (id, action) {
    document.getElementById(id).addEventListener('click', action);
}

const hasWhiteSpace = function (string) {
    return string.indexOf(' ') >= 0;
}

const setSpouseStatus = function () {
    spouseElement.disabled = (maritalElement.value!=="married");
}

const resetForm = function () {
    document.getElementById('emp-form').reset();
    errElement.style.display = "none"
}

const closeModal = function () {
    modal.style.display = 'none';
    document.getElementById("emp-form").submit();
}

const displayModal = function () {

    document.getElementById("firstname").innerHTML = empDetails.fname;
    document.getElementById("lastname").innerHTML = empDetails.lname;
    document.getElementById("gender").innerHTML = (empDetails.gender === "male" ? "Male" : "Female");
    document.getElementById("marital").innerHTML = (empDetails.marital === "married" ? "Married" : "Unmarried");
    if (maritalElement.value === "married")
        document.getElementById("spousename").innerHTML = empDetails.spouse;
    else
    document.getElementById("spousename").innerHTML = "NA";
    document.getElementById("otherdetails").innerHTML = empDetails.other;
    modal.style.display = 'block';
    clickEvent('close-btn', closeModal);
}

const validateForm = function () {

    let errObject = {
        isValid : false,
        errMessage : ""
    }

    const formObject = document.forms["emp-form"];

    const fname = formObject["fname"].value;
    const lname = formObject["lname"].value;
    const spouse = formObject["spouse"].value;
    const other = formObject["other"].value;
    const tnc = formObject["tnc"].checked;
    const gender = formObject["gender"].value;
    const marital = formObject["marital"].value;

    if (fname === "") {
        errObject["isValid"] = false;
        errObject["errMessage"] = "First Name should not be empty";
        return errObject;
    }

    if (hasWhiteSpace(fname)) {
        errObject["isValid"] = false;
        errObject["errMessage"] = "First Name should not have white spaces";
        return errObject;
    }

    if (lname === "") {
        errObject["isValid"] = false;
        errObject["errMessage"] = "Last Name should not be empty";
        return errObject;
    }

    if (hasWhiteSpace(lname)) {
        errObject["isValid"] = false;
        errObject["errMessage"] = "Last Name should not have white spaces";
        return errObject;
    }

    if (spouse === "" && maritalElement.value === "married") {
        errObject["isValid"] = false;
        errObject["errMessage"] = "Spouse Name should not be empty";
        return errObject;
    }

    if (hasWhiteSpace(spouse)) {
        errObject["isValid"] = false;
        errObject["errMessage"] = "Spouse Name should not have white spaces";
        return errObject;
    }

    if (other === "") {
        errObject["isValid"] = false;
        errObject["errMessage"] = "Other information should not be empty";
        return errObject;
    }

    if (tnc === false) {
        errObject["isValid"] = false;
        errObject["errMessage"] = "Please Accept Terms & Conditions";
        return errObject;
    }

    empDetails.fname = fname;
    empDetails.lname = lname;
    empDetails.spouse = spouse;
    empDetails.other = other;
    empDetails.gender = gender;
    empDetails.marital = marital;

    errObject["isValid"] = true;
    return errObject;
}

const showError = function (errMessage){
    errElement.innerHTML = errMessage;
    errElement.style.display = 'block';
}

const saveEvent = function (event) {
    event.preventDefault();
    const errObject = validateForm();
    if(errObject.isValid===true){
        displayModal();
    }
    else{
        showError(errObject["errMessage"]);
    }
}

const resetFormListener = function () {
    clickEvent('reset-btn', resetForm);
}

const saveEventListener = function () {
    clickEvent('save-btn', saveEvent);
}

resetFormListener();
saveEventListener();