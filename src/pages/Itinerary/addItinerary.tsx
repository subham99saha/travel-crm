// @ts-nocheck
import _ from "lodash";
import {
  PreviewComponent,
  Preview,
} from "../../base-components/PreviewComponent";
import {
  FormLabel,
  FormInput,
  FormSelect,
  FormCheck,
  FormTextarea
} from "../../base-components/Form";
import Button from "../../base-components/Button";
import Notification from "../../base-components/Notification";
import Lucide from "../../base-components/Lucide";
import { useForm } from "react-hook-form";
import Toastify from "toastify-js";
import clsx from "clsx";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { createItinerary, uploadItineraryImage, uploadGalleryImage, viewGallery } from "./ItinerarySlice";
import Table from "../../base-components/Table";
import axios from "axios";

import { Menu, Slideover, Dialog } from "../../base-components/Headless";
import TomSelect from "../../base-components/TomSelect";
import Dropzone, { DropzoneElement } from "../../base-components/Dropzone";
import { useState, useEffect, useRef, useCallback } from "react";
import { ClassicEditor } from "../../base-components/Ckeditor";
// import FormData from "form-data"
import { fetchAllCity } from "../City/CitySlice";
import { fetchAllState } from "../State/StateSlice";
import { fetchAllCountry } from "../Country/CountrySlice";
//import { fetchAllHotel, searchByCity } from "../Hotel/HotelSlice";
import { fetchAllVendorHotel, fetchVendorHotelByCity } from "../VendorHotel/vendorHotelSlice";
import { fetchAllVendorActivity, fetchVendorActivityByCity } from "../VendorActivity/vendorActivitySlice";
import { fetchAllFlight, fetchFlightByCity } from "../Flight/flightSlice";
import { fetchAllTransport, fetchTransportByCity } from "../Transport/transportSlice";
import { fetchAllTrain, fetchTrainByCity } from "../Train/trainSlice";
import { fetchAllCruise, fetchCruiseByCity } from "../Cruise/cruiseSlice";
import { highlight } from "tom-select/src/contrib/highlight";
import api from "../../../apiconfig.json";

import Select from 'react-select';

import ImageUpload from "./imageUpload";
import ImageRepo from "./imageRepo";
import Pax from "../../elements/pax";
import DayPlan from "../../elements/dayPlan";

const addItinerary = () => {
  const navigate = useNavigate();
  const filePath = api.FILE_PATH;
  //console.log("Path: ", filePath);
  const [tourName, setTourName] = useState();
  const [tourTheme, setTourTheme] = useState('Holiday');
  const [cityId, setCityId] = useState("595");
  const [stateId, setStateId] = useState("24");
  const [countryId, setCountryId] = useState("105");
  const [noOfDays, setNoOfDays] = useState(1);
  const [noOfNights, setNoOfNights] = useState(1);
  const [season, setSeason] = useState('On-season');
  const [currencyId, setCurrencyId] = useState(1);
  const [isActive, setIsActive] = useState("Y");
  const [isPaymentInfoShow, setIsPaymentInfoShow] = useState("Y");
  const [isCancelationInfoShow, setIsCancelationInfoShow] = useState("Y");
  const [description, setDescription] = useState("");
  const [inclusions, setInclusions] = useState("");
  const [exclusions, setExclusions] = useState("");
  const [moreDetails, setMoreDetails] = useState("");
  const [thumbnail, setThumbnail] = useState('');
  const [thumbnailObj, setThumbnailObj] = useState({});
  const [gallery, setGallery] = useState([]);
  const [galleryObj, setGalleryObj] = useState([]);
  const [repoFor, setRepoFor] = useState('');
  const [repository, setRepository] = useState([]);
  const [highlightsCSV, setHighlightsCSV] = useState('');
  const [publishToSite, setPublishToSite] = useState('Y');

  const [highlight, setHighlight] = useState('');
  const slideovertext = {
    hotel: 'Hotels', activity: 'Activities', flight: 'Flights', transport: 'Vehicle Type', train: 'Trains', cruise: 'Cruise', repository: 'from Image Repository'
  }
  const [hotelSlideover, setHotelSlideover] = useState(false);
  const [activitySlideover, setActivitySlideover] = useState(false);
  const [flightSlideover, setFlightSlideover] = useState(false);
  const [transportSlideover, setTransportSlideover] = useState(false);
  const [trainSlideover, setTrainSlideover] = useState(false);
  const [cruiseSlideover, setCruiseSlideover] = useState(false);
  const [gallerySlideover, setGallerySlideover] = useState(false);
  
  const [renderer,setRenderer] = useState(0)
  const [reload,setReload] = useState(0)

  const dispatch = useAppDispatch();
  const city = useAppSelector((state) => state.city);
  const state = useAppSelector((state) => state.state);
  const country = useAppSelector((state) => state.country);
  const hotel = useAppSelector((state) => state.vendorHotel);
  const activity = useAppSelector((state) => state.vendorActivity);
  const flight = useAppSelector((state) => state.flight);
  const transport = useAppSelector((state) => state.transport);
  const train = useAppSelector((state) => state.train);
  const cruise = useAppSelector((state) => state.cruise);
  // const gallImages = useAppSelector((state) => state.itinerary);
  const [gallImages, setGallImages] = useState([]);

  useEffect(() => {
    dispatch(fetchAllCity()) 
    dispatch(fetchAllState()) 
    dispatch(fetchAllCountry()) 
    // // dispatch(fetchAllHotel())
    // dispatch(fetchAllVendorHotel());
    // dispatch(fetchVendorHotelByCity(cityId));
    // dispatch(fetchAllVendorActivity())
    // dispatch(fetchAllFlight()) 
    // dispatch(fetchAllTransport()) 

    // dispatch(viewGallery()) 
  },[])
  useEffect(() => {
    // dispatch(fetchVendorHotelByCity(cityId));
    // dispatch(fetchVendorActivityByCity(cityId));
    // dispatch(fetchFlightByCity(cityId));
    // dispatch(fetchTransportByCity(cityId));
    // dispatch(fetchTrainByCity(cityId));
    // dispatch(fetchCruiseByCity(cityId));
  },[cityId])
  // console.log({city})
  // console.log({country})
  // console.log({hotel})
  // console.log({activity})
  // console.log({flight})
  // console.log({transport})
  // console.log({gallImages})

  const getCityName = (id) => {
    let c = city.data.filter(x => x.id === id)
    return c[0]?.cityName
  }
  const getHotel = (id) => {
    let h = hotel.data.filter(x => x.id === id)
    return h[0]
  }
  const getActivity = (id) => {
    let a = activity.data.filter(x => x.id === id)
    return a[0]
  }
  const getFlight = (id) => {
    let f = flight.data.filter(x => x.id === id)
    return f[0]
  }
  const getTransport = (id) => {
    let t = transport.data.filter(x => x.id === id)
    return t[0]
  }
  const getTrain = (id) => {
    let t = train.data.filter(x => x.id === id)
    return t[0]
  }
  const getCruise = (id) => {
    let t = cruise.data.filter(x => x.id === id)
    return t[0]
  }

  useEffect(() => {
    const URL = `${api.API_URL}${api.API_ENDPOINT.ITINERARY}`;
    axios.post(`${URL}/view-gallery?folder=`, {}, {
        headers: {},
    }).then((result)=>{
        // console.log({result})
        setGallImages(result)
    });      
      
  },[reload])
  
  const [days, setDays] = useState(1);
  const dayDetailFormat = {
    title: '',
    thumbnail: '',
    thumbnailObj: '',
    description: '',
    fromId: 595,
    toId: 405,
    isHotel: false,
    isActivity: false,
    isFlight: false,
    isTransport: false,
    isTrain: false,
    isCruise: false,
    hotel: [],
    activity: [],
    flight: [],
    transport: [],
    train: [],
    cruise: [],
    hotelPrice: 0,
    activityPrice: 0,
    flightPrice: 0,
    transportPrice: 0,
    trainPrice: 0,
    cruisePrice: 0,
    plan: [],
    locations: [595,405]
  }
  const [dayDetails, setDayDetails] = useState([
    dayDetailFormat
  ]);
  useEffect(() => {
    let newDayDetails = [...dayDetails]
    let newErrors = errors
    while (days != newDayDetails.length) {
      if (days > newDayDetails.length) {
        newDayDetails.push(dayDetailFormat)
        newErrors.dayDetails.push(dayErrors)
      } else {
        newDayDetails.pop()
        newErrors.dayDetails.pop()
      }      
    }
    setDayDetails(newDayDetails)
    setErrors(newErrors)
  }, [days]);
  const handleDayDetails = (id,key,val) => {
    let newDayDetails = [...dayDetails]
    newDayDetails[id - 1][key.split('_')[0]] = val
    setDayDetails(newDayDetails)
    // console.log({dayDetails})
  }
  const [currentDayId,set_currentDayId] = useState(1)
  const handleDayArrayDetails = (field,val,name,price=0,group=1,day=currentDayId) => {
    // console.log({day})
    let text = { hotel: 'Hotel', activity: 'Activity', flight: 'Flight', transport: 'Transport', train: 'Train', cruise: 'Cruise' }
    let newDayDetails = [...dayDetails]
    let index = newDayDetails[day - 1][field].indexOf(val)
    if (index === -1) {
      newDayDetails[day - 1][field].push(val)
      newDayDetails[day - 1][field + 'Price'] += price
      updatePax(price,group,1,day,field,val)
      setSuccessMsg(text[field] + ' ' + name + ' added to Day ' + day)
      // setNotify(notify + 1)
    } else {
      newDayDetails[day - 1][field].splice(index, 1)
      newDayDetails[day - 1][field + 'Price'] -= price
      updatePax(price,group,0,day,field,val)
      setSuccessMsg(text[field] + ' ' + name + ' removed from Day ' + day)
      // setNotify(notify + 1)
    }
    setDayDetails(newDayDetails)
    // console.log(dayDetails)
    // console.log({pax})
  }
  const handlePlan = (plan,dayId) => {
    console.log(plan)
    let newDayDetails = [...dayDetails]
    newDayDetails[dayId].plan = plan
    setDayDetails(newDayDetails)
  }

  const [deleteModalPreview, setDeleteModalPreview] = useState(false);
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [renderCount,setRenderCount] = useState(0)
  const [notify,setNotify] = useState(0)
  useEffect(() => {
    const successEl = document
        .querySelectorAll("#success-notification-content")[0]
        .cloneNode(true) as HTMLElement;
    successEl.classList.remove("hidden");
    if (renderCount) {
      Toastify({
        node: successEl,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
      }).showToast();
    } else {
      setRenderCount(1)
    }
  },[successMsg,errorMsg])
  // },[notify])

  const uploadItiImage = async () => {
    var formData = new FormData();
    formData.append("thumbnail", thumbnailObj); 

    console.log({formData})
    let x = await dispatch(uploadItineraryImage(formData))
    setThumbnail(x.payload.filename)
    // console.log(x.payload.filename)
    setSuccessMsg('Image uploaded succesfully.')    
  }
  const uploadGallImage = async () => {
    var formData = new FormData();
    Object.keys(repository).map((Key) => {
    // repository.map((Key) => {
      formData.append('files', repository[Key]);
    });
    // console.log({galleryObj})
    for (var [key, value] of formData.entries()){
      console.log(key,value);
    }
    // let x = await dispatch(uploadGalleryImage(formData))
    const URL = `${api.API_URL}${api.API_ENDPOINT.ITINERARY}`;
    axios.post(`${URL}/upload-multi-image/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    }).then((result)=>{
      setGallImages(result.data.filenames)
      console.log(result.data)
      setSuccessMsg(result.data.filenames.length + ' images uploaded succesfully.') 
      setReload(reload + 1) 
    }).catch(err => {
      console.log({err})
    });
      
  }
  const uploadDayImage = async (id) => {
    let newDayDetails = [...dayDetails]

    var formData = new FormData();
    formData.append("thumbnail", newDayDetails[id - 1]['thumbnailObj']);

    console.log({formData})
    let x = await dispatch(uploadItineraryImage(formData))    
    
    newDayDetails[id - 1]['thumbnail'] = x.payload.filename
    setDayDetails(newDayDetails)

    console.log(x.payload.filename)
    setSuccessMsg('Image uploaded succesfully.')
  }
  const handleRepoSelection = (file) => {
    if (repoFor === 'itiImage') 
      setThumbnail(file)
    else if (repoFor === 'gallImage') {
      let index = gallery.indexOf(file)
      if (index === -1) 
        setGallery([...gallery, file])
      else {
        let newGallery = [...gallery]
        newGallery.splice(index, 1) 
        setGallery(newGallery)
      }
    } else if (repoFor === 'dayImage') {
      let newDayDetails = [...dayDetails]
      let day = currentDayId
      newDayDetails[day - 1]['thumbnail'] = file
      setDayDetails(newDayDetails)
    }
  }
  const cancelChosenImg = (repo_for,day=0) => {
    if (repo_for === 'itiImage') 
      setThumbnail('')
    else if (repo_for === 'gallImage') {
      setGallery([])
    } else if (repo_for === 'dayImage' && day != 0) {
      let newDayDetails = [...dayDetails]
      // let day = currentDayId
      newDayDetails[day - 1]['thumbnail'] = ''
      setDayDetails(newDayDetails)
    }
  }

  const cbClassString = "shadow-sm border-slate-200 cursor-pointer rounded focus:ring-4 focus:ring-offset-0 focus:ring-primary focus:ring-opacity-20 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&[type='checkbox']]:checked:bg-primary [&[type='checkbox']]:checked:border-primary [&[type='checkbox']]:checked:border-opacity-10 [&:disabled:not(:checked)]:bg-slate-100 [&:disabled:not(:checked)]:cursor-not-allowed [&:disabled:not(:checked)]:dark:bg-darkmode-800/50"
    
  const [pax,setPax] = useState([0,0,0,0,0])
  const [paxItems,setPaxItems] = useState([])
  const updatePax = (price,group,action,day,field,val) => {
    let cat = [1,2,4,6,8]
    let newPaxItems = [...paxItems]
    let newPax
    if (action) {
      newPax = pax.map((p,i) => {
        return p + (price * (Math.floor(cat[i] / group) + Number(!!(cat[i] % group)))) 
      })
      newPaxItems.push([price,group,day,field,val])      
    } else {
      newPax = pax.map((p,i) => {
        return p - (price * (Math.floor(cat[i] / group) + Number(!!(cat[i] % group)))) 
      })

      var hash = {};
      for(var i = 0 ; i < newPaxItems.length; i += 1) {
          hash[newPaxItems[i]] = i;
      }
      var val = [price,group,day,field,val];
      if(hash.hasOwnProperty(val)) {
          // console.log({index: hash[val]})
          newPaxItems.splice(hash[val], 1)
      }
    } 
    setPax(newPax)
    setPaxItems(newPaxItems)  
    // console.log(newPaxItems) 
  }

  const schema = yup
    .object({
      tourName: yup.string().required().min(2),
      // totalDays: yup.number().required().min(1).max(30),
    })
    .required();

  const {
    register,
    trigger,
    // formState: { errors },
    reset,
    getValues
  } = useForm({
    mode: "onChange",
    // resolver: yupResolver(schema),
    defaultValues: { highlights: [] }
  });

  const dayErrors = {
    title: { message: 'Day title cannot be empty', active: false },
    description: { message: 'Day description cannot be empty', active: false },
    thumbnail: { message: 'Select a thumbnail for the day', active: false }
  }
  const [errors,setErrors] = useState({      
    tourName: { message: 'Tour name cannot be empty', active: false },
    description: { message: 'Description cannot be empty', active: false },
    highlightsCSV: { message: 'Highlights cannot be empty', active: false },
    thumbnail: { message: 'Select a thumbnail', active: false },
    inclusions: { message: 'Inclusions cannot be empty', active: false },
    exclusions: { message: 'Exclusions cannot be empty', active: false },
    moreDetails: { message: 'Details cannot be empty', active: false },
    dayDetails: [dayErrors]
  })
  const [errorModalPreview, setErrorModalPreview] = useState(false);
  const runVal = (payload) => {
    let errCount = 0
    const err = errors 
    Object.keys(err).map(field => {
      if (field === 'dayDetails') {
        payload.dayDetails.map((day,idx) => {
          Object.keys(dayErrors).map(dayField => {
            if (payload.dayDetails[idx][dayField] === '') {
              err.dayDetails[idx][dayField].active = true
              errCount++
            } else {
              err.dayDetails[idx][dayField].active = false
            }
          })
        })
        return
      }
      if (payload[field] === '') {
        err[field].active = true
        errCount++
      } else {
        err[field].active = false
      }
    }) 
    if (errCount === 0) {
      console.log({payload})
      dispatch(createItinerary(payload));
      reset();
      setDeleteModalPreview(true);
    } else {  
      setErrors(err)
      console.log({errors})
      setErrorModalPreview(true)
    }
  }

  const onSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await trigger();
    if (!result) {
      const failedEl = document
        .querySelectorAll("#failed-notification-content")[0]
        .cloneNode(true) as HTMLElement;
      failedEl.classList.remove("hidden");
      Toastify({
        node: failedEl,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
      }).showToast();
    } else {
      let formData = {
        createdBy: getValues('createdBy'),
        tourName,
        description,
        cityId,
        stateId,
        countryId,
        noOfDays,
        noOfNights,
        season,
        totalDays: days,
        tourTheme,
        highlightsCSV,
        thumbnail,
        gallery,
        inclusions,
        exclusions,
        moreDetails,
        isPaymentInfoShow,
        isCancelationInfoShow,
        currencyId,
        publishToSite,
        isActive,
        dayDetails,
        pax,
        paxItems
      };
      console.log(formData)

      runVal(formData)  
      setRenderer(renderer + 1)      
    }
  };

  return (
    <>
      <div className="flex items-center mt-0 intro-y">
        <h2 className="mr-auto text-lg font-medium">Manage Itinerary</h2>
        <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
                    <Link to="/itinerary">
                        <Button variant="primary" type="button" className="ml-3 mr-0">
                        <Lucide icon="ChevronsLeft" className="w-4 h-4 mr-2" /> Back
                        </Button>
                    </Link>
                  </div>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 lg:col-span-12">
          <div className="col-span-12 mb-3 intro-y lg:col-span-12">
            {/* BEGIN: Form Validation */}
            <div className="intro-y box">
              
                <>
                  <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                    <h2 className="mr-auto text-base font-medium">
                      Add Itinerary - Basic Info
                    </h2>
                  </div>
                  <div className="p-5">
                    <>
                      {/* BEGIN: Validation Form */}
                      {/*<form className="" onSubmit={onSubmit}>*/}
                        <div className="input-form">
                          <FormInput
                            {...register("createdBy")}
                            id="createdBy" 
                            name="createdBy"
                            type="hidden"
                            name="createdBy"
                            value="1"
                          />

                          <FormLabel
                            htmlFor="tourName"
                            className="flex flex-col w-full sm:flex-row"
                          >
                            Tour Name
                            <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                              Required, at least 2 characters
                            </span>
                          </FormLabel>
                          <FormInput
                            id="tourName"
                            name="tourName"
                            onChange={e => setTourName(e.target.value)}
                            type="text"
                            // className={clsx({
                            //   "border-danger": errors.tourName,
                            // })}
                            value={tourName}
                            placeholder="Tour Name"
                          />
                          {errors.tourName.active && (
                            <div className="mt-2 text-danger">
                              {typeof errors.tourName.message === "string" &&
                                errors.tourName.message}
                            </div>
                          )}
                          {/* {errors.tourName && (
                            <div className="mt-2 text-danger">
                              {typeof errors.tourName.message === "string" &&
                                errors.tourName.message}
                            </div>
                          )} */}
                        </div>

                        <div className="mt-3 input-form">
                          <FormLabel
                            htmlFor="description"
                            className="flex flex-col w-full sm:flex-row"
                          >
                            Description
                            <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                              Required, at least 2 characters
                            </span>
                          </FormLabel>
                          <FormTextarea
                            {...register("description")}
                            id="description"
                            onChange={e => setDescription(e.target.value)}
                            rows="4"
                            placeholder="Add a short description here."
                          ></FormTextarea>
                          {errors.description.active && (
                            <div className="mt-2 text-danger">
                              {typeof errors.description.message === "string" &&
                                errors.description.message}
                            </div>
                          )}
                          {/* <ClassicEditor
                            id="description"
                            value={description}
                            onChange={setDescription}
                          /> */}
                        </div>

                        <div className="grid grid-cols-12 gap-2">
                          <div className="mt-3 col-span-4 input-form">
                            <FormLabel
                              htmlFor="countryId"
                              className="flex flex-col w-full sm:flex-row"
                            >
                              Country
                              {/* <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                                Required, maximum 30 days
                              </span> */}
                            </FormLabel>
                            <TomSelect 
                              {...register("countryId")}
                              id="countryId"
                              name="countryId"
                              className="sm:mr-2"
                              value={countryId}
                              onChange={setCountryId} 
                              aria-label="Default select example">
                                {_.take(country.data, country.data.length).map((item, Key) => {
                                  return <option value={item.id}>{item.countryname}</option>
                                })}
                            </TomSelect>
                            {/* {errors.countryId && (
                              <div className="mt-2 text-danger">
                                {typeof errors.countryId.message === "string" &&
                                  errors.countryId.message}
                              </div>
                            )} */}
                          </div>

                          <div className="mt-3 col-span-4 input-form">
                            <FormLabel
                              htmlFor="stateId"
                              className="flex flex-col w-full sm:flex-row"
                            >
                              State
                              {/* <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                                Required, maximum 30 days
                              </span> */}
                            </FormLabel>
                            <TomSelect 
                              {...register("stateId")}
                              id="stateId"
                              name="stateId"
                              className="sm:mr-2"
                              value={stateId}
                              onChange={setStateId} 
                              aria-label="Default select example">
                                    {_.take(state.data, state.data.length).map((item, Key) => {
                                  return <option value={item.id}>{item.stateName}</option>
                                })}
                            </TomSelect>
                            {/* {errors.stateId && (
                              <div className="mt-2 text-danger">
                                {typeof errors.stateId.message === "string" &&
                                  errors.stateId.message}
                              </div>
                            )} */}
                          </div>

                          <div className="mt-3 mr-2 col-span-4 input-form">
                            <FormLabel
                              htmlFor="cityId"
                              className="flex flex-col w-full sm:flex-row"
                            >
                              City
                              {/* <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                                Required, maximum 30 days
                              </span> */}
                            </FormLabel>
                            <TomSelect 
                              {...register("cityId")}
                              id="cityId"
                              name="cityId"
                              className="sm:mr-2"
                              value={cityId}
                              // defaultValue={cityId}
                              // onChange={(e) => setCityId(e.target.value)}
                              onChange={setCityId}
                              aria-label="Default select example">
                                    {_.take(city.data, city.data.length).map((item, Key) => {
                                  return <option value={item.id}>{item.cityName}</option>
                                })}
                            </TomSelect>
                            {/* {errors.cityId && (
                              <div className="mt-2 text-danger">
                                {typeof errors.cityId.message === "string" &&
                                  errors.cityId.message}
                              </div>
                            )} */}
                          </div> 
                        </div>

                        <div className="grid grid-cols-12 gap-2">
                          <div className="mt-3 mr-2 col-span-4 input-form">
                            <FormLabel
                              htmlFor="noOfDays"
                              className="flex flex-col w-full sm:flex-row"
                            >
                              No of Days
                              {/* <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                                Required, maximum 30 days
                              </span> */}
                            </FormLabel>
                            <FormSelect 
                              {...register("noOfDays")}
                              id="noOfDays"
                              name="noOfDays"
                              className="sm:mr-2"
                              value={noOfDays}
                              onChange={e => setNoOfDays(e.target.value)} 
                              aria-label="Default select example">
                              {Array.apply(null, Array(20)).map((x, i) => { 
                                return <option value={i+1}>{i+1}</option>
                              })}
                            </FormSelect>
                            {/* {errors.noOfDays && (
                              <div className="mt-2 text-danger">
                                {typeof errors.noOfDays.message === "string" &&
                                  errors.noOfDays.message}
                              </div>
                            )} */}
                          </div>

                          <div className="mt-3 mr-2 col-span-4 input-form">
                            <FormLabel
                              htmlFor="noOfNights"
                              className="flex flex-col w-full sm:flex-row"
                            >
                              No of Nights
                              {/* <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                                Required, maximum 30 days
                              </span> */}
                            </FormLabel>
                            <FormSelect 
                              {...register("noOfNights")}
                              id="noOfNights"
                              name="noOfNights"
                              className="sm:mr-2"
                              value={noOfNights}
                              onChange={e => setNoOfNights(e.target.value)} 
                              aria-label="Default select example">
                              {Array.apply(null, Array(20)).map((x, i) => { 
                                return <option value={i+1}>{i+1}</option>
                              })}
                            </FormSelect>
                            {/* {errors.noOfNights && (
                              <div className="mt-2 text-danger">
                                {typeof errors.noOfNights.message === "string" &&
                                  errors.noOfNights.message}
                              </div>
                            )} */}
                          </div>

                          <div className="mt-3 mr-2 col-span-4 input-form">
                            <FormLabel
                              htmlFor="season"
                              className="flex flex-col w-full sm:flex-row"
                            >
                              Season
                              {/* <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                                Required, maximum 30 days
                              </span> */}
                            </FormLabel>
                            <FormSelect 
                              {...register("season")}
                              id="season"
                              name="season"
                              className="sm:mr-2"
                              value={season}
                              onChange={e => setSeason(e.target.value)}
                              aria-label="Default select example">
                                  <option value="On-season">On-season</option>
                                  <option value="Off-season">Off-season</option>
                            </FormSelect>
                            {/* {errors.season && (
                              <div className="mt-2 text-danger">
                                {typeof errors.season.message === "string" &&
                                  errors.season.message}
                              </div>
                            )} */}
                          </div> 
                        </div>
                      
                        <div className="mt-3 input-form">
                          <FormLabel
                            htmlFor="tourTheme"
                            className="flex flex-col w-full sm:flex-row"                        
                          >
                            Tour Theme
                            {/*<span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                              Required, maximum 30 days
                            </span>*/}
                          </FormLabel>
                          <FormSelect                           
                            {...register("tourTheme")}
                            id="tourTheme"
                            name="tourTheme"
                            className="sm:mr-2"
                            onChange={e => setTourTheme(e.target.value)} 
                            aria-label="Default select example"
                          >
                                  <option value="Holiday">Holiday</option>
                                  <option value="Business">Business</option>
                                  <option value="Honeymoon">Honeymoon</option>
                                  <option value="Religious">Religious</option>
                                  <option value="Ecotourism">Ecotourism</option>
                                  <option value="Adventure">Adventure</option>
                                  <option value="River Cruise">River Cruise</option>
                                  <option value="Family">Family</option>
                                  <option value="Hiking">Hiking</option>
                                  <option value="Cultural Heritage">Cultural Heritage</option>
                                  <option value="Sports">Sports</option>
                          </FormSelect>
                          {/* {errors.tourTheme && (
                            <div className="mt-2 text-danger">
                              {typeof errors.tourTheme.message === "string" &&
                                errors.tourTheme.message}
                            </div>
                          )}  */}
                        </div>

                        <div className="mt-3 input-form">
                          <FormLabel
                            htmlFor="highlightsCSV"
                            className="flex flex-col w-full sm:flex-row"
                          >
                            Highlights
                            <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                              Required, at least 2 characters
                            </span>
                          </FormLabel>
                          <FormInput
                            id="highlightsCSV"
                            name="highlightsCSV"
                            onChange={e => setHighlightsCSV(e.target.value)}
                            type="text"
                            value={highlightsCSV}
                            placeholder="Highlights"
                          />
                          {errors.highlightsCSV.active && (
                            <div className="mt-2 text-danger">
                              {typeof errors.highlightsCSV.message === "string" &&
                                errors.highlightsCSV.message}
                            </div>
                          )}
                        </div>

                        <div className="mt-3 input-form">
                          <FormLabel
                            htmlFor="thumbnail"
                            className="flex flex-col w-full sm:flex-row"
                          >
                            Tour Main Image
                            <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                              This will also be used as the banner.
                            </span>
                          </FormLabel>
                          
                          {/* <input id="thumbnail" type="file" onChange={(e) => {console.log({files: e.target.files}); setThumbnail(e.target.files[0]); showChosenImage(e.target.files[0]); }} /> */}
                          {/* <Button variant="primary" size="sm" type="button" onClick={uploadItiImage} className="w-24 mr-1 mt-2">
                            Upload
                          </Button> */}

                          <ImageRepo repoFor='' chosen={[thumbnail]} handleSlideOver={() => {setGallerySlideover(true); setHighlight('repository'); setRepoFor('itiImage');}} handleImageClick={(img) => {}} cancelChosenImg={() => {cancelChosenImg('itiImage');}} />
                          {/* <ImageUpload multiple='false' id='0' handleFile={(obj) => setThumbnailObj(obj)} uploadHandler={uploadItiImage}/> */}
                          {errors.thumbnail.active && (
                            <div className="mt-2 text-danger">
                              {typeof errors.thumbnail.message === "string" &&
                                errors.thumbnail.message}
                            </div>
                          )}
                        </div>

                        <div className="mt-3 input-form">
                          <FormLabel
                            htmlFor="gallery"
                            className="flex flex-col w-full sm:flex-row"
                          >
                            Tour Gallery
                            <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                              You can upload upto 20 images here.
                            </span>
                          </FormLabel>

                          {/* <ImageRepo chosen={gallery} handleSlideOver={() => {setGallerySlideover(true); setHighlight('repository'); setRepoFor('gallImage');}} handleImageClick={(img) => {}} cancelChosenImg={() => {cancelChosenImg(); setRepoFor('gallImage');}} /> */}
                          <ImageRepo repoFor='' chosen={gallery} handleSlideOver={() => {setGallerySlideover(true); setHighlight('repository'); setRepoFor('gallImage');}} handleImageClick={(img) => {}} cancelChosenImg={() => {cancelChosenImg('gallImage');}} />
                          {/* <ImageUpload multiple='true' id='0' handleFile={(obj) => setGalleryObj(obj)} uploadHandler={uploadGallImage}/> */}
                        </div>
                        
                        

                      {/*</form>*/}
                      {/* END: Validation Form */}
                    </>
                  </div>
                </>
            
            </div>
          
          </div>

        </div> 

        {/* Inclusion | Exclusion */}
        <div className="col-span-12 intro-y box lg:col-span-12">
          <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
            <h2 className="mr-auto text-base font-medium">
              Add Itinerary - Inclusions and Exclusions
            </h2>
          </div>
          <div className="p-5">
            <div className="mb-5">
              <FormLabel
                htmlFor="inclusions"
                className="flex flex-col w-full sm:flex-row"
              >
                Inclusions
                <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                  Required, at least 2 characters
                </span>
              </FormLabel>
              <ClassicEditor
                id="inclusions"
                value={inclusions}
                onChange={setInclusions}
              />
              {/* <FormTextarea
                id="inclusions"
                // value={inclusions}
                onChange={e => setInclusions(e.target.value)}
                rows="4"
                placeholder="Add trip inclusions here."
              ></FormTextarea> */}
              {errors.inclusions.active && (
                <div className="mt-2 text-danger">
                  {typeof errors.inclusions.message === "string" &&
                    errors.inclusions.message}
                </div>
              )}
            </div>

            <div className="mb-5">
              <FormLabel
                htmlFor="exclusions"
                className="flex flex-col w-full sm:flex-row"
              >
                Exclusions
                <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                  Required, at least 2 characters
                </span>
              </FormLabel>
              <ClassicEditor
                id="exclusions"
                value={exclusions}
                onChange={setExclusions}
              />
              {/* <FormTextarea
                id="exclusions"
                // value={exclusions}
                onChange={e => setExclusions(e.target.value)}
                rows="4"
                placeholder="Add trip exclusions here."
              ></FormTextarea> */}
              {errors.exclusions.active && (
                <div className="mt-2 text-danger">
                  {typeof errors.exclusions.message === "string" &&
                    errors.exclusions.message}
                </div>
              )}
            </div>

            <div className="mb-5">
              <FormLabel
                htmlFor="moreDetails"
                className="flex flex-col w-full sm:flex-row"
              >
                More Details
                <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                  Required, at least 2 characters
                </span>
              </FormLabel>
              <ClassicEditor
                id="moreDetails"
                value={moreDetails}
                onChange={setMoreDetails}
              />
              {/* <FormTextarea
                id="moreDetails"
                // value={moreDetails}
                onChange={e => setMoreDetails(e.target.value)}
                rows="4"
                placeholder="Add any other details here."
              ></FormTextarea> */}
              {errors.moreDetails.active && (
                <div className="mt-2 text-danger">
                  {typeof errors.moreDetails.message === "string" &&
                    errors.moreDetails.message}
                </div>
              )}
            </div>

          </div>
        </div>        

        {/* per day details */}
        {/* { Array.apply(null, Array(Number(days))).map((item,idx) => { */}
        { dayDetails.map((item,idx) => {
          return <div key={idx} className="col-span-12 intro-y box lg:col-span-12">
          <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
            <h2 className="mr-auto text-base font-medium">
              Add Itinerary - Day {idx+1} Details
            </h2>
          </div>
          <div className="p-5">
              
                  <div className="input-form">
                    <FormLabel
                      htmlFor={"title_"+(idx+1)}
                      className="flex flex-col w-full sm:flex-row"
                    >
                      Day Heading
                      <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                        Add a heading specific to the day
                      </span>
                    </FormLabel>
                    <FormInput
                      id={"title_"+(idx+1)}
                      name={"title_"+(idx+1)}
                      type="text"
                      // value={dayDetails[idx].dayHeading}
                      onChange={e => handleDayDetails(idx+1,e.target.id,e.target.value)}
                      // className={clsx({
                      //   "border-danger": errors.dayHeading,
                      // })}
                      placeholder="Day Heading"
                    />
                    {errors.dayDetails[idx].title.active && (
                      <div className="mt-2 text-danger">
                        {typeof errors.dayDetails[idx].title.message === "string" &&
                          errors.dayDetails[idx].title.message}
                      </div>
                    )}
                  </div>

                  <div className="my-3 input-form">
                    <FormLabel
                      htmlFor={"thumbnail_"+(idx+1)}
                      className="flex flex-col w-full sm:flex-row"
                    >
                      Thumbnail
                      <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                        This will also act as a banner for the day
                      </span>
                    </FormLabel> 
                    
                    {/* <input className="form-control" id={"thumbnail_"+(idx+1)} type="file" onChange={e => handleDayDetails(idx+1,e.target.id,e.target.files[0])} /> */}
                    {/* <Button variant="primary" size="sm" type="button" onClick={() => {uploadDayImage(idx+1)}} className="w-24 mr-1 mt-2">
                      Upload
                    </Button> */}

                    <ImageRepo repoFor='' chosen={[item.thumbnail]} handleSlideOver={() => {setGallerySlideover(true); setHighlight('repository'); setRepoFor('dayImage'); set_currentDayId(idx+1);}} handleImageClick={(img) => {}} cancelChosenImg={() => {cancelChosenImg('dayImage',idx+1);}} />
                    {errors.dayDetails[idx].thumbnail.active && (
                      <div className="mt-2 text-danger">
                        {typeof errors.dayDetails[idx].thumbnail.message === "string" &&
                          errors.dayDetails[idx].thumbnail.message}
                      </div>
                    )}
                    {/* <ImageUpload multiple='false' id={idx+1} handleFile={(obj) => handleDayDetails(idx+1,"thumbnailObj_"+(idx+1),obj)} uploadHandler={() => uploadDayImage(idx+1)}/> */}
                  </div>

                  <div className="my-3 input-form"> 
                    <FormLabel
                      htmlFor={"description_"+(idx+1)}
                      className="flex flex-col w-full sm:flex-row"
                    >
                      Description
                      <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                        Required, at least 2 characters
                      </span>
                    </FormLabel>
                    <FormTextarea
                      id={"description_"+(idx+1)}
                      // value={dayDetails[idx].description}
                      onChange={e => handleDayDetails(idx+1,e.target.id,e.target.value)}
                      rows="4"
                      placeholder="Add a short description here."
                    ></FormTextarea>
                    {errors.dayDetails[idx].description.active && (
                      <div className="mt-2 text-danger">
                        {typeof errors.dayDetails[idx].description.message === "string" &&
                          errors.dayDetails[idx].description.message}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-12 gap-2">
                    <div className="mt-3 col-span-6 input-form">
                      <FormLabel
                        htmlFor={"fromId_"+(idx+1)}
                        className="flex flex-col w-full sm:flex-row"
                      >
                        From
                        {/* <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                          Required, maximum 30 days
                        </span> */}
                      </FormLabel>
                      {/* <FormSelect
                        id={"fromId_"+(idx+1)}
                        name={"fromId_"+(idx+1)}
                        className="sm:mr-2"
                        value={item.fromId}
                        onChange={e => handleDayDetails(idx+1,e.target.id,e.target.value)} 
                        aria-label="Default select example">
                              {_.take(city.data, city.data.length).map((item, Key) => {
                            return <option value={item.id}>{item.cityName}</option>
                          })}
                      </FormSelect> */}
                      <Select
                        defaultValue={{ value: item.fromId, label: getCityName(item.fromId) }}
                        onChange={e => handleDayDetails(idx+1,"fromId_"+(idx+1),e.value)}
                        options={city?.data.map((c) => {
                          return { value: c.id, label: c.cityName }
                        })}
                        className="bg-transparent"                        
                      />
                    </div>

                    <div className="mt-3 col-span-6 input-form">
                      <FormLabel
                        htmlFor={"toId_"+(idx+1)}
                        className="flex flex-col w-full sm:flex-row"
                      >
                        To
                        {/* <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                          Required, maximum 30 days
                        </span> */}
                      </FormLabel>
                      {/* <FormSelect
                        id={"toId_"+(idx+1)}
                        name={"toId_"+(idx+1)}
                        className="sm:mr-2"
                        value={item.toId}
                        onChange={e => handleDayDetails(idx+1,e.target.id,e.target.value)} 
                        aria-label="Default select example">
                              {_.take(city.data, city.data.length).map((item, Key) => {
                            return <option value={item.id}>{item.cityName}</option>
                          })}
                      </FormSelect> */}
                      <Select
                        defaultValue={{ value: item.toId, label: getCityName(item.toId) }}
                        onChange={e => handleDayDetails(idx+1,"toId_"+(idx+1),e.value)}
                        options={city?.data.map((c) => {
                          return { value: c.id, label: c.cityName }
                        })}
                        className="bg-transparent"                        
                      />
                    </div>
                    <div className="mr-3 col-span-12">
                      <span className="pl-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                        Changing From or To city will erase existing plan.
                      </span>
                    </div>
                  </div>

                  <div className="col-span-12 intro-y box lg:col-span-12" style={{zIndex:'0'}}>
                  {/* <DayPlan plan={item.plan} city={city} fromID={Number(item.fromId)} toID={Number(item.toId)} season={season} handleChange={(p) => handlePlan(p,idx)} type='add' /> */}
                  <DayPlan plan={item.plan} locations={item.locations} city={city} fromID={Number(item.fromId)} toID={Number(item.toId)} season={season} handleChange={(field,val) => handleDayDetails(idx+1,field,val)} type='add' />
                  </div>
            </div>
            
                      
          
        </div>
        })}

        
        {/* Add | Remove day buttons */}
        <div className="col-span-12 intro-y w-48">
          <Button className="" variant="primary" size="sm" type="button" onClick={() => setDays(days+1)} className="mt-0 w-12 mr-1">
            <Lucide icon="Plus" className="w-4 h-4" />
          </Button>
          { (days > 1) ?
          <Button className="" variant="primary" size="sm" type="button" onClick={() => setDays(days-1)} className="mt-0 w-12 mr-1">
            <Lucide icon="Minus" className="w-4 h-4" />
          </Button>
          : ''
          }
        </div>
        
        {/* Itinerary settings */}
        <div className="col-span-12 intro-y box lg:col-span-12">
          <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
            <h2 className="mr-auto text-base font-medium">
              Add Itinerary - Settings
            </h2>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-12 gap-2">
              <div className="mt-3 col-span-6 input-form">
                <FormLabel
                  htmlFor="isPaymentInfoShow"
                  className="flex flex-col w-full sm:flex-row"
                >
                  Show Payment Information
                </FormLabel>
                <FormSelect 
                  {...register("isPaymentInfoShow")}
                  id="isPaymentInfoShow"
                  name="isPaymentInfoShow"
                  className="sm:mr-2"
                  onChange={e => setIsPaymentInfoShow(e.target.value)} 
                  aria-label="Default select example">
                        <option value="Y">Yes</option>
                        <option value="N">No</option>
                </FormSelect>
              </div>

              <div className="mt-3 col-span-6 input-form">
                <FormLabel
                  htmlFor="isCancelationInfoShow"
                  className="flex flex-col w-full sm:flex-row"
                >
                  Show Cancel Information
                </FormLabel>
                <FormSelect 
                  {...register("isCancelationInfoShow")}
                  id="isCancelationInfoShow"
                  name="isCancelationInfoShow"
                  className="sm:mr-2"
                  onChange={e => setIsCancelationInfoShow(e.target.value)} 
                  aria-label="Default select example">
                        <option value="Y">Yes</option>
                        <option value="N">No</option>
                </FormSelect>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-2">
              <div className="mt-3 col-span-6 input-form">
                <FormLabel
                  htmlFor="currencyId"
                  className="flex flex-col w-full sm:flex-row"
                >
                  Currency
                </FormLabel>
                <FormSelect 
                  {...register("currencyId")}
                  id="currencyId"
                  name="currencyId"
                  className="sm:mr-2"
                  onChange={e => setCurrencyId(e.target.value)} 
                  aria-label="Default select example">
                        <option value="1">Rupees</option>
                        <option value="2">Dirham</option>
                        <option value="3">Baht</option>
                </FormSelect>
              </div>

              <div className="mt-3 col-span-6 input-form">
                <FormLabel
                  htmlFor="publishToSite"
                  className="flex flex-col w-full sm:flex-row"
                >
                  Publish to site
                </FormLabel>
                <FormSelect 
                  id="publishToSite"
                  name="publishToSite"
                  className="sm:mr-2"
                  onChange={e => setPublishToSite(e.target.value)} 
                  aria-label="Default select example">
                        <option value="Y">Yes</option>
                        <option value="N">No</option>
                </FormSelect>
              </div>

              <div className="mt-3 col-span-6 input-form">
                <FormLabel
                  htmlFor="isActive"
                  className="flex flex-col w-full sm:flex-row"
                >
                  Status
                </FormLabel>
                <FormSelect 
                  {...register("isActive")}
                  id="isActive"
                  name="isActive"
                  className="sm:mr-2"
                  onChange={e => setIsActive(e.target.value)} 
                  aria-label="Default select example">
                        <option value="Y">Active</option>
                        <option value="N">Inactive</option>
                </FormSelect>
              </div>
            </div>
          </div>
        </div>

        {/* Itinerary PAX */}
        <div className="col-span-12 intro-y box lg:col-span-12" >
          <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
            <h2 className="mr-auto text-base font-medium">
              Add Itinerary - PAX (Component)
            </h2>
          </div>
          <div className="p-5">
          <Pax dayDetails={dayDetails} season={season} handleChange={(p,pItems) => {setPax(p); setPaxItems(pItems)}} />
          </div>
        </div>
        
        {/* Submit button */}
        <div className="grid grid-cols-12 gap-6 mb-5 pb-5 ">
          <div className="col-span-12 intro-y w-96">
            <Button className="" variant="primary" type="submit" onClick={onSubmit} className="mt-5 w-24 mr-1">
              Save
            </Button>
            <Link className="" to="/itinerary">
              <Button className="" variant="secondary" type="button" className="mt-5 w-48 mr-1">
                Back to Index
              </Button>
            </Link>
          </div>
        </div>
        
        
        {/* Hotel Slide Over Content */}
        <div className="p-5">
        <Slideover
          open={hotelSlideover}
          // open={true}
          onClose={() => {
            setHotelSlideover(false);
          }}
        >
          <Slideover.Panel>
            <Slideover.Title className="p-5">
              <h2 className="mr-auto text-base font-medium">
                Select {slideovertext[highlight]}
              </h2>
            </Slideover.Title>
            <Slideover.Description>
            {(hotel.data.length != 0) ? _.take(hotel.data, hotel.data.length).map((item, Key) => {
              let seasonCheck = (season === 'On-season') ? 'Season' : 'OffSeason' 
              return <div key={item.id} className="m-1 p-2 " onClick={() => {
                handleDayArrayDetails('hotel',item.id,item.hotelName,item['minRoomRent' + seasonCheck + 'AC'],2);                
              }}>
              <div className="rounded" style={{height:'200px', backgroundImage:`url(${filePath}/hotel/${item.mainImg})`, backgroundPosition:'center', backgroundSize:'cover' }}>
            
              </div>
              <div className="grid grid-cols-12">
                <div className="p-3 col-span-7"><p>
                  <h3 className="text-2xl"><b>{item.hotelName}</b></h3>
                  <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                    {getCityName(item.cityId)} 
                  </span><br />
                  {/* <b>On-season | No AC</b> - ₹{item.minRoomRentSeasonNonAC} <br /> */}
                  <b>{season} | No AC</b> - ₹{item['minRoomRent' + seasonCheck + 'NonAC']} <br />
                  {/* <b>Off-season | AC</b> - ₹{item.minRoomRentOffSeasonAC}  */}
                </p></div>
                <div className="p-3 col-span-5 text-end" >
                  <b><span className="text-2xl">₹</span><span className="text-4xl">{item['minRoomRent' + seasonCheck + 'AC']}</span></b><br />
                  {season} | AC
                </div>
              </div>
              </div>
            }) : <div className="p-4">No hotels found for the selected city</div> }
            </Slideover.Description>
          </Slideover.Panel>
        </Slideover>
        </div>       
        
        {/* Activity Slide Over Content */}
        <div className="p-5">
        <Slideover
          open={activitySlideover}
          // open={true}
          onClose={() => {
            setActivitySlideover(false);
          }}
        >
          <Slideover.Panel>
            <Slideover.Title className="p-5">
              <h2 className="mr-auto text-base font-medium">
                Select {slideovertext[highlight]}
              </h2>
            </Slideover.Title>
            <Slideover.Description>
            {(activity.data.length != 0) ? _.take(activity.data, activity.data.length).map((item, Key) => {
              return <div key={item.id} className="m-1 p-2 " onClick={() => {
                handleDayArrayDetails('activity',item.id,item.activityName,item.price);                
              }}>
                <div className="rounded" style={{height:'200px', backgroundImage:`url(${filePath}/activity/${item.mainImg})`, backgroundPosition:'center', backgroundSize:'cover' }}>
              
                </div>
                <div className="grid grid-cols-12">
                  <div className="p-3 col-span-4"><p>
                    <h3 className="text-2xl"><b>{item.activityName}</b></h3>
                    <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                      {getCityName(item.cityId)} 
                    </span><br />
                    <b>Kid fee - </b> ₹{item.kidFee} <br /> <b>Infant fee - </b> ₹{item.infantFee}
                  </p></div>
                  <div className="p-3 col-span-8 text-end" >
                    <b><span className="text-2xl">₹</span><span className="text-4xl">{item.adultFee}</span></b><br />
                    Adult fee
                  </div>
                </div>

              </div>
            }) : <div className="p-4">No activities found for the selected city</div> } 
            </Slideover.Description>
          </Slideover.Panel>
        </Slideover>
        </div>

        {/* Flight Slide Over Content */}
        <div className="p-5">
        <Slideover
          open={flightSlideover}
          // open={true}
          onClose={() => {
            setFlightSlideover(false);
          }}
        >
          <Slideover.Panel>
            <Slideover.Title className="p-5">
              <h2 className="mr-auto text-base font-medium">
                Select {slideovertext[highlight]}
              </h2>
            </Slideover.Title>
            <Slideover.Description>
            {(flight.data.length != 0) ? _.take(flight.data, flight.data.length).map((item, Key) => {
              return <div key={item.id} className="m-1 p-2 " onClick={() => {
                handleDayArrayDetails('flight',item.id,item.flightName,item.price);                
              }}>
              <div className="rounded" style={{height:'200px', backgroundImage:`url(${filePath}/flight/${item.mainImg})`, backgroundPosition:'center', backgroundSize:'cover' }}>
            
              </div>
              {/* <div className="p-2"><p><b>{item.flightName}</b> - ₹{item.price}</p></div> */}
              <div className="grid grid-cols-12">
                <div className="p-3 col-span-4"><p>
                  <h3 className="text-2xl"><b>{item.flightName}</b></h3>
                  <b>{getCityName(item.departureCityId)}</b> to <b>{getCityName(item.destinationCityId)}</b>
                </p></div>
                <div className="p-3 col-span-8 text-end" >
                  <b><span className="text-2xl">₹</span><span className="text-4xl">{item.price}</span></b><br />
                  Economy
                </div>
              </div>
              </div>
              
            }) : <div className="p-4">No flights found for the selected city</div> } 
            </Slideover.Description>
          </Slideover.Panel>
        </Slideover>
        </div>

        {/* Transport Slide Over Content */}
        <div className="p-5">
        <Slideover
          open={transportSlideover}
          // open={true}
          onClose={() => {
            setTransportSlideover(false);
          }}
        >
          <Slideover.Panel>
            <Slideover.Title className="p-5">
              <h2 className="mr-auto text-base font-medium">
                Select {slideovertext[highlight]}
              </h2>
            </Slideover.Title>
            <Slideover.Description>            
            {(transport.data.length != 0) ? _.take(transport.data, transport.data.length).map((item, Key) => {
              let seasonCheck = (season === 'On-season') ? 'price' : 'priceOffSeason'
              return <div key={item.id} className="m-1 p-2 " onClick={() => {
                handleDayArrayDetails('transport',item.id,item.transportName,item.price,item.noOfseat);                
              }}>
              <div className="rounded bg-dark" style={{height:'200px', backgroundImage:`url(${filePath}/transport/${item.mainImg})`, backgroundPosition:'center', backgroundSize:'cover' }}>
            
              </div>
              {/* <div className="p-2">
                <p><b>{item.transportName}</b> - ₹{item.price}</p>
                <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                  {item.noOfseat}-seater
                </span>
              </div> */}
              <div className="grid grid-cols-12">
                <div className="p-3 col-span-4"><p>
                  <h3 className="text-2xl"><b>{item.transportName}</b></h3>
                  <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                    {item.noOfseat}-seater
                  </span><br />
                  <b>{item.departure}</b> to <b>{item.destination}</b>
                </p></div>
                <div className="p-3 col-span-8 text-end" >
                  <b><span className="text-2xl">₹</span><span className="text-4xl">{item[seasonCheck]}</span></b><br />
                  {season}
                </div>
              </div>
              </div>
            }) : <div className="p-4">No transport found for the selected city</div> }            
            </Slideover.Description>
          </Slideover.Panel>
        </Slideover>
        </div>

        {/* Train Slide Over Content */}
        <div className="p-5">
        <Slideover
          open={trainSlideover}
          // open={true}
          onClose={() => {
            setTrainSlideover(false);
          }}
        >
          <Slideover.Panel>
            <Slideover.Title className="p-5">
              <h2 className="mr-auto text-base font-medium">
                Select {slideovertext[highlight]}
              </h2>
            </Slideover.Title>
            <Slideover.Description>            
            {(train.data.length != 0) ? _.take(train.data, train.data.length).map((item, Key) => {
              return <div key={item.id} className="m-1 p-2 " onClick={() => {
                handleDayArrayDetails('train',item.id,item.trainNo,item.price,1);                
              }}>
              <div className="rounded bg-dark" style={{height:'200px', backgroundImage:`url(${filePath}/train/${item.mainImg})`, backgroundPosition:'center', backgroundSize:'cover' }}>
            
              </div>
              <div className="grid grid-cols-12">
                <div className="p-3 col-span-4"><p>
                  <h3 className="text-2xl"><b>{item.trainNo}</b></h3>
                  <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                    departs at {item.departureTime}
                  </span><br />
                  <b>{getCityName(item.departureCityId)}</b> to <b>{getCityName(item.destinationCityId)}</b>
                </p></div>
                <div className="p-3 col-span-8 text-end" >
                  <b><span className="text-2xl">₹</span><span className="text-4xl">{item.price}</span></b><br />
                  {/* Economy */}
                </div>
              </div>
              </div>
            }) : <div className="p-4">No train found for the selected city</div> }            
            </Slideover.Description>
          </Slideover.Panel>
        </Slideover>
        </div>

        {/* Cruise Slide Over Content */}
        <div className="p-5">
        <Slideover
          open={cruiseSlideover}
          // open={true}
          onClose={() => {
            setCruiseSlideover(false);
          }}
        >
          <Slideover.Panel>
            <Slideover.Title className="p-5">
              <h2 className="mr-auto text-base font-medium">
                Select {slideovertext[highlight]}
              </h2>
            </Slideover.Title>
            <Slideover.Description>            
            {(cruise.data.length != 0) ? _.take(cruise.data, cruise.data.length).map((item, Key) => {
              return <div key={item.id} className="m-1 p-2 " onClick={() => {
                handleDayArrayDetails('cruise',item.id,item.cruiseNo,item.price,1);                
              }}>
              <div className="rounded bg-dark" style={{height:'200px', backgroundImage:`url(${filePath}/cruise/${item.mainImg})`, backgroundPosition:'center', backgroundSize:'cover' }}>
            
              </div>
              <div className="grid grid-cols-12">
                <div className="p-3 col-span-4"><p>
                  <h3 className="text-2xl"><b>{item.cruiseNo}</b></h3>
                  <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                    departs at {item.departureTime}
                  </span><br />
                  <b>{item.departure}</b> to <b>{item.destination}</b>
                </p></div>
                <div className="p-3 col-span-8 text-end" >
                  <b><span className="text-2xl">₹</span><span className="text-4xl">{item.price}</span></b><br />
                  {/* Economy */}
                </div>
              </div>
              </div>
            }) : <div className="p-4">No cruise found for the selected city</div> }            
            </Slideover.Description>
          </Slideover.Panel>
        </Slideover>
        </div>

        {/* Gallery Slide Over Content */}
        <div className="p-5">
        <Slideover
          open={gallerySlideover}
          onClose={() => {
            setGallerySlideover(false);
          }}
        >
          <Slideover.Panel>
            <Slideover.Title className="p-5">
              <h2 className="mr-auto text-base font-medium">
                Select {slideovertext[highlight]}
              </h2>
            </Slideover.Title>
            <Slideover.Description>

            <div className="m-3">
              <h2 className="mr-auto text-base font-medium">
                Upload images to repository
              </h2>
              <input type="file" onChange={(e) => { setRepository(e.target.files) }} multiple />
              <Button variant="primary" size="sm" type="button" onClick={() => {console.log({repository}); uploadGallImage();}} className="w-24 mr-1 mt-2">
                Upload
              </Button>
            </div>
            
            <div className="grid grid-cols-12 gap-2">
            {_.take(gallImages?.data?.files, gallImages.data?.files?.length).map((file, Key) => {
              var border = ''
              if (gallery.includes(file) && repoFor === 'gallImage') {
                border = '5px dashed white'
              }
              return <div key={Key} className="m-1 p-2 col-span-6" onClick={() => {  
                handleRepoSelection(file);             
              }}>
                <div className="rounded " style={{height:'200px', backgroundImage:`url(${api.API_URL}images/${file})`, backgroundPosition:'center', backgroundSize:'cover', border }}>
              
                </div>   
              </div>
            })}

            </div> 
            
            </Slideover.Description>
          </Slideover.Panel>
        </Slideover>
        </div>

        {/* BEGIN: Success Notification Content */}
        <Notification
          id="success-notification-content"
          className="flex hidden"
        >
          <Lucide icon="CheckCircle" className="text-success" />
          <div className="ml-4 mr-4">
            <div id="success-msg" className="font-medium">{successMsg}</div>
          </div>
        </Notification>
        
        {/* BEGIN: Failed Notification Content */}
        <Notification
          id="failed-notification-content"
          className="flex hidden"
        >
          <Lucide icon="XCircle" className="text-danger" />
          <div className="ml-4 mr-4">
            <div className="font-medium">Data addition failed!</div>
            <div id="error-msg" className="mt-1 text-slate-500">
              Please check the field input suggestions.
            </div>
          </div>
        </Notification>
        {/* END: Failed Notification Content */}
        {/* BEGIN: Modal Content */}

        <Dialog
                      open={deleteModalPreview}
                      onClose={() => {
                        setDeleteModalPreview(false);
                      }}
                      //initialFocus={itineraryButtonRef}
                    >
                      <Dialog.Panel>
                        <div className="p-5 text-center">
                          <Lucide
                            icon="CheckCircle"
                            className="w-16 h-16 mx-auto mt-3 text-success"
                          />
                          <div className="mt-5 text-3xl">Itinerary has been saved successfully</div>
                          {/* <div className="mt-2 text-slate-500">
                            Itinerary has been saved successfully
                          </div> */}
                        </div>
                        <div className="px-5 pb-8 text-center">
                          <Button
                            type="button"
                            variant="outline-secondary"
                            onClick={() => {
                              setDeleteModalPreview(false);
                              navigate('/itinerary');
                            }}
                            className="w-40 mr-1"
                          >
                            Got to List Page
                          </Button>
                          <Button
                            type="button"
                            variant="success"
                            className="w-40"
                            onClick={() => {
                              setDeleteModalPreview(false);
                            }}
                            //ref={itineraryButtonRef}
                          >
                            Add another itinerary
                          </Button>
                        </div>
                      </Dialog.Panel>
                    </Dialog>

        <Dialog
          open={errorModalPreview}
          onClose={() => {
            setErrorModalPreview(false);
          }}
          //initialFocus={itineraryButtonRef}
        >
          <Dialog.Panel className="pb-5">
            <div className="p-5 text-center">
              <Lucide icon="XCircle" className="w-16 h-16 mx-auto mt-3 text-warning" />
              <div className="mt-5 text-3xl">Some fields have not been filled properly</div>              
            </div>
            <div className="px-5 m-5">
              <p><b>Main fields</b></p>
              {Object.keys(errors).map(field => {
                if (errors[field].active && field != 'dayDetails') {
                  return <p>{errors[field].message}</p>
                }                 
              })}
            </div>
            
            {errors.dayDetails.map((day,idx) => {
              let errArr = Object.keys(day).filter(x => day[x].active)
              if (errArr.length != 0) {
                return <div className="px-5 m-5">
                  <p><b>Day-{idx + 1} fields</b></p> 
                  {Object.keys(day).map(field => {
                    if (day[field].active) {
                      return <p>{day[field].message}</p>
                    }                 
                  })}
                </div>
              }              
            })}
            
          </Dialog.Panel>
        </Dialog>
                    {/* END: Modal Content */}
      </div>
    </>
  );
}

export default addItinerary;