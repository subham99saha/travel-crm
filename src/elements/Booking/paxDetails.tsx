// @ts-nocheck
import { useState, useEffect } from "react";
import Table from "../base-components/Table";
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
import Litepicker from "../../base-components/Litepicker";
import Button from "../../base-components/Button";
import TomSelect from "../base-components/TomSelect";
import Notification from "../base-components/Notification";
import Lucide from "../../base-components/Lucide";
import Toastify from "toastify-js";
import axios from "axios";
import api from "../../apiconfig.json";

import { Dialog } from "../base-components/Headless";

import DocumentRepo from "../documentRepo";

function paxDetails(props) {
    const [date,setDate] = useState()
    const { pax } = props
    const [aadhar,setaadhar] = useState('')
    
    const DOCUMENT_FOLDER = 'crm-lead/'
        
    const handleRepoSelection = (index,file,repo_for) => {
        // if (repo_for === 'aadhar') {
        //     // setaadhar(file)
        //     props.editPax(index,'aadharDoc',file)
        // } else if (repo_for === 'passport') {
        //     props.editPax(index,'passportDoc',file)
        // }
        props.editPax(index,`${repo_for}Doc`,file)
    }
    const cancelChosenDoc = (index,repo_for) => {
        // if (repo_for === 'aadhar') {
        //     // setaadhar('')
        //     props.editPax(index,'aadharDoc','')
        // } else if (repo_for === 'passport') {
        //     props.editPax(index,'passportDoc','')
        // }
        props.editPax(index,`${repo_for}Doc`,'')
    }

    return (<>
    {/* BEGIN: Pax Details */}
    <div style={{display: (props.showPax) ? 'block' : 'none'}} className="p-5 mt-5 intro-y box">
        {/* {Array.apply(null, Array(pax)).map((p,index) => { */}
        {props.payload.paxDetails.paxArr.map((obj,index) => {
            // let obj = props.payload.paxDetails.paxArr[index]
            return <div key={index} className="border rounded-md border-slate-200/60 shadow-xl dark:border-darkmode-400 mb-5">
            <div className="grid grid-cols-2 gap-4 p-5 text-base bg-slate-100 rounded-t-sm font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                <div className="justify-self-start">Pax Details (Person {index + 1})</div>
                <div className="justify-self-end" onClick={() => props.handlePax('remove',index)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></div>
            </div>
            
            <div className="grid grid-cols-3 p-5 gap-3 mt-5 gap-y-5">
            
                <div>
                <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
                <FormLabel className="">
                    <div className="text-left">
                    <div className="flex items-center">
                        <div className="font-medium">First Name</div>
                        {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                        Required
                        </div> */}
                    </div>
                    </div>
                </FormLabel>
                <div className="flex-1 w-full mt-3">
                    <FormInput
                    // id={`firstName_${index}`}
                    type="text"
                    placeholder="First Name"
                    value={obj.firstName}
                    onChange={(e) => props.editPax(index,'firstName',e.target.value)}
                    />
                    <FormHelp className="text-right">
                    Maximum character 0/30
                    </FormHelp>
                </div>
                </FormInline>
                </div>
                <div>
                <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
                <FormLabel className="">
                    <div className="text-left">
                    <div className="flex items-center">
                        <div className="font-medium">Last Name</div>
                        {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                        Required
                        </div> */}
                    </div>
                    </div>
                </FormLabel>
                <div className="flex-1 w-full mt-3">
                    <FormInput
                    // id="contactPerson"
                    type="text"
                    placeholder="Last Name"
                    value={obj.lastName}
                    onChange={(e) => props.editPax(index,'lastName',e.target.value)}
                    />
                    <FormHelp className="text-right">
                    Maximum character 0/30
                    </FormHelp>
                </div>
                </FormInline>
                </div>
                <div>
                <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
                    <FormLabel className="">
                        <div className="text-left">
                        <div className="flex items-center">
                            <div className="font-medium">Date of Birth</div>
                            {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                            </div> */}
                        </div>
                        </div>
                    </FormLabel>
                    <div className="flex-1 w-full mt-3">
                        {/* <div className="relative w-56 mx-auto">
                            <div className="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                                <Lucide icon="Calendar" className="w-4 h-4" />
                            </div>
                            <Litepicker 
                                // value={date} 
                                // onChange={setDate} 
                                value={obj.dob}
                                onChange={(val) => props.editPax(index,'dob',val)}
                                // onChange={(e) => props.editPax(index,'dob',e.target.value)}
                                options={{
                                        autoApply: false,
                                        showWeekNumbers: true,
                                        dropdowns: {
                                            minYear: 1990,
                                            maxYear: null,
                                            months: true,
                                            years: true,
                                        },
                                        }} className="pl-12" />
                        </div> */}
                        <FormInput
                            // id="contactPerson"
                            type="date"
                            value={obj.dob}
                            onChange={(e) => props.editPax(index,'dob',e.target.value)}
                        />
                    </div>
                </FormInline>
                </div>
                <div>
                <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
                <FormLabel className="">
                    <div className="text-left">
                    <div className="flex items-center">
                        <div className="font-medium">Gender</div>
                        {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                        Required
                        </div> */}
                    </div>
                    </div>
                </FormLabel>
                <div className="flex-1 w-full mt-3">
                    <FormSelect
                        // id="isActive"
                        placeholder=""
                        value={obj.gender}
                        onChange={(e) => props.editPax(index,'gender',e.target.value)}
                    >
                        <option value="">Select gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Others</option>
                    </FormSelect>
                    {/* <FormHelp className="text-right">
                        Leave empty if you're the one booking
                    </FormHelp> */}
                </div>
                {/* <div className="flex flex-col mt-2 sm:flex-row">
                    <FormCheck className="mr-5">
                        <FormCheck.Input id="radio-switch-1" type="radio" name="horizontal_radio_button" 
                        value="M"
                        checked={obj.gender === 'M'}
                        onChange={(e) => props.editPax(index,'gender',e.target.value)} />
                        <FormCheck.Label htmlFor="radio-switch-1">
                            Male
                        </FormCheck.Label>
                    </FormCheck>
                    <FormCheck className="mt-2 mr-5 sm:mt-0">
                        <FormCheck.Input id="radio-switch-2" type="radio" name="horizontal_radio_button" 
                        value="F"
                        checked={obj.gender === 'F'}
                        onChange={(e) => props.editPax(index,'gender',e.target.value)} />
                        <FormCheck.Label htmlFor="radio-switch-2">
                            Female
                        </FormCheck.Label>
                    </FormCheck>
                    <FormCheck className="mt-2 mr-5 sm:mt-0">
                        <FormCheck.Input id="radio-switch-3" type="radio" name="horizontal_radio_button" 
                        value="O"
                        checked={obj.gender === 'O'}
                        onChange={(e) => props.editPax(index,'gender',e.target.value)} />
                        <FormCheck.Label htmlFor="radio-switch-3">
                            Others
                        </FormCheck.Label>
                    </FormCheck>
                </div> */}
                </FormInline>
                </div>
                <div>
                    <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
                    <FormLabel className="">
                    <div className="text-left">
                        <div className="flex items-center">
                        <div className="font-medium">Relationship</div>
                        {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                        </div> */}
                        </div>
                    </div>
                    </FormLabel>
                    <div className="flex-1 w-full mt-3">
                    <FormSelect
                        // id="isActive"
                        placeholder=""
                        value={obj.relationship}
                        onChange={(e) => props.editPax(index,'relationship',e.target.value)}
                    >
                        <option value="">Select relationship</option>
                        <option value="Wife">Wife</option>
                        <option value="Husband">Husband</option>
                        <option value="Partner">Partner</option>
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Son">Son</option>
                        <option value="Daughter">Daughter</option>
                        <option value="Friend">Friend</option>
                        <option value="Colleague">Colleague</option>
                    </FormSelect>
                    <FormHelp className="text-right">
                        Leave empty if you're the one booking
                    </FormHelp>
                    </div>
                    </FormInline>
                </div>
                <div className="col-start-1">
                <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
                <FormLabel className="">
                    <div className="text-left">
                    <div className="flex items-center">
                        <div className="font-medium">Passport Number</div>
                        {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                        Required
                        </div> */}
                    </div>
                    </div>
                </FormLabel>
                <div className="flex-1 w-full mt-3">
                    <FormInput
                    // id="contactPerson"
                    type="text"
                    placeholder="Passport No."
                    value={obj.passportNo}
                    onChange={(e) => props.editPax(index,'passportNo',e.target.value)}
                    />
                    <FormHelp className="text-right">
                    Maximum character 0/30
                    </FormHelp>
                </div>
                </FormInline>
                </div>
                <div>
                <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
                <FormLabel className="">
                    <div className="text-left">
                    <div className="flex items-center">
                        <div className="font-medium">Passport</div>
                        {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                        Required
                        </div> */}
                    </div>
                    </div>
                </FormLabel>
                <DocumentRepo folder={DOCUMENT_FOLDER} repoFor='passport' chosen={[obj.passportDoc]} handleSelect={(f,rf) => {handleRepoSelection(index,f,rf);}} cancelChosenDoc={(rf) => {cancelChosenDoc(index,rf);}} />
                </FormInline>
                </div>
                <div className="col-start-1">
                <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
                <FormLabel className="">
                    <div className="text-left">
                    <div className="flex items-center">
                        <div className="font-medium">Aadhar Number</div>
                        {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                        Required
                        </div> */}
                    </div>
                    </div>
                </FormLabel>
                <div className="flex-1 w-full mt-3">
                    <FormInput
                    // id="contactPerson"
                    type="text"
                    placeholder="Aadhar No."
                    value={obj.aadharNo}
                    onChange={(e) => props.editPax(index,'aadharNo',e.target.value)}
                    />
                    <FormHelp className="text-right">
                    Maximum character 0/30
                    </FormHelp>
                </div>
                </FormInline>
                </div>
                <div>
                <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
                <FormLabel className="">
                    <div className="text-left">
                    <div className="flex items-center">
                        <div className="font-medium">Aadhar Card</div>
                        {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                        Required
                        </div> */}
                    </div>
                    </div>
                </FormLabel>
                <DocumentRepo folder={DOCUMENT_FOLDER} repoFor='aadhar' chosen={[obj.aadharDoc]} handleSelect={(f,rf) => {handleRepoSelection(index,f,rf);}} cancelChosenDoc={(rf) => {cancelChosenDoc(index,rf);}} />
                </FormInline>
                </div>
                <div className="col-start-1">
                <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
                <FormLabel className="">
                    <div className="text-left">
                    <div className="flex items-center">
                        <div className="font-medium">Voter ID</div>
                        {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                        Required
                        </div> */}
                    </div>
                    </div>
                </FormLabel>
                <div className="flex-1 w-full mt-3">
                    <FormInput
                    // id="contactPerson"
                    type="text"
                    placeholder="Voter Id"
                    value={obj.voterId}
                    onChange={(e) => props.editPax(index,'voterId',e.target.value)}
                    />
                    <FormHelp className="text-right">
                    Maximum character 0/30
                    </FormHelp>
                </div>
                </FormInline>
                </div>
                <div>
                <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
                <FormLabel className="">
                    <div className="text-left">
                    <div className="flex items-center">
                        <div className="font-medium">Voter Card</div>
                        {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                        Required
                        </div> */}
                    </div>
                    </div>
                </FormLabel>
                <DocumentRepo folder={DOCUMENT_FOLDER} repoFor='voter' chosen={[obj.voterDoc]} handleSelect={(f,rf) => {handleRepoSelection(index,f,rf);}} cancelChosenDoc={(rf) => {cancelChosenDoc(index,rf);}} />
                </FormInline>
                </div>
                
            </div>
            </div>
        })}
        <Button
            variant="primary"
            type="submit"
            className="text-xs mt-3"
            onClick={() => props.handlePax('add',0)}
        >
        Add More
        </Button>
    </div>
    {/* END: Pax Details */}
    {/* <Button
      variant="primary"
      type="submit"
      className="mt-3 mb-2 py-2 md:w-80"
    >
      Enter requirement details
    </Button> */}
    </>)
}
  
export default paxDetails;