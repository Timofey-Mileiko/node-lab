import {AdministratorBuilder} from "../src/user/builders";
import {administratorLevels} from "../src/user/types/enums";
import {Administrator} from "../src/user/types/users";

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

