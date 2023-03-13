export default interface Ticket {
    num: number,
    arrivedAt: Date,
    leftAt: Date | null
}