import { useEffect, useState } from 'react';
import ParkingComponent from '../components/ParkingComponent';
import TopBar from '../components/TopBar';
import "../App.css";
import { useParams } from 'react-router-dom';

export default function ParkingPage(){
    const [numNiv, setNumNiv] = useState(1);
    const [numMax, setNumMax] = useState(0);

    const {name} = useParams();

    useEffect(() => {
        setNumMax(3);
    }, [name])
    
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
        <div>
            <TopBar focus={"Parking"} />            
            <div className='cardShapeOut' style={{display:'flex', justifyContent: "center", alignItems: "center", flexDirection: "column", width: '60%', marginLeft: '20%'}}>
                <h1 className='cardShapeIn small' style={{padding: '10px'}}>{name}</h1>
                <div style={{display:'flex', justifyContent: "space-around", width: '60%', background:'transparent'}}>
                    {numNiv > 1 ? 
                    <div className='button cardShapeOut small round' onClick={prev}>{"<"}</div>
                    : <div></div>}

                    <h2>Niv {numNiv}</h2>

                    {numNiv < numMax?
                    <div className=' button cardShapeOut small round' onClick={next}>{">"}</div>
                    : <div></div>
                    }
                </div>
                <div className='center'>
                    <ParkingComponent niv={numNiv} name={name}/>
                </div>
            </div>
        </div>
    )
}
