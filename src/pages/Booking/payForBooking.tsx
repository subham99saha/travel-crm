// @ts-nocheck
import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";

import { getLead } from "./api"
import { indexStates } from "../State/api"

import axios from "axios";
import api from "../../../apiconfig.json";

const payForBooking = (props) => {
    const filePath = api.FILE_PATH;

    const params = useParams();
    const id = params.id

    const [states,setstates] = useState([])

    const [enquiryType,setenquiryType] = useState('')
    const [bookingDetails,setbookingDetails] = useState({})
    const [requirements,setrequirements] = useState({})
    const [savedRates,setsavedRates] = useState({})

    useEffect(() => { 
        // console.log(JSON.parse(localStorage.getItem('userInfo')).resData.sEmail)
        async function fetchData() {  
            if (id != null) {
                const st = await indexStates()
                // console.log({st})
                setstates(st)

                const response = await getLead(id)
                console.log({response})
                if (response.id) {
                    //   let newPayload = {...payload}
                    //   newPayload.enquiryType = response.enquiryType
                    response.bookingDetails = JSON.parse(response.bookingDetails)
                    response.requirements = JSON.parse(response.requirements)
                    response.savedRates = JSON.parse(response.savedRates)

                    setenquiryType(response.enquiryType)
                    setbookingDetails(response.bookingDetails)
                    setrequirements(response.requirements)
                    setsavedRates(response.savedRates)
                    // console.log({response})
                }
            }
        }
        fetchData();
        console.log(id)     
      
    },[])

    const getStateName = (id) => {
        let s = states.filter(x => x.id == id)
        return s[0]?.stateName
    } 

    return <>
    <div className="mb-5 p-5 intro-y box border rounded-md border-slate-200/60 dark:border-darkmode-400">
        <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">            
            <div className="flex items-center pb-5 text-lg font-bold border-b border-slate-200/60 dark:border-darkmode-400">
                Booking Details
            </div>
            
            <div className="grid grid-cols-3 gap-3 mt-5 gap-y-5">
                <div>
                    <table className="table-auto border-separate border-spacing-y-2">
                        <tr className=""><td className="font-semibold pr-3">Enquiry Type: </td><td>{enquiryType}</td></tr>
                        <tr className="">
                            <td className="font-semibold pr-3">Customer: </td>
                            <td>
                                {bookingDetails.name}
                                <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                    {bookingDetails.email}<br />
                                    {bookingDetails.mobile}   
                                </div> 
                            </td>
                        </tr>
                    </table>
                </div>
                <div>
                    <table className="table-auto border-separate border-spacing-y-2">
                        <tr className="">
                            <td className="font-semibold pr-3">Destination: </td>
                            <td>
                                {getStateName(bookingDetails.destination)}
                                <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                    {bookingDetails.travelType} trip
                                </div> 
                            </td>
                        </tr>
                        <tr className="">
                            <td className="font-semibold pr-3">Duration: </td>
                            <td>
                                {bookingDetails.startDate}
                                <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                    till {bookingDetails.endDate}
                                </div> 
                            </td>
                        </tr>
                    </table>
                </div>
                <div>
                    <table className="table-auto border-separate border-spacing-y-2">
                        <tr className=""><td className="font-semibold pr-3">WhatsApp: </td><td>{bookingDetails.whatsapp}</td></tr>
                        <tr className=""><td className="font-semibold pr-3">Skype: </td><td>{bookingDetails.skype}</td></tr>
                        <tr className=""><td className="font-semibold pr-3">Lead Source: </td><td>{bookingDetails.leadSource}</td></tr>
                        {/* <tr className=""><td className="font-semibold pr-3">Status: </td><td>{payload.status}</td></tr> */}
                    </table>
                </div>
            </div>
        </div>
        </div>
    <div className="p-5 intro-y box border rounded-md border-slate-200/60 dark:border-darkmode-400 grid grid-cols-2 gap-5">
    { (Object.keys(savedRates).length != 0) ? <>

        {(requirements?.flight.show) ?   
            requirements.flight.flightArr.map((f,index) => {                        
                
                const flightRate = savedRates.flightRates.find(x => { return (x.order === index)})

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
                                        <div className="bg-dark rounded mr-5" style={{height:'60px', width:'100px', backgroundImage:`url(${filePath}/flight/${f.flight.image})`, backgroundPosition:'center', backgroundSize:'cover'}}></div>                                               
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

        {(requirements?.train.show) ?   
            requirements.train.trainArr.map((t,index) => {                        
                
                const trainRate = savedRates.trainRates.find(x => { return (x.order === index)})

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
                                        <div className="bg-dark rounded mr-5" style={{height:'60px', width:'100px', backgroundImage:`url(${filePath}/train/${t.train.image})`, backgroundPosition:'center', backgroundSize:'cover'}}></div>                                               
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

        {(requirements?.hotel?.show) ?
            requirements.hotel.hotelArr.map((h,index) => {
                const startDate = new Date(h.startDate);
                const endDate = new Date(h.endDate); 
                const diffTime = Math.abs(endDate - startDate);
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

                // const mealRate = await calculateMealRate(h.hotelId,h.preferrences,diffDays)
                const mealRate = savedRates.mealRates.find(x => { return (x.order === index)})
                // console.log({mealRate})
                let roomRateTotal = 0, kidTotal = 0, adultTotal = 0

                return (h.room.length != 0) ? <div key={index} className="mb-3 col-span-2">
                    <div className="grid grid-cols-1" >
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
                                const roomRate = savedRates.roomRates.find(x => { return (x.hIndex === index && x.rIndex === idx)})
                                // console.log({roomRate})
                                roomRateTotal += roomRate?.roomRate
                                kidTotal += rm.kidCount
                                adultTotal += rm.extraBedCount + Number(rm?.adultCount)

                                return <tr key={idx} className="">
                                    <th className="p-5 flex items-center">
                                        <div className="bg-dark rounded mr-5" style={{ height:'60px', width:'100px', backgroundImage:`url(${filePath}/hotel/${h.hotel.image})`, backgroundPosition:'center', backgroundSize:'cover'}}></div>                                               
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

        {(requirements?.car?.show) ?   
            requirements.car.carArr.map((c,index) => {                        
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
                                    const carRate = savedRates.carRates.find(x => { return (x.cIndex === index && x.itemIndex === idx)})
                                    // console.log({carRate})
                                    carRateTotal += carRate?.carRate

                                    return <tr key={idx} className="">
                                        <th className="p-5 flex items-center">                                                    
                                            <div className="bg-dark rounded mr-5" style={{ height:'60px', width:'100px', backgroundImage:`url(${filePath}/transport/${cr.image})`, backgroundPosition:'center', backgroundSize:'cover'}}></div>                                               
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

        {(requirements?.activity?.show) ?   
            requirements.activity.activityArr.map((a,index) => {                        
                const startDate = new Date(a.fromDate);
                const endDate = new Date(a.toDate); 
                const diffTime = Math.abs(endDate - startDate);
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

                // let activityRateTotal = 0

                const activityRate = savedRates.activityRates.find(x => { return (x.order === index)})
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
                                        <div className="bg-dark rounded mr-5" style={{ height:'60px', width:'100px', backgroundImage:`url(${filePath}/activity/${a.activity.image})`, backgroundPosition:'center', backgroundSize:'cover'}}></div>                                               
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
        </>
    : 'No saved rates'}
    </div>
    </>
}

export default payForBooking