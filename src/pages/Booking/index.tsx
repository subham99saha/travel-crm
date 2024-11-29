// @ts-nocheck
import _ from "lodash";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import fakerData from "../../utils/faker";
import Button from "../../base-components/Button";
import Pagination from "../../base-components/Pagination";
import { FormInput, FormLabel, FormSelect, FormTextarea } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import Tippy from "../../base-components/Tippy";
import TippyContent from "../../base-components/TippyContent";
import { Dialog, Menu } from "../../base-components/Headless";
import Table from "../../base-components/Table";

import { fetchAllVendorCruise, deleteVendorCruise } from "./vendorCruiseSlice";
import { useAppSelector, useAppDispatch } from "../../stores/hooks";
import { Link, useParams } from "react-router-dom";
import { format } from 'date-fns';

import { indexLeads, assignLead } from "./api"
import { indexStates } from "../State/api"
import { indexEmployees } from "../Employee/api"

import AssignModal from "../../elements/Lead/assignModal"

const Main = (props)=>{
    
    // const params = useParams();
    // const [filter,setfilter] = useState(params.filter)
    
    const filter = props.filter
    console.log({filter: props.filter})

    const [data,setdata] = useState([])
    const [states,setstates] = useState([])
    const [employees,setemployees] = useState([])

    const [assStatus,setassStatus] = useState('NL')
    const [assTo,setassTo] = useState('')
    const [toAssign,settoAssign] = useState()
    const [assignConfirmationModal, setassignConfirmationModal] = useState(false);

    const [reload,setreload] = useState(1)

    
    const handleDelete = () => {
        
    };

const filterObj = {
  'all': 'ALL',
  'unassigned': 'NL',
  'assigned': 'ASS',
  'followup': 'FOLL',
  'potential': 'POT',
  'customer': 'CUS',
  'pax': 'PAX',
  'requirement': 'REQ',
  'payment': 'PAY',
  'closed': 'CLS' 
    }

    useEffect(() => {
      async function fetchData() {
        const response = await indexLeads(filterObj[filter])
        // const response = await indexLeads('ALL')
        console.log({response})
        setdata(response)
      }
      fetchData();
      // console.log({filter})
    },[props.filter, reload]);

    useEffect(() => {
      async function fetchData() {
        const st = await indexStates()
        console.log({st})
        setstates(st)

        const emp = await indexEmployees()
        console.log({emp})
        setemployees(emp)

      }
      fetchData();
    },[]); 
    
    const getStateName = (id) => {
        let s = states.filter(x => x.id == id)
        return s[0]?.stateName
    } 
    const getEmpEmail = (id) => {
        let e = employees.filter(x => x.id == id)
        return e[0]?.empEmail
    }   

    const refresh = () => {
      // setassStatus('NL'); setassTo('')
      setreload(reload + 1)
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
      <h2 className="mt-10 text-lg font-medium intro-y">Manage Leads</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
        <Link to="/create-booking">
            <Button variant="primary" className="mr-2 shadow-md">
                Create Lead
            </Button>
          </Link>
          <Menu>
            <Menu.Button as={Button} className="px-2 !box">
              <span className="flex items-center justify-center w-5 h-5">
                <Lucide icon="Plus" className="w-4 h-4" />
              </span>
            </Menu.Button>
            <Menu.Items className="w-40">
              <Menu.Item>
                <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export to
                Excel
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export to
                PDF
              </Menu.Item>
            </Menu.Items>
          </Menu>
          <div className="hidden mx-auto md:block text-slate-500">
            {/* Showing 1 to 10 of 150 entries */}
          </div>
          <div className="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
            <div className="relative w-56 text-slate-500">
              <FormInput
                type="text"
                className="w-56 pr-10 !box"
                placeholder="Search..."
              />
              <Lucide
                icon="Search"
                className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
              />
            </div>
          </div>
        </div>
        {/* BEGIN: Data List */}
        <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
          <Table className="border-spacing-y-[10px] border-separate -mt-2">
            {/* <Table.Thead>
              <Table.Tr>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  TYPE
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  CUSTOMER
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  DESTINATION
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  TRAVEL TYPE
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  DURATION
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  REQUIREMENTS
                </Table.Th>                
                <Table.Th className="border-b-0 whitespace-nowrap">
                  ASSIGNED TO
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  ACTIONS
                </Table.Th>
              </Table.Tr>
            </Table.Thead> */}
            <Table.Tbody>
                {data.map((item, Key) => {
                    let req = Object.keys(item.requirements).filter(field => 
                        item.requirements[field].show === true
                    )

                    const dateOptions = {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    };
                  return <Table.Tr key={Key} className="intro-x">
                    <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="text-primary"><b>#LEAD000{item.id}</b></div>
                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                      {/* {item.bookingDetails.leadSource} */}
                      <div className="mt-2"><span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">{assignText[item.assignStatus][0]}</span></div>
                    </div> 
                    <div className="text-slate-500 text-xs whitespace-nowrap mt-3">
                      <b>Requirement</b>
                      <div className="capitalize">{req.join(', ')}  </div>
                    </div>                        
                    </Table.Td>
                    <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <b>{item.bookingDetails.name} </b><br />
                    <b>{item.enquiryType}</b> {(item.enquiryType != 'B2C') ? item.bookingDetails.businessName : '' }
                    <div className="text-slate-500 text-xs whitespace-nowrap mt-1.5">
                      {item.bookingDetails.email}<br />
                      {item.bookingDetails.mobile}   
                    </div>                       
                    </Table.Td>
                    {/* <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    {item.bookingDetails.mobile}                        
                    </Table.Td> */}
                    <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    {getStateName(item.bookingDetails.destination)} 
                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                      {item.bookingDetails.travelType}  
                    </div>  
                    <div className="text-slate-500 text-xs whitespace-nowrap mt-3">
                      <b>Travellers</b>
                      <div className="capitalize">{item.paxDetails.paxArr.length} PAX</div>
                    </div>                          
                    </Table.Td>
                    <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    {item.bookingDetails.startDate} 
                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                      Till {item.bookingDetails.endDate}
                    </div> 
                    <div className="mt-3"><a
                      className="flex items-center text-danger"
                      href="#"
                      onClick={(event) => {
                          event.preventDefault();
                          settoAssign(item.id)
                          setassStatus(item.assignStatus)
                          setassTo(item.assignedTo)
                          setassignConfirmationModal(true);                          
                      }}
                    >
                      <Lucide icon="User" className="w-4 h-4 mr-1" /> Assign
                    </a></div>
                    <div data-tooltip={`custom-tooltip-content-${item.id}`} className="cursor-pointer text-slate-500 text-xs whitespace-nowrap mt-0.5">
                      {getEmpEmail(item.assignedTo)}
                    </div>  
                    {/* <div className="tooltip-content">
                      <TippyContent to={`custom-tooltip-content-${item.id}`}>
                          <div className="relative flex items-center p-2">
                              {item.note}
                          </div>
                      </TippyContent>
                    </div>                                          */}                     
                    </Table.Td>
                    <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <b>₹ {item.bookingDetails.budget || ' N/A'}</b>
                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                      {item.bookingDetails.budgetFor}
                    </div> 
                    <div className="mt-3">
                      <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                        created on
                      </div> 
                      {new Date(item.createdAt).toLocaleDateString(undefined, dateOptions)}
                    </div>
                    </Table.Td>
                    <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    N/A
                    <div className="mt-3">
                      <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                        last updated
                      </div> 
                      {new Date(item.updatedAt).toLocaleDateString(undefined, dateOptions)}
                    </div>
                    </Table.Td>
                    <Table.Td className="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="grid gap-y-2">
                      <div><Link to={`/create-booking/${item.id}`}>
                      <a className="flex items-center mr-3" >
                        <Lucide icon="Pencil" className="w-4 h-4 mr-1" />
                        Edit
                      </a>
                      </Link></div>
                      <div className=""><Link to={`/view-booking/${item.id}`}>
                      <a className="flex items-center text-success" >
                        <Lucide icon="Eye" className="w-4 h-4 mr-1" />
                        Preview
                      </a>
                      </Link></div>
                      <div className=""><Link to={`/pay-for-booking/${item.id}`}>
                      <a className="flex items-center text-warning" >
                        {/* <Lucide icon="Eye" className="w-4 h-4 mr-1" /> */}
                        <span className="mr-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-scan-eye"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><circle cx="12" cy="12" r="1"/><path d="M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0"/></svg></span>                        Review
                      </a>
                      </Link></div>
                    </div>                       
                    </Table.Td>
                </Table.Tr>
                })}
            </Table.Tbody>
          </Table>
        </div>
        {/* END: Data List */}
        {/* BEGIN: Pagination */}
        {/* <div className="flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap">
          <Pagination className="w-full sm:w-auto sm:mr-auto">
            <Pagination.Link>
              <Lucide icon="ChevronsLeft" className="w-4 h-4" />
            </Pagination.Link>
            <Pagination.Link>
              <Lucide icon="ChevronLeft" className="w-4 h-4" />
            </Pagination.Link>
            <Pagination.Link>...</Pagination.Link>
            <Pagination.Link>1</Pagination.Link>
            <Pagination.Link active>2</Pagination.Link>
            <Pagination.Link>3</Pagination.Link>
            <Pagination.Link>...</Pagination.Link>
            <Pagination.Link>
              <Lucide icon="ChevronRight" className="w-4 h-4" />
            </Pagination.Link>
            <Pagination.Link>
              <Lucide icon="ChevronsRight" className="w-4 h-4" />
            </Pagination.Link>
          </Pagination>
          <FormSelect className="w-20 mt-3 !box sm:mt-0">
            <option>10</option>
            <option>25</option>
            <option>35</option>
            <option>50</option>
          </FormSelect>
        </div> */}
        {/* END: Pagination */}
      </div>
      {/* BEGIN: Delete Confirmation Modal */}
      
      <AssignModal toAssign={toAssign} assTo={assTo} assStatus={assStatus} assignConfirmationModal={assignConfirmationModal} setassignConfirmationModal={(bool) => setassignConfirmationModal(bool)} refresh={() => refresh()}/>
      {/* END: Delete Confirmation Modal */}
    </>
  );
}

export default Main;
