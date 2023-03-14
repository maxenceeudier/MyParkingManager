import TopBar from "../components/TopBar";
import "../App.css";
import "../styles/parking.scss";
import { useEffect, useState } from "react";
import Ticket from "../interface/Ticket";
import TicketComponent from "../components/TicketComponent";
import { useSelector } from 'react-redux';
import { selectUser } from '../store/UserSlice';
import { useNavigate } from 'react-router-dom';


export default function TicketsPage() {
    const [ticketSelect, setTicketSelect] = useState<Ticket>();
    const [tiketsList, setTicketsList] = useState<JSX.Element[]>([]);
    const [tikets, setTickets] = useState<Ticket[]>();
    const User = useSelector(selectUser);
    const navigate = useNavigate();
    useEffect(() => {
        if (User && User.name.length === 0)
            return navigate("/");
    }, [User])

    useEffect(() => {
        let tmp : Ticket[] = [];
        for (let i = 0; i < 10; i++)
        {
            tmp.push({id :"0", place: {id:'0', num: i + 1, isFree: false, niv: 1}, arrivedAt: new Date(), leftAt:i === 0 ? null : new Date()})
        }
        setTicketSelect(tmp[0]);
        setTicketsList(tmp.map((e, i) => 
            <TicketComponent ticket={e} fold={true} key={i} onClick={() => chooseTicket(e)}/>
        ));
        setTickets(tmp);
    }, [])

    function chooseTicket(e : Ticket)
    {
        setTicketSelect(e);
    }

    return (
        <div className="fullWind">
        <TopBar focus={"Tickets"} />
        <div className="center around fullWind">
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