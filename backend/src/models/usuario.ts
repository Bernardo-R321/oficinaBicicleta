import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrdemServico } from "./OrdemServico";
// import { Permissao } from "./permissao";

@Entity('usuarios')
export class Usuarios extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public nome: string

    @Column({ unique: true })
    public email: string

    @Column({ select: false })
    public senha: string

    @OneToMany(() => OrdemServico, (ordem) => ordem.usuario)
    public ordemServico: OrdemServico[];

    // @OneToMany(() => Permissao, (permissao) => permissao.usuario)
    // public permissao: Promise<Permissao[]>;
}
