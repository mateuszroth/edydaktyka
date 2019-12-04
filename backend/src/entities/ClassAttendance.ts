import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
    Index,
} from 'typeorm';
import Group from './Group';
import Class from './Class';
import User from './User';

export enum Grades {
    NONE = 0,
    TWO = 20,
    THREE = 30,
    THREEPLUS = 35,
    FOUR = 40,
    FOURPLUS = 45,
    FIVE = 50,
}

export interface ClassAttendanceObject {
    id?: number;
    classId: number;
    groupId: number;
    userId: number;
    isPresent?: boolean;
    reportFile?: string;
    reportFileId?: string;
    reportFileMimeType?: string;
    reportFileEncoding?: string;
    reportGrade?: number;
    reportAddedOn?: Date;
    user: User;
    group: Group;
    class: Class;
}

export interface ClassAttendanceDetailedObject extends ClassAttendanceObject {
    groupName: string;
    classTitle: string;
    userName: string;
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

    @Column({ type: 'boolean', default: false, nullable: true })
    isPresent: boolean;

    @Column({ type: 'text', nullable: true })
    reportFile: string;

    @Column({ type: 'text', nullable: true })
    reportFileId: string;

    @Column({ type: 'text', nullable: true })
    reportFileMimeType: string;

    @Column({ type: 'text', nullable: true })
    reportFileEncoding: string;

    @Index()
    @Column({ type: 'enum', enum: Grades, nullable: true })
    reportGrade: number;

    @Column({ type: 'datetime', nullable: true })
    reportAddedOn: Date;

    @ManyToOne(() => User, user => user.attendances)
    @JoinColumn({ referencedColumnName: 'album', name: 'userId' })
    user: User;

    @ManyToOne(() => Group, group => group.attendances)
    @JoinColumn({ referencedColumnName: 'id' })
    group: Group;

    @ManyToOne(() => Class, cls => cls.attendances)
    @JoinColumn({ referencedColumnName: 'id' })
    class: Class;
}
