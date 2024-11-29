// @ts-nocheck
import {
  PreviewComponent,
  Preview,
} from "../../base-components/PreviewComponent";
import {
  FormLabel,
  FormInput,
  FormSelect,
  FormTextarea
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
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { createVendorActivity } from "./vendorActivitySlice";
import { fetchAllActivityType } from "../ActivityType/activityTypeSlice";
import { fetchAllVendor } from "../Vendor/vendorSlice";
import { fetchAllCity } from "../City/CitySlice";
import TomSelect from "../../base-components/TomSelect";
import axios from "axios";
import api from "../../../apiconfig.json";


const addActivity = ()=>{
  const dispatch = useAppDispatch();
  const vendor = useAppSelector((state)=> state.vendor);
  const activityTypeData = useAppSelector((state)=> state.activityType);
  const city = useAppSelector((state)=> state.city);

  const [selectVendor, setVendor] = useState(0);
  const [activityType, setactivityType] = useState("");
  const [mainImg, setmainImg] = useState("");
  const [isActive, setisActive] = useState("Y");
  const [currency, setcurrency] = useState("Rs");
  const [startTimeH, setstartTimeH] = useState("00");
  const [startTimeM, setstartTimeM] = useState("00");
  const [endTimeH, setendTimeH] = useState("00");
  const [endTimeM, setendTimeM] = useState("00");
  const [durationH, setdurationH] = useState("00");
  const [durationM, setdurationM] = useState("00");
  const [selectcityId, setcityId] = useState("");

  useEffect(()=>{
    dispatch(fetchAllVendor('activity'));
    dispatch(fetchAllActivityType());
    dispatch(fetchAllCity());
  },[]);

  const schema = yup
    .object({
      activityName: yup.string().required().min(2),
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
        activityType: activityType,
        cityId: selectcityId,
        activityName: getValues('activityName'),
        startTime: `${startTimeH}:${startTimeM}`,
        endTime: `${endTimeH}:${endTimeM}`, 
        duration: durationH,
        durationM: durationM,
        desc: getValues('desc'),
        guideFee: getValues('guideFee'),
        currency: currency,
        adultFee: getValues('adultFee'),
        kidFee: getValues('kidFee'),
        infantFee: getValues('infantFee'),
        paymentDetailsOth: getValues('paymentDetailsOth'),
        // adultFeeOth: getValues('adultFeeOth'),
        // kidFeeOth: getValues('kidFeeOth'),
        // infantFeeOth: getValues('infantFeeOth'),
        isActive: isActive,
        userType: 'V',
        mainImg: mainImg
       } ;
       console.log("Data: ",sendData);
       let formdata = new FormData();
        formdata.append("thumbnail", mainImg);
        formdata.append("sendData", JSON.stringify(sendData));

    console.log(formdata);

    const res = axios.post(`${api.API_URL}${api.API_ENDPOINT.ACTIVITY}`, formdata, {
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

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Manage Activity</h2>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 intro-y lg:col-span-6">
          {/* BEGIN: Form Validation */}
          <PreviewComponent className="intro-y box">
            
              <>
                <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium">
                    Add Activity
                  </h2>
                  <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
                    <Link to="/vendor-activity">
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
                          Activity Type
                        </FormLabel>
                      <TomSelect
                          {...register("activityType")}
                          id="validation-form-1"
                          name="createdBy"
                          value={activityType}
                          onChange={setactivityType}
                          options={{
                            placeholder: "Select Activity Type",
                          }}
                          className="w-full"
                        >
                          <option>Select Activity Type</option>
                          { _.take(activityTypeData.data, activityTypeData.data.length).map((item, Key)=>(
                            <option value={item.activityType}>{item.activityType}</option>
                          )
                            
                          )}
                        </TomSelect>
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Activity City
                         
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
                          Activity Name
                          <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, at least 2 characters
                          </span>
                        </FormLabel>
                        <FormInput
                          {...register("activityName")}
                          id="validation-form-1"
                          type="text"
                          name="activityName"
                          className={clsx({
                            "border-danger": errors.activityName,
                          })}
                          placeholder="Activity Name"
                        />
                        {errors.activityName && (
                          <div className="mt-2 text-danger">
                            {typeof errors.activityName.message === "string" &&
                              errors.activityName.message}
                          </div>
                        )}
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Description
                          <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, at least 2 characters
                          </span>
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
                        >Start Time
                        </FormLabel>
                        <div className="grid-cols-4 gap-2 sm:grid">
                      <FormSelect
                        {...register('startTimeH')}
                        id="startTimeH"
                        onChange={(e)=>setstartTimeH(e.target.value)} 
                      >
                      <option value="00"> Hours </option>
                          {[...Array(24)].map((x, i) =>
                                <option value={i+1}>{i+1}</option>
                              )}
                      </FormSelect>
                      <FormSelect
                        {...register('startTimeM')}
                        id="startTimeM"
                        onChange={(e)=>setstartTimeM(e.target.value)} 
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
                        >End Time
                        </FormLabel>
                        <div className="grid-cols-4 gap-2 sm:grid">
                      <FormSelect
                        {...register('endTimeH')}
                        id="endTimeH"
                        onChange={(e)=>setendTimeH(e.target.value)} 
                      >
                      <option value="00"> Hours </option>
                          {[...Array(24)].map((x, i) =>
                                <option value={i+1}>{i+1}</option>
                              )}
                      </FormSelect>
                      <FormSelect
                        {...register('endTimeM')}
                        id="endTimeM"
                        onChange={(e)=>setendTimeM(e.target.value)} 
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
                        >Duration
                        </FormLabel>
                        <div className="grid-cols-4 gap-2 sm:grid">
                      <FormSelect
                       {...register('durationH')}
                       id="durationH"
                       onChange={(e)=>setdurationH(e.target.value)} 
                      >
                      <option value="00"> Hours </option>
                          {[...Array(10)].map((x, i) =>
                                <option value={i+1}>{i+1}</option>
                              )}
                      </FormSelect>
                      <FormSelect
                        {...register('durationM')}
                        id="durationM"
                        onChange={(e)=>setdurationM(e.target.value)} 
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
                          className="flex flex-col w-full sm:flex-row">
                          Guide Charges (if any)
                        </FormLabel>
                        <FormInput
                          {...register("guideFee")}
                          id="validation-form-1"
                          type="text"
                          name="guideFee"
                          placeholder="Entrance Fee/ Guide etc."
                        />
                      </div>
                      {/* <div className="mt-3 input-form">
                        <div className="grid-cols-4 gap-2 sm:grid">                        
                                        
                          <FormInput
                            {...register("adultFee")}
                            type="text"
                            className="mt-2 sm:mt-0"
                            placeholder="Adult Fee"
                          />
                          <FormInput
                            {...register("kidFee")}
                            type="text"
                            className="mt-2 sm:mt-0"
                            placeholder="Kid Fee"
                          />
                          <FormInput
                            {...register("infantFee")}
                            type="text"
                            className="mt-2 sm:mt-0"
                            placeholder="Infant Fee"
                          />
                        </div>
                      </div> */}
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row">
                          Payable For Others
                        </FormLabel>
                        <FormInput
                          {...register("paymentDetailsOth")}
                          id="validation-form-1"
                          type="text"
                          name="paymentDetailsOth"
                          placeholder="Others Fees and Charges"
                        />
                      </div>
                      <div className="mt-3 input-form">
                        <div className="grid-cols-4 gap-2 sm:grid">                        
                          {/* <FormSelect 
                              {...register("currency")}
                              className="mt-2 sm:mt-0"
                              onChange={(e)=>setcurrency(e.target.value)} 
                              aria-label="Default select example">
                                    <option value="RS">RS.</option>
                                    <option value="USD">USD</option>
                            </FormSelect> */}
                          
                          <FormInput
                            {...register("adultFee")}
                            type="text"
                            className="mt-2 sm:mt-0"
                            placeholder="Adult Fee"
                          />
                          <FormInput
                            {...register("kidFee")}
                            type="text"
                            className="mt-2 sm:mt-0"
                            placeholder="Kid Fee"
                          />
                          <FormInput
                            {...register("infantFee")}
                            type="text"
                            className="mt-2 sm:mt-0"
                            placeholder="Infant Fee"
                          />
                        </div>
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
                          className="mt-2 sm:mr-2" 
                          aria-label="Default select example"
                          onChange={(e)=>setisActive(e.target.value)}
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
                      <Link to="/vendor-activity">
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

export default addActivity;

