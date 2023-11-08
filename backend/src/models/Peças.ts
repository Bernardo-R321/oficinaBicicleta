import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('peças')
export class Peças extends BaseEntity{
    @PrimaryGeneratedColumn()
    public id: Number;

    @Column()
    public nomePeça: string;

    @Column()
    public descrição: string;

    @Column()
    public valor: Number;

}