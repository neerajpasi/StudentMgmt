var base64ImageString = "";

function Save() {

    if (validateForm()) {

        var url = "http://localhost:5070/StudentMgt/Create";
        var objectStudent = {};
        objectStudent.FirstName = $('#firstName').val();
        objectStudent.LastName = $('#lastName').val();
        objectStudent.MothersName = $('#motherName').val();
        objectStudent.FatherName = $('#fatherName').val();
        objectStudent.Address = $('#address').val();
        objectStudent.Gender = $("input[type='radio'][name='gender']:checked").val();
        objectStudent.State = $('#state option:selected').text();
        objectStudent.City = $('#city option:selected').text();
        objectStudent.DateOfBirth = $('#date').val();
        objectStudent.EmailId = $('#emailid').val();
        objectStudent.Pincode = $('#Pincode').val();
        objectStudent.Language = multiSelect();
        objectStudent.Hobbies = Checkbox();
        objectStudent.ImageFile = base64ImageString;


        if (objectStudent) {
            $.ajax({
                url: url,
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify(objectStudent),
                type: "POST",
                success: function (data, textStatus, xhr) {
                    if (xhr.status == 200) {
                        alert("Saved Successfully");
                        location.href = "http://localhost:5296/Student/Viewdetails";
                    }
                },
                error: function (obj) {
                    console.log(obj);
                }
            });
        }
    }
}
function getData() {
    var url = "http://localhost:5070/StudentMgt/GetStudent";
    $.ajax({
        url: url,
        type: "Get",
        success: function (data, textStatus, xhr) {
            console.log(data);
            if (data) {
                var row = '';
                for (var i = 0; i < data.length; i++) {
                    row = row
                        + "<tr>"
                        + "<td width='20%'>" + data[i].firstName + "</td>"
                        + "<td width='20%'>" + data[i].gender + "</td>"
                        + "<td width='20%'>" + data[i].city + "</td>"
                        + "<td width='20%'>" + data[i].emailId + "</td>"
                        + "<td width='30%'>"
                        + "<a href='http://localhost:5296/Student/Index?mode=Update&Id=" + data[i].id + "' class='btn btn-primary mx-1'>Update</a>"
                        + "<a class='btn btn-danger mx-1' onclick='Delete(" + data[i].id + ")'>Delete</a>"
                        + "</div>"
                        + "</td>"
                        + "</tr>"
                }
                if (row != '') {
                    $('#tblproductid').append(row);

                }
            }
        },
        Error: function (msg) {
            alert(msg);
        }
    });
}
function getDetailsById(id) {
    var url = "http://localhost:5070/StudentMgt/GetDetailsById?id=" + id + "";
    $.ajax({
        url: url,
        contentType: "application/json;charset=utf-8",
        type: "Get",
        success: function (data, textStatus, xhr) {
            if (xhr.status == 200) {
                $('#firstName').val(data.firstName);
                $('#lastName').val(data.lastName);
                $('#motherName').val(data.mothersName);
                $('#fatherName').val(data.fatherName);
                $('#address').val(data.address);
                var gender = data.gender;
                GetGender(gender);
                var state = data.state;
                GetState(state);
                var city = data.city;
                GetCity(city);
                $('#emailid').val(data.emailId);
                $('#Pincode').val(data.pincode);
                var language = data.language
                var language=language.split(",");
                GetLanguage(language);
                var hobbies = data.hobbies;
                var hobbies = hobbies.split(",");
                GetHobbies(hobbies);
            }
        },
        Error: function (msg) {
            alert(msg);
        }
    });
}
function GetGender(gender)
{
    if (gender == "Female")
    {
        var controls = document.getElementById("femaleGender");
        controls.checked = "true";
    }
    else if (gender == "Male")
    {
        var controls = document.getElementById("maleGender");
        controls.checked = "true";
    }
    else {
        var controls = document.getElementById("otherGender");
        controls.checked = "true";
    }
}
function GetState(state)
{
    if (state == "Maharashtra")
    {
        var controls = document.getElementById("state");
        controls[1].selected = "true";
    }
    else if (state == "Goa")
    {
        var controls = document.getElementById("state");
        controls[2].selected = "true";
    }
    else {
        var controls = document.getElementById("state");
        controls[3].selected = "true";
    }
}
function GetCity(city) {
    if (city == "Mumbai") {
        var controls = document.getElementById("city");
        controls[1].selected = "true";
    }
    else if (city == "Madgaon") {
        var controls = document.getElementById("city");
        controls[2].selected = "true";
    }
    else {
        var controls = document.getElementById("city");
        controls[3].selected = "true";
    }
}
function GetLanguage(language)
{
    var controls = document.getElementById("language");

    for (var i = 1; i < controls.length; i++)
    {
        var controlsOptionText= controls[i].text;
        for (var j = 0; j < language.length; j++)
        {
            var languageOptionText = language[j];
            if (languageOptionText == controlsOptionText)
            {
                controls[i].selected = "True";
            }
        }
    }
}
function GetHobbies(hobbies) {
    var controls = document.getElementsByName("Hobbies");

    for (var i = 0; i < controls.length; i++) {
        var controlsOptionText = controls[i].value;
        for (var j = 0; j < hobbies.length; j++) {
            var HobbiesOptionText = hobbies[j];
            if (HobbiesOptionText == controlsOptionText) {
                controls[i].checked = "True";
            }
        }
    }
}

function Delete(id) {
    var url = "http://localhost:5070/StudentMgt/Delete?id=" + id + "";
    $.ajax({
        url: url,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        type: "Delete",
        sucess: function (data, textStatus, xhr) {
            if (xhr.status == 200) {
                alert("Delete Sucessfully");
                location.href = "http://localhost:5296/student/Viewdetails";
            }
        },
        Error: function (msg) {
            alert(msg);
        }
    });
}
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function multiSelect() {
    var a = document.getElementById("language");
    var b = a.children
    var c = "";
    for (let i = 0; i < b.length; i++) {
        if (b[i].selected) {


            if (c == "") {
                c = b[i].text


            }
            else {

                c = c + "," + b[i].text

            }
        }

    }
    return c;
}
function Checkbox() {

    var a = document.getElementsByName("Hobbies")
    var c = "";
    for (let i = 0; i < a.length; i++) {
        if (a[i].checked) {
            if (c == "") {
                c = a[i].value
            }
            else {
                c = c + "," + a[i].value
            }
        }
    }
    return c;
}
function Image_preview(event) {
    //var image = URL.createObjectURL(event.target.files[0]);
    //var imagediv = document.getElementById("preview");
    //var newimg = document.createElement("img");
    //imagediv.innerHTML = "";
    //newimg.src = image;
    //newimg.width = "50";
    //newimg.id = "img";
    //imagediv.appendChild(newimg);

    var file = document.getElementById('upload_file').files[0];

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        base64ImageString = reader.result;
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}


const Isvalidemail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateForm() {
    var returnval = true;
    clearErrors();

    var fname = document.forms['myForm']["firstName"].value;
    var lname = document.forms['myForm']["lastName"].value;
    var mothername = document.forms['myForm']["motherName"].value;
    var fathername = document.forms['myForm']["fatherName"].value;
    var address = document.forms['myForm']["address"].value;
    var Gender = document.getElementsByName("gender")
    var state = document.getElementById("state");
    var optionSelectedstate = state.options[state.selectedIndex].value;
    var city = document.getElementById("city");
    var optionSelectedcity = state.options[state.selectedIndex].value;
    var dateofbirth = document.getElementById("date").value;
    var emailvalue = document.getElementById("emailid").value;
    var Pincode = document.getElementById("Pincode").value;
    var language = document.getElementById("language");
    var optionSelectedLanguage = language.options[state.selectedIndex].value;
    var hobbies = Checkbox();



    if (fname.length < 3) {
        seterror("fname", "Length of First name is too short");
        returnval = false;
    }

    if (fname.length == '') {
        seterror("fname", "Please Enter your First Name!");
        returnval = false;
    }
    if (lname.length < 3) {
        seterror("Lname", "Length of Last name is too short");
        returnval = false;
    }

    if (lname.length == '') {
        seterror("Lname", "Please Enter your Last Name!");
        returnval = false;
    }
    if (mothername.length < 3) {
        seterror("mothername", "Length of Mother name is too short!")
        returnval = false;

    }
    if (mothername == "") {
        seterror("mothername", "Please Enter your Mother Name!")
        returnval = false;

    }
    if (fathername.length < 3) {
        seterror("fathername", "Length of Father name is too short!")
        returnval = false;

    }
    if (fathername == "") {
        seterror("fathername", "Please Enter your Father Name!")
        returnval = false;

    }
    if (address.length < 15) {
        seterror("add", "Address Lenght is too short!")
        returnval = false;

    }
    if (address == "") {
        seterror("add", "Please Enter your Address!")
        returnval = false;
    }
    if (!(Gender[0].checked || Gender[1].checked || Gender[2].checked)) {
        seterror("Gender", 'Please select your gender!')
        returnval = false;

    }
    if (optionSelectedstate == 0) {
        seterror("stat", "Please Select State!");
        returnval = false;
    }
    if (optionSelectedcity == 0) {
        seterror("cit", "Please Select City!");
        returnval = false;
    }
    if (dateofbirth == "") {
        seterror("Dob", "Select Your DOB!");
        returnval = false;
    }
    if (emailvalue == "") {
        seterror("email", "PLease Enter your Email Id!")
        returnval = false;
    }
    //// else if (!Isvalidemail(email)) {
    //    //seterror("email", "Provide a valid  Email Id!")
    //    //returnval = false;
    //}
    if (Pincode == "") {
        seterror("pin", "Enter your Pincode!")
        returnval = false;
    } else if (Pincode.length > 6) {
        seterror("pin", "Provide valid Pincode!")
        returnval = false;
    }
    if (optionSelectedLanguage == 0) {
        seterror("lbl", "Choose language!")
        returnval = false;
    }
    if (hobbies == "") {
        seterror("hbb", "Choose Hobbies")
        returnval = false;

    }

    return returnval;

}
function seterror(id, error) {
    element = document.getElementById(id);
    element.getElementsByClassName('formerror')[0].innerHTML = error;
}

function clearErrors() {

    errors = document.getElementsByClassName('formerror');
    for (let item of errors) {
        item.innerHTML = "";
    }


}


