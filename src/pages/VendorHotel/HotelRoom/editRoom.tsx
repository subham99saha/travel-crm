// @ts-nocheck
import {
    PreviewComponent,
    Preview,
    Source,
    Highlight,
} from "../../../base-components/PreviewComponent";
import { Disclosure } from "../../../base-components/Headless";
import _ from "lodash";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import fakerData from "../../utils/faker";
import Button from "../../../base-components/Button";
import Notification from "../../../base-components/Notification";
import Toastify from "toastify-js";
import { TECollapse } from "tw-elements-react";
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
} from "../../../base-components/Form";
import TomSelect from "../../../base-components/TomSelect";
import { ClassicEditor } from "../../../base-components/Ckeditor";
import Alert from "../../../base-components/Alert";
import Lucide from "../../../base-components/Lucide";
import Tippy from "../../../base-components/Tippy";
import Table from "../../../base-components/Table";
import { useAppSelector, useAppDispatch } from "../../../stores/hooks";
import { getHotelRoom, updateVendorHotelRoom } from "./vendorHotelRoomSlice";


import { createVendorHotelRoom } from "./vendorHotelRoomSlice";

const editRoomDetails = () => {
    const params = useParams();

    //console.log(params.id, params.rid);
    const [roomFloor, sethRoomFloor] = useState('');
    const [roomBedType, sethRoomBedType] = useState();
    const [isActive, setisActive] = useState();
    const [hotelRoomType, sethotelRoomType] = useState('');

    const { data } = useAppSelector((state) => state.hotelRoomReducer);


    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getHotelRoom(params.rid));
    }, []);


    const schema = yup
        .object({
            //vName: yup.string().required("Name is a required field").min(2),
            //departureCityId: yup.string().required("Departure City is a required field"),
            //destinationCityId: yup.string().required("Destination City is a required field"),
        })
        .required();


    const {
        register,
        getValues,
        trigger,
        formState: { errors },
        reset,
        handleSubmit
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const onSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await trigger();

        if (!result) {
            const failedEl = document
                .querySelectorAll("#failed-notification-content")[0]
                .cloneNode(true) as HTMLElement;
            failedEl.classList.remove("hidden");
            Toastify({
                node: failedEl,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
            }).showToast();
        } else {
            let formData = {
                vhmId: params.id,
                roomType: hotelRoomType,
                hRoomName: getValues("hRoomName"),
                hRoomSize: getValues("hRoomSize"),
                hRoomFloor: roomFloor,
                hRoomBedType: roomBedType,
                hRoomNoBed: getValues("hRoomNoBed"),
                hRoomMaxOccuAdult: getValues("hRoomMaxOccuAdult"),
                hRoomMaxOccuChild: getValues("hRoomMaxOccuChild"),
                hRoomDefaultPriceAc: getValues("hRoomDefaultPriceAc"),
                hRoomDefaultPriceNonAc: getValues("hRoomDefaultPriceNonAc"),
                hRoomDesc: getValues("hRoomDesc"),
                amnBasic: _.toString(checkedBasic),
                isActive: isActive,
                id: params.rid

            };
            console.log(formData);

            dispatch(updateVendorHotelRoom(formData));
            reset(formData);

            const successEl = document
                .querySelectorAll("#success-notification-content")[0]
                .cloneNode(true) as HTMLElement;
            successEl.classList.remove("hidden");
            Toastify({
                node: successEl,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
            }).showToast();
        }
    }

    const [activeElement, setActiveElement] = useState("");

    const handleClick = (value: string) => {
        if (value === activeElement) {
            setActiveElement("");
        } else {
            setActiveElement(value);
        }
    };


    const basicFacilityChck = ['Air Conditioning', 'Heater'];
    const [checkedBasic, setCheckedBasic] = useState([]);
    const [countBasic, setCountBasic] = useState(0);

    const generalServiceChck = ['Bellboy Service', 'Caretaker', 'Concierge', 'Multilingual Staff', 'Luggage Assistance', 'Luggage Storage', 'Specially able assistance', 'Wake-up Call/Service', 'Wheelchair', 'Butler Services', 'Doctor on call', 'Medical Centre', 'Pool/Beach towels'];
    const [checkedGeneral, setCheckedGeneral] = useState([]);
    const [countGeneral, setCountGeneral] = useState(0);

    const activitiesSportsChck = ['Beach', 'Bonfire', 'Golf', 'Kayaks', 'Outdoor Sports', 'Snorkelling', 'Telescope', 'Water Sports', 'Canoeing', 'Skiing', 'Jungle Suferi', 'Cycling'];
    const [checkedActiSprt, setCheckedActiSprt] = useState([]);
    const [countActiSprt, setCountActiSprt] = useState(0);

    const commonAreaChck = ['Balcony/Terrace', 'Fireplace', 'Lawn', 'Library', 'Lounge', 'Reception', 'Setaing Area', 'Sun Deck', 'Verandah', 'Jacuzzi', 'Prayer Room', 'Living Room', 'Outdoor Furniture', 'Picnic Area', 'Game Room', 'Sitout Area', 'Bonfire Pit'];
    const [checkedCommonArea, setCheckedCommonArea] = useState([]);
    const [countCommonArea, setCountCommonArea] = useState(0);


    const handleCheck = (event, type) => {
        console.log(type);
        switch (type) {
            case 'Basic':
                let updatedListBasic = [...checkedBasic];
                if (event.target.checked) {
                    updatedListBasic = [...checkedBasic, event.target.value];
                } else {
                    updatedListBasic.splice(checkedBasic.indexOf(event.target.value), 1);
                }
                setCountBasic(updatedListBasic.length);
                setCheckedBasic(updatedListBasic);
                break;
            case 'General':
                let updatedListGeneral = [...checkedGeneral];
                if (event.target.checked) {
                    updatedListGeneral = [...checkedGeneral, event.target.value];
                } else {
                    updatedListGeneral.splice(checkedGeneral.indexOf(event.target.value), 1);
                }
                setCountGeneral(updatedListGeneral.length);
                setCheckedGeneral(updatedListGeneral);
                break;
            case 'ActSpt':
                let updatedListActSpt = [...checkedActiSprt];
                if (event.target.checked) {
                    updatedListActSpt = [...checkedActiSprt, event.target.value];
                } else {
                    updatedListActSpt.splice(checkedActiSprt.indexOf(event.target.value), 1);
                }
                setCheckedActiSprt(updatedListActSpt);
                setCountActiSprt(updatedListActSpt.length);
                break;
            case 'CmnArea':
                let updatedListCmnArea = [...checkedCommonArea];
                if (event.target.checked) {
                    updatedListCmnArea = [...checkedCommonArea, event.target.value];
                } else {
                    updatedListCmnArea.splice(checkedCommonArea.indexOf(event.target.value), 1);
                }
                setCheckedCommonArea(updatedListCmnArea);
                setCountCommonArea(updatedListCmnArea.length);
                break;
        }

    };

    useEffect(() => {
        reset(data);
        sethRoomFloor(data.hRoomFloor);
        sethotelRoomType(data.roomType);
        sethRoomBedType(data.hRoomBedType);
        setisActive(data.isActive);
        setCheckedBasic(_.split(data.amnBasic, ","));
        setCountBasic(checkedBasic.length);

    }, [data]);


    console.log(checkedBasic);


    return (
        <>
            <div className="flex items-center mt-8 intro-y">
                <h2 className="mr-auto text-lg font-medium">Edit Room</h2>
            </div>
            <form className="validate-form" onSubmit={onSubmit}>
                <div className="grid grid-cols-12 gap-6 mt-5">
                    <div className="col-span-12 intro-y lg:col-span-6">
                        {/* BEGIN: Input */}
                        <PreviewComponent className="intro-y box">

                            <>
                                <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                                    <h2 className="mr-auto text-base font-medium">Room Info</h2>

                                </div>
                                <div className="p-5">
                                    <Preview>
                                        <div>
                                            <FormLabel htmlFor="regular-form-1">Room Name</FormLabel>
                                            <FormInput
                                                {...register("hRoomName")}
                                                id="hRoomName"
                                                type="text"
                                                placeholder="Room Name"
                                            />
                                        </div>
                                        <div className="mt-3">
                                            <FormLabel htmlFor="regular-form-1">Room Size</FormLabel>
                                            <FormInput
                                                {...register("hRoomSize")}
                                                id="hRoomSize"
                                                type="text"
                                                placeholder="Room Size"
                                            />
                                        </div>
                                        <div className="mt-3">
                                            <FormLabel htmlFor="regular-form-2">Room Type</FormLabel>
                                            <div className="grid-cols-2 gap-2 sm:grid">
                                            <FormSelect
                                                {...register("roomType")}
                                                id="roomType"
                                                value={hotelRoomType}
                                                onChange={(e) => sethotelRoomType(e.target.value)}

                                            >
                                                <option value="Standard">Standard</option>
                                                <option value="Deluxe">Deluxe</option>
                                                <option value="Premium">Premium</option>
                                                <option value="Executive">Executive</option>
                                                <option value="Suite">Suite</option>
                                                <option value="Studio">Studio</option>
                                                <option value="Presidential Suite">Presidential Suite</option>
                                            </FormSelect>
                                            </div>

                                        </div>
                                        <div className="mt-3">
                                            <FormLabel htmlFor="regular-form-2">Floor</FormLabel>
                                            <div className="grid-cols-2 gap-2 sm:grid">
                                                <FormSelect
                                                    {...register("hRoomFloor")}
                                                    id="hRoomFloor"
                                                    value={roomFloor}
                                                    onChange={(e) => sethRoomFloor(e.target.value)}
                                                >
                                                    <option value="Ground">Ground</option>
                                                    <option value="1st">1st</option>
                                                    <option value="2nd">2nd</option>
                                                    <option value="3rd">3rd</option>
                                                    <option value="4th">4th</option>
                                                    <option value="5th">5th</option>
                                                    <option value="6th">6th</option>
                                                    <option value="7th">7th</option>
                                                    <option value="8th">8th</option>
                                                </FormSelect>
                                            </div>

                                        </div>
                                        <div className="mt-3">
                                            <FormLabel htmlFor="regular-form-3">Bed Type</FormLabel>
                                            <div className="flex-1 w-full mt-3 xl:mt-0">
                                                <div className="grid-cols-4 gap-2 sm:grid">
                                                    <FormSelect
                                                        {...register("hRoomBedType")}
                                                        id="hRoomBedType"
                                                        value={roomBedType}
                                                        onChange={(e) => sethRoomBedType(e.target.value)}
                                                    >
                                                        <option value="Single">Single</option>
                                                        <option value="Double">Double</option>
                                                        <option value="Tripple">Tripple</option>
                                                        <option value="King">King</option>
                                                        <option value="Queen">Queen</option>
                                                    </FormSelect>
                                                    <FormInput
                                                        {...register("hRoomNoBed")}
                                                        type="text"
                                                        id="hRoomNoBed"
                                                        className="mt-2 sm:mt-0"
                                                        placeholder="No of Bed"
                                                        defaultValue="1"
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <FormLabel htmlFor="regular-form-3">Max Occupancy</FormLabel>
                                            <div className="flex-1 w-full mt-3 xl:mt-0">
                                                <div className="grid-cols-4 gap-2 sm:grid">
                                                    <FormInput
                                                        {...register("hRoomMaxOccuAdult")}
                                                        type="text"
                                                        id="hRoomMaxOccuAdult"
                                                        className="mt-2 sm:mt-0"
                                                        placeholder="Adult"
                                                    />
                                                    <FormInput
                                                        {...register("hRoomMaxOccuChild")}
                                                        type="text"
                                                        id="hRoomMaxOccuChild"
                                                        className="mt-2 sm:mt-0"
                                                        placeholder="Children"
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <FormLabel htmlFor="regular-form-3">Default Price</FormLabel>
                                            <div className="flex-1 w-full mt-3 xl:mt-0">
                                                <div className="grid-cols-4 gap-2 sm:grid">
                                                    <FormInput
                                                        {...register("hRoomDefaultPriceAc")}
                                                        type="text"
                                                        id="product-weight"
                                                        className="mt-2 sm:mt-0"
                                                        placeholder="AC Room"
                                                    />
                                                    <FormInput
                                                        {...register("hRoomDefaultPriceNonAc")}
                                                        type="text"
                                                        id="product-weight"
                                                        className="mt-2 sm:mt-0"
                                                        placeholder="Non AC Room"
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <FormLabel htmlFor="regular-form-1">Description</FormLabel>
                                            <FormTextarea
                                                {...register("hRoomDesc")}
                                                id="hRoomDesc"
                                            ></FormTextarea>
                                        </div>
                                        <div className="mt-3">
                                            <FormLabel htmlFor="regular-form-2">Status</FormLabel>
                                            <div className="grid-cols-2 gap-2 sm:grid">
                                                <FormSelect
                                                    {...register("isActive")}
                                                    name="isActive"
                                                    className="mt-2 sm:mr-2"
                                                    aria-label="Default select example"
                                                    value={isActive}
                                                    onChange={(e) => setisActive(e.target.value)}

                                                >
                                                    <option value="Y">Active</option>
                                                    <option value="N">Inactive</option>
                                                </FormSelect>
                                            </div>

                                        </div>
                                        <Button variant="primary" type="submit" className="mt-5 w-24 mr-1">
                                            Update
                                        </Button>
                                        <Link to={`/view-vendor-hotel/${params.id}`}>
                                            <Button variant="secondary" type="button" className="mt-5 w-24 mr-1">
                                                Cancel
                                            </Button>
                                        </Link>
                                    </Preview>

                                </div>
                            </>
                        </PreviewComponent>
                        {/* END: Input */}

                    </div>
                    <div className="col-span-12 intro-y lg:col-span-6">
                        {/* BEGIN: Vertical Form */}
                        <PreviewComponent className="intro-y box">

                            <>
                                <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                                    <h2 className="mr-auto text-base font-medium">
                                        All Amenities
                                    </h2>

                                </div>
                                <div className="p-5">
                                    <Preview>
                                        <div id="accordionExample">
                                            <div className="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                                                <h2 className="mb-0" id="headingOne">
                                                    <button
                                                        className={`${activeElement === "element1" &&
                                                            `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                                                            } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                                                        type="button"
                                                        onClick={() => handleClick("element1")}
                                                        aria-expanded="true"
                                                        aria-controls="collapseOne"
                                                    >
                                                        Basic Facilities ({countBasic})
                                                        <span
                                                            className={`${activeElement === "element1"
                                                                    ? `rotate-[-180deg] -mr-1`
                                                                    : `rotate-0 fill-[#212529]  dark:fill-white`
                                                                } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth="1.5"
                                                                stroke="currentColor"
                                                                className="h-6 w-6"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                                />
                                                            </svg>
                                                        </span>
                                                    </button>
                                                </h2>
                                                <TECollapse
                                                    show={activeElement === "element1"}
                                                    className="!mt-0 !rounded-b-none !shadow-none"
                                                >
                                                    <div className="px-5 py-4">
                                                        <div className="grid-cols-4 gap-2 sm:grid">
                                                            {basicFacilityChck.map((value, i) => {
                                                                let isChecked = checkedBasic.includes(value) ? true : false;
                                                                return <>
                                                                    <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                        <FormCheck.Input
                                                                            id={`checkbox-switch-${i}`}
                                                                            type="checkbox"
                                                                            value={value}
                                                                            onChange={(e) => handleCheck(e, 'Basic')}
                                                                            checked={isChecked}
                                                                        />
                                                                        <FormCheck.Label htmlFor={`checkbox-switch-${i}`}>
                                                                            {value}
                                                                        </FormCheck.Label>
                                                                    </FormCheck>
                                                                </>
                                                            })}
                                                        </div>
                                                    </div>
                                                </TECollapse>
                                            </div>
                                        </div>
                                        <div className="border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                                            <h2 className="mb-0" id="headingTwo">
                                                <button
                                                    className={`${activeElement === "element2"
                                                            ? `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                                                            : `transition-none rounded-b-[15px]`
                                                        } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                                                    type="button"
                                                    onClick={() => handleClick("element2")}
                                                    aria-expanded="true"
                                                    aria-controls="collapseOne"
                                                >
                                                    General Services ({countGeneral})
                                                    <span
                                                        className={`${activeElement === "element2"
                                                                ? `rotate-[-180deg] -mr-1`
                                                                : `rotate-0 fill-[#212529] dark:fill-white`
                                                            } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="h-6 w-6"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                            />
                                                        </svg>
                                                    </span>
                                                </button>
                                            </h2>
                                            <TECollapse
                                                show={activeElement === "element2"}
                                                className="!mt-0 !rounded-b-none !shadow-none"
                                            >
                                                <div className="px-5 py-4">
                                                    <div className="grid-cols-4 gap-2 sm:grid">
                                                        {generalServiceChck.map((value, i) => {
                                                            return <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                <FormCheck.Input id={`checkbox-switch1-${i}`} type="checkbox" value={value} onChange={(e) => handleCheck(e, 'General')} />
                                                                <FormCheck.Label htmlFor={`checkbox-switch1-${i}`}>
                                                                    {value}
                                                                </FormCheck.Label>
                                                            </FormCheck>
                                                        })}
                                                    </div>
                                                </div>
                                            </TECollapse>
                                        </div>
                                        <div className="rounded-b-lg border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                                            <h2 className="accordion-header mb-0" id="headingThree">
                                                <button
                                                    className={`${activeElement === "element3"
                                                            ? `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                                                            : `transition-none rounded-b-[15px]`
                                                        } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                                                    type="button"
                                                    onClick={() => handleClick("element3")}
                                                    aria-expanded="true"
                                                    aria-controls="collapseOne"
                                                >
                                                    Out Door Activities and Sports ({countActiSprt})
                                                    <span
                                                        className={`${activeElement === "element3"
                                                                ? `rotate-[-180deg] -mr-1`
                                                                : `rotate-0 fill-[#212529] dark:fill-white`
                                                            } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="h-6 w-6"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                            />
                                                        </svg>
                                                    </span>
                                                </button>
                                            </h2>
                                            <TECollapse
                                                show={activeElement === "element3"}
                                                className="!mt-0 !shadow-none"
                                            >
                                                <div className="px-5 py-4">
                                                    <div className="grid-cols-4 gap-2 sm:grid">
                                                        {activitiesSportsChck.map((value, i) => {
                                                            return <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                <FormCheck.Input id={`checkbox-switch1-${i}`} type="checkbox" value={value} onChange={(e) => handleCheck(e, 'ActSpt')} />
                                                                <FormCheck.Label htmlFor={`checkbox-switch1-${i}`}>
                                                                    {value}
                                                                </FormCheck.Label>
                                                            </FormCheck>
                                                        })}
                                                    </div>
                                                </div>
                                            </TECollapse>
                                        </div>
                                        <div className="rounded-b-lg border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                                            <h2 className="accordion-header mb-0" id="headingThree">
                                                <button
                                                    className={`${activeElement === "element4"
                                                            ? `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                                                            : `transition-none rounded-b-[15px]`
                                                        } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                                                    type="button"
                                                    onClick={() => handleClick("element4")}
                                                    aria-expanded="true"
                                                    aria-controls="collapseOne"
                                                >
                                                    Common Area ({countCommonArea})
                                                    <span
                                                        className={`${activeElement === "element4"
                                                                ? `rotate-[-180deg] -mr-1`
                                                                : `rotate-0 fill-[#212529] dark:fill-white`
                                                            } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="h-6 w-6"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                            />
                                                        </svg>
                                                    </span>
                                                </button>
                                            </h2>
                                            <TECollapse
                                                show={activeElement === "element4"}
                                                className="!mt-0 !shadow-none"
                                            >
                                                <div className="px-5 py-4">
                                                    <div className="grid-cols-4 gap-2 sm:grid">
                                                        {commonAreaChck.map((value, i) => {
                                                            return <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                <FormCheck.Input id={`checkbox-switch1-${i}`} type="checkbox" value={value} onChange={(e) => handleCheck(e, 'CmnArea')} />
                                                                <FormCheck.Label htmlFor={`checkbox-switch1-${i}`}>
                                                                    {value}
                                                                </FormCheck.Label>
                                                            </FormCheck>
                                                        })}
                                                    </div>
                                                </div>
                                            </TECollapse>
                                        </div>
                                    </Preview>
                                    {/* <Preview>
                      <Disclosure.Group variant="boxed">
                        <Disclosure>
                          <Disclosure.Button>
                            Basic Facilities
                          </Disclosure.Button>
                          <Disclosure.Panel className="leading-relaxed text-slate-600 dark:text-slate-500">
                              <div className="grid-cols-4 gap-2 sm:grid">
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                              </div>
                          </Disclosure.Panel>
                        </Disclosure>
                        <Disclosure>
                          <Disclosure.Button>
                            General Services
                          </Disclosure.Button>
                          <Disclosure.Panel className="leading-relaxed text-slate-600 dark:text-slate-500">
                                <div className="grid-cols-4 gap-2 sm:grid">
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                              </div>
                          </Disclosure.Panel>
                        </Disclosure>
                        <Disclosure>
                          <Disclosure.Button>
                            Out Door Activities and Sports
                          </Disclosure.Button>
                          <Disclosure.Panel className="leading-relaxed text-slate-600 dark:text-slate-500">
                                <div className="grid-cols-4 gap-2 sm:grid">
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                              </div>
                          </Disclosure.Panel>
                        </Disclosure>
                        <Disclosure>
                          <Disclosure.Button>
                            Common Area
                          </Disclosure.Button>
                          <Disclosure.Panel className="leading-relaxed text-slate-600 dark:text-slate-500">
                                <div className="grid-cols-4 gap-2 sm:grid">
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                              </div>
                          </Disclosure.Panel>
                        </Disclosure>
                        <Disclosure>
                          <Disclosure.Button>
                            Food and Drink
                          </Disclosure.Button>
                          <Disclosure.Panel className="leading-relaxed text-slate-600 dark:text-slate-500">
                                <div className="grid-cols-4 gap-2 sm:grid">
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                              </div>
                          </Disclosure.Panel>
                        </Disclosure>
                        <Disclosure>
                          <Disclosure.Button>
                            Health and Wellness
                          </Disclosure.Button>
                          <Disclosure.Panel className="leading-relaxed text-slate-600 dark:text-slate-500">
                                <div className="grid-cols-4 gap-2 sm:grid">
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                              </div>
                          </Disclosure.Panel>
                        </Disclosure>
                        <Disclosure>
                          <Disclosure.Button>
                            Bussiness Center and Conferences
                          </Disclosure.Button>
                          <Disclosure.Panel className="leading-relaxed text-slate-600 dark:text-slate-500">
                              <div className="grid-cols-4 gap-2 sm:grid">
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                              </div>
                          </Disclosure.Panel>
                        </Disclosure>
                        <Disclosure>
                          <Disclosure.Button>
                            Beauty and Spa
                          </Disclosure.Button>
                          <Disclosure.Panel className="leading-relaxed text-slate-600 dark:text-slate-500">
                                <div className="grid-cols-4 gap-2 sm:grid">
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                              </div>
                          </Disclosure.Panel>
                        </Disclosure>
                        <Disclosure>
                          <Disclosure.Button>
                            Security
                          </Disclosure.Button>
                          <Disclosure.Panel className="leading-relaxed text-slate-600 dark:text-slate-500">
                                <div className="grid-cols-4 gap-2 sm:grid">
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                              </div>
                          </Disclosure.Panel>
                        </Disclosure>
                        <Disclosure>
                          <Disclosure.Button>
                            Transfer
                          </Disclosure.Button>
                          <Disclosure.Panel className="leading-relaxed text-slate-600 dark:text-slate-500">
                                <div className="grid-cols-4 gap-2 sm:grid">
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                              </div>
                          </Disclosure.Panel>
                        </Disclosure>
                        <Disclosure>
                          <Disclosure.Button>
                            Shopping
                          </Disclosure.Button>
                          <Disclosure.Panel className="leading-relaxed text-slate-600 dark:text-slate-500">
                              <div className="grid-cols-4 gap-2 sm:grid">
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                              </div>
                          </Disclosure.Panel>
                        </Disclosure>
                        <Disclosure>
                          <Disclosure.Button>
                            Entertainment
                          </Disclosure.Button>
                          <Disclosure.Panel className="leading-relaxed text-slate-600 dark:text-slate-500">
                                <div className="grid-cols-4 gap-2 sm:grid">
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                              </div>
                          </Disclosure.Panel>
                        </Disclosure>
                        <Disclosure>
                          <Disclosure.Button>
                            Payment Service
                          </Disclosure.Button>
                          <Disclosure.Panel className="leading-relaxed text-slate-600 dark:text-slate-500">
                              <div className="grid-cols-4 gap-2 sm:grid">
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                              </div>
                          </Disclosure.Panel>
                        </Disclosure>
                        <Disclosure>
                          <Disclosure.Button>
                            Indoor Activites and Sports
                          </Disclosure.Button>
                          <Disclosure.Panel className="leading-relaxed text-slate-600 dark:text-slate-500">
                                <div className="grid-cols-4 gap-2 sm:grid">
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                              </div>
                          </Disclosure.Panel>
                        </Disclosure>
                        <Disclosure>
                          <Disclosure.Button>
                            Family and Kids
                          </Disclosure.Button>
                          <Disclosure.Panel className="leading-relaxed text-slate-600 dark:text-slate-500">
                                <div className="grid-cols-4 gap-2 sm:grid">
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                              </div>
                          </Disclosure.Panel>
                        </Disclosure>
                        <Disclosure>
                          <Disclosure.Button>
                            Pet Essential
                          </Disclosure.Button>
                          <Disclosure.Panel className="leading-relaxed text-slate-600 dark:text-slate-500">
                                <div className="grid-cols-4 gap-2 sm:grid">
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                                <FormCheck className="mt-2 mr-2 sm:mt-0">
                                    <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB"/>
                                    <FormCheck.Label htmlFor="checkbox-switch-6">
                                        City View
                                    </FormCheck.Label>
                                </FormCheck>
                              </div>
                          </Disclosure.Panel>
                        </Disclosure>
                      </Disclosure.Group>
                    </Preview> */}
                                </div>
                            </>

                        </PreviewComponent>
                        {/* END: Vertical Form */}

                    </div>
                </div>
            </form>
            {/* BEGIN: Success Notification Content */}
            <Notification
                id="success-notification-content"
                className="flex hidden"
            >
                <Lucide icon="CheckCircle" className="text-success" />
                <div className="ml-4 mr-4">
                    <div className="font-medium">Data updated successfully!</div>
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
                    <div className="font-medium">Data updation failed!</div>
                    <div className="mt-1 text-slate-500">
                        Please check the fileld form.
                    </div>
                </div>
            </Notification>
            {/* END: Failed Notification Content */}
        </>
    );
}

export default editRoomDetails;
