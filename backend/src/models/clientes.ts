import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cidades } from "./cidades";


@Entity('clientes')
export class Clientes extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public nome: string;

    @Column()
    public cpf: string;

    @Column()
    public email: string;

    @Column()
    public telefone: string;

    @Column()
    public endereco: string;

    @Column()
    public id_cidade: number;

    @ManyToOne(() => Cidades, (cidade) => cidade.clientes, {
        eager: true})
    @JoinColumn({ name: 'id_cidade' })
    public cidade: Cidades;

}