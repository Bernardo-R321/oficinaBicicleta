import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('clientes')
export class OrdemServico extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public id_cliente: number;

    @Column()
    public descricaoserv: string;

    @Column()
    public descricaobike: string;

    @Column()
    public valorservico: number;

    @Column()
    public id_pecas: number;

    @Column()
    public qtdpeca: number;

    @Column()
    public valorpeca: number;

    @Column()
    public valorOS: number;

    @Column()
    public id_status: number;

    @Column()
    public id_usuario: number;

}