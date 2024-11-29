// @ts-nocheck
import _, { result } from "lodash";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import fakerData from "../../utils/faker";
import Button from "../../base-components/Button";
import Pagination from "../../base-components/Pagination";
import { FormInput, FormSelect } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import Tippy from "../../base-components/Tippy";
import { Dialog, Menu } from "../../base-components/Headless";
import Table from "../../base-components/Table";

import { fetchAllVendorHotel, deleteVendorHotel } from "./vendorHotelSlice";
import { useAppSelector, useAppDispatch } from "../../stores/hooks";
import { Link } from "react-router-dom";
import { format } from 'date-fns';
import api from "../../../apiconfig.json";

const hotelInventoryIndex = ()=>{
    const server = api.API_URL;
    const imgaePath = `${server}images/hotel/`;
    const dispatch = useAppDispatch();
    const { data } = useAppSelector((state) => state.vendorHotel);

     console.log({data})

  ////console.log("Data: ",data)
  const [superlargeModalSizePreview, setSuperlargeModalSizePreview] = useState(false);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [fiterData, setfilterData] = useState("");
  const deleteButtonRef = useRef(null);
  const deleteValueRef = useRef("");

  const handleDelete = (id: any) => {
    dispatch(deleteVendorHotel(deleteValueRef.current));
    dispatch(fetchAllVendorHotel());
    setDeleteConfirmationModal(false);    
  };
 
  
  useEffect(()=>{
    let userType = JSON.parse(localStorage.getItem('userInfo'))['resData']['userType']
        let userId = userType === "S" ? JSON.parse(localStorage.getItem('userInfo'))['resData']['id'] : JSON.parse(localStorage.getItem('userInfo'))['vendorData']['id']

        console.log({ userId, userType })
        dispatch(fetchAllVendorHotel({ userId, userType }));
},[]);  

  

  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y">Manage Inventory (Vendor)</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
        {/* <Link to="/add-vendor-hotel">
            <Button variant="primary" className="mr-2 shadow-md">
                Add Hotel
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
          */}
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
        {/* BEGIN: Users Layout */}
        <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
          <Table className="border-spacing-y-[10px] border-separate -mt-2">
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  IMAGES
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  NAME
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  MIN ROOM RENT (AC)
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  MIN ROOM RENT (NON AC)
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  FOOD RATE
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  STATUS
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  INVENTORY UPDATE
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {_.take(data, data.length).map((item, Key) => (
                <Table.Tr key={Key} className="intro-x">
                  <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="flex">
                      <div className="w-20 h-20 image-fit zoom-in">
                      
                        <Tippy
                          as="img"
                          alt={`${item.hotelName}`}
                          className="rounded-md shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                          src={`${imgaePath}${item.mainImg}`}
                          content={`${item.hotelName}`}
                        />
                        
                      </div>
                    </div>
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    {/* <a href="" className="font-medium whitespace-nowrap"> */}
                    {item.hotelName}
                    {/* </a> */}
                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                      Check In: {item.checkInTimeH}:{(item.checkInTimeM!=''?item.checkInTimeM:'00')}
                    </div>
                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                      Check Out: {item.checkOutTimeH}:{(item.checkOutTimeM!=''?item.checkOutTimeM:'00')}
                    </div>
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div>
                      On Season : Rs.{item.minRoomRentSeasonAC}
                    </div>
                    <div>
                      Off Season : Rs.{item.minRoomRentOffSeasonAC}
                    </div>
                    
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                  <div>
                      On Season : Rs.{item.minRoomRentSeasonNonAC} 
                    </div>
                    <div>
                      Off Season : Rs.{item.minRoomRentOffSeasonNonAC} 
                    </div>
                    
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div>
                      Breakfast : Rs.{item.minBreakfastCharge} 
                    </div>
                    <div>
                      Lunch : Rs.{item.minLunchCharge} 
                    </div>
                    <div>
                      Dinner : Rs.{item.minDinnerCharge} 
                    </div>
                    
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div
                        className={clsx([
                            "flex items-center justify-center",
                            { "text-success":  (item.isActive==='Y' ? true : false) },
                            { "text-danger": ! (item.isActive==='Y' ? true : false) },
                          ])} 
                    >
                      <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
                      {item.isActive==='Y' ? "Active" : "Inactive"}
                    </div>
                  </Table.Td>
                  
                  <Table.Td className="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                    <div 
                      className="flex items-center justify-center" 
                    >
                    
                    <Link to={`/add-day-rates/hotel/${item.id}`}>
                      <Button variant="primary" className="mr-2 shadow-md">
                          By Hotel
                      </Button>
                    </Link> 
                    <Link to={`/vendor-room-inventory/${item.id}`}>
                      <Button variant="primary" className="mr-2 shadow-md">
                          By Room
                      </Button>
                    </Link>
                     
                    </div>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
        {/* END: Users Layout */}
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
    </>
  );
}

export default hotelInventoryIndex;
