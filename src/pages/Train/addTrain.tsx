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
import { createTrain } from "./trainSlice";
import TomSelect from "../../base-components/TomSelect";
import { fetchAllCity } from "../City/CitySlice";
import _ from "lodash";





const addTrain = ()=>{
  

  const [selectDptCity, setSelectDptCity] = useState("");
  const [selectDstCity, setSelectDstCity] = useState("");
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.city);

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
        trainNo: event.target[1].value,
        departureCityId: event.target[2].value,
        destinationCityId: event.target[6].value,
        departureTime: `${event.target[10].value}:${event.target[11].value}`,
        arrivalTime: `${event.target[12].value}:${event.target[13].value}`,
        isActive: event.target[14].value,
        // t0: event.target[0].value,
        // t1: event.target[1].value,
        // t2: event.target[2].value,DCI
        // t3: event.target[3].value,DCI
        // t4: event.target[4].value,
        // t5: event.target[5].value,
        // t6: event.target[6].value,ARI
        // t7: event.target[7].value,ARI
        // t8: event.target[8].value,
        // t9: event.target[9].value,
        // t10: event.target[10].value,
        // t11: event.target[11].value,
        // t12: event.target[12].value,
        // t13: event.target[13].value,
        // t14: event.target[14].value,
        // t0: event.target[0].value,
        // t0: event.target[0].value,
        // t0: event.target[0].value,
       } ;
       console.log("Data: ",formData);
      dispatch(createTrain(formData));
       reset({
        createdBy: "",
        trainNo: "",
        departureCityId: "",
        destinationCityId: "",
        dptHour: "",
        dptMin:"",
        ArrHour:"",
        ArrMin: "",
        arrivalTime: "",
        isActive: "Y",
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
        <h2 className="mr-auto text-lg font-medium">Manage Train</h2>
        
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
                        id="validation-form-1"
                        name="dptHour"
                        className="mt-2 sm:mr-2"
                        aria-label="Default select example"
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
                        Save
                      </Button>
                      <Link to="/super-train">
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

