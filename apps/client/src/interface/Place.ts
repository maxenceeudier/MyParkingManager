import { Parking } from "./Parking";

export interface Place {
    id: string,
    niv: number,
    num: number,
    isFree: boolean,
    parking : Parking,
}