import { Entity, PrimaryGeneratedColumn, Column, } from 'typeorm';

@Entity()
export class Test {
    @PrimaryGeneratedColumn('uuid')
    testId: string;

    @Column({ unique: true })
    name: string;
}