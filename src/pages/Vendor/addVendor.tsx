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

const addVendor = () => {
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
                vMICR: getValues('vMICR'),
                vIFSC: getValues('vIFSC'),
                vACNO: getValues('vACNO'),
                vBranch: getValues('vBranch'),
                vBankName: getValues('vBankName'),
                vAccountName: getValues('vAccountName'),
                gMapLocation: getValues('gMapLocation'),
                vWebsite: getValues('vWebsite'),
                visitFrom: visitFrom,
                isActive: isActive,
                registerAgent: getValues('registerAgent'),
                vType: vendorType
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
                <h2 className="mr-auto text-lg font-medium">Add Vendor</h2>
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
                                                    <div className="font-medium">COMPANY / FIRM / HOTEL / OWNER NAME</div>
                                                    <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                        Required
                                                    </div>
                                                </div>
                                                <div className="mt-3 text-xs leading-relaxed text-slate-500">
                                                    Add vendor Company Name or Firm Name or Hotel Name or can add Owner Name also.
                                                </div>
                                            </div>
                                        </FormLabel>
                                        <div className="flex-1 w-full mt-3 xl:mt-0">
                                            <FormInput
                                                {...register("vName")}
                                                id="vName"
                                                type="text"
                                                placeholder="COMPANY / FIRM / HOTEL / OWNER NAME"
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
                                                    <div className="font-medium">CONTACT PERSON</div>
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
                                                    {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div> */}
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
                                                    <div className="font-medium">VENDOR TYPE/ SUPPLIER</div>
                                                    <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                        Required
                                                    </div>
                                                </div>
                                            </div>
                                        </FormLabel>
                                        <div className="flex-1 w-full mt-3 xl:mt-0">
                                            <FormSelect
                                                {...register("vType")}
                                                onChange={(e) => setvendorType(e.target.value)}
                                                id="vType"
                                                placeholder=""
                                            >
                                                <option value="">Select Vendor Type/ Supplier</option>
                                                <option value="hotel">Hotel</option>
                                                <option value="transport">Transport</option>
                                                <option value="travel-agent">Travle Agent</option>
                                                <option value="train">Train</option>
                                                <option value="activity">Activity</option>
                                                <option value="flight">Flight</option>
                                                <option value="cruise">Cruise</option>
                                                <option value="tourisim-marketing">Tourisim Marketing</option>
                                                <option value="driver">Driver</option>
                                                <option value="tour-guide">Tour Guide</option>
                                                <option value="bus">Bus Supplier</option>
                                                <option value="restaurant-cafe">Restaurant/Cafe</option>
                                                <option value="tour-operator">Tour Operator</option>
                                                <option value="valley-camping">Valley Camping</option>
                                                <option value="massage-beauty-therapy">Massage & Beauty Therapy</option>
                                                <option value="tarot-reader">Tarot Reader</option>
                                                <option value="travel-agency">Travel Agency</option>
                                                <option value="safari">Safari</option>
                                            </FormSelect>
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
                        {/* BEGIN: Documnet Upload */}
                        {/* <div className="p-5 mt-5 intro-y box">
              <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
                <div className="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                  <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Product
                  Variant (Details)
                </div>
                <div className="mt-5">
                  <FormInline className="flex-col items-start pt-2 mt-2 xl:flex-row first:mt-0 first:pt-0">
                    <FormLabel className="xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Variant 1</div>
                        </div>
                        <div className="mt-3 text-xs leading-relaxed text-slate-500">
                          Add the types of variants and options, you can add up to
                          5 options.
                        </div>
                      </div>
                    </FormLabel>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                      <div className="relative py-10 pl-5 pr-5 rounded-md xl:pr-10 bg-slate-50 dark:bg-transparent dark:border">
                        <a
                          href=""
                          className="absolute top-0 right-0 mt-4 mr-4 text-slate-500"
                        >
                          <Lucide icon="X" className="w-5 h-5" />
                        </a>
                        <div>
                          <FormInline className="mt-5 first:mt-0">
                            <FormLabel className="sm:w-20">Name</FormLabel>
                            <div className="flex items-center flex-1 xl:pr-20">
                              <InputGroup className="flex-1">
                                <FormInput type="text" placeholder="Size" />
                                <InputGroup.Text>6/14</InputGroup.Text>
                              </InputGroup>
                            </div>
                          </FormInline>
                          <FormInline className="items-start mt-5 first:mt-0">
                            <FormLabel className="mt-2 sm:w-20">
                              Options
                            </FormLabel>
                            <div className="flex-1">
                              <div className="items-center mt-5 xl:flex first:mt-0">
                                <InputGroup className="flex-1">
                                  <FormInput type="text" placeholder="Small" />
                                  <InputGroup.Text>6/14</InputGroup.Text>
                                </InputGroup>
                                <div className="flex w-20 mt-3 text-slate-500 xl:mt-0">
                                  <a href="" className="xl:ml-5">
                                    <Lucide icon="Move" className="w-4 h-4" />
                                  </a>
                                  <a href="" className="ml-3 xl:ml-5">
                                    <Lucide icon="Trash2" className="w-4 h-4" />
                                  </a>
                                </div>
                              </div>
                              <div className="items-center mt-5 xl:flex first:mt-0">
                                <InputGroup className="flex-1">
                                  <FormInput type="text" placeholder="Medium" />
                                  <InputGroup.Text>6/14</InputGroup.Text>
                                </InputGroup>
                                <div className="flex w-20 mt-3 text-slate-500 xl:mt-0">
                                  <a href="" className="xl:ml-5">
                                    <Lucide icon="Move" className="w-4 h-4" />
                                  </a>
                                  <a href="" className="ml-3 xl:ml-5">
                                    <Lucide icon="Trash2" className="w-4 h-4" />
                                  </a>
                                </div>
                              </div>
                              <div className="items-center mt-5 xl:flex first:mt-0">
                                <InputGroup className="flex-1">
                                  <FormInput type="text" placeholder="Large" />
                                  <InputGroup.Text>6/14</InputGroup.Text>
                                </InputGroup>
                                <div className="flex w-20 mt-3 text-slate-500 xl:mt-0">
                                  <a href="" className="xl:ml-5">
                                    <Lucide icon="Move" className="w-4 h-4" />
                                  </a>
                                  <a href="" className="ml-3 xl:ml-5">
                                    <Lucide icon="Trash2" className="w-4 h-4" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </FormInline>
                          <div className="mt-5 xl:ml-20 xl:pl-5 xl:pr-20 first:mt-0">
                            <Button
                              variant="outline-primary"
                              className="w-full border-dashed"
                            >
                              <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Add
                              New Option
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FormInline>
                  <FormInline className="flex-col items-start pt-2 mt-2 xl:flex-row first:mt-0 first:pt-0">
                    <FormLabel className="xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Variant 2</div>
                        </div>
                        <div className="mt-3 text-xs leading-relaxed text-slate-500">
                          Add the types of variants and options, you can add up to
                          5 options.
                        </div>
                      </div>
                    </FormLabel>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                      <div className="relative py-10 pl-5 pr-5 rounded-md xl:pr-10 bg-slate-50 dark:bg-transparent dark:border">
                        <a
                          href=""
                          className="absolute top-0 right-0 mt-4 mr-4 text-slate-500"
                        >
                          <Lucide icon="X" className="w-5 h-5" />
                        </a>
                        <div>
                          <FormInline className="mt-5 first:mt-0">
                            <FormLabel className="sm:w-20">Name</FormLabel>
                            <div className="flex items-center flex-1 xl:pr-20">
                              <InputGroup className="flex-1">
                                <FormInput type="text" placeholder="Color" />
                                <InputGroup.Text>6/14</InputGroup.Text>
                              </InputGroup>
                            </div>
                          </FormInline>
                          <FormInline className="items-start mt-5 first:mt-0">
                            <FormLabel className="mt-2 sm:w-20">
                              Options
                            </FormLabel>
                            <div className="flex-1">
                              <div className="items-center mt-5 xl:flex first:mt-0">
                                <InputGroup className="flex-1">
                                  <FormInput type="text" placeholder="Black" />
                                  <InputGroup.Text>6/14</InputGroup.Text>
                                </InputGroup>
                                <div className="flex w-20 mt-3 text-slate-500 xl:mt-0">
                                  <a href="" className="xl:ml-5">
                                    <Lucide icon="Move" className="w-4 h-4" />
                                  </a>
                                  <a href="" className="ml-3 xl:ml-5">
                                    <Lucide icon="Trash2" className="w-4 h-4" />
                                  </a>
                                </div>
                              </div>
                              <div className="items-center mt-5 xl:flex first:mt-0">
                                <InputGroup className="flex-1">
                                  <FormInput type="text" placeholder="White" />
                                  <InputGroup.Text>6/14</InputGroup.Text>
                                </InputGroup>
                                <div className="flex w-20 mt-3 text-slate-500 xl:mt-0">
                                  <a href="" className="xl:ml-5">
                                    <Lucide icon="Move" className="w-4 h-4" />
                                  </a>
                                  <a href="" className="ml-3 xl:ml-5">
                                    <Lucide icon="Trash2" className="w-4 h-4" />
                                  </a>
                                </div>
                              </div>
                              <div className="items-center mt-5 xl:flex first:mt-0">
                                <InputGroup className="flex-1">
                                  <FormInput type="text" placeholder="Gray" />
                                  <InputGroup.Text>6/14</InputGroup.Text>
                                </InputGroup>
                                <div className="flex w-20 mt-3 text-slate-500 xl:mt-0">
                                  <a href="" className="xl:ml-5">
                                    <Lucide icon="Move" className="w-4 h-4" />
                                  </a>
                                  <a href="" className="ml-3 xl:ml-5">
                                    <Lucide icon="Trash2" className="w-4 h-4" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </FormInline>
                          <div className="mt-5 xl:ml-20 xl:pl-5 xl:pr-20 first:mt-0">
                            <Button
                              variant="outline-primary"
                              className="w-full border-dashed"
                            >
                              <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Add
                              New Option
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FormInline>
                  <div className="pt-2 mt-2 xl:ml-64 xl:pl-10 first:mt-0 first:pt-0">
                    <Button
                      variant="outline-secondary"
                      className="w-full py-3 border-dashed"
                    >
                      <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Add New
                      Variant
                    </Button>
                  </div>
                  <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                    <FormLabel className="xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Variant Information</div>
                        </div>
                        <div className="mt-3 text-xs leading-relaxed text-slate-500">
                          Apply price and stock on all variants or based on
                          certain variant codes.
                        </div>
                      </div>
                    </FormLabel>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                      <div className="grid-cols-4 gap-2 sm:grid">
                        <InputGroup>
                          <InputGroup.Text>$</InputGroup.Text>
                          <FormInput type="text" placeholder="Price" />
                        </InputGroup>
                        <FormInput
                          type="text"
                          className="mt-2 sm:mt-0"
                          placeholder="Stock"
                        />
                        <FormInput
                          type="text"
                          className="mt-2 sm:mt-0"
                          placeholder="Variant Code"
                        />
                        <Button variant="primary" className="mt-2 sm:mt-0">
                          Apply To All
                        </Button>
                      </div>
                    </div>
                  </FormInline>
                  <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                    <FormLabel className="xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Variant List</div>
                        </div>
                        <div className="mt-3 text-xs leading-relaxed text-slate-500">
                          Set the price and stock for each variant.
                        </div>
                      </div>
                    </FormLabel>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                      <div className="overflow-x-auto">
                        <Table className="border">
                          <Table.Thead>
                            <Table.Tr>
                              <Table.Th className="bg-slate-50 dark:bg-darkmode-800 text-slate-500 whitespace-nowrap">
                                Size
                              </Table.Th>
                              <Table.Th className="bg-slate-50 dark:bg-darkmode-800 text-slate-500 whitespace-nowrap">
                                <div className="flex items-center">
                                  Color{" "}
                                  <Lucide
                                    icon="HelpCircle"
                                    className="w-4 h-4 ml-2"
                                  />
                                </div>
                              </Table.Th>
                              <Table.Th className="bg-slate-50 dark:bg-darkmode-800 text-slate-500 whitespace-nowrap !px-2">
                                Price
                              </Table.Th>
                              <Table.Th className="bg-slate-50 dark:bg-darkmode-800 text-slate-500 whitespace-nowrap !px-2">
                                <div className="flex items-center">
                                  <div className="relative w-4 h-4 mr-2 -mt-0.5 before:content-[''] before:absolute before:w-4 before:h-4 before:bg-primary/20 before:rounded-full lg:before:animate-ping after:content-[''] after:absolute after:w-4 after:h-4 after:bg-primary after:rounded-full after:border-4 after:border-white/60 after:dark:border-darkmode-300"></div>
                                  Stock{" "}
                                  <Lucide
                                    icon="HelpCircle"
                                    className="w-4 h-4 ml-2"
                                  />
                                </div>
                              </Table.Th>
                              <Table.Th className="bg-slate-50 dark:bg-darkmode-800 text-slate-500 whitespace-nowrap !pl-2">
                                Variant Code
                              </Table.Th>
                            </Table.Tr>
                          </Table.Thead>
                          <Table.Tbody>
                            <Table.Tr>
                              <Table.Td rowSpan={3} className="border-r">
                                Small
                              </Table.Td>
                              <Table.Td>Black</Table.Td>
                              <Table.Td className="!px-2">
                                <InputGroup>
                                  <InputGroup.Text>$</InputGroup.Text>
                                  <FormInput
                                    type="text"
                                    className="min-w-[6rem]"
                                    placeholder="Price"
                                  />
                                </InputGroup>
                              </Table.Td>
                              <Table.Td className="!px-2">
                                <FormInput
                                  type="text"
                                  className="min-w-[6rem]"
                                  placeholder="Stock"
                                />
                              </Table.Td>
                              <Table.Td className="!pl-2">
                                <FormInput
                                  type="text"
                                  className="min-w-[6rem]"
                                  placeholder="Variant Code"
                                />
                              </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                              <Table.Td>White</Table.Td>
                              <Table.Td className="!px-2">
                                <InputGroup>
                                  <InputGroup.Text>$</InputGroup.Text>
                                  <FormInput
                                    type="text"
                                    className="min-w-[6rem]"
                                    placeholder="Price"
                                  />
                                </InputGroup>
                              </Table.Td>
                              <Table.Td className="!px-2">
                                <FormInput
                                  type="text"
                                  className="min-w-[6rem]"
                                  placeholder="Stock"
                                />
                              </Table.Td>
                              <Table.Td className="!pl-2">
                                <FormInput
                                  type="text"
                                  className="min-w-[6rem]"
                                  placeholder="Variant Code"
                                />
                              </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                              <Table.Td>Gray</Table.Td>
                              <Table.Td className="!px-2">
                                <InputGroup>
                                  <InputGroup.Text>$</InputGroup.Text>
                                  <FormInput
                                    type="text"
                                    className="min-w-[6rem]"
                                    placeholder="Price"
                                  />
                                </InputGroup>
                              </Table.Td>
                              <Table.Td className="!px-2">
                                <FormInput
                                  type="text"
                                  className="min-w-[6rem]"
                                  placeholder="Stock"
                                />
                              </Table.Td>
                              <Table.Td className="!pl-2">
                                <FormInput
                                  type="text"
                                  className="min-w-[6rem]"
                                  placeholder="Variant Code"
                                />
                              </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                              <Table.Td rowSpan={3} className="border-r">
                                Medium
                              </Table.Td>
                              <Table.Td>Black</Table.Td>
                              <Table.Td className="!px-2">
                                <InputGroup>
                                  <InputGroup.Text>$</InputGroup.Text>
                                  <FormInput
                                    type="text"
                                    className="min-w-[6rem]"
                                    placeholder="Price"
                                  />
                                </InputGroup>
                              </Table.Td>
                              <Table.Td className="!px-2">
                                <FormInput
                                  type="text"
                                  className="min-w-[6rem]"
                                  placeholder="Stock"
                                />
                              </Table.Td>
                              <Table.Td className="!pl-2">
                                <FormInput
                                  type="text"
                                  className="min-w-[6rem]"
                                  placeholder="Variant Code"
                                />
                              </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                              <Table.Td>White</Table.Td>
                              <Table.Td className="!px-2">
                                <InputGroup>
                                  <InputGroup.Text>$</InputGroup.Text>
                                  <FormInput
                                    type="text"
                                    className="min-w-[6rem]"
                                    placeholder="Price"
                                  />
                                </InputGroup>
                              </Table.Td>
                              <Table.Td className="!px-2">
                                <FormInput
                                  type="text"
                                  className="min-w-[6rem]"
                                  placeholder="Stock"
                                />
                              </Table.Td>
                              <Table.Td className="!pl-2">
                                <FormInput
                                  type="text"
                                  className="min-w-[6rem]"
                                  placeholder="Variant Code"
                                />
                              </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                              <Table.Td>Gray</Table.Td>
                              <Table.Td className="!px-2">
                                <InputGroup>
                                  <InputGroup.Text>$</InputGroup.Text>
                                  <FormInput
                                    type="text"
                                    className="min-w-[6rem]"
                                    placeholder="Price"
                                  />
                                </InputGroup>
                              </Table.Td>
                              <Table.Td className="!px-2">
                                <FormInput
                                  type="text"
                                  className="min-w-[6rem]"
                                  placeholder="Stock"
                                />
                              </Table.Td>
                              <Table.Td className="!pl-2">
                                <FormInput
                                  type="text"
                                  className="min-w-[6rem]"
                                  placeholder="Variant Code"
                                />
                              </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                              <Table.Td rowSpan={3} className="border-r">
                                Large
                              </Table.Td>
                              <Table.Td>Black</Table.Td>
                              <Table.Td className="!px-2">
                                <InputGroup>
                                  <InputGroup.Text>$</InputGroup.Text>
                                  <FormInput
                                    type="text"
                                    className="min-w-[6rem]"
                                    placeholder="Price"
                                  />
                                </InputGroup>
                              </Table.Td>
                              <Table.Td className="!px-2">
                                <FormInput
                                  type="text"
                                  className="min-w-[6rem]"
                                  placeholder="Stock"
                                />
                              </Table.Td>
                              <Table.Td className="!pl-2">
                                <FormInput
                                  type="text"
                                  className="min-w-[6rem]"
                                  placeholder="Variant Code"
                                />
                              </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                              <Table.Td>White</Table.Td>
                              <Table.Td className="!px-2">
                                <InputGroup>
                                  <InputGroup.Text>$</InputGroup.Text>
                                  <FormInput
                                    type="text"
                                    className="min-w-[6rem]"
                                    placeholder="Price"
                                  />
                                </InputGroup>
                              </Table.Td>
                              <Table.Td className="!px-2">
                                <FormInput
                                  type="text"
                                  className="min-w-[6rem]"
                                  placeholder="Stock"
                                />
                              </Table.Td>
                              <Table.Td className="!pl-2">
                                <FormInput
                                  type="text"
                                  className="min-w-[6rem]"
                                  placeholder="Variant Code"
                                />
                              </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                              <Table.Td>Gray</Table.Td>
                              <Table.Td className="!px-2">
                                <InputGroup>
                                  <InputGroup.Text>$</InputGroup.Text>
                                  <FormInput
                                    type="text"
                                    className="min-w-[6rem]"
                                    placeholder="Price"
                                  />
                                </InputGroup>
                              </Table.Td>
                              <Table.Td className="!px-2">
                                <FormInput
                                  type="text"
                                  className="min-w-[6rem]"
                                  placeholder="Stock"
                                />
                              </Table.Td>
                              <Table.Td className="!pl-2">
                                <FormInput
                                  type="text"
                                  className="min-w-[6rem]"
                                  placeholder="Variant Code"
                                />
                              </Table.Td>
                            </Table.Tr>
                          </Table.Tbody>
                        </Table>
                      </div>
                    </div>
                  </FormInline>
                  <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                    <FormInline className="xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Wholesale</div>
                        </div>
                        <div className="mt-3 text-xs leading-relaxed text-slate-500">
                          Add wholesale price for certain quantity purchases.
                        </div>
                      </div>
                    </FormInline>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                      <div className="overflow-x-auto">
                        <Table className="border">
                          <Table.Thead>
                            <Table.Tr>
                              <Table.Th className="!pr-2 bg-slate-50 dark:bg-darkmode-800"></Table.Th>
                              <Table.Th className="bg-slate-50 dark:bg-darkmode-800"></Table.Th>
                              <Table.Th className="!px-2 bg-slate-50 dark:bg-darkmode-800 text-slate-500 whitespace-nowrap">
                                Min.
                              </Table.Th>
                              <Table.Th className="!px-2 bg-slate-50 dark:bg-darkmode-800 text-slate-500 whitespace-nowrap">
                                Max.
                              </Table.Th>
                              <Table.Th className="!px-2 bg-slate-50 dark:bg-darkmode-800 text-slate-500 whitespace-nowrap">
                                Unit Price
                              </Table.Th>
                              <Table.Th className="!px-2 bg-slate-50 dark:bg-darkmode-800"></Table.Th>
                            </Table.Tr>
                          </Table.Thead>
                          <Table.Tbody>
                            <Table.Tr>
                              <Table.Td className="!pr-2">1.</Table.Td>
                              <Table.Td className="whitespace-nowrap">
                                Wholesale Price 1
                              </Table.Td>
                              <Table.Td className="!px-2">
                                <FormInput
                                  type="text"
                                  className="min-w-[6rem]"
                                  placeholder="Min Qty"
                                />
                              </Table.Td>
                              <Table.Td className="!px-2">
                                <FormInput
                                  type="text"
                                  className="min-w-[6rem]"
                                  placeholder="Max Qty"
                                />
                              </Table.Td>
                              <Table.Td className="!px-2">
                                <InputGroup>
                                  <InputGroup.Text>$</InputGroup.Text>
                                  <FormInput
                                    type="text"
                                    className="min-w-[6rem]"
                                    placeholder="Price"
                                  />
                                </InputGroup>
                              </Table.Td>
                              <Table.Td className="!pl-4 text-slate-500">
                                <a href="">
                                  <Lucide icon="Trash2" className="w-4 h-4" />
                                </a>
                              </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                              <Table.Td className="!pr-2">2.</Table.Td>
                              <Table.Td className="whitespace-nowrap">
                                Wholesale Price 2
                              </Table.Td>
                              <Table.Td className="!px-2">
                                <FormInput
                                  type="text"
                                  className="min-w-[6rem]"
                                  placeholder="Min Qty"
                                />
                              </Table.Td>
                              <Table.Td className="!px-2">
                                <FormInput
                                  type="text"
                                  className="min-w-[6rem]"
                                  placeholder="Max Qty"
                                />
                              </Table.Td>
                              <Table.Td className="!px-2">
                                <InputGroup>
                                  <InputGroup.Text>$</InputGroup.Text>
                                  <FormInput
                                    type="text"
                                    className="min-w-[6rem]"
                                    placeholder="Price"
                                  />
                                </InputGroup>
                              </Table.Td>
                              <Table.Td className="!pl-4 text-slate-500">
                                <a href="">
                                  <Lucide icon="Trash2" className="w-4 h-4" />
                                </a>
                              </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                              <Table.Td className="!pr-2">3.</Table.Td>
                              <Table.Td className="whitespace-nowrap">
                                Wholesale Price 3
                              </Table.Td>
                              <Table.Td className="!px-2">
                                <FormInput
                                  type="text"
                                  className="min-w-[6rem]"
                                  placeholder="Min Qty"
                                />
                              </Table.Td>
                              <Table.Td className="!px-2">
                                <FormInput
                                  type="text"
                                  className="min-w-[6rem]"
                                  placeholder="Max Qty"
                                />
                              </Table.Td>
                              <Table.Td className="!px-2">
                                <InputGroup>
                                  <InputGroup.Text>$</InputGroup.Text>
                                  <FormInput
                                    type="text"
                                    className="min-w-[6rem]"
                                    placeholder="Price"
                                  />
                                </InputGroup>
                              </Table.Td>
                              <Table.Td className="!pl-4 text-slate-500">
                                <a href="">
                                  <Lucide icon="Trash2" className="w-4 h-4" />
                                </a>
                              </Table.Td>
                            </Table.Tr>
                          </Table.Tbody>
                        </Table>
                      </div>
                      <Button
                        variant="outline-primary"
                        className="w-full mt-4 border-dashed"
                      >
                        <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Add New
                        Wholesale Price
                      </Button>
                    </div>
                  </FormInline>
                </div>
              </div>
            </div> */}
                        {/* END:  Documnet Upload */}
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

export default addVendor;
