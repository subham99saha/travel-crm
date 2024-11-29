// @ts-nocheck

import { useState, useRef, useEffect } from "react";

import Button from "../../base-components/Button";
import { Menu } from "../../base-components/Headless";
import { FormInput, FormLabel, FormSelect, FormTextarea, FormHelp } from "../../base-components/Form";
import TomSelect from "../../base-components/TomSelect";
import Lucide from "../../base-components/Lucide";
import { ClassicEditor } from "../../base-components/Ckeditor";

import { indexEmployees } from "../../pages/Employee/api"

const meeting = (props) => {
    const [meetingDate,setmeetingDate] = useState('')
    const [meetingStart,setmeetingStart] = useState('')
    const [meetingEnd,setmeetingEnd] = useState('')
    const [meetingNote,setmeetingNote] = useState('')
    const [meetingType,setmeetingType] = useState('')
    const [meetingLink,setmeetingLink] = useState('')
    const [employees,setemployees] = useState([])
    const [assTo, setassTo] = useState([])
    const [childOf, setchildOf] = useState()
    const [description, setdescription] = useState()
    const [history, sethistory] = useState(props.leadHistory)

    useEffect(() => {
        async function fetchData() {
          const emp = await indexEmployees()
        //   console.log({emp})
          setemployees(emp)
          sethistory(props.leadHistory);
        }
        fetchData();        
        // console.log(props)
    },[]);
    // console.log({history})

    const autoFill = (id) => {
        console.log({id})
        let arr = history.filter(x => x.id === Number(id))
        if (arr.length != 0) {
            const obj = JSON.parse(arr[0].leadActivity)
            setmeetingDate(obj.meetingDate)
            setmeetingStart(obj.meetingStart)
            setmeetingEnd(obj.meetingEnd)
            setmeetingNote(obj.meetingNote)
            setmeetingType(obj.meetingType)
            setmeetingLink(obj.meetingLink)
            setassTo(arr[0].leadAssignTo.split(', '))
            setdescription(obj.description)
            setchildOf(id)
        }
        console.log(arr[0])
        // console.log(JSON.parse(arr[0].leadActivity))
        console.log({history})
    } 
    
    const submit = () => {
        const historyObj = {
            leadAssignTo: assTo.join(', '),
            leadSubStatus: 'MEET',
            leadActivity: {
                meetingDate, meetingStart, meetingEnd, meetingNote, meetingType, meetingLink, childOf, description
            },
            task: '',
            note: ''
        }
        props.logAction(historyObj,['Success','Meeting added to lead'])
        console.log({historyObj})
    }
    
    return (
        <>
            <div className="grid grid-cols-11 pb-20 gap-x-6">
          <div className="col-span-11 intro-y 2xl:col-span-9">
            {/* BEGIN: Sender Information */}
            <div className="p-5 intro-y box">
              <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
                <div className="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                  <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" />Meeting
                </div>
                <div className="grid grid-cols-3 gap-3 mt-5 gap-y-5">
                    <div className="">
                        <FormLabel className="xl:w-64 xl:!mr-10">
                        <div className="text-left">
                            <div className="flex items-center">
                            <div className="font-medium">Date</div>
                            <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                Required
                            </div>
                            </div>
                        </div>
                        </FormLabel>
                        <div className="flex-1 w-full mt-1 xl:mt-0">
                            <FormInput
                            type="date"
                            value={meetingDate}
                            onChange={(e) => setmeetingDate(e.target.value)}
                            /> 
                        </div>
                    </div>
                    <div className="">
                        <FormLabel className="xl:w-64 xl:!mr-10">
                        <div className="text-left">
                            <div className="flex items-center">
                            <div className="font-medium">Start at</div>
                            <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                Required
                            </div>
                            </div>
                        </div>
                        </FormLabel>
                        <div className="flex-1 w-full mt-1 xl:mt-0">
                            <FormInput
                            type="time"
                            value={meetingStart}
                            onChange={(e) => setmeetingStart(e.target.value)}
                            /> 
                        </div>
                    </div>
                    <div className="">
                        <FormLabel className="xl:w-64 xl:!mr-10">
                        <div className="text-left">
                            <div className="flex items-center">
                            <div className="font-medium">End at</div>
                            <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                Required
                            </div>
                            </div>
                        </div>
                        </FormLabel>
                        <div className="flex-1 w-full mt-1 xl:mt-0">
                            <FormInput
                            type="time"
                            value={meetingEnd}
                            onChange={(e) => setmeetingEnd(e.target.value)}
                            /> 
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-5 gap-y-5">
                    <div className="">
                    <FormLabel className="xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Participants</div>
                          <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                        </div>
                      </div>
                    </FormLabel>
                    <div className="flex-1 w-full mt-1 xl:mt-0">
                        <TomSelect value={assTo} onChange={setassTo} options={{
                            placeholder: "Select participants",
                            }} className="w-full" multiple>
                            <option value=''>Select agent</option>
                            {employees.map(em => {
                                return <option key={em.id} value={em.id}>{em.empEmail} - ({em.empName})</option>
                            })}
                        </TomSelect>
                    </div>
                    </div>

                    <div className="">
                        <FormLabel className="xl:w-64 xl:!mr-10">
                        <div className="text-left">
                            <div className="flex items-center">
                            <div className="font-medium">Heading / Note</div>
                            {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                Required
                            </div> */}
                            </div>
                        </div>
                        </FormLabel>
                        <div className="flex-1 w-full mt-1 xl:mt-0">
                        <FormInput                        
                            type="text"
                            placeholder="Add a note or heading"
                            value={meetingNote}
                            onChange={(e) => setmeetingNote(e.target.value)}
                        />
                        {/* <FormHelp className="text-right">
                            Maximum character 0/50
                        </FormHelp> */}
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <FormLabel className="xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Autofill meeting</div>
                        </div>
                      </div>
                    </FormLabel>
                    <div className="flex-1 w-full mt-1 xl:mt-0">
                        <TomSelect value={childOf} onChange={(val) => {setchildOf(val); autoFill(val);}} options={{
                                placeholder: "Select Meeting",
                            }} className="w-full">
                            <option value=''>None</option>
                            {props.leadHistory.filter(x => x.leadSubStatus === 'MEET').map(hist => {
                                let obj = JSON.parse(hist.leadActivity)
                                let date = new Date(obj.meetingDate)
                                const options = {
                                    weekday: 'long', // Full name of the weekday (e.g., "Monday")
                                    year: 'numeric', // Four-digit year (e.g., "2024")
                                    month: 'long', // Full name of the month (e.g., "April")
                                    day: 'numeric', // Numeric day of the month (e.g., "04")
                                };
                                return <option key={hist.id} value={hist.id} >
                                    (MEET{hist.id}) {obj.meetingType} - {obj.meetingNote} - {date.toLocaleString('en-IN',options)}
                                </option>
                            })}
                        </TomSelect>
                    </div>
                </div>
                



                <div className="grid grid-cols-2 gap-3 mt-5 gap-y-5">
                    <div className="">
                        <FormLabel className="xl:w-64 xl:!mr-10">
                        <div className="text-left">
                            <div className="flex items-center">
                            <div className="font-medium">Entry Type</div>
                            </div>
                        </div>
                        </FormLabel>
                        <div className="flex-1 w-full mt-1 xl:mt-0">
                            <FormSelect id="" value={meetingType} onChange={(e) => setmeetingType(e.target.value)}>
                                <option value=''>Select type</option>
                                <option value='Scheduled'>Schedule</option>
                                <option value='Rescheduled'>Reschedule</option>
                                <option value='Closed'>Close</option>
                            </FormSelect> 
                        </div>
                    </div>
                    <div className="">
                        <FormLabel className="xl:w-64 xl:!mr-10">
                        <div className="text-left">
                            <div className="flex items-center">
                            <div className="font-medium">Link</div>
                            <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                Optional
                            </div>
                            </div>
                        </div>
                        </FormLabel>
                        <div className="flex-1 w-full mt-1 xl:mt-0">
                            <FormInput
                            type="text"
                            placeholder="Enter meeting link"
                            value={meetingLink}
                            onChange={(e) => setmeetingLink(e.target.value)}
                            /> 
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                  
                    <FormLabel className="xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Description</div>
                          <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Optional
                          </div>
                        </div>
                      </div>
                    </FormLabel>
                    <div className="flex-1 w-full mt-1 xl:mt-0">
                    <ClassicEditor
                      value={description}
                      onChange={setdescription}
                    />
                      {/* <FormHelp className="text-right">
                        Maximum character 0/15
                      </FormHelp> */}
                    </div>
                  
                </div>

                <div className="flex flex-col justify-end gap-2 mt-5 md:flex-row">
            
                    <Button
                        variant="primary"
                        type="button"
                        className="w-full md:w-52"
                        onClick={() => submit()}
                    >
                        Submit
                    </Button>
                </div>
              </div>
            </div>
            </div></div>
        </>
    )
}

export default meeting;