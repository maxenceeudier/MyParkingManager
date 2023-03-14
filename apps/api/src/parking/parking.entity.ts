import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Place } from "../places/places.entity";

@Entity()
export class Parking {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date | null;

  @Column("varchar", { length: 255, unique: true})
  name!: string;

  @OneToMany(() => Place, (place) => place.parking)
  places!: Place[];
}