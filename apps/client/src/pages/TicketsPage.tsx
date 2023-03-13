import TopBar from "../components/TopBar";
import "../App.css";
import "../styles/parking.scss";
import { useEffect, useState } from "react";
import Ticket from "../../interface/Ticket";
import TicketComponent from "../components/TicketComponent";


export default function TicketsPage() {
    const [ticketSelect, setTicketSelect] = useState<Ticket>();
    const [tiketsList, setTicketsList] = useState<JSX.Element[]>([]);

    useEffect(() => {
        setTicketSelect({num: 5, arrivedAt: new Date(), leftAt: null});
    }, [])

    useEffect(() => {
        setTicketsList([
            <TicketComponent ticket={ticketSelect} fold={true}/>,
            <TicketComponent ticket={ticketSelect} fold={true}/>,
            <TicketComponent ticket={ticketSelect} fold={true}/>,
            <TicketComponent ticket={ticketSelect} fold={true}/>,
            <TicketComponent ticket={ticketSelect} fold={true}/>,
            <TicketComponent ticket={ticketSelect} fold={true}/>,
        ]);
    }, [ticketSelect])

    return (
        <div style={{width: "100vw", height: '100vh'}}>
        <TopBar focus={"Tickets"} />
        <div className="center around">
            <TicketComponent ticket={ticketSelect} fold={false}/>
            <div className="center cardShapeOut ticketContainer">
                <div>
                    <h2>Tickets History</h2>
                </div>
                
                <div className="ticketListContainer">
                    {tiketsList}
                </div>
            </div>
        </div>
        </div>
    )
}