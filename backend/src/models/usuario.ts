import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrdemServico } from "./OrdemServico";

@Entity('usuarios')
export class Usuarios extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public nome: string

    @Column()
    public email: string

    @Column()
    public senha: string

    @OneToMany(() => OrdemServico, (ordem) => ordem.usuario)
    public ordemServico: OrdemServico[]
}