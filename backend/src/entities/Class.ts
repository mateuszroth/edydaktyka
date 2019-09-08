import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from 'typeorm';
import Group from './Group';

export interface ClassType {
    groupId: number;
    classNumber: number;
    takenOn?: Date;
    title: string;
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

    @ManyToOne(() => Group, group => group.classes)
    group: Group;
}
