 //@ts-nocheck
 import {
  PreviewComponent,
  Preview,
} from "../../base-components/PreviewComponent";
import {
  FormLabel,
  FormInput,
  FormSelect,
} from "../../base-components/Form";
import Button from "../../base-components/Button";
//import Litepicker from "../../base-components/Litepicker";
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
import { createVendorFlight } from "./vendorFlightSlice";
import TomSelect from "../../base-components/TomSelect";
import { fetchAllCity } from "../City/CitySlice";
import { fetchAllAirline } from "../Airline/AirlineSlice";
import { fetchAllVendor } from "../Vendor/vendorSlice";
import { getVendorFlight } from "./vendorFlightSlice";
import _ from "lodash";
import api from "../../../apiconfig.json";
import axios from "axios";





const editFlight = ()=>{
  
  const server = api.API_URL;
  const imgaePath = `${server}images/flight/`;
  const params = useParams();
  
  
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state)=>state.vendorFlight);
  const city = useAppSelector((state) => state.city);
  const airline = useAppSelector((state) => state.airline);
  const vendor = useAppSelector((state)=> state.vendor);

  const [selectDptCity, setSelectDptCity] = useState("");
  const [selectDstCity, setSelectDstCity] = useState("");
  const [selectAirline, setAirline] = useState("");
  const [selectVendor, setVendor] = useState("");
  const [ticketPriceEconomy, setticketPriceEconomy] = useState("");
  const [ticketPriceBussiness, setticketPriceBussiness] = useState("");
  const [flightNo, setflightNo] = useState("");
  const [stopType, setstopType] = useState("");
  const [departureTimeH, setdepartureTimeH] = useState("");
  const [departureTimeM, setdepartureTimeM] = useState("");
  const [arrivalTimeH, setarrivalTimeH] = useState("");
  const [arrivalTimeM, setarrivalTimeM] = useState("");
  const [layOffTimeH, setlayOffTimeH] = useState("");
  const [layOffTimeM, setlayOffTimeM] = useState("");
  const [active, setactive] = useState("");
  const [mainImg, setmainImg] = useState("");

 
useEffect(()=>{
  dispatch(fetchAllAirline());
  dispatch(fetchAllCity());
  dispatch(fetchAllVendor('flight'));
  console.log("Effect 1");
},[]);

useEffect(()=>{
  dispatch(getVendorFlight(params.id));
  console.log("Effect 2");
},[]);

useEffect(() => {
  reset(data);
  setSelectDptCity(data.departureCityId);
  setSelectDstCity(data.destinationCityId);
  setAirline(data.amId);
  setVendor(data.createdBy);
  setticketPriceEconomy(data.ticketPriceEconomy);
  setticketPriceBussiness(data.ticketPriceBussiness);
  setflightNo(data.flightNo);
  setstopType(data.createdBy);
  setactive(data.isActive);
  console.log("Effect 3");
}, []);
  
  
console.log(data);
  //console.log("Airline: ", airline);

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;


  const schema = yup
    .object({
      flightNo: yup.string().required("Name is a required field").min(2),
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
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
      }).showToast();
    } else {
      let sendData = {
        createdBy: selectVendor,
        amId: selectAirline,
        flightNo: flightNo,
        departureCityId: selectDptCity,
        destinationCityId: selectDstCity,
        departureTime: `${departureTimeH}:${departureTimeM}`,
        arrivalTime: `${arrivalTimeH}:${arrivalTimeM}`,
        layOffTime: `${layOffTimeH}:${layOffTimeM}`,
        ticketPriceEconomy: ticketPriceEconomy,
        ticketPriceBussiness: ticketPriceBussiness,
        stopType: stopType,
        isActive: active,
        userType: 'V'
        
       } ;
       //console.log("Data: ",formData);
      //dispatch(createVendorFlight(formData));
      let formdata = new FormData();
      formdata.append("thumbnail", mainImg);
      formdata.append("sendData", JSON.stringify(sendData));

  console.log(formdata);

  const res = axios.post(`${api.API_URL}${api.API_ENDPOINT.FLIGHT}`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then((result)=>{
    reset();
    const successEl = document
      .querySelectorAll("#success-notification-content")[0]
      .cloneNode(true) as HTMLElement;
    successEl.classList.remove("hidden");
    Toastify({
      node: successEl,
      checkOutTime: 3000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
    }).showToast();
  });
    }
  };

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Manage Flight (Vendor)</h2>
        
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 intro-y lg:col-span-6">
          {/* BEGIN: Form Validation */}
          <PreviewComponent className="intro-y box">
            
              <>
                <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium">
                    Edit Flight
                  </h2>
                  <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
                    <Link to="/vendor-flight">
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
                          Airline
                        </FormLabel>
                        <FormSelect
                          {...register("amId")}
                          id="validation-form-1"
                          name="amId"
                          value={selectAirline}
                          onChange={setAirline}
                          options={{
                            placeholder: "Select Airline",
                          }}
                          className="w-full"
                        >
                          <option>Select Airline</option>
                          { _.take(airline.data, airline.data.length).map((item, Key)=>(
                            <option value={item.id}>{item.airlineName}</option>
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
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Flight Name
                          <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, at least 2 characters
                          </span>
                        </FormLabel>
                        <FormInput
                          {...register("flightNo")}
                          id="validation-form-1"
                          type="text"
                          name="flightNo"
                          value={flightNo}
                          onChange={(e)=>setflightNo(e.target.value)}
                          className={clsx({
                            "border-danger": errors.flightNo,
                          })}
                          placeholder="Name"
                        />
                        {errors.flightNo && (
                          <div className="mt-2 text-danger">
                            {typeof errors.flightNo.message === "string" &&
                              errors.flightNo.message}
                          </div>
                        )}
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Departure City
                        </FormLabel>
                        <FormSelect
                          {...register("departureCityId")}
                          id="validation-form-1"
                          name="departureCityId"
                          value={selectDptCity}
                          onChange={setSelectDptCity}
                          options={{
                            placeholder: "Select Departure City",
                          }}
                          className="w-full"
                        >
                          <option>Select City</option>
                          { _.take(city.data, city.data.length).map((item, Key)=>(
                            <option value={item.id}>{item.cityName}</option>
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
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Destination City
                        </FormLabel>
                        <FormSelect
                          {...register("destinationCityId")}
                          id="validation-form-1"
                          name="destinationCityId"
                          value={selectDstCity}
                          onChange={setSelectDstCity}
                          options={{
                            placeholder: "Select Destination City",
                          }}
                          className="w-full"
                        >
                          <option>Select City</option>
                          { _.take(city.data, city.data.length).map((item, Key)=>(
                            <option value={item.id}>{item.cityName}</option>
                          )
                            
                          )}
                        </FormSelect>
                        {errors.destinationCityId && (
                          <div className="mt-2 text-danger">
                            {typeof errors.destinationCityId.message === "string" &&
                              errors.destinationCityId.message}
                          </div>
                        )}
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Departure Time
                          
                        </FormLabel>
                        <div className="flex flex-col items-center sm:flex-row">
                        <FormSelect
                        {...register("dptHour")}
                        id="validation-form-1"
                        name="dptHour"
                        className="mt-2 sm:mr-2"
                        aria-label="Default select example"
                        value={departureTimeH}
                        onChange={(e)=>setdepartureTimeH(e.target.value)}
                        >
                          <option value="0">Hour</option>
                        {[...Array(24)].map((x, i) =>
                          <option value={i + 1}>{i + 1}</option>
                        )}
                      </FormSelect>
                      <FormSelect
                        {...register("dptMin")}
                        id="validation-form-1"
                        name="dptMin"
                        className="mt-2 sm:mr-2"
                        aria-label="Default select example"
                        value={departureTimeM}
                        onChange={(e)=>setdepartureTimeM(e.target.value)}
                      >
                        <option value="0">Minute</option>
                        {[...Array(60)].map((x, i) =>
                          <option value={i + 1}>{i + 1}</option>
                        )}
                      </FormSelect>
                        </div>
                        
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Arrival Time
                          
                        </FormLabel>
                        <div className="flex flex-col items-center sm:flex-row">
                        <FormSelect
                        {...register("ArrHour")}
                        id="validation-form-1"
                        name="ArrHour"
                        className="mt-2 sm:mr-2"
                        aria-label="Default select example"
                        value={arrivalTimeH}
                        onChange={(e)=>setarrivalTimeH(e.target.value)}
                        >
                          <option value="0">Hour</option>
                        {[...Array(24)].map((x, i) =>
                          <option value={i + 1}>{i + 1}</option>
                        )}
                      </FormSelect>
                      <FormSelect
                        {...register("ArrMin")}
                        id="validation-form-1"
                        name="ArrMin"
                        className="mt-2 sm:mr-2"
                        aria-label="Default select example"
                        value={arrivalTimeM}
                        onChange={(e)=>setarrivalTimeM(e.target.value)}
                      >
                        <option value="0">Minute</option>
                        {[...Array(60)].map((x, i) =>
                          <option value={i + 1}>{i + 1}</option>
                        )}
                      </FormSelect>
                        </div>
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Lay Of Time
                          
                        </FormLabel>
                        <div className="flex flex-col items-center sm:flex-row">
                        <FormSelect
                        {...register("layOffHour")}
                        id="validation-form-1"
                        name="layOfHour"
                        className="mt-2 sm:mr-2"
                        aria-label="Default select example"
                        value={layOffTimeH}
                        onChange={(e)=>setlayOffTimeH(e.target.value)}
                        >
                          <option value="0">Hour</option>
                        {[...Array(24)].map((x, i) =>
                          <option value={i + 1}>{i + 1}</option>
                        )}
                      </FormSelect>
                      <FormSelect
                        {...register("layOffMin")}
                        id="validation-form-1"
                        name="layOfMin"
                        className="mt-2 sm:mr-2"
                        aria-label="Default select example"
                        value={layOffTimeM}
                        onChange={(e)=>setlayOffTimeM(e.target.value)}
                      >
                        <option value="0">Minute</option>
                        {[...Array(60)].map((x, i) =>
                          <option value={i + 1}>{i + 1}</option>
                        )}
                      </FormSelect>
                        </div>
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Ticket Price
                          
                        </FormLabel>
                        <div className="flex flex-col items-center sm:flex-row">
                        <FormInput
                        {...register("ticketPriceEconomy")}
                        type="text"
                        id="validation-form-1"
                        name="layOfHour"
                        className="mt-2 sm:mr-2"
                        aria-label="Default select example"
                        placeholder="Economy Class"
                        value={ticketPriceEconomy}
                        onChange={(e)=>setticketPriceEconomy(e.target.value)}
                        />
                         
                         <FormInput
                        {...register("ticketPriceBussiness")}
                        type="text"
                        id="validation-form-1"
                        name="layOfHour"
                        className="mt-2 sm:mr-2"
                        aria-label="Default select example"
                        placeholder="Bussiness Class"
                        value={ticketPriceBussiness}
                        onChange={(e)=>setticketPriceBussiness(e.target.value)}
                        />
                        </div>
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          No of Stop
                        </FormLabel>
                        <FormSelect 
                          {...register("stopType")}
                          name="stopType"
                          className="mt-2 sm:mr-2" 
                          aria-label="Default select example"
                          value={stopType}
                          onChange={(e)=>setstopType(e.target.value)}
                          >
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                        </FormSelect>
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Flight Image
                        </FormLabel>
                        <FormInput
                        {...register("mainImg")}
                        id="mainImg"
                        type="file"
                        className="mt-3 sm:mt-0"
                        onChange={(e) => setmainImg(e.target.files[0])}
                      />
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
                          name="isActive"
                          className="mt-2 sm:mr-2" 
                          aria-label="Default select example"
                          value={active}
                          onChange={(e)=>setactive(e.target.value)}
                          >
                                <option value="Y">Active</option>
                                <option value="N">Inactive</option>
                        </FormSelect>
                      </div>
                      <div className="mt-3 input-form">
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
                          onChange={setVendor}
                          options={{
                            placeholder: "Select Vendor",
                          }}
                          className="w-full"
                        >
                          <option>Select Vendor</option>
                          { _.take(vendor.data, vendor.data.length).map((item, Key)=>(
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
                      <Button variant="primary" type="submit" className="mt-5 w-24 mr-1">
                        Save
                      </Button>
                      <Link to="/vendor-flight">
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
          {/* END: Form Validation */}
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

export default editFlight;



