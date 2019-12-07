import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import User from './User';
import ThesisVolunteer from './ThesisVolunteer';

export enum ThesisState {
    EMPTY = '',
    DEFENDED = 'obroniona',
    IN_PROGRESS = 'realizowany',
    FREE = 'pomyślany',
    SUBMITTED = 'zgłoszona',
}

@Entity()
export default class Thesis extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'enum', enum: ThesisState })
    type: string;

    @Column({ type: 'int', width: 4, nullable: true })
    year: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    graduateName: string;

    @Column({ type: 'int', nullable: true })
    graduateId: number;

    @Column({ type: 'text' })
    title: string;

    @Column({ type: 'text', nullable: true })
    usedTechnologies: string;

    @Column({ type: 'text', nullable: true })
    goal: string;

    @Column({ type: 'text', nullable: true })
    sketch: string;

    @Column({ type: 'text', nullable: true })
    link: string;

    @Column({ type: 'boolean', default: false })
    isFavourite: boolean;

    @ManyToOne(() => User, user => user.theses, { nullable: true })
    @JoinColumn({ referencedColumnName: 'album', name: 'graduateId' })
    user: User;

    @OneToMany(() => ThesisVolunteer, thesisVolunteer => thesisVolunteer.thesis)
    volunteers: Promise<ThesisVolunteer[]>;
}
