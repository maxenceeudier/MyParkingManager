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
        if (User)
        {
            fetch(`/api/user/tickets/${User.token}`)
            .then(res => {
                if (res.ok)
                {
                    return res.json().then(data => {
                        setTicketSelect(data[0]);
                        setTicketsList(data.map((e : Ticket, i : number) => {
                            e.arrivedAt = new Date(e.arrivedAt);
                            if (e.leftAt)
                                e.leftAt = new Date(e.leftAt);
                            return <TicketComponent ticket={e} fold={true} key={i} onClick={() => chooseTicket(e)}/>
                    }));
                        setTickets(data);
                    })
                }
            }
            )
            .catch(error => console.log(error.message));
        }
    }, [User])

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
                    <h1>Tickets History</h1>
                </div>
                <div className="ticketListContainer">
                    {tiketsList}
                </div>
            </div>
        </div>
        </div>
    )
}