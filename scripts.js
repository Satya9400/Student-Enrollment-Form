const baseURL = "http://api.login2explore.com:5577";
const dbName = "SCHOOL-DB";
const relationName = "STUDENT-TABLE";
const connToken = "90934324|-31949204906914178|90957342";  // Replace with your actual token

// Function to check if Roll No exists in the database
function checkRollNo() {
    let rollNo = $("#rollNo").val();
    if (rollNo === "") return;

    let getRequest = `{
        "token": "${connToken}",
        "dbName": "${dbName}",
        "cmd": "GET",
        "rel": "${relationName}",
        "jsonStr": { "Roll-No": "${rollNo}" }
    }`;

    $.post(baseURL + "/api/irl", getRequest, function (response) {
        if (response.status === 200) {
            // If data exists, fill the form and enable Update button
            let data = JSON.parse(response.data).record;
            $("#fullName").val(data["Full-Name"]);
            $("#class").val(data["Class"]);
            $("#birthDate").val(data["Birth-Date"]);
            $("#address").val(data["Address"]);
            $("#enrollmentDate").val(data["Enrollment-Date"]);

            $("#rollNo").prop("disabled", true);
            $("#saveBtn").prop("disabled", true);
            $("#updateBtn").prop("disabled", false);
            enableFields();
        } else {
            // If new entry, enable Save button and form fields
            $("#saveBtn").prop("disabled", false);
            enableFields();
        }
    });
}

// Function to enable form fields
function enableFields() {
    $("#fullName, #class, #birthDate, #address, #enrollmentDate").prop("disabled", false);
}

// Function to reset the form
function resetForm() {
    $("#studentForm")[0].reset();
    $("#rollNo").prop("disabled", false);
    $("#saveBtn, #updateBtn").prop("disabled", true);
    $("#fullName, #class, #birthDate, #address, #enrollmentDate").prop("disabled", true);
}

// Function to save student data
function saveStudent() {
    let jsonData = {
        "Roll-No": $("#rollNo").val(),
        "Full-Name": $("#fullName").val(),
        "Class": $("#class").val(),
        "Birth-Date": $("#birthDate").val(),
        "Address": $("#address").val(),
        "Enrollment-Date": $("#enrollmentDate").val()
    };

    let putRequest = `{
        "token": "${connToken}",
        "dbName": "${dbName}",
        "cmd": "PUT",
        "rel": "${relationName}",
        "jsonStr": ${JSON.stringify(jsonData)}
    }`;

    $.post(baseURL + "/api/iml", putRequest, function (response) {
        alert("Data saved successfully!");
        resetForm();
    });
}

// Function to update student data
function updateStudent() {
    let jsonData = {
        "Roll-No": $("#rollNo").val(),
        "Full-Name": $("#fullName").val(),
        "Class": $("#class").val(),
        "Birth-Date": $("#birthDate").val(),
        "Address": $("#address").val(),
        "Enrollment-Date": $("#enrollmentDate").val()
    };

    let updateRequest = `{
        "token": "${connToken}",
        "dbName": "${dbName}",
        "cmd": "UPDATE",
        "rel": "${relationName}",
        "jsonStr": ${JSON.stringify(jsonData)}
    }`;

    $.post(baseURL + "/api/iml", updateRequest, function (response) {
        alert("Data updated successfully!");
        resetForm();
    });
}