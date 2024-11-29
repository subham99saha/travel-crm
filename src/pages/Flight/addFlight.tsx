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
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { createFlight } from "./flightSlice";
import TomSelect from "../../base-components/TomSelect";
import { fetchAllCity } from "../City/CitySlice";
import { fetchAllAirline } from "../Airline/AirlineSlice";
import _ from "lodash";





const addFlight = ()=>{
  

  const [selectDptCity, setSelectDptCity] = useState("");
  const [selectDstCity, setSelectDstCity] = useState("");
  const [selectAirline, setAirline] = useState("");

  
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.city);
  const airline = useAppSelector((state) => state.airline);

  useEffect(()=>{
    dispatch(fetchAllCity());
},[]); 
useEffect(()=>{
  dispatch(fetchAllAirline());
},[]); 

  console.log("Airline: ", airline);

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
      let formData = {
        createdBy: event.target[0].value,
        amId: event.target[1].value,
        flightNo: event.target[5].value,
        departureCityId: event.target[6].value,
        destinationCityId: event.target[10].value,
        departureTime: `${event.target[14].value}:${event.target[15].value}`,
        arrivalTime: `${event.target[16].value}:${event.target[17].value}`,
        layOffTime: `${event.target[18].value}:${event.target[19].value}`,
        stopType: event.target[20].value,
        isActive: event.target[21].value,
        userType: 'S'
        // t0: event.target[0].value,
        // t1: event.target[1].value,
        // t2: event.target[2].value,
        // t3: event.target[3].value,
        // t4: event.target[4].value,
        // t5: event.target[5].value,
        // t6: event.target[6].value,
        // t7: event.target[7].value,
        // t8: event.target[8].value,
        // t9: event.target[9].value,
        // t10: event.target[10].value,
        // t11: event.target[11].value,
        // t12: event.target[12].value,
        // t13: event.target[13].value,
        // t14: event.target[14].value,
        // t15: event.target[15].value,
        // t16: event.target[16].value,
        // t17: event.target[17].value,
        // t18: event.target[18].value,
        // t19: event.target[19].value,
        // t20: event.target[20].value,
        // t21: event.target[21].value,
       } ;
       console.log("Data: ",formData);
      dispatch(createFlight(formData));
       reset({
        amId: "",
        flightNo: "",
        departureCityId: "",
        destinationCityId: "",
        departureTime: "",
        arrivalTime: "",
        layOffTime: "",
        stopType: "",
        isActive: 'Y'
       });
       setSelectDptCity("");
       setSelectDstCity("");
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

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Manage Flight</h2>
        
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 intro-y lg:col-span-6">
          {/* BEGIN: Form Validation */}
          <PreviewComponent className="intro-y box">
            
              <>
                <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium">
                    Add Flight
                  </h2>
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
                          Airline
                        </FormLabel>
                        <TomSelect
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
                          <option>Select City</option>
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
                          <option>Select City</option>
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
                        id="validation-form-1"
                        name="dptHour"
                        className="mt-2 sm:mr-2"
                        aria-label="Default select example"
                        >
                          <option>Hour</option>
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
                      >
                        <option>Minute</option>
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
                        >
                          <option value="">Hour</option>
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
                      >
                        <option value="">Minute</option>
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
                        >
                          <option>Hour</option>
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
                      >
                        <option>Minute</option>
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
                          No of Stop
                        </FormLabel>
                        <FormSelect 
                          {...register("stopType")}
                          name="stopType"
                          className="mt-2 sm:mr-2" 
                          aria-label="Default select example">
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
                          Status
                        </FormLabel>
                        <FormSelect 
                          {...register("isActive")}
                          name="isActive"
                          className="mt-2 sm:mr-2" 
                          aria-label="Default select example">
                                <option value="Y">Active</option>
                                <option value="N">Inactive</option>
                        </FormSelect>
                      </div>
                      <Button variant="primary" type="submit" className="mt-5 w-24 mr-1">
                        Save
                      </Button>
                      <Link to="/super-flight">
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

export default addFlight;


