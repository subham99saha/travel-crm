// @ts-nocheck
import { useState, useEffect, useRef, useCallback } from "react";
import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";
import { Slideover } from "../../base-components/Headless";

import axios from "axios";
import api from "../../../apiconfig.json";

const ReviewBooking = (props) => {
    // console.log({req: props?.requirements})
    // console.log({type: props?.type})
    const filePath = api.FILE_PATH;

    const [reviewSlideOver, setreviewSlideOver] = useState(false)

    const [roomRates, setroomRates] = useState([])
    const [mealRates, setmealRates] = useState([])
    const [carRates, setcarRates] = useState([])
    const [activityRates, setactivityRates] = useState([])
    const [flightRates, setflightRates] = useState([])
    const [trainRates, settrainRates] = useState([])
    
    const [reqTotalPrice, setreqTotalPrice] = useState(0)

    const [imgDisp, setimgDisp] = useState((props.mode === 'view') ? 'block' : 'none')

    useEffect(() => {
        // console.log({rev_payload: props.requirements})
    },[])
    // console.log({rev_payload: props.requirements})

    useEffect(() => {
        let accum = 0
        // if (roomRates.length != 0 && mealRates.length != 0 && carRates.length != 0) {
            roomRates.map(x => {
                accum += x.roomRate
            })
            mealRates.map(x => {
                accum += x.mealRate
            })
            carRates.map(x => {
                accum += x.carRate
            })
            activityRates.map(x => {
                accum += x.activityRate
            })
            flightRates.map(x => {
                accum += x.flightRate
            })
            trainRates.map(x => {
                accum += x.trainRate
            })
        // }
        setreqTotalPrice(accum)
    },[roomRates,mealRates,carRates])

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

    const calculateFlightRate = (fid,pref) => { return new Promise((resolve) => {
        // console.log({hid})
        let URL = `${api.API_URL}${api.API_ENDPOINT.FLIGHT}`;
        axios.post(`${URL}/${fid}`, {}, {
            headers: {},
        }).then((result)=>{
            // console.log({flight: result.data}) 
            const rateTot = result.data.price * pref.length  
            resolve(rateTot)          
            // resolve(1000)          
        }).catch(error => {
            resolve(0) 
        });     
    })}

    const calculateTrainRate = (tid,pref) => { return new Promise((resolve) => {
        // console.log({hid})
        let URL = `${api.API_URL}${api.API_ENDPOINT.TRAIN}`;
        axios.post(`${URL}/${tid}`, {}, {
            headers: {},
        }).then((result)=>{
            // console.log({train: result.data}) 
            let rateTot = 0
            pref.map(pr => {
                if (pr.class === 'SL') {
                    rateTot += Number(result.data.price)
                } else {
                    rateTot += Number(result.data[`price${pr.class}`])
                }
            })
            resolve(rateTot)          
            // resolve(1000)          
        }).catch(error => {
            resolve(0) 
        });     
    })}

    const calculateMealRate = (hid,pref,dateDiff) => { return new Promise((resolve) => {
        // console.log({hid})
        let URL = `${api.API_URL}${api.API_ENDPOINT.VENDOR_HOTEL}`;
        axios.post(`${URL}/${hid}`, {}, {
            headers: {},
        }).then((result)=>{
            // console.log({hotel: result.data}) 

            const hotel = result.data
            let mealRateTot = 0
            pref.map(p => {
                // console.log({p})
                if (p.mealPlan === 'AP') mealRateTot += Number(hotel.minBreakfastCharge) + Number(hotel.minLunchCharge) + Number(hotel.minDinnerCharge)
                else if (p.mealPlan === 'MAP') mealRateTot += Number(hotel.minBreakfastCharge) + ((Number(hotel.minLunchCharge) + Number(hotel.minDinnerCharge)) / 2)
                else if (p.mealPlan === 'CP') mealRateTot += Number(hotel.minBreakfastCharge)
                // console.log({ mealRateTot }) 
            })  
            mealRateTot *= dateDiff    
            
            // console.log({mealRateTot})
            resolve(mealRateTot)          
        }).catch(error => {
            resolve(0) 
        });     
    })}

    const calculateRate = (fromDate,toDate,itemType,itemId,itemObj) => { return new Promise((resolve) => {
        const dates = getDistinctYearMonthRange(fromDate, toDate);
        // console.log({dates});
        
        let URL = `${api.API_URL}${api.API_ENDPOINT.DAY_RATES}`;
        axios.post(`${URL}/fetchByMonthYear/`, {
            rateFor: props.type, 
            itemType: itemType,
            itemID: itemId,
            paramsArray: dates
        }, {
            headers: {},
        }).then((result)=>{
            // console.log({rates: result.data})
            if (result.data.success === true) {
                const startDate = new Date(fromDate);
                const endDate = new Date(toDate);  
                if (itemType === 'room') {
                    endDate.setDate(endDate.getDate() - 1) 
                }
                
                let ratesTot = 0
                // console.log({startDate,endDate})
                for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
                    // console.log({ test: date.getDate() + 1 })
                    let rate = result.data.message.find(x => { return (x.month === Number(date.getMonth() + 1)) && (x.year === Number(date.getFullYear())) })
                    // console.log({rate})
                    let dayRates = JSON.parse(rate.dayRates)
                    let dayRate = dayRates[date.getDate() - 1]

                    if (itemType === 'room') {
                        ratesTot += Number(dayRate.rate) + (Number(dayRate.rateChild) * itemObj.kidCount) + (Number(dayRate.rateExtraBed) * itemObj.extraBedCount)
                    } else if (itemType === 'transport') {
                        let accum = Number(dayRate[`rate${itemObj.actype}`])
                        if (itemObj.rateType === 'hourly') {
                            accum *= Number(itemObj.minHours)
                        }
                        if (itemObj.chargeType === 'person') {
                            accum *= Number(itemObj.noOfSeats)
                        }
                        ratesTot += accum
                        // console.log({test: ratesTot})
                    } else if (itemType === 'activity') {
                        ratesTot += (Number(dayRate.rateAdult) * itemObj.adult) + (Number(dayRate.rateKid) * itemObj.kid) + (Number(dayRate.rateInfant) * itemObj.infant)
                    }
                }
                // console.log({itemType,ratesTot})
                resolve(ratesTot)
            }
            
        }).catch(error => {
            resolve(0) 
        });               
    })}

    const fetchAllRates = () => {
        
        const fetchLiveRoomRates = async () => {
            const promises = []
            props.requirements.hotel.hotelArr.map((h,index) => {
                h.room.map((rm,idx) => {
                    promises.push({ ...rm, hIndex: index, rIndex: idx, startDate: h.startDate, endDate: h.endDate });
                })              
            })
            const fetchedRates = await Promise.all(
                promises.map(async (prom) => {
                    const roomRate = await calculateRate(prom.startDate,prom.endDate,'room',prom.rid,{ extraBedCount: prom.extraBedCount, kidCount: prom.kidCount })
                    return { ...prom, roomRate }
                }
            ));
            props.editSavedRates('roomRates',fetchedRates)
            setroomRates(fetchedRates);
            // console.log({roomRates: fetchedRates})
        };

        const fetchLiveMealRates = async () => {
            const fetchedRates = await Promise.all(
                props.requirements.hotel.hotelArr.map(async (h,order) => {
                    const startDate = new Date(h.startDate);
                    const endDate = new Date(h.endDate); 
                    const diffTime = Math.abs(endDate - startDate);
                    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                    const mealRate = await calculateMealRate(h.hotel.id,h.preferrences,diffDays)
                    return { order, mealRate };
                    // console.log({mealRate})
                    // return mealRate
                })
            )
            props.editSavedRates('mealRates',fetchedRates)
            setmealRates(fetchedRates);
            // console.log({mealRates: fetchedRates})
        }

        const fetchLiveCarRates = async () => {
            const promises = []
            props.requirements.car.carArr.map((c,index) => {
                c.cars.map(async (cr,idx) => {
                    promises.push({ ...cr, cIndex: index, itemIndex: idx, startDate: c.fromDate, endDate: c.toDate, noOfSeats: c.noOfSeats });
                })  
            })
            // console.log({promises})
            const fetchedRates = await Promise.all(
                promises.map(async (prom) => {
                    // console.log({prom})
                    const carRate = await calculateRate(prom.startDate,prom.endDate,'transport',prom.id,{ actype: prom.type, rateType: prom.rateType, chargeType: prom.chargeType, minHours: prom.minHours, noOfSeats: prom.noOfSeats })
                    // console.log({carRate})
                    return { ...prom, carRate };
                })
            )
            props.editSavedRates('carRates',fetchedRates)
            setcarRates(fetchedRates);
            // console.log({carRates: fetchedRates})

        }

        const fetchLiveActivityRates = async () => {
            const fetchedRates = await Promise.all(
                props.requirements.activity.activityArr.map(async (a,order) => {
                    const activityRate = await calculateRate(a.fromDate,a.toDate,'activity',a.activity.id,{ adult: a.adult, kid: a.kid, infant: a.infant })
                    // console.log({activityRate})
                    return { ...a, order, activityRate };
                })
            )
            props.editSavedRates('activityRates',fetchedRates)
            setactivityRates(fetchedRates);
        }

        const fetchLiveFlightRates = async () => {
            const fetchedRates = await Promise.all(
                props.requirements.flight.flightArr.map(async (f,order) => {
                    const flightRate = await calculateFlightRate(f.flight.id,f.preferrences)
                    // console.log({flightRate})
                    return { order, flightRate };
                })
            )
            props.editSavedRates('flightRates',fetchedRates)
            setflightRates(fetchedRates);
        }

        const fetchLiveTrainRates = async () => {
            const fetchedRates = await Promise.all(
                props.requirements.train.trainArr.map(async (t,order) => {
                    const trainRate = await calculateTrainRate(t.train.id,t.preferrences)
                    // console.log({trainRate})
                    return { order, trainRate };
                })
            )
            props.editSavedRates('trainRates',fetchedRates)
            settrainRates(fetchedRates);
        }
    
        fetchLiveRoomRates()
        fetchLiveMealRates()
        fetchLiveCarRates()
        fetchLiveActivityRates()
        fetchLiveFlightRates()
        fetchLiveTrainRates()
    };

    return <>
    {/* <div className=" my-4 z-50" onClick={() => {setreviewSlideOver(true); fetchAllRates();}}>
        <Button>Review Booking</Button>
    </div> */}
    <div
        className="fixed bottom-0 right-0 z-50 bg-primary flex items-center justify-center w-40 h-12 mb-10 mr-10 border rounded-full shadow-xl cursor-pointer box"
        onClick={() => {setreviewSlideOver(true); fetchAllRates();}}
    >
        <div className="text-white font-bold">
            Review Booking
        </div>    
    </div>

    <Slideover size={(props.mode === 'view') ? "lg" : "md"} open={reviewSlideOver} onClose={()=> {
        setreviewSlideOver(false);
    }}
    >
        <Slideover.Panel>
            <Slideover.Title className="p-5">
                <span className="mr-auto text-md font-medium">
                    Review Bookings
                </span>  
                <span className="float-end cursor-pointer" onClick={() => fetchAllRates()}><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-refresh-ccw"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg></span>                             
            </Slideover.Title>
            <Slideover.Description className="pt-0">
                {(props.requirements?.flight.show) ?   
                    props.requirements.flight.flightArr.map((f,index) => {                        
                        const flightRate = flightRates.find(x => { return (x.order === index)})

                        return (Object.keys(f.flight).length != 0) ? <div key={index} className="mb-3">
                            <div className=" grid grid-cols-1" >
                                <table class="table-auto text-center shadow-xl ">
                                    <caption className="p-3 text-lg font-bold text-left">
                                        Flight {(index + 1)}
                                    </caption>
                                    <thead className="border-dashed border-2 border-slate-600/20">
                                        <tr>
                                        <th className="px-5 py-3 text-left">Item</th>
                                        <th>For</th>
                                        <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-dashed border-2 border-slate-600/20">
                                        <tr className="">
                                            <th className="p-5 flex items-center">                                                    
                                                <div className="bg-dark rounded mr-5" style={{display:`${imgDisp}`, height:'60px', width:'100px', backgroundImage:`url(${filePath}/flight/${f.flight.image})`, backgroundPosition:'center', backgroundSize:'cover'}}></div>                                               
                                                <div>{f.flight.name} - {f.flight.number}</div>
                                            </th>
                                            <td className="p-2">{f.preferrences.length}</td>
                                            <th className="p-2">₹ {flightRate?.flightRate}</th>
                                        </tr>
                                        
                                    </tbody>
                                </table>
                            </div>
                            </div>
                            : '' 
                        
                    })
                : '' }

                {(props.requirements?.train.show) ?   
                    props.requirements.train.trainArr.map((t,index) => {                        
                        const trainRate = trainRates.find(x => { return (x.order === index)})

                        return (Object.keys(t.train).length != 0) ? <div key={index} className="mb-3">
                            <div className=" grid grid-cols-1" >
                                <table class="table-auto text-center shadow-xl ">
                                    <caption className="p-3 text-lg font-bold text-left">
                                        Train {(index + 1)}
                                    </caption>
                                    <thead className="border-dashed border-2 border-slate-600/20">
                                        <tr>
                                        <th className="px-5 py-3 text-left">Item</th>
                                        <th>For</th>
                                        <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-dashed border-2 border-slate-600/20">
                                        <tr className="">
                                            <th className="p-5 flex items-center">                                                    
                                                <div className="bg-dark rounded mr-5" style={{display:`${imgDisp}`, height:'60px', width:'100px', backgroundImage:`url(${filePath}/train/${t.train.image})`, backgroundPosition:'center', backgroundSize:'cover'}}></div>                                               
                                                <div>{t.train.name} - {t.train.number}</div>
                                            </th>
                                            <td className="p-2">{t.preferrences.length}</td>
                                            <th className="p-2">₹ {trainRate?.trainRate}</th>
                                        </tr>
                                        
                                    </tbody>
                                </table>
                            </div>
                            </div>
                            : '' 
                        
                    })
                : '' }

                {(props.requirements?.hotel.show) ?
                    props.requirements.hotel.hotelArr.map((h,index) => {
                        const startDate = new Date(h.startDate);
                        const endDate = new Date(h.endDate); 
                        const diffTime = Math.abs(endDate - startDate);
                        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

                        // const mealRate = await calculateMealRate(h.hotelId,h.preferrences,diffDays)
                        const mealRate = mealRates.find(x => { return (x.order === index)})
                        // console.log({mealRate})
                        let roomRateTotal = 0, kidTotal = 0, adultTotal = 0

                        return (h.room.length != 0) ? <div key={index} className="mb-3">
                            <div className=" grid grid-cols-1" >
                            <table class="table-auto text-center shadow-xl ">
                                <caption className="p-3 text-lg font-bold text-left">
                                    Hotel {index + 1}
                                </caption>
                                <thead className="border-dashed border-2 border-slate-600/20">
                                    <tr>
                                    <th className="px-5 py-3 text-left">Item</th>
                                    <th>Nights</th>
                                    <th>For</th>
                                    <th>With</th>
                                    <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody className="border-dashed border-2 border-slate-600/20">
                                    {h.room.map((rm,idx) => {
                                        // const roomRate = await calculateRate(h.startDate,h.endDate,'room',rm.rid,rm.extraBedCount,rm.kidCount)
                                        const roomRate = roomRates.find(x => { return (x.hIndex === index && x.rIndex === idx)})
                                        // console.log({roomRate})
                                        roomRateTotal += roomRate?.roomRate
                                        kidTotal += rm.kidCount
                                        adultTotal += rm.extraBedCount + Number(rm?.adultCount)

                                        return <tr key={idx} className="">
                                            <th className="p-5 flex items-center">
                                                <div className="bg-dark rounded mr-5" style={{display:`${imgDisp}`, height:'60px', width:'100px', backgroundImage:`url(${filePath}/hotel/${h.hotel.image})`, backgroundPosition:'center', backgroundSize:'cover'}}></div>                                               
                                                <div>ROOM-{rm.rid}</div>
                                            </th>
                                            <td className="p-2">{diffDays}</td>
                                            <td className="p-2">{Number(rm?.adultCount)}</td>
                                            <td className="p-2">
                                                {(rm.kidCount) ? <>{rm.kidCount} Kid(s)</>  : ''}
                                                {(rm.extraBedCount) ? <>{rm.extraBedCount} Extra Bed(s)</>  : ''}</td>
                                            <td className="p-2">₹ {roomRate?.roomRate}</td>
                                        </tr>
                                    })}
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th colSpan={2} className="border-dashed border-2 border-slate-600/20 p-2">{adultTotal} Adults, {kidTotal} Kid(s)</th>
                                    <th className="border-dashed border-2 border-slate-600/20 p-2">₹ {roomRateTotal}</th>
                                </tr>
                                    {(mealRate?.mealRate != 0) ? <tr>
                                        <th className="p-2 text-right">Meal</th>
                                        <th className="p-2">{diffDays}</th>
                                        <th className="p-2">{h.preferrences.length}</th>
                                        <th className="p-2"></th>
                                        <th className="p-2">₹ {mealRate?.mealRate}</th>
                                    </tr>
                                    : '' }
                                </tbody>
                            </table>
                            </div>
                        </div>
                        : '' 
                    })
                : '' }

                {(props.requirements?.car.show) ?   
                    props.requirements.car.carArr.map((c,index) => {                        
                        const typeObj = {
                            AC: 'AC', NonAC: 'Non AC'
                        }
                        
                        const startDate = new Date(c.fromDate);
                        const endDate = new Date(c.toDate); 
                        const diffTime = Math.abs(endDate - startDate);
                        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

                        let carRateTotal = 0

                        return (c.cars.length != 0) ? <div key={index} className="mb-3">
                            <div className=" grid grid-cols-1" >
                                <table class="table-auto text-center shadow-xl ">
                                    <caption className="p-3 text-lg font-bold text-left">
                                        Fleet {index + 1}
                                    </caption>
                                    <thead className="border-dashed border-2 border-slate-600/20">
                                        <tr className="">
                                            <th className="px-5 py-3 text-left">Item</th>
                                            <th>Days</th>
                                            <th>Type</th>
                                            <th>For</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-dashed border-2 border-slate-600/20">
                                        {c.cars.map((cr,idx) => {
                                            const carRate = carRates.find(x => { return (x.cIndex === index && x.itemIndex === idx)})
                                            // console.log({carRate})
                                            carRateTotal += carRate?.carRate

                                            return <tr key={idx} className="">
                                                <th className="p-5 flex items-center">                                                    
                                                    <div className="bg-dark rounded mr-5" style={{display:`${imgDisp}`, height:'60px', width:'100px', backgroundImage:`url(${filePath}/transport/${cr.image})`, backgroundPosition:'center', backgroundSize:'cover'}}></div>                                               
                                                    <div>{cr.name}</div>
                                                </th>
                                                <td className="p-2">{diffDays}</td>
                                                <td className="p-2">{cr.type}</td>
                                                <td className="p-2">{(cr.chargeType === 'person') ? carRate?.noOfSeats : ''}</td>
                                                <td className="p-2">₹ {carRate?.carRate}</td>
                                            </tr>
                                        })}
                                        <tr>
                                            <th colSpan={4} className=""></th>
                                            <th className="border-dashed border-2 border-slate-600/20 p-2">₹ {carRateTotal}</th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            </div>
                            : '' 
                        
                    })
                : '' }

                {(props.requirements?.activity.show) ?   
                    props.requirements.activity.activityArr.map((a,index) => {                        
                        const startDate = new Date(a.fromDate);
                        const endDate = new Date(a.toDate); 
                        const diffTime = Math.abs(endDate - startDate);
                        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

                        // let activityRateTotal = 0

                        const activityRate = activityRates.find(x => { return (x.order === index)})
                        // console.log({activityRate})
                        // activityRateTotal += activityRate?.activityRate

                        return (Object.keys(a.activity).length != 0) ? <div key={index} className="mb-3">
                            <div className=" grid grid-cols-1" >
                                <table class="table-auto text-center shadow-xl ">
                                    <caption className="p-3 text-lg font-bold text-left">
                                        Activity {(index + 1)}
                                    </caption>
                                    <thead className="border-dashed border-2 border-slate-600/20">
                                        <tr>
                                        <th className="px-5 py-3 text-left">Item</th>
                                        <th>Days</th>
                                        <th>Adults</th>
                                        <th>Kids</th>
                                        <th>Infants</th>
                                        <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-dashed border-2 border-slate-600/20">
                                        <tr className="">
                                            <th className="p-5 flex items-center">                                                    
                                                <div className="bg-dark rounded mr-5" style={{display:`${imgDisp}`, height:'60px', width:'100px', backgroundImage:`url(${filePath}/activity/${a.activity.image})`, backgroundPosition:'center', backgroundSize:'cover'}}></div>                                               
                                                <div>{a.activity.name}</div>
                                            </th>
                                            <td className="p-2">{diffDays}</td>
                                            <td className="p-2">{a.adult}</td>
                                            <td className="p-2">{a.kid}</td>
                                            <td className="p-2">{a.infant}</td>
                                            <th className="p-2">₹ {activityRate?.activityRate}</th>
                                        </tr>
                                        
                                        {/* <tr>
                                            <th colSpan={4} className=""></th>
                                            <th className="border-dashed border-2 border-slate-600/20 p-2">₹ {carRateTotal}</th>
                                        </tr> */}
                                    </tbody>
                                </table>
                            </div>
                            </div>
                            : '' 
                        
                    })
                : '' }

                <p className="mt-8 text-center">Calculated rates of selected requirements will appear here</p>
            </Slideover.Description>
            <Slideover.Footer className="bg-gray-200 grid grid-cols-2">
                <div className="flex justify-start">
                <div className="">
                    <span className="text-xs font-light float-start">Final Price </span><br />
                    <span className="text-xl font-bold">₹ </span>
                    <span className="text-3xl font-semibold">{reqTotalPrice}</span></div>
                </div>
                <div className="flex items-center justify-end">
                    <Button variant="primary" type="button" className="" onClick={() => props.saveBooking()}>
                        Confirm
                    </Button>
                </div>
                
        </Slideover.Footer>
        </Slideover.Panel>
    </Slideover>
    </>
}

export default ReviewBooking