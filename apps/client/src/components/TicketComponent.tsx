import Ticket from "../../interface/Ticket";
import "../styles/ticket.scss";

export default function TicketComponent(props : {ticket?: Ticket, fold: boolean})
{
    if (!props.ticket)
        return <></>;
    
    let time = props.ticket.arrivedAt;
    let date = `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`;
    let hour = `${time.getHours()} : ${time.getMinutes()}`;

    if (props.fold)
    {
        return (
            <div  className="center fold cardShapeOut small">
                <h3 >{`Place: ${props.ticket.num}`}</h3>
                <h3>{date}</h3>
            </div>
        )
    }
    return (
        <div className="center unfold cardShapeIn">
            <h2>Place : {props.ticket.num}</h2>
            <h3>{`Day: ${date}`}</h3>
            <h3>{`Arrived at : ${hour}`}</h3>
            {props.ticket.leftAt?
                <h3>{`Arrived at : ${props.ticket.leftAt}`}</h3>
                :
                <div className="buttonTicket cardShapeOut center">Free the place</div>
            }
        </div>
    )
}