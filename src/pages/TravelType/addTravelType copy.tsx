// @ts-nocheck
import {
    PreviewComponent,
    Preview,
    Source,
    Highlight,
  } from "../../base-components/PreviewComponent";
  import {
    FormLabel,
    FormInput,
    FormSelect,
  } from "../../base-components/Form";
  import Button from "../../base-components/Button";
  import Notification from "../../base-components/Notification";
  import Lucide from "../../base-components/Lucide";
  import { useForm } from "react-hook-form";
  import Toastify from "toastify-js";
  import clsx from "clsx";
  import { yupResolver } from "@hookform/resolvers/yup";
  import * as yup from "yup";
  import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames"; 
  
  const addTravelType =  ()=>{
    // const schema = yup
    //   .object({
    //     travelType: yup.string().required().min(2),
    //   })
    //   .required();
  
    // const {
    //   register,
    //   trigger,
    //   formState: { errors },
    // } = useForm({
    //   mode: "onChange",
    //   resolver: yupResolver(schema),
    // });
    // const onSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    //   event.preventDefault();
    //   const result = await trigger();
    //   if (!result) {
    //     const failedEl = document
    //       .querySelectorAll("#failed-notification-content")[0]
    //       .cloneNode(true) as HTMLElement;
    //     failedEl.classList.remove("hidden");
    //     Toastify({
    //       node: failedEl,
    //       duration: 3000,
    //       newWindow: true,
    //       close: true,
    //       gravity: "top",
    //       position: "right",
    //       stopOnFocus: true,
    //     }).showToast();
    //   } else {
    //     const successEl = document
    //       .querySelectorAll("#success-notification-content")[0]
    //       .cloneNode(true) as HTMLElement;
    //     successEl.classList.remove("hidden");
    //     Toastify({
    //       node: successEl,
    //       duration: 3000,
    //       newWindow: true,
    //       close: true,
    //       gravity: "top",
    //       position: "right",
    //       stopOnFocus: true,
    //     }).showToast();
    //   }
    // };

    const { register, handleSubmit, errors, getValues } = useForm();
    const onSubmit = (data) => console.log(data);
  
    return (
      <>
        <div className="flex items-center mt-8 intro-y">
          <h2 className="mr-auto text-lg font-medium">Add Travel Type</h2>
        </div>
        <div className="grid grid-cols-12 gap-6 mt-5">
          <div className="col-span-12 intro-y lg:col-span-6">
            {/* BEGIN: Form Validation */}
            <PreviewComponent className="intro-y box">
              {({ toggle }) => (
                <>
                  {/* <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                    <h2 className="mr-auto text-base font-medium">
                      Implementation
                    </h2>
                    
                  </div> */}
                  <div className="p-5">
                    <Preview>
                      {/* BEGIN: Validation Form */}
                      <form className="validate-form" onSubmit={onSubmit}>
                        <div className="input-form">
                          <FormLabel
                            htmlFor="validation-form-1"
                            className="flex flex-col w-full sm:flex-row"
                          >
                            Travel Type
                            <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                              Required, at least 2 characters
                            </span>
                          </FormLabel>
                          <FormInput
                            id="validation-form-1"
                            type="text"
                            name="travelType"
                            placeholder="Travel Type"
                            ref={register({
                              required: true
                            })}
                          />
                          {/* {errors.name && (
                            <div className="mt-2 text-danger">
                              {typeof errors.name.message === "string" &&
                                errors.name.message}
                            </div>
                          )} */}
                          <div className="input-form">
                          <FormLabel
                            htmlFor="validation-form-1"
                            className="flex flex-col w-full sm:flex-row"
                          >
                            Status
                          </FormLabel>
                          <FormSelect name="isActive" className="mt-2 sm:mr-2" aria-label="Default select example">
                            <option>Active</option>
                            <option>Inactive</option>
                        </FormSelect>
                        </div>
                        </div>
                       
                        <Button variant="primary" type="submit" className="mt-5">
                          Add
                        </Button>
                        <Link to="/travel-type">
                          <Button variant="primary" type="button" className="mt-5">
                            Cancel
                          </Button>
                        </Link>
                      </form>
                      {/* END: Validation Form */}
                    </Preview>
                    
                  </div>
                </>
              )}
            </PreviewComponent>
            {/* END: Form Validation */}
            {/* BEGIN: Success Notification Content */}
            <Notification
              id="success-notification-content"
              className="flex hidden"
            >
              <Lucide icon="CheckCircle" className="text-success" />
              <div className="ml-4 mr-4">
                <div className="font-medium">Registration success!</div>
                <div className="mt-1 text-slate-500">
                  Please check your e-mail for further info!
                </div>
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
                <div className="font-medium">Registration failed!</div>
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
  
  export default addTravelType;
  