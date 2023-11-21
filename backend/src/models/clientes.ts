import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cidades } from "./cidades";
import { OrdemServico } from "./OrdemServico";
import { Permissao } from "./permissao";

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
        eager: true
    })
    @JoinColumn({ name: 'id_cidade' })
    public cidade: Cidades;

    @OneToMany(() => OrdemServico, (ordem) => ordem.cliente)
    public ordemServico: OrdemServico[];

    @OneToMany(() => Permissao, (permissao) => permissao.cliente)
    public permissao: Promise<Permissao[]>;

}