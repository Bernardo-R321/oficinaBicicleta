import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuarios } from "./usuario";
import { Status } from "./status";
import { Clientes } from "./clientes";

@Entity('ordens')
export class OrdemServico extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public descricaoserv: string;

    @Column()
    public descricaobike: string;

    @Column({ nullable: true })
    public valorservico: number;

    @Column()
    public qtdpeca: number;

    @Column({ nullable: true })
    public valorpeca: number;

    @Column({ nullable: true })
    public valorOS: number;

    @ManyToOne(() => Status, (status) => status.ordemServico, {
        eager: true
    })
    public status: Status;

    @ManyToOne(() => Usuarios, (usuario) => usuario.ordemServico, {
        eager: true
    })
    public usuario: Usuarios;

    @ManyToOne(() => Clientes, (cliente) => cliente.ordemServico, {
        eager: true
    })
    public cliente: Clientes;
}