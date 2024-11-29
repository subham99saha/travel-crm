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
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { createVendorTrain } from "./vendorTrainSlice";
import TomSelect from "../../base-components/TomSelect";
import { fetchAllCity } from "../City/CitySlice";
import { fetchAllVendor } from "../Vendor/vendorSlice";
import _ from "lodash";
import axios from "axios";
import api from "../../../apiconfig.json";





const addTrain = ()=>{
  

  const [selectDptCity, setSelectDptCity] = useState("");
  const [selectDstCity, setSelectDstCity] = useState("");
  const [departureTimeH, setDepartureTimeH] = useState("00");
  const [departureTimeM, setDepartureTimeM] = useState("00");
  const [arrivalTimeH, setArrivalTimeH] = useState("00");
  const [arrivalTimeM, setArrivalTimeM] = useState("00");
  const [mainImg, setmainImg] = useState("");
  const [isActive, setisActive] = useState("Y");
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.city);
  const vendor = useAppSelector((state)=> state.vendor);
  const [selectVendor, setVendor] = useState(0);

  useEffect(()=>{
    dispatch(fetchAllVendor('train'));
  },[]);

  useEffect(()=>{
    dispatch(fetchAllCity());
},[]); 

  

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;


  const schema = yup
    .object({
      trainNo: yup.string().required("Name is a required field").min(2),
      //departureCityId: yup.string().required("Departure City is a required field"),
      //destinationCityId: yup.string().required("Destination City is a required field"),
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
      // let dptTime = '';
      // if(event.target[10].value==='') dptTime = `00:${event.target[11].value}`;
      // if(event.target[11].value==='') dptTime = `${event.target[10].value}:00`;
      
      console.log(getValues());
      let sendData = {
        createdBy: selectVendor,
        trainNo: getValues("trainNo"),
        departureCityId: selectDptCity,
        destinationCityId: selectDstCity,
        departureTime: `${departureTimeH}:${departureTimeM}`,//`${event.target[10].value}:${event.target[11].value}`,
        arrivalTime: `${arrivalTimeH}:${arrivalTimeM}`,//`${event.target[12].value}:${event.target[13].value}`,
        price: getValues("price"),
        price2A: getValues("price2A"),
        price2S: getValues("price2S"),
        price3A: getValues("price3A"),
        price1A: getValues("price1A"),
        priceCC: getValues("priceCC"),
        priceEC: getValues("priceEC"),
        priceEV: getValues("priceEV"),
        isActive: isActive,//event.target[14].value,
        userType: 'V',
        mainImg: mainImg
       } ;
       console.log("Data: ",sendData);
       let formdata = new FormData();
        formdata.append("thumbnail", mainImg);
        formdata.append("sendData", JSON.stringify(sendData));

       console.log(formdata);

       const res = axios.post(`${api.API_URL}${api.API_ENDPOINT.TRAIN}`, formdata, {
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
        <h2 className="mr-auto text-lg font-medium">Manage Train (Vendor)</h2>
        
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 intro-y lg:col-span-6">
          {/* BEGIN: Form Validation */}
          <PreviewComponent className="intro-y box">
            
              <>
                <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium">
                    Add Train
                  </h2>
                  <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
                    <Link to="/vendor-train">
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
                      <FormInput
                          {...register("createdBy")}
                          id="validation-form-1"
                          type="hidden"
                          name="createdBy"
                          value="1"
                        />
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Train Name
                          <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, at least 2 characters
                          </span>
                        </FormLabel>
                        <FormInput
                          {...register("trainNo")}
                          id="validation-form-1"
                          type="text"
                          name="trainNo"
                          className={clsx({
                            "border-danger": errors.trainNo,
                          })}
                          placeholder="Name"
                        />
                        {errors.trainNo && (
                          <div className="mt-2 text-danger">
                            {typeof errors.trainNo.message === "string" &&
                              errors.trainNo.message}
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
                        <TomSelect
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
                          { _.take(data, data.length).map((item, Key)=>(
                            <option value={item.id}>{item.cityName}</option>
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
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Destination City
                        </FormLabel>
                        <TomSelect
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
                          { _.take(data, data.length).map((item, Key)=>(
                            <option value={item.id}>{item.cityName}</option>
                          )
                            
                          )}
                        </TomSelect>
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
                        id="dptHour"
                        name="dptHour"
                        value={departureTimeH}
                        onChange={e=>setDepartureTimeH(e.target.value)}
                        className="mt-2 sm:mr-2"
                        aria-label="Default select example"
                        >
                          <option value="00">Hour</option>
                        {[...Array(24)].map((x, i) =>
                          <option value={i + 1}>{i + 1}</option>
                        )}
                      </FormSelect>
                      <FormSelect
                        {...register("dptMin")}
                        id="dptMin"
                        name="dptMin"
                        value={departureTimeM}
                        onChange={e=>setDepartureTimeM(e.target.value)}
                        className="mt-2 sm:mr-2"
                        aria-label="Default select example"
                      >
                        <option value="00">Minute</option>
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
                        value={arrivalTimeH}
                        onChange={e=>setArrivalTimeH(e.target.value)}
                        className="mt-2 sm:mr-2"
                        aria-label="Default select example"
                        >
                          <option value="00">Hour</option>
                        {[...Array(24)].map((x, i) =>
                          <option value={i + 1}>{i + 1}</option>
                        )}
                      </FormSelect>
                      <FormSelect
                        {...register("ArrMin")}
                        id="validation-form-1"
                        name="ArrMin"
                        value={arrivalTimeM}
                        onChange={e=>setArrivalTimeM(e.target.value)}
                        className="mt-2 sm:mr-2"
                        aria-label="Default select example"
                      >
                        <option value="00">Minute</option>
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
                        >Price for Sleeper Class</FormLabel>
                      <div className="grid-cols-4 gap-2 sm:grid">                                             
                      <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >Sleeper (SL)</FormLabel>
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >AC 3 Tier (3A)</FormLabel>
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >AC 2 Tier (2A)</FormLabel>
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >AC First Class (1A)</FormLabel>
                    </div>
                    <div className="grid-cols-4 gap-2 sm:grid">                                             
                    <FormInput
                          {...register("price")}
                          id="validation-form-1"
                          type="text"
                          name="price"
                          className={clsx({
                            "border-danger": errors.price,
                          })}
                          placeholder="price SL"
                        />
                        <FormInput
                          {...register("price2A")}
                          id="validation-form-1"
                          type="text"
                          name="price2A"
                          className={clsx({
                            "border-danger": errors.price2A,
                          })}
                          placeholder="price 2A"
                        />
                        <FormInput
                          {...register("price3A")}
                          id="validation-form-1"
                          type="text"
                          name="price3A"
                          className={clsx({
                            "border-danger": errors.price3A,
                          })}
                          placeholder="price 3A"
                        />
                        <FormInput
                          {...register("price1A")}
                          id="validation-form-1"
                          type="text"
                          name="price1A"
                          className={clsx({
                            "border-danger": errors.price1A,
                          })}
                          placeholder="price 1A"
                        />
                    </div>
                    
                      </div>
                      <div className="mt-3 input-form">
                      <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >Price for Chair Car</FormLabel>
                      <div className="grid-cols-4 gap-2 sm:grid">  
                      <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >2S</FormLabel>                                           
                      <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >AC Chair car (CC)</FormLabel>
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >Exec. Chair Car (EC)</FormLabel>
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >Vistadome AC (EV)</FormLabel>
                    </div>
                    <div className="grid-cols-4 gap-2 sm:grid"> 
                    <FormInput
                          {...register("price2S")}
                          id="validation-form-1"
                          type="text"
                          name="price2S"
                          className={clsx({
                            "border-danger": errors.price2S,
                          })}
                          placeholder="price 2S"
                        />                                            
                    <FormInput
                          {...register("priceCC")}
                          id="validation-form-1"
                          type="text"
                          name="priceCC"
                          className={clsx({
                            "border-danger": errors.priceCC,
                          })}
                          placeholder="price CC"
                        />
                        <FormInput
                          {...register("priceEC")}
                          id="validation-form-1"
                          type="text"
                          name="priceEC"
                          className={clsx({
                            "border-danger": errors.priceEC,
                          })}
                          placeholder="price EC"
                        />
                        <FormInput
                          {...register("priceEV")}
                          id="validation-form-1"
                          type="text"
                          name="priceEV"
                          className={clsx({
                            "border-danger": errors.priceEV,
                          })}
                          placeholder="price EV"
                        />
                    </div>
                    
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Train Image
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
                          className="mt-2 sm:mr-2" 
                          aria-label="Default select example"
                          value={isActive}
                          onChange={e=>{setisActive(e.target.value)}}
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
                      <Link to="/vendor-train">
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

export default addTrain;


