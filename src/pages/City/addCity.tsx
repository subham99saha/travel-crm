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
import _ from "lodash";
import Button from "../../base-components/Button";
import Notification from "../../base-components/Notification";
import Lucide from "../../base-components/Lucide";
import { useForm } from "react-hook-form";
import Toastify from "toastify-js";
import clsx from "clsx";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { createCity } from "./CitySlice";
import { fetchAllState } from "../State/StateSlice";

const addCity = ()=>{
  const dispatch = useAppDispatch();
  const state  = useAppSelector((state) => state.state); 
  

  useEffect(()=>{
    dispatch(fetchAllState());
  },[])

  console.log(state);
  const [stateId, setStateId] = useState(24);
  const [isActive, setIsActive] = useState("Y");
  const schema = yup
    .object({
      //stateId: yup.string().required(),
      cityName: yup.string().required().min(2),
    })
    .required();

  const {
    register,
    getValues,
    trigger,
    formState: { errors },
    reset,
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
        createdBy: getValues("createdBy"),
        stateId: stateId,
        cityName: getValues("cityName"),
        isActive: isActive
       };
       
       console.log(formData);
       dispatch(createCity(formData));
       reset({
        cityName: "",
        isActive: "Y"
       });
      //  event.target[2].value = "Y";
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
        <h2 className="mr-auto text-lg font-medium">Manage City</h2>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 intro-y lg:col-span-6">
          {/* BEGIN: Form Validation */}
          <PreviewComponent className="intro-y box">
            
              <>
                <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium">
                    Add City
                  </h2>
                </div>
                <div className="p-5">
                  <Preview>
                    {/* BEGIN: Validation Form */}
                    <form className="validate-form" onSubmit={onSubmit}>
                    <div className="mt-3 input-form">
                      <FormInput
                          {...register("createdBy")}
                          id="validation-form-1"
                          type="hidden"
                          name="createdBy"
                          value="1"
                        />
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          State
                          <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, at least 2 characters
                          </span>
                        </FormLabel>
                        <FormSelect 
                              {...register("stateId")}
                              id="stateId"
                              name="stateId"
                              className="mt-2 sm:mr-2"
                              value={stateId}
                              onChange={(e) => setStateId(e.target.value)} 
                              aria-label="Default select example">
                                    {_.take(state.data, state.data.length).map((item, Key) => (
                                  <option value={item.id}>{item.stateName}</option>
                                ))}
                            </FormSelect>
                        {errors.cityName && (
                          <div className="mt-2 text-danger">
                            {typeof errors.cityName.message === "string" &&
                              errors.cityName.message}
                          </div>
                        )}
                      </div>
                      <div className="mt-3 input-form">
                      <FormInput
                          {...register("createdBy")}
                          id="validation-form-1"
                          type="hidden"
                          name="createdBy"
                          value="1"
                        />
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          City
                          <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, at least 2 characters
                          </span>
                        </FormLabel>
                        <FormInput
                          {...register("cityName")}
                          id="validation-form-1"
                          type="text"
                          name="cityName"
                          className={clsx({
                            "border-danger": errors.cityName,
                          })}
                          placeholder="City"
                        />
                        {errors.cityName && (
                          <div className="mt-2 text-danger">
                            {typeof errors.cityName.message === "string" &&
                              errors.cityName.message}
                          </div>
                        )}
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
                          className="mt-2 sm:mr-2" 
                          onChange={e => setIsActive(e.target.value)}
                          aria-label="Default select example">
                                <option value="Y">Active</option>
                                <option value="N">Inactive</option>
                        </FormSelect>
                      </div>
                      <Button variant="primary" type="submit" className="mt-5 w-24 mr-1">
                        Save
                      </Button>
                      <Link to="/city">
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
              <div className="font-medium">Data save successfully!</div>
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
        </div>
      </div>
    </>
  );
}

export default addCity;