var Student = /** @class */ (function () {
    function Student(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.fullName = firstname + " " + lastname;
        this.firstName = firstname;
        this.lastName = lastname;
    }
    return Student;
}());
//steps to use a class in html: 
//1. make a class and class constructor
//2. declare and intialize an isntance of the class
//3. use that instance in some way
var user = new Student("Jessna", "Rodriguez");
//document.body.textContent = user.fullName;
document.getElementById("student_1").innerHTML = user.firstName;
function switchStudent(student, switchname) {
    student.firstName = switchname;
}
switchStudent(user, "Chris");
document.getElementById("student_1").innerHTML = user.firstName;
