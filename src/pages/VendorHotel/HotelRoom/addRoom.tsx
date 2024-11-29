// @ts-nocheck
import {
  PreviewComponent,
  Preview,
  Source,
  Highlight,
} from "../../../base-components/PreviewComponent";
import { Disclosure } from "../../../base-components/Headless";
import _ from "lodash";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import fakerData from "../../utils/faker";
import Button from "../../../base-components/Button";
import Notification from "../../../base-components/Notification";
import Toastify from "toastify-js";
import { TECollapse } from "tw-elements-react";
import {
  FormInput,
  FormInline,
  FormSelect,
  FormLabel,
  FormHelp,
  FormCheck,
  InputGroup,
  FormSwitch,
  FormTextarea
} from "../../../base-components/Form";
import TomSelect from "../../../base-components/TomSelect";
import { ClassicEditor } from "../../../base-components/Ckeditor";
import Alert from "../../../base-components/Alert";
import Lucide from "../../../base-components/Lucide";
import Tippy from "../../../base-components/Tippy";
import Table from "../../../base-components/Table";
import { useAppSelector, useAppDispatch } from "../../../stores/hooks";


import { createVendorHotelRoom } from "./vendorHotelRoomSlice";

const addRoomDetails = ()=>{
  const params = useParams();
  const [roomFloor, sethRoomFloor] = useState('');
  const [roomBedType, sethRoomBedType] = useState();
  const [isActive, setisActive] = useState('Y');
  const [hotelRoomType, sethotelRoomType] = useState('');
  const [roomView, setRoomView] = useState('');
  

  const dispatch = useAppDispatch();
  const city  = useAppSelector((state) => state.city);
  
const schema = yup
    .object({
      //vName: yup.string().required("Name is a required field").min(2),
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

const onSubmit = async (event: React.ChangeEvent<HTMLFormElement>) =>{
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
        vhmId: params.id,
        roomType: hotelRoomType,
        hRoomName: getValues("hRoomName"),
        hRoomSize: getValues("hRoomSize"),
        hRoomFloor: roomFloor,
        hRoomBedType: roomBedType,
        hRoomNoBed: getValues("hRoomNoBed"),
        hRoomMaxOccuAdult: getValues("hRoomMaxOccuAdult"),
        hRoomMaxOccuChild: getValues("hRoomMaxOccuChild"),
        hRoomDefaultPriceAc: getValues("hRoomDefaultPriceAc"),
        hRoomDefaultPriceNonAc: getValues("hRoomDefaultPriceNonAc"),
        hRoomDesc: getValues("hRoomDesc"),
        amnBasic: _.toString(checkedBasic),
        isActive: isActive

     } ;
     console.log(formData);
     
     dispatch(createVendorHotelRoom(formData));
     reset(formData);
     
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
}

const [activeElement, setActiveElement] = useState("");

  const handleClick = (value: string) => {
    if (value === activeElement) {
      setActiveElement("");
    } else {
      setActiveElement(value);
    }
  };

const basicFacilityChck = ['Elevetor/Lift','Aircondition', 'Housekeeping', 'Ironing Service', 'Kitchen/Kitchenette','LAN','Laundry','Newspaper','Parking','Power Backup','Refrigerator','Room Service','Smoke detector','Smoking Rooms','Swimming Pool','Umbrellas','Washing Machine','Wifi','Laundromat'];
const [checkedBasic, setCheckedBasic] = useState([]);
const [countBasic, setCountBasic] = useState(0);

const generalServiceChck = ['Bellboy Service', 'Caretaker','Concierge','Multilingual Staff','Luggage Assistance','Luggage Storage','Specially able assistance','Wake-up Call/Service','Wheelchair','Butler Services','Doctor on call','Medical Centre','Pool/Beach towels'];
const [checkedGeneral, setCheckedGeneral] = useState([]);
const [countGeneral, setCountGeneral] = useState(0);

const activitiesSportsChck = ['Beach', 'Bonfire','Golf','Kayaks','Outdoor Sports','Snorkelling','Telescope','Water Sports','Canoeing','Skiing','Jungle Suferi','Cycling'];
const [checkedActiSprt, setCheckedActiSprt] = useState([]);
const [countActiSprt, setCountActiSprt] = useState(0);

const commonAreaChck = ['Balcony/Terrace', 'Fireplace','Lawn','Library','Lounge','Reception','Setaing Area','Sun Deck','Verandah','Jacuzzi','Prayer Room','Living Room','Outdoor Furniture','Picnic Area','Game Room','Sitout Area','Bonfire Pit'];
const [checkedCommonArea, setCheckedCommonArea] = useState([]);
const [countCommonArea, setCountCommonArea] = useState(0);

const foodDiningChck = ['Bar', 'Barbeque','Cafe','Coffee Shop','Dining Area','Kides Meals','Restaurant','Bakery'];
const [foodDining, setFoodDining] = useState([]);
const [countFoodDining, setCountFoodDining] = useState(0);

const healthWellnessChck = ['Activity Centre', 'Gym/Fitness Centre','Reflexology','Yoga','Meditation Room','First-aid Service'];
const [healthWellness, setHealthWellness] = useState([]);
const [countHealthWellness, setCountHealthWellness] = useState(0);

const businessConfChck = ['Banquet', 'Business Center','Conference Room','Photocopying','Fax Service','Printer'];
const [businessConf, setbusinessConf] = useState([]);
const [countbusinessConf, setCountbusinessConf] = useState(0);

const beautySpaChck = ['Massage', 'Salon','Spa','Steam and Sauna','Open air bath','Hammam'];
const [beautySpa, setBeautySpa] = useState([]);
const [countBeautySpa, setCountBeautySpa] = useState(0);

const securityChck = ['CCTV', 'Fire estingushers','Security alarms','Security Guard','Carbon monoxide detector'];
const [security, setSecurity] = useState([]);
const [countSecurity, setCountSecurity] = useState(0);

const transferChck = ['Airport Transfers', 'Shuttle Transfer'];
const [transfer, setTransfer] = useState([]);
const [countTransfer, setCountTransfer] = useState(0);

const shoppingChck = ['Book Shop', 'Souvenir Shop', 'Jewellery Shop'];
const [shopping, setShopping] = useState([]);
const [countShopping, setCountShopping] = useState(0);

const entertainmentChck = ['Movie Room', 'Music System', 'Events','Pub','Photo Session', 'Night Club','Beach Club'];
const [entertainment, setEntertainment] = useState([]);
const [countEntertainment, setCountEntertainment] = useState(0);

const paymentChck = ['ATM', 'Currency Exchange'];
const [payment, setPayment] = useState([]);
const [countPayment, setCountPayment] = useState(0);

const indoorActivityChck = ['Casino', 'Indoor Games'];
const [indoorActivity, setIndoorActivity] = useState([]);
const [countIndoorActivity, setCountIndoorActivity] = useState(0);

const petEssenChck = ['Pet Bowls', 'Pet Baskets'];
const [petEssen, setPetEssen] = useState([]);
const [countPetEssen, setCountPetEssen] = useState(0);


const handleCheck = (event, type) => {
 console.log(type);
  switch(type) {
    case 'Basic' : 
            let updatedListBasic = [...checkedBasic];
            if (event.target.checked) {
              updatedListBasic = [...checkedBasic, event.target.value];
            } else {
              updatedListBasic.splice(checkedBasic.indexOf(event.target.value), 1);
            }
            setCountBasic(updatedListBasic.length);
            setCheckedBasic(updatedListBasic);
            break;
    case 'General' : 
            let updatedListGeneral = [...checkedGeneral];
            if (event.target.checked) {
              updatedListGeneral = [...checkedGeneral, event.target.value];
            } else {
              updatedListGeneral.splice(checkedGeneral.indexOf(event.target.value), 1);
            }
            setCountGeneral(updatedListGeneral.length);
            setCheckedGeneral(updatedListGeneral);
            break;
    case 'ActSpt':
            let updatedListActSpt = [...checkedActiSprt];
            if (event.target.checked) {
              updatedListActSpt = [...checkedActiSprt, event.target.value];
            } else {
              updatedListActSpt.splice(checkedActiSprt.indexOf(event.target.value), 1);
            }
            setCheckedActiSprt(updatedListActSpt);
            setCountActiSprt(updatedListActSpt.length);
            break;
    case 'CmnArea':
            let updatedListCmnArea = [...checkedCommonArea];
            if (event.target.checked) {
              updatedListCmnArea = [...checkedCommonArea, event.target.value];
            } else {
              updatedListCmnArea.splice(checkedCommonArea.indexOf(event.target.value), 1);
            }
            setCheckedCommonArea(updatedListCmnArea);
            setCountCommonArea(updatedListCmnArea.length);
            break;
    case 'FoodDining' : 
            let updatedListFoodDining = [...foodDining];
            if (event.target.checked) {
              updatedListFoodDining = [...foodDining, event.target.value];
            } else {
              updatedListFoodDining.splice(foodDining.indexOf(event.target.value), 1);
            }
            setCountFoodDining(updatedListFoodDining.length);
            setFoodDining(updatedListFoodDining);
            break;
    case 'HealthWellness' : 
            let updatedListHealthWellness = [...healthWellness];
            if (event.target.checked) {
              updatedListHealthWellness = [...healthWellness, event.target.value];
            } else {
              updatedListHealthWellness.splice(healthWellness.indexOf(event.target.value), 1);
            }
            console.log(updatedListHealthWellness);
            setCountHealthWellness(updatedListHealthWellness.length);
            setHealthWellness(updatedListHealthWellness);
            break;
    case 'BusinessConf' : 
            let updatedListbusinessConf = [...businessConf];
            if (event.target.checked) {
              updatedListbusinessConf = [...businessConf, event.target.value];
            } else {
              updatedListbusinessConf.splice(businessConf.indexOf(event.target.value), 1);
            }
            setCountbusinessConf(updatedListbusinessConf.length);
            setbusinessConf(updatedListbusinessConf);
            break;
    case 'BeautySpa' : 
            let updatedListBeautySpa = [...beautySpa];
            if (event.target.checked) {
              updatedListBeautySpa = [...beautySpa, event.target.value];
            } else {
              updatedListBeautySpa.splice(beautySpa.indexOf(event.target.value), 1);
            }
            setCountBeautySpa(updatedListBeautySpa.length);
            setBeautySpa(updatedListBeautySpa);
            break;
    case 'Security' : 
            let updatedListSecurity = [...security];
            if (event.target.checked) {
              updatedListSecurity = [...security, event.target.value];
            } else {
              updatedListSecurity.splice(security.indexOf(event.target.value), 1);
            }
            setCountSecurity(updatedListSecurity.length);
            setSecurity(updatedListSecurity);
            break;
    case 'Transfer' : 
            let updatedListTransfer = [...transfer];
            if (event.target.checked) {
              updatedListTransfer = [...transfer, event.target.value];
            } else {
              updatedListTransfer.splice(transfer.indexOf(event.target.value), 1);
            }
            setCountTransfer(updatedListTransfer.length);
            setTransfer(updatedListTransfer);
            break;
    case 'Shopping' : 
            let updatedListShopping = [...shopping];
            if (event.target.checked) {
              updatedListShopping = [...shopping, event.target.value];
            } else {
              updatedListShopping.splice(shopping.indexOf(event.target.value), 1);
            }
            setCountShopping(updatedListShopping.length);
            setShopping(updatedListShopping);
            break;
    case 'Entertainment' : 
            let updatedListEntertainment = [...entertainment];
            if (event.target.checked) {
              updatedListEntertainment = [...entertainment, event.target.value];
            } else {
              updatedListEntertainment.splice(entertainment.indexOf(event.target.value), 1);
            }
            setCountEntertainment(updatedListEntertainment.length);
            setEntertainment(updatedListEntertainment);
            break;
    case 'Payment' : 
            let updatedListPayment = [...payment];
            if (event.target.checked) {
              updatedListPayment = [...payment, event.target.value];
            } else {
              updatedListPayment.splice(payment.indexOf(event.target.value), 1);
            }
            setCountPayment(updatedListPayment.length);
            setPayment(updatedListPayment);
            break;
    case 'IndoorActivity' : 
            let updatedListindoorActivity = [...indoorActivity];
            if (event.target.checked) {
              updatedListindoorActivity = [...indoorActivity, event.target.value];
            } else {
              updatedListindoorActivity.splice(indoorActivity.indexOf(event.target.value), 1);
            }
            setCountIndoorActivity(updatedListindoorActivity.length);
            setIndoorActivity(updatedListindoorActivity);
            break;
    case 'PetEssen' : 
            let updatedListPetEssen = [...petEssen];
            if (event.target.checked) {
              updatedListPetEssen = [...petEssen, event.target.value];
            } else {
              updatedListPetEssen.splice(petEssen.indexOf(event.target.value), 1);
            }
            setCountPetEssen(updatedListPetEssen.length);
            setPetEssen(updatedListPetEssen);
            break;
  }
  
};


//console.log({checked});

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Add Room</h2>
      </div>
      <form className="validate-form" onSubmit={onSubmit}>
        <div className="grid grid-cols-12 gap-6 mt-5">
          <div className="col-span-12 intro-y lg:col-span-6">
            {/* BEGIN: Input */}
            <PreviewComponent className="intro-y box">
              
                <>
                  <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                    <h2 className="mr-auto text-base font-medium">Room Info</h2>
                    
                  </div>
                  <div className="p-5">
                    <Preview>
                      <div>
                        <FormLabel htmlFor="regular-form-1">Room Name</FormLabel>
                        <FormInput
                          {...register("hRoomName")}
                          id="hRoomName"
                          type="text"
                          placeholder="Room Name"
                        />
                      </div>
                      <div className="mt-3">
                        <FormLabel htmlFor="regular-form-1">Room Size</FormLabel>
                        <FormInput
                          {...register("hRoomSize")}
                          id="hRoomSize"
                          type="text"
                          placeholder="Room Size"
                        />
                      </div>
                      <div className="mt-3">
                        <FormLabel htmlFor="regular-form-2">Room Type</FormLabel>
                        <div className="grid-cols-2 gap-2 sm:grid">
                          <FormSelect
                            {...register("roomType")}
                            id="roomType"
                            onChange={(e)=>sethotelRoomType(e.target.value)}

                          >
                            <option value="Standard">Standard</option>
                            <option value="Deluxe">Deluxe</option>
                            <option value="Premium">Premium</option>
                            <option value="Executive">Executive</option>
                            <option value="Studio">Studio</option>
                            <option value="Tent">Tent</option>
                            <option value="Master Room">Master Room</option>
                            <option value="Luxury Room">Luxury Room</option>
                            <option value="Common Room">Common Room</option>
                            <option value="Family Room">Family Room</option>
                            <option value="Water Villa">Water Villa</option>
                            <option value="Beach Villa">Beach Villa</option>
                            <option value="Suite">Suite</option>
                            <option value="Honeymoon Suite">Honeymoon Suite</option>
                            <option value="Presidential Suite">Presidential Suite</option>
                          </FormSelect>
                        </div>
                        
                      </div>
                      <div className="mt-3">
                        <FormLabel htmlFor="regular-form-2">Room View</FormLabel>
                        <div className="grid-cols-2 gap-2 sm:grid">
                          <FormSelect
                            {...register("roomView")}
                            id="roomView"
                            onChange={(e)=>setRoomView(e.target.value)}

                          >
                            <option value="No View">No View</option>
                            <option value="Sea View">Sea View</option>
                            <option value="Mountain View">Mountain view</option>
                            <option value="Valley View">Valley view</option>
                            <option value="Garden View">Garden view</option>
                            <option value="River View">River View</option>
                            <option value="Lake View">Lake View</option>
                            <option value="Pool View">Pool view</option>
                            <option value="Forest View">Forest view</option>
                            <option value="City View">City View</option>
                            <option value="Resort View">Resort View</option>
                            <option value="Beach View">Beach View</option>
                          </FormSelect>
                        </div>
                        
                      </div>
                      <div className="mt-3">
                        <FormLabel htmlFor="regular-form-2">Floor</FormLabel>
                        <div className="grid-cols-2 gap-2 sm:grid">
                          <FormSelect
                             {...register("hRoomFloor")}
                             id="hRoomFloor"
                             onChange={(e)=>sethRoomFloor(e.target.value)}
                          >
                            <option value="Ground">Ground</option>
                            <option value="1st">1st</option>
                            <option value="2nd">2nd</option>
                            <option value="3rd">3rd</option>
                            <option value="4th">4th</option>
                            <option value="5th">5th</option>
                            <option value="6th">6th</option>
                            <option value="7th">7th</option>
                            <option value="8th">8th</option>
                          </FormSelect>
                        </div>
                        
                      </div>
                      <div className="mt-3">
                        <FormLabel htmlFor="regular-form-3">Bed Type</FormLabel>
                        <div className="flex-1 w-full mt-3 xl:mt-0">
                      <div className="grid-cols-4 gap-2 sm:grid">
                        <FormSelect
                          {...register("hRoomBedType")}
                          id="hRoomBedType"
                          onChange={(e)=>sethRoomBedType(e.target.value)}
                        >
                          <option value="Twin Bed">Twin Bed</option>
                          <option value="King Bed">King Bed</option>
                          <option value="Queen Bed">Queen Bed</option>
                          <option value="Double Bed">Double Bed</option>
                          <option value="Single Bed">Single Bed</option>
                          <option value="Sofa Bed">Sofa Bed</option>
                          <option value="Standard Bed">Standard Bed</option>
                          <option value="Single Bed">Single Bed</option>
                          <option value="1 King Bed or 2 Twin Bed(s)">1 King Bed or 2 Twin Bed(s)</option>
                          <option value="1 Queen Bed or 2 Twin Bed(s)">1 Queen Bed or 2 Twin Bed(s)</option>
                          <option value="1 Double Bed or 2 Twin Bed(s)">1 Double Bed or 2 Twin Bed(s)</option>
                          <option value="Bunk Bed">Bunk Bed</option>
                          <option value="Futon">Futon</option>
                          <option value="Murphy">Murphy</option>
                          <option value="Tatami Mats">Tatami Mats</option>
                        </FormSelect>
                        <FormInput
                          {...register("hRoomNoBed")}
                          type="text"
                          id="hRoomNoBed"
                          className="mt-2 sm:mt-0"
                          placeholder="No of Bed"
                          defaultValue="1"
                        />
                      </div>
                      
                    </div>
                      </div>
                      <div className="mt-3">
                        <FormLabel htmlFor="regular-form-3">Max Occupancy</FormLabel>
                        <div className="flex-1 w-full mt-3 xl:mt-0">
                      <div className="grid-cols-4 gap-2 sm:grid">
                        <FormInput
                          {...register("hRoomMaxOccuAdult")}
                          type="text"
                          id="hRoomMaxOccuAdult"
                          className="mt-2 sm:mt-0"
                          placeholder="Adult"
                        />
                        <FormInput
                          {...register("hRoomMaxOccuChild")}
                          type="text"
                          id="hRoomMaxOccuChild"
                          className="mt-2 sm:mt-0"
                          placeholder="Children"
                        />
                        <FormInput
                          {...register("hRoomMaxOccuChildAdult")}
                          type="text"
                          id="hRoomMaxOccuChildAdult"
                          className="mt-2 sm:mt-0"
                          placeholder="Adult + Children"
                        />
                      </div>
                      
                    </div>
                      </div>
                      <div className="mt-3">
                        <FormLabel htmlFor="regular-form-1">Description</FormLabel>
                        <FormTextarea
                          {...register("hRoomDesc")}
                          id="hRoomDesc"
                        ></FormTextarea>
                      </div>
                      <div className="mt-3">
                        <FormLabel htmlFor="regular-form-2">Status</FormLabel>
                        <div className="grid-cols-2 gap-2 sm:grid">
                        <FormSelect 
                          {...register("isActive")}
                          name="isActive"
                          className="mt-2 sm:mr-2" 
                          aria-label="Default select example"
                          onChange={(e)=>setisActive(e.target.value)}
                          
                         >
                                <option value="Y">Active</option>
                                <option value="N">Inactive</option>
                        </FormSelect>
                        </div>
                        
                      </div>
                      <Button variant="primary" type="submit" className="mt-5 w-24 mr-1">
                        Save
                      </Button>
                      <Link to={`/view-vendor-hotel/${params.id}`}>
                        <Button variant="secondary" type="button" className="mt-5 w-24 mr-1">
                          Cancel
                        </Button>
                      </Link>
                    </Preview>
                    
                  </div>
                </>
            </PreviewComponent>
            {/* END: Input */}
            
          </div>
          <div className="col-span-12 intro-y lg:col-span-6">
            {/* BEGIN: Vertical Form */}
            <PreviewComponent className="intro-y box">
              
                <>
                <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                    <h2 className="mr-auto text-base font-medium">
                    All Amenities
                    </h2>
                    
                  </div>
                  <div className="p-5">
                  <Preview>
                  <div id="accordionExample">
        <div className="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
          <h2 className="mb-0" id="headingOne">
            <button
              className={`${
                activeElement === "element1" &&
                `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
              } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
              type="button"
              onClick={() => handleClick("element1")}
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Basic Facilities ({countBasic})
              <span
                className={`${
                  activeElement === "element1"
                    ? `rotate-[-180deg] -mr-1`
                    : `rotate-0 fill-[#212529]  dark:fill-white`
                } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </button>
          </h2>
          <TECollapse
            show={activeElement === "element1"}
            className="!mt-0 !rounded-b-none !shadow-none"
          >
            <div className="px-5 py-4">
              
                    { basicFacilityChck.map((value, i)=>{
                      return <>
                      <div className="grid-cols-3 gap-6 sm:grid h-[3rem]">
                          <FormCheck className="mt-2 mr-2 sm:mt-0">
                            <FormCheck.Input id={`checkbox-switch-${i}`} type="checkbox" value={value} onChange={(e)=>handleCheck(e,'Basic')}  />
                            <FormCheck.Label htmlFor={`checkbox-switch-${i}`}>
                                {value}
                            </FormCheck.Label>
                          </FormCheck>
                          { _.replace(_.lowerCase(value), " ", "_")==='aircondition'?
                          <>
                            <FormSelect
                                {...register("aircondition")}
                                id="aircondition"
                                //value={hotelRoomType}
                                //onChange={(e) => sethotelRoomType(e.target.value)} 
                                >
                                <option value="Room Control">Room Control</option>
                                <option value="Centralized">Centralized</option>
                            </FormSelect>
                          </>
                          :''}
                          { _.replace(_.lowerCase(value), " ", "_")==='ironing_service'?
                          <>
                            <FormSelect
                                {...register("ironing_service")}
                                id="ironing_service"
                                //value={hotelRoomType}
                                //onChange={(e) => sethotelRoomType(e.target.value)} 
                                >
                                <option value="Free">Free</option>
                                <option value="Paid">Paid</option>
                            </FormSelect>
                            <FormSelect
                                {...register("ironing_service_1")}
                                id="roomType"
                                //value={hotelRoomType}
                                //onChange={(e) => sethotelRoomType(e.target.value)} 
                                >
                                <option value="Limited Pieces">Limited Pieces</option>
                                <option value="Unlimited">Unlimited</option>
                            </FormSelect>
                          </>
                          :''}
                          { _.replace(_.lowerCase(value), " ", "_")==='kitchen_kitchenette'?
                            <>
                              <FormSelect
                                {...register("ironing_service")}
                                id="ironing_service"
                                className="h-10"
                                //value={hotelRoomType}
                                //onChange={(e) => sethotelRoomType(e.target.value)} 
                                >
                                <option value="Free">Free</option>
                                <option value="Paid">Paid</option>
                            </FormSelect>
                            </>
                          :'' }
                          { _.replace(_.lowerCase(value), " ", "_")==='lan'?
                            <>
                              <FormSelect
                                {...register("ironing_service")}
                                id="ironing_service"
                                className="h-10"
                                //value={hotelRoomType}
                                //onChange={(e) => sethotelRoomType(e.target.value)} 
                                >
                                <option value="Free">Free</option>
                                <option value="Paid">Paid</option>
                            </FormSelect>
                            </>
                          :'' }
                          { _.replace(_.lowerCase(value), " ", "_")==='laundry'?
                          <>
                            <FormSelect
                                {...register("laundry")}
                                id="laundry"
                                //value={hotelRoomType}
                                //onChange={(e) => sethotelRoomType(e.target.value)} 
                                >
                                <option value="Free">Free</option>
                                <option value="Paid">Paid</option>
                            </FormSelect>
                            <FormSelect
                                {...register("laundry_1")}
                                id="roomType"
                                //value={hotelRoomType}
                                //onChange={(e) => sethotelRoomType(e.target.value)} 
                                >
                                <option value="Limited Pieces">Limited Pieces</option>
                                <option value="Unlimited">Unlimited</option>
                            </FormSelect>
                          </>
                          :''}
                          { _.replace(_.lowerCase(value), " ", "_")==='newspaper'?
                          <>
                            <FormSelect
                                {...register("laundry")}
                                id="laundry"
                                //value={hotelRoomType}
                                //onChange={(e) => sethotelRoomType(e.target.value)} 
                                >
                                <option value="English">English</option>
                                <option value="Local Language">Local Language</option>
                            </FormSelect>
                          </>
                          :''}
                          { _.replace(_.lowerCase(value), " ", "_")==='parking'?
                          <>
                            <FormSelect
                                {...register("parking")}
                                id="parking"
                                //value={hotelRoomType}
                                //onChange={(e) => sethotelRoomType(e.target.value)} 
                                >
                                <option value="Free">Free</option>
                                <option value="Paid">Paid</option>
                            </FormSelect>
                            <FormSelect
                                {...register("parking_1")}
                                id="roomType"
                                //value={hotelRoomType}
                                //onChange={(e) => sethotelRoomType(e.target.value)} 
                                >
                                <option value="Property Area">Property Area</option>
                                <option value="Public">Public</option>
                            </FormSelect>
                          </>
                          :''}
                          { _.replace(_.lowerCase(value), " ", "_")==='power_backup'?
                          <>
                            <FormSelect
                                {...register("power_backup")}
                                id="power_backup"
                                //value={hotelRoomType}
                                //onChange={(e) => sethotelRoomType(e.target.value)} 
                                >
                                <option value="Generator">Generator</option>
                                <option value="Inverter">Inverter</option>
                            </FormSelect>
                          </>
                          :''}
                         { _.replace(_.lowerCase(value), " ", "_")==='room_service'?
                          <>
                            <FormSelect
                                {...register("room_service")}
                                id="room_service"
                                //value={hotelRoomType}
                                //onChange={(e) => sethotelRoomType(e.target.value)} 
                                >
                                <option value="24 X 7">24 X 7</option>
                                <option value="Limited Duration">Limited Duration</option>
                            </FormSelect>
                          </>
                          :''}
                          { _.replace(_.lowerCase(value), " ", "_")==='smoking_rooms'?
                          <>
                            <FormSelect
                                {...register("room_service")}
                                id="room_service"
                                //value={hotelRoomType}
                                //onChange={(e) => sethotelRoomType(e.target.value)} 
                                >
                                <option value="At Room">At Room</option>
                                <option value="Lobby">Lobby</option>
                            </FormSelect>
                          </>
                          :''}
                          { _.replace(_.lowerCase(value), " ", "_")==='swimming_pool'?
                          <>
                            <FormSelect
                                {...register("room_service")}
                                id="room_service"
                                //value={hotelRoomType}
                                //onChange={(e) => sethotelRoomType(e.target.value)} 
                                >
                                <option value="Common">Common</option>
                                <option value="Indoor">Indoor</option>
                                <option value="Kids Only">Kids Only</option>
                                <option value="Indoor">Indoor</option>
                                <option value="Infynity">Infynity</option>
                                <option value="Rooftop">Rooftop</option>
                                <option value="Family">Family</option>
                                <option value="Pool with View">Pool with View</option>
                                <option value="Women Only">Women Only</option>
                            </FormSelect>
                          </>
                          :''}
                          { _.replace(_.lowerCase(value), " ", "_")==='wifi'?
                          <>
                            <FormSelect
                                {...register("parking")}
                                id="parking"
                                //value={hotelRoomType}
                                //onChange={(e) => sethotelRoomType(e.target.value)} 
                                >
                                <option value="Free">Free</option>
                                <option value="Paid">Paid</option>
                                
                            </FormSelect>
                            <FormSelect
                                {...register("room_service")}
                                id="room_service"
                                //value={hotelRoomType}
                                //onChange={(e) => sethotelRoomType(e.target.value)} 
                                >
                                <option value="At Room">At Room</option>
                                <option value="Lobby">At Lobby</option>
                                <option value="Lobby">Suitable for Work</option>
                            </FormSelect>
                          </>
                          :''}
                          
                      </div>
                    </>
                    })}
              
            </div>
          </TECollapse>
        </div>
                  </div>
                  <div className="border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                    <h2 className="mb-0" id="headingTwo">
                      <button
                        className={`${
                          activeElement === "element2"
                            ? `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                            : `transition-none rounded-b-[15px]`
                        } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                        type="button"
                        onClick={() => handleClick("element2")}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        General Services ({countGeneral})
                        <span
                          className={`${
                            activeElement === "element2"
                              ? `rotate-[-180deg] -mr-1`
                              : `rotate-0 fill-[#212529] dark:fill-white`
                          } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </span>
                      </button>
                    </h2>
                    <TECollapse
                      show={activeElement === "element2"}
                      className="!mt-0 !rounded-b-none !shadow-none"
                    >
                      <div className="px-5 py-4">
                          
                                  { generalServiceChck.map((value, i)=>{
                                    return <>
                                      <div className="grid-cols-3 gap-6 sm:grid h-[3rem]">
                                      <FormCheck className="mt-2 mr-2 sm:mt-0">
                                        <FormCheck.Input id={`checkbox-switch1-${i}`} type="checkbox" value={value} onChange={(e)=>handleCheck(e,'General')} />
                                        <FormCheck.Label htmlFor={`checkbox-switch1-${i}`}>
                                          {value}
                                        </FormCheck.Label>
                                      </FormCheck>
                                      { _.replace(_.lowerCase(value), " ", "_")==='multilingual_staff'?
                                          <>
                                            <FormSelect
                                              {...register("multilingual_staff")}
                                              id="ironing_service"
                                              className="h-10"
                                              //value={hotelRoomType}
                                              //onChange={(e) => sethotelRoomType(e.target.value)} 
                                              >
                                              <option value="English">English</option>
                                              <option value="Hindi">Hindi</option>
                                              <option value="Bengali">Bengali</option>
                                              <option value="Telegu">Telegu</option>
                                              <option value="Tamil">Tamil</option>
                                              <option value="Marathi">Marathi</option>
                                              <option value="Gujrati">Gujrati</option>
                                              <option value="Odia">Odia</option>
                                              <option value="Punjabi">Punjabi</option>
                                              <option value="Urdu">Urdu</option>
                                          </FormSelect>
                                          </>
                                      :'' }
                                      { _.replace(_.lowerCase(value), " ", "_")==='specially_able assistance'?
                                          <>
                                            <FormSelect
                                              {...register("multilingual_staff")}
                                              id="ironing_service"
                                              className="h-10"
                                              //value={hotelRoomType}
                                              //onChange={(e) => sethotelRoomType(e.target.value)} 
                                              >
                                              <option value="Guide">Guide</option>
                                              <option value="Trainer">Trainer</option>
                                          </FormSelect>
                                          </>
                                      :'' }
                                      { _.replace(_.lowerCase(value), " ", "_")==='wheelchair'?
                                          <>
                                            <FormSelect
                                              {...register("multilingual_staff")}
                                              id="ironing_service"
                                              className="h-10"
                                              //value={hotelRoomType}
                                              //onChange={(e) => sethotelRoomType(e.target.value)} 
                                              >
                                              <option value="Free">Free</option>
                                              <option value="Paid">Paid</option>
                                          </FormSelect>
                                          </>
                                      :'' }
                                      { _.replace(_.lowerCase(value), " ", "_")==='butler_services'?
                                          <>
                                            <FormSelect
                                              {...register("multilingual_staff")}
                                              id="ironing_service"
                                              className="h-10"
                                              //value={hotelRoomType}
                                              //onChange={(e) => sethotelRoomType(e.target.value)} 
                                              >
                                              <option value="Free">Free</option>
                                              <option value="Paid">Paid</option>
                                          </FormSelect>
                                          </>
                                      :'' }
                                      { _.replace(_.lowerCase(value), " ", "_")==='pool_beach towels'?
                                          <>
                                            <FormSelect
                                              {...register("multilingual_staff")}
                                              id="ironing_service"
                                              className="h-10"
                                              //value={hotelRoomType}
                                              //onChange={(e) => sethotelRoomType(e.target.value)} 
                                              >
                                              <option value="Free">Free</option>
                                              <option value="Paid">Paid</option>
                                          </FormSelect>
                                          </>
                                      :'' }
                                      </div>
                                    </>
                                    
                                  })}
                          
                      </div>
                    </TECollapse>
                  </div>
                  <div className="rounded-b-lg border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                    <h2 className="accordion-header mb-0" id="headingThree">
                      <button
                        className={`${
                          activeElement === "element3"
                            ? `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                            : `transition-none rounded-b-[15px]`
                        } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                        type="button"
                        onClick={() => handleClick("element3")}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Out Door Activities and Sports ({countActiSprt})
                        <span
                          className={`${
                            activeElement === "element3"
                              ? `rotate-[-180deg] -mr-1`
                              : `rotate-0 fill-[#212529] dark:fill-white`
                          } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </span>
                      </button>
                    </h2>
                    <TECollapse
                      show={activeElement === "element3"}
                      className="!mt-0 !shadow-none"
                    >
                      <div className="px-5 py-4">
                          
                                  { activitiesSportsChck.map((value, i)=>{
                                    return <>
                                    <div className="grid-cols-3 gap-6 sm:grid h-[3rem]">
                                    <FormCheck className="mt-2 mr-2 sm:mt-0">
                                      <FormCheck.Input id={`checkbox-switch1-${i}`} type="checkbox" value={value} onChange={(e)=>handleCheck(e,'ActSpt')} />
                                      <FormCheck.Label htmlFor={`checkbox-switch1-${i}`}>
                                          {value}
                                      </FormCheck.Label>
                                    </FormCheck>
                                    { _.replace(_.lowerCase(value), " ", "_")==='beach'?
                                          <>
                                            <FormSelect
                                              {...register("beach")}
                                              id="ironing_service"
                                              className="h-10"
                                              //value={hotelRoomType}
                                              //onChange={(e) => sethotelRoomType(e.target.value)} 
                                              >
                                              <option value="Personal">Personal</option>
                                              <option value="Beach Front">Beach Front</option>
                                          </FormSelect>
                                          </>
                                      :'' }
                                      { _.replace(_.lowerCase(value), " ", "_")==='bonfire'?
                                          <>
                                            <FormSelect
                                              {...register("bonfire")}
                                              id="ironing_service"
                                              className="h-10"
                                              //value={hotelRoomType}
                                              //onChange={(e) => sethotelRoomType(e.target.value)} 
                                              >
                                              <option value="Free">Free</option>
                                              <option value="Paid">Paid</option>
                                              <option value="On Request">On Request</option>
                                          </FormSelect>
                                          </>
                                      :'' }
                                      { _.replace(_.lowerCase(value), " ", "_")==='outdoor_sports'?
                                          <>
                                            <FormSelect
                                              {...register("bonfire")}
                                              id="ironing_service"
                                              className="h-10"
                                              //value={hotelRoomType}
                                              //onChange={(e) => sethotelRoomType(e.target.value)} 
                                              >
                                              <option value="Football">Football</option>
                                              <option value="Cricket">Cricket</option>
                                              <option value="Badminton">Badminton</option>
                                              <option value="Basketball">Basketball</option>
                                              <option value="Volleyball">Volleyball</option>
                                          </FormSelect>
                                          </>
                                      :'' }
                                      { _.replace(_.lowerCase(value), " ", "_")==='snorkelling'?
                                          <>
                                            <FormSelect
                                              {...register("bonfire")}
                                              id="ironing_service"
                                              className="h-10"
                                              //value={hotelRoomType}
                                              //onChange={(e) => sethotelRoomType(e.target.value)} 
                                              >
                                              <option value="Free">Free</option>
                                              <option value="Paid">Paid</option>
                                          </FormSelect>
                                          </>
                                      :'' }
                                      { _.replace(_.lowerCase(value), " ", "_")==='water_sports'?
                                          <>
                                            <FormSelect
                                              {...register("water_sports")}
                                              id="ironing_service"
                                              className="h-10"
                                              //value={hotelRoomType}
                                              //onChange={(e) => sethotelRoomType(e.target.value)} 
                                              >
                                              <option value="Boating">Boating</option>
                                              <option value="Rafting">Rafting</option>
                                              <option value="Rowing">Rowing</option>
                                              <option value="Water Skiing">Water Skiing</option>
                                              <option value="Fishing">Fishing</option>
                                          </FormSelect>
                                          </>
                                      :'' }
                                      { _.replace(_.lowerCase(value), " ", "_")==='canoeing'?
                                          <>
                                            <FormSelect
                                              {...register("bonfire")}
                                              id="ironing_service"
                                              className="h-10"
                                              //value={hotelRoomType}
                                              //onChange={(e) => sethotelRoomType(e.target.value)} 
                                              >
                                              <option value="Free">Free</option>
                                              <option value="Paid">Paid</option>
                                          </FormSelect>
                                          </>
                                      :'' }
                                      { _.replace(_.lowerCase(value), " ", "_")==='jungle_suferi'?
                                          <>
                                            <FormSelect
                                              {...register("jungle_suferi")}
                                              id="ironing_service"
                                              className="h-10"
                                              //value={hotelRoomType}
                                              //onChange={(e) => sethotelRoomType(e.target.value)} 
                                              >
                                              <option value="Free">Free</option>
                                              <option value="Paid">Paid</option>
                                          </FormSelect>
                                          </>
                                      :'' }

                                    </div>
                                    </>
                                    
                                  })}
                          
                      </div>
                    </TECollapse>
                  </div>
                  <div className="rounded-b-lg border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                    <h2 className="accordion-header mb-0" id="headingThree">
                      <button
                        className={`${
                          activeElement === "element4"
                            ? `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                            : `transition-none rounded-b-[15px]`
                        } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                        type="button"
                        onClick={() => handleClick("element4")}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Common Area ({countCommonArea})
                        <span
                          className={`${
                            activeElement === "element4"
                              ? `rotate-[-180deg] -mr-1`
                              : `rotate-0 fill-[#212529] dark:fill-white`
                          } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </span>
                      </button>
                    </h2>
                    <TECollapse
                      show={activeElement === "element4"}
                      className="!mt-0 !shadow-none"
                    >
                      <div className="px-5 py-4">
                            
                                  { commonAreaChck.map((value, i)=>{
                                    return <>
                                      <div className="grid-cols-3 gap-6 sm:grid h-[3rem]">
                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                          <FormCheck.Input id={`checkbox-switch1-${i}`} type="checkbox" value={value} onChange={(e)=>handleCheck(e,'CmnArea')} />
                                          <FormCheck.Label htmlFor={`checkbox-switch1-${i}`}>
                                              {value}
                                          </FormCheck.Label>
                                        </FormCheck>
                                        { _.replace(_.lowerCase(value), " ", "_")==='fireplace'?
                                          <>
                                            <FormSelect
                                              {...register("beach")}
                                              id="ironing_service"
                                              className="h-10"
                                              //value={hotelRoomType}
                                              //onChange={(e) => sethotelRoomType(e.target.value)} 
                                              >
                                              <option value="Indoor">Indoor</option>
                                              <option value="Out Door">Out Door</option>
                                              <option value="Common Area">Common Area</option>
                                          </FormSelect>
                                          </>
                                      :'' }
                                      { _.replace(_.lowerCase(value), " ", "_")==='lounge'?
                                          <>
                                            <FormSelect
                                              {...register("beach")}
                                              id="ironing_service"
                                              className="h-10"
                                              //value={hotelRoomType}
                                              //onChange={(e) => sethotelRoomType(e.target.value)} 
                                              >
                                              <option value="Public">Public</option>
                                              <option value="Private">Private</option>
                                          </FormSelect>
                                          </>
                                      :'' }
                                      { _.replace(_.lowerCase(value), " ", "_")==='jacuzzi'?
                                          <>
                                            <FormSelect
                                              {...register("beach")}
                                              id="ironing_service"
                                              className="h-10"
                                              //value={hotelRoomType}
                                              //onChange={(e) => sethotelRoomType(e.target.value)} 
                                              >
                                              <option value="Public">Couple</option>
                                              <option value="Private">Only for Women</option>
                                          </FormSelect>
                                          </>
                                      :'' }
                                      { _.replace(_.lowerCase(value), " ", "_")==='sitout_area'?
                                          <>
                                            <FormSelect
                                              {...register("beach")}
                                              id="ironing_service"
                                              className="h-10"
                                              //value={hotelRoomType}
                                              //onChange={(e) => sethotelRoomType(e.target.value)} 
                                              >
                                              <option value="Pool Site">Pool Site</option>
                                              <option value="Balcony">Balcony</option>
                                              <option value="Varanda">Varanda</option>
                                              <option value="On the Lawn">On the Lawn</option>
                                          </FormSelect>
                                          </>
                                      :'' }
                                      </div>
                                    </>
                                    
                                  })}
                          
                      </div>
                    </TECollapse>
                  </div>
                  <div className="rounded-b-lg border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                    <h2 className="accordion-header mb-0" id="headingThree">
                      <button
                        className={`${
                          activeElement === "element5"
                            ? `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                            : `transition-none rounded-b-[15px]`
                        } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                        type="button"
                        onClick={() => handleClick("element5")}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Food and Drink ({countFoodDining})
                        <span
                          className={`${
                            activeElement === "element5"
                              ? `rotate-[-180deg] -mr-1`
                              : `rotate-0 fill-[#212529] dark:fill-white`
                          } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </span>
                      </button>
                    </h2>
                    <TECollapse
                      show={activeElement === "element5"}
                      className="!mt-0 !shadow-none"
                    >
                      <div className="px-5 py-4">
                            
                                  { foodDiningChck.map((value, i)=>{
                                    return <>
                                      <div className="grid-cols-3 gap-6 sm:grid h-[3rem]">
                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                          <FormCheck.Input id={`checkbox-switch1-${i}`} type="checkbox" value={value} onChange={(e)=>handleCheck(e,'FoodDining')} />
                                          <FormCheck.Label htmlFor={`checkbox-switch1-${i}`}>
                                              {value}
                                          </FormCheck.Label>
                                        </FormCheck>
                                        { _.replace(_.lowerCase(value), " ", "_")==='barbeque'?
                                          <>
                                            <FormSelect
                                              {...register("barbeque")}
                                              id="barbeque"
                                              className="h-10"
                                              //value={hotelRoomType}
                                              //onChange={(e) => sethotelRoomType(e.target.value)} 
                                              >
                                              <option value="Free">Free</option>
                                              <option value="Paid">Paid</option>
                                          </FormSelect>
                                          </>
                                      :'' }
                                      { _.replace(_.lowerCase(value), " ", "_")==='cafe'?
                                          <>
                                            <FormSelect
                                              {...register("cafe")}
                                              id="cafe"
                                              className="h-10"
                                              //value={hotelRoomType}
                                              //onChange={(e) => sethotelRoomType(e.target.value)} 
                                              >
                                              <option value="24 X 7">24 X 7</option>
                                              <option value="Limited Hour">Limited Hour</option>
                                          </FormSelect>
                                          </>
                                      :'' }
                                      { _.replace(_.lowerCase(value), " ", "_")==='coffee_shop'?
                                          <>
                                            <FormSelect
                                              {...register("coffee_shop")}
                                              id="coffee_shop"
                                              className="h-10"
                                              //value={hotelRoomType}
                                              //onChange={(e) => sethotelRoomType(e.target.value)} 
                                              >
                                              <option value="24 X 7">24 X 7</option>
                                              <option value="Limited Hour">Limited Hour</option>
                                          </FormSelect>
                                          </>
                                      :'' }
                                      </div>
                                    </>
                                    
                                  })}
                          
                      </div>
                    </TECollapse>
                  </div>
                  <div className="rounded-b-lg border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                    <h2 className="accordion-header mb-0" id="headingThree">
                      <button
                        className={`${
                          activeElement === "element6"
                            ? `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                            : `transition-none rounded-b-[15px]`
                        } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                        type="button"
                        onClick={() => handleClick("element6")}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Health and Wellness ({countHealthWellness})
                        <span
                          className={`${
                            activeElement === "element6"
                              ? `rotate-[-180deg] -mr-1`
                              : `rotate-0 fill-[#212529] dark:fill-white`
                          } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </span>
                      </button>
                    </h2>
                    <TECollapse
                      show={activeElement === "element6"}
                      className="!mt-0 !shadow-none"
                    >
                      <div className="px-5 py-4">
                            
                                  { healthWellnessChck.map((value, i)=>{
                                    return <>
                                      <div className="grid-cols-3 gap-6 sm:grid h-[3rem]">
                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                          <FormCheck.Input id={`checkbox-switch1-${i}`} type="checkbox" value={value} onChange={(e)=>handleCheck(e,'HealthWellness')} />
                                          <FormCheck.Label htmlFor={`checkbox-switch1-${i}`}>
                                              {value}
                                          </FormCheck.Label>
                                        </FormCheck>
                                        { _.replace(_.lowerCase(value), " ", "_")==='gym_fitness centre'?
                                          <>
                                            <FormSelect
                                              {...register("gym")}
                                              id="gym"
                                              className="h-10"
                                              //value={hotelRoomType}
                                              //onChange={(e) => sethotelRoomType(e.target.value)} 
                                              >
                                              <option value="24 X 7">24 X 7</option>
                                              <option value="Limited Hour">Limited Hour</option>
                                          </FormSelect>
                                          </>
                                      :'' }
                                      </div>
                                    </>
                                    
                                  })}
                          
                      </div>
                    </TECollapse>
                  </div>
                  <div className="rounded-b-lg border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                    <h2 className="accordion-header mb-0" id="headingThree">
                      <button
                        className={`${
                          activeElement === "element7"
                            ? `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                            : `transition-none rounded-b-[15px]`
                        } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                        type="button"
                        onClick={() => handleClick("element7")}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Business Center and Conferences ({countbusinessConf})
                        <span
                          className={`${
                            activeElement === "element7"
                              ? `rotate-[-180deg] -mr-1`
                              : `rotate-0 fill-[#212529] dark:fill-white`
                          } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </span>
                      </button>
                    </h2>
                    <TECollapse
                      show={activeElement === "element7"}
                      className="!mt-0 !shadow-none"
                    >
                      <div className="px-5 py-4">
                            
                                  { businessConfChck.map((value, i)=>{
                                    return <>
                                      <div className="grid-cols-3 gap-6 sm:grid h-[3rem]">
                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                          <FormCheck.Input id={`checkbox-switch1-${i}`} type="checkbox" value={value} onChange={(e)=>handleCheck(e,'BusinessConf')} />
                                          <FormCheck.Label htmlFor={`checkbox-switch1-${i}`}>
                                              {value}
                                          </FormCheck.Label>
                                        </FormCheck>
                                      </div>
                                    </>
                                    
                                  })}
                          
                      </div>
                    </TECollapse>
                  </div>
                  <div className="rounded-b-lg border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                    <h2 className="accordion-header mb-0" id="headingThree">
                      <button
                        className={`${
                          activeElement === "element8"
                            ? `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                            : `transition-none rounded-b-[15px]`
                        } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                        type="button"
                        onClick={() => handleClick("element8")}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Beauty and Spa ({countBeautySpa})
                        <span
                          className={`${
                            activeElement === "element8"
                              ? `rotate-[-180deg] -mr-1`
                              : `rotate-0 fill-[#212529] dark:fill-white`
                          } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </span>
                      </button>
                    </h2>
                    <TECollapse
                      show={activeElement === "element8"}
                      className="!mt-0 !shadow-none"
                    >
                      <div className="px-5 py-4">
                            
                                  { beautySpaChck.map((value, i)=>{
                                    return <>
                                      <div className="grid-cols-3 gap-6 sm:grid h-[3rem]">
                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                          <FormCheck.Input id={`checkbox-switch1-${i}`} type="checkbox" value={value} onChange={(e)=>handleCheck(e,'BeautySpa')} />
                                          <FormCheck.Label htmlFor={`checkbox-switch1-${i}`}>
                                              {value}
                                          </FormCheck.Label>
                                        </FormCheck>
                                        { _.replace(_.lowerCase(value), " ", "_")==='massage'?
                                          <>
                                            <FormSelect
                                              {...register("massage")}
                                              id="massage"
                                              className="h-10"
                                              //value={hotelRoomType}
                                              //onChange={(e) => sethotelRoomType(e.target.value)} 
                                              >
                                              <option value="24 X 7">Single</option>
                                              <option value="Limited Hour">Couple</option>
                                              <option value="Limited Hour">Foot Massage</option>
                                              <option value="Limited Hour">Body Massage</option>
                                          </FormSelect>
                                          </>
                                      :'' }
                                      { _.replace(_.lowerCase(value), " ", "_")==='salon'?
                                          <>
                                            <FormSelect
                                              {...register("salon")}
                                              id="salon"
                                              className="h-10"
                                              //value={hotelRoomType}
                                              //onChange={(e) => sethotelRoomType(e.target.value)} 
                                              >
                                              <option value="Hair Cut">Hair Cut</option>
                                              <option value="Saving">Saving</option>
                                          </FormSelect>
                                          </>
                                      :'' }
                                      { _.replace(_.lowerCase(value), " ", "_")==='spa'?
                                          <>
                                            <FormSelect
                                              {...register("spa")}
                                              id="spa"
                                              className="h-10"
                                              //value={hotelRoomType}
                                              //onChange={(e) => sethotelRoomType(e.target.value)} 
                                              >
                                              <option value="Free">Free</option>
                                              <option value="Paid">Paid</option>
                                          </FormSelect>
                                          </>
                                      :'' }
                                      { _.replace(_.lowerCase(value), " ", "_")==='steam_and sauna'?
                                          <>
                                            <FormSelect
                                              {...register("steam")}
                                              id="steam"
                                              className="h-10"
                                              //value={hotelRoomType}
                                              //onChange={(e) => sethotelRoomType(e.target.value)} 
                                              >
                                              <option value="Free">Free</option>
                                              <option value="Paid">Paid</option>
                                          </FormSelect>
                                          </>
                                      :'' }
                                      { _.replace(_.lowerCase(value), " ", "_")==='hammam'?
                                          <>
                                            <FormSelect
                                              {...register("hammam")}
                                              id="hammam"
                                              className="h-10"
                                              //value={hotelRoomType}
                                              //onChange={(e) => sethotelRoomType(e.target.value)} 
                                              >
                                              <option value="Women Only">Women Only</option>
                                              <option value="Couple">Couple</option>
                                          </FormSelect>
                                          </>
                                      :'' }
                                      </div>
                                    </>
                                    
                                  })}
                          
                      </div>
                    </TECollapse>
                  </div>
                  <div className="rounded-b-lg border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                    <h2 className="accordion-header mb-0" id="headingThree">
                      <button
                        className={`${
                          activeElement === "element9"
                            ? `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                            : `transition-none rounded-b-[15px]`
                        } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                        type="button"
                        onClick={() => handleClick("element9")}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Security ({countSecurity})
                        <span
                          className={`${
                            activeElement === "element9"
                              ? `rotate-[-180deg] -mr-1`
                              : `rotate-0 fill-[#212529] dark:fill-white`
                          } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </span>
                      </button>
                    </h2>
                    <TECollapse
                      show={activeElement === "element9"}
                      className="!mt-0 !shadow-none"
                    >
                      <div className="px-5 py-4">
                            
                                  { securityChck.map((value, i)=>{
                                    return <>
                                      <div className="grid-cols-3 gap-6 sm:grid h-[3rem]">
                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                          <FormCheck.Input id={`checkbox-switch1-${i}`} type="checkbox" value={value} onChange={(e)=>handleCheck(e,'Security')} />
                                          <FormCheck.Label htmlFor={`checkbox-switch1-${i}`}>
                                              {value}
                                          </FormCheck.Label>
                                        </FormCheck>
                                      </div>
                                    </>
                                    
                                  })}
                          
                      </div>
                    </TECollapse>
                  </div>
                  <div className="rounded-b-lg border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                    <h2 className="accordion-header mb-0" id="headingThree">
                      <button
                        className={`${
                          activeElement === "element10"
                            ? `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                            : `transition-none rounded-b-[15px]`
                        } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                        type="button"
                        onClick={() => handleClick("element10")}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Transfers ({countTransfer})
                        <span
                          className={`${
                            activeElement === "element10"
                              ? `rotate-[-180deg] -mr-1`
                              : `rotate-0 fill-[#212529] dark:fill-white`
                          } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </span>
                      </button>
                    </h2>
                    <TECollapse
                      show={activeElement === "element10"}
                      className="!mt-0 !shadow-none"
                    >
                      <div className="px-5 py-4">
                            
                                  { transferChck.map((value, i)=>{
                                    return <>
                                      <div className="grid-cols-3 gap-6 sm:grid h-[3rem]">
                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                          <FormCheck.Input id={`checkbox-switch1-${i}`} type="checkbox" value={value} onChange={(e)=>handleCheck(e,'Transfer')} />
                                          <FormCheck.Label htmlFor={`checkbox-switch1-${i}`}>
                                              {value}
                                          </FormCheck.Label>
                                        </FormCheck>
                                        { _.replace(_.lowerCase(value), " ", "_")==='airport_transfers'?
                                          <>
                                            <FormSelect
                                              {...register("airport_transfers")}
                                              id="airport_transfers"
                                              className="h-10"
                                              //value={hotelRoomType}
                                              //onChange={(e) => sethotelRoomType(e.target.value)} 
                                              >
                                              <option value="Free">Free</option>
                                              <option value="Paid">Paid</option>
                                          </FormSelect>
                                          <FormSelect
                                              {...register("airport_transfers_1")}
                                              id="airport_transfers_!"
                                              className="h-10"
                                              //value={hotelRoomType}
                                              //onChange={(e) => sethotelRoomType(e.target.value)} 
                                              >
                                              <option value="Private Taxi">Private Taxi</option>
                                              <option value="Share Car">Share Car</option>
                                              <option value="Luxury Car">Luxury Car</option>
                                          </FormSelect>
                                          </>
                                      :'' }
                                      { _.replace(_.lowerCase(value), " ", "_")==='shuttle_transfer'?
                                          <>
                                            <FormSelect
                                              {...register("shuttle_transfer")}
                                              id="shuttle_transfer"
                                              className="h-10"
                                              //value={hotelRoomType}
                                              //onChange={(e) => sethotelRoomType(e.target.value)} 
                                              >
                                              <option value="Free">Free</option>
                                              <option value="Paid">Paid</option>
                                          </FormSelect>
                                          </>
                                      :'' }
                                      </div>
                                    </>
                                    
                                  })}
                          
                      </div>
                    </TECollapse>
                  </div>
                  <div className="rounded-b-lg border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                    <h2 className="accordion-header mb-0" id="headingThree">
                      <button
                        className={`${
                          activeElement === "element11"
                            ? `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                            : `transition-none rounded-b-[15px]`
                        } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                        type="button"
                        onClick={() => handleClick("element11")}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Shopping ({countShopping})
                        <span
                          className={`${
                            activeElement === "element11"
                              ? `rotate-[-180deg] -mr-1`
                              : `rotate-0 fill-[#212529] dark:fill-white`
                          } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </span>
                      </button>
                    </h2>
                    <TECollapse
                      show={activeElement === "element11"}
                      className="!mt-0 !shadow-none"
                    >
                      <div className="px-5 py-4">
                            
                                  { shoppingChck.map((value, i)=>{
                                    return <>
                                      <div className="grid-cols-3 gap-6 sm:grid h-[3rem]">
                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                          <FormCheck.Input id={`checkbox-switch1-${i}`} type="checkbox" value={value} onChange={(e)=>handleCheck(e,'Shopping')} />
                                          <FormCheck.Label htmlFor={`checkbox-switch1-${i}`}>
                                              {value}
                                          </FormCheck.Label>
                                        </FormCheck>
                                      </div>
                                    </>
                                    
                                  })}
                          
                      </div>
                    </TECollapse>
                  </div>
                  <div className="rounded-b-lg border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                    <h2 className="accordion-header mb-0" id="headingThree">
                      <button
                        className={`${
                          activeElement === "element12"
                            ? `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                            : `transition-none rounded-b-[15px]`
                        } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                        type="button"
                        onClick={() => handleClick("element12")}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Entertainment ({countEntertainment})
                        <span
                          className={`${
                            activeElement === "element12"
                              ? `rotate-[-180deg] -mr-1`
                              : `rotate-0 fill-[#212529] dark:fill-white`
                          } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </span>
                      </button>
                    </h2>
                    <TECollapse
                      show={activeElement === "element12"}
                      className="!mt-0 !shadow-none"
                    >
                      <div className="px-5 py-4">
                            
                                  { entertainmentChck.map((value, i)=>{
                                    return <>
                                      <div className="grid-cols-3 gap-6 sm:grid h-[3rem]">
                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                          <FormCheck.Input id={`checkbox-switch1-${i}`} type="checkbox" value={value} onChange={(e)=>handleCheck(e,'Entertainment')} />
                                          <FormCheck.Label htmlFor={`checkbox-switch1-${i}`}>
                                              {value}
                                          </FormCheck.Label>
                                        </FormCheck>
                                        { _.replace(_.lowerCase(value), " ", "_")==='events'?
                                          <>
                                            <FormSelect
                                              {...register("events")}
                                              id="events"
                                              className="h-10"
                                              //value={hotelRoomType}
                                              //onChange={(e) => sethotelRoomType(e.target.value)} 
                                              >
                                              <option value="Live Music">Live Music</option>
                                              <option value="Magic Show">Magic Show</option>
                                              <option value="DJ">DJ</option>
                                              <option value="Folk Dance">Folk Dance</option>
                                              <option value="Live Band">Live Band</option>
                                          </FormSelect>
                                          </>
                                      :'' }
                                      </div>
                                    </>
                                    
                                  })}
                          
                      </div>
                    </TECollapse>
                  </div>
                  <div className="rounded-b-lg border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                    <h2 className="accordion-header mb-0" id="headingThree">
                      <button
                        className={`${
                          activeElement === "element13"
                            ? `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                            : `transition-none rounded-b-[15px]`
                        } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                        type="button"
                        onClick={() => handleClick("element13")}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Payment Services ({countPayment})
                        <span
                          className={`${
                            activeElement === "element13"
                              ? `rotate-[-180deg] -mr-1`
                              : `rotate-0 fill-[#212529] dark:fill-white`
                          } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </span>
                      </button>
                    </h2>
                    <TECollapse
                      show={activeElement === "element13"}
                      className="!mt-0 !shadow-none"
                    >
                      <div className="px-5 py-4">
                            
                                  { paymentChck.map((value, i)=>{
                                    return <>
                                      <div className="grid-cols-3 gap-6 sm:grid h-[3rem]">
                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                          <FormCheck.Input id={`checkbox-switch1-${i}`} type="checkbox" value={value} onChange={(e)=>handleCheck(e,'Payment')} />
                                          <FormCheck.Label htmlFor={`checkbox-switch1-${i}`}>
                                              {value}
                                          </FormCheck.Label>
                                        </FormCheck>
                                      </div>
                                    </>
                                    
                                  })}
                          
                      </div>
                    </TECollapse>
                  </div>
                  <div className="rounded-b-lg border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                    <h2 className="accordion-header mb-0" id="headingThree">
                      <button
                        className={`${
                          activeElement === "element14"
                            ? `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                            : `transition-none rounded-b-[15px]`
                        } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                        type="button"
                        onClick={() => handleClick("element14")}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Indoor activities and Sports ({countIndoorActivity})
                        <span
                          className={`${
                            activeElement === "element14"
                              ? `rotate-[-180deg] -mr-1`
                              : `rotate-0 fill-[#212529] dark:fill-white`
                          } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </span>
                      </button>
                    </h2>
                    <TECollapse
                      show={activeElement === "element14"}
                      className="!mt-0 !shadow-none"
                    >
                      <div className="px-5 py-4">
                            
                                  { indoorActivityChck.map((value, i)=>{
                                    return <>
                                      <div className="grid-cols-3 gap-6 sm:grid h-[3rem]">
                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                          <FormCheck.Input id={`checkbox-switch1-${i}`} type="checkbox" value={value} onChange={(e)=>handleCheck(e,'IndoorActivity')} />
                                          <FormCheck.Label htmlFor={`checkbox-switch1-${i}`}>
                                              {value}
                                          </FormCheck.Label>
                                        </FormCheck>
                                        { _.replace(_.lowerCase(value), " ", "_")==='casino'?
                                          <>
                                            <FormSelect
                                              {...register("events")}
                                              id="events"
                                              className="h-10"
                                              //value={hotelRoomType}
                                              //onChange={(e) => sethotelRoomType(e.target.value)} 
                                              >
                                              <option value="Live Music">Free Entry</option>
                                              <option value="Magic Show">Paid Entry</option>
                                            </FormSelect>
                                          </>
                                      :'' }
                                      { _.replace(_.lowerCase(value), " ", "_")==='indoor_games'?
                                          <>
                                            <TomSelect
                                              {...register("events")}
                                              id="events"
                                              className="h-10 w-full"
                                              options={{
                                              placeholder: "Select Indoor Games",
                                            }}
                                              //value={hotelRoomType}
                                              //onChange={(e) => sethotelRoomType(e.target.value)} 
                                              multiple

                                              >
                                              <option value="Table Tennis">Table Tennis</option>
                                              <option value="Chess">Chess</option>
                                              <option value="Carrom">Carrom</option>
                                              <option value="Bowling">Bowling</option>
                                              <option value="Pool">Pool</option>
                                              <option value="Board Games">Board Games</option>
                                              <option value="Squash">Squash</option>
                                            </TomSelect>
                                          </>
                                      :'' }
                                      </div>
                                    </>
                                    
                                  })}
                          
                      </div>
                    </TECollapse>
                  </div>
                  <div className="rounded-b-lg border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                    <h2 className="accordion-header mb-0" id="headingThree">
                      <button
                        className={`${
                          activeElement === "element15"
                            ? `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                            : `transition-none rounded-b-[15px]`
                        } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                        type="button"
                        onClick={() => handleClick("element15")}
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Pet Essentials ({countPetEssen})
                        <span
                          className={`${
                            activeElement === "element15"
                              ? `rotate-[-180deg] -mr-1`
                              : `rotate-0 fill-[#212529] dark:fill-white`
                          } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </span>
                      </button>
                    </h2>
                    <TECollapse
                      show={activeElement === "element15"}
                      className="!mt-0 !shadow-none"
                    >
                      <div className="px-5 py-4">
                            
                                  { petEssenChck.map((value, i)=>{
                                    return <>
                                      <div className="grid-cols-3 gap-6 sm:grid h-[3rem]">
                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                          <FormCheck.Input id={`checkbox-switch1-${i}`} type="checkbox" value={value} onChange={(e)=>handleCheck(e,'PetEssen')} />
                                          <FormCheck.Label htmlFor={`checkbox-switch1-${i}`}>
                                              {value}
                                          </FormCheck.Label>
                                        </FormCheck>
                                      </div>
                                    </>
                                    
                                  })}
                          
                      </div>
                    </TECollapse>
                  </div>
                  </Preview>
                  </div>
                </>
              
            </PreviewComponent>
            {/* END: Vertical Form */}

          </div>
        </div>
      </form>
      {/* BEGIN: Success Notification Content */}
      <Notification
            id="success-notification-content"
            className="flex hidden"
          >
            <Lucide icon="CheckCircle" className="text-success" />
            <div className="ml-4 mr-4">
              <div className="font-medium">Data updated successfully!</div>
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
              <div className="font-medium">Data updation failed!</div>
              <div className="mt-1 text-slate-500">
                Please check the fileld form.
              </div>
            </div>
          </Notification>
          {/* END: Failed Notification Content */}
    </>
  );
}

export default addRoomDetails;
