class Student {
    fullName: string;
    constructor (
        public firstname: string,
    )
    {
    this.fullName = firstname;
    }
}

function switchStudent(student: Student) {
    student.firstname = "Jim Carry";
    return student;
} 

let user = new Student("Alan");
user = switchStudent(user);




document.body.textContent = user.firstname;