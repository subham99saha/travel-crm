// @ts-nocheck

import { useState, useRef, useEffect } from "react";

import Lucide from "../../base-components/Lucide";

import { indexEmployees } from "../../pages/Employee/api"

const history = (props) => {
    // console.log({history: props.leadHistory})
    const [employees,setemployees] = useState([])

    useEffect(() => {
        async function fetchData() {
          const emp = await indexEmployees()
          console.log({emp})
          setemployees(emp)
        }
        fetchData();
    },[]);

    const getEmpEmail = (id) => {
        let e = employees.filter(x => x.id == id)
        // console.log({mail:e[0]?.empEmail})
        return e[0]?.empEmail
    }   

    const renderSwitch = (id,subStatus,obj,note,task) => {
        switch(subStatus) {
            case 'PROP':
                return (
                    <div className="grid gap-y-3">
                        <div>Sent to <span class="bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">{obj.otherEmail}</span></div>
                        <div className="text-lg font-bold">{obj.subject}</div>
                        <div className=""><div dangerouslySetInnerHTML={{ __html: obj.body }} /></div>
                    </div>
                );
            case 'MEET':
                let date = new Date(obj.meetingDate)
                const options = {
                    weekday: 'long', // Full name of the weekday (e.g., "Monday")
                    year: 'numeric', // Four-digit year (e.g., "2024")
                    month: 'long', // Full name of the month (e.g., "April")
                    day: 'numeric', // Numeric day of the month (e.g., "04")
                };
                return (
                    <div className="grid gap-y-3">
                        <div className="text-lg font-bold">#{id} {obj.meetingNote} {(obj.childOf) ? `[MEET${obj.childOf}]` : '' }</div>
                        <div> 
                            Date: <b>{date.toLocaleString('en-IN',options)}</b> <br />
                            Time: <b>{obj.meetingStart}</b> - <b>{obj.meetingEnd}</b> <br />
                            Status: <b>{obj.meetingType}</b>
                        </div>
                        {(obj.meetingLink) ? <div className="small"><a href={obj.meetingLink} target="_blank"><u>{obj.meetingLink}</u></a></div> : ''}
                        {(obj.description) ? <div className="grid gap-y-3">
                                <div className=""><div dangerouslySetInnerHTML={{ __html: obj.description }} /></div>
                            </div> : ''}
                    </div>
                );
            case 'NOTE':
                return (
                    <div className="grid gap-y-3">
                        <div className=""><div dangerouslySetInnerHTML={{ __html: note }} /></div>
                    </div>
                );
            case 'TASK':
                return (
                    <div className="grid gap-y-3">
                        <div className="text-lg font-bold">{task.taskHead}</div>
                        <div className=""><div dangerouslySetInnerHTML={{ __html: task.taskBody }} /></div>
                    </div>
                );
            default:
                return '';
        }
    }

    const subStat = {
        'FOLL' : 'Follow-up', 
        'PROP' : 'Proposal', 
        'MEET' : 'Meeting', 
        'NOTE' : 'Note', 
        'TASK' : 'Task'
    }
    const assignText = {
        '': ['','success'],
        'NL': ['Unassigned','success'],
        'ASS': ['Assigned','success'],
        'FOLL': ['Follow-up','success'],
        'POT': ['Potential','success'],
        'CUS': ['Customer','success'],
        'PAX': ['PAX','success'],
        'REQ': ['Requirement','success'],
        'PAY': ['Payment','success'],
        'CLS': ['Closed','success'],
    }
    return (
        <>
            <div className="list_view_area py-10">
                {props.leadHistory?.map((hist,idx) => {
                    const options = {
                        weekday: 'long', // Full name of the weekday (e.g., "Monday")
                        year: 'numeric', // Four-digit year (e.g., "2024")
                        month: 'long', // Full name of the month (e.g., "April")
                        day: 'numeric', // Numeric day of the month (e.g., "04")
                        hour: 'numeric', // Hour (e.g., "06")
                        minute: 'numeric', // Minute (e.g., "51")
                        second: 'numeric', // Second (e.g., "28")
                        timeZone: 'Asia/Kolkata', // Indian time zone
                    };
                    const _created = new Date(hist.createdAt);
                    const createdAt = _created.toLocaleString('en-IN', options);
                    return <div className="list_view_main flex justify-start items-start mb-12">
                    <div className="w-2/12 list_view_area_number">
                        <div className="bg-primary text-white text-xl w-[55px] h-[55px] rounded-full flex justify-center items-center">{props.leadHistory.length - idx}</div>
                    </div>
                    <div className="w-10/12 ">
                        <div className="w-10/12 py-5 px-5 shadow-2xl rounded-xl">
                            <h4 className="text-primary text-xl font-bold pb-2">{subStat[hist.leadSubStatus]}</h4>
                            <div className="mb-2">
                                <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">{assignText[hist.leadMainStatus][0]}</span>
                            </div>
                            <div className="my-5 py-5">
                            {renderSwitch(hist.id,hist.leadSubStatus,JSON.parse(hist.leadActivity),hist.note,JSON.parse(hist.task))}
                            </div>
                            <div className="text-[14px] pb-2 flex flex-wrap gap-y-2">
                                <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">{getEmpEmail(hist.leadAssignBy)}</span>
                                { (hist.leadAssignTo) ? <><span className="py-0.5"><Lucide icon="ArrowRightCircle" className="w-4 h-4 mr-2" /></span>
                                {hist.leadAssignTo.split(', ').map(item => {
                                    return <span class="bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-pink-400 border border-pink-400">
                                        {getEmpEmail(item)}
                                    </span>
                                })}
                                </> : '' }
                            </div>
                            <p className="text-gray-500 text-[14px]">{createdAt}</p>
                        </div>
                    </div>
                </div>
                })}
            
        </div>
        </>
    )
}

export default history;