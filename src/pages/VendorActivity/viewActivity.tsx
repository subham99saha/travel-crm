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
  import fakerData from "../../utils/faker";
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
  import { getVendorActivity } from "./vendorActivitySlice";
  import { fetchAllVendor } from "../Vendor/vendorSlice";
  import api from "../../../apiconfig.json";
  
  
  const viewActivity = ()=>{
    const server = api.API_URL;
    const imgaePath = `${server}images/activity/`;
    const params = useParams();
    const dispatch = useAppDispatch();
    const {data} = useAppSelector((state)=> state.vendorActivity);
  
    useEffect(()=>{
      dispatch(getVendorActivity(params.id));
    },[]);
   
    console.log(data);
  
    return (
      <>
        <div className="flex items-center mt-8 intro-y">
          <h2 className="mr-auto text-lg font-medium">Manage Activity</h2>
          <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
                    <Link to="/vendor-activity">
                        <Button variant="secondary" type="button" className="ml-3 mr-0">
                        <Lucide icon="ChevronsLeft" className="w-4 h-4 mr-2" /> Back
                        </Button>
                    </Link>
        </div>
        </div>
        {/* BEGIN: Profile Info */}
        <div className="px-5 pt-5 mt-5 intro-y box">
          <div className="flex flex-col pb-5 -mx-5 border-b lg:flex-row border-slate-200/60 dark:border-darkmode-400">
            <div className="flex items-center justify-center flex-1 px-5 lg:justify-start">
              <div className="relative flex-none w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 image-fit">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="rounded-md"
                  src={imgaePath+data.mainImg}
                />
              </div>
              <div className="ml-5">
                <div className="w-24 text-lg font-medium truncate sm:w-40 sm:whitespace-normal">
                  {data.activityName}
                </div>
                <div className="text-slate-500">{data.activityType}</div>
              </div>
            </div>
            <div className="flex-1 px-5 pt-5 mt-6 border-t border-l border-r lg:mt-0 border-slate-200/60 dark:border-darkmode-400 lg:border-t-0 lg:pt-0">
              <div className="font-medium text-center lg:text-left lg:mt-3">
                Details
              </div>
              <div className="flex flex-col items-center justify-center mt-4 lg:items-start">
                {data.desc}
              </div>
            </div>
            <div className="flex items-center justify-center flex-1 px-5 pt-5 mt-6 border-t lg:mt-0 lg:border-0 border-slate-200/60 dark:border-darkmode-400 lg:pt-0">
            <div className="mt-5 text-slate-600 dark:text-slate-500">
                  {
                    data.adultFee &&  
                  <div className="flex items-center">
                    <Lucide icon="Link" className="w-4 h-4 mr-2" /> Adult Fees: {data.currency}{data.adultFee}
                  </div>
                  }
                  {
                    data.kidFee &&  
                  <div className="flex items-center">
                    <Lucide icon="Link" className="w-4 h-4 mr-2" /> Kid Fees: {data.currency}{data.kidFee}
                  </div>
                  }
                  {
                    data.infantFee &&  
                  <div className="flex items-center">
                    <Lucide icon="Link" className="w-4 h-4 mr-2" /> Infant Fees: {data.currency}{data.infantFee}
                  </div>
                  }
                  <div className="flex items-center mt-2">
                    <Lucide icon="Layers" className="w-4 h-4 mr-2" /> Start Time: {data.startTime}
                  </div>
                  <div className="flex items-center mt-2">
                    <Lucide icon="Layers" className="w-4 h-4 mr-2" /> Duration: {data.duration}
                  </div>
                  <div 
                  className={clsx([
                    "flex items-center mt-2",
                    { "text-success":  (data.isActive==='Y' ? true : false) },
                    { "text-danger": ! (data.isActive==='Y' ? true : false) },
                  ])} 
                  >
                    <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
                    Status: {data.isActive=='Y' ? "Active" : "Inactive"}
                  </div>
                </div>
            </div>
          </div>
        </div>
        {/* END: Profile Info */}
      </>
    );
  }
  
  export default viewActivity;
  
  