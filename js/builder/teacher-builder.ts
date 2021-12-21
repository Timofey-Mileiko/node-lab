/// <reference path="../models/teacher-builder.model.ts" />
/// <reference path="../users/teacher.ts" />

namespace Users {
    export class TeacherBuilder extends TeacherBuilderModel{
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