// @ts-nocheck
import { useState, useEffect, useRef, useCallback } from "react";
import Button from "../../../base-components/Button";
import Lucide from "../../../base-components/Lucide";
import { FormSelect } from "../../../base-components/Form";
import { Dialog, Slideover, Menu } from "../../../base-components/Headless";
import axios from "axios";
import api from "../../../../apiconfig.json";

import Notify from "../../notify"

function Transports(props) {
    const filePath = api.FILE_PATH;

    const [showItems, setshowItems] = useState(false)

    const [transports, settransports] = useState([])
    const [rates, setrates] = useState([])
    
    const [selectedTransport, setselectedTransport] = useState({})

    const [ratesModal, setratesModal] = useState(false)    

    function getDistinctYearMonthRange(fromDate, toDate) {
        const startDate = new Date(fromDate);
        const endDate = new Date(toDate);
        const dateArray = [];    
        for (let date = new Date(startDate); date <= endDate; date.setMonth(date.getMonth() + 1)) {
            const year = date.getFullYear();
            const month = date.getMonth() + 1; // getMonth() is zero-based    
            dateArray.push({ year, month });    
            // Move to the next month and reset the date to the first day of the month
            date.setDate(1);
        }    
        return dateArray;
    }

    // useEffect(() => {
    //     setrateTotalArr([])
    //     // setdateDiff(0)
    // },[selectedTransport])
    
    // useEffect(() => {        
    //     setshowItems(false)
    // }, [props.obj]);

    const fetchTransports = () => {
        // console.log({obj: props.obj})
        let empty = false
        Object.keys(props.obj).map(key => {
            if (props.obj[key] === '') empty = true
        })
        if (empty) {
            console.log('Fill all fields first...')
        } else {
            let URL = `${api.API_URL}${api.API_ENDPOINT.TRANSPORT}`;
            axios.post(`${URL}/find-by-particulars/`, {
                cityId: props.obj.cityId,
                departure: props.obj.departure,
                destination: props.obj.destination,
                noOfSeats: props.obj.noOfSeats
            }, {
                headers: {},
            }).then((result)=>{
                // console.log({transports: result.data}) 
                settransports(result.data) 
                // console.log(dayRatesArr)                
            });  
        }
    }

    const fetchRates = (tid) => {
        if (props.fromDate != '' && props.toDate != '') {
            const dates = getDistinctYearMonthRange(props.fromDate, props.toDate);
            // console.log({dates});
            
            let URL = `${api.API_URL}${api.API_ENDPOINT.DAY_RATES}`;
            axios.post(`${URL}/fetchByMonthYear/`, {
                rateFor: props.type, 
                itemType: 'transport',
                itemID: tid,
                paramsArray: dates
            }, {
                headers: {},
            }).then((result)=>{
                // console.log({rates: result.data})
                const rateArray = [];
                if (result.data.success === true) {
                    const startDate = new Date(props.fromDate);
                    const endDate = new Date(props.toDate);  
                    // endDate.setDate(endDate.getDate() - 1)          
                    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
                        // console.log({ test: date.getDate() + 1 })
                        let rate = result.data.message.find(x => { return (x.month === Number(date.getMonth() + 1)) && (x.year === Number(date.getFullYear())) })
                        // console.log({rate})
                        let dayRates = JSON.parse(rate.dayRates)
                        // rateArray.push(rate);
                        rateArray.push({ year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate(), dayRate: dayRates[date.getDate() - 1] })
                    }
                }
                // console.log({rateArray})
                setrates(rateArray)
            })
        }
        setselectedTransport(transports.find(t => t.id === Number(tid)))
        setratesModal(true)
    }

    const addTransport = (type) => {
        props.editReq('cars', [...props.obj.cars, {
            id: selectedTransport?.id,
            name: selectedTransport?.transportName,
            image: selectedTransport?.mainImg,
            rateType: selectedTransport?.rateType,
            chargeType: selectedTransport?.chargeType,
            minHours: selectedTransport?.minHours,
            type: type
        }])
        setratesModal(false);
        notifRef.current.notifToggle('Success','Transport added to booking');
    }

    const notifRef = useRef();

    return (<>
    <Notify ref={notifRef} />
        {(showItems) ? <div className="">
            <div className="text-base font-medium mx-3 grid grid-cols-2">
                <div className="text-base font-medium flex items-center">
                    <span>Available Cars</span>
                    <span className="ml-2 cursor-pointer" onClick={() => fetchTransports()}><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-refresh-ccw"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg></span>                             

                </div>                
            </div>
            
            <div className="grid grid-cols-2">
            {(transports.length != 0) ? transports.map((t,idx) => {
                return <div key={idx} className="p-5 mr-5 mt-2 shadow-xl grid grid-cols-12 border rounded-md border-slate-100/60 dark:border-darkmode-400">
                    
                    <div className="bg-dark rounded col-span-3" style={{height:'100px', backgroundImage:`url(${filePath}/transport/${t.mainImg})`, backgroundPosition:'center', backgroundSize:'cover'}}></div>                                               
                    <div className="mx-5 col-span-6">
                        <div className="text-lg font-medium ">{t.transportName}</div>
                        <div className="text-xs font-light mb-2">Seats {t.noOfseat}</div>
                        <div className="text-xs font-medium mb-1">{t.departure} - {t.destination}</div>
                        {/* <div className="text-xs font-light">{t.departureTime} - {t.arrivalTime}</div> */}
                        <div className="text-xs font-light"><span className="capitalize">{t.rateType}</span> rate charged per {t.chargeType}</div>
                    </div>  
                    <div className="col-span-3">
                        <span className="text-base font-medium">₹ {t.priceSeasonAC}</span><br />
                        <span className="text-xs font-light">₹ {t.priceSeasonNonAC} (Non AC)</span><br />
                        <Button className="text-xs mt-3 bg-primary text-white" onClick={() => {fetchRates(t.id); setselectedTransport(t);}}>Check Rates</Button>
                    </div>                      
                </div>
            }) : 
            <div className="p-3">No vehicles found for specified data.</div> }
            </div>
        </div> : 
        <div>
            <Button type="button" variant="outline-primary" onClick={()=> {
                    fetchTransports(); setshowItems(true); 
                }}
                className="mr-1"
            >
                Show Cars
            </Button>
        </div>
        }

    
    <Dialog open={ratesModal} onClose={()=> {
            setratesModal(false);
        }}
        // initialFocus={sendButtonRef}
        >
        <Dialog.Panel>
            <Dialog.Title>
                <h2 className="mr-auto text-base font-medium">
                    {selectedTransport?.transportName}
                </h2>
            </Dialog.Title>
            <Dialog.Description style={{maxHeight: '400px'}} className="pt-0 overflow-y-scroll scrollbar-hide grid grid-cols-2 mt-3">
                {(rates.length != 0) ? rates.map((rate,idx) => {
                    return <div key={idx} className="p-4 m-1.5 grid grid-cols-5 rounded-md border-dashed border-2 border-slate-800/60 dark:border-darkmode-400">                        
                        <div className="text-sm font-medium col-span-3">{rate.day} - {rate.month} - {rate.year} </div>
                        <div className="grid justify-items-end text-sm font-medium col-span-2">Day {idx + 1}</div>
                        <div className="col-span-5">
                            {/* <div className="grid grid-cols-4 mt-3"> */}<ul className="mt-1 list-disc">
                                {Object.keys(rate.dayRate).filter(k => { return (k != 'currentMonth' && k != 'season' && k != 'status') }).map(key => {
                                    if (rate.dayRate[key]) {
                                        return <li key={key} className="ml-4" ><span className="text-xs font-light mr-2">₹{rate.dayRate[key]} ({props.fieldNames[key]})</span></li>
                                    } else {
                                        return ''
                                    }
                                })}
                            </ul>   
                            {/* </div> */}
                            <div className="mt-3 inline-flex">
                                <span className="block text-green-600 text-xs font-medium py-0.5 dark:text-green-300 mr-3">{rate.dayRate.season}</span>
                                { (rate.dayRate.status === 'Block') ? <span className="block text-red-600 text-xs font-medium py-0.5 dark:text-red-300 mr-3">Unavailable</span> : '' }
                            </div>
                        </div>
                        {/* <div className="col-span-2 grid justify-items-end">  
                            <button type="button" className="text-xs mt-3 " >Select</button>
                        </div> */}
                    </div>
                }) : 
                <div className="p-1 mt-3">No day wise rates found for selected transport.</div>}
            </Dialog.Description>
            <Dialog.Footer>
                <Menu className="inline mr-1">
                    <Menu.Button as={Button} variant="outline-secondary">
                        Select <Lucide icon="ChevronDown" className="w-4 h-4 ml-2" />
                    </Menu.Button>
                    <Menu.Items className="w-48" placement="top-end">
                        <Menu.Item onClick={() => addTransport('AC')}>Select AC</Menu.Item>
                        <Menu.Item onClick={() => addTransport('NonAC')}>Select Non AC</Menu.Item>
                    </Menu.Items>
                </Menu>
                <Button type="button" variant="outline-secondary" onClick={()=> {
                    setratesModal(false);
                    }}
                    className="w-20 mr-1"
                    >
                    Cancel
                </Button>
                
            </Dialog.Footer>
        </Dialog.Panel>
    </Dialog>

    
    </>)
}

export default Transports;