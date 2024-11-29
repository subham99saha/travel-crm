// @ts-nocheck
import { useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";
import { indexStates } from "../../pages/State/api"
import { indexCities } from "../../pages/City/api"
import api from "../../../apiconfig.json";

import ReviewBooking from "../Booking/reviewBooking"

const viewDetails = (props) => { 
    const filePath = api.FILE_PATH; 

    const [states,setstates] = useState([])
    const [cities,setcities] = useState([])

    useEffect(() => {  
        async function fetchData() {       
            const st = await indexStates()
            // console.log({st})
            setstates(st)

            const ct = await indexCities()
            // console.log({ct})
            setcities(ct)
        }
        fetchData();
    },[])

    const getStateName = (id) => {
        let s = states.filter(x => x.id == id)
        return s[0]?.stateName
    } 
    const getCityName = (id) => {
        let c = cities.filter(x => x.id == id)
        return c[0]?.cityName
    } 
    // console.log({req: props.payload?.requirements})
    return (
        <>
        {/* <ReviewBooking requirements={props.payload?.requirements} type={props.payload.enquiryType} mode={`view`}/> */}
        <div className="mb-5">
            <Link to={`/create-booking/${props.id}`} ><Button className="mr-3">
                <Lucide icon="Pencil" className="w-4 h-4 mr-2" />
                Edit
            </Button></Link>
            <Link to={`/pay-for-booking/${props.id}`} ><Button className="mr-3">
                <span className="mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-scan-eye"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><circle cx="12" cy="12" r="1"/><path d="M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0"/></svg></span>
                Review
            </Button></Link>
            <Button className="mr-3" onClick={() => props.setassignConfirmationModal(true)}>
                <span className="mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-pen"><path d="M2 21a8 8 0 0 1 10.821-7.487"/><path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/><circle cx="10" cy="8" r="5"/></svg></span>
                Re-assign
            </Button>
            <Button className="mr-3">
                <span className="mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg></span>
                Delete
            </Button>
            <Button className="mr-3">
                <span className="mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-octagon-x"><path d="m15 9-6 6"/><path d="M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z"/><path d="m9 9 6 6"/></svg></span>
                Close
            </Button>        
        </div>


        <div className=" p-5 intro-y box border rounded-md border-slate-200/60 dark:border-darkmode-400">
        <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">            
            <div className="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Details
            </div>
            
            <div className="grid grid-cols-3 gap-3 mt-5 gap-y-5">
                <div>
                    <table className="table-auto border-separate border-spacing-y-2">
                        <tr className=""><td className="font-semibold pr-3">Enquiry Type: </td><td>{props.payload.enquiryType}</td></tr>
                        <tr className="">
                            <td className="font-semibold pr-3">Customer: </td>
                            <td>
                                {props.bookingDetails.name}
                                <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                    {props.bookingDetails.email}<br />
                                    {props.bookingDetails.mobile}   
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
                                {getStateName(props.bookingDetails.destination)}
                                <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                    {props.bookingDetails.travelType} trip
                                </div> 
                            </td>
                        </tr>
                        <tr className="">
                            <td className="font-semibold pr-3">Duration: </td>
                            <td>
                                {props.bookingDetails.startDate}
                                <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                    till {props.bookingDetails.endDate}
                                </div> 
                            </td>
                        </tr>
                    </table>
                </div>
                <div>
                    <table className="table-auto border-separate border-spacing-y-2">
                        <tr className=""><td className="font-semibold pr-3">WhatsApp: </td><td>{props.bookingDetails.whatsapp}</td></tr>
                        <tr className=""><td className="font-semibold pr-3">Skype: </td><td>{props.bookingDetails.skype}</td></tr>
                        <tr className=""><td className="font-semibold pr-3">Lead Source: </td><td>{props.bookingDetails.leadSource}</td></tr>
                        {/* <tr className=""><td className="font-semibold pr-3">Status: </td><td>{props.payload.status}</td></tr> */}
                    </table>
                </div>
            </div>
        </div>
        </div>

        <div className="mt-8 p-5 intro-y box border rounded-md border-slate-200/60 dark:border-darkmode-400">
        <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
            <div className="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> PAX
            </div>
            
            <div className="grid grid-cols-3 gap-3 mt-5 gap-y-5">
                {props.paxArr.map((p,idx) => {
                    return <div key={idx} className="p-5 border-dashed border-2 rounded-md border-slate-400/60 dark:border-darkmode-800">
                        <div className="flex items-center pb-3 text-base font-medium text-xl">
                            Person {(idx + 1)}
                        </div>
                        
                        <div className="">
                        <table className="table-auto border-separate border-spacing-y-2">
                            <tr className="">
                                <td className="font-semibold pr-3">Name: </td>
                                <td>
                                    {p.firstName}
                                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                        {p.lastName}
                                    </div> 
                                </td>
                            </tr>
                            <tr className=""><td className="font-semibold pr-3">Date of Birth: </td><td>{p.dob}</td></tr>
                            <tr className=""><td className="font-semibold pr-3">Gender: </td><td>{p.gender}</td></tr>
                            <tr className=""><td className="font-semibold pr-3">Relationship: </td><td>{p.relationship}</td></tr>
                            <tr className="">
                                <td className="font-semibold pr-3">Passport: </td>
                                <td>
                                    {p.passportNo}
                                    <div className="text-slate-500 text-xs mt-0.5">
                                        <Link to={`${api.FILE_PATH}documents/crm-lead/${p.passportDoc}`} target="_blank" >
                                            {p.passportDoc}
                                        </Link>
                                    </div> 
                                </td>
                            </tr>
                            <tr className="">
                                <td className="font-semibold pr-3">Aadhar: </td>
                                <td>
                                    {p.aadharNo}
                                    <div className="text-slate-500 text-xs mt-0.5">
                                        <Link to={`${api.FILE_PATH}documents/crm-lead/${p.aadharDoc}`} target="_blank" >
                                            {p.aadharDoc}
                                        </Link>
                                    </div> 
                                </td>
                            </tr>
                            <tr className="">
                                <td className="font-semibold pr-3">Voter card: </td>
                                <td>
                                    {p.voterId}
                                    <div className="text-slate-500 text-xs mt-0.5">
                                        <Link to={`${api.FILE_PATH}documents/crm-lead/${p.voterDoc}`} target="_blank" >
                                            {p.voterDoc}
                                        </Link>
                                    </div> 
                                </td>
                            </tr>
                        </table>
                        </div>
                    </div>
                })}
                
            </div>
        </div>
        </div>

        <div className="mt-8 p-5 intro-y box border rounded-md border-slate-200/60 dark:border-darkmode-400">
        <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
            <div className="pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                <div class="grid grid-cols-6 gap-4">
                    <div class="col-start-1 col-end-3 flex items-center"><Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Requirements</div>
                    { (props.bookingDetails.itineraryId != '') ? <div class="col-end-7 col-span-3 text-right">
                        <Link to={`/view-itinerary/${props.bookingDetails.itineraryId}`} target="_blank" ><Button className="mr-3 text-sm"><Lucide icon="Eye" className="w-4 h-4 mr-2" /> View itinerary</Button></Link>
                        <Link to={`/create-itinerary/${props.bookingDetails.itineraryId}`} target="_blank" ><Button className="mr-3 text-sm"><Lucide icon="Pencil" className="w-4 h-4 mr-2" /> Edit itinerary</Button></Link>
                    </div> : '' }
                </div>
                {/* <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Requirements */}
            </div>
            
            <div className="grid grid-cols-2 gap-x-5 ">
                {(props.requirements.flight.show === true) ? props.requirements.flight.flightArr.map((f,idx) => {
                    return <div className="mt-7 p-5 rounded-md shadow-xl border-slate-400/60 dark:border-darkmode-800">
                        <div className="flex items-center pb-3 text-base font-medium text-xl ">
                            Flight {(idx + 1)}
                        </div>
                        
                        <div className="">
                        <table className="table-auto border-separate border-spacing-y-2 w-full">
                            <tr className="">
                                <td className="font-semibold pr-3">Destination: </td>
                                <td>
                                    {getCityName(f.fromId)}
                                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                        to {getCityName(f.toId)}
                                    </div> 
                                </td>                                                            
                                <td className="font-semibold pr-3">Date: </td><td>{f.date}</td></tr>
                        </table>
                        </div>

                        <div className="grid grid-cols-4 gap-3 mt-5 gap-y-5">
                            {f.preferrences.map((pref,i) => {
                                return <div key={i} className="px-3 py-2 text-xs border border-1 rounded-md border-slate-400/60 dark:border-darkmode-800">
                                    <div className="flex items-center font-bold ">
                                        Person {i + 1}
                                    </div>
                                    
                                    <div className="">
                                    <table>
                                        <tr className=""><td className="font-semibold">Seating - </td><td>{pref.seating}</td></tr>
                                    </table>
                                </div></div>
                            })}
                        </div>

                        {(Object.keys(f.flight).length != 0) ? <div className="grid grid-cols-2 gap-2 my-3">
                            <div className="col-span-2 font-semibold mt-3 flex items-center">
                                Saved Flight
                            </div>
                                <div className="flex items-center p-3 border rounded-md border-slate-400/60">
                                    <div className="bg-dark rounded mr-5" style={{height:'50px', width:'50px', backgroundImage:`url(${filePath}/flight/${f.flight.image})`, backgroundPosition:'center', backgroundSize:'cover'}}></div>
                                    <div>
                                        <div className="text-sm font-medium ">{f.flight.name}</div>
                                        <div className="text-xs font-normal ">{f.flight.number}</div>
                                        <div className="text-xs font-normal ">{f.flight.dept} - {f.flight.arrv}</div>
                                    </div>
                                </div>                            
                        </div> : '' }
                    </div>
                }) : ''}
                
            </div>

            <div className="grid grid-cols-2 gap-x-5 ">
                {(props.requirements.train.show === true) ? props.requirements.train.trainArr.map((t,idx) => {
                    return <div className="mt-7 p-5 rounded-md shadow-xl border-slate-400/60 dark:border-darkmode-800">
                        <div className="flex items-center pb-3 text-base font-medium text-xl ">
                            Train {(idx + 1)}
                        </div>
                        
                        <div className="">
                        <table className="table-auto border-separate border-spacing-y-2 w-full">
                            <tr className="">
                                <td className="font-semibold pr-3">Destination: </td>
                                <td>
                                    {getCityName(t.fromId)}
                                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                        to {getCityName(t.toId)}
                                    </div> 
                                </td>                                                            
                                <td className="font-semibold pr-3">Date: </td><td>{t.date}</td></tr>
                        </table>
                        </div>

                        <div className="grid grid-cols-4 gap-3 mt-5 gap-y-5">
                            {t.preferrences.map((pref,i) => {
                                return <div key={i} className="px-3 py-2 text-xs border border-1 rounded-md border-slate-400/60 dark:border-darkmode-800">
                                    <div className="flex items-center font-bold ">
                                        Person {i + 1}
                                    </div>
                                    
                                    <div className="">
                                    <table>
                                        <tr className=""><td className="">Seating - {pref.seating}</td></tr>
                                        <tr className=""><td className="">Class - {pref.class}</td></tr>
                                    </table>
                                </div></div>
                            })}
                        </div>

                        {(Object.keys(t.train).length != 0) ? <div className="grid grid-cols-2 gap-2 my-3">
                            <div className="col-span-2 font-semibold mt-3 flex items-center">
                                Saved Train
                            </div>
                                <div className="flex items-center p-3 border rounded-md border-slate-400/60">
                                    <div className="bg-dark rounded mr-5" style={{height:'50px', width:'50px', backgroundImage:`url(${filePath}/train/${t.train.image})`, backgroundPosition:'center', backgroundSize:'cover'}}></div>
                                    <div>
                                        <div className="text-sm font-medium ">Train {t.train.number}</div>
                                        {/* <div className="text-xs font-normal ">{t.train.number}</div> */}
                                        <div className="text-xs font-normal ">{t.train.dept} - {t.train.arrv}</div>
                                    </div>
                                </div>                            
                        </div> : '' }
                    </div>
                }) : ''}
                
            </div>

            <div className="grid grid-cols-2 gap-x-5 ">
                {(props.requirements.hotel.show === true) ? props.requirements.hotel.hotelArr.map((h,idx) => {
                    return <div key={idx} className="mt-7 p-5 rounded-md shadow-xl border-slate-400/60 dark:border-darkmode-800">
                        <div className="flex items-center pb-3 text-base font-medium text-xl ">
                            Hotel {(idx + 1)}
                        </div>
                        
                        <div className="">
                        <table className="table-auto border-separate border-spacing-y-2 w-full">
                            <tr className="">
                                <td className="font-semibold pr-3">Location: </td><td>{getCityName(h.cityId)}</td>
                                <th className="font-semibold pr-3">Duration: </th>
                                <td>
                                    {h.startDate}
                                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                        till {h.endDate}
                                    </div> 
                                </td>                                                            
                            </tr>
                        </table>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mt-5 gap-y-5">
                            {h.preferrences.map((pref,i) => {
                                return <div key={i} className="px-3 py-2 text-xs border border-1 rounded-md border-slate-400/60 dark:border-darkmode-800">
                                <div className="flex items-center font-bold ">
                                    Person {i + 1}
                                </div>
                                
                                <div className="">
                                <table>
                                    <tr className=""><td className="font-semibold">Meal Plan - </td><td>{pref.mealPlan}</td></tr>
                                </table>
                                </div></div>
                            })}
                        </div>

                        {(h.room.length != 0) ? <div className="grid grid-cols-2 gap-2 my-3">
                            <div className="col-span-2 font-semibold mt-3 ">
                                Saved Rooms
                            </div>
                            {h.room.map((rm,rmIdx) => {
                                return <div className="flex items-center p-3 border rounded-md border-slate-400/60">
                                <div className="bg-dark rounded mr-5" style={{height:'50px', width:'50px', backgroundImage:`url(${filePath}/hotel/${h.hotel.image})`, backgroundPosition:'center', backgroundSize:'cover'}}></div>
                                <div>
                                    <div className="text-md font-medium ">Room no. {rmIdx + 1}</div>
                                    <div className="text-xs font-normal ">Room for {rm.adultCount}</div>
                                    <div className="text-xs font-normal ">{(rm.kidCount) ? `${rm.kidCount} kid(s)` : ''}</div>
                                    <div className="text-xs font-normal ">{(rm.extraBedCount) ? `${rm.extraBedCount} extra bed(s)` : ''}</div>
                                </div>
                                </div>
                            })}
                        </div> : '' }
                    </div>
                }) : ''}
                
            </div>

            <div className="grid grid-cols-2 gap-x-5 ">
                {(props.requirements.car.show === true) ? props.requirements.car.carArr.map((c,idx) => {
                    return <div key={idx} className="mt-7 p-5 rounded-md shadow-xl border-slate-400/60 dark:border-darkmode-800">
                        <div className="flex items-center pb-3 text-base font-medium text-xl ">
                            Fleet {(idx + 1)}
                        </div>
                        
                        <div className="">
                        <table className="table-auto border-separate border-spacing-y-2 w-full">
                            <tr className="">
                                <td className="font-semibold pr-3">Location: </td><td>{getCityName(c.cityId)}</td>
                                <td className="font-semibold pr-3">Duration: </td>
                                <td>
                                    {c.fromDate}
                                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                        till {c.toDate}
                                    </div> 
                                </td>
                            </tr>
                            <tr className="">
                                <td className="font-semibold pr-3">Destination: </td>
                                <td>
                                    {c.departure}
                                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                        to {c.destination}
                                    </div> 
                                </td>                                                            
                            </tr>
                        </table>
                        </div>

                        {(c.cars.length != 0) ? <div className="grid grid-cols-2 gap-2 my-3">
                            <div className="col-span-2 font-semibold mt-3 flex items-center">
                                Saved Cars
                            </div>
                            {c.cars.map((cr,crIdx) => {
                                return <div className="flex items-center p-3 border rounded-md border-slate-400/60">
                                <div className="bg-dark rounded mr-5" style={{height:'50px', width:'50px', backgroundImage:`url(${filePath}/transport/${cr.image})`, backgroundPosition:'center', backgroundSize:'cover'}}></div>
                                <div>
                                    <div className="text-md font-medium ">Car no. {crIdx + 1}</div>
                                    <div className="text-xs font-normal ">{cr.name}</div>
                                    <div className="text-xs font-normal ">{(cr.type === 'AC') ? 'AC' : 'Non AC' } Booking</div>
                                </div>
                                </div>
                            })}
                        </div> : '' }

                    </div>
                }) : ''}
                
            </div>

            <div className="grid grid-cols-2 gap-x-5 ">
                {(props.requirements.activity.show === true) ? props.requirements.activity.activityArr.map((a,idx) => {
                    return <div key={idx} className="mt-7 p-5 rounded-md shadow-xl border-slate-400/60 dark:border-darkmode-800">
                        <div className="flex items-center pb-3 text-base font-medium text-xl ">
                            Activity {(idx + 1)}
                        </div>
                        
                        <div className="">
                        <table className="table-auto border-separate border-spacing-y-2 w-full">
                            <tr className="">
                                <td className="font-semibold pr-3">Location: </td><td>{getCityName(a.cityId)}</td>
                                <td className="font-semibold pr-3">Duration: </td>
                                <td>
                                    {a.fromDate}
                                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                        till {a.toDate}
                                    </div> 
                                </td>
                            </tr>
                            <tr className="">
                                <td className="font-semibold pr-3">Adults: </td><td>{a.adult}</td>                                                            
                                <td className="font-semibold pr-3">Kids/Infants: </td><td>{a.kid}/{a.infant}</td>                                               
                            </tr>
                        </table>
                        </div>

                        {(Object.keys(a.activity).length != 0) ? <div className="grid grid-cols-2 gap-2 my-3">
                            <div className="col-span-2 font-semibold mt-3 flex items-center">
                                Saved Activity
                            </div>
                                <div className="flex items-center p-3 border rounded-md border-slate-400/60">
                                    <div className="bg-dark rounded mr-5" style={{height:'50px', width:'50px', backgroundImage:`url(${filePath}/activity/${a.activity.image})`, backgroundPosition:'center', backgroundSize:'cover'}}></div>
                                    <div>
                                        <div className="text-md font-medium ">Activity</div>
                                        <div className="text-xs font-normal ">{a.activity.name}</div>
                                    </div>
                                </div>                            
                        </div> : '' }

                    </div>
                }) : ''}
                
            </div>
        </div>
        </div>
        </>
    )
}

export default viewDetails;