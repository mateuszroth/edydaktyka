import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import Group from './Group';
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

@Entity()
export default class UserGrade extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @PrimaryColumn({ type: 'int' })
    groupId: number;

    @PrimaryColumn({ type: 'int' })
    userId: number;

    @Column({ type: 'enum', enum: Grades, nullable: true })
    grade: number;

    @Column({ type: 'datetime', nullable: true })
    gradedOn: Date;

    @ManyToOne(() => User, user => user.grades)
    @JoinColumn({ referencedColumnName: 'album', name: 'userId' })
    user: User;

    @ManyToOne(() => Group, group => group.grades)
    @JoinColumn({ referencedColumnName: 'id' })
    group: Group;
}
