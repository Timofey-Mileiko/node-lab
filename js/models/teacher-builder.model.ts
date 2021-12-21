// <reference path="./user-builder.model.ts">

namespace Users {
    // @ts-ignore
    export abstract class TeacherBuilderModel extends UserBuilderModel {
        grade: string;
        specialization: string;
        department: string;

        addGrade(grade: string) {}
        addSpecialization(specialization: string) {}
        addDepartment(department: string) {}
    }
}