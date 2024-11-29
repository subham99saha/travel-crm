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
import TomSelect from "../../base-components/TomSelect";
import Notification from "../base-components/Notification";
import Lucide from "../../base-components/Lucide";
import Toastify from "toastify-js";
import axios from "axios";
import api from "../../../apiconfig.json";

import { fetchAllItinerary } from "../../pages/Itinerary/ItinerarySlice";
import { fetchAllClient } from "../../pages/Client/clientSlice";
import { useAppSelector, useAppDispatch } from "../../stores/hooks";

import { Dialog } from "../base-components/Headless";

function bookingDetails(props) {
    const dispatch = useAppDispatch();
    // const { data } = useAppSelector((state) => state.itinerary);
    const iti = useAppSelector((state) => state.itinerary).data;
    const users = useAppSelector((state) => state.client).data;
    
    useEffect(() => {
      dispatch(fetchAllItinerary());
      dispatch(fetchAllClient());
    },[]);   

    // console.log("Data: ",users)

    const [daterange,setDaterange] = useState()
    // const iti = [1,2,3,4,5]
    const [itiID,setItiID] = useState()
    const [cName,setCName] = useState()
    const [cEmail,setCEmail] = useState()
    const [cMobile,setCMobile] = useState()
    const [pax,setPax] = useState()

    const setUser = (id) => {
      console.log({id})
      const u = users.find(x => x.id == Number(id))
      console.log({users})
      if (u != undefined) {
        // setCName(u.cName)
        // setCEmail(u.cEmail)
        // setCMobile(u.cMobile)
        props.editBooking('name',u.cName)
        props.editBooking('email',u.cEmail)
        props.editBooking('mobile',u.cMobile)
      }
    }

    const [busiTag,setbusiTag] = useState('')
    const [userTag,setuserTag] = useState('')
    useEffect(() => {
      const type = props.payload.enquiryType.enquiryType
      if (type === 'B2C') {
        setuserTag('Customer')
        setbusiTag('')
      } else if (type === 'TA') {
        setuserTag('Executive')
        setbusiTag('Travel Agency')
      } else if (type === 'Cor') {
        setuserTag('Executive')
        setbusiTag('Company')
      }
    },[props.payload.enquiryType.enquiryType])

    return (<>
    {/* BEGIN: Booking Details */}
    <div style={{display: (props.showBooking) ? 'block' : 'none'}} className="p-5 mt-5 intro-y box">
              <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
                <div className="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                  <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Booking Details ({props.payload.enquiryType.enquiryType})
                </div>
                
                <div className="grid grid-cols-3 gap-3 mt-5 gap-y-5">
                <div>
                  <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
                    <FormLabel className="">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Select {userTag}</div>
                          {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div> */}
                        </div>
                        {/* <div className="mt-3 text-xs leading-relaxed text-slate-500">
                          Select {userTag} to create booking for.
                        </div> */}
                      </div>
                    </FormLabel>
                    <div className="w-full mt-3">
                      <FormSelect
                        value={props.payload.bookingDetails.userId}
                        onChange={(e) => {props.editBooking('userId',e.target.value); setUser(e.target.value)}}
                        // id="customerId"
                        placeholder={userTag}
                      >
                        <option value="">Select {userTag}</option>
                        { users.map((item) => {
                            return <option value={item.id}>{item.cName} - {item.cEmail} - (CUST-{item.id})</option>
                        })}
                      </FormSelect>
                      {/* <FormHelp className="text-right">
                        Select {userTag} to create booking for.
                      </FormHelp> */}
                      {/* <TomSelect 
                        className="sm:mr-2"
                        value={props.payload.bookingDetails.userId}
                        onChange={(val) => {setUser(val); props.editBooking('userId',val);}}
                        aria-label="Default select example">
                        <option value="">Select {userTag}</option>
                        { users.map((item) => {
                          return <option value={item.id}>{item.cName} - {item.cEmail} - (CUST-{item.id})</option>
                        })}
                      </TomSelect> */}
                    </div>
                  </FormInline>
                  </div>                  
                  {(busiTag != '') ? <div><FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
                    <FormLabel className="">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">{busiTag} Name</div>
                          {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div> */}
                        </div>
                      </div>
                    </FormLabel>
                    <div className="flex-1 w-full mt-3">
                      <FormInput
                        // id="cName"
                        value={props.payload.bookingDetails.businessName}
                        onChange={(e) => {props.editBooking('businessName',e.target.value)}}
                        type="text"
                        placeholder={`${busiTag} Name`}
                      />
                      <FormHelp className="text-right">
                        Maximum characters 30
                      </FormHelp>
                    </div>
                  </FormInline></div> : ''}                  
                  <div>
                  <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
                    <FormLabel className="">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">{userTag} Name</div>
                          {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div> */}
                        </div>
                      </div>
                    </FormLabel>
                    <div className="flex-1 w-full mt-3">
                      <FormInput
                        // id="cName"
                        value={props.payload.bookingDetails.name}
                        onChange={(e) => {props.editBooking('name',e.target.value)}}
                        type="text"
                        placeholder={`${userTag} Name`}
                      />
                      <FormHelp className="text-right">
                        Maximum characters 30
                      </FormHelp>
                    </div>
                  </FormInline>
                  </div>
                  <div>
                    <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
                    <FormLabel className="">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">{userTag} Email</div>
                          {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div> */}
                        </div>
                      </div>
                    </FormLabel>
                    <div className="flex-1 w-full mt-3">
                      <FormInput
                        // id="cEmail"
                        value={props.payload.bookingDetails.email}
                        onChange={(e) => {props.editBooking('email',e.target.value)}}
                        type="text"
                        placeholder="Email"
                      />
                      <FormHelp className="text-right">
                        Maximum characters 30
                      </FormHelp>
                    </div>
                  </FormInline>
                  </div>
                  <div>
                  <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
                    <FormLabel className="">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">{userTag} Mobile Number</div>
                          {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div> */}
                        </div>
                      </div>
                    </FormLabel>
                    <div className="flex-1 w-full mt-3">
                      <FormInput
                        // id="cMobile"
                        value={props.payload.bookingDetails.mobile}
                        onChange={(e) => {props.editBooking('mobile',e.target.value)}}
                        type="text"
                        placeholder="Mobile"
                      />
                      <FormHelp className="text-right">
                        Maximum characters 15
                      </FormHelp>
                    </div>
                  </FormInline>
                  </div>
                  <div>
                  <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
                    <FormLabel className="">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">WhatsApp</div>
                          {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div> */}
                        </div>
                      </div>
                    </FormLabel>
                    <div className="flex-1 w-full mt-3">
                      <FormInput
                        // id="cMobile"
                        value={props.payload.bookingDetails.whatsapp}
                        onChange={(e) => {props.editBooking('whatsapp',e.target.value)}}
                        type="text"
                        placeholder="WhatsApp"
                      />
                      {/* <FormHelp className="text-right">
                        Maximum characters 15
                      </FormHelp> */}
                    </div>
                  </FormInline>
                  </div>
                  <div>
                  <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
                    <FormLabel className="">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Skype Id</div>
                          {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div> */}
                        </div>
                      </div>
                    </FormLabel>
                    <div className="flex-1 w-full mt-3">
                      <FormInput
                        // id="cMobile"
                        value={props.payload.bookingDetails.skype}
                        onChange={(e) => {props.editBooking('skype',e.target.value)}}
                        type="text"
                        placeholder="Skype Id"
                      />
                      <FormHelp className="text-right">
                        Maximum characters 20
                      </FormHelp>
                    </div>
                  </FormInline>
                  </div>
                  {/* <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
                    <FormLabel className="">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Total PAX</div>
                          // <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          //   Required
                          // </div>
                        </div>
                      </div>
                    </FormLabel>
                    <div className="flex-1 w-full mt-3">
                      <FormInput
                        id="pax"
                        value={pax}
                        type="number"
                        onChange={(e) => setPax(e.target.value)}
                        placeholder="Total PAX"
                      />
                    </div>
                  </FormInline> */}
                  {/* <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
                    <FormLabel className="">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Total Adults, Kids, Infants</div>
                          // <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          //   Required
                          // </div>
                        </div>
                      </div>
                    </FormLabel>
                    <div className="grid grid-cols-12 gap-2 mt-3">
                        <FormInput type="number" className="col-span-4" placeholder="Total Adults" aria-label="default input inline 1" />
                        <FormInput type="number" className="col-span-4" placeholder="Total Kids" aria-label="default input inline 2" />
                        <FormInput type="number" className="col-span-4" placeholder="Total Infants" aria-label="default input inline 3" />
                    </div>
                  </FormInline> */}
                  <div>
                    <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
            <FormLabel className="">
              <div className="text-left">
                <div className="flex items-center">
                  <div className="font-medium">Destination</div>
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
                value={props.payload.bookingDetails.destination}
                onChange={(e) => {props.editBooking('destination',e.target.value)}}
              >
                <option value="">Select destination</option>
                { props.state.map((item) => {
                    return <option value={item.id}>{item.stateName}</option>
                })}
              </FormSelect>
              {/* <TomSelect 
                className="sm:mr-2"
                value={props.payload.bookingDetails.destination}
                onChange={(val) => {props.editBooking('destination',val)}}
                aria-label="Default select example">
                <option value="">Select destination</option>
                { props.state.map((item) => {
                    return <option value={item.id}>{item.stateName}</option>
                })}
              </TomSelect> */}
            </div>
          </FormInline>
          </div>
          <div>
            <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
            <FormLabel className="">
              <div className="text-left">
                <div className="flex items-center">
                  <div className="font-medium">Travel type</div>
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
                value={props.payload.bookingDetails.travelType}
                onChange={(e) => {props.editBooking('travelType',e.target.value)}}
              >
                <option value="">Select travel type</option>
                <option value="Holiday">Holiday</option>
                <option value="Business">Business</option>
                <option value="Honeymoon">Honeymoon</option>
                <option value="Religious">Religious</option>
                <option value="Ecotourism">Ecotourism</option>
                <option value="Adventure">Adventure</option>
                <option value="River Cruise">River Cruise</option>
                <option value="Family">Family</option>
                <option value="Hiking">Hiking</option>
                <option value="Cultural Heritage">Cultural Heritage</option>
                <option value="Sports">Sports</option>
              </FormSelect>
            </div>
            </FormInline>
          </div>
                  {/* <div>
                    <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
                    <FormLabel className="">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Travel Date</div>
                          // <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          //   Required
                          // </div>
                        </div>
                        <div className="mt-3 text-xs leading-relaxed text-slate-500">
                          Select start and end date for the trip.
                        </div>
                      </div>
                    </FormLabel>
                    <div className="flex-1 w-full mt-3">
                    <Litepicker                       
                      value={props.payload.bookingDetails.dayRange}
                      onChange={(val) => {props.editBooking('dayRange',val)}}
                      options={{
                        autoApply: false,
                        singleMode: false,
                        numberOfColumns: 2,
                        numberOfMonths: 2,
                        showWeekNumbers: true,
                        dropdowns: {
                            minYear: 1990,
                            maxYear: null,
                            months: true,
                            years: true,
                        },
                    }} className="block w-56 mx-auto" />
                    </div>
                  </FormInline>
                  </div> */}
                  <div>
                    <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
                      <FormLabel className="">
                        <div className="text-left">
                          <div className="flex items-center">
                            <div className="font-medium">Start Date</div>
                            {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                              Required
                            </div> */}
                          </div>
                          {/* <div className="mt-3 text-xs leading-relaxed text-slate-500">
                            Select start and end date for the trip.
                          </div> */}
                        </div>
                      </FormLabel>
                      <div className="flex-1 w-full mt-3">
                        <FormInput
                          // id="contactPerson"
                          type="date"
                          value={props.payload.bookingDetails.startDate}
                          onChange={(e) => props.editBooking('startDate',e.target.value)}
                        />
                      </div>
                    </FormInline>
                  </div>
                  <div>
                    <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
                      <FormLabel className="">
                        <div className="text-left">
                          <div className="flex items-center">
                            <div className="font-medium">End Date</div>
                            {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                              Required
                            </div> */}
                          </div>
                          {/* <div className="mt-3 text-xs leading-relaxed text-slate-500">
                            Select start and end date for the trip.
                          </div> */}
                        </div>
                      </FormLabel>
                      <div className="flex-1 w-full mt-3">
                        <FormInput
                          // id="contactPerson"
                          type="date"
                          value={props.payload.bookingDetails.endDate}
                          onChange={(e) => props.editBooking('endDate',e.target.value)}
                        />
                      </div>
                    </FormInline>
                  </div>
                  <div>
                    <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
                    <FormLabel className="">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">SELECT ITINERARY</div>
                          {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div> */}
                        </div>
                        {/* <div className="mt-3 text-xs leading-relaxed text-slate-500">
                          Select Itinerary to create booking for.
                        </div> */}
                      </div>
                    </FormLabel>
                    <div className="flex-1 w-full mt-3">
                      <FormSelect                        
                        value={props.payload.bookingDetails.itineraryId}
                        onChange={(e) => {props.editBooking('itineraryId',e.target.value)}}
                        // id="itiId"
                        placeholder="Itinerary"
                      >
                        <option value="">Select Itinerary ID</option>
                        { iti.map((item) => {
                            return <option value={item.id}>{item.tourName} (ITI-{item.id})</option>
                        })}
                      </FormSelect>                      
                      <FormHelp className="text-right">
                        Select Itinerary to create booking for.
                      </FormHelp>
                    </div>
                  </FormInline>
                  </div>
                  <div>
                    <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
                    <FormLabel className="">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Lead Source</div>
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
                        value={props.payload.bookingDetails.leadSource}
                        onChange={(e) => {props.editBooking('leadSource',e.target.value)}}
                      >
                        <option value="">Select lead source</option>
                        <option value="Google Ads">Google Ads</option>
                        <option value="Facebook Ads">Facebook Ads</option>
                        <option value="Email Marketing">Email Marketing</option>
                        <option value="Website Enquiry">Website Enquiry</option>
                        <option value="Customer Referral">Customer Referral</option>
                      </FormSelect>
                    </div>
                    </FormInline>
                  </div>
                  <div>
                  <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
                    <FormLabel className="">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Budget (₹)</div>
                          {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div> */}
                        </div>
                      </div>
                    </FormLabel>
                    <div className="flex-1 w-full mt-3">
                      <FormInput
                        // id="cMobile"
                        value={props.payload.bookingDetails.budget}
                        onChange={(e) => {props.editBooking('budget',e.target.value)}}
                        type="number"
                        placeholder="Budget (₹)"
                      />
                      {/* <FormHelp className="text-right">
                        Maximum characters 20
                      </FormHelp> */}
                    </div>
                  </FormInline>
                  </div>
                  <div>
                    <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
                    <FormLabel className="">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Budget For</div>
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
                        value={props.payload.bookingDetails.budgetFor}
                        onChange={(e) => {props.editBooking('budgetFor',e.target.value)}}
                      >
                        <option value="">Select budget for</option>
                        <option value="Per person">Per person</option>
                        <option value="Total">Total</option>
                      </FormSelect>
                    </div>
                    </FormInline>
                  </div>                  
                </div>
              </div>
    </div>
    {/* END: Booking Details */}
    {/* <Button
      variant="primary"
      type="submit"
      className="mt-3 mb-2 py-2 md:w-80"
    >
      Enter PAX details
    </Button> */}
    </>)
}
  
export default bookingDetails;