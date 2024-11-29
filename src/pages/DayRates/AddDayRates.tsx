// @ts-nocheck
import { useState, useEffect } from "react";
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
  import Alert from "../../base-components/Alert";
  import Notification from "../../base-components/Notification";
  import Lucide from "../../base-components/Lucide";
  import { useForm } from "react-hook-form";
  import Toastify from "toastify-js";
  import clsx from "clsx";
  import { yupResolver } from "@hookform/resolvers/yup";
  import * as yup from "yup";
  import React from "react";
  import { Link, useParams, useNavigate } from "react-router-dom";
  import { useAppDispatch, useAppSelector } from "../../stores/hooks";
  import { uploadGalleryImage, viewGallery, deleteImage } from "./ItinerarySlice";
  import api from "../../../apiconfig.json";
  import axios from "axios";
  
  import Calendar from "../../elements/calendar"

  const addDayRates = () => {  
    const navigate = useNavigate();  
    const params = useParams();
  
    return (
      <>
        <div className="flex items-center mt-8 intro-y">
          <h2 className="mr-auto text-lg font-medium">Manage Day Wise Rates</h2>
          <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
                    
                        <Button onClick={() => navigate(-1)} variant="secondary" type="button" className="ml-3 mr-0">
                            <Lucide icon="ChevronsLeft" className="w-4 h-4 mr-2" /> Back
                        </Button>
                    
                </div>
        </div>
        <div className="grid grid-cols-12 gap-6 mt-5">
          <div className="col-span-12 intro-y lg:col-span-12">
            
            <Calendar month={params.month} year={params.year} rateFor={params.rateFor} itemType={params.itemType} itemId={params.itemId} />
          </div>
        </div>

      </>)
  }
  
  export default addDayRates;