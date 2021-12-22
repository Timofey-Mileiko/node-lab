/// <reference path="../models/user.model.ts" />
/// <reference path="../builder/teacher-builder.ts" />

namespace Users {
    export class Teacher extends UserModel {
        grade: string;
        specialization: string;
        department: string;

        constructor(builder: TeacherBuilder) {
            super(builder);

            this.grade = builder.grade;
            this.specialization = builder.specialization;
            this.department = builder.department;
        }
    }
}