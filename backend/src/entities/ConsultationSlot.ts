import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Index, Unique } from 'typeorm';
import User from './User';

@Entity()
@Unique('UQ_SLOTS', ['date', 'slot'])
export default class ConsultationSlot extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Index()
    @Column({ type: 'datetime' })
    date: Date;

    @Column({ type: 'int' })
    slot: number;

    @ManyToOne(() => User, user => user.consultations)
    @JoinColumn({ referencedColumnName: 'album', name: 'userId' })
    user: User;
}

export default interface ConsultationSlot {
    id: number;
    date: Date;
    slot: number;
    user: User;
    userName?: string;
    userId?: number;
}
