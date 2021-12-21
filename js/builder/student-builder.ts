/// <reference path="../models/student-builder.model.ts" />
/// <reference path="../users/student.ts" />

namespace Users {
    export class StudentBuilder extends StudentBuilderModel{
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