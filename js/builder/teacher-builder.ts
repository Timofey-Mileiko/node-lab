/// <reference path="../users/teacher.ts" />
/// <reference path="./models/user-builder.ts">

namespace Users {
    export class TeacherBuilder extends UserBuilderModel{
        grade: string;
        specialization: string;
        department: string;

        constructor() {
            super();
            this.role = 'Teacher';
        }

        public addGrade(grade: string): TeacherBuilder {
            this.grade = grade;

            return this;
        }

        public addSpecialization(specialization: string): TeacherBuilder {
            this.specialization = specialization;

            return this;
        }

        public addDepartment(department: string) {
            this.department = department

            return this;
        }

        public createUser() {
            return new Teacher(this);
        }

    }
}