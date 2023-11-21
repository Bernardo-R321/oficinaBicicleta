import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Clientes } from "./clientes";
// import { Permissao } from "./permissao";

@Entity('cidades')
export class Cidades extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public nome: string;

  @OneToMany(() => Clientes, (clientes) => clientes.cidade)
  public clientes: Clientes[];

  // @OneToMany(() => Permissao, (permissao) => permissao.cidade)
  // public permissao: Promise<Permissao[]>;

}