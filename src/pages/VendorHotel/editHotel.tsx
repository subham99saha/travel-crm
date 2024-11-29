// @ts-nocheck
import {
  PreviewComponent,
  Preview,
} from "../../base-components/PreviewComponent";
import {
  FormLabel,
  FormInput,
  FormSelect,
  FormTextarea,
  FormCheck
} from "../../base-components/Form";
import _, { get } from "lodash";
import Button from "../../base-components/Button";
import Notification from "../../base-components/Notification";
import Lucide from "../../base-components/Lucide";
import { useForm } from "react-hook-form";
import Toastify from "toastify-js";
import clsx from "clsx";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, {useState, useRef, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { getVendorHotel, updateVendorHotel } from "./vendorHotelSlice";
import { fetchAllVendor } from "../Vendor/vendorSlice";
import { fetchAllCountry } from "../Country/CountrySlice";
import { fetchAllCity } from "../City/CitySlice";
import axios from "axios";
import api from "../../../apiconfig.json";
import TomSelect from "../../base-components/TomSelect";

import { Slideover } from "../../base-components/Headless";

import ImageRepo from "../Itinerary/imageRepo";

const editHotel = ()=>{
  const userType = localStorage.getItem('userInfo') === null ? '' : JSON.parse(localStorage.getItem('userInfo'))['resData']['userType']
  const server = api.API_URL;
  const imgaePath = `${server}images/hotel/`;
  const params = useParams();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state)=>state.vendorHotel);
  const vendor = useAppSelector((state)=> state.vendor);
  const city = useAppSelector((state)=> state.city);
  const country = useAppSelector((state)=> state.country);

  const [selectVendor, setVendor] = useState("");
  const [selectcountryId, setcountryId] = useState("");
  const [selectcityId, setcityId] = useState("");
  const [starRating, setstarRating] = useState("");
  const [hotelType, sethotelType] = useState("");
  const [mainImg, setmainImg] = useState("");
  const [isActive, setisActive] = useState("Y");
  const [checkInTimeH, setcheckInTimeH] = useState("");
  const [checkInTimeM, setcheckInTimeM] = useState("");
  const [checkOutTimeH, setcheckOutTimeH] = useState("");
  const [checkOutTimeM, setcheckOutTimeM] = useState("");
  const [minRoomRentSeasonAC, setminRoomRentSeasonAC] = useState("");
  const [minRoomRentSeasonNonAC, setminRoomRentSeasonNonAC] = useState("");
  const [minRoomRentOffSeasonAC, setminRoomRentOffSeasonAC] = useState("");
  const [minRoomRentOffSeasonNonAC, setminRoomRentOffSeasonNonAC] = useState("");
  const [minChildChargeSeasonAC, setminChildChargeSeasonAC] = useState("");
  const [minChildChargeSeasonNonAC, setminChildChargeSeasonNonAC] = useState("");
  const [minChildChargeOffSeasonAC, setminChildChargeOffSeasonAC] = useState("");
  const [minChildChargeOffSeasonNonAC, setminChildChargeOffSeasonNonAC] = useState("");
  const [minExtraBedSeasonAC, setminExtraBedSeasonAC] = useState("");
  const [minExtraBedSeasonNonAC, setminExtraBedSeasonNonAC] = useState("");
  const [minExtraBedOffSeasonAC, setminExtraBedOffSeasonAC] = useState("");
  const [minExtraBedOffSeasonNonAC, setminExtraBedOffSeasonNonAC] = useState("");
  const [minBreakfastCharge, setminBreakfastCharge] = useState("");
  const [minLunchCharge, setminLunchCharge] = useState("");
  const [minDinnerCharge, setminDinnerCharge] = useState("");
  const [isCheckedEP, setisCheckedEP] = useState();
  const [isCheckedAP, setisCheckedAP] = useState();
  const [isCheckedMAP, setisCheckedMAP] = useState();
  const [isCheckedCP, setisCheckedCP] = useState();
  const [gallery, setGallery] = useState([]);

  const [repoFor, setRepoFor] = useState('');
  const [repository, setRepository] = useState([]);
  
  const [gallerySlideover, setGallerySlideover] = useState(false);
  
  const [reload,setReload] = useState(0)
  
  const [gallImages, setGallImages] = useState([]);

  const IMAGE_FOLDER = 'hotel/'

  useEffect(() => {
    const URL = `${api.API_URL}${api.API_ENDPOINT.ITINERARY}`;
    axios.post(`${URL}/view-gallery?folder=${IMAGE_FOLDER}`, {}, {
        headers: {},
    }).then((result)=>{
        // console.log({result})
        setGallImages(result)
    });      
      
  },[reload])

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
    axios.post(`${URL}/upload-multi-image/${IMAGE_FOLDER}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    }).then((result)=>{
      setGallImages(result.data.filenames)
      console.log(result.data)
      // setSuccessMsg(result.data.filenames.length + ' images uploaded succesfully.') 
      setReload(reload + 1) 
    }).catch(err => {
      console.log({err})
    });      
  }
  const handleRepoSelection = (file) => {
    if (repoFor === 'mainImg') 
      setmainImg(file)
    else if (repoFor === 'gallImage') {
      let index = gallery.indexOf(file)
      if (index === -1) 
        setGallery([...gallery, file])
      else {
        let newGallery = [...gallery]
        newGallery.splice(index, 1) 
        setGallery(newGallery)
      }
    }
  }
  const cancelChosenImg = (repo_for) => {
    if (repo_for === 'itiImage') 
    setmainImg('')
    else if (repo_for === 'gallImage') {
      setGallery([])
    }
  }

  useEffect(()=>{
    dispatch(getVendorHotel(params.id))
  },[]);

  useEffect(()=>{
    dispatch(fetchAllVendor('hotel'));
    dispatch(fetchAllCity());
    dispatch(fetchAllCountry());
  },[]);

  useEffect(() => {
    reset(data);
    setcountryId(data.countryId);
    setcityId(String(data.cityId));
    setVendor(data.createdBy);
    setstarRating(data.starRating);
    sethotelType(data.hotelType);
    setisActive(data.isActive);
    setcheckInTimeH(data.checkInTimeH);
    setcheckInTimeM(data.checkInTimeM);
    setcheckOutTimeH(data.checkOutTimeH);
    setcheckOutTimeM(data.checkOutTimeM);
    setminRoomRentSeasonAC(data.minRoomRentSeasonAC);
    setminRoomRentSeasonNonAC(data.minRoomRentSeasonNonAC);
    setminRoomRentOffSeasonAC(data.minRoomRentOffSeasonAC);
    setminRoomRentOffSeasonNonAC(data.minRoomRentOffSeasonNonAC);
    setminChildChargeSeasonAC(data.minChildChargeSeasonAC);
    setminChildChargeSeasonNonAC(data.minChildChargeSeasonNonAC);
    setminChildChargeOffSeasonAC(data.minChildChargeOffSeasonAC);
    setminChildChargeOffSeasonNonAC(data.minChildChargeOffSeasonNonAC);
    setminExtraBedSeasonAC(data.minExtraBedSeasonAC);
    setminExtraBedSeasonNonAC(data.minExtraBedSeasonNonAC);
    setminExtraBedOffSeasonAC(data.minExtraBedOffSeasonAC);
    setminExtraBedOffSeasonNonAC(data.minExtraBedOffSeasonNonAC);
    setminBreakfastCharge(data.minBreakfastCharge);
    setminLunchCharge(data.minLunchCharge);
    setminDinnerCharge(data.minDinnerCharge);
    (data.isEP==='Y')?setisCheckedEP(true):setisCheckedEP(false);
    (data.isAP==='Y')?setisCheckedAP(true):setisCheckedAP(false);
    (data.isMAP==='Y')?setisCheckedMAP(true):setisCheckedMAP(false);
    (data.isCP==='Y')?setisCheckedCP(true):setisCheckedCP(false);
    setmainImg(data.mainImg)
    setGallery(JSON.parse(data.gallery || '[]'))

  }, [data]);

  console.log("checkInTimeH", checkInTimeH);
  console.log("checkOutTimeH", checkOutTimeH);

  const schema = yup
    .object({
      hotelName: yup.string().required().min(2),
      // departure: yup.string().required().min(2),
      // destination: yup.string().required().min(2),
    })
    .required();

  const {
    register,
    trigger,
    formState: { errors },
    reset,
    getValues
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

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
        checkOutTime: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
      }).showToast();
    } else {
      let sendData = {
        createdBy: selectVendor,
        starRating: starRating,
        hotelName: getValues('hotelName'),
        hotelType: hotelType,
        checkInTimeH: checkInTimeH,
        checkInTimeM: checkInTimeM, 
        checkOutTimeH: checkOutTimeH,
        checkOutTimeM: checkOutTimeM,
        minRoomRentSeasonAC: minRoomRentSeasonAC,
        minRoomRentSeasonNonAC: minRoomRentSeasonNonAC,
        minRoomRentOffSeasonAC: minRoomRentOffSeasonAC,
        minRoomRentOffSeasonNonAC: minRoomRentOffSeasonNonAC,
        minChildChargeSeasonAC: minChildChargeSeasonAC,
        minChildChargeSeasonNonAC: minChildChargeSeasonNonAC,
        minChildChargeOffSeasonAC: minChildChargeOffSeasonAC,
        minChildChargeOffSeasonNonAC: minChildChargeOffSeasonNonAC,
        minExtraBedSeasonAC: minExtraBedSeasonAC,
        minExtraBedSeasonNonAC: minExtraBedSeasonNonAC,
        minExtraBedOffSeasonAC: minExtraBedOffSeasonAC,
        minExtraBedOffSeasonNonAC: minExtraBedOffSeasonNonAC,
        minBreakfastCharge: minBreakfastCharge,
        minLunchCharge: minLunchCharge,
        minDinnerCharge: minDinnerCharge,
        contactNumber: getValues('contactNumber'),
        isEP: isCheckedEP?'Y':'N',
        isAP: isCheckedAP?'Y':'N',
        isMAP: isCheckedMAP?'Y':'N',
        isCP: isCheckedCP?'Y':'N',
        desc: getValues('desc'),
        address: getValues('address'),
        countryId: selectcountryId,
        cityId: selectcityId,
        isActive: isActive,
        userType: 'V',
        id: params.id,        
        mainImg: mainImg,
        gallery
       } ;
       console.log(sendData);
       dispatch(updateVendorHotel(sendData));
       const successEl = document
        .querySelectorAll("#success-notification-content")[0]
        .cloneNode(true) as HTMLElement;
      successEl.classList.remove("hidden");
      Toastify({
        node: successEl,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
      }).showToast();   
             
    }
  };

  const handleClick = ()=>{
    let fileName = mainImg;
    if(fileName){
      let formdata = new FormData();
      formdata.append("thumbnail", fileName);
      formdata.append("id", params.id);
  
      const res = axios.post(`${server}vendor-hotel-master/update-img/`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((result)=>{
        if(result.data.error===0){
          const successEl = document
        .querySelectorAll("#success-notification-content")[0]
        .cloneNode(true) as HTMLElement;
      successEl.classList.remove("hidden");
      Toastify({
        node: successEl,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
      }).showToast();
        }else{
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
        }
      });
    }
  }

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Manage Hotel</h2>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 intro-y lg:col-span-6">
          {/* BEGIN: Form Validation */}
          <PreviewComponent className="intro-y box">
            
              <>
                <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium">
                    Add Hotel
                  </h2>
                  <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
                    <Link to="/vendor-hotel">
                        <Button variant="secondary" type="button" className="ml-3 mr-0">
                        <Lucide icon="ChevronsLeft" className="w-4 h-4 mr-2" /> Back
                        </Button>
                    </Link>
                  </div>
                </div>
                <div className="p-5">
                  <Preview>
                    {/* BEGIN: Validation Form */}
                    <form className="validate-form" onSubmit={onSubmit}>
                      <div className="input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Hotel Name
                          <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, at least 2 characters
                          </span>
                        </FormLabel>
                        <FormInput
                          {...register("hotelName")}
                          id="validation-form-1"
                          type="text"
                          name="hotelName"
                          className={clsx({
                            "border-danger": errors.hotelName,
                          })}
                          placeholder="Hotel Name"
                        />
                        {errors.hotelName && (
                          <div className="mt-2 text-danger">
                            {typeof errors.hotelName.message === "string" &&
                              errors.hotelName.message}
                          </div>
                        )}
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Star Rating
                        </FormLabel>
                        <FormSelect
                        {...register("starRating")}
                        value={starRating}
                        onChange={(e)=>setstarRating(e.target.value)}
                        id="starRating"
                      >
                        <option value="">Select Star</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="Standard">Standard</option>
                        <option value="Deluxe">Deluxe</option>
                        <option value="Super Deluxe">Super Deluxe</option>
                      </FormSelect>
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Hotel Type 
                        </FormLabel>
                        <FormSelect
                        {...register("hotelType")}
                        value={hotelType}
                        onChange={(e)=>sethotelType(e.target.value)}
                        id="hotelType"
                      >
                        <option value="">Select Hotel Type</option>
                        <option value="Hotel">Hotel</option>
                        <option value="Resort">Resort</option>
                        <option value="Home Stay">Home Stay</option>
                        <option value="Boutique Hotel">Boutique Hotel</option>
                      </FormSelect>
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Contact Number
                          {/* <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, at least 2 characters
                          </span> */}
                        </FormLabel>
                        <FormInput
                          {...register("contactNumber")}
                          id="validation-form-1"
                          type="text"
                          name="contactNumber"
                          className={clsx({
                            "border-danger": errors.contactNumber,
                          })}
                          placeholder="Contact Number"
                        />
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Description
                          {/* <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, at least 2 characters
                          </span> */}
                        </FormLabel>
                        <FormTextarea
                          {...register("desc")}
                          id="validation-form-1"
                          rows="5"
                          type="text"
                          name="desc"
                          className={clsx({
                            "border-danger": errors.desc,
                          })}
                          placeholder="Description"
                        />
                        {errors.desc && (
                          <div className="mt-2 text-danger">
                            {typeof errors.desc.message === "string" &&
                              errors.desc.message}
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >Chekin Time
                        </FormLabel>
                        <div className="grid-cols-4 gap-2 sm:grid">
                      <FormSelect
                        {...register('checkInTimeH')}
                        id="checkInTimeH"
                        onChange={(e)=>setcheckInTimeH(e.target.value)} 
                        value={checkInTimeH}
                      >
                      <option value="0"> Hours </option>
                          {[...Array(24)].map((x, i) =>
                                <option value={i+1}>{i+1}</option>
                              )}
                      </FormSelect>
                      <FormSelect
                        {...register('checkInTimeM')}
                        id="checkInTimeM"
                        onChange={(e)=>setcheckInTimeM(e.target.value)}
                        value={checkInTimeM} 
                      >
                      <option value="0"> Minutes </option>
                          {[...Array(60)].map((x, i) =>
                                <option value={i+1}>{i+1}</option>
                              )}
                      </FormSelect>
                    </div>
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >Checkout Time
                        </FormLabel>
                        <div className="grid-cols-4 gap-2 sm:grid">
                      <FormSelect
                       {...register('checkOutTimeH')}
                       id="checkOutTimeH"
                       onChange={(e)=>setcheckOutTimeH(e.target.value)} 
                       value={checkOutTimeH} 
                      >
                      <option value="0"> Hours </option>
                          {[...Array(24)].map((x, i) =>
                                <option value={i+1}>{i+1}</option>
                              )}
                      </FormSelect>
                      <FormSelect
                        {...register('checkOutTimeM')}
                        id="checkOutTimeM"
                        onChange={(e)=>setcheckOutTimeM(e.target.value)} 
                        value={checkOutTimeM}
                      >
                      <option value="0"> Minutes </option>
                          {[...Array(60)].map((x, i) =>
                                <option value={i+1}>{i+1}</option>
                              )}
                      </FormSelect>
                    </div>
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >Minimum Room Rent (Season)
                        </FormLabel>
                        <div className="grid-cols-4 gap-2 sm:grid h-full">
                          <FormInput
                          type="text"
                          {...register('minRoomRentSeasonAC')}
                          id="validation-form-1"
                          value={minRoomRentSeasonAC}
                          onChange={(e)=>setminRoomRentSeasonAC(e.target.value)} 
                          placeholder="AC Room Rent"
                          
                          />
                          <FormInput
                          type="text"
                          {...register('minRoomRentSeasonNonAC')}
                          id="validation-form-1"
                          value={minRoomRentSeasonNonAC}
                          onChange={(e)=>setminRoomRentSeasonNonAC(e.target.value)} 
                          placeholder="Non AC Room Rent"
                          />
                    </div>
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >Minimum Room Rent (Off Season)
                        </FormLabel>
                        <div className="grid-cols-4 gap-2 sm:grid h-full">
                          <FormInput
                          type="text"
                          {...register('minRoomRentOffSeasonAC')}
                          id="validation-form-1"
                          value={minRoomRentOffSeasonAC}
                          onChange={(e)=>setminRoomRentOffSeasonAC(e.target.value)} 
                          placeholder="AC Room Rent"
                          
                          />
                          <FormInput
                          type="text"
                          {...register('minRoomRentOffSeasonNonAC')}
                          id="validation-form-1"
                          value={minRoomRentOffSeasonNonAC}
                          onChange={(e)=>setminRoomRentOffSeasonNonAC(e.target.value)} 
                          placeholder="Non AC Room Rent"
                          />
                    </div>
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >Minimum Child Charges (Season)
                        </FormLabel>
                        <div className="grid-cols-4 gap-2 sm:grid h-full">
                          <FormInput
                          type="text"
                          {...register('minChildChargeSeasonAC')}
                          id="validation-form-1"
                          value={minChildChargeSeasonAC}
                          onChange={(e)=>setminChildChargeSeasonAC(e.target.value)} 
                          placeholder="AC Room Rent"
                          
                          />
                          <FormInput
                          type="text"
                          {...register('minChildChargeSeasonNonAC')}
                          id="validation-form-1"
                          value={minChildChargeSeasonNonAC}
                          onChange={(e)=>setminChildChargeSeasonNonAC(e.target.value)} 
                          placeholder="Non AC Room Rent"
                          />
                    </div>
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >Minimum Child Charges (Off Season)
                        </FormLabel>
                        <div className="grid-cols-4 gap-2 sm:grid h-full">
                          <FormInput
                          type="text"
                          {...register('minChildChargeOffSeasonAC')}
                          id="validation-form-1"
                          value={minChildChargeOffSeasonAC}
                          onChange={(e)=>setminChildChargeOffSeasonAC(e.target.value)} 
                          placeholder="AC Room Rent"
                          
                          />
                          <FormInput
                          type="text"
                          {...register('minChildChargeOffSeasonNonAC')}
                          id="validation-form-1"
                          value={minChildChargeOffSeasonNonAC}
                          onChange={(e)=>setminChildChargeOffSeasonNonAC(e.target.value)} 
                          placeholder="Non AC Room Rent"
                          />
                    </div>
                      </div>

                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >Minimum Extra Bed Charges (Season)
                        </FormLabel>
                        <div className="grid-cols-4 gap-2 sm:grid h-full">
                          <FormInput
                          type="text"
                          {...register('minExtraBedSeasonAC')}
                          id="validation-form-1"
                          value={minExtraBedSeasonAC}
                          onChange={(e)=>setminExtraBedSeasonAC(e.target.value)} 
                          placeholder="AC Room Rent"
                          
                          />
                          <FormInput
                          type="text"
                          {...register('minExtraBedSeasonNonAC')}
                          id="validation-form-1"
                          value={minExtraBedSeasonNonAC}
                          onChange={(e)=>setminExtraBedSeasonNonAC(e.target.value)} 
                          placeholder="Non AC Room Rent"
                          />
                    </div>
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >Minimum Extra Bed Charges (Off Season)
                        </FormLabel>
                        <div className="grid-cols-4 gap-2 sm:grid h-full">
                          <FormInput
                          type="text"
                          {...register('minExtraBedOffSeasonAC')}
                          id="validation-form-1"
                          value={minExtraBedOffSeasonAC}
                          onChange={(e)=>setminExtraBedOffSeasonAC(e.target.value)} 
                          placeholder="AC Room Rent"
                          
                          />
                          <FormInput
                          type="text"
                          {...register('minExtraBedOffSeasonNonAC')}
                          id="validation-form-1"
                          value={minExtraBedOffSeasonNonAC}
                          onChange={(e)=>setminExtraBedOffSeasonNonAC(e.target.value)} 
                          placeholder="Non AC Room Rent"
                          />
                    </div>
                      </div>
                      <div className="mt-3 input-form">
                      <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >Meal Plan
                        </FormLabel>
                      <div className="grid-cols-4 gap-2 sm:grid">                                             
                      <FormCheck className="mr-2">
                          <FormCheck.Input
                            id="checkbox-switch-4"
                            type="checkbox"
                            value=""
                            checked={isCheckedEP}
                            onChange={e=>setisCheckedEP(e.target.checked)}
                          />
                          <FormCheck.Label htmlFor="checkbox-switch-4">
                            EP
                          </FormCheck.Label>
                        </FormCheck>
                        <FormCheck className="mr-2">
                          <FormCheck.Input
                            id="checkbox-switch-4"
                            type="checkbox"
                            value=""
                            checked={isCheckedAP}
                            onChange={e=>setisCheckedAP(e.target.checked)}
                          />
                          <FormCheck.Label htmlFor="checkbox-switch-4">
                            AP
                          </FormCheck.Label>
                        </FormCheck>
                        <FormCheck className="mr-2">
                          <FormCheck.Input
                            id="checkbox-switch-4"
                            type="checkbox"
                            value=""
                            checked={isCheckedMAP}
                            onChange={e=>setisCheckedMAP(e.target.checked)}
                          />
                          <FormCheck.Label htmlFor="checkbox-switch-4">
                            MAP
                          </FormCheck.Label>
                        </FormCheck>
                        <FormCheck className="mr-2">
                          <FormCheck.Input
                            id="checkbox-switch-4"
                            type="checkbox"
                            value=""
                            checked={isCheckedCP}
                            onChange={e=>setisCheckedCP(e.target.checked)}
                          />
                          <FormCheck.Label htmlFor="checkbox-switch-4">
                            CP
                          </FormCheck.Label>
                        </FormCheck>
                    </div>
                      </div>
                      <div className="mt-3 input-form">
                      <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >Minimum Food Charges
                        </FormLabel>
                      <div className="grid-cols-4 gap-2 sm:grid">                                             
                      <FormInput
                        {...register("minBreakfastCharge")}
                        type="text"
                        value={minBreakfastCharge}
                        onChange={(e)=>{setminBreakfastCharge(e.target.value)}}
                        className="mt-2 sm:mt-0"
                        placeholder="Breakfast"
                      />
                      <FormInput
                        {...register("minLunchCharge")}
                        type="text"
                        value={minLunchCharge}
                        onChange={(e)=>{setminLunchCharge(e.target.value)}}
                        className="mt-2 sm:mt-0"
                        placeholder="Lunch"
                      />
                      <FormInput
                        {...register("minDinnerCharge")}
                        type="text"
                        value={minDinnerCharge}
                        onChange={(e)=>{setminDinnerCharge(e.target.value)}}
                        className="mt-2 sm:mt-0"
                        placeholder="Dinner"
                      />
                    </div>
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Address
                        </FormLabel>
                        <FormInput
                          {...register("address")}
                          id="validation-form-1"
                          type="text"
                          name="address"
                          placeholder="Enter Address"
                        />
                      </div>
                      <div className="mt-3 input-form">
                      <div className="grid-cols-2 gap-2 sm:grid">                        
                      <FormSelect
                          {...register("countryId")}
                          id="validation-form-1"
                          name="createdBy"
                          value={selectcountryId}
                          onChange={setcountryId}
                          options={{
                            placeholder: "Select Country",
                          }}
                          className="w-full"
                        >
                          <option>Select Country</option>
                          { _.take(country.data, country.data.length).map((item, Key)=>(
                            <option value={item.id}>{item.countryname}</option>
                          )
                            
                          )}
                        </FormSelect>
                      
                        <TomSelect
                          {...register("cityId")}
                          id="validation-form-1"
                          name="cityId"
                          value={selectcityId}
                          onChange={setcityId}
                          options={{
                            placeholder: "Select City",
                          }}
                          className="w-full"
                        >
                          <option>Select City</option>
                          { _.take(city.data, city.data.length).map((item, Key)=>(
                            <option value={item.id}>{item.cityName}</option>
                          )
                            
                          )}
                        </TomSelect>
                    </div>
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Status
                        </FormLabel>
                        <FormSelect 
                          {...register("isActive")}
                          className="mt-2 sm:mr-2" 
                          aria-label="Default select example"
                          onChange={(e)=>setisActive(e.target.value)}
                          >
                                <option value="Y">Active</option>
                                <option value="N">Inactive</option>
                        </FormSelect>
                      </div>
                      {
                                            userType === "S"
                                                ? <div className="mt-3 input-form">
                                                    <FormLabel
                                                        htmlFor="validation-form-1"
                                                        className="flex flex-col w-full sm:flex-row"
                                                    >
                                                        Vendor
                                                    </FormLabel>
                                                    <FormSelect
                                                        {...register("createdBy")}
                                                        id="validation-form-1"
                                                        name="createdBy"
                                                        value={selectVendor}
                                                        onChange={(e) => setVendor(e.target.value)}
                                                        options={{
                                                            placeholder: "Select Vendor",
                                                        }}
                                                        className="w-full"
                                                    >
                                                        <option>Select Vendor</option>
                                                        {_.take(vendor.data, vendor.data.length).map((item, Key) => (
                                                            <option value={item.id}>{item.vName}</option>
                                                        )

                                                        )}
                                                    </FormSelect>
                                                    {errors.departureCityId && (
                                                        <div className="mt-2 text-danger">
                                                            {typeof errors.departureCityId.message === "string" &&
                                                                errors.departureCityId.message}
                                                        </div>
                                                    )}
                                                </div>
                                                : null
                                        }
                      <div className="mt-3 input-form">
                        <FormLabel
                            htmlFor="mainImg"
                            className="flex flex-col w-full sm:flex-row"
                          >
                            Tour Main Image
                            <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                              This will also be used as the banner.
                            </span>
                        </FormLabel>
                        <ImageRepo repoFor={IMAGE_FOLDER} chosen={[mainImg]} handleSlideOver={() => {setGallerySlideover(true); setRepoFor('mainImg');}} handleImageClick={(img) => {}} cancelChosenImg={() => {cancelChosenImg('mainImg');}} />

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
                        <ImageRepo repoFor={IMAGE_FOLDER} chosen={gallery} handleSlideOver={() => {setGallerySlideover(true); setRepoFor('gallImage');}} handleImageClick={(img) => {}} cancelChosenImg={() => {cancelChosenImg('gallImage');}} />

                      </div>
                      <Button variant="primary" type="submit" className="mt-5 w-24 mr-1">
                        Update
                      </Button>
                      <Link to="/vendor-hotel">
                        <Button variant="secondary" type="button" className="mt-5 w-24 mr-1">
                          Cancel
                        </Button>
                      </Link>
                    </form>
                    {/* END: Validation Form */}
                  </Preview>
                </div>
              </>
          
          </PreviewComponent>
          {/* <PreviewComponent className="intro-y box">
              <>
              
                <div className="col-span-12 intro-y md:col-span-6">
                <div className="box">
                  <div className="flex flex-col items-center p-5 lg:flex-row">
                    <div className="w-40 h-40 lg:w-12 lg:h-12 image-fit lg:mr-1">
                      <img
                        alt="Midone Tailwind HTML Admin Template"
                        className="rounded-md"
                        src={imgaePath+data.mainImg}
                      />
                    </div>
                    <div className="mt-3 text-center lg:ml-2 lg:mr-auto lg:text-left lg:mt-0">
                    <FormInput
                        {...register("mainImg")}
                        id="mainImg"
                        type="file"
                        className="mt-3 sm:mt-0"
                        onChange={(e) => setmainImg(e.target.files[0])}
                      />
                    </div>
                    <div className="flex mt-4 lg:mt-0">
                      <Button variant="primary" type="button" onClick={handleClick} className="mt-5 w-24 mr-1">
                        Update
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              </>
          </PreviewComponent> */}
          {/* END: Form Validation */}

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
                  Select Image
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
                  <div className="rounded " style={{height:'200px', backgroundImage:`url(${api.API_URL}images/${IMAGE_FOLDER}${file})`, backgroundPosition:'center', backgroundSize:'cover', border }}>
                
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
              <div className="font-medium">Data save successfully!</div>
            </div>
          </Notification>
          {/* END: Success Notification Content */}
          {/* BEGIN: Failed Notification Content */}
          <Notification
            id="failed-notification-content"
            className="flex hidden"
          >
            <Lucide icon="XCircle" className="text-danger" />
            <div className="ml-4 mr-4">
              <div className="font-medium">Data addition failed!</div>
              <div className="mt-1 text-slate-500">
                Please check the fileld form.
              </div>
            </div>
          </Notification>
          {/* END: Failed Notification Content */}
        </div>
      </div>
    </>
  );
}

export default editHotel;

