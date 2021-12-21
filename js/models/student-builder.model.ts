/// <reference path="./user-builder.model.ts">

namespace Users {
    export abstract class StudentBuilderModel extends UserBuilderModel {
        faculty: string;
        group: string;
        speciality: string;

        addFaculty(faculty: string) {}
        addGroup(group: string) {}
        addSpeciality(speciality: string) {}
    }
}