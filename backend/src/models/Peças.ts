import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permissao } from "./permissao";

@Entity('peças')

export class Peças extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: Number;

    @Column()
    public nomePeça: string;

    @Column()
    public descrição: string;

    @Column()
    public valor: Number;

    @OneToMany(() => Permissao, (permissao) => permissao.pecas)
    public permissao: Promise<Permissao[]>;

}