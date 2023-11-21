import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn} from "typeorm";
import { OrdemServicoPecaController } from "../controller/OrdemServicosPecaController";
import { Peças } from "./Peças";
import { Permissao } from "./permissao";


@Entity('ordemServico')
export class OrdemServicoPeca extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public nome: string;

  @OneToOne(() => OrdemServicoPeca, (ordem) => OrdemServicoPeca.peças, {
    eager: true})
@JoinColumn({ name: 'id_peça' })
public OrdemServico: OrdemServicoPeca;
    static peças: any;

    @OneToMany(() => Permissao, (permissao) => permissao.ordemServiçoPeca)
    public permissao: Promise<Permissao[]>;
  

}