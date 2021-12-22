/// <reference path="../users/student.ts" />
/// <reference path="./models/user-builder.ts">

namespace Users {
    export class StudentBuilder extends UserBuilderModel {
        faculty: string;
        group: string;
        speciality: string;

        constructor() {
            super();
            this.role = 'Student';
        }

        public addFaculty(faculty: string): StudentBuilder {
            this.faculty = faculty;

            return this;
        }

        public addGroup(group: string): StudentBuilder {
            this.group = group;

            return this;
        }

        public addSpeciality(speciality: string): StudentBuilder {
            this.speciality = speciality

            return this;
        }

        public createUser() {
            return new Student(this);
        }
    }
}