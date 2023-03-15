import {
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../users/users.entity";
import { Place } from "src/places/places.entity";

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn()
  arrivedAt!: Date;

  @CreateDateColumn({nullable: true, default: null})
  leftAt!: Date | null;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Place, { eager: true })
  place!: Place;
}