import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import Group from './Group';
import ClassAttendance from './ClassAttendance';

export interface ClassType {
    id?: number;
    groupId?: number;
    classNumber?: number;
    takenOn?: Date;
    title?: string;
    isReportRequired?: boolean;
}

@Entity()
export default class Class extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @PrimaryColumn({ type: 'int' })
    groupId: number;

    @Column({ type: 'int' })
    classNumber: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    takenOn: Date;

    @Column({ type: 'varchar', length: 100 })
    title: string;

    @Column({ type: 'boolean', default: true })
    isReportRequired: boolean;

    @ManyToOne(() => Group, group => group.classes)
    group: Group;

    @OneToMany(() => ClassAttendance, classAttendance => classAttendance.class)
    attendances: Promise<ClassAttendance[]>;
}
