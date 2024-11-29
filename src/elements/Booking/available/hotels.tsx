// @ts-nocheck
import { useState, useEffect, useRef, useCallback } from "react";
import Button from "../../../base-components/Button";
import Lucide from "../../../base-components/Lucide";
import { FormSelect } from "../../../base-components/Form";
import { Dialog, Slideover, Menu } from "../../../base-components/Headless";
import axios from "axios";
import api from "../../../../apiconfig.json";

import Notify from "../../notify"

function Hotels(props) {
    const filePath = api.FILE_PATH;

    const [showItems, setshowItems] = useState(false)

    const [hotels, sethotels] = useState([])
    const [rooms, setrooms] = useState([])
    const [rates, setrates] = useState([])
    
    const [selectedHotel, setselectedHotel] = useState({})
    const [selectedRoom, setselectedRoom] = useState({})
    const [kidsSelect, setkidsSelect] = useState([])
    
    // const [savedHotel, setsavedHotel] = useState(props.obj.hotel)
    // const [savedRooms, setsavedRooms] = useState(props.obj.rooms)

    const [roomsModal, setroomsModal] = useState(false)
    const [roomRatesModal, setroomRatesModal] = useState(false)
    

    function getDistinctYearMonthRange(checkIn, checkOut) {
        const startDate = new Date(checkIn);
        const endDate = new Date(checkOut);
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

    useEffect(() => {        
        props.editReq('rooms',[])  
    },[selectedHotel])

    // useEffect(() => {
    //     console.log('change...')
    //     calculateMealRateTotal(selectedHotel)
    // },[props.preferrences,props.checkIn,props.checkOut])
    
    // useEffect(() => {        
    //     setshowItems(false)
    // }, [props.city]);

    const fetchHotels = () => {
        // console.log(props.city)
        let URL = `${api.API_URL}${api.API_ENDPOINT.VENDOR_HOTEL}`;
        axios.get(`${URL}/find-by-city/${JSON.stringify([props.city])}`, {}, {
            headers: {},
        }).then((result)=>{
            // console.log({hotels: result.data}) 
            sethotels(result.data) 
            // console.log(dayRatesArr)            
        });  
    }

    const fetchRooms = (hid,hname,himg) => {
        props.editReq('hotel',{
            id: hid,
            name: hname,
            image: himg
        })
        notifRef.current.notifToggle('Success',`Hotel Selected`);

        let URL = `${api.API_URL}${api.API_ENDPOINT.VENDOR_HOTEL_ROOM}`;
        axios.post(`${URL}/hotel/${hid}`, {}, {
            headers: {},
        }).then((result)=>{
            // console.log({rooms: result.data}) 
            setrooms(result.data)
            setroomsModal(true)
        })
    }

    const fetchRates = (rid) => {
        if (props.checkIn != '' && props.checkOut != '') {
            const dates = getDistinctYearMonthRange(props.checkIn, props.checkOut);
            // console.log({dates});
            
            let URL = `${api.API_URL}${api.API_ENDPOINT.DAY_RATES}`;
            axios.post(`${URL}/fetchByMonthYear/`, {
                rateFor: props.type, 
                itemType: 'room',
                itemID: rid,
                paramsArray: dates
            }, {
                headers: {},
            }).then((result)=>{
                // console.log({rates: result.data})
                const rateArray = [];
                if (result.data.success === true) {
                    const startDate = new Date(props.checkIn);
                    const endDate = new Date(props.checkOut);  
                    endDate.setDate(endDate.getDate() - 1)          
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
        setselectedRoom(rooms.find(r => r.id === Number(rid)))
        const options = [];
        for (let i = 1; i <= rooms.find(r => r.id === Number(rid))?.hRoomMaxOccuChild; i++) {
            options.push(i)
        }
        setkidsSelect(options)
        setroomsModal(false)
        setroomRatesModal(true)
    }

    const addRoom = (extraBedCount,kidCount) => {
        props.editReq('room',[...props.obj.room, { rid: selectedRoom.id, extraBedCount, kidCount, adultCount: selectedRoom?.hRoomMaxOccuAdult }])
        
        setroomRatesModal(false)
        setroomsModal(true)
        notifRef.current.notifToggle('Success','Room added to booking');                
    }

    const notifRef = useRef();

    return (<>
    <Notify ref={notifRef} />
        {(showItems) ? <div className="">
            <div className="text-base font-medium mx-3 grid grid-cols-2">
            <div className="text-base font-medium flex items-center">
                <span>Available Hotel</span>
                <span className="ml-2 cursor-pointer" onClick={() => fetchHotels()}><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-refresh-ccw"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg></span>                             
            </div>
                
            </div>
            
            <div className="grid grid-cols-2">
            {(hotels.length != 0) ? hotels.map((h,idx) => {
                return <div key={idx} className="p-5 mr-5 mt-2 shadow-xl grid grid-cols-12 border rounded-md border-slate-100/60 dark:border-darkmode-400">
                    
                    <div className="bg-dark rounded col-span-3" style={{height:'100px', backgroundImage:`url(${filePath}/hotel/${h.mainImg})`, backgroundPosition:'center', backgroundSize:'cover'}}></div>                                               
                    <div className="mx-5 col-span-6">
                        <div className="text-lg font-medium ">{h.hotelName}</div>
                        <div className="text-xs font-light">{h.hotelType}</div>
                        <p className="mt-3 text-xs">
                            {(h.isEP === 'Y') ? <span className="mr-2">EP</span>: ''}
                            {(h.isAP === 'Y') ? <span className="mr-2">AP</span>: ''}
                            {(h.isMAP === 'Y') ? <span className="mr-2">MAP</span>: ''}
                            {(h.isCP === 'Y') ? <span className="mr-2">CP</span>: ''}
                        </p>
                        <p>
                        <span className="text-xs font-light mr-2">₹ {h.minBreakfastCharge} (B)</span>
                        <span className="text-xs font-light mr-2">₹ {h.minLunchCharge} (L)</span>
                        <span className="text-xs font-light mr-2">₹ {h.minDinnerCharge} (D)</span>
                        </p>
                    </div>  
                    <div className="col-span-3">
                        <span className="text-base font-medium">₹ {h.minRoomRentSeasonAC}</span><br />
                        <span className="text-xs font-light">₹ {h.minRoomRentSeasonNonAC} (Non AC)</span><br /> 
                        {/* <span className="text-xs font-light">₹ {h.minBreakfastCharge} (B)</span><br /> 
                        <span className="text-xs font-light">₹ {h.minLunchCharge} (L)</span><br /> 
                        <span className="text-xs font-light">₹ {h.minDinnerCharge} (D)</span><br />  */}
                        <Button className="text-xs mt-3 bg-primary text-white" onClick={() => {fetchRooms(h.id,h.hotelName,h.mainImg); setselectedHotel(h);}}>Pick Rooms</Button>
                    </div>                      
                </div>
            }) : 
            <div className="p-3">No hotels found for selected city.</div> }
            </div>
        </div> : 
        <div>
            <Button type="button" variant="outline-primary" onClick={()=> {
                    fetchHotels(); setshowItems(true); 
                }}
                className="mr-1"
            >
                Show Hotels
            </Button>
        </div>
        }

    <Dialog open={roomsModal} onClose={()=> {
            setroomsModal(false);
        }}
        // initialFocus={sendButtonRef}
        >
        <Dialog.Panel>
            <Dialog.Title>
                <h2 className="mr-auto text-base font-medium">
                    {selectedHotel?.hotelName}
                </h2>
            </Dialog.Title>
            <Dialog.Description style={{maxHeight: '400px'}} className="pt-0 overflow-y-scroll scrollbar-hide">
                {(rooms.length != 0) ? rooms.map((r,idx) => {
                    return <div key={idx} className="p-5 mt-3 shadow-xl grid grid-cols-12 border border-2 rounded-md border-slate-250/60 dark:border-darkmode-400">
                        <div className="col-span-7">   
                            <div className="text-lg font-medium ">{r.hRoomName}</div>
                            <div className="text-xs font-light">
                                <span className="mr-3">{r.roomType}</span> 
                                <span className="mr-3">{r.hRoomFloor} Floor</span> 
                                <span className="mr-3">{r.hRoomBedType} Bed x {r.hRoomNoBed}</span> 
                            </div>
                            <div className="text-xs font-light">
                                <span className="mr-3">Adults x {r.hRoomMaxOccuAdult}</span> 
                                <span className="mr-3">Kids x {r.hRoomMaxOccuChild}</span> 
                            </div>
                        </div>
                        <div className="col-span-5 grid justify-items-end">  
                            <Button className="text-xs mt-3 bg-primary text-white h-8" onClick={() => fetchRates(r.id)}>Check Rates</Button>
                        </div>
                    </div>
                }) : 
                <div className="p-1 mt-3">No rooms found for selected hotel.</div>}
            </Dialog.Description>
            <Dialog.Footer>
                <Button type="button" variant="outline-secondary" onClick={()=> {
                    setroomsModal(false);
                    }}
                    className="w-20 mr-1"
                    >
                    Cancel
                </Button>
                
            </Dialog.Footer>
        </Dialog.Panel>
    </Dialog>

    <Dialog open={roomRatesModal} onClose={()=> {
            setroomRatesModal(false);
        }}
        // initialFocus={sendButtonRef}
        >
        <Dialog.Panel>
            <Dialog.Title className="">
                <h2 className="mr-auto text-base font-medium">
                    {selectedHotel?.hotelName} ({selectedRoom?.hRoomName})
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
                <div className="p-1 mt-3">No day wise rates found for selected room.</div>}
            </Dialog.Description>
            <Dialog.Footer className="">
                <Menu className="inline mr-1">
                    <Menu.Button as={Button} variant="outline-secondary">
                        Select <Lucide icon="ChevronDown" className="w-4 h-4 ml-2" />
                    </Menu.Button>
                    <Menu.Items className="w-48" placement="top-end">
                        <Menu.Item onClick={() => addRoom(0,0)}>Select</Menu.Item>
                        <Menu.Item onClick={() => addRoom(1,0)}>Select with extra bed</Menu.Item>
                        {/* {kidsSelect} */}
                        {kidsSelect.map((x,i) => {
                            return <Menu.Item key={i} onClick={() => addRoom(0,i+1)}>Select with {i+1} kid(s)</Menu.Item>
                        })}
                        {/* <Menu.Footer className="flex items-center">
                            <div>Select with kid</div>
                            <FormSelect
                                className="w-16 ml-2"
                            >
                                {kidsSelect}
                            </FormSelect>
                        </Menu.Footer> */}
                    </Menu.Items>
                </Menu>
                <Button type="button" variant="outline-secondary" onClick={()=> {
                    setroomRatesModal(false); setroomsModal(true);
                    }}
                    className="w-20 mr-1"
                    >
                    Back
                </Button>
                
            </Dialog.Footer>
        </Dialog.Panel>
    </Dialog>

    </>)
}

export default Hotels;