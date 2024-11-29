// @ts-nocheck
import { useState, useEffect, useRef, SetStateAction } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";
import Tab from "../../base-components/Headless/Tab";

import { createLead, getLead, updateLead, createLeadHistory, getLeadHistory } from "./api"

import History from "../../elements/Lead/history"
import Proposal from "../../elements/Lead/sendProposal"
import Meeting from "../../elements/Lead/meeting"
import Notes from "../../elements/Lead/notes"
import Tasks from "../../elements/Lead/tasks"
import ViewLeadDetails from "../../elements/Lead/viewLeadDetails"
import AssignModal from "../../elements/Lead/assignModal"
import Notify from "../../elements/notify"

import api from "../../../apiconfig.json";

  const createBooking = () => {    
    const params = useParams();
    // const [searchParams,] = useSearchParams( );
    // const id = searchParams.get('id')
    const id = params.id

    const [payload,setpayload] = useState({})
    const [bookingDetails,setbookingDetails] = useState({})
    const [paxArr,setpaxArr] = useState([])
    const [requirements,setrequirements] = useState({
        flight: {
          show: false,
          flightArr: []
        },
        train: {
            show: false,
            trainArr: []
        },
        hotel: {
          show: false,
          hotelArr: []
        },
        car: {
          show: false,
          carArr: []
        },
        activity: {
          show: false,
          activityArr: []
        }
    })
    const [leadHistory,setleadHistory] = useState([])

    const [assStatus,setassStatus] = useState(payload.assignStatus)
    const [assTo,setassTo] = useState(payload.assignedTo)
    const [toAssign,settoAssign] = useState(id)
    const [assignConfirmationModal, setassignConfirmationModal] = useState(false);

    const [reload,setreload] = useState(1)

    useEffect(() => { 
        // console.log(JSON.parse(localStorage.getItem('userInfo')).resData.sEmail)
        async function fetchData() {  
            if (id != null) {
                const response = await getLead(id)
                console.log({response})
                if (response.id) {
                    //   let newPayload = {...payload}
                    //   newPayload.enquiryType = response.enquiryType
                    response.bookingDetails = JSON.parse(response.bookingDetails)
                    response.paxDetails = JSON.parse(response.paxDetails)
                    response.requirements = JSON.parse(response.requirements)
                    setpayload(response)
                    setbookingDetails(response.bookingDetails)
                    setpaxArr(response.paxDetails.paxArr)
                    setrequirements(response.requirements)
                    // console.log({response})
                }
                // console.log({payload})
                console.log({requirements})
                
                const hist = await getLeadHistory(id)
                console.log({hist})
                setleadHistory(hist)
            }
        }
        fetchData();
        console.log(id)
      
      
    },[reload])

    const refresh = () => {
        
        setreload(reload + 1)
        // console.log('Parent',reload)
    }
    const notifRef = useRef();

    const logAction = async (data,notifData) => {
        console.log({notifData})
        const dump = {
            leadId: id,
            leadAssignBy: JSON.parse(localStorage.getItem('userInfo')).resData.id,
            leadAssignTo: data.leadAssignTo,
            leadMainStatus: payload.assignStatus,
            leadSubStatus: data.leadSubStatus,
            leadActivity: data.leadActivity,
            note: data.note,
            task: data.task
        }
        const resp = await createLeadHistory(dump)
        console.log({resp})
        notifRef.current.notifToggle(notifData[0],notifData[1]);
        setreload(reload + 1)
    }

    const statusArr = ['NL', 'ASS', 'FOLL', 'POT', 'CUS', 'PAX', 'REQ', 'PAY', 'CLS']
    
    return (
      <>
    <AssignModal toAssign={toAssign} assTo={assTo} assStatus={assStatus} assignConfirmationModal={assignConfirmationModal} setassignConfirmationModal={(bool) => setassignConfirmationModal(bool)} refresh={() => refresh()}/>
    <Notify ref={notifRef} />

    <div className={`grid grid-cols-9 gap-1 mt-10`}>
        {statusArr.map((st,idx) => {
            let bg = 'bg-secondary text-dark'
            if ( idx <= statusArr.indexOf(payload.assignStatus) ) {
                // console.log(payload.assignStatus,statusArr.indexOf(payload.assignStatus),idx)
                bg = 'bg-primary text-white'
            }
            return <div key={st} className={`flex justify-center ${bg}`}>{st}</div>
        })}
    </div> 

<Tab.Group className="mt-10">
    <Tab.List variant="tabs">
        <Tab>
            <Tab.Button className="w-full py-2" as="button">
                Lead Details
            </Tab.Button>
        </Tab>
        <Tab>
            <Tab.Button className="w-full py-2" as="button">
                Followup History
            </Tab.Button>
        </Tab>
        <Tab>
            <Tab.Button className="w-full py-2" as="button">
                Send Proposal
            </Tab.Button>
        </Tab>
        <Tab>
            <Tab.Button className="w-full py-2" as="button">
                Meetings
            </Tab.Button>
        </Tab>
        <Tab>
            <Tab.Button className="w-full py-2" as="button">
                Notes
            </Tab.Button>
        </Tab>
        <Tab>
            <Tab.Button className="w-full py-2" as="button">
                Task
            </Tab.Button>
        </Tab>
    </Tab.List>
    <Tab.Panels className="border-b border-l border-r">
        <Tab.Panel className="p-5 pt-5 leading-relaxed">
            <ViewLeadDetails id={id} payload={payload} bookingDetails={bookingDetails} paxArr={paxArr} requirements={requirements} setassignConfirmationModal={(bool) => setassignConfirmationModal(bool)}/>
        </Tab.Panel>
        <Tab.Panel className="p-5 pt-0 leading-relaxed">
            <History leadHistory={leadHistory} />
        </Tab.Panel>
        <Tab.Panel className="p-5 pt-5 leading-relaxed">
            <Proposal logAction={(data,notifData) => logAction(data,notifData)} />
        </Tab.Panel>
        <Tab.Panel className="p-5 leading-relaxed">
            <Meeting leadHistory={leadHistory} logAction={(data,notifData) => logAction(data,notifData)} />
        </Tab.Panel>
        <Tab.Panel className="p-5 leading-relaxed">
            <Notes logAction={(data,notifData) => logAction(data,notifData)} />
        </Tab.Panel>
        <Tab.Panel className="p-5 leading-relaxed">
            <Tasks logAction={(data,notifData) => logAction(data,notifData)} />
        </Tab.Panel>
    </Tab.Panels>
</Tab.Group>

        
                        
      </>)
  }
  
  export default createBooking;