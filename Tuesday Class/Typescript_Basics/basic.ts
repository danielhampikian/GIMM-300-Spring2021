class Student {
    fullName: string;
    firstName: string;
    lastName: string;
    constructor (
        public firstname: string,
        public lastname: string
    ) {
    this.fullName = firstname + " " + lastname;
    this.firstName = firstname;
    this.lastName = lastname;
    }
}

// steps to use a class in html: 
// 1. make a class and class constructor
// 2. declare and intialize an instance of the class
// 3. use that instance in some way

let user = new Student("Jessna", "Rodriguez");
//document.body.textContent = user.fullName;
document.getElementById("student_1").innerHTML = user.firstName;

function switchStudent(student: Student, switchname: string) {
    student.firstName = switchname;

}
switchStudent(user, "Chris");
document.getElementById("student_1").innerHTML = user.firstName;
