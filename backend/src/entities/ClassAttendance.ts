import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import Group from './Group';
import Class from './Class';
import User from './User';

export enum Grades {
    TWO = 20,
    THREE = 30,
    THREEPLUS = 35,
    FOUR = 40,
    FOURPLUS = 45,
    FIVE = 50,
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

    @Column({ type: 'text', nullable: true })
    reportFile: string;

    @Column({ type: 'enum', enum: Grades, nullable: true })
    reportGrade: number;

    @Column({ type: 'datetime', nullable: true })
    reportAddedOn: Date;

    @ManyToOne(() => User, user => user.attendances)
    user: User;

    @ManyToOne(() => Group, group => group.attendances)
    @JoinColumn({ referencedColumnName: 'id' })
    group: Group;

    @ManyToOne(() => Class, cls => cls.attendances)
    @JoinColumn({ referencedColumnName: 'id' })
    class: Class;
}
