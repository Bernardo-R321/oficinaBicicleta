import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Permissao } from "./permissao";
import { OneToMany } from "typeorm/browser";

@Entity('peças')
export class Pecas extends BaseEntity{
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