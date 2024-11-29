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
import {useEffect, useState, useRef } from "react";
import Button from "../../base-components/Button";
import Notification from "../../base-components/Notification";
import Lucide from "../../base-components/Lucide";
import { useForm } from "react-hook-form";
import Toastify from "toastify-js";
import clsx from "clsx";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { getCruise, updateCruise } from "./cruiseSlice";
import _ from "lodash";

const editCruise = ()=>{
  const params = useParams();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.cruise); 

  let dptData = _.split(data.departureTime,":");
  let arrData = _.split(data.arrivalTime,":");
  console.log("C Data:", dptData[0]);
  const [dptHour, setdptHour] = useState();
  const [dptMin, setdptMin] = useState();
  const [arrHour, setarrHour] = useState();
  const [arrMin, setarrMin] = useState();
  

  

  useEffect(()=>{
    dispatch(getCruise(params.id));
  },[])

  
  
  const schema = yup
    .object({
      cruiseNo: yup.string().required().min(2),
      departure: yup.string().required().min(2),
      destination: yup.string().required().min(2),
    })
    .required();

    

  const {
    register,
    trigger,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

   useEffect(() => {
    reset(data);
  }, [data]);
  
  // useEffect(()=>{
  //   setdptHour(dptData[0]);
  //   setdptMin(dptData[1]);
  //   setarrHour(arrData[0]);
  //   setarrMin(arrData[1]);
  // },[]);
  

  

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
      let departureTime = (event.target[4].value=='' || event.target[5].value=='')? data.departureTime: `${event.target[4].value}:${event.target[5].value}`;
      let arrivalTime = (event.target[6].value=='' || event.target[7].value=='')? data.arrivalTime: `${event.target[6].value}:${event.target[7].value}`;
      let formData = {
        createdBy: event.target[0].value,
        cruiseNo: event.target[1].value,
        departure: event.target[2].value,
        destination: event.target[3].value,
        departureTime: departureTime,
        arrivalTime: arrivalTime,
        isActive: event.target[8].value,
        id: params.id
       } ;
       
       dispatch(updateCruise(formData));
       
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
        <h2 className="mr-auto text-lg font-medium">Manage Cruise</h2>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 intro-y lg:col-span-6">
          {/* BEGIN: Form Validation */}
          <PreviewComponent className="intro-y box">
            
              <>
                <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium">
                    Edit Cruise
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
                          Cruise Name
                          <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, at least 2 characters
                          </span>
                        </FormLabel>
                        <FormInput
                          {...register("cruiseNo")}
                          id="validation-form-1"
                          type="text"
                          name="cruiseNo"
                          className={clsx({
                            "border-danger": errors.cruiseNo,
                          })}
                          placeholder="Cruise Name"
                        />
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
                          Departure From
                          <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, at least 2 characters
                          </span>
                        </FormLabel>
                        <FormInput
                          {...register("departure")}
                          id="validation-form-1"
                          type="text"
                          name="departure"
                          className={clsx({
                            "border-danger": errors.departure,
                          })}
                          placeholder="Cruise Name"
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
                      
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >Departure Time : {data.departureTime}
                        </FormLabel>
                        <div className="grid-cols-4 gap-2 sm:grid">
                      <FormSelect
                        {...register("dptHour")}
                        id="validation-form-1"
                        name="dptHour"
                        value={dptHour} 
                        className="mt-2 sm:mr-2"
                        aria-label="Default select example"
                      >
                      <option value=""> Hours </option>
                          {[...Array(24)].map((x, i) =>
                                <option value={i+1}>{i+1}</option>
                              )}
                      </FormSelect>
                      <FormSelect
                      {...register("dptMin")}
                      id="validation-form-1"
                      name="dptMin"
                      value={dptMin} 
                      className="mt-2 sm:mr-2"
                      aria-label="Default select example"
                      >
                      <option value=""> Minutes </option>
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
                        >Arrival Time : {data.arrivalTime}
                        </FormLabel>
                        <div className="grid-cols-4 gap-2 sm:grid">
                      <FormSelect
                        {...register("arrHour")}
                        id="validation-form-1"
                        name="arrHour"
                        value={arrHour} 
                        className="mt-2 sm:mr-2"
                        aria-label="Default select example" 
                      >
                      <option value=""> Hours </option>
                          {[...Array(24)].map((x, i) =>
                                <option value={i+1}>{i+1}</option>
                              )}
                      </FormSelect>
                      <FormSelect
                        {...register("arrMin")}
                        id="validation-form-1"
                        name="arrMin"
                        value={arrMin} 
                        className="mt-2 sm:mr-2"
                        aria-label="Default select example"
                      >
                      <option value=""> Minutes </option>
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
                        >
                          Status
                        </FormLabel>
                        <FormSelect 
                          {...register("isActive")}
                          className="mt-2 sm:mr-2" 
                          aria-label="Default select example">
                                <option value="Y">Active</option>
                                <option value="N">Inactive</option>
                        </FormSelect>
                      </div>
                      <Button variant="primary" type="submit" className="mt-5 w-24 mr-1">
                        Update
                      </Button>
                      <Link to="/super-cruise">
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
        </div>
      </div>
    </>
  );
}

export default editCruise;
