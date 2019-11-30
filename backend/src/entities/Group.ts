import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToMany, OneToMany, JoinColumn } from 'typeorm';
import User from 'entities/User';
import Class from './Class';
import UserGrade from './UserGrade';
import ClassAttendance from './ClassAttendance';

export interface GroupType {
    id?: string;
    modeOfStudy?: ModeOfStudy;
    fieldOfStudy?: string;
    groupNumber?: GroupNumber;
    groupHalf?: string;
    courseName?: string;
    link?: string;
    description?: string;
    isActive?: boolean;
}

export enum ModeOfStudy {
    BLANK = '',
    'NST' = 'NST',
    'ST' = 'ST',
}

export enum GroupNumber {
    BLANK = '',
    FIRST = '1',
    SECOND = '2',
    THIRD = '3',
    FOURTH = '4',
    FIFTH = '5',
    SIXTH = '6',
    SEVENTH = '7',
    EIGHTH = '8',
    NINTH = '9',
    TENTH = '10',
}

export enum GroupHalf {
    BLANK = '',
    A = 'a',
    B = 'b',
    C = 'c',
    D = 'd',
}

@Entity()
export default class Group extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'enum', enum: ModeOfStudy })
    modeOfStudy: string;

    @Column({ type: 'varchar', length: 100 })
    fieldOfStudy: string;

    @Column({ type: 'enum', enum: GroupNumber })
    groupNumber: string;

    @Column({ type: 'enum', enum: GroupHalf })
    groupHalf: string;

    @Column({ type: 'varchar', length: 100 })
    courseName: string;

    @Column({ type: 'text', nullable: true })
    link: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @ManyToMany(() => User, user => user.groups)
    users: Promise<User[]>;

    @OneToMany(() => Class, classEntity => classEntity.group)
    classes: Promise<Class[]>;

    @OneToMany(() => ClassAttendance, classAttendance => classAttendance.group)
    attendances: Promise<ClassAttendance[]>;

    @OneToMany(() => UserGrade, grade => grade.group)
    grades: Promise<UserGrade[]>;
}
