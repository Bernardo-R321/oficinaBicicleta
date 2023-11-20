import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrdemServico } from "./OrdemServico";


@Entity('status')
export class Status extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public nome: string;

  @Column()
  public tipo: string;

  @OneToMany(() => OrdemServico, (ordem) => ordem.status)
  public ordemServico: OrdemServico[]

}