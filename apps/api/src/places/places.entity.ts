import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
} from "typeorm";
import { Parking } from "../parking/parking.entity";
import { Ticket } from "src/tickets/tickets.entity";

@Entity()
export class Place {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date | null;

  @OneToMany(() => Ticket, (Ticket) => Ticket.place)
  tickets!: Ticket[];
  
  @Column("smallint", { default: 0 })
  num!: number;

  @Column("smallint", { default: 0 })
  niv!: number;

  @Column("bool", { default: true })
  isFree!: boolean;

  @ManyToOne(() => Parking, (parking) => parking.places)
  parking!: Parking;
}