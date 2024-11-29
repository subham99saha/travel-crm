// @ts-nocheck
import _ from "lodash";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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
} from "../../base-components/Form";
import TomSelect from "../../base-components/TomSelect";
import { ClassicEditor } from "../../base-components/Ckeditor";
import Alert from "../../base-components/Alert";
import Lucide from "../../base-components/Lucide";
import { useAppSelector, useAppDispatch } from "../../stores/hooks";
import { fetchAllCity } from "../City/CitySlice";
import { fetchAllClient } from "../Client/clientSlice";
import { fetchAllItinerary } from "../Itinerary/ItinerarySlice";
import api from "../../../apiconfig.json";
import axios from "axios";

const proposal = ()=>{

const [chkAll, setChkAll] = useState(false);
const [chkBB, setChkBB] = useState(false);
const [chkBC, setChkBC] = useState(false);
const [chkCor, setChkCor] = useState(false);

const [selectBC, setSelectBC] = useState("");
const [selectBB, setSelectBB] = useState("");
const [selectCor, setSelectCor] = useState("");

const [editorData, setEditorData] = useState("");
const [attacheFile, setAttacheFile] = useState('');

  const dispatch = useAppDispatch();

  const { data } = useAppSelector((state)=>state.client);
  const itinerary = useAppSelector((state)=>state.itinerary);

  
  useEffect(()=>{
    dispatch(fetchAllCity());
    dispatch(fetchAllItinerary());
    dispatch(fetchAllClient());
},[]);  
//console.log("Client: ",data); 
//console.log(clientBB); 
//console.log(clientCor); 



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
  handleSubmit
} = useForm({
  mode: "onChange",
  resolver: yupResolver(schema),
});

const onSave = (type: any)=>{
  const sendProposalTo = {
    all : chkAll,
    bc : chkBC,
    bb: chkBB,
    cor: chkCor
  }
  const savaData = {
    sendProposalTo : {
                      all : chkAll,
                      bc : chkBC,
                      bb: chkBB,
                      cor: chkCor
                    },
    bcEmail: selectBC,
    bbEmail: selectBB,
    corEmail: selectCor,
    otherEmail: getValues('guestClient'),
    subject: getValues("subject"),
    body: editorData,
    itinerary: attacheFile,
    isDraft: type
  }

  console.log("Test: ", savaData);

 // let formdata = new FormData();
//   formdata.append("sendData", JSON.stringify(savaData));
let sendData = JSON.stringify(savaData);

    console.log(sendData);

    const res = axios.post(`${api.API_URL}${api.API_ENDPOINT.SEND_PROPOSAL}/send-proposal`, sendData, {
      headers: {
        'Content-Type': 'application/json',
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



const onCheckboxHandler = ()=>{   
    setChkAll(!chkAll);
    setChkBB(false);
    setChkBC(false);
    setChkCor(false);
    setSelectBC("");
    setSelectBB("");
    setSelectCor("");
}

  return (
    <>
      <div className="flex items-center mt-8 mb-5 ml-2 intro-y">
        <h2 className="mr-auto text-lg font-medium">Create and Send Proposal</h2>
      </div>
      <form className="validate-form" >
        <div className="grid grid-cols-11 pb-20 mt-5 gap-x-6">
          <div className="col-span-11 intro-y 2xl:col-span-9">
            {/* BEGIN: Sender Information */}
            <div className="p-5 intro-y box">
              <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
                <div className="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                  <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" />Sender Info
                </div>
                
                <div className="mt-5">
                  <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                    <FormLabel className="xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Send Proposla To</div>
                          <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                        </div>
                        <div className="mt-3 text-xs leading-relaxed text-slate-500">
                          Can send to All or B2C, B2B and Corporate.
                        </div>
                      </div>
                    </FormLabel>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                    <div className="flex flex-col mt-2 sm:flex-row">
        <FormCheck className="mr-2">
            <FormCheck.Input id="checkbox-switch-4" type="checkbox" value="All" checked={chkAll} onChange={onCheckboxHandler} />
            <FormCheck.Label htmlFor="checkbox-switch-4" >
                All
            </FormCheck.Label>
        </FormCheck>
        <FormCheck className="mt-2 mr-2 sm:mt-0">
            <FormCheck.Input id="checkbox-switch-5" type="checkbox" value="BC" checked={chkBC} onChange={(e)=>{setChkBC(!chkBC); setChkAll(false);}} />
            <FormCheck.Label htmlFor="checkbox-switch-5">
                B2C
            </FormCheck.Label>
        </FormCheck>
        <FormCheck className="mt-2 mr-2 sm:mt-0">
            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" checked={chkBB} onChange={(e)=>{setChkBB(!chkBB); setChkAll(false);}} />
            <FormCheck.Label htmlFor="checkbox-switch-6">
                B2B
            </FormCheck.Label>
        </FormCheck>
        <FormCheck className="mt-2 mr-2 sm:mt-0">
            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="Cor" checked={chkCor} onChange={(e)=>{setChkCor(!chkCor); setChkAll(false);}} />
            <FormCheck.Label htmlFor="checkbox-switch-6">
                Corporate
            </FormCheck.Label>
        </FormCheck>
    </div>
                    </div>
                    
                  </FormInline>
                  
                  { chkBC &&  
                  <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                    <FormLabel className="xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Select B2C Client</div>
                          <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                        </div>
                      </div>
                    </FormLabel>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                    <TomSelect
                      id="b2c"
                      name="b2c"
                      value={selectBC}
                      onChange={setSelectBC}
                      options={{
                        placeholder: "Select B2C Client",
                      }}
                      className="w-full"
                      multiple
                    >
                      {/* <option value="">Select B2C Client</option> */}
                        { _.take(data, data.length).filter(data=>data.cType.includes('B2C')).map((item, Key)=>(
                              <option value={item.cEmail}>{item.cName} &lt; {item.cEmail} &gt;</option>
                            )
                              
                            )}
                      </TomSelect>
                    </div>
                  </FormInline>
                  }
                  { chkBB &&
                  <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                    <FormLabel className="xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Select B2B Client</div>
                          <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                        </div>
                      </div>
                    </FormLabel>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                    <TomSelect
                      value={selectBB}
                      onChange={setSelectBB}
                      options={{
                        placeholder: "Select B2B Client",
                      }}
                      className="w-full"
                      multiple
                    >
                      {/* <option value="">Select B2B Client</option> */}
                      { _.take(data, data.length).filter(data=>data.cType.includes('TA')).map((item, Key)=>(
                              <option value={item.cEmail}>{item.cName} &lt; {item.cEmail} &gt;</option>
                            )  
                        )}
                      </TomSelect>
                    </div>
                  </FormInline>
                  }
                  { chkCor && 
                  <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                    <FormLabel className="xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Select Corporate Client</div>
                          <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                        </div>
                      </div>
                    </FormLabel>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                    <TomSelect
                      value={selectCor}
                      onChange={setSelectCor}
                      options={{
                        placeholder: "Select Corporate Client",
                      }}
                      className="w-full"
                      multiple
                    >
                      {/* <option value="">Select Corporate Client</option> */}
                      { _.take(data, data.length).filter(data=>data.cType.includes('Cor')).map((item, Key)=>(
                              <option value={item.cEmail}>{item.cName} &lt; {item.cEmail} &gt;</option>
                            )  
                        )}
                      </TomSelect>
                    </div>
                  </FormInline>
                  }
                 <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                    <FormLabel className="xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Guest Client</div>
                        </div>
                      </div>
                    </FormLabel>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput
                        {...register("guestClient")}
                        id="guestClient"
                        type="text"
                        placeholder="Guest Client Mail Id"
                      />
                    </div>
                  </FormInline>
                  
                </div>
              </div>
            </div>
            {/* END: Sender Information */}
            {/* BEGIN: Compose Proposal */}
            <div className="p-5 mt-5 intro-y box">
              <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
                <div className="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                  <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Compose Proposal
                </div>
                <div className="mt-5">
                  <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                    <FormLabel className="xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Subject</div>
                          <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                        </div>
                        {/* <div className="mt-3 text-xs leading-relaxed text-slate-500">
                          <div>
                            Can add Personal Address or Business Address or Hotle Address.
                          </div>
                          <div className="mt-2">
                            It is recommended to enter street, road name, Appartment, Block Info etc.
                          </div>
                        </div> */}
                      </div>
                    </FormLabel>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                      <FormInput
                        {...register("subject")}
                        id="subject"
                        type="text"
                        placeholder="Proposal Subject"
                      />
                      <FormHelp className="text-right">
                        Maximum character 0/200
                      </FormHelp>
                    </div>
                  </FormInline>
                  <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                    <FormLabel className="xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Proposal Body</div>
                          <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                        </div>
                      </div>
                    </FormLabel>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                    <ClassicEditor
                      value={editorData}
                      onChange={setEditorData}
                    />
                      {/* <FormHelp className="text-right">
                        Maximum character 0/15
                      </FormHelp> */}
                    </div>
                  </FormInline>
                </div>
              </div>
            </div>
            {/* END: Compose Proposal */}
            {/* BEGIN: Set Attachment */}
            <div className="p-5 mt-5 intro-y box">
              <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
                <div className="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                  <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Add Attachment
                </div>
                <div className="mt-5">
                <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                    <FormLabel className="xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Attache Itinerary</div>
                          <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                        </div>
                      </div>
                    </FormLabel>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                    <FormSelect
                        {...register("attacheFile")}
                        onChange={(e)=>setAttacheFile(e.target.value)}
                        id="attacheFile"
                        placeholder=""
                      >
                        <option value="">Select Itinerary</option> //, 
                        { _.take(itinerary.data, itinerary.data.length).map((item, Key)=>(
                              <option value={item.id}>{item.tourName}</option>
                            )
                              
                            )}
                      </FormSelect>
                    </div>
                </FormInline>
                </div>
              </div>
            </div>
            {/* END: Set Attachment */}
            
            <div className="flex flex-col justify-end gap-2 mt-5 md:flex-row">
            <Button
                variant="primary"
                type="button"
                className="w-full py-3 md:w-52"
                onClick={()=>onSave('Y')}
              >
                Save As Draft
              </Button>
              <Button
                variant="danger"
                type="button"
                className="w-full py-3 md:w-52"
                onClick={()=>onSave('N')}
              >
                Send
              </Button>
              <Link to="/sent-proposal">
              <Button
                type="button"
                className="w-full py-3 border-slate-300 dark:border-darkmode-400 text-slate-500 md:w-52"
              >
                Cancel
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

export default proposal;
