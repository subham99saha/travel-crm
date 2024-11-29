// @ts-nocheck
import _ from "lodash";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import fakerData from "../../utils/faker";
import Button from "../../base-components/Button";
import Notification from "../../base-components/Notification";
import Toastify from "toastify-js";
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
import TomSelect from "../../base-components/TomSelect";
import { ClassicEditor } from "../../base-components/Ckeditor";
import Alert from "../../base-components/Alert";
import Lucide from "../../base-components/Lucide";
import Tippy from "../../base-components/Tippy";
import Table from "../../base-components/Table";
import { useAppSelector, useAppDispatch } from "../../stores/hooks";
import { fetchAllCity } from "../City/CitySlice";
import { fetchAllState } from "../State/StateSlice";
import { createVendor } from "../Vendor/vendorSlice";
import { updateHotelRoom, getHotelRoomByID } from "./hotelRoomSlice"

const updateRoomDetails = () => {
    const { data: hotelRoomData } = useAppSelector((state) => state.hotelRoomReducer);

    const [cityId, setcityId] = useState('');
    const [stateId, setstateId] = useState('');
    const [isActive, setisActive] = useState('Y');
    const [vendorType, setvendorType] = useState('');
    const [visitFrom, setvisitFrom] = useState('');

    const dispatch = useAppDispatch();
    const city = useAppSelector((state) => state.city);
    useEffect(() => {
        dispatch(fetchAllCity());
    }, []);

    const state = useAppSelector((state) => state.state);

    useEffect(() => {
        dispatch(fetchAllState());
    }, []);

    useEffect(() => {
        const url = window.location.href;
        const parts = url.split('/');
        const roomId = parts[parts.length - 1];

        dispatch(getHotelRoomByID(roomId))
    }, [])

    useEffect(() => {
        if (hotelRoomData !== null) {
            console.log({ hotelRoomData });
            setValue('roomType', hotelRoomData.roomType);
            setValue('roomSize', hotelRoomData.roomSize);
            setValue('roomFloor', hotelRoomData.roomFloor);
            setValue('bedType', hotelRoomData.bedType);
            setValue('bedCount', hotelRoomData.bedCount);
            setValue('noOfRoom', hotelRoomData.noOfRoom);
            setValue('defaultPriceAC', hotelRoomData.defaultPriceAC);
            setValue('defaultPriceNonAC', hotelRoomData.defaultPriceNonAC);
            setValue('discountVal', hotelRoomData.discount);
            setValue('discountPriceAC', hotelRoomData.discountPriceAC);
            setValue('discountPriceNonAC', hotelRoomData.discountPriceNonAC);
            setValue('roomImage', hotelRoomData.roomImage);
            setValue('roomVariant', hotelRoomData.roomVariant);
            setValue('createdBy', hotelRoomData.createdBy);
            setValue('isActive', hotelRoomData.isActive);
        }
    }, [hotelRoomData]);

    const schema = yup
        .object({
            roomType: yup.string().required("roomType is a required field").min(2),
            roomSize: yup.string().required("roomSize is a required field").min(2)
        })
        .required();

    const {
        register,
        getValues,
        setValue,
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
            const url = window.location.href;
            const parts = url.split('/');
            const hmId = parts[parts.length - 1];

            let formData = {
                roomType: getValues('roomType'),
                roomSize: getValues('roomSize'),
                roomFloor: getValues('roomFloor'),
                bedType: getValues('bedType'),
                bedCount: Number(getValues('bedCount')),
                noOfRoom: 1,
                defaultPriceAC: getValues('defaultPriceAC'),
                defaultPriceNonAC: getValues('defaultPriceNonAC'),
                discount: Number(getValues('discountVal')),
                discountPriceAC: (getValues('defaultPriceAC') - ((getValues('discountVal') / 100) * getValues('defaultPriceAC'))).toString(),
                discountPriceNonAC: (getValues('defaultPriceNonAC') - ((getValues('discountVal') / 100) * getValues('defaultPriceNonAC'))).toString(),
                roomImage: getValues('roomImage')[0],
                roomVariant: [
                    'variant-1',
                    'variant-2',
                    'variant-3'
                ],
                createdBy: JSON.parse(localStorage.getItem('userInfo'))['resData']['id'],
                isActive: isActive
            }

            console.log(formData);

            dispatch(updateHotelRoom(formData, hotelRoomData.id));
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

    return (
        <>
            <div className="flex items-center mt-8 intro-y">
                <h2 className="mr-auto text-lg font-medium">Update Hotel Room</h2>
            </div>
            {
                hotelRoomData === null
                    ? <></>
                    : <form className="validate-form" onSubmit={onSubmit}>
                        <div className="grid grid-cols-11 pb-20 mt-5 gap-x-6">
                            <div className="col-span-11 intro-y 2xl:col-span-9">
                                {/* BEGIN: Personal Information */}
                                <div className="p-5 mt-5 intro-y box">
                                    <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
                                        <div className="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                                            <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Basic Information
                                        </div>

                                        <div className="mt-5">
                                            <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                                <FormLabel className="xl:w-64 xl:!mr-10">
                                                    <div className="text-left">
                                                        <div className="flex items-center">
                                                            <div className="font-medium">Room Name</div>
                                                            <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                                Required
                                                            </div>
                                                        </div>
                                                    </div>
                                                </FormLabel>
                                                <div className="flex-1 w-full mt-3 xl:mt-0">
                                                    <FormInput
                                                        {...register("roomType")}
                                                        id="roomType"
                                                        type="text"
                                                        placeholder="Room Name"
                                                    />
                                                    <FormHelp className="text-right">
                                                        Maximum character 0/70
                                                    </FormHelp>
                                                </div>
                                            </FormInline>
                                            <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                                <FormLabel className="xl:w-64 xl:!mr-10">
                                                    <div className="text-left">
                                                        <div className="flex items-center">
                                                            <div className="font-medium">Room Size</div>
                                                            <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                                Required
                                                            </div>
                                                        </div>
                                                    </div>
                                                </FormLabel>
                                                <div className="flex-1 w-full mt-3 xl:mt-0">
                                                    <FormInput
                                                        {...register("roomSize")}
                                                        id="roomSize"
                                                        type="text"
                                                        placeholder="Room Size"
                                                    />
                                                </div>
                                            </FormInline>
                                            <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                                <FormLabel className="xl:w-64 xl:!mr-10">
                                                    <div className="text-left">
                                                        <div className="flex items-center">
                                                            <div className="font-medium">Floor</div>
                                                            <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                                Required
                                                            </div>
                                                        </div>
                                                    </div>
                                                </FormLabel>
                                                <div className="flex-1 w-full mt-3 xl:mt-0">
                                                    <FormSelect>
                                                        <option {...register("roomFloor")} id="roomFloor" value="Ground">Ground</option>
                                                        <option {...register("roomFloor")} id="roomFloor" value="Ground">1st</option>
                                                        <option {...register("roomFloor")} id="roomFloor" value="Ground">2nd</option>
                                                        <option {...register("roomFloor")} id="roomFloor" value="Ground">3rd</option>
                                                        <option {...register("roomFloor")} id="roomFloor" value="Ground">4th</option>
                                                        <option {...register("roomFloor")} id="roomFloor" value="Ground">5th</option>
                                                        <option {...register("roomFloor")} id="roomFloor" value="Ground">6th</option>
                                                        <option {...register("roomFloor")} id="roomFloor" value="Ground">7th</option>
                                                        <option {...register("roomFloor")} id="roomFloor" value="Ground">8th</option>
                                                    </FormSelect>
                                                </div>
                                            </FormInline>

                                            <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                                <FormLabel className="xl:w-64 xl:!mr-10">
                                                    <div className="text-left">
                                                        <div className="flex items-center">
                                                            <div className="font-medium">Bed Type</div>
                                                            <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                                Required
                                                            </div>
                                                        </div>

                                                    </div>
                                                </FormLabel>
                                                <div className="flex-1 w-full mt-3 xl:mt-0">
                                                    <div className="grid-cols-4 gap-2 sm:grid">
                                                        <FormSelect>
                                                            <option {...register("bedType")} id="bedType" value="Single">Single</option>
                                                            <option {...register("bedType")} id="bedType" value="Double">Double</option>
                                                            <option {...register("bedType")} id="bedType" value="Tripple">Tripple</option>
                                                            <option {...register("bedType")} id="bedType" value="King">King</option>
                                                            <option {...register("bedType")} id="bedType" value="Queen">Queen</option>
                                                        </FormSelect>
                                                        <FormInput
                                                            {...register("bedCount")}
                                                            id="bedCount"
                                                            type="text"
                                                            className="mt-2 sm:mt-0"
                                                            placeholder="No of Bed"
                                                        />
                                                    </div>
                                                </div>
                                            </FormInline>

                                            <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                                <FormLabel className="xl:w-64 xl:!mr-10">
                                                    <div className="text-left">
                                                        <div className="flex items-center">
                                                            <div className="font-medium">AC Type</div>
                                                            <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                                Required
                                                            </div>
                                                        </div>

                                                    </div>
                                                </FormLabel>
                                                <div className="flex-1 w-full mt-3 xl:mt-0">
                                                    <div className="grid-cols-4 gap-2 sm:grid">
                                                        <FormSelect>
                                                            <option value="Gram (g)">AC</option>
                                                            <option value="Kilogram (kg)">Non AC</option>
                                                        </FormSelect>
                                                    </div>

                                                </div>
                                            </FormInline>

                                            <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                                <FormLabel className="xl:w-64 xl:!mr-10">
                                                    <div className="text-left">
                                                        <div className="flex items-center">
                                                            <div className="font-medium">Default Price</div>
                                                            <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                                Required
                                                            </div>
                                                        </div>

                                                    </div>
                                                </FormLabel>
                                                <div className="flex-1 w-full mt-3 xl:mt-0">
                                                    <div className="grid-cols-4 gap-2 sm:grid">
                                                        <FormInput
                                                            {...register("defaultPriceAC")}
                                                            id="defaultPriceAC"
                                                            type="text"
                                                            className="mt-2 sm:mt-0"
                                                            placeholder="AC Room"
                                                        />
                                                        <FormInput
                                                            {...register("defaultPriceNonAC")}
                                                            id="defaultPriceNonAC"
                                                            type="text"
                                                            className="mt-2 sm:mt-0"
                                                            placeholder="Non AC Room"
                                                        />
                                                    </div>
                                                </div>
                                            </FormInline>

                                            <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                                <FormLabel className="xl:w-64 xl:!mr-10">
                                                    <div className="text-left">
                                                        <div className="flex items-center">
                                                            <div className="font-medium">Discount</div>
                                                            <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                                Required
                                                            </div>
                                                        </div>

                                                    </div>
                                                </FormLabel>
                                                <div className="flex-1 w-full mt-3 xl:mt-0">
                                                    <div className="grid-cols-4 gap-2 sm:grid">
                                                        <FormInput
                                                            {...register("discountVal")}
                                                            id="discountVal"
                                                            type="text"
                                                            className="mt-2 sm:mt-0"
                                                            placeholder="Discount Percent"
                                                        />
                                                    </div>
                                                </div>
                                            </FormInline>

                                            <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                                <FormLabel className="xl:w-64 xl:!mr-10">
                                                    <div className="text-left">
                                                        <div className="flex items-center">
                                                            <div className="font-medium">Room Image</div>
                                                            <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                                Required
                                                            </div>
                                                        </div>
                                                        <div className="mt-3 text-xs leading-relaxed text-slate-500">
                                                            Upload your Room image, format in jpeg, jpg, gif and pdf.
                                                        </div>
                                                    </div>
                                                </FormLabel>
                                                <div className="flex-1 w-full mt-3 xl:mt-0">
                                                    <div className="grid-cols-4 gap-2 sm:grid">
                                                        <FormInput
                                                            {...register("roomImage")}
                                                            id="roomImage"
                                                            type="file"
                                                            className="mt-3 sm:mt-0"

                                                        />
                                                    </div>
                                                </div>
                                            </FormInline>
                                        </div>
                                    </div>
                                </div>
                                {/* END: Personal Information */}
                                {/* BEGIN: Room Variant Info */}
                                <div className="p-5 mt-5 intro-y box">
                                    <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
                                        <div className="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                                            <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Room Facilities
                                        </div>
                                        <div className="mt-5">
                                            <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                                <FormLabel className="xl:w-64 xl:!mr-10">
                                                    <div className="text-left">
                                                        <div className="flex items-center">
                                                            <div className="font-medium">Variant List</div>
                                                        </div>
                                                        <div className="mt-3 text-xs leading-relaxed text-slate-500">
                                                            Set the room related variant.
                                                        </div>
                                                    </div>
                                                </FormLabel>
                                                <div className="flex-1 w-full mt-3 xl:mt-0">
                                                    <div className="overflow-x-auto">
                                                        <Table className="border">
                                                            <Table.Tbody>
                                                                <Table.Tr>
                                                                    <Table.Td rowSpan={2} className="border-r">
                                                                        View
                                                                    </Table.Td>
                                                                    <Table.Td className="!px-2">
                                                                    </Table.Td>
                                                                    <Table.Td className="!px-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                City View
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                    <Table.Td className="!px-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                Garden View
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                    <Table.Td className="!pl-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                Pool View
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                </Table.Tr>

                                                                <Table.Tr>
                                                                    <Table.Td>&nbsp;</Table.Td>
                                                                    <Table.Td className="!px-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                Mountain View
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                    <Table.Td className="!px-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                Road View
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                    <Table.Td className="!pl-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                Sea View
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                </Table.Tr>
                                                                <Table.Tr>
                                                                    <Table.Td rowSpan={1} className="border-r">
                                                                        Kitchen
                                                                    </Table.Td>
                                                                    <Table.Td>&nbsp;</Table.Td>
                                                                    <Table.Td className="!px-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                Electric Kettle
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                    <Table.Td className="!px-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                Gas
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                    <Table.Td className="!pl-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                Utensils
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                </Table.Tr>
                                                                <Table.Tr>
                                                                    <Table.Td rowSpan={2} className="border-r">
                                                                        Bathroom & Toiletries
                                                                    </Table.Td>
                                                                    <Table.Td>&nbsp;</Table.Td>
                                                                    <Table.Td className="!px-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                Toiletries
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                    <Table.Td className="!px-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                Hair Dryer
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                    <Table.Td className="!pl-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                Towels
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                </Table.Tr>
                                                                <Table.Tr>
                                                                    <Table.Td>&nbsp;</Table.Td>
                                                                    <Table.Td className="!px-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                Additional Toilet
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                    <Table.Td className="!px-2">

                                                                    </Table.Td>
                                                                    <Table.Td className="!pl-2">

                                                                    </Table.Td>
                                                                </Table.Tr>
                                                                <Table.Tr>
                                                                    <Table.Td rowSpan={2} className="border-r">
                                                                        Entertainment
                                                                    </Table.Td>
                                                                    <Table.Td>&nbsp;</Table.Td>
                                                                    <Table.Td className="!px-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                Pool Facility
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                    <Table.Td className="!px-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                Wi-Fi
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                    <Table.Td className="!pl-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                TV
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                </Table.Tr>
                                                                <Table.Tr>
                                                                    <Table.Td>&nbsp;</Table.Td>
                                                                    <Table.Td className="!px-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                Telephone
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                    <Table.Td className="!px-2">

                                                                    </Table.Td>
                                                                    <Table.Td className="!pl-2">

                                                                    </Table.Td>
                                                                </Table.Tr>
                                                                <Table.Tr>
                                                                    <Table.Td rowSpan={2} className="border-r">
                                                                        Comforts
                                                                    </Table.Td>
                                                                    <Table.Td>&nbsp;</Table.Td>
                                                                    <Table.Td className="!px-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                AC
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                    <Table.Td className="!px-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                Fan
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                    <Table.Td className="!pl-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                Newspaper
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                </Table.Tr>
                                                                <Table.Tr>
                                                                    <Table.Td>&nbsp;</Table.Td>
                                                                    <Table.Td className="!px-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                Clock
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                    <Table.Td className="!px-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                Wake-up Service
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                    <Table.Td className="!pl-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                Linens
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                </Table.Tr>
                                                                <Table.Tr>
                                                                    <Table.Td rowSpan={2} className="border-r">
                                                                        Dining, Drinking & Snacking
                                                                    </Table.Td>
                                                                    <Table.Td>&nbsp;</Table.Td>
                                                                    <Table.Td className="!px-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                Coffee/Tea Maker
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                    <Table.Td className="!px-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                Mini Bar
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                    <Table.Td className="!pl-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                Refrigerator
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                </Table.Tr>
                                                                <Table.Tr>
                                                                    <Table.Td>&nbsp;</Table.Td>
                                                                    <Table.Td className="!px-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                Bottled Water
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                    <Table.Td className="!px-2">

                                                                    </Table.Td>
                                                                    <Table.Td className="!pl-2">

                                                                    </Table.Td>
                                                                </Table.Tr>
                                                                <Table.Tr>
                                                                    <Table.Td rowSpan={2} className="border-r">
                                                                        Furnishing
                                                                    </Table.Td>
                                                                    <Table.Td>&nbsp;</Table.Td>
                                                                    <Table.Td className="!px-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                Ground Floor Available
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                    <Table.Td className="!px-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                Desk
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                    <Table.Td className="!pl-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                Seating Area
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                </Table.Tr>
                                                                <Table.Tr>
                                                                    <Table.Td>&nbsp;</Table.Td>
                                                                    <Table.Td className="!px-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                Tile/Marbel Flooring
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                    <Table.Td className="!px-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                Trash Cans
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                    <Table.Td className="!pl-2">

                                                                    </Table.Td>
                                                                </Table.Tr>
                                                                <Table.Tr>
                                                                    <Table.Td rowSpan={2} className="border-r">
                                                                        Clothing & Laundry
                                                                    </Table.Td>
                                                                    <Table.Td>&nbsp;</Table.Td>
                                                                    <Table.Td className="!px-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                Clothes Dryer
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                    <Table.Td className="!px-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                Closet
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                    <Table.Td className="!pl-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                Clothes Rack
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                </Table.Tr>
                                                                <Table.Tr>
                                                                    <Table.Td>&nbsp;</Table.Td>
                                                                    <Table.Td className="!px-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                Ironing Facilities
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                    <Table.Td className="!px-2">
                                                                        <FormCheck className="mt-2 mr-2 sm:mt-0">
                                                                            <FormCheck.Input id="checkbox-switch-6" type="checkbox" value="BB" />
                                                                            <FormCheck.Label htmlFor="checkbox-switch-6">
                                                                                Trouser Press
                                                                            </FormCheck.Label>
                                                                        </FormCheck>
                                                                    </Table.Td>
                                                                    <Table.Td className="!pl-2">

                                                                    </Table.Td>
                                                                </Table.Tr>

                                                            </Table.Tbody>
                                                        </Table>

                                                    </div>
                                                </div>
                                            </FormInline>

                                        </div>
                                    </div>
                                </div>
                                {/* END: Room Variant Info */}
                                {/* BEGIN: Admin Info */}
                                <div className="p-5 mt-5 intro-y box">
                                    <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
                                        <div className="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                                            <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Admin Info
                                        </div>
                                        <div className="mt-5">
                                            <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                                <FormLabel className="xl:w-64 xl:!mr-10">
                                                    <div className="text-left">
                                                        <div className="flex items-center">
                                                            <div className="font-medium">STATUS</div>
                                                            <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                                Required
                                                            </div>
                                                        </div>
                                                    </div>
                                                </FormLabel>
                                                <div className="flex-1 w-full mt-3 xl:mt-0">
                                                    <FormSelect
                                                        {...register("isActive")}
                                                        onChange={(e) => setisActive(e.target.value)}
                                                        id="isActive"
                                                        placeholder=""
                                                    >
                                                        <option value="">Select Status</option>
                                                        <option value="Y">Active</option>
                                                        <option value="N">Inactive</option>
                                                    </FormSelect>
                                                </div>
                                            </FormInline>
                                        </div>
                                    </div>
                                </div>
                                {/* END: Admin Info */}
                                <div className="flex flex-col justify-end gap-2 mt-5 md:flex-row">
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="w-full py-3 md:w-52"
                                    >
                                        Save
                                    </Button>
                                    <Link to="/vendor">
                                        <Button
                                            type="button"
                                            className="w-full py-3 border-slate-300 dark:border-darkmode-400 text-slate-500 md:w-52"
                                        >
                                            Cancel
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </form>
            }
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

export default updateRoomDetails;
