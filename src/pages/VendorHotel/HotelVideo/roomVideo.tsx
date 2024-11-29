// @ts-nocheck
import { useState, useEffect, useRef } from "react";
import {
    PreviewComponent,
    Preview,
} from "../../../base-components/PreviewComponent";
import {
    FormLabel,
    FormInput,
    FormSelect,
} from "../../../base-components/Form";
import Button from "../../../base-components/Button";
import Alert from "../../../base-components/Alert";
import Notification from "../../../base-components/Notification";
import Lucide from "../../../base-components/Lucide";
import { useForm } from "react-hook-form";
import Toastify from "toastify-js";
import clsx from "clsx";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import api from "../../../../apiconfig.json";
import axios from "axios";
import { Menu, Popover, Dialog } from "../../../base-components/Headless";

import { fetchAllVendorHotel } from "../vendorHotelSlice";
import { getHotelRoomsByHotel } from "../hotelRoomSlice";
import { uploadGalleryVideo, viewGallery, deleteVideo, updateVideo } from "./RoomVideoSlice";
import ReactPlayer from 'react-player';

const manageHotelRoomVideo = () => {
    const dispatch = useAppDispatch();

    const { data: vendorHotelData } = useAppSelector((state) => state.vendorHotel);
    const { data: hotelRoomData } = useAppSelector((state) => state.hotelRoomReducer);
    const { data: hotelRoomVideo } = useAppSelector((state) => state.hotelRoomVideoReducer);

    const [repoObj, setRepoObj] = useState({})
    const [repoThumbnail, setRepoThumbnail] = useState({})
    const [uploadStatus, setUploadStatus] = useState('')
    const [deleteStatus, setDeleteStatus] = useState('')
    const [reload, setReload] = useState(0)

    const [hotelName, setHotelName] = useState('')
    const [hotelId, setHotelId] = useState()
    const [hotelRoomName, setHotelRoomName] = useState('')
    const [hotelRoomId, setHotelRoomId] = useState()

    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [updateModalData, setUpdateModalData] = useState();

    const [roomId, setRoomId] = useState();
    const [videoName, setVideoName] = useState();
    const [videoStat, setVideoStat] = useState();
    const [newVideo, setNewVideo] = useState();

    const [selected, setSelected] = useState()
    const [renderer, setRenderer] = useState(0)

    const [repoVideos, setRepoVideos] = useState([])

    const [uploadedVideo, setUploadedVideo] = useState('')

    const [createdBy, setCreatedBy] = useState('')
    const deleteButtonRef = useRef(null);

    const [videoModal, setVideoModal] = useState()
    const [videoLink, setVideoLink] = useState('')

    useEffect(() => {
        let userType = JSON.parse(localStorage.getItem('userInfo'))['resData']['userType']
        let userId = userType === "S" ? JSON.parse(localStorage.getItem('userInfo'))['resData']['id'] : JSON.parse(localStorage.getItem('userInfo'))['vendorData']['id']

        setCreatedBy(userId)
        dispatch(fetchAllVendorHotel({ userId, userType }));
        dispatch(viewGallery(userId))
    }, [reload])

    const getHotelRooms = async (data) => {
        setHotelName(data.hotelName)
        setHotelId(data.id)
        await dispatch(getHotelRoomsByHotel(data.id))
        console.log({ hotelId: data.id, hotelName: data.hotelName, hotelRoomData })
    }

    const selectHotelRoom = (data) => {
        setHotelRoomId(data.id)
        setHotelRoomName(data.hRoomName)
        console.log(data)
    }

    const deleteRoomVideo = async () => {
        const result = await dispatch(deleteVideo(selected))
        if (result.payload.msg === "Data deleted Succesfully") {
            setReload(reload + 1)
        }
        setDeleteConfirmationModal(false)
    }

    const updateRoomVideo = async () => {
        console.log(videoStat)
        var formData = new FormData();

        formData.append('id', Number(updateModalData.id));

        formData.append('hId', Number(updateModalData.hId));
        formData.append('videoName', videoName);
        formData.append('createdBy', createdBy);
        formData.append('isActive', videoStat === "Yes" ? "Y" : "N");
        formData.append('isApproved', updateModalData.isApproved);

        formData.append('file', newVideo);

        const updateResponse = await dispatch(updateVideo(formData))
        console.log(updateResponse)
        setUpdateModal(false)
        setReload(reload + 1)
    }

    const uploadRepoVideo = async () => {
        if (Object.keys(repoObj).length != 0) {
            var formData = new FormData();

            formData.append('hId', Number(hotelRoomId));
            formData.append('videoName', hotelRoomName);
            formData.append('createdBy', createdBy);
            formData.append('isActive', 'Y');
            formData.append('isApproved', 'P');

            Object.keys(repoObj).map((Key) => {
                formData.append('files', repoObj[Key]);
            });

            for (var [key, value] of formData.entries()) {
                console.log(key, value);
            }

            let x = await dispatch(uploadGalleryVideo(formData))
            console.log(x.payload)

            setUploadStatus(x.payload.results.length + ' video(s) uploaded succesfully.')
            setReload(reload + 1)
        } else {
            console.log('Select a file first')
        }
    }

    return (
        <>
            <div className="flex items-center mt-8 intro-y">
                <h2 className="mr-auto text-lg font-medium">Manage Video Repository</h2>
            </div>
            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="col-span-12 intro-y lg:col-span-12">
                    {/* BEGIN: Form Validation */}
                    <PreviewComponent className="intro-y box">

                        <>
                            <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                                <h2 className="mr-auto text-base font-medium">
                                    Upload Videos
                                </h2>

                                <Menu>
                                    <Menu.Button as={Button} variant="primary">
                                        {hotelName === '' ? 'Select Hotel' : hotelName}
                                    </Menu.Button>
                                    <Menu.Items className="w-48">
                                        {
                                            vendorHotelData.map((H) => {
                                                return (
                                                    <Menu.Item onClick={() => getHotelRooms(H)}>
                                                        <Lucide icon="Edit" className="w-4 h-4 mr-2" />
                                                        {H.hotelName}
                                                    </Menu.Item>
                                                )
                                            })
                                        }
                                    </Menu.Items>
                                </Menu>

                                {
                                    hotelName !== ''
                                        ? <Menu className='ml-4'>
                                            <Menu.Button as={Button} variant="primary">
                                                {hotelRoomName === '' ? 'Select Hotel Room' : hotelRoomName}
                                            </Menu.Button>
                                            <Menu.Items className="w-48">
                                                {
                                                    hotelRoomData.map((HR) => {
                                                        return (
                                                            <Menu.Item onClick={() => selectHotelRoom(HR)} >
                                                                <Lucide icon="Edit2" className="w-4 h-4 mr-2" />
                                                                {HR.hRoomName} ({HR.roomType})
                                                            </Menu.Item>
                                                        )
                                                    })
                                                }
                                            </Menu.Items>
                                        </Menu>
                                        : null
                                }
                            </div>
                            <div className="p-5">
                                <Preview>
                                    <div className="input-form">
                                        <FormLabel
                                            htmlFor="validation-form-1"
                                            className="flex flex-col w-full sm:flex-row"
                                        >
                                            Select Video File
                                        </FormLabel>
                                        <FormInput
                                            id="choose-files"
                                            type="file"
                                            name="choose-files"
                                            onChange={(e) => setRepoObj(e.target.files)}
                                            multiple
                                            disabled={hotelName === '' ? true : false}
                                        />

                                        {/* <FormLabel
                                            htmlFor="validation-form-1"
                                            className="flex flex-col w-full sm:flex-row mt-5"
                                        >
                                            Select Video Thumbnail
                                        </FormLabel>
                                        <FormInput
                                            id="choose-thumbnail"
                                            type="file"
                                            name="choose-thumbnail"
                                            onChange={(e) => setRepoObj(e.target.files)}
                                            multiple
                                            disabled={hotelName === '' ? true : false}
                                        /> */}


                                        {(uploadStatus != '') ? <Alert variant="outline-success" className="flex items-center my-2">
                                            {({ dismiss }) => (
                                                <>
                                                    {uploadStatus}
                                                    <Alert.DismissButton type="button" className="btn-close" onClick={() => { dismiss; setUploadStatus(''); }} aria-label="Close">
                                                        <Lucide icon="X" className="w-4 h-4" />
                                                    </Alert.DismissButton>
                                                </>
                                            )}
                                        </Alert> : ''}

                                        <Button variant="primary" type="submit" className="mt-5 w-24 mr-1" onClick={() => uploadRepoVideo()} disabled={hotelName === '' ? true : false}>
                                            Upload
                                        </Button>
                                    </div>
                                </Preview>
                            </div>
                        </>

                    </PreviewComponent>
                    {/* END: Form Validation */}
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="col-span-12 intro-y lg:col-span-12">
                    <div className="intro-y box">
                        <>
                            <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                                <h2 className="mr-auto text-base font-medium">
                                    Video Repository
                                </h2>
                            </div>
                            <div className="grid grid-cols-12 gap-4 p-5">
                                {
                                    hotelRoomVideo.length <= 0
                                        ? null
                                        : hotelRoomVideo.map((data, i) => (
                                            <div
                                                key={i}
                                                className="col-span-12 intro-y md:col-span-6 lg:col-span-5 xl:col-span-3"
                                            >
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
                                                                style={{ pointer: 'cursor' }}
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
                                                                Approval Status: {" "} <span style={{ color: data.isApproved === "Y" ? "#198754" : data.isApproved === "P" ? "#ffc107" : "#dc3545" }}>{data.isApproved === "Y" ? "Approved" : data.isApproved === "P" ? "Pending" : "Rejected"}</span>
                                                            </div>
                                                            <div className="flex items-center mt-2">
                                                                <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />{" "}
                                                                Room Status:{" "}
                                                                <span style={{ color: data.isActive === "Y" ? "#0d6efd" : "#dc3545" }}>{data.isActive === "Y" ? "Active" : "Inactive"}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-center p-5 border-t lg:justify-end border-slate-200/60 dark:border-darkmode-400">
                                                        <a className="flex items-center mr-auto text-primary" href="#">
                                                            <Lucide icon="Eye" className="w-4 h-4 mr-1" /> Preview
                                                        </a>
                                                        <a className="flex items-center mr-3" href="#" onClick={(event) => {
                                                            event.preventDefault();

                                                            setRoomId(data.id)
                                                            setVideoName(data.videoName)
                                                            setVideoStat(data.videoStat)
                                                            setNewVideo(data.roomVideo)

                                                            setUpdateModalData(data)

                                                            console.log(data)

                                                            setUpdateModal(true);
                                                        }}>
                                                            <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" />
                                                            Edit
                                                        </a>
                                                        <a className="flex items-center text-danger" href="#"
                                                            onClick={(event) => {
                                                                event.preventDefault();
                                                                setSelected(data.id)
                                                                setDeleteConfirmationModal(true);
                                                            }}
                                                        >
                                                            <Lucide icon="Trash2" className="w-4 h-4 mr-1" /> Delete
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                }
                            </div>
                        </>
                    </div>
                </div>
            </div>

            {/* BEGIN: Success Notification Content */}
            <Notification
                id="success-notification-content"
                className="flex hidden"
            >
                <Lucide icon="CheckCircle" className="text-success" />
                <div className="ml-4 mr-4">
                    <div className="font-medium">Data saved successfully!</div>
                </div>
            </Notification>
            {/* END: Success Notification Content */}
            {/* BEGIN: Failed Notification Content */}
            <Notification
                id="failed-notification-content"
                className="flex hidden"
            >
                <Lucide icon="XCircle" className="text-danger" />
                <div className="ml-4 mr-4">
                    <div className="font-medium">Data addition failed!</div>
                    <div className="mt-1 text-slate-500">
                        Please check the fileld form.
                    </div>
                </div>
            </Notification>
            {/* END: Failed Notification Content */}
            {/* BEGIN: Update Modal */}
            <Dialog open={updateModal} onClose={() => { setUpdateModal(false) }}>
                <Dialog.Panel>
                    <div className="p-5 text-center">

                        <div className="input-form">
                            <FormLabel
                                htmlFor="tourName"
                                className="flex flex-col w-full sm:flex-row"
                            >
                                Video Name
                            </FormLabel>
                            <FormInput
                                // {...register("tourName")}
                                id="tourName"
                                onChange={(e) => setVideoName(e.target.value)}
                                name="tourName"
                                type="text"
                                placeholder="Video Name"
                                value={videoName !== undefined ? videoName : ''}
                            />
                            <FormLabel
                                htmlFor="imgStat"
                                className="flex flex-col w-full sm:flex-row mt-4"
                            >
                                Video Status
                            </FormLabel>

                            <FormSelect
                                // {...register("countryId")}
                                id="imgStat"
                                name="imgStat"
                                className="sm:mr-2"
                                onChange={(e) => setVideoStat(e.target.value)}
                                value={videoStat !== undefined ? videoStat : 'Set Status'}
                                aria-label="Default select example"
                            >
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </FormSelect>

                            <FormLabel
                                htmlFor="validation-form-1"
                                className="flex flex-col w-full sm:flex-row mt-4"
                            >
                                Select New File
                            </FormLabel>
                            <FormInput
                                id="choose-file"
                                type="file"
                                name="choose-file"
                                onChange={(e) => setNewVideo(e.target.files[0])}
                            />
                        </div>
                    </div>
                    <div className="px-5 pb-8 text-center">
                        <Button
                            variant="outline-secondary"
                            type="button"
                            onClick={() => { setUpdateModal(false) }}
                            className="w-24 mr-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="warning"
                            type="button"
                            className="w-24"
                            onClick={() => updateRoomVideo()}
                        >
                            Update
                        </Button>
                    </div>
                </Dialog.Panel>
            </Dialog>
            {/* END: Update Modal */}
            {/* BEGIN: Delete Confirmation Modal */}
            <Dialog
                open={deleteConfirmationModal}
                onClose={() => {
                    setDeleteConfirmationModal(false);
                }}
            >
                <Dialog.Panel>
                    <div className="p-5 text-center">
                        <Lucide
                            icon="XCircle"
                            className="w-16 h-16 mx-auto mt-3 text-danger"
                        />
                        <div className="mt-5 text-3xl">Are you sure?</div>
                        <div className="mt-2 text-slate-500">
                            Do you really want to delete the record? ({selected}) <br />
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
                            onClick={() => deleteRoomVideo()}
                        >
                            Delete
                        </Button>
                    </div>
                </Dialog.Panel>
            </Dialog>
            {/* END: Delete Confirmation Modal */}

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

                        <Button variant="outline-secondary" className="hidden sm:flex">
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
        </>
    );
}

export default manageHotelRoomVideo;