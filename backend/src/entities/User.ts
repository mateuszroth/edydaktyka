import { Entity, PrimaryColumn, Column, BaseEntity, ManyToMany, JoinTable } from 'typeorm';
import Group from 'entities/Group';

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

    @ManyToMany(type => Group, group => group.users, {
        eager: true
    })
    @JoinTable({
        name: 'user_group',
        joinColumn: { name: 'user_id', referencedColumnName: 'album'},
        inverseJoinColumn: { name: 'group_id', referencedColumnName: 'id'},
    })
    groups: Group[];
}
