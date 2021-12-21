/// <reference path="../models/user.model.ts" />
/// <reference path="../models/student-builder.model.ts" />

namespace Users {
    export class Student extends UserModel {
        public faculty: string;
        public group: string;
        public speciality: string;

        constructor(builder: StudentBuilderModel) {
            super(builder);

            this.faculty = builder.faculty;
            this.group = builder.group;
            this.speciality = builder.speciality;
        }
    }
}