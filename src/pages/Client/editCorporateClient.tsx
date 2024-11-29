 //@ts-nocheck
import {
  PreviewComponent,
  Preview,
} from "../../base-components/PreviewComponent";
import {
  FormLabel,
  FormInput,
  FormSelect,
} from "../../base-components/Form";
import {useEffect } from "react";
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
import { getClient, updateClient } from "./clientSlice";

const editClient = ()=>{
  const params = useParams();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.client); 

  useEffect(()=>{
    dispatch(getClient(params.id));
  },[])

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  
  const schema = yup
    .object({
      cCompanyName: yup.string().required("Comapany Name is a required field").min(2),
      cName: yup.string().required("Name is a required field").min(2),
      cEmail: yup.string().required("Email is a required field").min(2),
      cPassword: yup.string().required("Password is a required field").min(2),
      cMobile: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
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
    reset(data);
  }, [data]);

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
        addedBy: event.target[0].value,
        cCompanyName: event.target[1].value,
        cName: event.target[2].value,
        cEmail: event.target[3].value,
        cPassword: event.target[4].value,
        cMobile: event.target[5].value,
        cWhatsapp: event.target[6].value,
        cSkype: event.target[7].value,
        registerAgent: event.target[8].value,
        visitFrom: event.target[9].value,
        isActive: event.target[10].value,
        cType: "Cor",
        id: params.id
       } ;
       
       dispatch(updateClient(formData));
       
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
        <h2 className="mr-auto text-lg font-medium">Manage Corporate Client</h2>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 intro-y lg:col-span-6">
          {/* BEGIN: Form Validation */}
          <PreviewComponent className="intro-y box">
            
              <>
                <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium">
                    Edit Client
                  </h2>
                </div>
                <div className="p-5">
                  <Preview>
                    {/* BEGIN: Validation Form */}
                    <form className="validate-form" onSubmit={onSubmit}>
                    <div className="input-form">
                      <FormInput
                          {...register("addedBy")}
                          id="validation-form-1"
                          type="hidden"
                          name="createdBy"
                          value="1"
                        />
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Company Name
                          <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, at least 2 characters
                          </span>
                        </FormLabel>
                        <FormInput
                          {...register("cCompanyName")}
                          id="validation-form-1"
                          type="text"
                          name="cCompanyName"
                          className={clsx({
                            "border-danger": errors.cCompanyName,
                          })}
                          placeholder="Name"
                        />
                        {errors.cCompanyName && (
                          <div className="mt-2 text-danger">
                            {typeof errors.cCompanyName.message === "string" &&
                              errors.cCompanyName.message}
                          </div>
                        )}
                      </div>
                      <div className="mt-3 input-form">
                      <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Executive Name
                          <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, at least 2 characters
                          </span>
                        </FormLabel>
                        <FormInput
                          {...register("cName")}
                          id="validation-form-1"
                          type="text"
                          name="cName"
                          className={clsx({
                            "border-danger": errors.cName,
                          })}
                          placeholder="Name"
                        />
                        {errors.cName && (
                          <div className="mt-2 text-danger">
                            {typeof errors.cName.message === "string" &&
                              errors.cName.message}
                          </div>
                        )}
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Executive Email
                          <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, at least 2 characters
                          </span>
                        </FormLabel>
                        <FormInput
                          {...register("cEmail")}
                          id="validation-form-1"
                          type="text"
                          name="cEmail"
                          className={clsx({
                            "border-danger": errors.cEmail,
                          })}
                          placeholder="Email"
                        />
                        {errors.cEmail && (
                          <div className="mt-2 text-danger">
                            {typeof errors.cEmail.message === "string" &&
                              errors.cEmail.message}
                          </div>
                        )}
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Password
                          <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, at least 2 characters
                          </span>
                        </FormLabel>
                        <FormInput
                          {...register("cPassword")}
                          id="validation-form-1"
                          type="text"
                          name="cPassword"
                          className={clsx({
                            "border-danger": errors.cPassword,
                          })}
                          placeholder="Password"
                        />
                        {errors.cPassword && (
                          <div className="mt-2 text-danger">
                            {typeof errors.cPassword.message === "string" &&
                              errors.cPassword.message}
                          </div>
                        )}
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Executive Mobile No
                          <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, at least 10 characters
                          </span>
                        </FormLabel>
                        <FormInput
                          {...register("cMobile")}
                          id="validation-form-1"
                          type="text"
                          name="cMobile"
                          className={clsx({
                            "border-danger": errors.cMobile,
                          })}
                          placeholder="Mobile"
                        />
                        {errors.cMobile && (
                          <div className="mt-2 text-danger">
                            {typeof errors.cMobile.message === "string" &&
                              errors.cMobile.message}
                          </div>
                        )}
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Executive WhatsApp
                        </FormLabel>
                        <FormInput
                          {...register("cWhatsapp")}
                          id="validation-form-1"
                          type="text"
                          name="cWhatsapp"
                          className={clsx({
                            "border-danger": errors.cWhatsapp,
                          })}
                          placeholder="whatsapp"
                        />
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Executive Skype
                        </FormLabel>
                        <FormInput
                          {...register("cSkype")}
                          id="validation-form-1"
                          type="text"
                          name="cSkype"
                          className={clsx({
                            "border-danger": errors.cSkype,
                          })}
                          placeholder="skype"
                        />
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Register Agent
                        </FormLabel>
                        <FormInput
                          {...register("registerAgent")}
                          id="validation-form-1"
                          type="text"
                          name="registerAgent"
                          className={clsx({
                            "border-danger": errors.registerAgent,
                          })}
                          placeholder="Register Agent"
                        />
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Visit Form
                        </FormLabel>
                        <FormSelect 
                          {...register("visitFrom")}
                          className="mt-2 sm:mr-2" 
                          aria-label="Default select example">
                                <option value="Web">Web</option>
                                <option value="FB">Facebook</option>
                                <option value="YT">Youtube</option>
                                <option value="Others">Others</option>
                        </FormSelect>
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
                          aria-label="Default select example">
                                <option value="Y">Active</option>
                                <option value="N">Inactive</option>
                        </FormSelect>
                      </div>
                      <Button variant="primary" type="submit" className="mt-5 w-24 mr-1">
                        Update
                      </Button>
                      <Link to="/client-corporate">
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

export default editClient;
