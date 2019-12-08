import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import User from './User';
import Thesis from './Thesis';

@Entity()
@Unique('UQ_VOLUNTEER', ['thesisId', 'userId'])
export default class ThesisVolunteer extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'int' })
    thesisId: number;

    @Column({ type: 'int' })
    userId: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdOn: Date;

    @ManyToOne(() => User, user => user.thesesVolunteers)
    @JoinColumn({ referencedColumnName: 'album', name: 'userId' })
    user: User;

    @ManyToOne(() => Thesis, thesis => thesis.volunteers)
    @JoinColumn({ referencedColumnName: 'id', name: 'thesisId' })
    thesis: Thesis;
}
