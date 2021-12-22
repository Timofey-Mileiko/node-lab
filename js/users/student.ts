/// <reference path="../models/user.model.ts" />
/// <reference path="../builder/student-builder.ts" />

namespace Users {
    export class Student extends UserModel {
        public faculty: string;
        public group: string;
        public speciality: string;

        constructor(builder: StudentBuilder) {
            super(builder);

            this.faculty = builder.faculty;
            this.group = builder.group;
            this.speciality = builder.speciality;
        }
    }
}