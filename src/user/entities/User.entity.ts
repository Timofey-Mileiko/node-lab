import {Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity} from "typeorm";
import {Lesson} from "../../lesson/entities";
import {administratorLevels} from "../types/enums";

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column({
        nullable: true
    })
    faculty: string;

    @Column({
        nullable: true
    })
    group: string;

    @Column({
        nullable: true
    })
    speciality: string;

    @Column({
        nullable: true
    })
    gender: string;

    @Column()
    role: string;

    @Column({
        nullable: true
    })
    department: string;

    @Column({
        nullable: true
    })
    specialization: string;

    @Column({
        nullable: true
    })
    grade: string;

    @Column({
        nullable: true,
        type: 'enum',
        enum: administratorLevels
    })
    administratorLevel: administratorLevels;

    @OneToMany(
        () => Lesson,
        lesson => lesson.teacher
    )
    lessons: Lesson[];
};