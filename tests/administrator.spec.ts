import AdministratorBuilder from "../js/builder/administrator-builder";
import Administrator from "../js/users/administrator";
import {administratorLevels} from "../js/types/types";

describe('Administrator', () => {
    let administratorBuilder: AdministratorBuilder;

    beforeEach(() => {
        administratorBuilder = new AdministratorBuilder();
    });

    it(`Administrator has "${administratorLevels.advanced}" administrator level.`, () => {
        administratorBuilder.addAdministratorLevel(administratorLevels.advanced);

        const administrator: Administrator = administratorBuilder.build();

        expect(administrator.administratorLevel).toBe(administratorLevels.advanced);
    });
});

