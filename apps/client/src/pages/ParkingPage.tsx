import { useEffect, useState } from 'react';
import ParkingComponent from '../components/ParkingComponent';
import TopBar from '../components/TopBar';
import "../App.css";
import { useParams } from 'react-router-dom';
import { Parking } from '../interface/Parking';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/UserSlice';
import { useNavigate } from 'react-router-dom';

export default function ParkingPage(){
    const [numNiv, setNumNiv] = useState(1);
    const [numMax, setNumMax] = useState(1);
    const {name, numOfNiv} = useParams();
    const User = useSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (User && User.name.length === 0)
            return navigate("/");
    }, [User])

    useEffect(() => {
        setNumMax(Number(numOfNiv));
    }, [name, numOfNiv])
    
    function prev()
    {
        if (numNiv > 1)
        setNumNiv((prev) => prev - 1 )
    }

    function next()
    {
        if (numNiv < numMax)
            setNumNiv((prev) => prev + 1 )
    }

    return (
        <div className='fullWind'>
            <TopBar focus={"Parking"} />            
            <div className='cardShapeOut center column soixanteVinght' style={{minWidth: '60%', marginTop: '100px'}}>
                <h1 className='cardShapeIn small' style={{padding: '10px'}}>{name}</h1>
                <div className='level'>
                    {numNiv > 1 ? 
                    <div className='button cardShapeOut small round' onClick={prev}>{"<"}</div>
                    : <div></div>}

                    <h2>Level {numNiv}</h2>

                    {numNiv < numMax?
                    <div className=' button cardShapeOut small round' onClick={next}>{">"}</div>
                    : <div></div>
                    }
                </div>
                <div className='center' style={{width: '100%'}}>
                    <ParkingComponent niv={numNiv} name={name}/>
                </div>
            </div>
        </div>
    )
}
