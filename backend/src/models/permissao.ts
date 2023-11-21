import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { Cidades } from "./cidades";
  import { Clientes } from "./clientes";
  import { OrdemServico } from "./OrdemServico";
  import { OrdemServicoPeca } from "./ordemServiçoPeca";
  import { Peças } from "./Peças";
  import { Status } from "./status";
  import { Usuarios } from "./usuario";
  
  @Entity("permissao")
  export class Permissao extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;
  
    @Column({
      type: "char",
    })
    public tipo: string;
  
    @Column({
      type: "int",
    })
    public idUsuario: number;
  
    @Column({
      type: "int",
    })
    public idPagina: number;
  
    @ManyToOne(() => Usuarios, (usuario) => usuario.permissao, { eager: true })
    @JoinColumn({ name: "idUsuario" })
    public usuario: Usuarios;
  
    @ManyToOne(() => Cidades, (cidade) => cidade.permissao, { eager: true })
    @JoinColumn({ name: "idCidade" })
    public cidade: Cidades;

    @ManyToOne(() => Clientes, (cliente) => cliente.permissao, { eager: true })
    @JoinColumn({ name: "idCLiente" })
    public cliente: Clientes;

    @ManyToOne(() => OrdemServico, (ordemServiço) => ordemServiço.permissao, { eager: true })
    @JoinColumn({ name: "idOrdemServiço" })
    public ordemServiço: OrdemServico;

    @ManyToOne(() => OrdemServicoPeca, (ordemServiçoPeca) => ordemServiçoPeca.permissao, { eager: true })
    @JoinColumn({ name: "idOrdemServiçoPeca" })
    public ordemServiçoPeca: OrdemServicoPeca;

    @ManyToOne(() => Peças, (peças) => peças.permissao, { eager: true })
    @JoinColumn({ name: "idpeças" })
    public peças: Peças;

    @ManyToOne(() => Status, (status) => status.permissao, { eager: true })
    @JoinColumn({ name: "idstatus" })
    public status: Status;
  }