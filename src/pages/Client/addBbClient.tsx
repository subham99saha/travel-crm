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

const addClientBB = () => {
    const [cityId, setcityId] = useState('');
    const [stateId, setstateId] = useState('');
    const [isActive, setisActive] = useState('Y');
    const [vendorType, setvendorType] = useState('');
    const [visitFrom, setvisitFrom] = useState('');
    const [vRegion, setRegion] = useState(''); 
    const [vCloseDay, setvCloseDay] = useState('');

    const dispatch = useAppDispatch();
    const city = useAppSelector((state) => state.city);
    useEffect(() => {
        dispatch(fetchAllCity());
    }, []);

    const state = useAppSelector((state) => state.state);
    useEffect(() => {
        dispatch(fetchAllState());
    }, []);


    const schema = yup
        .object({
            vName: yup.string().required("Name is a required field").min(2),
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
                vName: getValues('vName'),
                vOwnerName: getValues('vOwnerName'),
                contactPerson: getValues('contactPerson'),
                vEmail: getValues('vEmail'),
                vPass: getValues('vPass'),
                vAlternateEmail: getValues('vAlternateEmail'),
                vMobile: getValues('vMobile'),
                vAlternateNo: getValues('vAlternateNo'),
                vPan: getValues('vPan'),
                vGSTNNo: getValues('vGSTNNo'),
                vWhatsapp: getValues('vWhatsapp'),
                vSkype: getValues('vSkype'),
                vAddress: getValues('vAddress'),
                vPincode: getValues('vPincode'),
                cityId: cityId,
                stateId: stateId,
                vRegion: vRegion,
                vMICR: getValues('vMICR'),
                vIFSC: getValues('vIFSC'),
                vACNO: getValues('vACNO'),
                vBranch: getValues('vBranch'),
                vBankName: getValues('vBankName'),
                vAccountName: getValues('vAccountName'),
                gMapLocation: getValues('gMapLocation'),
                vWebsite: getValues('vWebsite'),
                vRemarks: getValues('vRemarks'),
                vSpecialization: getValues('vSpecialization'),
                vOpeningTime: getValues('vOpeningTime'),
                vClosingTime: getValues('vClosingTime'),
                vCloseDay: vCloseDay,
                visitFrom: visitFrom,
                isActive: isActive,
                registerAgent: getValues('registerAgent'),
                vType: 'B2B',
                createdBy: JSON.parse(localStorage.getItem("userInfo"))["resData"]["id"]
            };
            console.log(formData);

            dispatch(createVendor(formData));
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
                <h2 className="mr-auto text-lg font-medium">Add B2B Client</h2>
            </div>
            <form className="validate-form" onSubmit={onSubmit}>
                <div className="grid grid-cols-11 pb-20 mt-5 gap-x-6">
                    <div className="col-span-11 intro-y 2xl:col-span-9">
                        {/* BEGIN: Personal Information */}
                        <div className="p-5 mt-5 intro-y box">
                            <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
                                <div className="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                                    <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Personal
                                    Information
                                </div>

                                <div className="mt-5">
                                    <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel className="xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">Travel Agency Name</div>
                                                    <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                        Required
                                                    </div>
                                                </div>
                                                {/* <div className="mt-3 text-xs leading-relaxed text-slate-500">
                                                    Add vendor Company Name or Firm Name or Hotel Name or can add Owner Name also.
                                                </div> */}
                                            </div>
                                        </FormLabel>
                                        <div className="flex-1 w-full mt-3 xl:mt-0">
                                            <FormInput
                                                {...register("vName")}
                                                id="vName"
                                                type="text"
                                                placeholder="Travel Agency Name"
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
                                                    <div className="font-medium">Owner Name</div>
                                                    <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                        Required
                                                    </div>
                                                </div>
                                            </div>
                                        </FormLabel>
                                        <div className="flex-1 w-full mt-3 xl:mt-0">
                                            <FormInput
                                                {...register("vOwnerName")}
                                                id="vOwnerName"
                                                type="text"
                                                placeholder="Owner Name"
                                            />
                                            <FormHelp className="text-right">
                                                Maximum character 0/30
                                            </FormHelp>
                                        </div>
                                    </FormInline>
                                    <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel className="xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">Executive Name</div>
                                                    <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                        Required
                                                    </div>
                                                </div>
                                            </div>
                                        </FormLabel>
                                        <div className="flex-1 w-full mt-3 xl:mt-0">
                                            <FormInput
                                                {...register("contactPerson")}
                                                id="contactPerson"
                                                type="text"
                                                placeholder="Contact Person"
                                            />
                                            <FormHelp className="text-right">
                                                Maximum character 0/30
                                            </FormHelp>
                                        </div>
                                    </FormInline>
                                    
                                    <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel className="xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">EMAIL</div>
                                                    <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                        Required
                                                    </div>
                                                </div>
                                            </div>
                                        </FormLabel>
                                        <div className="flex-1 w-full mt-3 xl:mt-0">
                                            <FormInput
                                                {...register("vEmail")}
                                                id="vEmail"
                                                type="text"
                                                placeholder="Email"
                                            />
                                            <FormHelp className="text-right">
                                                Maximum character 0/30
                                            </FormHelp>
                                        </div>
                                    </FormInline>
                                    <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel className="xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">Password</div>
                                                    <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                        Required
                                                    </div>
                                                </div>
                                            </div>
                                        </FormLabel>
                                        <div className="flex-1 w-full mt-3 xl:mt-0">
                                            <FormInput
                                                {...register("vPass")}
                                                id="vPass"
                                                type="password"
                                                placeholder="Password"
                                            />
                                        </div>
                                    </FormInline>
                                    <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel className="xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">ALTERNATIVE EMAIL</div>
                                                    {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div> */}
                                                </div>
                                            </div>
                                        </FormLabel>
                                        <div className="flex-1 w-full mt-3 xl:mt-0">
                                            <FormInput
                                                {...register("vAlternateEmail")}
                                                id="vAlternateEmail"
                                                type="text"
                                                placeholder="Alternative Email"
                                            />
                                            <FormHelp className="text-right">
                                                Maximum character 0/30
                                            </FormHelp>
                                        </div>
                                    </FormInline>
                                    <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel className="xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">MOBILE NO</div>
                                                    <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                        Required
                                                    </div>
                                                </div>
                                            </div>
                                        </FormLabel>
                                        <div className="flex-1 w-full mt-3 xl:mt-0">
                                            <FormInput
                                                {...register("vMobile")}
                                                id="vMobile"
                                                type="text"
                                                placeholder="Mobile"
                                            />
                                            <FormHelp className="text-right">
                                                Maximum character 0/15
                                            </FormHelp>
                                        </div>
                                    </FormInline>
                                    <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel className="xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">ALTERNATIVE MOBILE NO</div>
                                                    {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div> */}
                                                </div>
                                            </div>
                                        </FormLabel>
                                        <div className="flex-1 w-full mt-3 xl:mt-0">
                                            <FormInput
                                                {...register("vAlternateNo")}
                                                id="vAlternateNo"
                                                type="text"
                                                placeholder="Alternate No"
                                            />
                                            <FormHelp className="text-right">
                                                Maximum character 0/15
                                            </FormHelp>
                                        </div>
                                    </FormInline>
                                    <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel className="xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">PAN NO</div>
                                                    <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                        Required
                                                    </div>
                                                </div>
                                            </div>
                                        </FormLabel>
                                        <div className="flex-1 w-full mt-3 xl:mt-0">
                                            <FormInput
                                                {...register("vPan")}
                                                id="vPan"
                                                type="text"
                                                placeholder="Pan Number"
                                            />
                                            <FormHelp className="text-right">
                                                Maximum character 0/15
                                            </FormHelp>
                                        </div>
                                    </FormInline>
                                    <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel className="xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">GSTN NO</div>
                                                    {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div> */}
                                                </div>
                                            </div>
                                        </FormLabel>
                                        <div className="flex-1 w-full mt-3 xl:mt-0">
                                            <FormInput
                                                {...register("vGSTNNo")}
                                                id="vGSTNNo"
                                                type="text"
                                                placeholder="GSTN No"
                                            />
                                            <FormHelp className="text-right">
                                                Maximum character 0/15
                                            </FormHelp>
                                        </div>
                                    </FormInline>
                                    <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel className="xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">WahtsApp No</div>
                                                    {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div> */}
                                                </div>
                                            </div>
                                        </FormLabel>
                                        <div className="flex-1 w-full mt-3 xl:mt-0">
                                            <FormInput
                                                {...register("vWhatsapp")}
                                                id="vWhatsapp"
                                                type="text"
                                                placeholder="WahtsApp No"
                                            />
                                            <FormHelp className="text-right">
                                                Maximum character 0/15
                                            </FormHelp>
                                        </div>
                                    </FormInline>
                                    <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel className="xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">SKYPE</div>
                                                </div>
                                            </div>
                                        </FormLabel>
                                        <div className="flex-1 w-full mt-3 xl:mt-0">
                                            <FormInput
                                                {...register("vSkype")}
                                                id="vSkype"
                                                type="text"
                                                placeholder="Skype"
                                            />
                                            <FormHelp className="text-right">
                                                Maximum character 0/15
                                            </FormHelp>
                                        </div>
                                    </FormInline>
                                    
                                </div>
                            </div>
                        </div>
                        {/* END: Personal Information */}
                        {/* BEGIN: Address and Location */}
                        <div className="p-5 mt-5 intro-y box">
                            <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
                                <div className="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                                    <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Address and Location
                                </div>
                                <div className="mt-5">
                                    <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel className="xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">Address</div>
                                                    <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                        Required
                                                    </div>
                                                </div>
                                                <div className="mt-3 text-xs leading-relaxed text-slate-500">
                                                    <div>
                                                        Can add Personal Address or Business Address or Hotle Address.
                                                    </div>
                                                    <div className="mt-2">
                                                        It is recommended to enter street, road name, Appartment, Block Info etc.
                                                    </div>
                                                </div>
                                            </div>
                                        </FormLabel>
                                        <div className="flex-1 w-full mt-3 xl:mt-0">
                                            <FormTextarea
                                                {...register("vAddress")}
                                                rows="5"
                                                id="vAddress"
                                                placeholder="Address"
                                            />
                                            <FormHelp className="text-right">
                                                Maximum character 0/200
                                            </FormHelp>
                                        </div>
                                    </FormInline>
                                    <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel className="xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">PINCODE</div>
                                                    <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                        Required
                                                    </div>
                                                </div>
                                            </div>
                                        </FormLabel>
                                        <div className="flex-1 w-full mt-3 xl:mt-0">
                                            <FormInput
                                                {...register("vPincode")}
                                                id="vPincode"
                                                type="text"
                                                placeholder="Pincode"
                                            />
                                            <FormHelp className="text-right">
                                                Maximum character 0/15
                                            </FormHelp>
                                        </div>
                                    </FormInline>
                                    <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel className="xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">CITY</div>
                                                    <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                        Required
                                                    </div>
                                                </div>
                                            </div>
                                        </FormLabel>
                                        <div className="flex-1 w-full mt-3 xl:mt-0">
                                            <FormSelect
                                                {...register("cityId")}
                                                value={cityId}
                                                onChange={(e) => setcityId(e.target.value)}
                                                id="cityId"
                                                placeholder="City"
                                            >
                                                <option value="">Select City</option>
                                                {_.take(city.data, city.data.length).map((item, Key) => (
                                                    <option value={item.id}>{item.cityName}</option>
                                                )

                                                )}
                                            </FormSelect>
                                        </div>
                                    </FormInline>
                                    <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel className="xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">STATE</div>
                                                    <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                        Required
                                                    </div>
                                                </div>
                                            </div>
                                        </FormLabel>
                                        <div className="flex-1 w-full mt-3 xl:mt-0">
                                            <FormSelect
                                                {...register("stateId")}
                                                onChange={(e) => setstateId(e.target.value)}
                                                id="stateId"
                                                placeholder="State"
                                            >
                                                <option value="">Select State</option>
                                                {_.take(state.data, state.data.length).map((item, Key) => (
                                                    <option value={item.id}>{item.stateName}</option>
                                                )

                                                )}
                                            </FormSelect>
                                        </div>
                                    </FormInline>
                                    <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel className="xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">REGION</div>
                                                    <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                        Required
                                                    </div>
                                                </div>
                                            </div>
                                        </FormLabel>
                                        <div className="flex-1 w-full mt-3 xl:mt-0">
                                            <FormSelect
                                                {...register("vRegion")}
                                                onChange={(e) => setRegion(e.target.value)}
                                                id="vRegion"
                                                placeholder="Region"
                                            >
                                                <option value="">Select Region</option>
                                                <option value="East">East</option>
                                                <option value="West">West</option>
                                                <option value="North">North</option>
                                                <option value="South">South</option>
                                                <option value="Northeast">Northeast</option>
                                                <option value="Central">Central</option>
                                            </FormSelect>
                                        </div>
                                    </FormInline>
                                    <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel className="xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">WEBSITE</div>
                                                    {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div> */}
                                                </div>
                                            </div>
                                        </FormLabel>
                                        <div className="flex-1 w-full mt-3 xl:mt-0">
                                            <FormInput
                                                {...register("vWebsite")}
                                                id="vWebsite"
                                                type="text"
                                                placeholder="Website Url"
                                            />
                                            <FormHelp className="text-right">
                                                Maximum character 0/15
                                            </FormHelp>
                                        </div>
                                    </FormInline>
                                    <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel className="xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">LOCATION</div>
                                                    {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div> */}
                                                </div>
                                            </div>
                                        </FormLabel>
                                        <div className="flex-1 w-full mt-3 xl:mt-0">
                                            <FormInput
                                                {...register("gMapLocation")}
                                                id="gMapLocation"
                                                type="text"
                                                placeholder="Longitude and Latitude"
                                            />
                                            <FormHelp className="text-right">
                                                Maximum character 0/30
                                            </FormHelp>
                                        </div>
                                    </FormInline>
                                </div>
                            </div>
                        </div>
                        {/* END: Address and location */}
                        {/* BEGIN: Bank Info */}
                        <div className="p-5 mt-5 intro-y box">
                            <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
                                <div className="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                                    <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Bank Account Information
                                </div>
                                <div className="mt-5">
                                    <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel className="xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">ACCOUNT NAME</div>
                                                    <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                        Required
                                                    </div>
                                                </div>
                                            </div>
                                        </FormLabel>
                                        <div className="flex-1 w-full mt-3 xl:mt-0">
                                            <FormInput
                                                {...register("vAccountName")}
                                                id="vPincode"
                                                type="text"
                                                placeholder="Account Name"
                                            />
                                            <FormHelp className="text-right">
                                                Maximum character 0/15
                                            </FormHelp>
                                        </div>
                                    </FormInline>
                                    <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel className="xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">BANK NAME</div>
                                                    <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                        Required
                                                    </div>
                                                </div>
                                            </div>
                                        </FormLabel>
                                        <div className="flex-1 w-full mt-3 xl:mt-0">
                                            <FormInput
                                                {...register("vBankName")}
                                                id="vWebsite"
                                                type="text"
                                                placeholder="Bank Name"
                                            />
                                        </div>
                                    </FormInline>
                                    <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel className="xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">BRANCH</div>
                                                    <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                        Required
                                                    </div>
                                                </div>
                                            </div>
                                        </FormLabel>
                                        <div className="flex-1 w-full mt-3 xl:mt-0">
                                            <FormInput
                                                {...register("vBranch")}
                                                id="vWebsite"
                                                type="text"
                                                placeholder="Branch Name"
                                            />
                                        </div>
                                    </FormInline>
                                    <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel className="xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">A/C NO</div>
                                                    {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div> */}
                                                </div>
                                            </div>
                                        </FormLabel>
                                        <div className="flex-1 w-full mt-3 xl:mt-0">
                                            <FormInput
                                                {...register("vACNO")}
                                                id="vWebsite"
                                                type="text"
                                                placeholder="Account Number"
                                            />
                                            <FormHelp className="text-right">
                                                Maximum character 0/15
                                            </FormHelp>
                                        </div>
                                    </FormInline>
                                    <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel className="xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">IFSC- CODE</div>
                                                    {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div> */}
                                                </div>
                                            </div>
                                        </FormLabel>
                                        <div className="flex-1 w-full mt-3 xl:mt-0">
                                            <FormInput
                                                {...register("vIFSC")}
                                                id="gMapLocation"
                                                type="text"
                                                placeholder="IFSC"
                                            />
                                            <FormHelp className="text-right">
                                                Maximum character 0/30
                                            </FormHelp>
                                        </div>
                                    </FormInline>
                                    <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel className="xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">MICR</div>
                                                    {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div> */}
                                                </div>
                                            </div>
                                        </FormLabel>
                                        <div className="flex-1 w-full mt-3 xl:mt-0">
                                            <FormInput
                                                {...register("vMICR")}
                                                id="gMapLocation"
                                                type="text"
                                                placeholder="MICR"
                                            />
                                            <FormHelp className="text-right">
                                                Maximum character 0/30
                                            </FormHelp>
                                        </div>
                                    </FormInline>
                                </div>
                            </div>
                        </div>
                        {/* END: Bank Info */}
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
                                                    <div className="font-medium">Remarks</div>
                                                </div>
                                            </div>
                                        </FormLabel>
                                        <div className="flex-1 w-full mt-3 xl:mt-0">
                                            <FormTextarea
                                                {...register("vRemarks")}
                                                rows="5"
                                                id="vRemarks"
                                                placeholder="Remarks"
                                            />
                                            <FormHelp className="text-right">
                                                Maximum character 0/200
                                            </FormHelp>
                                        </div>
                                    </FormInline>
                                    <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel className="xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">Specialization</div>
                                                    
                                                </div>
                                            </div>
                                        </FormLabel>
                                        <div className="flex-1 w-full mt-3 xl:mt-0">
                                            <FormInput
                                                {...register("vSpecialization")}
                                                id="vSpecialization"
                                                type="text"
                                                placeholder="Specialization"
                                            />
                                            <FormHelp className="text-right">
                                                Maximum character 0/30
                                            </FormHelp>
                                        </div>
                                    </FormInline>
                                    <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel className="xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">Opening Time</div>
                                                    
                                                </div>
                                            </div>
                                        </FormLabel>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                            <FormInput
                                                {...register("vOpeningTime")}
                                                id="vOpeningTime"
                                                type="time"
                                                
                                            />
                                            </div>
                                            <div>
                                            
                                            </div>
                                        </div>
                                    </FormInline>
                                    <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel className="xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">Closing Time</div>
                                                    
                                                </div>
                                            </div>
                                        </FormLabel>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                            <FormInput
                                                {...register("vClosingTime")}
                                                id="vClosingTime"
                                                type="time"
                                            />
                                            </div>
                                            <div>
                                            
                                            </div>
                                        </div>
                                    </FormInline>
                                    <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel className="xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">Closing Day</div>
                                                    
                                                </div>
                                            </div>
                                        </FormLabel>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                            <FormSelect
                                                {...register("vCloseDay")}
                                                onChange={(e) => setvCloseDay(e.target.value)}
                                                id="vCloseDay"
                                            >
                                                <option value="">Select Day</option>
                                                <option value="Mon">Mon</option>
                                                <option value="Tue">Tue</option>
                                                <option value="Wed">Wed</option>
                                                <option value="Thu">Thu</option>
                                                <option value="Fry">Fry</option>
                                                <option value="Sat">Sat</option>
                                                <option value="Sun">Sun</option>
                                            </FormSelect>
                                            </div>
                                            <div>
                                            
                                            </div>
                                        </div>
                                    </FormInline>
                                   
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
                                    <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel className="xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">VISIT FROM</div>
                                                    <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                        Required
                                                    </div>
                                                </div>
                                            </div>
                                        </FormLabel>
                                        <div className="flex-1 w-full mt-3 xl:mt-0">
                                            <FormSelect
                                                {...register("visitFrom")}
                                                onChange={(e) => setvisitFrom(e.target.value)}
                                                id="visitFrom"
                                                placeholder=""
                                            >
                                                <option value="">Select Visit From</option>
                                                <option value="Web">Web</option>
                                                <option value="FB">Facebook</option>
                                                <option value="YT">YouTube</option>
                                                <option value="Others">Others</option>
                                            </FormSelect>
                                        </div>
                                    </FormInline>
                                    <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                        <FormLabel className="xl:w-64 xl:!mr-10">
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <div className="font-medium">REGISTER AGENT</div>
                                                    {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div> */}
                                                </div>
                                            </div>
                                        </FormLabel>
                                        <div className="flex-1 w-full mt-3 xl:mt-0">
                                            <FormInput
                                                {...register("registerAgent")}
                                                id="registerAgent"
                                                type="text"
                                                placeholder="Register Agent"
                                            />
                                            <FormHelp className="text-right">
                                                Maximum character 0/15
                                            </FormHelp>
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
                            <Link to="/client-bb">
                                <Button
                                    type="button"
                                    className="w-full py-3 border-slate-300 dark:border-darkmode-400 text-slate-500 md:w-52"
                                >
                                    Cancel
                                </Button>
                            </Link>
                            {/* <Button
                type="button"
                className="w-full py-3 border-slate-300 dark:border-darkmode-400 text-slate-500 md:w-52"
              >
                Save & Add New Product
              </Button> */}
                        </div>
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

export default addClientBB;
