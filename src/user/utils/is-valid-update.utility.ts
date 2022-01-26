import {userService} from "../user.service";
import {Request, Response} from "express";
import {User} from "../types/models";

export const updateUser = (
    updates: string[],
    allowedUpdates: string[],
    res: Response,
    idTypeNumber: number,
    req: Request
) => {
    let user: User

    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid updates" });
    }

    updates.forEach((update) => {
        user = userService.update(idTypeNumber, update, req.body[update]);
    });

    return user!;
}