/// <reference path="../users/student.ts" />
/// <reference path="./models/user-builder.ts">

namespace Users {
    export class StudentBuilder extends UserBuilderModel {
        protected user: Student = new Student();

        constructor() {
            super();
            this.user.role = 'Student';
        }

        public addFaculty(faculty: string) {
            this.user.faculty = faculty;
        }

        public addGroup(group: string) {
            this.user.group = group;
        }

        public addSpeciality(speciality: string) {
            this.user.speciality = speciality
        }

        public build(): Student {
            return this.user;
        }
    }
}