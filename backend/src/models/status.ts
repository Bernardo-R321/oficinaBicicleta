import { BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity('status')
export class Status extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public nome: string;

  @Column()
  public tipo: number;

}