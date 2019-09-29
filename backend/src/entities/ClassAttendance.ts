import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from 'typeorm';
import Group from './Group';
import Class from './Class';
import User from './User';

export enum Grades {
    TWO = 20,
    THREE = 30,
    THREEPLUS = 35,
    FOUR = 40,
    FOURPLUS = 45,
    FIVE = 5
}

@Entity()
export default class ClassAttendance extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @PrimaryColumn({ type: 'int' })
    classId: number;

    @PrimaryColumn({ type: 'int' })
    groupId: number;

    @PrimaryColumn({ type: 'int' })
    userId: number;

    @Column({ type: 'boolean', default: false })
    isPresent: boolean;

    @Column({ type: 'boolean', default: true })
    isReportRequired: boolean;

    @Column({ type: 'text', nullable: true })
    reportFile: string;

    @Column({ type: 'enum', enum: Grades })
    reportGrade: number;

    @Column({ type: 'datetime', nullable: true })
    reportAddedOn: Date;

    @ManyToOne(() => User, user => user.attendances)
    user: User;

    @ManyToOne(() => Group, group => group.attendances)
    group: Group;

    @ManyToOne(() => Class, classEntity => classEntity.attendances)
    class: Class;
}
