import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import {LessonTypesEnum} from "../types/enums";
import {User} from "../../user/entities";

@Entity('lesson')
export class Lesson {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    course: string;

    @Column({
        nullable: true
    })
    date: string;

    @Column({
        nullable: true,
        type: 'enum',
        enum: LessonTypesEnum
    })
    type: string;

    @ManyToOne(
        () => User,
        user => user.lessons
        )
    @JoinColumn({
        name: 'teacher_id',
    })
    teacher: User;
}