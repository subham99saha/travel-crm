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
import fakerData from "../../utils/faker";
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
import { getHotelRoomByID } from "./hotelRoomSlice";
import { fetchAllVendor } from "../Vendor/vendorSlice";
import api from "../../../apiconfig.json";
import { Menu, Dialog } from "../../base-components/Headless";

import { viewVideoGalleryByRoom, updateVideo } from './HotelVideo/RoomVideoSlice'
import { viewImageGalleryByRoom, updateImage } from './HotelImage/RoomImageSlice'

import ReactPlayer from 'react-player';

import Table from "../../base-components/Table";

const previewRoom = () => {
    const server = api.API_URL;
    const imgaePath = `${server}images/hotel/`;
    const params = useParams();
    const dispatch = useAppDispatch();

    const { data: vendorHotelData } = useAppSelector((state) => state.vendorHotel);
    const { data: hotelRoomData } = useAppSelector((state) => state.hotelRoomReducer);
    const { data: hotelRoomVideos } = useAppSelector((state) => state.hotelRoomVideoReducer);
    const { data: hotelRoomImages } = useAppSelector((state) => state.hotelRoomImageReducer);

    const [roomId, setRoomId] = useState();
    const [videoName, setVideoName] = useState();
    const [videoStat, setVideoStat] = useState();
    const [newVideo, setNewVideo] = useState();
    const [reload, setReload] = useState(0)

    const [videoModal, setVideoModal] = useState()
    const [videoLink, setVideoLink] = useState('')

    const [imageModal, setImageModal] = useState()
    const [imageLink, setImageLink] = useState('')

    useEffect(() => {
        dispatch(getVendorHotel(params.id));
        dispatch(getHotelRoomByID(params.id))
        dispatch(viewVideoGalleryByRoom(params.id))
        dispatch(viewImageGalleryByRoom(params.id))
    }, [reload]);

    console.log({ hotelRoomImages });
    console.log({ hotelRoomVideos });
    console.log({ hotelRoomData });
    console.log(params.id)

    const updateRoomVideo = async (data, stat) => {
        console.log(data)
        var formData = new FormData();

        formData.append('id', Number(data.id));

        formData.append('hId', Number(data.hId));
        formData.append('videoName', data.videoName);
        formData.append('createdBy', data.createdBy);
        formData.append('isActive', data.isActive);
        formData.append('isApproved', stat);

        // formData.append('file', newVideo);

        for (const value of formData.values()) {
            console.log(value);
        }

        const updateResponse = await dispatch(updateVideo(formData))
        console.log(updateResponse)
        setReload(reload + 1)
    }

    const updateRoomImage = async (data, stat) => {
        console.log(data)
        var formData = new FormData();

        formData.append('id', Number(data.id));

        formData.append('hId', Number(data.hId));
        formData.append('imageName', data.imageName);
        formData.append('createdBy', data.createdBy);
        formData.append('isActive', data.isActive);
        formData.append('isApproved', stat);

        for (const value of formData.values()) {
            console.log(value);
        }

        const updateResponse = await dispatch(updateImage(formData))
        console.log(updateResponse)
        setReload(reload + 1)
    }

    return (
        <div className="p-5">
            <div className="flex items-center mt-8 intro-y p-3">
                <h2 className="mr-auto text-lg font-medium">Manage {hotelRoomData.roomType}</h2>
                <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
                    <Link to="/vendor-hotel">
                        <Button variant="outline-primary" className="mr-2 shadow-md" size="sm">
                            <Lucide icon="ChevronsLeft" className="w-4 h-4 mr-2" /> Back
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="px-5 pt-5 mt-5 intro-y box">
                <div className="flex flex-col pb-5 -mx-5 border-b lg:flex-row border-slate-200/60 dark:border-darkmode-400">
                    <div className="flex items-center justify-center flex-1 px-5 lg:justify-start">
                        <div className="ml-5">
                            <div className="w-24 text-lg font-medium truncate sm:w-40 sm:whitespace-normal">
                                {hotelRoomData.roomType}
                            </div>
                            <div className="text-slate-500">{vendorHotelData.hotelType}</div>
                            <div className="mt-5 text-slate-600 dark:text-slate-500">
                                <div className="flex items-center">
                                    <Lucide icon="Layers" className="w-4 h-4 mr-2" /> Room Rent (Season): Rs.{vendorHotelData.minRoomRentSeasonAC} Non AC: Rs.{vendorHotelData.minRoomRentSeasonNonAC}
                                </div>
                                <div className="flex items-center">
                                    <Lucide icon="Layers" className="w-4 h-4 mr-2" /> Room Rent (Off Season): Rs.{vendorHotelData.minRoomRentOffSeasonAC} Non AC: Rs.{vendorHotelData.minRoomRentOffSeasonNonAC}
                                </div>
                            </div>
                            <div
                                className={clsx([
                                    "flex items-center mt-2",
                                    { "text-success": (vendorHotelData.isActive === 'Y' ? true : false) },
                                    { "text-danger": !(vendorHotelData.isActive === 'Y' ? true : false) },
                                ])}
                            >
                                <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
                                Status: {vendorHotelData.isActive == 'Y' ? "Active" : "Inactive"}
                            </div>

                        </div>
                    </div>
                    <div className="flex-1 px-5 pt-5 mt-6 border-t border-l border-r lg:mt-0 border-slate-200/60 dark:border-darkmode-400 lg:border-t-0 lg:pt-0">
                        <div className="font-medium text-center lg:text-left lg:mt-3">
                            Details
                        </div>
                        <div className="flex flex-col items-center justify-center mt-4 lg:items-start">
                            {vendorHotelData.desc}
                        </div>
                    </div>
                    <div className="flex items-center justify-center flex-1 px-5 pt-5 mt-6 border-t lg:mt-0 lg:border-0 border-slate-200/60 dark:border-darkmode-400 lg:pt-0">
                        <div className="mt-5 text-slate-600 dark:text-slate-500">
                            {
                                vendorHotelData.contactNumber &&
                                <div className="flex items-center">
                                    <Lucide icon="Link" className="w-4 h-4 mr-2" /> Contact Number: {vendorHotelData.contactNumber}
                                </div>
                            }
                            {
                                vendorHotelData.checkInTimeH &&
                                <div className="flex items-center">
                                    <Lucide icon="Layers" className="w-4 h-4 mr-2" /> Check-in Time: {vendorHotelData.checkInTimeH}:{vendorHotelData.checkInTimeM}
                                </div>
                            }

                            <div className="flex items-center">
                                <Lucide icon="Layers" className="w-4 h-4 mr-2" /> Check-out Time: {vendorHotelData.checkOutTimeH}:{vendorHotelData.checkOutTimeM}
                            </div>
                            <div className="flex items-center">
                                <Lucide icon="Layers" className="w-4 h-4 mr-2" /> Min Room Rent (Season): Rs.{vendorHotelData.minRoomRentSeasonAC} Non AC: Rs.{vendorHotelData.minRoomRentSeasonNonAC}
                            </div>
                            <div className="flex items-center">
                                <Lucide icon="Layers" className="w-4 h-4 mr-2" /> Min Room Rent (Off Season): Rs.{vendorHotelData.minRoomRentOffSeasonAC} Non AC: Rs.{vendorHotelData.minRoomRentOffSeasonNonAC}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6 mt-10 intro-y">
                <div className="col-span-12 lg:col-span-6">
                    <h2 className="text-lg font-medium">Manage Image Repo</h2>
                    <div className="grid grid-cols-6 gap-2 p-5 mt-5">
                        {
                            hotelRoomImages.length > 0
                                ? hotelRoomImages.map((data, i) => {
                                    return (
                                        <div key={i} className="col-span-12 intro-y md:col-span-6 lg:col-span-5 xl:col-span-3">
                                            <div className="box">
                                                <div className="p-5">
                                                    <div className="h-40 overflow-hidden rounded-md 2xl:h-56 image-fit before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-black before:to-black/10"
                                                        onClick={() => {
                                                            console.log(`${api.API_URL}images/hotelRoom/${data.roomImage}`)
                                                            setImageLink(`${api.API_URL}images/hotelRoom/${data.roomImage}`)
                                                            setImageModal(true);
                                                        }}
                                                    >
                                                        <img
                                                            alt={data.imageName}
                                                            className="rounded-md"
                                                            src={`${api.API_URL}images/hotelRoom/${data.roomImage}`}
                                                        />
                                                        {console.log({ imageLink: `${api.API_URL}images/hotelRoom/${data.roomImage}` })}
                                                        <div className="absolute bottom-0 z-10 px-5 pb-6 text-white">
                                                            <a href="" className="block text-base font-medium">
                                                                {data.imageName}
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="mt-5 text-slate-600 dark:text-slate-500">
                                                        <div className="flex items-center mt-2">
                                                            <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />{" "}
                                                            Approval Status: {" "}
                                                            {/* <span style={{ color: data.isApproved === "Y" ? "#198754" : data.isApproved === "P" ? "#ffc107" : "#dc3545" }}>{data.isApproved === "Y" ? "Approved" : data.isApproved === "P" ? "Pending" : "Rejected"}</span> */}
                                                            <Menu className="mt-5 md:ml-auto md:mt-0">
                                                                <Menu.Button
                                                                    as={Button}
                                                                    variant="outline-secondary"
                                                                    className="font-normal w-full flex justify-center"
                                                                >
                                                                    <span style={{ color: data.isApproved === "Y" ? "#198754" : data.isApproved === "P" ? "#ffc107" : "#dc3545" }}>{data.isApproved === "Y" ? "Approved" : data.isApproved === "P" ? "Pending" : "Rejected"}</span>
                                                                    <Lucide icon="ChevronDown" className="w-full h-4 ml-2" />
                                                                </Menu.Button>
                                                                <Menu.Items className="w-40 h-30 overflow-y-auto">
                                                                    <Menu.Item onClick={() => updateRoomImage(data, 'Y')}>Approve</Menu.Item>
                                                                    <Menu.Item onClick={() => updateRoomImage(data, 'N')}>Reject</Menu.Item>
                                                                </Menu.Items>
                                                            </Menu>
                                                        </div>

                                                        <div className="flex items-center mt-2">
                                                            <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />{" "}
                                                            Room Status:{" "}
                                                            <span style={{ color: data.isActive === "Y" ? "#0d6efd" : "#dc3545" }}>{data.isActive === "Y" ? "Active" : "Inactive"}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                : <p className="w-full text-center">Images not uploaded yet</p>
                        }
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-6">
                    <h2 className="text-lg font-medium">Manage Video Repo</h2>
                    <div className="col-span-12 intro-y lg:col-span-12">
                        <div className="grid grid-cols-6 gap-2 p-5 mt-5">
                            {
                                hotelRoomVideos.length > 0
                                    ? hotelRoomVideos.map((data, i) => {
                                        return (
                                            <div key={i} className="col-span-12 intro-y md:col-span-6 lg:col-span-5 xl:col-span-3">
                                                <div className="box">
                                                    <div className="p-5">
                                                        <div className="h-40 overflow-hidden rounded-md 2xl:h-56 image-fit before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-black before:to-black/10"
                                                            onClick={() => {
                                                                console.log(`${api.API_URL}images/hotelRoomVideos/${data.roomVideo}`)
                                                                setVideoLink(`${api.API_URL}images/hotelRoomVideos/${data.roomVideo}`)
                                                                setVideoModal(true);
                                                            }}
                                                        >
                                                            <img
                                                                alt={data.videoName}
                                                                className="rounded-md"
                                                                src={`${api.API_URL}uploads/hotelRoomVideos/${data.roomVideo}`}
                                                            />
                                                            <div className="absolute bottom-0 z-10 px-5 pb-6 text-white">
                                                                <a href="" className="block text-base font-medium">
                                                                    {data.videoName}
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="mt-5 text-slate-600 dark:text-slate-500">
                                                            <div className="flex items-center mt-2">
                                                                <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />{" "}
                                                                {/* Approval Status: {" "} <span style={{ color: data.isApproved === "Y" ? "#198754" : data.isApproved === "P" ? "#ffc107" : "#dc3545" }}>{data.isApproved === "Y" ? "Approved" : data.isApproved === "P" ? "Pending" : "Rejected"}</span> */}
                                                                Approval Status: {" "}
                                                                <Menu className="mt-5 md:ml-auto md:mt-0">
                                                                    <Menu.Button
                                                                        as={Button}
                                                                        variant="outline-secondary"
                                                                        className="font-normal w-full flex justify-center"
                                                                    >
                                                                        <span style={{ color: data.isApproved === "Y" ? "#198754" : data.isApproved === "P" ? "#ffc107" : "#dc3545" }}>{data.isApproved === "Y" ? "Approved" : data.isApproved === "P" ? "Pending" : "Rejected"}</span>
                                                                        <Lucide icon="ChevronDown" className="w-full h-4 ml-2" />
                                                                    </Menu.Button>
                                                                    <Menu.Items className="w-40 h-30 overflow-y-auto">
                                                                        <Menu.Item onClick={() => updateRoomVideo(data, 'Y')}>Approve</Menu.Item>
                                                                        <Menu.Item onClick={() => updateRoomVideo(data, 'N')}>Reject</Menu.Item>
                                                                    </Menu.Items>
                                                                </Menu>
                                                            </div>

                                                            <div className="flex items-center mt-2">
                                                                <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />{" "}
                                                                Room Status:{" "}
                                                                <span style={{ color: data.isActive === "Y" ? "#0d6efd" : "#dc3545" }}>{data.isActive === "Y" ? "Active" : "Inactive"}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    : <p>videos not uploaded yet</p>
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* BEGIN: Video Modal */}
            <Dialog
                open={videoModal}
                size="xl"
                onClose={() => {
                    setVideoModal(false);
                }}
            >
                <Dialog.Panel>
                    <Dialog.Title>
                        <h2 className="mr-auto text-base font-medium">
                            Video Player
                        </h2>

                        <Button variant="outline-secondary" className="hidden sm:flex" onClick={() => {
                            setVideoModal(false);
                        }}>
                            <Lucide icon="X" className="w-4 h-4" />{" "}
                        </Button>
                    </Dialog.Title>

                    <div className="p-2 text-center">
                        <ReactPlayer
                            url={videoLink}
                            width="100%"
                            height="100%"
                            controls
                        />
                    </div>
                </Dialog.Panel>
            </Dialog>
            {/* END: Video Modal */}

            {/* BEGIN: Image Modal */}
            <Dialog
                open={imageModal}
                size="xl"
                onClose={() => {
                    setImageModal(false);
                }}
            >
                <Dialog.Panel>
                    <Dialog.Title>
                        <h2 className="mr-auto text-base font-medium"></h2>

                        <Button variant="outline-secondary" className="hidden sm:flex" onClick={() => {
                            setImageModal(false);
                        }}>
                            <Lucide icon="X" className="w-4 h-4" />{" "}
                        </Button>
                    </Dialog.Title>

                    <div className="flex justify-center p-2 text-center">
                        <img
                            alt={imageLink}
                            className="rounded-md"
                            src={imageLink}
                        />
                    </div>
                </Dialog.Panel>
            </Dialog>
            {/* END: Image Modal */}
        </div>
    );
}

export default previewRoom;