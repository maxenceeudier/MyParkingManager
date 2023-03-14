import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Ticket from "../interface/Ticket";
import { Unlock } from "../store/UserSlice";
import "../styles/ticket.scss";

export default function TicketComponent(props : {ticket?: Ticket, fold: boolean, onClick? : (e : Ticket) => void})
{
    const dispatch = useDispatch();
    const [left, setLeft] = useState(true);
    const [ticket, setTickets] = useState<Ticket>();

    useEffect(() => {
        setTickets(props.ticket);
    }, [props]);

    useEffect(() => {
        setLeft(ticket?.leftAt !== null);
    }, [ticket]);

    if (!props.ticket)
    return <></>;

    function addZero(num : number) : string
    {
        let rslt = String(num);
        if (rslt.length === 1)
            rslt = '0' + rslt;
        return rslt;
    }

    function getDate(time : Date) : string
    {
        return `${addZero(time.getDate())}/${addZero(time.getMonth() + 1)}/${addZero(time.getFullYear())}`;
    }

    function getHour(time : Date | null | undefined) : string
    {
        if (!time)
            return "";
        return `${addZero(time.getHours())} : ${addZero(time.getMinutes())}`;
    }


    if (props.fold && ticket && props.onClick)
    {
        return (
            <div  className="center fold cardShapeOut small" onClick={() => props.onClick!(ticket)}>
                <h3 >{`Place: ${props.ticket.place.num}`}</h3>
                <h3>{getDate(props.ticket.arrivedAt)}</h3>
            </div>
        )
    }

    

    

    function freePlace()
    {
        //fetch(`/ticket/end/${props.ticket.id}`)
        dispatch(Unlock());
        setLeft(true);
        let tmp = ticket;
        if (tmp)
            tmp.leftAt = new Date();
        setTickets(tmp);

    }

    return (
        <div className="center unfold cardShapeIn">
            <h2>Place : {props.ticket.place.num}</h2>
            <h3>{`Day: ${getDate(props.ticket.arrivedAt)}`}</h3>
            <h3>{`Arrived at : ${getHour(props.ticket.arrivedAt)}`}</h3>
            {left?
                <h3>{`Left at : ${getHour(ticket?.leftAt)}`}</h3>
                :
                <div className="buttonTicket cardShapeOut center" onClick={() => freePlace()}>Free the place</div>
            }
        </div>
    )
}