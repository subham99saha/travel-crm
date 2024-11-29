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
import Button from "../../base-components/Button";
import TomSelect from "../base-components/TomSelect";
import Notification from "../base-components/Notification";
import Lucide from "../../base-components/Lucide";
import Toastify from "toastify-js";
import axios from "axios";
import api from "../../apiconfig.json";

import { Dialog } from "../base-components/Headless";

function enquiryType(props) {
    const label = {
      'Cor': 'Corporate',
      'TA': 'B2B',
    }
    return (<>
    {/* BEGIN: Enquiry Type */}
    <div style={{display: (props.showEnquiry) ? 'block' : 'none'}} className="p-5 mt-5 intro-y box">
              <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
                <div className="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                  <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Enquiry Type
                </div>
                
                <div className="mt-5">
                  { (props.isSuperUser === true) ? <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                    <FormLabel className="xl:w-120 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">B2B / TRAVEL AGENTS (B2B) / CORPORATE</div>
                          {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div> */}
                        </div>
                        <div className="mt-3 text-xs leading-relaxed text-slate-500">
                          Select the type of booking to proceed.
                        </div>
                      </div>
                    </FormLabel>
                    <div className="flex flex-col mt-2 sm:flex-row">
                        <FormCheck className="mr-5">
                            <FormCheck.Input id="radio-switch-1" type="radio" name="horizontal_radio_button" 
                            value="B2C"
                            checked={props.payload.enquiryType.enquiryType === 'B2C'}
                            onChange={(e) => props.editEnqType(e.target.value)} />
                            <FormCheck.Label htmlFor="radio-switch-1">
                                B2C
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck className="mt-2 mr-5 sm:mt-0">
                            <FormCheck.Input id="radio-switch-2" type="radio" name="horizontal_radio_button" 
                            value="TA"
                            checked={props.payload.enquiryType.enquiryType === 'TA'}
                            onChange={(e) => props.editEnqType(e.target.value)} />
                            <FormCheck.Label htmlFor="radio-switch-2">
                                Travel Agents (B2B)
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck className="mt-2 mr-5 sm:mt-0">
                            <FormCheck.Input id="radio-switch-3" type="radio" name="horizontal_radio_button" 
                            value="Cor"
                            checked={props.payload.enquiryType.enquiryType === 'Cor'}
                            onChange={(e) => props.editEnqType(e.target.value)} />
                            <FormCheck.Label htmlFor="radio-switch-3">
                                Corporate
                            </FormCheck.Label>
                        </FormCheck>
                        {/* <FormHelp className="text-right">
                        Maximum character 0/70
                      </FormHelp> */}
                    </div>
                  </FormInline> : 
                  <p>The following lead will be saved with enquiry type as that of <b>{label[props.payload.enquiryType.enquiryType]}</b></p>}
                </div>
              </div>
              
    </div>
    {/* END: Enquiry Type */}
    {/* <Button
      variant="primary"
      type="submit"
      className="mt-3 mb-2 py-2 md:w-80"
    >
      Enter booking details
    </Button> */}
    </>)
}
  
export default enquiryType;