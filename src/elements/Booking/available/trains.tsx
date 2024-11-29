// @ts-nocheck
import { useState, useEffect, useRef, useCallback } from "react";
import Button from "../../../base-components/Button";
import Lucide from "../../../base-components/Lucide";
import { FormSelect } from "../../../base-components/Form";
import { Dialog, Slideover, Menu } from "../../../base-components/Headless";
import axios from "axios";
import api from "../../../../apiconfig.json";

import Notify from "../../notify"

function Trains(props) {
    const filePath = api.FILE_PATH;

    const [showItems, setshowItems] = useState(false)

    const [trains, settrains] = useState([])
    const [rates, setrates] = useState([])
    
    const [selectedTrain, setselectedTrain] = useState({})

    const [ratesModal, setratesModal] = useState(false)    

    const fetchTrains = () => {
        // console.log({obj: props.obj})
        let URL = `${api.API_URL}${api.API_ENDPOINT.TRAIN}`;
        axios.get(`${URL}/find-trains/${props.from}/${props.to}`, {}, {
            headers: {},
        }).then((result)=>{
            // console.log({trains: result.data}) 
            settrains(result.data)               
        });
    }
    
    const addTrain = (fl) => {
        props.editReq('train', {
            id: fl.id,
            name: fl.trainName,
            number: fl.trainNo,
            dept: fl.departureTime,
            arrv: fl.arrivalTime,
            image: fl.mainImg
        })
        // setshowItems(false);
        notifRef.current.notifToggle('Success','Train added to booking');
    }

    const notifRef = useRef();

    return (<>
    <Notify ref={notifRef} />
        {(showItems) ? <div className="">
            <div className="text-base font-medium mx-3 grid grid-cols-2">
                <div className="text-base font-medium flex items-center">
                    <span>Available Trains</span>
                    <span className="ml-2 cursor-pointer" onClick={() => fetchTrains()}><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-refresh-ccw"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg></span>                             

                </div>                
            </div>
            
            <div className="grid grid-cols-3">
            {(trains.length != 0) ? trains.map((t,idx) => {
                return <div key={idx} className="p-5 mr-5 mt-2 shadow-xl grid grid-cols-12 border rounded-md border-slate-100/60 dark:border-darkmode-400">
                    
                    <div className="bg-dark rounded col-span-4" style={{height:'100px', backgroundImage:`url(${filePath}/train/${t.mainImg})`, backgroundPosition:'center', backgroundSize:'cover'}}></div>                                               
                    <div className="mx-4 col-span-8">
                        <div className="text-md font-bold ">{t.trainName}</div>
                        {/* <div className="text-xs font-medium ">{t.trainNo}</div> */}
                        <div className="text-sm font-medium">{t.departureTime} - {t.arrivalTime}</div>
                        <div className="flex mt-3 items-center">
                            <span className="text-lg font-bold">₹{t.price}</span>
                            <Button className="text-sm ml-5 bg-primary text-white " onClick={() => {addTrain(t); setselectedTrain(t);}}>Select</Button>
                        </div>
                        {/* <Button className="text-sm mt-2 bg-primary text-white " onClick={() => {setselectedTrain(a);}}>Select at ₹{t.price}</Button> */}
                    </div>                      
                </div>
            }) : 
            <div className="p-3">No trains found for selected locations.</div> }
            </div>
        </div> : 
        <div>
            <Button type="button" variant="outline-primary" onClick={()=> {
                    fetchTrains(); setshowItems(true); 
                }}
                className="mr-1"
            >
                Show Trains
            </Button>
        </div>
        }

    
    

    
    </>)
}

export default Trains;