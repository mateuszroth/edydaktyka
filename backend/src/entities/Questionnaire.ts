import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

export enum Grades {
    NONE = 0,
    TWO = 20,
    THREE = 30,
    THREEPLUS = 35,
    FOUR = 40,
    FOURPLUS = 45,
    FIVE = 50,
}

export enum ZeroedGrades {
    FIRST = -2,
    SECOND = -1,
    THIRD = 0,
    FOURTH = 1,
    FIFTH = 2,
}

@Entity()
export default class Questionnaire extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdOn: Date;

    @Column({ type: 'int', nullable: true })
    groupId: number;

    @Column({ type: 'enum', enum: Grades })
    grade: number;

    @Column({ type: 'enum', enum: ZeroedGrades })
    speed: number;

    @Column({ type: 'enum', enum: ZeroedGrades })
    value: number;

    @Column({ type: 'text', nullable: true })
    comments: string;
}
