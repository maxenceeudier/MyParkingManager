import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Ticket } from "../tickets/tickets.entity"

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @Column("varchar", { length: 255, unique: true })
  email!: string;

  @Column("varchar", { length: 30, unique: true })
  name!: string;

  @Column("varchar", { length: 255, nullable: true })
  password!: string | null;

  @Column("varchar", { length: 255, unique: true })
  token!: string;

  @OneToMany(() => Ticket, (Ticket) => Ticket.user)
  tickets!: Ticket[];
}
