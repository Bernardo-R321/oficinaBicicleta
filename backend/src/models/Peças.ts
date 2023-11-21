import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Permissao } from "./permissao";
import { OneToMany } from "typeorm/browser";

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

    @OneToMany(() => Permissao, (permissao) => permissao.peças)
    public permissao: Promise<Permissao[]>;

}