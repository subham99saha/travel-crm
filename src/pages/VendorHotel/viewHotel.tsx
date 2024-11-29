// @ts-nocheck
import {
    PreviewComponent,
    Preview,
} from "../../base-components/PreviewComponent";
import {
    FormLabel,
    FormInput,
    FormSelect,
    FormTextarea
} from "../../base-components/Form";
//import fakervendorHotel.data from "../../utils/faker";
import _, { get } from "lodash";
import Button from "../../base-components/Button";
import Notification from "../../base-components/Notification";
import Lucide from "../../base-components/Lucide";
import { useForm } from "react-hook-form";
import Toastify from "toastify-js";
import clsx from "clsx";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { getVendorHotel } from "./vendorHotelSlice";
import { getVendorHotelRoom, deleteVendorHotelRoom } from "./HotelRoom/vendorHotelRoomSlice";
import { Dialog, Menu } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import { format } from 'date-fns';
import api from "../../../apiconfig.json";



const viewHotel = () => {
    const server = api.API_URL;
    const imgaePath = `${server}images/hotel/`;

    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
    const deleteButtonRef = useRef(null);
    const deleteValueRef = useRef("");
    const params = useParams();
    const dispatch = useAppDispatch();
    const { data } = useAppSelector((state) => state.hotelRoomReducer);
    const vendorHotel = useAppSelector((state) => state.vendorHotel);

    const handleDelete = (id: any) => {
        dispatch(deleteVendorHotelRoom(deleteValueRef.current));
        dispatch(getVendorHotelRoom(params.id));
        setDeleteConfirmationModal(false);


    };

    useEffect(() => {
        dispatch(getVendorHotel(params.id));
        dispatch(getVendorHotelRoom(params.id));
    }, []);

    console.log(data);

    return (
        <>
            <div className="flex items-center mt-8 intro-y">
                <h2 className="mr-auto text-lg font-medium">Manage Hotel</h2>
                <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
                    <Link to="/vendor-hotel">
                        <Button variant="secondary" type="button" className="ml-3 mr-0">
                            <Lucide icon="ChevronsLeft" className="w-4 h-4 mr-2" /> Back
                        </Button>
                    </Link>
                </div>
            </div>
            {/* BEGIN: Hotel Info */}
            <div className="px-5 pt-5 mt-5 intro-y box">
                <div className="flex flex-col pb-5 -mx-5 border-b lg:flex-row border-slate-200/60 dark:border-darkmode-400">
                    <div className="flex items-center justify-center flex-1 px-5 lg:justify-start">
                        <div className="relative flex-none w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 image-fit">
                            <img
                                alt="Midone Tailwind HTML Admin Template"
                                className="rounded-md"
                                src={imgaePath + vendorHotel.data.mainImg}
                            />
                        </div>
                        <div className="ml-5">
                            <div className="w-24 text-lg font-medium truncate sm:w-40 sm:whitespace-normal">
                                {vendorHotel.data.hotelName}
                            </div>
                            <div className="text-slate-500">{vendorHotel.data.hotelType}</div>
                            <div className="mt-5 text-slate-600 dark:text-slate-500">
                                <div className="flex items-center">
                                    <Lucide icon="Layers" className="w-4 h-4 mr-2" /> Room Rent (Season): Rs.{vendorHotel.data.minRoomRentSeasonAC} Non AC: Rs.{vendorHotel.data.minRoomRentSeasonNonAC}
                                </div>
                                <div className="flex items-center">
                                    <Lucide icon="Layers" className="w-4 h-4 mr-2" /> Room Rent (Off Season): Rs.{vendorHotel.data.minRoomRentOffSeasonAC} Non AC: Rs.{vendorHotel.data.minRoomRentOffSeasonNonAC}
                                </div>
                            </div>
                            <div
                                className={clsx([
                                    "flex items-center mt-2",
                                    { "text-success": (vendorHotel.data.isActive === 'Y' ? true : false) },
                                    { "text-danger": !(vendorHotel.data.isActive === 'Y' ? true : false) },
                                ])}
                            >
                                <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
                                Status: {vendorHotel.data.isActive == 'Y' ? "Active" : "Inactive"}
                            </div>

                        </div>
                    </div>
                    <div className="flex-1 px-5 pt-5 mt-6 border-t border-l border-r lg:mt-0 border-slate-200/60 dark:border-darkmode-400 lg:border-t-0 lg:pt-0">
                        <div className="font-medium text-center lg:text-left lg:mt-3">
                            Details
                        </div>
                        <div className="flex flex-col items-center justify-center mt-4 lg:items-start">
                            {vendorHotel.data.desc}
                        </div>
                    </div>
                    <div className="flex items-center justify-center flex-1 px-5 pt-5 mt-6 border-t lg:mt-0 lg:border-0 border-slate-200/60 dark:border-darkmode-400 lg:pt-0">
                        <div className="mt-5 text-slate-600 dark:text-slate-500">
                            {
                                vendorHotel.data.contactNumber &&
                                <div className="flex items-center">
                                    <Lucide icon="Link" className="w-4 h-4 mr-2" /> Contact Number: {vendorHotel.data.contactNumber}
                                </div>
                            }
                            {
                                vendorHotel.data.checkInTimeH &&
                                <div className="flex items-center">
                                    <Lucide icon="Layers" className="w-4 h-4 mr-2" /> Check-in Time: {vendorHotel.data.checkInTimeH}:{vendorHotel.data.checkInTimeM}
                                </div>
                            }

                            <div className="flex items-center">
                                <Lucide icon="Layers" className="w-4 h-4 mr-2" /> Check-out Time: {vendorHotel.data.checkOutTimeH}:{vendorHotel.data.checkOutTimeM}
                            </div>
                            <div className="flex items-center">
                                <Lucide icon="Layers" className="w-4 h-4 mr-2" /> Min Room Rent (Season): Rs.{vendorHotel.data.minRoomRentSeasonAC} Non AC: Rs.{vendorHotel.data.minRoomRentSeasonNonAC}
                            </div>
                            <div className="flex items-center">
                                <Lucide icon="Layers" className="w-4 h-4 mr-2" /> Min Room Rent (Off Season): Rs.{vendorHotel.data.minRoomRentOffSeasonAC} Non AC: Rs.{vendorHotel.data.minRoomRentOffSeasonNonAC}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* END: Hotel Info Info */}
            <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">

                <div className="grid grid-cols-12 gap-6 mt-5">
                    <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
                        <Link to={`/add-vendor-hotel-room/${params.id}`}>
                            <Button variant="primary" className="mr-2 shadow-md">
                                Add Room
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
                        {data.length > 0 ?
                            <Table className="border-spacing-y-[10px] border-separate -mt-2">
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th className="border-b-0 whitespace-nowrap">
                                            Room Type
                                        </Table.Th>
                                        <Table.Th className="border-b-0 whitespace-nowrap">
                                            Room Name
                                        </Table.Th>
                                        <Table.Th className="border-b-0 whitespace-nowrap">
                                            Description
                                        </Table.Th>
                                        <Table.Th className="border-b-0 whitespace-nowrap">
                                            CREATED ON
                                        </Table.Th>
                                        <Table.Th className="border-b-0 whitespace-nowrap">
                                            UPDATED ON
                                        </Table.Th>
                                        <Table.Th className="text-center border-b-0 whitespace-nowrap">
                                            STATUS
                                        </Table.Th>
                                        <Table.Th className="text-center border-b-0 whitespace-nowrap">
                                            ACTIONS
                                        </Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {_.take(data, data.length).map((item, Key) => (
                                        <Table.Tr key={Key} className="intro-x">
                                            <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                                <Link to={`/preview-vendor-hotel-room/${item.id}`}>
                                                    {item.roomType}
                                                </Link>
                                            </Table.Td>
                                            <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                                <Link to={`/preview-vendor-hotel-room/${item.id}`}>
                                                    {/* <a href="" className="font-medium whitespace-nowrap"> */}
                                                    {item.hRoomName}
                                                    {/* </a> */}
                                                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                                                        Floor: {item.hRoomFloor}
                                                    </div>
                                                </Link>
                                            </Table.Td>
                                            <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                                {item.hRoomDesc}
                                            </Table.Td>
                                            <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                                {format(new Date(item.createdAt), 'yyyy/MM/dd kk:mm:ss')}

                                            </Table.Td>
                                            <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                                {format(new Date(item.updatedAt), 'yyyy/MM/dd kk:mm:ss')}

                                            </Table.Td>
                                            {/* <Table.Td className="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                                                <div className="flex items-center justify-center">
                                                    <Link to={`/add-day-rates/room/${item.id}`}>
                                                        <a className="flex items-center mr-3" >
                                                            Update
                                                        </a>
                                                    </Link>
                                                </div>
                                            </Table.Td> */}
                                            
                                            <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                                <div
                                                    className={clsx([
                                                        "flex items-center justify-center",
                                                        { "text-success": (item.isActive === 'Y' ? true : false) },
                                                        { "text-danger": !(item.isActive === 'Y' ? true : false) },
                                                    ])}
                                                >
                                                    <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
                                                    {item.isActive === 'Y' ? "Active" : "Inactive"}
                                                </div>
                                            </Table.Td>
                                            <Table.Td className="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                                                <div className="flex items-center justify-center">
                                                    <Link to={`/edit-vendor-hotel-room/${params.id}/${item.id}`}>
                                                        <a className="flex items-center mr-3" >
                                                            <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" />
                                                            Edit
                                                        </a>
                                                    </Link>
                                                    <a
                                                        className="flex items-center text-danger"
                                                        href="#"
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            deleteValueRef.current = item.id;
                                                            setDeleteConfirmationModal(true);

                                                        }}
                                                    >
                                                        <Lucide icon="Trash2" className="w-4 h-4 mr-1" /> Delete
                                                    </a>
                                                </div>
                                            </Table.Td>
                                        </Table.Tr>
                                    ))}
                                </Table.Tbody>
                            </Table>
                            : ''}
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
            </div>
            {/* BEGIN: Delete Confirmation Modal */}
            <Dialog
                open={deleteConfirmationModal}
                onClose={() => {
                    setDeleteConfirmationModal(false);
                }}
                initialFocus={deleteButtonRef}
            >
                <Dialog.Panel>
                    <div className="p-5 text-center">
                        <Lucide
                            icon="XCircle"
                            className="w-16 h-16 mx-auto mt-3 text-danger"
                        />
                        <div className="mt-5 text-3xl">Are you sure?</div>
                        <div className="mt-2 text-slate-500">
                            Do you really want to delete these records? <br />
                            This process cannot be undone.
                        </div>
                    </div>
                    <div className="px-5 pb-8 text-center">
                        <Button
                            variant="outline-secondary"
                            type="button"
                            onClick={() => {
                                setDeleteConfirmationModal(false);
                            }}
                            className="w-24 mr-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="danger"
                            type="button"
                            className="w-24"
                            ref={deleteButtonRef}
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </div>
                </Dialog.Panel>
            </Dialog>
            {/* END: Delete Confirmation Modal */}
        </>
    );
}

export default viewHotel;

