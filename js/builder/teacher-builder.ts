/// <reference path="../users/teacher.ts" />
/// <reference path="./models/user-builder.ts">

namespace Users {
    export class TeacherBuilder extends UserBuilderModel{
        protected user: Teacher = new Teacher();

        constructor() {
            super();
            this.user.role = 'Teacher';
        }

        public addGrade(grade: string) {
            this.user.grade = grade;
        }

        public addSpecialization(specialization: string) {
            this.user.specialization = specialization;
        }

        public addDepartment(department: string) {
            this.user.department = department;
        }

        public build(): Teacher {
            return this.user;
        }
    }
}