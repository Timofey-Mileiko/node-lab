/// <reference path="../models/user.model.ts" />
/// <reference path="../models/teacher-builder.model.ts" />

namespace Users {
    export class Teacher extends UserModel {
        grade: string;
        specialization: string;
        department: string;

        constructor(builder: TeacherBuilderModel) {
            super(builder);

            this.grade = builder.grade;
            this.specialization = builder.specialization;
            this.department = builder.department;
        }
    }
}