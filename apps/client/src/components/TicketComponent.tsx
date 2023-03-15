import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Ticket from "../interface/Ticket";
import { Unlock } from "../store/UserSlice";
import "../styles/ticket.scss";

export default function TicketComponent(props : {ticket?: Ticket, fold: boolean, onClick? : (e : Ticket) => void}) : JSX.Element
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

    function GetDate(time : Date) : string
    {
        return `${addZero(time.getDate())}/${addZero(time.getMonth() + 1)}/${addZero(time.getFullYear())}`;
    }

    function GetHour(time : Date | null | undefined) : string
    {
        if (!time)
            return "";
        return `${addZero(time.getHours())} : ${addZero(time.getMinutes())}`;
    }


    if (props.fold && ticket && props.onClick)
    {
        return (
            <div  className="center fold cardShapeOut small" onClick={() => props.onClick!(ticket)}>
                <h3>{`${props.ticket.place.parking.name}`}</h3>
                <h3 >{`Place: ${props.ticket.place.num}`}</h3>
                <h3>{GetDate(new Date(props.ticket.arrivedAt))}</h3>
            </div>
        )
    }

    function freePlace()
    {
        if (!left)
        {
            fetch(`/api/place/free/${ticket?.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(res => {
                if (res.ok)
                {
                    dispatch(Unlock());
                    setLeft(true);
                    let tmp = ticket;
                    if (tmp)
                        tmp.leftAt = new Date();
                    setTickets(tmp);
                }
            }
            )
            .catch(error => console.log(error.message));
        }
    }

    return (
        <div className="center unfold cardShapeIn">

            <h2>{props.ticket.place.parking.name}</h2>
            <h3>Place : {props.ticket.place.num}</h3>
            <h3>{`Day: ${GetDate(props.ticket.arrivedAt)}`}</h3>
            <h3>{`Arrived at : ${GetHour(props.ticket.arrivedAt)}`}</h3>
            {left?
                <h3>{`Left at : ${GetHour(ticket?.leftAt)}`}</h3>
                :
                <div className="buttonTicket cardShapeOut center" onClick={() => freePlace()}>Free the place</div>
            }
        </div>
    )
}