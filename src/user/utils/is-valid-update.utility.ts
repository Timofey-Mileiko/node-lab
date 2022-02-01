import {userService} from "../user.service";
import {Request, Response} from "express";
import {User} from "../types/models";

export const updateUser = (
    updates: string[],
    allowedUpdates: string[],
    res: Response
): string | void => {
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
        res.status(400).send({ error: "Invalid updates" });
        return;
    }

    let updatesString: string = updates.reduce((accumulator, update, index, array) => {
        if(update === 'group') update = `"${update}"`;

        if(index === array.length - 1) {
            accumulator += `${update} = $${index+1} `;
            return accumulator;
        }
        accumulator += `${update} = $${index+1}, `;

        return accumulator;
    }, '');

    updatesString += `where id = $${updates.length + 1} `;

    return updatesString;
}