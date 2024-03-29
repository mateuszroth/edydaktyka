import { Entity, PrimaryColumn, Column, BaseEntity, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import Group from 'entities/Group';
import ClassAttendance from './ClassAttendance';
import UserGrade from './UserGrade';
import ConsultationSlot from './ConsultationSlot';
import Thesis from './Thesis';
import ThesisVolunteer from './ThesisVolunteer';

@Entity()
export default class User extends BaseEntity {
    @PrimaryColumn({ type: 'int' })
    album: number;

    @Column({ type: 'varchar', length: 50 })
    firstName: string;

    @Column({ type: 'varchar', length: 50 })
    lastName: string;

    @Column({ type: 'varchar', length: 128 })
    password: string;

    @Column({ type: 'varchar', length: 8 })
    passwordSalt: string;

    @Column({ type: 'varchar', unique: true, length: 320 })
    email: string;

    @Column({ type: 'text', nullable: true })
    photo: string;

    @Column({ type: 'boolean', default: false, nullable: true })
    isAdmin: boolean;

    @Column({ type: 'boolean', default: true, nullable: true })
    isActive: boolean;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    createdOn: Date;

    @ManyToMany(() => Group, group => group.users, {
        eager: true,
    })
    @JoinTable({
        name: 'user_group',
        joinColumn: { name: 'user_id', referencedColumnName: 'album' },
        inverseJoinColumn: { name: 'group_id', referencedColumnName: 'id' },
    })
    groups: Group[];

    @OneToMany(() => UserGrade, grade => grade.user, {
        eager: true,
        persistence: false, // see https://github.com/typeorm/typeorm/issues/2859
    })
    grades: UserGrade[];

    @OneToMany(() => ClassAttendance, classAttendance => classAttendance.user)
    attendances: Promise<ClassAttendance[]>;

    @OneToMany(() => ConsultationSlot, consultation => consultation.user)
    consultations: Promise<ConsultationSlot[]>;

    @OneToMany(() => Thesis, thesis => thesis.user)
    theses: Promise<Thesis[]>;

    @OneToMany(() => ThesisVolunteer, thesisVolunteer => thesisVolunteer.user)
    thesesVolunteers: Promise<ThesisVolunteer[]>;
}
