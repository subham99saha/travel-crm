// @ts-nocheck
import _ from "lodash";
import { useState, useEffect,useRef } from "react";
import fakerData from "../../utils/faker";
import Button from "../../base-components/Button";
import { FormSwitch } from "../../base-components/Form";
import Progress from "../../base-components/Progress";
import TinySlider, {
  TinySliderElement,
} from "../../base-components/TinySlider";
import Lucide from "../../base-components/Lucide";
import FileIcon from "../../base-components/FileIcon";
import { Menu, Tab } from "../../base-components/Headless";
import { Tab as HeadlessTab } from "@headlessui/react";
import { getVendor } from "../Vendor/vendorSlice";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../stores/hooks";
import api from "../../../apiconfig.json";

const showBBClient = ()=>{
  const server = api.API_URL;
  const imgaePath = `${server}images/activity/`;
  const params = useParams();
  const dispatch = useAppDispatch();

  const { data } = useAppSelector((state) => state.vendor);
  useEffect(()=>{
    dispatch(getVendor(params.id));
  },[]);

  console.log(data);

  const newProductsRef = useRef<TinySliderElement>();
  const newAuthorsRef = useRef<TinySliderElement>();

  const prevNewProducts = () => {
    newProductsRef.current?.tns.goTo("prev");
  };
  const nextNewProducts = () => {
    newProductsRef.current?.tns.goTo("next");
  };
  const prevNewAuthors = () => {
    newAuthorsRef.current?.tns.goTo("prev");
  };
  const nextNewAuthors = () => {
    newAuthorsRef.current?.tns.goTo("next");
  };

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Profile</h2>
        <Link to="/client-bb">
            <Button variant="secondary" type="button" className="mt-5 w-24 mr-1">
              Back
            </Button>
        </Link>
      </div>
      <Tab.Group>
        {/* BEGIN: Profile Info */}
        <div className="px-5 pt-5 mt-5 intro-y box">
          <div className="flex flex-col pb-5 -mx-5 border-b lg:flex-row border-slate-200/60 dark:border-darkmode-400">
            <div className="flex items-center justify-center flex-1 px-5 lg:justify-start">
              <div className="relative flex-none w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 image-fit">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="rounded-full"
                  src={`${api.FILE_PATH}${data.vOfficePic?`vendor/${data.vOfficePic}`:`No_image_available.png`}`}/>
              </div>
              <div className="ml-5">
                <div className="w-100 text-lg font-medium truncate sm:w-100 sm:whitespace-normal">
                  {data.vName}
                </div>
                {data.vOwnerName?
                <div className="text-slate-500">
                  Owner Name: <b>{data.vOwnerName}</b>
                </div>
                :''}
                <div className="text-slate-500">
                  CP: <b>{data.contactPerson}</b>
                </div>
              </div>
            </div>
            <div className="flex-1 px-5 pt-5 mt-6 border-t border-l border-r lg:mt-0 border-slate-200/60 dark:border-darkmode-400 lg:border-t-0 lg:pt-0">
              <div className="font-medium text-center lg:text-left lg:mt-3">
                Contact Details
              </div>
              <div className="flex flex-col items-center justify-center mt-4 lg:items-start">
                <div className="flex items-center truncate sm:whitespace-normal">
                  <Lucide icon="Mail" className="w-4 h-4 mr-2" />
                  {data.vEmail}{data.vAlternateEmail?`, ${data.vAlternateEmail}`:''}
                </div>
                <div className="flex items-center mt-3 truncate sm:whitespace-normal">
                  <Lucide icon="Phone" className="w-4 h-4 mr-2" /> 
                  {data.vMobile}{data.vAlternateNo?`, ${data.vAlternateNo}`:''}
                </div>
                <div className="flex items-center mt-3 truncate sm:whitespace-normal">
                  <Lucide icon="MessageCircle" className="w-4 h-4 mr-2" />
                  {data.vWhatsapp}
                </div>
                <div className="flex items-center mt-3 truncate sm:whitespace-normal">
                  <Lucide icon="Cloud" className="w-4 h-4 mr-2" /> 
                  {data.vWebsite?data.vWebsite:'NA'}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center flex-1 px-5 pt-5 mt-6 border-t lg:mt-0 lg:border-0 border-slate-200/60 dark:border-darkmode-400 lg:pt-0">
              <div className="w-20 py-3 text-center rounded-md">
                <div className="text-xl font-medium text-primary">201</div>
                <div className="text-slate-500">Leads</div>
              </div>
              <div className="w-20 py-3 text-center rounded-md">
                <div className="text-xl font-medium text-primary">1k</div>
                <div className="text-slate-500">Business</div>
              </div>
              <div className="w-20 py-3 text-center rounded-md">
                <div className="text-xl font-medium text-primary">492</div>
                <div className="text-slate-500">Reviews</div>
              </div>
            </div>
          </div>
          <Tab.List
            variant="link-tabs"
            className="flex-col justify-center text-center sm:flex-row lg:justify-start"
          >
            <Tab fullWidth={false}>
              <Tab.Button className="flex items-center py-4 cursor-pointer">
                <Lucide icon="User" className="w-4 h-4 mr-2" /> Profile
              </Tab.Button>
            </Tab>
            <Tab fullWidth={false}>
              <Tab.Button className="flex items-center py-4 cursor-pointer">
                <Lucide icon="Shield" className="w-4 h-4 mr-2" /> Account
              </Tab.Button>
            </Tab>
            <Tab fullWidth={false}>
              <Tab.Button className="flex items-center py-4 cursor-pointer">
                <Lucide icon="Lock" className="w-4 h-4 mr-2" /> Change Password
              </Tab.Button>
            </Tab>
            <Tab fullWidth={false}>
              <Tab.Button className="flex items-center py-4 cursor-pointer">
                <Lucide icon="Settings" className="w-4 h-4 mr-2" /> Settings
              </Tab.Button>
            </Tab>
          </Tab.List>
        </div>
        {/* END: Profile Info */}
        <Tab.Panels className="mt-5">
          <Tab.Panel>
            <div className="grid grid-cols-12 gap-6">
              {/* BEGIN: Latest Uploads */}
              <div className="col-span-12 intro-y box lg:col-span-6">
                <div className="flex items-center px-5 py-5 border-b sm:py-3 border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium">
                    Client Address & Bank Details
                  </h2>
                </div>
                <div className="p-5">
                    <div>
                      <div className="text-base text-slate-500">Address</div>
                      <div className="mt-2 text-lg font-medium text-primary">
                        {data.vName}
                      </div>
                      <div className="mt-1">{data.vAddress}</div>
                      <div className="mt-1">
                      Pincode : {data.vPincode}, City: {data.cityId}, State: {data.stateId}
                      </div>
                      <div className="mt-1">Region: {data.vRegion?data.vRegion:'NA'}</div>
                      <div className="mt-1">Location: {data.gMapLocation?data.gMapLocation:'NA'}</div>
                    </div>
                    <div className="mt-4">
                      <div className="text-base text-slate-500">Bank Details</div>
                      <div className="mt-2 text-lg font-medium text-primary">
                        Bank Name: {data.vBankName?data.vBankName:'NA'}
                      </div>
                      <div className="mt-1">AC Name: {data.vAccountName?data.vAccountName:'NA'}</div>
                      <div className="mt-1">AC No: {data.vACNO?data.vACNO:'NA'}</div>
                      <div className="mt-1">Branch: {data.vBranch?data.vBranch:'NA'}</div>
                      <div className="mt-1">IFC: {data.vIFSC?data.vIFSC:'NA'}</div>
                      <div className="mt-1">MICR: {data.vMICR?data.vMICR:'NA'}</div>
                    </div>
                </div>
              </div>
              {/* END: Latest Uploads */}
              
              {/* BEGIN: Daily Sales */}
               <div className="col-span-12 intro-y box lg:col-span-6">
                <div className="flex items-center px-5 py-5 border-b sm:py-3 border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium">Documents</h2>
                  {/* <Button
                    variant="outline-secondary"
                    className="hidden sm:flex"
                  > */}
                  <Link to={`/upload-doc-bb/${params.id}`}>
                     Upload Doc
                  </Link>
                  {/* </Button> */}
                </div>
                <div className="p-5">
                  <div className="relative flex items-center">
                    <div className="ml-4 mr-auto">
                      PAN : <span className="mt-2 font-medium text-primary">{data.vPan?data.vPan:'NA'}</span>
                    </div>
                    <div className="font-medium text-slate-600 dark:text-slate-500">
                    {data.vPanFile?
                      <a href={`${api.FILE_PATH}vendor/${data.vPanFile}`} target="_blank" className="font-medium">
                        View
                      </a>
                    :'NA'}
                    </div>
                  </div>
                  <div className="relative flex items-center mt-5">
                    
                    <div className="ml-4 mr-auto">
                        AADHAAR FRONT
                    </div>
                    <div className="font-medium text-slate-600 dark:text-slate-500">
                    {data.vAadhaarFileF?
                      <a href={`${api.FILE_PATH}vendor/${data.vAadhaarFileF}`} target="_blank" className="font-medium">
                        View
                      </a>
                    :'NA'}
                    </div>
                  </div>
                  <div className="relative flex items-center mt-5">
                    <div className="ml-4 mr-auto">
                        AADHAAR BACK
                    </div>
                    <div className="font-medium text-slate-600 dark:text-slate-500">
                    {data.vAadhaarFileB?
                    <a href={`${api.FILE_PATH}vendor/${data.vAadhaarFileB}`} target="_blank" className="font-medium">
                        View
                      </a>
                    :'NA'} 
                    </div>
                  </div>
                  <div className="relative flex items-center mt-5">
                    <div className="ml-4 mr-auto">
                      CANCEL CHEQUE  
                    </div>
                    <div className="font-medium text-slate-600 dark:text-slate-500">
                    {data.vCancelCheque?
                    <a href={`${api.FILE_PATH}vendor/${data.vCancelCheque}`} target="_blank" className="font-medium">
                        View
                      </a>
                     :'NA'}
                    </div>
                  </div>
                  <div className="relative flex items-center mt-5"> 
                    <div className="ml-4 mr-auto">
                      BANK STATEMENT
                    </div>
                    <div className="font-medium text-slate-600 dark:text-slate-500">
                    {data.vBankStatement?
                      <a href={`${api.FILE_PATH}vendor/${data.vBankStatement}`} target="_blank" className="font-medium">
                      View
                      </a>
                    :'NA'}
                    </div>
                  </div>
                  <div className="relative flex items-center mt-5">
                    
                    <div className="ml-4 mr-auto">
                      GSTN : <span className="mt-2 font-medium text-primary">{data.vGSTNNo?data.vGSTNNo:'NA'}</span>
                    </div>
                    <div className="font-medium text-slate-600 dark:text-slate-500">
                    {data.vGSTNFile?
                    <a href={`${api.FILE_PATH}vendor/${data.vGSTNFile}`} target="_blank" className="font-medium">
                      View
                     </a>
                    :'NA'}
                    </div>
                  </div>
                  <div className="relative flex items-center mt-5">
                    
                    <div className="ml-4 mr-auto">
                      TRADE LICENSE
                    </div>
                    <div className="font-medium text-slate-600 dark:text-slate-500">
                      {data.vTradeLicense?
                        <a href={`${api.FILE_PATH}vendor/${data.vTradeLicense}`} target="_blank" className="font-medium">
                          View
                        </a> 
                      :'NA'}
                    </div>
                  </div>
                  <div className="relative flex items-center mt-5">
                    <div className="ml-4 mr-auto">
                      OFFICE PIC
                    </div>
                    <div className="font-medium text-slate-600 dark:text-slate-500">
                    {data.vOfficePic?
                        <a href={`${api.FILE_PATH}vendor/${data.vOfficePic}`} target="_blank" className="font-medium">
                          View
                        </a> 
                      :'NA'}
                    </div>
                  </div>
                </div>
              </div> 
              {/* END: Daily Sales */}
              
              
              
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
}

export default showBBClient;
