// @ts-nocheck
import {
  PreviewComponent,
  Preview,
} from "../../base-components/PreviewComponent";
import {
  FormLabel,
  FormInput,
  FormSelect,
} from "../../base-components/Form";
import _ from "lodash";
import Button from "../../base-components/Button";
import Notification from "../../base-components/Notification";
import Lucide from "../../base-components/Lucide";
import { useForm } from "react-hook-form";
import Toastify from "toastify-js";
import clsx from "clsx";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import TomSelect from "../../base-components/TomSelect";
//import { createTransport } from "./transportSlice";
import { fetchAllTransportType } from "../TransportType/TransportTypeSlice";
import { fetchAllVendor } from "../Vendor/vendorSlice";
import { fetchAllCity } from "../City/CitySlice";
import axios from "axios";
import api from "../../../apiconfig.json";

const addTransport = ()=>{
  const dispatch = useAppDispatch();

  const [trtmId, settrtmId] = useState("3");
  const [selectVendor, setVendor] = useState(0);
  const [transportName, settransportName] = useState("");
  const [transportNo, settransportNo] = useState();
  const [destination, setdestination] = useState("");
  const [departure, setdeparture] = useState("");
  const [arrivalTime, setarrivalTime] = useState("");
  //const [price, setprice] = useState("");
  const [priceOffSeason, setpriceOffSeason] = useState("");
  const [noOfseat, setnoOfseat] = useState("");
  const [isAC, setisAC] = useState('N');
  const [isActive, setisActive] = useState("Y");
  const [mainImg, setmainImg] = useState("");
  const [selectcityId, setcityId] = useState("");
  const [departureTimeH, setdepartureTimeH] = useState("00");
  const [departureTimeM, setdepartureTimeM] = useState("00");
  const [arrivalTimeH, setarrivalTimeH] = useState("00");
  const [arrivalTimeM, setarrivalTimeM] = useState("00");

  const { data } = useAppSelector((state) => state.transportType);
  const vendor = useAppSelector((state)=> state.vendor);
  const city = useAppSelector((state)=> state.city);

  const schema = yup
    .object({
      destination: yup.string().required().min(2),
      departure: yup.string().required().min(2),
      //arrivalTime: yup.string().required().min(2),
      noOfseat: yup.string().required(),
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
        trtmId: trtmId,
        cityId: selectcityId,
        transportName: transportName,
        transportNo: transportNo,
        destination: destination,
        departure: departure,
        departureTime: `${departureTimeH}:${departureTimeM}`,
        arrivalTime: `${arrivalTimeH}:${arrivalTimeM}`, 
        noOfseat: noOfseat,
        priceSeasonAC: getValues("priceSeasonAC"),
        priceOffSeasonAC: getValues("priceOffSeasonAC"),
        priceSeasonNonAC: getValues("priceSeasonNonAC"),
        priceOffSeasonNonAC:  getValues("priceOffSeasonNonAC"),
        isAC: isAC,
        isActive: isActive,
        userType: 'V'
       } ;
       
       console.log("Data: ",sendData);
       let formdata = new FormData();
        formdata.append("thumbnail", mainImg);
        formdata.append("sendData", JSON.stringify(sendData));

    console.log(formdata);

    const res = axios.post(`${api.API_URL}${api.API_ENDPOINT.TRANSPORT}`, formdata, {
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
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
      }).showToast();
    });  
    }
  };

  useEffect(()=>{
    dispatch(fetchAllTransportType());
    dispatch(fetchAllVendor("transport"));
    dispatch(fetchAllCity());
},[]); 

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Manage Transport</h2>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 intro-y lg:col-span-6">
          {/* BEGIN: Form Validation */}
          <PreviewComponent className="intro-y box">
            
              <>
                <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium">
                    Add Transport
                  </h2>
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
                          Transport Type
                          <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required
                          </span>
                        </FormLabel>
                        <TomSelect
                          {...register("trtmId")}
                          id="validation-form-1"
                          name="trtmId"
                          value={trtmId}
                          onChange={settrtmId}
                          options={{
                            placeholder: "Select Destination City",
                          }}
                          className="w-full"
                        >
                          { _.take(data, data.length).map((item, Key)=>(
                            <option value={item.id}>{item.transportType}</option>
                          )
                            
                          )}
                        </TomSelect>
                        {errors.cruiseNo && (
                          <div className="mt-2 text-danger">
                            {typeof errors.cruiseNo.message === "string" &&
                              errors.cruiseNo.message}
                          </div>
                        )}
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Car/Model Name
                          <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, at least 2 characters
                          </span>
                        </FormLabel>
                        <FormInput
                          {...register("transportName")}
                          id="validation-form-1"
                          type="text"
                          value={transportName}
                          onChange={(e)=>{settransportName(e.target.value)}}
                          name="transportName"
                          className={clsx({
                            "border-danger": errors.transportName,
                          })}
                          placeholder="Car/Model Name"
                        />
                        {errors.transportName && (
                          <div className="mt-2 text-danger">
                            {typeof errors.transportName.message === "string" &&
                              errors.transportName.message}
                          </div>
                        )}
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Car Number
                          <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, at least 2 characters
                          </span>
                        </FormLabel>
                        <FormInput
                          {...register("transportNo")}
                          id="validation-form-1"
                          type="text"
                          value={transportNo}
                          onChange={(e)=>{settransportNo(e.target.value)}}
                          name="transportName"
                          className={clsx({
                            "border-danger": errors.transportName,
                          })}
                          placeholder="Car/Model Name"
                        />
                        {errors.transportName && (
                          <div className="mt-2 text-danger">
                            {typeof errors.transportName.message === "string" &&
                              errors.transportName.message}
                          </div>
                        )}
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Transport City
                         
                        </FormLabel>
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
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Departure
                          <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, at least 2 characters
                          </span>
                        </FormLabel>
                        <FormInput
                          {...register("departure")}
                          id="validation-form-1"
                          type="text"
                          name="departure"
                          value={departure}
                          onChange={(e)=>{setdeparture(e.target.value)}}
                          className={clsx({
                            "border-danger": errors.departure,
                          })}
                          placeholder="Departure"
                        />
                        {errors.departure && (
                          <div className="mt-2 text-danger">
                            {typeof errors.departure.message === "string" &&
                              errors.departure.message}
                          </div>
                        )}
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Destination
                          <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, at least 2 characters
                          </span>
                        </FormLabel>
                        <FormInput
                          {...register("destination")}
                          id="validation-form-1"
                          type="text"
                          name="destination"
                          value={destination}
                          onChange={(e)=>{setdestination(e.target.value)}}
                          className={clsx({
                            "border-danger": errors.destination,
                          })}
                          placeholder="Destination"
                        />
                        {errors.destination && (
                          <div className="mt-2 text-danger">
                            {typeof errors.destination.message === "string" &&
                              errors.destination.message}
                          </div>
                        )}
                      </div>
                      {/* <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >Travel Time
                        <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, at least 2 characters
                          </span>
                        </FormLabel>
                        <FormInput
                          {...register("arrivalTime")}
                          id="validation-form-1"
                          type="text"
                          name="arrivalTime"
                          value={arrivalTime}
                          onChange={(e)=>{setarrivalTime(e.target.value)}}
                          className={clsx({
                            "border-danger": errors.arrivalTime,
                          })}
                          placeholder="Travel Time"
                        />
                        {errors.arrivalTime && (
                          <div className="mt-2 text-danger">
                            {typeof errors.arrivalTime.message === "string" &&
                              errors.arrivalTime.message}
                          </div>
                        )}
                      </div> */}
                       <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >Departure Time
                        </FormLabel>
                        <div className="grid-cols-4 gap-2 sm:grid">
                      <FormSelect
                        {...register('departureTimeH')}
                        id="departureTimeH"
                        onChange={(e)=>setdepartureTimeH(e.target.value)} 
                      >
                      <option value="00"> Hours </option>
                          {[...Array(24)].map((x, i) =>
                                <option value={i+1}>{i+1}</option>
                              )}
                      </FormSelect>
                      <FormSelect
                        {...register('departureTimeM')}
                        id="departureTimeM"
                        onChange={(e)=>setdepartureTimeM(e.target.value)} 
                      >
                      <option value="00"> Minutes </option>
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
                        >Arrival Time
                        </FormLabel>
                        <div className="grid-cols-4 gap-2 sm:grid">
                      <FormSelect
                        {...register('arrivalTimeH')}
                        id="arrivalTimeH"
                        onChange={(e)=>setarrivalTimeH(e.target.value)} 
                      >
                      <option value="00"> Hours </option>
                          {[...Array(24)].map((x, i) =>
                                <option value={i+1}>{i+1}</option>
                              )}
                      </FormSelect>
                      <FormSelect
                        {...register('arrivalTimeM')}
                        id="arrivalTimeM"
                        onChange={(e)=>setarrivalTimeM(e.target.value)} 
                      >
                      <option value="00"> Minutes </option>
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
                        >Rate / Charges (AC)
                        </FormLabel>
                        <div className="grid-cols-4 gap-2 sm:grid h-full">
                          <FormInput
                          type="text"
                          {...register('priceSeasonAC')}
                          id="validation-form-1"
                          name="priceSeasonAC"
                          //value={price}
                          //onChange={(e)=>{setprice(e.target.value)}}
                          placeholder="Season Rate"
                          
                          />
                          <FormInput
                          type="text"
                          {...register('priceOffSeasonAC')}
                          id="validation-form-1"
                          name="priceOffSeasonAC"
                          //value={priceOffSeason}
                          //onChange={(e)=>setpriceOffSeason(e.target.value)} 
                          placeholder="Off Season Rate"
                          />
                    </div>
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >Rate / Charges (Non AC)
                        </FormLabel>
                        <div className="grid-cols-4 gap-2 sm:grid h-full">
                          <FormInput
                          type="text"
                          {...register('priceSeasonNonAC')}
                          id="validation-form-1"
                          name="priceSeasonNonAC"
                          //value={price}
                          //onChange={(e)=>{setprice(e.target.value)}}
                          placeholder="Season Rate"
                          
                          />
                          <FormInput
                          type="text"
                          {...register('priceOffSeasonNonAC')}
                          id="validation-form-1"
                          name="priceOffSeasonNonAC"
                          //value={priceOffSeason}
                          //onChange={(e)=>setpriceOffSeason(e.target.value)} 
                          placeholder="Off Season Rate"
                          />
                    </div>
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >No Of Seat
                        <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, at least 2 characters
                          </span>
                        </FormLabel>
                        <FormInput
                          {...register("noOfseat")}
                          id="validation-form-1"
                          type="text"
                          name="noOfseat"
                          value={noOfseat}
                          onChange={(e)=>{setnoOfseat(e.target.value)}}
                          className={clsx({
                            "border-danger": errors.noOfseat,
                          })}
                          placeholder="No Of Seat"
                        />
                        {errors.noOfseat && (
                          <div className="mt-2 text-danger">
                            {typeof errors.noOfseat.message === "string" &&
                              errors.noOfseat.message}
                          </div>
                        )}
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          AC Type
                        </FormLabel>
                        <FormSelect 
                          {...register("isAC")}
                          name="isAC"
                          value={isAC}
                          onChange={(e)=>{setisAC(e.target.value)}}
                          className="mt-2 sm:mr-2" 
                          aria-label="Default select example">
                                <option value="N">Non-AC</option>
                                <option value="Y">AC</option>
                        </FormSelect>
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Activity Image
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
                          value={isActive}
                          onChange={(e)=>{setisActive(e.target.value)}}
                          className="mt-2 sm:mr-2" 
                          aria-label="Default select example">
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
                        <TomSelect
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
                        </TomSelect>
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
                      <Link to="/vendor-transport">
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

export default addTransport;

