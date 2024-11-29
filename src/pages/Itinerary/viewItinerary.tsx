// @ts-nocheck
import _ from "lodash";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import fakerData from "../../utils/faker";
import Button from "../../base-components/Button";
import Pagination from "../../base-components/Pagination";
import { FormInput, FormHelp, FormLabel, FormInline } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import Tippy from "../../base-components/Tippy";
import { Dialog, Menu } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import axios from "axios";

import { getItinerary, fetchItineraryDetails } from "./ItinerarySlice";
import { useAppSelector, useAppDispatch } from "../../stores/hooks";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ClassicEditor } from "../../base-components/Ckeditor";
import { Link, useParams, useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import api from "../../../apiconfig.json";

import { fetchAllCity } from "../City/CitySlice";
import { fetchAllState } from "../State/StateSlice";
import { fetchAllCountry } from "../Country/CountrySlice";
//import { fetchAllHotel } from "../Hotel/HotelSlice";
import { fetchAllVendorHotel, searchByCity } from "../VendorHotel/vendorHotelSlice";
import { fetchAllVendorActivity } from "../VendorActivity/vendorActivitySlice";
import { fetchAllFlight } from "../Flight/flightSlice";
import { fetchAllTransport } from "../Transport/transportSlice";

import parse from 'html-react-parser';

import DayPlan from "../../elements/dayPlan";
import Pax from "../../elements/pax";

//=============Modal====================
import {
    PreviewComponent,
    Preview,
    Source,
    Highlight,
  } from "../../base-components/PreviewComponent";
//   import {
//     FormLabel,
    
//     FormInput,
//     FormSelect,
//   } from "../../base-components/Form";
  //import { Menu, Dialog } from "../../base-components/Headless";
  import TinySlider from "../../base-components/TinySlider";
  //import Button from "../../base-components/Button";
  //import Lucide from "../../base-components/Lucide";
  //import fakerData from "../../utils/faker";
  //import React, { useState, useRef } from "react";
//=============End Modal===================

const Main = () =>{
    const params = useParams();
    const navigate = useNavigate();
    const _id = params.id
    const schema = yup
    .object({
      vName: yup.string().required("Name is a required field").min(2),
      //departureCityId: yup.string().required("Departure City is a required field"),
      //destinationCityId: yup.string().required("Destination City is a required field"),
    })
    .required();

    const {
        register,
        getValues,
        trigger,
        formState: { errors },
        reset,
        handleSubmit
      } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
      });

      const onSave = (type: any)=>{
        // const sendProposalTo = {
        //   all : chkAll,
        //   bc : chkBC,
        //   bb: chkBB,
        //   cor: chkCor
        // }
        const savaData = {
          sendProposalTo : {
                            all : false,
                            bc : false,
                            bb: false,
                            cor: false
                          },
          bcEmail: '',
          bbEmail: '',
          corEmail: '',
          otherEmail: getValues('guestClient'),
          subject: getValues("subject"),
          body: editorData,
          itinerary: _id,
          isDraft: type
        }
      
        console.log("Test: ", savaData);
      
       // let formdata = new FormData();
      //   formdata.append("sendData", JSON.stringify(savaData));
      let sendData = JSON.stringify(savaData);
      
          console.log(sendData);
      
          const res = axios.post(`${api.API_URL}${api.API_ENDPOINT.SEND_PROPOSAL}/send-proposal`, sendData, {
            headers: {
              'Content-Type': 'application/json',
            },
          }).then((result)=>{
            reset();
            setNextOverlappingModalPreview(true);
            setEditorData('');
          });      
      
      }
 

  const dispatch = useAppDispatch();
//   const { data } = useAppSelector((state) => state.itinerary); 
//   const [data,setData] = useState([]) 
  const [iti,setIti] = useState([]) 
  const [isLoading,setIsLoading] = useState(true)
  const city = useAppSelector((state) => state.city);
  const state = useAppSelector((state) => state.state);
  const country = useAppSelector((state) => state.country);    
//   const hotel = useAppSelector((state) => state.vendorHotel);
//   const activity = useAppSelector((state) => state.vendorActivity);
//   const flight = useAppSelector((state) => state.flight);
//   const transport = useAppSelector((state) => state.transport);

  
  useEffect(() => {
    const URL = `${api.API_URL}${api.API_ENDPOINT.ITINERARY}`;
    axios.post(`${URL}/${_id}`, {}, {
        headers: {},
    }).then((result)=>{
        console.log("Result: ",{result})
        setIti([result.data])
        setIsLoading(false)
    });      
      
  },[])
  
  useEffect(() => {
    // dispatch(getItinerary(_id))
    dispatch(fetchAllCity()) 
    dispatch(fetchAllState()) 
    dispatch(fetchAllCountry()) 
    // dispatch(fetchAllVendorHotel())
    // dispatch(fetchAllVendorActivity())
    // dispatch(fetchAllFlight()) 
    // dispatch(fetchAllTransport()) 
  },[])
  //console.log({data})
//   console.log({city})
//   console.log({hotel})
//   console.log({activity})
//   console.log({flight})
//   console.log({transport})

  const getCityName = (id) => {
    let c = city.data.filter(x => x.id === id)
    return c[0]?.cityName
  }
  const getStateName = (id) => {
    let s = state.data.filter(x => x.id === id)
    return s[0]?.stateName
  }
  const getCountryName = (id) => {
    let c = country.data.filter(x => x.id === id)
    return c[0]?.countryname
  }
  const getHotelName = (id) => {
    let h = hotel.data.filter(x => x.id === id)
    return h[0]?.hotelName
  }
  const getActivityName = (id) => {
    let a = activity.data.filter(x => x.id === id)
    return a[0]?.activityName
  }
  const getFlightName = (id) => {
    let f = flight.data.filter(x => x.id === id)
    return f[0]?.flightName
  }
  const getTransportName = (id) => {
    let t = transport.data.filter(x => x.id === id)
    return t[0]?.transportName
  }

  const [overlappingModalPreview, setOverlappingModalPreview] = useState(false);
  const [nextOverlappingModalPreview, setNextOverlappingModalPreview] = useState(false);
  const [editorData, setEditorData] = useState("");
    return (
        <>
        {iti.map(data => {
            let _pax = JSON.parse(data.pax);
            let _paxItems = (data.paxItems) ? JSON.parse(data.paxItems) : [];
            let _gallery = (data.gallery) ? JSON.parse(data.gallery) : []
            return <div>
            <div className="flex items-center mt-8 intro-y">
                <h2 className="mr-auto text-lg font-medium">Manage Itinerary</h2>
                <div className="w-full mt-3 space-x-2 sm:w-auto sm:ml-auto sm:mt-0">
                <Button
                        as="a"
                        href="#"
                        variant="primary"
                        onClick={(event: React.MouseEvent) => {
                          event.preventDefault();
                          setOverlappingModalPreview(true);
                        }}
                      >
                        Send Proposal
                      </Button>
                      <Button
                        as="a"
                        href="#"
                        variant="primary"
                        onClick={() => {
                          navigate('/itinerary');
                        }}
                      >
                       Back to Index
                      </Button>
                    {/* <Link to="/itinerary">
                        <Button variant="primary" type="button" className="ml-3 mr-0">
                        <Lucide icon="ChevronsLeft" className="w-4 h-4 mr-2" /> Back
                        </Button>
                    </Link> */}
                    
                  </div>
            </div>
            
            <div className="grid grid-cols-12 gap-2 intro-y box mt-5">
                <div className="col-span-12 lg:col-span-8 input-form">
                    <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400 mb-5">
                        <h2 className="mr-auto text-base font-medium">
                            {/* {data.tourName} ({_id}) - Basic Info */}
                            Basic Info
                        </h2> 
                    </div>
                </div>
                <div className=" px-5 mb-5 col-span-12 lg:col-span-8 input-form"> 
                    <div className="px-5 px-2">
                        <h1 className="text-5xl mt-2 font-medium leading-none"><b>{data.tourName}</b></h1> 
                    </div>                  
                    <div className="px-5 px-2">
                        <div className="mt-5 text-justify">{parse(data.description || '')}</div>
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                        <div className=" px-5 p-2 col-span-4 input-form"><b>City: </b> {getCityName(data.cityId)}</div>
                        <div className=" px-5 p-2 col-span-4 input-form"><b>State: </b> {getStateName(data.stateId)}</div>
                        <div className=" px-5 p-2 col-span-4 input-form"><b>Country: </b> {getCountryName(data.countryId)}</div>
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                        <div className=" px-5 p-2 col-span-4 input-form"><b>Days: </b> {data.noOfDays}</div>
                        <div className=" px-5 p-2 col-span-4 input-form"><b>Nights: </b> {data.noOfNights}</div>
                        <div className=" px-5 p-2 col-span-4 input-form"><b>Season: </b> {data.season}</div>
                    </div>
                    <div className="px-5 p-2">
                        <b>Tour Theme: </b> {data.tourTheme}
                    </div>
                    <div className="px-5 p-2">
                        {data.highlightsCSV.split(', ').map(hL => {
                            return <span className="bg-cyan-900 text-light text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-cyan-900 dark:text-light">{hL}</span>
                        })}
                    </div>
                </div>
                <div className=" px-5 mb-5 col-span-12 lg:col-span-4 input-form">
                    <div className="px-5 p-2">
                        {/* <img className="rounded" src={api.API_URL+'images/'+data.thumbnail} /> */}
                        <div className="rounded w-100" style={{height:'250px', backgroundImage:`url(${api.API_URL}images/${data.thumbnail})`, backgroundPosition:'center', backgroundSize:'cover' }}>
        
                        </div>
                    </div>
                    {/* <div className="px-5 p-2">
                        <b>Thumbnail File: </b> {data.thumbnail}
                    </div> */}
                </div>
                <div className="px-5 mx-5 mb-5 col-span-12 lg:col-span-12 input-form">
                    <TinySlider options={{
                        autoplay: false,
                        controls: true,
                        center: true,
                        items: 1,
                        responsive: {
                            600: {
                                items: 2,
                            },
                            480: {
                                items: 2,
                            },
                        },
                    }}>
                        {_gallery.map((image,idx) => {
                            return <div className="p-1 col-span-12 lg:col-span-3 input-form">
                                <div className="rounded w-100" style={{height:'250px', backgroundImage:`url(${api.API_URL}images/${image})`, backgroundPosition:'center', backgroundSize:'cover' }}>
            
                            </div></div>
                        })}
                    </TinySlider>
                </div>
                {/* <div className=" px-5 mb-5 col-span-12 lg:col-span-12 input-form">
                    <div className="grid grid-cols-12">
                        {_gallery.map((image,idx) => {
                            return <div className="p-1 col-span-12 lg:col-span-3 input-form">
                                <div className="rounded w-100" style={{height:'250px', backgroundImage:`url(${api.API_URL}images/${image})`, backgroundPosition:'center', backgroundSize:'cover' }}>
            
                            </div></div>
                        })}
                    </div>
                </div>  */}
                
            </div>           

            
            {(data.dayDetails) ? data.dayDetails.sort((x, y) => {return x.day - y.day}).map((day,idx) => {
                let hotels = day.hotel
                let activities = day.activity
                let flights = day.flight
                let transports = day.transport
                let trains = day.train
                let cruises = day.cruise

                return <div key={idx} className="col-span-12 intro-y box lg:col-span-12 mt-5">
                <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                <h2 className="mr-auto text-base font-medium">
                    Day {idx+1} Details
                </h2>
                </div>
                <div className="grid grid-cols-12 gap-2">
                    <div className=" px-5 p-2 col-span-12 lg:col-span-8 input-form">
                        <div className="mb-5">
                        <div className="px-5 p-2">
                            <h1 className="text-2xl mt-2 font-medium leading-none"><b>{day.title}</b></h1>
                        </div>
                        <div className="px-5 p-2">  
                            <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                                <b>{getCityName(day.fromId)}</b> to <b>{getCityName(day.toId)}</b>
                            </span>
                        </div>                
                        <div className="px-5 p-2 text-justify">
                            {day.description}
                        </div>
                        { (hotels.length) ? <div className="px-5 mt-5">
                            <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Hotel options
                            </span>  
                            <div className="mt-1">
                            {_.take(day.hotelDetails, day.hotelDetails.length).map((h, Key) => {
                                return <Button variant="outline-primary" className="inline-block mb-2 mr-1">
                                    {h.hotelName}
                                </Button>
                                // return <span className="px-3 py-2 mr-1 my-5 rounded-full border-primary text-primary dark:border-primary">{getHotelName(h)}</span>
                            })}</div>
                        </div> : '' }
                        { (activities.length) ? <div className="px-5 mt-5">
                            <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Activities
                            </span>  
                            <div className="mt-1">
                            {_.take(day.activityDetails, day.activityDetails.length).map((a, Key) => {
                                return <Button variant="outline-primary" className="inline-block mb-2 mr-1">
                                    {a.activityName}
                                </Button>
                                // return <span className="px-3 py-2 mr-1 my-5 rounded-full border-primary text-primary dark:border-primary">{getHotelName(h)}</span>
                            })}</div>
                        </div> : '' }
                        { (flights.length) ? <div className="px-5 mt-5">
                            <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Flights
                            </span>  
                            <div className="mt-1">
                            {_.take(day.flightDetails, day.flightDetails.length).map((f, Key) => {
                                return <Button variant="outline-primary" className="inline-block mb-2 mr-1">
                                    {f.flightName}
                                </Button>
                                // return <span className="px-3 py-2 mr-1 my-5 rounded-full border-primary text-primary dark:border-primary">{getHotelName(h)}</span>
                            })}</div>
                        </div> : '' }
                        { (transports.length) ? <div className="px-5 mt-5">
                            <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Transport
                            </span>  
                            <div className="mt-1">
                            {_.take(day.transportDetails, day.transportDetails.length).map((t, Key) => {
                                return <Button variant="outline-primary" className="inline-block mb-2 mr-1">
                                    {t.transportName}
                                </Button>
                                // return <span className="px-3 py-2 mr-1 my-5 rounded-full border-primary text-primary dark:border-primary">{getHotelName(h)}</span>
                            })}</div>
                        </div> : '' }
                        { (trains.length) ? <div className="px-5 mt-5">
                            <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Train
                            </span>  
                            <div className="mt-1">
                            {_.take(day.trainDetails, day.trainDetails.length).map((t, Key) => {
                                return <Button variant="outline-primary" className="inline-block mb-2 mr-1">
                                    {t.trainNo}
                                </Button>
                                // return <span className="px-3 py-2 mr-1 my-5 rounded-full border-primary text-primary dark:border-primary">{getHotelName(h)}</span>
                            })}</div>
                        </div> : '' }
                        { (cruises.length) ? <div className="px-5 mt-5">
                            <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Cruise
                            </span>  
                            <div className="mt-1">
                            {_.take(day.cruiseDetails, day.cruiseDetails.length).map((c, Key) => {
                                return <Button variant="outline-primary" className="inline-block mb-2 mr-1">
                                    {c.cruiseNo}
                                </Button>
                                // return <span className="px-3 py-2 mr-1 my-5 rounded-full border-primary text-primary dark:border-primary">{getHotelName(h)}</span>
                            })}</div>
                        </div> : '' }

                            
                        </div>
                    </div>
                    <div className=" px-5 p-2 m-2 col-span-12 lg:col-span-4 input-form">
                        {/* <img className="rounded" src={api.API_URL+'images/'+day.image} /> */}
                        <div className="rounded w-100" style={{height:'150px', backgroundImage:`url(${api.API_URL}images/${day.thumbnail})`, backgroundPosition:'center', backgroundSize:'cover' }}>
        
                        </div>
                    </div>
                    <div className="px-5 col-span-12 intro-y box mb-2" >
                        <DayPlan plan={day.plan} locations={day.locations} city={city} fromID={Number(day.fromId)} toID={Number(day.toId)} season={data.season} handleChange={(field,val) => {}} type='view' />
                    </div>
                </div>
            </div>
            }) : ''}            

            <div className="col-span-12 intro-y lg:col-span-12 mt-5">
            <div className="p-5">
                <Pax dayDetails={data.dayDetails} season={data.season} pax={_pax} paxDetails={_paxItems} />
            </div>
                
            </div>

            <div className="col-span-12 intro-y lg:col-span-12 mt-5">
                <div className="intro-y box pb-5">
                
                    <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                    <h2 className="mr-auto text-base font-medium">
                        {/* {data.tourName} ({_id}) - Inclusions and Exclusions */}
                        Inclusions and Exclusions
                    </h2>                    
                    
                    </div>
                    <div className="p-5 mx-5">
                        
                        <div className="mt-5 py-2">
                            <h1 className="text-2xl mb-2 font-medium leading-none"><b>Inclusions</b></h1>
                            {/* {parse(data.inclusions || '')} */}
                            <div dangerouslySetInnerHTML={{ __html: data.inclusions }} />
                        </div>
                        <div className="mt-5 py-2">
                            <h1 className="text-2xl mb-2 font-medium leading-none"><b>Exclusions</b></h1>
                            {/* {parse(data.exclusions || '')} */}
                            <div dangerouslySetInnerHTML={{ __html: data.exclusions }} />
                        </div>
                        <div className="mt-5 py-2">
                            <h1 className="text-2xl mb-2 font-medium leading-none"><b>More Details</b></h1>
                            {/* {parse(data.moreDetails || '')} */}
                            <div dangerouslySetInnerHTML={{ __html: data.moreDetails }} />
                        </div>
                    </div>
                </div>
                
            </div>
            
            <div className="col-span-12 intro-y lg:col-span-12 mt-5">
                <div className="intro-y box pb-5">
                    
                    <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                        <h2 className="mr-auto text-base font-medium">
                            {/* {data.tourName} ({_id}) - Settings */}
                            Settings
                        </h2>
                        
                        
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                        <div className=" px-5 p-2 col-span-5 input-form"><b>Show Payment Info: </b> {data.isPaymentInfoShow}</div>
                        <div className=" px-5 p-2 col-span-7 input-form"><b>Show Cancellation Info: </b> {data.isCancelationInfoShow}</div>
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                        <div className=" px-5 p-2 col-span-5 input-form"><b>Publish to Site: </b> {data.publishToSite}</div>
                        <div className=" px-5 p-2 col-span-7 input-form"><b>Status: </b> {data.isActive}</div>
                    </div>
                </div>
                
            </div>
            
            </div>
        })}
         {/* BEGIN: Modal Content */}
                    <Dialog
                      size="xl"
                      open={overlappingModalPreview}
                      onClose={() => {
                        setOverlappingModalPreview(false);
                      }}
                    >
                      <Dialog.Panel className="px-5 py-10">
                        <div className="text-center">
                        <form className="validate-form" >
                          <div className="mb-5">
                                <div className="flex-1 w-full mt-3 xl:mt-0">
                                <FormInput
                                    {...register("guestClient")}
                                    id="guestClient"
                                    type="text"
                                    placeholder="Client Mail Id"
                                />
                                <FormHelp className="text-right">
                                    Maximum character 0/200
                                </FormHelp>
                                </div>
                                <div className="flex-1 w-full mt-3 xl:mt-0">
                                <FormInput
                                    {...register("subject")}
                                    id="subject"
                                    type="text"
                                    placeholder="Proposal Subject"
                                />
                                <FormHelp className="text-right">
                                    Maximum character 0/200
                                </FormHelp>
                                </div>
                                <div className="flex-1 w-full mt-3 xl:mt-0">
                                <ClassicEditor
                                  value={editorData}
                                  onChange={setEditorData}
                                />
                                {/* <FormHelp className="text-right">
                                    Maximum character 0/15
                                </FormHelp> */}
                                </div>
                          </div>
                        </form>
                          {/* BEGIN: Overlapping Modal Toggle */}
                          <Button
                            as="a"
                            href="#"
                            variant="primary"
                            onClick={(event: React.MouseEvent) => {
                              event.preventDefault();
                              onSave('N');
                              
                            }}
                          >
                            Send
                          </Button>
                          {/* END: Overlapping Modal Toggle */}
                        </div>
                        {/* BEGIN: Overlapping Modal Content */}
                        <Dialog
                          open={nextOverlappingModalPreview}
                          onClose={() => {
                            setNextOverlappingModalPreview(false);
                          }}
                        >
                          <Dialog.Panel className="p-5 text-center">
                                Proposal has been sent successfully 
                          </Dialog.Panel>
                        </Dialog>
                        {/* END: Overlapping Modal Content */}
                      </Dialog.Panel>
                    </Dialog>
          {/* END: Modal Content */}
        </>
    );
  
}

export default Main;