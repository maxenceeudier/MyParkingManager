import { Place } from "./Place"

export default interface Ticket {
    place : Place,
    id: string,
    arrivedAt: Date,
    leftAt: Date | null
}