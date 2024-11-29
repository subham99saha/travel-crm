// @ts-nocheck
import _ from "lodash";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import fakerData from "../../utils/faker";
import Button from "../../base-components/Button";
import Notification from "../../base-components/Notification";
import Toastify from "toastify-js";
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
} from "../../base-components/Form";
import TomSelect from "../../base-components/TomSelect";
import { ClassicEditor } from "../../base-components/Ckeditor";
import Alert from "../../base-components/Alert";
import Lucide from "../../base-components/Lucide";
import Tippy from "../../base-components/Tippy";
import Table from "../../base-components/Table";
import { useAppSelector, useAppDispatch } from "../../stores/hooks";
import { fetchAllCity } from "../City/CitySlice";
import { fetchAllState } from "../State/StateSlice";
import axios from "axios";
import api from "../../../apiconfig.json";



const uploadDocBB = ()=>{
  const server = api.API_URL;
  const params = useParams();
  const [panDoc, setpanDoc] = useState('');
  const [aadhaarFDoc, setaadhaarFDoc] = useState('');
  const [aadhaarBDoc, setaadhaarBDoc] = useState('');
  const [cancelCDoc, setcancelCDoc] = useState('');
  const [bankStatDoc, setbankStatDoc] = useState('');
  const [gstnDoc, setgstnDoc] = useState('');
  const [tradeLDoc, settradeLDoc] = useState('');
  const [officePic, setofficePicDoc] = useState('');

  const dispatch = useAppDispatch();
  const city  = useAppSelector((state) => state.city);
  useEffect(()=>{
    dispatch(fetchAllCity());
},[]);  

const state  = useAppSelector((state) => state.state);
  useEffect(()=>{
    dispatch(fetchAllState());
},[]); 


const schema = yup
    .object({
      vName: yup.string().required("Name is a required field").min(2),
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

const handleClick = (type)=>{
  console.log("Type: ",type)
  let isFile = false;
  let fileName = '';
  switch(type) {
    case 'pan':
      if(panDoc=='') { 
        alert("Please select Pan file");
        isFile = false; 
      }else{
        isFile = true;
        fileName = panDoc;
      }
      
      break;
    case 'aadhaarF':
      if(aadhaarFDoc=='') { 
        alert("Please select Aadhaar front file");
        isFile = false; 
      }else{
        isFile = true;
        fileName = aadhaarFDoc;
      }
      break;
      case 'aadhaarB':
      if(aadhaarBDoc=='') { 
        alert("Please select Aadhaar Back file");
        isFile = false; 
      }else{
        isFile = true;
        fileName = aadhaarBDoc;
      }
      break;
      case 'cancelC':
      if(cancelCDoc=='') { 
        alert("Please select Cancel Cheque file");
        isFile = false; 
      }else{
        isFile = true;
        fileName = cancelCDoc;
      }
      break;
      case 'bankStat':
      if(bankStatDoc=='') { 
        alert("Please select Bank Statement file");
        isFile = false; 
      }else{
        isFile = true;
        fileName = bankStatDoc;
      }
      break;
      case 'gstn':
      if(gstnDoc=='') { 
        alert("Please select GSTN file");
        isFile = false; 
      }else{
        isFile = true;
        fileName = gstnDoc;
      }
      break;
      case 'tradeL':
      if(tradeLDoc=='') { 
        alert("Please select GSTN file");
        isFile = false; 
      }else{
        isFile = true;
        fileName = tradeLDoc;
      }
      break;
      case 'officeP':
      if(officePic=='') { 
        alert("Please select Office Picture");
        isFile = false; 
      }else{
        isFile = true;
        fileName = officePic;
      }
      break;
  }
  console.log(fileName)
  if(isFile){
    let formdata = new FormData();
    formdata.append("thumbnail", fileName);
    formdata.append("fileType", type);
    formdata.append("id", params.id);

    console.log(formdata);

    const res = axios.post(`${server}vendor-master/upload-image`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(function (response) {
      alert("File Uploaded Successfully");
    })
    .catch(function (error) {
      console.log(error);
      alert("File Not Uploaded");
    });
  }
}


  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Upload Vendor Document</h2>
      </div>
      <form className="validate-form">
        <div className="grid grid-cols-11 pb-20 mt-5 gap-x-6">
          <div className="col-span-11 intro-y 2xl:col-span-9">
            {/* BEGIN: Personal Information */}
            <div className="p-5 mt-5 intro-y box">
              <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
                <div className="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                  <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Document
                </div>
                <div className="mt-5">
                <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                  <FormLabel className="xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">PAN</div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                      </div>
                      <div className="mt-3 text-xs leading-relaxed text-slate-500">
                      Upload your PAN card image, format in jpeg, jpg, gif and pdf.
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <div className="grid-cols-4 gap-2 sm:grid">
                    <FormInput
                        {...register("vPanFile")}
                        id="vPanFile"
                        type="file"
                        className="mt-3 sm:mt-0"
                        onChange={(e) => setpanDoc(e.target.files[0])}
                      />
                      <Button type="button" onClick={()=>handleClick('pan')} variant="primary" className="mt-2 sm:mt-0">
                        Upload
                      </Button>
                    </div>
                  </div>
                </FormInline>
                <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                  <FormLabel className="xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">AADHAAR FRONT</div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                      </div>
                      <div className="mt-3 text-xs leading-relaxed text-slate-500">
                      Upload your AADHAAR card front image, format in jpeg, jpg, gif and pdf.
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <div className="grid-cols-4 gap-2 sm:grid">
                    <FormInput
                        {...register("vAadhaarFileF")}
                        id="vAadhaarFileF"
                        type="file"
                        className="mt-3 sm:mt-0"
                        onChange={(e) => setaadhaarFDoc(e.target.files[0])}
                      />
                      <Button type="button" onClick={()=>handleClick('aadhaarF')} variant="primary" className="mt-2 sm:mt-0">
                        Upload
                      </Button>
                    </div>
                  </div>
                </FormInline>
                <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                  <FormLabel className="xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">AADHAAR BACK</div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                      </div>
                      <div className="mt-3 text-xs leading-relaxed text-slate-500">
                      Upload your AADHAAR card back image, format in jpeg, jpg, gif and pdf.
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <div className="grid-cols-4 gap-2 sm:grid">
                    <FormInput
                        {...register("vAadhaarFileB")}
                        id="vAadhaarFileB"
                        type="file"
                        className="mt-3 sm:mt-0"
                        onChange={(e) => setaadhaarBDoc(e.target.files[0])}
                      />
                      <Button type="button" onClick={()=>handleClick('aadhaarB')} variant="primary" className="mt-2 sm:mt-0">
                        Upload
                      </Button>
                    </div>
                  </div>
                </FormInline>
                <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                  <FormLabel className="xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">CANCEL CHEQUE</div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                      </div>
                      <div className="mt-3 text-xs leading-relaxed text-slate-500">
                      Upload your CANCEL CHEQUE image, format in jpeg, jpg, gif and pdf.
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <div className="grid-cols-4 gap-2 sm:grid">
                    <FormInput
                        {...register("vCancelCheque")}
                        id="vCancelCheque"
                        type="file"
                        className="mt-3 sm:mt-0"
                        onChange={(e) => setcancelCDoc(e.target.files[0])}
                      />
                      <Button type="button" onClick={()=>handleClick('cancelC')} variant="primary" className="mt-2 sm:mt-0">
                        Upload
                      </Button>
                    </div>
                  </div>
                </FormInline>
                <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                  <FormLabel className="xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">BANK STATEMENT</div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                      </div>
                      <div className="mt-3 text-xs leading-relaxed text-slate-500">
                      Upload your BANK STATEMENT (recent) image, format in jpeg, jpg, gif and pdf.
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <div className="grid-cols-4 gap-2 sm:grid">
                    <FormInput
                        {...register("vBankStatement")}
                        id="vBankStatement"
                        type="file"
                        className="mt-3 sm:mt-0"
                        onChange={(e) => setbankStatDoc(e.target.files[0])}
                      />
                      <Button type="button" onClick={()=>handleClick('bankStat')} variant="primary" className="mt-2 sm:mt-0">
                        Upload
                      </Button>
                    </div>
                  </div>
                </FormInline>
                <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                  <FormLabel className="xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">GSTN FILE</div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                      </div>
                      <div className="mt-3 text-xs leading-relaxed text-slate-500">
                      Upload your GSTN number image, format in jpeg, jpg, gif and pdf.
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <div className="grid-cols-4 gap-2 sm:grid">
                    <FormInput
                        {...register("vGSTNFile")}
                        id="vGSTNFile"
                        type="file"
                        className="mt-3 sm:mt-0"
                        onChange={(e) => setgstnDoc(e.target.files[0])}
                      />
                      <Button type="button" onClick={()=>handleClick('gstn')} variant="primary" className="mt-2 sm:mt-0">
                        Upload
                      </Button>
                    </div>
                  </div>
                </FormInline>
                <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                  <FormLabel className="xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">TRADE LICENSE</div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                      </div>
                      <div className="mt-3 text-xs leading-relaxed text-slate-500">
                      Upload your TRADE LICENSE image, format in jpeg, jpg, gif and pdf.
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <div className="grid-cols-4 gap-2 sm:grid">
                    <FormInput
                        {...register("vTradeLicense")}
                        id="vTradeLicense"
                        type="file"
                        className="mt-3 sm:mt-0"
                        onChange={(e) => settradeLDoc(e.target.files[0])}
                      />
                      <Button type="button" onClick={()=>handleClick('tradeL')} variant="primary" className="mt-2 sm:mt-0">
                        Upload
                      </Button>
                    </div>
                  </div>
                </FormInline>
                <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                  <FormLabel className="xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">OFFICE PIC</div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                      </div>
                      <div className="mt-3 text-xs leading-relaxed text-slate-500">
                      Upload your OFFICE PIC image, format in jpeg, jpg, gif and pdf.
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <div className="grid-cols-4 gap-2 sm:grid">
                    <FormInput
                        {...register("vOfficePic")}
                        id="vOfficePic"
                        type="file"
                        className="mt-3 sm:mt-0"
                        onChange={(e) => setofficePicDoc(e.target.files[0])}
                      />
                      <Button type="button" onClick={()=>handleClick('officeP')} variant="primary" className="mt-2 sm:mt-0">
                        Upload
                      </Button>
                    </div>
                  </div>
                </FormInline>
                </div>
              </div>
            </div>
            {/* END: Personal Information */}           
            <div className="flex flex-col justify-end gap-2 mt-5 md:flex-row">
            <Button
                variant="primary"
                type="submit"
                className="w-full py-3 md:w-52"
              >
                Save
              </Button>
              <Link to="/client-bb">
              <Button
                type="button"
                className="w-full py-3 border-slate-300 dark:border-darkmode-400 text-slate-500 md:w-52"
              >
                Back
              </Button>
              </Link>
              {/* <Button
                type="button"
                className="w-full py-3 border-slate-300 dark:border-darkmode-400 text-slate-500 md:w-52"
              >
                Save & Add New Product
              </Button> */}
            </div>
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

export default uploadDocBB;
