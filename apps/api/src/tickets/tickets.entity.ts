import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToOne
} from "typeorm";
import { User } from "../users/users.entity";
import { Place } from "src/places/places.entity";

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date | null;

  @Column("smallint", { default: 0 })
  numPlace!: number;

  @ManyToOne(() => User, { eager: true })
  user!: User;

  @OneToOne(() => Place, (place) => place.ticket)
  place: Place | null;
}