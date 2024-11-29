// @ts-nocheck
import {
  PreviewComponent,
  Preview,
} from "../../base-components/PreviewComponent";
import {
  FormLabel,
  FormInput,
  FormSelect,
} from "../../base-components/Form";
import {useEffect, useState, useRef } from "react";
import Button from "../../base-components/Button";
import Notification from "../../base-components/Notification";
import Lucide from "../../base-components/Lucide";
import { useForm } from "react-hook-form";
import Toastify from "toastify-js";
import clsx from "clsx";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { getVendorCruise, updateVendorCruise } from "./vendorCruiseSlice";
import { fetchAllVendor } from "../Vendor/vendorSlice";
import TomSelect from "../../base-components/TomSelect";
import { fetchAllCity } from "../City/CitySlice";
import _ from "lodash";

const editCruise = ()=>{
  const params = useParams();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.vendorCruise); 
  const vendor = useAppSelector((state)=> state.vendor);
  const city = useAppSelector((state)=> state.city);

  const [selectVendor, setVendor] = useState(0);
  const [selectcityId, setcityId] = useState("");
  const [cruiseNo, setcruiseNo] = useState("");
  const [departure, setdeparture] = useState("");
  const [destination, setdestination] = useState("");
  const [departureTimeH, setdepartureTimeH] = useState("00");
  const [departureTimeM, setdepartureTimeM] = useState("00");
  const [arrivalTimeH, setarrivalTimeH] = useState("00");
  const [arrivalTimeM, setarrivalTimeM] = useState("00");
  const [isActive, setisActive] = useState("Y");
  
  useEffect(()=>{
    dispatch(fetchAllVendor());
    dispatch(fetchAllCity());
  },[]);

  useEffect(()=>{
    dispatch(getVendorCruise(params.id));
  },[])

  
  
  const schema = yup
    .object({
      cruiseNo: yup.string().required().min(2),
      departure: yup.string().required().min(2),
      destination: yup.string().required().min(2),
    })
    .required();

    

  const {
    register,
    trigger,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

   useEffect(() => {
    const departureTimeShow = _.split(data.departureTime,":");
    const arrivalTimeShow = _.split(data.arrivalTime,":");
    reset(data);
    setVendor(data.createdBy);
    setcityId(data.cityId);
    setcruiseNo(data.cruiseNo);
    setdeparture(data.departure);
    setdestination(data.destination);
    setdepartureTimeH(departureTimeShow[0]);
    setdepartureTimeM(departureTimeShow[1]);
    setarrivalTimeH(arrivalTimeShow[0]);
    setarrivalTimeM(arrivalTimeShow[1]);
    setisActive(data.isActive);


  }, [data]);
  
  // useEffect(()=>{
  //   setdptHour(dptData[0]);
  //   setdptMin(dptData[1]);
  //   setarrHour(arrData[0]);
  //   setarrMin(arrData[1]);
  // },[]);
  

  //console.log("City: ",city['data']);

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
        createdBy: selectVendor,
        cruiseNo: cruiseNo,
        departure: departure,
        destination: destination,
        cityId: selectcityId,
        departureTime: `${departureTimeH}:${departureTimeM}`,
        arrivalTime: `${arrivalTimeH}:${arrivalTimeM}`,
        isActive: isActive,
        userType: 'V',
        id: params.id
       } ;
       
       dispatch(updateVendorCruise(formData));
       
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
  };

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Manage Cruise (Vendor)</h2>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 intro-y lg:col-span-6">
          {/* BEGIN: Form Validation */}
          <PreviewComponent className="intro-y box">
            
              <>
                <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium">
                    Edit Cruise
                  </h2>
                  <div className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
                    <Link to="/vendor-cruise">
                        <Button variant="secondary" type="button" className="ml-3 mr-0">
                        <Lucide icon="ChevronsLeft" className="w-4 h-4 mr-2" /> Back
                        </Button>
                    </Link>
                  </div>
                </div>
                <div className="p-5">
                <Preview>
                    {/* BEGIN: Validation Form */}
                    <form className="validate-form" onSubmit={onSubmit}>
                      <div className="input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Cruise Name
                          <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, at least 2 characters
                          </span>
                        </FormLabel>
                        <FormInput
                          {...register("cruiseNo")}
                          id="validation-form-1"
                          type="text"
                          name="cruiseNo"
                          onChange={(e)=>{setcruiseNo(e.target.value)}}
                          className={clsx({
                            "border-danger": errors.cruiseNo,
                          })}
                          placeholder="Cruise Name"
                        />
                        {errors.cruiseNo && (
                          <div className="mt-2 text-danger">
                            {typeof errors.cruiseNo.message === "string" &&
                              errors.cruiseNo.message}
                          </div>
                        )}
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Cruise City
                         
                        </FormLabel>
                        <FormSelect
                          {...register("cityId")}
                          id="validation-form-1"
                          name="cityId"
                          value={selectcityId}
                          onChange={setcityId}
                          options={{
                            placeholder: "Select City",
                          }}
                          className="w-full"
                        >
                          <option>Select City</option>
                          { _.take(city.data, city.data.length).map((item, Key)=>(
                            <option value={item.id}>{item.cityName}</option>
                          )
                            
                          )}
                        </FormSelect>
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Departure From
                          <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, at least 2 characters
                          </span>
                        </FormLabel>
                        <FormInput
                          {...register("departure")}
                          id="validation-form-1"
                          type="text"
                          name="departure"
                          onChange={(e)=>{setdeparture(e.target.value)}}
                          className={clsx({
                            "border-danger": errors.departure,
                          })}
                          placeholder="Cruise Name"
                        />
                        {errors.departure && (
                          <div className="mt-2 text-danger">
                            {typeof errors.departure.message === "string" &&
                              errors.departure.message}
                          </div>
                        )}
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Destination
                          <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, at least 2 characters
                          </span>
                        </FormLabel>
                        <FormInput
                          {...register("destination")}
                          id="validation-form-1"
                          type="text"
                          name="destination"
                          onChange={(e)=>{setdestination(e.target.value)}}
                          className={clsx({
                            "border-danger": errors.destination,
                          })}
                          placeholder="Destination"
                        />
                        {errors.destination && (
                          <div className="mt-2 text-danger">
                            {typeof errors.destination.message === "string" &&
                              errors.destination.message}
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >Departure Time
                        </FormLabel>
                        <div className="grid-cols-4 gap-2 sm:grid">
                      <FormSelect
                        {...register('departureTimeH')}
                        id="departureTimeH"
                        value={departureTimeH}
                        onChange={(e)=>{setdepartureTimeH(e.target.value)}} 
                      >
                      <option value="00"> Hours </option>
                          {[...Array(24)].map((x, i) =>
                                <option value={i+1}>{i+1}</option>
                              )}
                      </FormSelect>
                      <FormSelect
                        {...register('departureTimeM')}
                        id="departureTimeM"
                        value={departureTimeM}
                        onChange={(e)=>{setdepartureTimeM(e.target.value)}} 
                      >
                      <option value="00"> Minutes </option>
                          {[...Array(60)].map((x, i) =>
                                <option value={i+1}>{i+1}</option>
                              )}
                      </FormSelect>
                    </div>
                      </div>
                    <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >Arrival Time
                        </FormLabel>
                        <div className="grid-cols-4 gap-2 sm:grid">
                      <FormSelect
                        {...register('arrivalTimeH')}
                        id="arrivalTimeH"
                        value={arrivalTimeH}
                        onChange={(e)=>{setarrivalTimeH(e.target.value)}} 
                      >
                      <option value="00"> Hours </option>
                          {[...Array(24)].map((x, i) =>
                                <option value={i+1}>{i+1}</option>
                              )}
                      </FormSelect>
                      <FormSelect
                        {...register('arrivalTimeM')}
                        id="arrivalTimeM"
                        value={arrivalTimeM}
                        onChange={(e)=>{setarrivalTimeM(e.target.value)}} 
                      >
                      <option value="00"> Minutes </option>
                          {[...Array(60)].map((x, i) =>
                                <option value={i+1}>{i+1}</option>
                              )}
                      </FormSelect>
                    </div>
                  </div>
                  <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Status
                        </FormLabel>
                        <FormSelect 
                          {...register("isActive")}
                          name="isActive"
                          value={isActive}
                          onChange={(e)=>{setisActive(e.target.value)}}
                          className="mt-2 sm:mr-2" 
                          aria-label="Default select example">
                                <option value="Y">Active</option>
                                <option value="N">Inactive</option>
                        </FormSelect>
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Vendor
                        </FormLabel>
                        <TomSelect
                          {...register("createdBy")}
                          id="validation-form-1"
                          name="createdBy"
                          value={selectVendor}
                          onChange={setVendor}
                          options={{
                            placeholder: "Select Vendor",
                          }}
                          className="w-full"
                        >
                          <option>Select Vendor</option>
                          { _.take(vendor.data, vendor.data.length).map((item, Key)=>(
                            <option value={item.id}>{item.vName}</option>
                          )
                            
                          )}
                        </TomSelect>
                        {errors.departureCityId && (
                          <div className="mt-2 text-danger">
                            {typeof errors.departureCityId.message === "string" &&
                              errors.departureCityId.message}
                          </div>
                        )}
                    </div>
                      <Button variant="primary" type="submit" className="mt-5 w-24 mr-1">
                        Save
                      </Button>
                      <Link to="/vendor-cruise">
                        <Button variant="secondary" type="button" className="mt-5 w-24 mr-1">
                          Cancel
                        </Button>
                      </Link>
                    </form>
                    {/* END: Validation Form */}
                  </Preview>
                </div>
              </>
          
          </PreviewComponent>
          {/* END: Form Validation */}
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
        </div>
      </div>
    </>
  );
}

export default editCruise;

