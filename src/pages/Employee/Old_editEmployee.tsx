//@ts-nocheck
import {
  PreviewComponent,
  Preview,
} from "../../base-components/PreviewComponent";
import {
  FormLabel,
  FormCheck,
  FormInput,
  FormSelect,
  FormTextarea
} from "../../base-components/Form";
import { useNavigate } from "react-router-dom";
import {useEffect } from "react";
import Button from "../../base-components/Button";
import Notification from "../../base-components/Notification";
import Lucide from "../../base-components/Lucide";
import { useForm } from "react-hook-form";
import Toastify from "toastify-js";
import clsx from "clsx";
import { fetchAllState } from "../State/StateSlice";
import { fetchAllCountry } from "../Country/CountrySlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, {useState} from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { getEmployee, updateEmployee } from "./employeeSlice";
import { fetchAllDepartment } from "../Department/departmentSlice";
import TomSelect from "../../base-components/TomSelect";
import _ from "lodash";
import { fetchAllCity } from '../City/CitySlice';

const editEmployee = ()=>{
  //start
  const cityData = useAppSelector((state) => state.city);
  const departmentData = useAppSelector((state) => state.department);
  const { data } = useAppSelector((state) => state.employee);
  const stateData = useAppSelector((state) => state.state);
  const [calAge,setCalAge] = useState()
  const countryData = useAppSelector((state) => state.country);
  const navigate = useNavigate();
  const [currentState, setCurrentState] = React.useState(0);

  const [gender, setGender] = React.useState("Male");
  const [designation, setDesignation] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [workLocation, setWorkLocation] = React.useState("");

  const [totalCTC, setTotalCTC] = React.useState(null);
  const [basicSal, setbasicSal] = React.useState(0);
  const [hraPercentage, setHRAPercentage] = React.useState(0);
  const [conveyanceAllowance, setConveyanceAllowance] = React.useState(20);
  const [fixedAllowance, setFixedAllowance] = React.useState(25);
  const [medicalAllowance, setMedicalAmount] = React.useState(0);
  const [leaveTravelAllowance,setLeaveTravelAllowance] = React.useState(0)
  const [additionalBenefits,setAdditionalBenefits] = React.useState(0)
  const [performanceIncentive,setPerformanceIncentive] = React.useState(0)
  const [employeePFContribution, setEmployeePFContribution] = React.useState(0);
  const [employerPFContribution, setEmployerPFContribution] = React.useState(0);
  const [esiEmployeeContribution, setEsiEmployeeContribution] = React.useState(0);
  const [esiEmployerContribution, setEsiEmployerContribution] = React.useState(0);
  const [stockAmount, setStockAmount] = useState(0);
  const [carAmount,setCarAmount] = useState(0);
  const [telephoneExpence, setTelephoneExpence] = useState(0);
  const [employeeInHandSal,setEmployeeInHandSal] = useState(0);
  const [grossSal, setGrossSal] = useState(0);
  const [city, setCity] = React.useState("");
  const [stateVal, setStateVal] = React.useState("");
  const [countryVal, setCountryVal] = React.useState("");
  const [payType, setPayType] = React.useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllDepartment());
  }, []);

  useEffect(() => {
    dispatch(fetchAllCity());
  }, []);

  useEffect(() => {
    dispatch(fetchAllState());
  }, []);

  useEffect(() => {
    dispatch(fetchAllCountry());
  }, []);

  useEffect(()=>{
    dispatch(getEmployee(params.id));
  },[])

  console.log('data',data)

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const schema = yup
    .object({
      empFirstName: yup
        .string()
        .required("First Name is a required field")
        .min(2),
      empMiddleName: yup
        .string()
        .required("Middle Name is a required field")
        .min(1),
      empLastName: yup
        .string()
        .required("Last Name is a required field")
        .min(2)
    })
    .required();

  const {
    register,
    trigger,
    formState: { errors },
    reset,
    watch,
    handleSubmit,
    getValues,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  //end
  const params = useParams();




   useEffect(() => {
    reset(data);
  }, [data]);

  
  const onSubmit1 = async (e) => {
    e.preventDefault();
    const result = await trigger();

    if (payType.length == 0) return;

    if (!result || payType.length == 0) {
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
      console.log('inside else');
      let formData = {
        empFirstName: getValues("empFirstName"),
        empMiddleName: getValues("empMiddleName"),
        empLastName: getValues("empLastName"),
        empID: getValues("empID"),
        empGender: gender,
        dateOfJoining: getValues("dateOfJoining"),
        designation: designation,
        directoryInterest: getValues("directoryInterest"),
        workEmail: getValues("workEmail"),
        department: department,
        workLocation: workLocation,
        enablePortalAccess: getValues("enablePortalAccess"),
        contributeToPF: getValues("contributeToPF"),
        pfAccountNumber: getValues("pfAccountNumber"),
        uan: getValues("uan"),
        contributeToEmployeePensionScheme: getValues(
          "contributeToEmployeePensionScheme"
        ),
        contributeToEmployeeStateInsurance: getValues(
          "contributeToEmployeeStateInsurance"
        ),
        contributeToProfessionalTax: getValues("contributeToProfessionalTax"),
        hra: totalCTC,
        percentageOfCTC: basicSal,
        hraPercentage: hraPercentage,
        conveyanceAllowance: conveyanceAllowance,
        fixedAllowance: fixedAllowance,
        medicalAllowance:medicalAllowance,
        leaveTravelAllowance:leaveTravelAllowance,
        additionalBenefits:additionalBenefits,
        performanceIncentive:performanceIncentive,
        employeePFContribution:employeePFContribution,
        employerPFContribution:employerPFContribution,
        ESIEmployeeContribution:esiEmployeeContribution,
        ESIEmployerContribution:esiEmployerContribution,
        stockOption:stockAmount,
        carExpences:carAmount,
        telephoneExpences:telephoneExpence,
        employeeInHand:employeeInHandSal,
        grossSalary:grossSal,
        costToCompany: parseFloat(
          12 *
            (totalCTC * (basicSal / 100.0) +
              totalCTC * (hraPercentage / 100.0) +
              conveyanceAllowance +
              fixedAllowance)
        ).toFixed(2),
        personalEmailAddress: getValues("personalEmailAddress"),

        personalMobileNumber: getValues("personalMobileNumber"),

        dateOfBirth: getValues("dateOfBirth"),

        age: calAge,
        empPhone: getValues("personalMobileNumber"),
        fatherName: getValues("fatherName"),
        motherName: getValues("motherName"),
        pan: getValues("pan"),
        adhaar: getValues("adhaar"),

        residentialAddress: getValues("residentialAddress"),
        residentialAddress2: getValues("residentialAddress2"),

        city: city,

        state: stateVal,
        country: countryVal,
        pinCode: getValues("pinCode"),
        payType: payType,
        id:params.id
      };
      console.log("Data: ", formData);
      dispatch(updateEmployee(formData));

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
      //navigate("/employee");
    }
  };

 
  
  const contributeToPF = watch("contributeToPF");

  const ageCalculate = (e) => {
    var date = new Date(e.target.value);
    //alert(12)
    console.log(date.getTime)
    var month_diff = Date.now() - date.getTime();
    
    // //convert the calculated difference in date format
    var age_dt = new Date(month_diff); 
    
    // //extract year from date    
    var year = age_dt.getUTCFullYear();
    
    // //now calculate the age of the user
    var age = Math.abs(year - 1970);

    setCalAge(age)
  }

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Manage Employee</h2>
      </div>
     
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 intro-y lg:col-span-12">
          {/* BEGIN: Form Validation */}

          <PreviewComponent className="intro-y box">
            <>
              <div className="flex justify-center pl-6 pr-6 pt-8 pb-4">
                <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
                  <li
                    className={
                      currentState >= 0
                        ? "text-[#164E63] flex md:w-full items-center dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
                        : "flex md:w-full items-center dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
                    }
                  >
                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                      {currentState >= 0 ? (
                        <svg
                          className="w-6 h-6 mr-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                      ) : (
                        <span className="me-2">1</span>
                      )}
                      Basic{" "}
                    </span>
                  </li>
                  <li
                    className={
                      currentState >= 1
                        ? "text-[#164E63] flex md:w-full items-center dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
                        : "flex md:w-full items-center dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
                    }
                  >
                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                      {currentState >= 1 ? (
                        <svg
                          className="w-6 h-6 mr-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                      ) : (
                        <span className="me-2">2</span>
                      )}
                      Salary
                      <span className="hidden sm:inline-flex sm:ms-2">
                        Details
                      </span>
                    </span>
                  </li>
                  <li
                    className={
                      currentState >= 2
                        ? "text-[#164E63] flex md:w-full items-center dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
                        : "flex md:w-full items-center dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
                    }
                  >
                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                      {currentState >= 2 ? (
                        <svg
                          className="w-6 h-6 mr-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                      ) : (
                        <span className="me-2">3</span>
                      )}
                      Personal{" "}
                      <span className="hidden sm:inline-flex sm:ms-2">
                        Info
                      </span>
                    </span>
                  </li>
                  <li
                    className={
                      currentState >= 3
                        ? "text-[#164E63] flex items-center"
                        : "flex items-center"
                    }
                  >
                    {currentState >= 3 ? (
                      <svg
                        className="w-6 h-6 mr-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                    ) : (
                      <span className="me-2">4</span>
                    )}
                    Payment
                    <span className="hidden sm:inline-flex sm:ms-2">Info</span>
                  </li>
                </ol>
              </div>
              <div className="p-5">
                <Preview>
                  {/* BEGIN: Validation Form */}
                  <form
                    className="validate-form"
                    onSubmit={currentState >= 2 ? onSubmit1 : null}
                  >
                    {currentState == 0 && (
                      <div>
                        {/* Employee Name */}
                        <div className="flex justify-center">
                          <div className="input-form w-1/3">
                            <FormInput
                              {...register("empFirstName")}
                              id="validation-form-empFirstName"
                              type="hidden"
                              name="createdBy"
                            />
                            <FormLabel
                              htmlFor="validation-form-empFirstName"
                              className="flex flex-col w-full sm:flex-row"
                            >
                              Employee First Name*
                            </FormLabel>
                            <FormInput
                              {...register("empFirstName")}
                              id="validation-form-empFirstName"
                              type="text"
                              name="empFirstName"
                              className={clsx({
                                "border-danger": errors.empFirstName,
                              })}
                              placeholder="First Name"
                            />
                            {errors.empFirstName && (
                              <div className="mt-2 text-danger">
                                {typeof errors.empFirstName.message ===
                                  "string" && errors.empFirstName.message}
                              </div>
                            )}
                          </div>
                          <div className="input-form w-1/3 pl-2 pr-2">
                            <FormInput
                              {...register("empMiddleName")}
                              id="validation-form-empMiddleName"
                              type="hidden"
                              name="createdBy"
                              value=""
                            />
                            <FormLabel
                              htmlFor="validation-form-empMiddleName"
                              className="flex flex-col w-full sm:flex-row text-white"
                            >
                              {"Middle Name"}
                            </FormLabel>
                            <FormInput
                              {...register("empMiddleName")}
                              id="validation-form-empMiddleName"
                              type="text"
                              name="empMiddleName"
                              className={clsx({
                                "border-danger": errors.empMiddleName,
                              })}
                              placeholder="Middle Name"
                            />
                            {errors.empMiddleName && (
                              <div className="mt-2 text-danger">
                                {typeof errors.empMiddleName.message ===
                                  "string" && errors.empMiddleName.message}
                              </div>
                            )}
                          </div>
                          <div className="input-form w-1/3">
                            <FormInput
                              {...register("empLastName")}
                              id="validation-form-empLastName"
                              type="hidden"
                              name="createdBy"
                              value=""
                            />
                            <FormLabel
                              htmlFor="validation-form-empLastName"
                              className="flex flex-col w-full sm:flex-row text-white"
                            >
                              Last Name
                            </FormLabel>
                            <FormInput
                              {...register("empLastName")}
                              id="validation-form-empLastName"
                              type="text"
                              name="empLastName"
                              className={clsx({
                                "border-danger": errors.empLastName,
                              })}
                              placeholder="Last Name"
                            />
                            {errors.empLastName && (
                              <div className="mt-2 text-danger">
                                {typeof errors.empLastName.message ===
                                  "string" && errors.empLastName.message}
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Employee ID, Gender */}
                        <div className="flex justify-center mt-4">
                          <div className="input-form w-1/2">
                            <FormInput
                              {...register("empID")}
                              id="validation-form-empID"
                              type="hidden"
                              name="createdBy"
                              value=""
                            />
                            <FormLabel
                              htmlFor="validation-form-empID"
                              className="flex flex-col w-full sm:flex-row"
                            >
                              Employee Id*
                            </FormLabel>
                            <FormInput
                              {...register("empID")}
                              id="validation-form-empID"
                              type="number"
                              name="empID"
                              className={clsx({
                                "border-danger": errors.empID,
                              })}
                              // placeholder="Employee Id"
                            />
                            {errors.empID && (
                              <div className="mt-2 text-danger">
                                {typeof errors.empID.message === "string" &&
                                  errors.empID.message}
                              </div>
                            )}
                          </div>
                          <div className="input-form w-1/2 pl-2">
                            <FormInput
                              {...register("empGender")}
                              id="validation-form-gender"
                              type="hidden"
                              name="gender"
                              className="w-full"
                            />
                            <FormLabel
                              htmlFor="validation-form-gender"
                              className="flex flex-col w-full sm:flex-row"
                            >
                              {"Gender"}
                            </FormLabel>
                            <FormSelect
                              {...register("empGender")}
                              id="validation-form-gender"
                              name="gender"
                              className={`border ${
                                errors.gender
                                  ? "border-danger"
                                  : "border-gray-300"
                              }`}
                              defaultValue=""
                              value={gender}
                              onChange={(e) => {
                                setGender(e.target.value);
                              }}
                            >
                              <option value="" disabled>
                                Select an option
                              </option>
                              <option value="M">M</option>
                              <option value="FM">FM</option>
                              <option value="O">Others</option>
                            </FormSelect>
                            {errors.gender && (
                              <div className="mt-2 text-danger">
                                {typeof errors.gender.message === "string" &&
                                  errors.gender.message}
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Date of Joining*, Designation* */}
                        <div className="flex justify-center mt-4">
                          <div className="input-form w-1/2">
                            <FormLabel
                              htmlFor="validation-form-dateOfJoining"
                              className="flex flex-col w-full sm:flex-row"
                            >
                              Date of Joining*
                            </FormLabel>
                            <FormInput
                              {...register("dateOfJoining")}
                              id="validation-form-dateOfJoining"
                              type="date"
                              name="dateOfJoining"
                              className={clsx({
                                "border-danger": errors.dateOfJoining,
                              })}
                            />
                            {errors.dateOfJoining && (
                              <div className="mt-2 text-danger">
                                {typeof errors.dateOfJoining.message ===
                                  "string" && errors.dateOfJoining.message}
                              </div>
                            )}
                          </div>
                          <div className="input-form w-1/2 pl-2">
                            <FormLabel
                              htmlFor="validation-form-designation"
                              className="flex flex-col w-full sm:flex-row"
                            >
                              Designation*
                            </FormLabel>
                            <FormSelect
                              {...register("designation")}
                              id="validation-form-designation"
                              name="designation"
                              className={clsx({
                                "border-danger": errors.designation,
                              })}
                              defaultValue=""
                              value={designation}
                              onChange={(e) => {
                                setDesignation(e.target.value);
                              }}
                            >
                              <option value="" disabled>
                                Select a designation
                              </option>
                              <option value="designation1">
                                Designation 1
                              </option>
                              <option value="designation2">
                                Designation 2
                              </option>
                              {/* Add more designations as needed */}
                            </FormSelect>
                            {errors.designation && (
                              <div className="mt-2 text-danger">
                                {typeof errors.designation.message ===
                                  "string" && errors.designation.message}
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Employee is a Director/person with substantial interest in
                    the company */}

                        <div className="mt-4">
                          <FormCheck>
                            <label className="w-full flex">
                              <input
                                {...register("directoryInterest")}
                                type="checkbox"
                                className="mt-0.5 rounded text-[#164E63]"
                              />{" "}
                              <span className="ml-4">
                                {" "}
                                Employee is a Director/person with substantial
                                interest in the company
                              </span>
                            </label>
                            {errors.directoryInterest && (
                              <div className="mt-2 text-danger">
                                {typeof errors.directoryInterest.message ===
                                  "string" && errors.directoryInterest.message}
                              </div>
                            )}
                          </FormCheck>
                        </div>
                        {/* Work Email */}
                        <div className="flex justify-center mt-4">
                          <div className="input-form w-full">
                            <FormInput
                              {...register("workEmail")}
                              id="validation-form-workEmail"
                              type="hidden"
                              name="createdBy"
                            />
                            <FormLabel
                              htmlFor="validation-form-workEmail"
                              className="flex flex-col w-full sm:flex-row"
                            >
                              Work Email*
                            </FormLabel>
                            <FormInput
                              {...register("workEmail")}
                              id="validation-form-workEmail"
                              type="email"
                              name="workEmail"
                              className={clsx({
                                "border-danger": errors.workEmail,
                              })}
                              placeholder="abc@xyz.com"
                            />
                            {errors.workEmail && (
                              <div className="mt-2 text-danger">
                                {typeof errors.workEmail.message === "string" &&
                                  errors.workEmail.message}
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Department, Work Location */}
                        <div className="flex justify-center mt-4">
                          <div className="input-form w-1/2">
                            <FormLabel
                              htmlFor="validation-form-department"
                              className="flex flex-col w-full sm:flex-row"
                            >
                              Department*
                            </FormLabel>
                            {/* <FormSelect
                              {...register("department")}
                              id="validation-form-department"
                              name="department"
                              className={clsx({
                                "border-danger": errors.department,
                              })}
                              defaultValue=""
                              value={department}
                              onChange={(e) => {
                                setDepartment(e.target.value);
                              }}
                            >
                              <option value="" disabled>
                                Select a department
                              </option>
                              {departmentData.data.map((item) => {
                                return (
                                  <option value="department1" key={item.id}>
                                    {item.dptName}
                                  </option>
                                );
                              })}
                            </FormSelect> */}
                            <FormSelect 
                              {...register("department")}
                              id="department"
                              name="department"
                              className="sm:mr-2"
                              onChange={e => setDepartment(e.target.value)} 
                              value={department}
                              aria-label="Default select example">
                                {_.take(departmentData.data, departmentData.data.length).map((item, Key) => {
                                  return <option value={item.id}>{item.dptName}</option>
                                })}
                            </FormSelect>   
                            {errors.department && (
                              <div className="mt-2 text-danger">
                                {typeof errors.department.message ===
                                  "string" && errors.department.message}
                              </div>
                            )}
                          </div>
                          <div className="input-form w-1/2 pl-2">
                            <FormLabel
                              htmlFor="validation-form-workLocation"
                              className="flex flex-col w-full sm:flex-row"
                            >
                              Work Location*
                            </FormLabel>
                            <FormSelect
                              {...register("workLocation")}
                              id="validation-form-workLocation"
                              name="workLocation"
                              className={clsx({
                                "border-danger": errors.workLocation,
                              })}
                              defaultValue=""
                              value={workLocation}
                              onChange={(e) => {
                                setWorkLocation(e.target.value);
                              }}
                            >
                              <option value="" disabled>
                                Select a work location
                              </option>
                              <option value="location1">Location 1</option>
                              <option value="location2">Location 2</option>
                            </FormSelect>
                            {errors.workLocation && (
                              <div className="mt-2 text-danger">
                                {typeof errors.workLocation.message ===
                                  "string" && errors.workLocation.message}
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Enable Portal Access */}
                        <div className="mt-4">
                          <div>
                            <label className="w-full flex">
                              <input
                                {...register("enablePortalAccess")}
                                type="checkbox"
                                className="mt-0.5 rounded text-[#164E63]"
                              />{" "}
                              <span className="ml-4">
                                {" "}
                                Enable Portal Access
                              </span>
                            </label>
                            <p className="mt-2 ml-8 text-[gray]">
                              The employee will be able to view payslips, submit
                              their IT declaration, and create reimbursement
                              claims through the employee portal
                            </p>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="w-full h-[1px] bg-[#E2E8F0]"></div>
                        </div>
                        {/* Employee Provident Fund */}
                        <div className="mt-8">
                          <div>
                            <h1 className="text-[20px]">
                              Statutory Components
                            </h1>
                            <p className="mt-1 text-[gray]">
                              Enable the necessary benefits and tax applicable
                              for this employee
                            </p>
                            <label className="w-full flex mt-6">
                              <input
                                {...register("contributeToPF")}
                                type="checkbox"
                                className="mt-0.5 rounded text-[#164E63]"
                              />{" "}
                              <span className="ml-4">
                                {" "}
                                Employee Provident Fund
                              </span>
                            </label>
                            {contributeToPF && (
                              <div className="flex justify-center mt-4 ml-8">
                                <div className="input-form w-1/2">
                                  <FormInput
                                    {...register("pfAccountNumber")}
                                    id="validation-form-pfAccountNumber"
                                    type="text"
                                    name="pfAccountNumber"
                                    className={clsx({
                                      "border-danger": errors.pfAccountNumber,
                                    })}
                                    placeholder="PF Account Number"
                                  />
                                  {errors.pfAccountNumber && (
                                    <div className="mt-2 text-danger">
                                      {typeof errors.pfAccountNumber.message ===
                                        "string" &&
                                        errors.pfAccountNumber.message}
                                    </div>
                                  )}
                                </div>
                                <div className="input-form w-1/2 pl-2">
                                  <FormInput
                                    {...register("uan")}
                                    id="validation-form-uan"
                                    type="text"
                                    name="uan"
                                    className={clsx({
                                      "border-danger": errors.uan,
                                    })}
                                    placeholder="UAN"
                                  />
                                  {errors.uan && (
                                    <div className="mt-2 text-danger">
                                      {typeof errors.uan.message === "string" &&
                                        errors.uan.message}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                            {contributeToPF && (
                              <div className="mt-4 ml-8">
                                <div>
                                  <label className="w-full flex mt-0">
                                    <input
                                      {...register(
                                        "contributeToEmployeePensionScheme"
                                      )}
                                      type="checkbox"
                                      className="mt-0.5 rounded text-[#164E63]"
                                    />{" "}
                                    <span className="ml-4">
                                      {" "}
                                      Contribute to Employee Pension Scheme
                                    </span>
                                  </label>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Employee State Insurance */}
                        <div className="mt-4">
                          <div>
                            <FormCheck className="w-full flex mt-6">
                              <input
                                {...register(
                                  "contributeToEmployeeStateInsurance"
                                )}
                                type="checkbox"
                                className="mt-0.5 rounded text-[#164E63]"
                              />
                              <span className="ml-4">
                                {" "}
                                Employee State Insurance
                              </span>
                            </FormCheck>
                          </div>
                        </div>
                        {/* Professional Tax */}
                        <div className="mt-4">
                          <div>
                            <FormCheck className="w-full flex mt-6">
                              <input
                                {...register("contributeToProfessionalTax")}
                                type="checkbox"
                                className="mt-0.5 rounded text-[#164E63]"
                              />
                              <span className="ml-4"> Professional Tax</span>
                            </FormCheck>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentState == 1 && (
                      // <div>
                      //   <div className="flex justify-between mt-5">
                          
                      //   </div>
                      //   <div className="flex justify-between mt-10 w-full">
                      //     <div className="input-form">Salary Components</div>
                      //     <div className="input-form">
                      //       Calculation Type
                      //     </div>{" "}
                      //     <div className="input-form">Monthly Amount</div>{" "}
                      //     <div className="input-form">Annual Amount</div>
                      //   </div>
                      //   <div className="w-full mt-4 mb-4 h-1 bg-[#E2E8F0]"></div>
                      //   <div className="mt-0">
                      //     <div className="input-form w-1/4">
                      //       <h1 className="text-xl font-semibold">Earnings</h1>
                      //     </div>
                      //   </div>
                      //   <div className="flex justify-between mt-10">
                      //     <div className="input-form flex items-center w-[28.5%]">
                      //       <h1 className="flex items-center">Basic</h1>
                      //     </div>
                      //     <div className="input-form w-[25%]">
                      //       {/* Number input for Percentage of CTC */}
                      //       <FormInput
                      //         {...register("percentageOfCTC")}
                      //         id="validation-form-percentageOfCTC"
                      //         type="number"
                      //         name="percentageOfCTC"
                      //         className={clsx({
                      //           "border-danger": errors.percentageOfCTC,
                      //         })}
                      //         placeholder="Enter Basic Components"
                      //         value={basicSal}
                      //         onChange={(e) => {
                      //           setGrossSal(e.target.value);
                      //           setbasicSal(e.target.value);
                      //         }}
                      //       />
                      //       {errors.percentageOfCTC && (
                      //         <div className="mt-2 text-danger">
                      //           {typeof errors.percentageOfCTC.message ===
                      //             "string" && errors.percentageOfCTC.message}
                      //         </div>
                      //       )}
                      //     </div>

                      //     <div className="input-form w-[25%] pl-[2%]">
                      //       <FormInput
                      //         type="number"
                      //         className={clsx({
                      //           "border-danger": errors.empFirstName,
                      //         })}
                      //         placeholder={basicSal}
                      //         disabled
                      //       />
                      //       {errors.empFirstName && (
                      //         <div className="mt-2 text-danger">
                      //           {typeof errors.empFirstName.message ===
                      //             "string" && errors.empFirstName.message}
                      //         </div>
                      //       )}
                      //     </div>
                      //     <div className="input-form flex items-center justify-center w-[12.5%]">
                      //       <h1 className="items-center text-right w-full">
                      //         {parseFloat(
                      //           basicSal  * 12
                      //         ).toFixed(2)}
                      //       </h1>
                      //     </div>
                      //   </div>
                      //   <div className="flex justify-between mt-5">
                      //     <div className="input-form flex items-center w-[28.5%]">
                      //       <h1 className="flex items-center">
                      //         House Rent Allowance
                      //       </h1>
                      //     </div>
                      //     <div className="input-form w-[25%]">
                      //       {/* Number input for HRA Percentage */}
                      //       <FormInput
                      //         {...register("hraPercentage")}
                      //         id="validation-form-hraPercentage"
                      //         type="number"
                      //         name="hraPercentage"
                      //         className={clsx({
                      //           "border-danger": errors.hraPercentage,
                      //         })}
                      //         placeholder="HRA Percentage"
                      //         value={hraPercentage}
                      //         onChange={(e) => {
                      //           setHRAPercentage(e.target.value);
                      //         }}
                      //       />
                      //       {errors.hraPercentage && (
                      //         <div className="mt-2 text-danger">
                      //           {typeof errors.hraPercentage.message ===
                      //             "string" && errors.hraPercentage.message}
                      //         </div>
                      //       )}
                      //     </div>

                      //     <div className="input-form w-[25%] pl-[2%]">
                      //       <FormInput
                      //         type="number"
                      //         className={clsx({
                      //           "border-danger": errors.empFirstName,
                      //         })}
                      //         placeholder={parseFloat(
                      //           hraPercentage
                      //         ).toFixed(2)}
                      //         disabled
                      //       />
                      //       {errors.empFirstName && (
                      //         <div className="mt-2 text-danger">
                      //           {typeof errors.empFirstName.message ===
                      //             "string" && errors.empFirstName.message}
                      //         </div>
                      //       )}
                      //     </div>
                      //     <div className="input-form flex items-center justify-center w-[12.5%]">
                      //       <h1 className="items-center text-right w-full">
                      //         {parseFloat(
                      //           hraPercentage * 12
                      //         ).toFixed(2)}
                      //       </h1>
                      //     </div>
                      //   </div>
                      //   <div className="flex justify-between mt-5">
                      //     <div className="input-form flex items-center w-[28.5%]">
                      //       <h1 className="flex items-center">
                      //         Medical Allowance
                      //       </h1>
                      //     </div>
                      //     <div className="input-form w-[25%]">
                      //       {/* Number input for HRA Percentage */}
                      //       <FormInput
                      //         {...register("medicalAllowance")}
                      //         id="validation-form-medicalAllowance"
                      //         type="number"
                      //         name="hraPercentage"
                      //         className={clsx({
                      //           "border-danger": errors.hraPercentage,
                      //         })}
                      //         placeholder="Medical Allowance"
                      //         value={medicalAllowance}
                      //         onChange={(e) => {
                      //           setMedicalAmount(e.target.value);
                      //         }}
                      //       />
                      //       {errors.medicalAllowance && (
                      //         <div className="mt-2 text-danger">
                      //           {typeof errors.medicalAllowance.message ===
                      //             "string" && errors.medicalAllowance.message}
                      //         </div>
                      //       )}
                      //     </div>

                      //     <div className="input-form w-[25%] pl-[2%]">
                      //       <FormInput
                      //         type="number"
                      //         className={clsx({
                      //           "border-danger": errors.medicalAllowance,
                      //         })}
                      //         placeholder={parseFloat(
                      //           medicalAllowance
                      //         ).toFixed(2)}
                      //         disabled
                      //       />
                      //       {errors.medicalAllowance && (
                      //         <div className="mt-2 text-danger">
                      //           {typeof errors.medicalAllowance.message ===
                      //             "string" && errors.medicalAllowance.message}
                      //         </div>
                      //       )}
                      //     </div>
                      //     <div className="input-form flex items-center justify-center w-[12.5%]">
                      //       <h1 className="items-center text-right w-full">
                      //         {parseFloat(
                      //           medicalAllowance * 12
                      //         ).toFixed(2)}
                      //       </h1>
                      //     </div>
                      //   </div>
                      //   <div className="flex justify-between mt-5">
                      //     <div className="input-form flex items-center w-[28.5%]">
                      //       <h1 className="flex items-center">
                      //         Leave Travel Allowance
                      //       </h1>
                      //     </div>
                      //     <div className="input-form w-[25%]">
                      //       {/* Number input for HRA Percentage */}
                      //       <FormInput
                      //         {...register("leaveTravelAllowance")}
                      //         id="validation-form-leaveTravelAllowance"
                      //         type="number"
                      //         name="leaveTravelAllowance"
                      //         className={clsx({
                      //           "border-danger": errors.leaveTravelAllowance,
                      //         })}
                      //         placeholder="Leave Travel Allowance"
                      //         value={leaveTravelAllowance}
                      //         onChange={(e) => {
                      //           setLeaveTravelAllowance(e.target.value);
                      //         }}
                      //       />
                      //       {errors.leaveTravelAllowance && (
                      //         <div className="mt-2 text-danger">
                      //           {typeof errors.leaveTravelAllowance.message ===
                      //             "string" && errors.leaveTravelAllowance.message}
                      //         </div>
                      //       )}
                      //     </div>

                      //     <div className="input-form w-[25%] pl-[2%]">
                      //       <FormInput
                      //         type="number"
                      //         className={clsx({
                      //           "border-danger": errors.leaveTravelAllowance,
                      //         })}
                      //         placeholder={parseFloat(
                      //           leaveTravelAllowance
                      //         ).toFixed(2)}
                      //         disabled
                      //       />
                      //       {errors.leaveTravelAllowance && (
                      //         <div className="mt-2 text-danger">
                      //           {typeof errors.leaveTravelAllowance.message ===
                      //             "string" && errors.leaveTravelAllowance.message}
                      //         </div>
                      //       )}
                      //     </div>
                      //     <div className="input-form flex items-center justify-center w-[12.5%]">
                      //       <h1 className="items-center text-right w-full">
                      //         {parseFloat(
                      //           leaveTravelAllowance * 12
                      //         ).toFixed(2)}
                      //       </h1>
                      //     </div>
                      //   </div>
                      //   <div className="flex justify-between mt-5">
                      //     <div className="input-form flex items-center w-[28.5%]">
                      //       <h1 className="flex items-center">
                      //         Additional Benefits
                      //       </h1>
                      //     </div>
                      //     <div className="input-form w-[25%]">
                      //       {/* Number input for HRA Percentage */}
                      //       <FormInput
                      //         {...register("additionalBenefits")}
                      //         id="validation-form-additionalBenefits"
                      //         type="number"
                      //         name="additionalBenefits"
                      //         className={clsx({
                      //           "border-danger": errors.additionalBenefits,
                      //         })}
                      //         placeholder="Additional Benefilts"
                      //         value={additionalBenefits}
                      //         onChange={(e) => {
                      //           setAdditionalBenefits(e.target.value);
                      //         }}
                      //       />
                      //       {errors.additionalBenefits && (
                      //         <div className="mt-2 text-danger">
                      //           {typeof errors.additionalBenefits.message ===
                      //             "string" && errors.additionalBenefits.message}
                      //         </div>
                      //       )}
                      //     </div>

                      //     <div className="input-form w-[25%] pl-[2%]">
                      //       <FormInput
                      //         type="number"
                      //         className={clsx({
                      //           "border-danger": errors.additionalBenefits,
                      //         })}
                      //         placeholder={parseFloat(
                      //           additionalBenefits
                      //         ).toFixed(2)}
                      //         disabled
                      //       />
                      //       {errors.additionalBenefits && (
                      //         <div className="mt-2 text-danger">
                      //           {typeof errors.additionalBenefits.message ===
                      //             "string" && errors.additionalBenefits.message}
                      //         </div>
                      //       )}
                      //     </div>
                      //     <div className="input-form flex items-center justify-center w-[12.5%]">
                      //       <h1 className="items-center text-right w-full">
                      //         {parseFloat(
                      //           additionalBenefits * 12
                      //         ).toFixed(2)}
                      //       </h1>
                      //     </div>
                      //   </div>
                      //   <div className="flex justify-between mt-5">
                      //     <div className="input-form flex items-center w-[28.5%]">
                      //       <h1 className="flex items-center">
                      //         Performance Incentive
                      //       </h1>
                      //     </div>
                      //     <div className="input-form w-[25%]">
                      //       {/* Number input for HRA Percentage */}
                      //       <FormInput
                      //         {...register("performanceIncentive")}
                      //         id="validation-form-performanceIncentive"
                      //         type="number"
                      //         name="hraPercentage"
                      //         className={clsx({
                      //           "border-danger": errors.hraPercentage,
                      //         })}
                      //         placeholder="Performance Incentive"
                      //         value={performanceIncentive}
                      //         onChange={(e) => {
                      //           setPerformanceIncentive(e.target.value);
                      //         }}
                      //       />
                      //       {errors.performanceIncentive && (
                      //         <div className="mt-2 text-danger">
                      //           {typeof errors.performanceIncentive.message ===
                      //             "string" && errors.performanceIncentive.message}
                      //         </div>
                      //       )}
                      //     </div>

                      //     <div className="input-form w-[25%] pl-[2%]">
                      //       <FormInput
                      //         type="number"
                      //         className={clsx({
                      //           "border-danger": errors.performanceIncentive,
                      //         })}
                      //         placeholder={parseFloat(
                      //           performanceIncentive
                      //         ).toFixed(2)}
                      //         disabled
                      //       />
                      //       {errors.performanceIncentive && (
                      //         <div className="mt-2 text-danger">
                      //           {typeof errors.performanceIncentive.message ===
                      //             "string" && errors.performanceIncentive.message}
                      //         </div>
                      //       )}
                      //     </div>
                      //     <div className="input-form flex items-center justify-center w-[12.5%]">
                      //       <h1 className="items-center text-right w-full">
                      //         {parseFloat(
                      //           performanceIncentive * 12
                      //         ).toFixed(2)}
                      //       </h1>
                      //     </div>
                      //   </div>
                      //   <div className="flex justify-between mt-5">
                      //     <div className="input-form flex items-center w-[28.5%]">
                      //       <h1 className="flex items-center">
                      //         Employee PF Contribution @12
                      //       </h1>
                      //     </div>
                      //     <div className="input-form w-[25%]">
                      //       {/* Number input for HRA Percentage */}
                      //       <FormInput
                      //         {...register("employeePFContribution")}
                      //         id="validation-form-employeePFContribution"
                      //         type="number"
                      //         name="employeePFContribution"
                      //         className={clsx({
                      //           "border-danger": errors.employeePFContribution,
                      //         })}
                      //         placeholder={ (basicSal * 12)/100}
                      //         value={(basicSal * 12)/100}
                      //         onChange={(e) => {
                      //           setEmployeePFContribution(e.target.value);
                      //         }}
                      //         disabled
                      //       />
                      //       {errors.employeePFContribution && (
                      //         <div className="mt-2 text-danger">
                      //           {typeof errors.employeePFContribution.message ===
                      //             "string" && errors.employeePFContribution.message}
                      //         </div>
                      //       )}
                      //     </div>

                      //     <div className="input-form w-[25%] pl-[2%]">
                      //       <FormInput
                      //         type="number"
                      //         className={clsx({
                      //           "border-danger": errors.employeePFContribution,
                      //         })}
                      //         placeholder={parseFloat(
                      //           (basicSal * 12)/100
                      //         ).toFixed(2)}
                      //         disabled
                      //       />
                      //       {errors.employeePFContribution && (
                      //         <div className="mt-2 text-danger">
                      //           {typeof errors.employeePFContribution.message ===
                      //             "string" && errors.employeePFContribution.message}
                      //         </div>
                      //       )}
                      //     </div>
                      //     <div className="input-form flex items-center justify-center w-[12.5%]">
                      //       <h1 className="items-center text-right w-full">
                      //         {parseFloat(
                      //           ((basicSal * 12)/100)*12
                      //         ).toFixed(2)}
                      //       </h1>
                      //     </div>
                      //   </div>
                      //   <div className="flex justify-between mt-5">
                      //     <div className="input-form flex items-center w-[28.5%]">
                      //       <h1 className="flex items-center">
                      //       Employer PF Contribution @12
                      //       </h1>
                      //     </div>
                      //     <div className="input-form w-[25%]">
                      //       {/* Number input for HRA Percentage */}
                      //       <FormInput
                      //         {...register("employerPFContribution")}
                      //         id="validation-form-employerPFContribution"
                      //         type="number"
                      //         name="employerPFContribution"
                      //         className={clsx({
                      //           "border-danger": errors.employerPFContribution,
                      //         })}
                      //         placeholder={(basicSal * 12)/100}
                      //         value={(basicSal * 12)/100}
                      //         onChange={(e) => {
                      //           setEmployerPFContribution(e.target.value);
                      //         }}
                      //         disabled
                      //       />
                      //       {errors.employerPFContribution && (
                      //         <div className="mt-2 text-danger">
                      //           {typeof errors.employerPFContribution.message ===
                      //             "string" && errors.employerPFContribution.message}
                      //         </div>
                      //       )}
                      //     </div>

                      //     <div className="input-form w-[25%] pl-[2%]">
                      //       <FormInput
                      //         type="number"
                      //         className={clsx({
                      //           "border-danger": errors.employerPFContribution,
                      //         })}
                      //         placeholder={parseFloat(
                      //           (basicSal * 12)/100
                      //         ).toFixed(2)}
                      //         disabled
                      //       />
                      //       {errors.employerPFContribution && (
                      //         <div className="mt-2 text-danger">
                      //           {typeof errors.employerPFContribution.message ===
                      //             "string" && errors.employerPFContribution.message}
                      //         </div>
                      //       )}
                      //     </div>
                      //     <div className="input-form flex items-center justify-center w-[12.5%]">
                      //       <h1 className="items-center text-right w-full">
                      //         {parseFloat(
                      //           ((basicSal * 12)/100)  * 12
                      //         ).toFixed(2)}
                      //       </h1>
                      //     </div>
                      //   </div>
                      //   <div className="flex justify-between mt-5">
                      //     <div className="input-form flex items-center w-[28.5%]">
                      //       <h1 className="flex items-center">
                      //         ESI Employee Contrinution @0.5
                      //       </h1>
                      //     </div>
                      //     <div className="input-form w-[25%]">
                      //       {/* Number input for HRA Percentage */}
                      //       <FormInput
                      //         {...register("esiEmployeeContribution")}
                      //         id="validation-form-esiEmployeeContribution"
                      //         type="number"
                      //         name="esiEmployeeContribution"
                      //         className={clsx({
                      //           "border-danger": errors.esiEmployeeContribution,
                      //         })}
                      //         placeholder="ESI Employee Contrinution"
                      //         value={(basicSal * 0.75)/100}
                      //         onChange={(e) => {
                      //           setEsiEmployeeContribution(e.target.value);
                      //         }}
                      //         disabled
                      //       />
                      //       {errors.esiEmployeeContribution && (
                      //         <div className="mt-2 text-danger">
                      //           {typeof errors.esiEmployeeContribution.message ===
                      //             "string" && errors.esiEmployeeContribution.message}
                      //         </div>
                      //       )}
                      //     </div>

                      //     <div className="input-form w-[25%] pl-[2%]">
                      //       <FormInput
                      //         type="number"
                      //         className={clsx({
                      //           "border-danger": errors.esiEmployeeContribution,
                      //         })}
                      //         placeholder={parseFloat(
                      //           (basicSal * 0.75)/100
                      //         ).toFixed(2)}
                      //         disabled
                      //       />
                      //       {errors.esiEmployeeContribution && (
                      //         <div className="mt-2 text-danger">
                      //           {typeof errors.esiEmployeeContribution.message ===
                      //             "string" && errors.esiEmployeeContribution.message}
                      //         </div>
                      //       )}
                      //     </div>
                      //     <div className="input-form flex items-center justify-center w-[12.5%]">
                      //       <h1 className="items-center text-right w-full">
                      //         {parseFloat(
                      //           (basicSal * 0.75)/100 * 12
                      //         ).toFixed(2)}
                      //       </h1>
                      //     </div>
                      //   </div>
                      //   <div className="flex justify-between mt-5">
                      //     <div className="input-form flex items-center w-[28.5%]">
                      //       <h1 className="flex items-center">
                      //         ESI Employer Contrinution @3.25
                      //       </h1>
                      //     </div>
                      //     <div className="input-form w-[25%]">
                      //       {/* Number input for HRA Percentage */}
                      //       <FormInput
                      //         {...register("esiEmployerContribution")}
                      //         id="validation-form-esiEmployerContribution"
                      //         type="number"
                      //         name="esiEmployerContribution"
                      //         className={clsx({
                      //           "border-danger": errors.esiEmployerContribution,
                      //         })}
                      //         placeholder="ESI Employer Contrinution"
                      //         value={(basicSal * 3.25)/100 }
                      //         onChange={(e) => {
                      //           setEsiEmployerContribution(e.target.value);
                      //         }}
                      //         disabled
                      //       />
                      //       {errors.esiEmployerContribution && (
                      //         <div className="mt-2 text-danger">
                      //           {typeof errors.esiEmployerContribution.message ===
                      //             "string" && errors.esiEmployerContribution.message}
                      //         </div>
                      //       )}
                      //     </div>

                      //     <div className="input-form w-[25%] pl-[2%]">
                      //       <FormInput
                      //         type="number"
                      //         className={clsx({
                      //           "border-danger": errors.esiEmployerContribution,
                      //         })}
                      //         placeholder={parseFloat(
                      //           (basicSal * 3.25)/100 
                      //         ).toFixed(2)}
                      //         disabled
                      //       />
                      //       {errors.esiEmployerContribution && (
                      //         <div className="mt-2 text-danger">
                      //           {typeof errors.esiEmployerContribution.message ===
                      //             "string" && errors.esiEmployerContribution.message}
                      //         </div>
                      //       )}
                      //     </div>
                      //     <div className="input-form flex items-center justify-center w-[12.5%]">
                      //       <h1 className="items-center text-right w-full">
                      //         {parseFloat(
                      //           (basicSal * 3.25)/100  * 12
                      //         ).toFixed(2)}
                      //       </h1>
                      //     </div>
                      //   </div>
                      //   <div className="flex justify-between mt-5">
                      //     <div className="input-form flex items-center w-[28.5%]">
                      //       <h1 className="flex items-center">
                      //         Stock Option
                      //       </h1>
                      //     </div>
                      //     <div className="input-form w-[25%]">
                      //       {/* Number input for HRA Percentage */}
                      //       <FormInput
                      //         {...register("stockAmount")}
                      //         id="validation-form-stockAmount"
                      //         type="number"
                      //         name="stockAmount"
                      //         className={clsx({
                      //           "border-danger": errors.stockAmount,
                      //         })}
                      //         placeholder="Stock Option"
                      //         value={stockAmount}
                      //         onChange={(e) => {
                      //           setStockAmount(e.target.value);
                      //         }}
                      //       />
                      //       {errors.esiEmployerContribution && (
                      //         <div className="mt-2 text-danger">
                      //           {typeof errors.stockAmount.message ===
                      //             "string" && errors.stockAmount.message}
                      //         </div>
                      //       )}
                      //     </div>

                      //     <div className="input-form w-[25%] pl-[2%]">
                      //       <FormInput
                      //         type="number"
                      //         className={clsx({
                      //           "border-danger": errors.stockAmount,
                      //         })}
                      //         placeholder={parseFloat(
                      //           stockAmount
                      //         ).toFixed(2)}
                      //         disabled
                      //       />
                      //       {errors.stockAmount && (
                      //         <div className="mt-2 text-danger">
                      //           {typeof errors.stockAmount.message ===
                      //             "string" && errors.stockAmount.message}
                      //         </div>
                      //       )}
                      //     </div>
                      //     <div className="input-form flex items-center justify-center w-[12.5%]">
                      //       <h1 className="items-center text-right w-full">
                      //         {parseFloat(
                      //           stockAmount * 12
                      //         ).toFixed(2)}
                      //       </h1>
                      //     </div>
                      //   </div>
                      //   <div className="flex justify-between mt-5">
                      //     <div className="input-form flex items-center w-[28.5%]">
                      //       <h1 className="flex items-center">
                      //         Car
                      //       </h1>
                      //     </div>
                      //     <div className="input-form w-[25%]">
                      //       {/* Number input for HRA Percentage */}
                      //       <FormInput
                      //         {...register("carAmount")}
                      //         id="validation-form-carAmount"
                      //         type="number"
                      //         name="carAmount"
                      //         className={clsx({
                      //           "border-danger": errors.carAmount,
                      //         })}
                      //         placeholder={carAmount}
                      //         value={carAmount}
                      //         onChange={(e) => {
                      //           setCarAmount(e.target.value);
                      //         }}
                      //       />
                      //       {errors.carAmount && (
                      //         <div className="mt-2 text-danger">
                      //           {typeof errors.carAmount.message ===
                      //             "string" && errors.carAmount.message}
                      //         </div>
                      //       )}
                      //     </div>

                      //     <div className="input-form w-[25%] pl-[2%]">
                      //       <FormInput
                      //         type="number"
                      //         className={clsx({
                      //           "border-danger": errors.carAmount,
                      //         })}
                      //         placeholder={carAmount}
                      //         disabled
                      //       />
                      //       {errors.carAmount && (
                      //         <div className="mt-2 text-danger">
                      //           {typeof errors.carAmount.message ===
                      //             "string" && errors.carAmount.message}
                      //         </div>
                      //       )}
                      //     </div>
                      //     <div className="input-form flex items-center justify-center w-[12.5%]">
                      //       <h1 className="items-center text-right w-full">
                      //         {parseFloat(
                      //           carAmount * 12
                      //         ).toFixed(2)}
                      //       </h1>
                      //     </div>
                      //   </div>
                      //   <div className="flex justify-between mt-5">
                      //     <div className="input-form flex items-center w-[28.5%]">
                      //       <h1 className="flex items-center">
                      //         Telephone
                      //       </h1>
                      //     </div>
                      //     <div className="input-form w-[25%]">
                      //       {/* Number input for HRA Percentage */}
                      //       <FormInput
                      //         {...register("telephoneExpence")}
                      //         id="validation-form-telephoneExpence"
                      //         type="number"
                      //         name="telephoneExpence"
                      //         className={clsx({
                      //           "border-danger": errors.telephoneExpence,
                      //         })}
                      //         placeholder="Telephone Expences"
                      //         value={telephoneExpence}
                      //         onChange={(e) => {
                      //           setTelephoneExpence(e.target.value);
                      //         }}
                      //       />
                      //       {errors.telephoneExpence && (
                      //         <div className="mt-2 text-danger">
                      //           {typeof errors.telephoneExpence.message ===
                      //             "string" && errors.telephoneExpence.message}
                      //         </div>
                      //       )}
                      //     </div>

                      //     <div className="input-form w-[25%] pl-[2%]">
                      //       <FormInput
                      //         type="number"
                      //         className={clsx({
                      //           "border-danger": errors.telephoneExpence,
                      //         })}
                      //         placeholder={parseFloat(
                      //           telephoneExpence
                      //         ).toFixed(2)}
                      //         disabled
                      //       />
                      //       {errors.telephoneExpence && (
                      //         <div className="mt-2 text-danger">
                      //           {typeof errors.telephoneExpence.message ===
                      //             "string" && errors.telephoneExpence.message}
                      //         </div>
                      //       )}
                      //     </div>
                      //     <div className="input-form flex items-center justify-center w-[12.5%]">
                      //       <h1 className="items-center text-right w-full">
                      //         {parseFloat(
                      //           telephoneExpence * 12
                      //         ).toFixed(2)}
                      //       </h1>
                      //     </div>
                      //   </div>
                      //   <div className="flex justify-between mt-5">
                      //     <div className="input-form flex items-center w-[28.5%]">
                      //       <h1 className="flex items-center">
                      //         Employee In Hand
                      //       </h1>
                      //     </div>
                      //     <div className="input-form w-[25%]">
                      //       {/* Number input for HRA Percentage */}
                      //       <FormInput
                      //         {...register("employeeInHandSal")}
                      //         id="validation-form-employeeInHandSal"
                      //         type="number"
                      //         name="employeeInHandSal"
                      //         className={clsx({
                      //           "border-danger": errors.employeeInHandSal,
                      //         })}
                      //         placeholder="Employee In Hand Salary"
                      //         value={employeeInHandSal}
                      //         onChange={(e) => {
                      //           setEmployeeInHandSal(e.target.value);
                      //         }}
                      //         disabled
                      //       />
                      //       {errors.employeeInHandSal && (
                      //         <div className="mt-2 text-danger">
                      //           {typeof errors.employeeInHandSal.message ===
                      //             "string" && errors.employeeInHandSal.message}
                      //         </div>
                      //       )}
                      //     </div>

                      //     <div className="input-form w-[25%] pl-[2%]">
                      //       <FormInput
                      //         type="number"
                      //         className={clsx({
                      //           "border-danger": errors.employeeInHandSal,
                      //         })}
                      //         placeholder={parseFloat(
                      //           basicSal * (employeeInHandSal / 100.0)
                      //         ).toFixed(2)}
                      //         disabled
                      //       />
                      //       {errors.employeeInHandSal && (
                      //         <div className="mt-2 text-danger">
                      //           {typeof errors.employeeInHandSal.message ===
                      //             "string" && errors.employeeInHandSal.message}
                      //         </div>
                      //       )}
                      //     </div>
                      //     <div className="input-form flex items-center justify-center w-[12.5%]">
                      //       <h1 className="items-center text-right w-full">
                      //         {parseFloat(
                      //           basicSal * (employeeInHandSal / 100.0) * 12
                      //         ).toFixed(2)}
                      //       </h1>
                      //     </div>
                      //   </div>
                      //   <div className="flex justify-between mt-5">
                      //     <div className="input-form flex items-center w-[28.5%]">
                      //       <h1 className="flex items-center">
                      //         Gross Salary
                      //       </h1>
                      //     </div>
                      //     <div className="input-form w-[25%]">
                      //       {/* Number input for HRA Percentage */}
                      //       <FormInput
                      //         {...register("grossSal")}
                      //         id="validation-form-grossSal"
                      //         type="number"
                      //         name="grossSal"
                      //         className={clsx({
                      //           "border-danger": errors.grossSal,
                      //         })}
                      //         placeholder="Gross Salary"
                      //         value={grossSal}
                      //         onChange={(e) => {
                      //           setGrossSal(e.target.value);
                      //         }}
                      //         disabled
                      //       />
                      //       {errors.grossSal && (
                      //         <div className="mt-2 text-danger">
                      //           {typeof errors.grossSal.message ===
                      //             "string" && errors.grossSal.message}
                      //         </div>
                      //       )}
                      //     </div>

                      //     <div className="input-form w-[25%] pl-[2%]">
                      //       <FormInput
                      //         type="number"
                      //         className={clsx({
                      //           "border-danger": errors.grossSal,
                      //         })}
                      //         placeholder={grossSal}
                      //         disabled
                      //       />
                      //       {errors.grossSal && (
                      //         <div className="mt-2 text-danger">
                      //           {typeof errors.grossSal.message ===
                      //             "string" && errors.grossSal.message}
                      //         </div>
                      //       )}
                      //     </div>
                      //     <div className="input-form flex items-center justify-center w-[12.5%]">
                      //       <h1 className="items-center text-right w-full">
                      //         {parseFloat(
                      //           totalCTC * (grossSal / 100.0) * 12
                      //         ).toFixed(2)}
                      //       </h1>
                      //     </div>
                      //   </div>
                       
                      //   <div className="flex justify-between mt-10 bg-[#B9D8F2] pt-5 pb-4 pl-4  pr-5  rounded text-white">
                      //     <div className="input-form flex items-center w-[28.5%]">
                      //       <h1 className="flex items-center">
                      //         Cost To Company
                      //       </h1>
                      //     </div>
                      //     <div className="input-form w-[25%]">
                      //       <h1 className="items-center w-full"></h1>
                      //     </div>
                      //     <div className="input-form w-[25%] pl-[2%]">
                      //       <h1 className="items-center w-full">
                      //         ₹{" "}
                      //         {
                      //           basicSal != null &&
                      //           parseFloat(
                      //             grossSal + esiEmployerContribution + employerPFContribution)}
                      //       </h1>
                      //     </div>
                      //     <div className="input-form flex items-center justify-center w-[12.5%]">
                      //       <h1 className="items-center text-right w-full">
                      //         ₹{" "}
                      //         {
                      //           basicSal != null &&
                      //           parseFloat(grossSal + esiEmployerContribution + employerPFContribution) * 12}
                      //       </h1>
                      //     </div>
                      //   </div>
                      // </div>

                      <div>
                        <div className="flex justify-between mt-5">
                          
                        </div>
                        <div className="flex justify-between mt-10 w-full">
                          <div className="input-form">Salary Components</div>
                          <div className="input-form">
                            Calculation Type
                          </div>{" "}
                          <div className="input-form">Monthly Amount</div>{" "}
                          <div className="input-form">Annual Amount</div>
                        </div>
                        <div className="w-full mt-4 mb-4 h-1 bg-[#E2E8F0]"></div>
                        <div className="mt-0">
                          <div className="input-form w-1/4">
                            <h1 className="text-xl font-semibold">Earnings</h1>
                          </div>
                        </div>
                        <div className="flex justify-between mt-10">
                          <div className="input-form flex items-center w-[28.5%]">
                            <h1 className="flex items-center">Basic</h1>
                          </div>
                          <div className="input-form w-[25%]">
                            {/* Number input for Percentage of CTC */}
                            <FormInput
                              {...register("percentageOfCTC")}
                              id="validation-form-percentageOfCTC"
                              type="number"
                              name="percentageOfCTC"
                              className={clsx({
                                "border-danger": errors.percentageOfCTC,
                              })}
                              placeholder="Enter Basic Components"
                              value={basicSal}
                              onChange={(e) => {
                                setGrossSal(e.target.value);
                                setbasicSal(e.target.value);
                              }}
                            />
                            {errors.percentageOfCTC && (
                              <div className="mt-2 text-danger">
                                {typeof errors.percentageOfCTC.message ===
                                  "string" && errors.percentageOfCTC.message}
                              </div>
                            )}
                          </div>

                          <div className="input-form w-[25%] pl-[2%]">
                            <FormInput
                              type="number"
                              className={clsx({
                                "border-danger": errors.empFirstName,
                              })}
                              placeholder={basicSal}
                              disabled
                            />
                            {errors.empFirstName && (
                              <div className="mt-2 text-danger">
                                {typeof errors.empFirstName.message ===
                                  "string" && errors.empFirstName.message}
                              </div>
                            )}
                          </div>
                          <div className="input-form flex items-center justify-center w-[12.5%]">
                            <h1 className="items-center text-right w-full">
                              {parseFloat(
                                basicSal  * 12
                              ).toFixed(2)}
                            </h1>
                          </div>
                        </div>
                        <div className="flex justify-between mt-5">
                          <div className="input-form flex items-center w-[28.5%]">
                            <h1 className="flex items-center">
                              House Rent Allowance
                            </h1>
                          </div>
                          <div className="input-form w-[25%]">
                            {/* Number input for HRA Percentage */}
                            <FormInput
                              {...register("hraPercentage")}
                              id="validation-form-hraPercentage"
                              type="number"
                              name="hraPercentage"
                              className={clsx({
                                "border-danger": errors.hraPercentage,
                              })}
                              placeholder="HRA Percentage"
                              value={hraPercentage}
                              onChange={(e) => {
                                setHRAPercentage(e.target.value);
                              }}
                            />
                            {errors.hraPercentage && (
                              <div className="mt-2 text-danger">
                                {typeof errors.hraPercentage.message ===
                                  "string" && errors.hraPercentage.message}
                              </div>
                            )}
                          </div>

                          <div className="input-form w-[25%] pl-[2%]">
                            <FormInput
                              type="number"
                              className={clsx({
                                "border-danger": errors.empFirstName,
                              })}
                              placeholder={parseFloat(
                                hraPercentage
                              ).toFixed(2)}
                              disabled
                            />
                            {errors.empFirstName && (
                              <div className="mt-2 text-danger">
                                {typeof errors.empFirstName.message ===
                                  "string" && errors.empFirstName.message}
                              </div>
                            )}
                          </div>
                          <div className="input-form flex items-center justify-center w-[12.5%]">
                            <h1 className="items-center text-right w-full">
                              {parseFloat(
                                hraPercentage * 12
                              ).toFixed(2)}
                            </h1>
                          </div>
                        </div>
                        <div className="flex justify-between mt-5">
                          <div className="input-form flex items-center w-[28.5%]">
                            <h1 className="flex items-center">
                              Medical Allowance
                            </h1>
                          </div>
                          <div className="input-form w-[25%]">
                            {/* Number input for HRA Percentage */}
                            <FormInput
                              {...register("medicalAllowance")}
                              id="validation-form-medicalAllowance"
                              type="number"
                              name="hraPercentage"
                              className={clsx({
                                "border-danger": errors.hraPercentage,
                              })}
                              placeholder="Medical Allowance"
                              value={medicalAllowance}
                              onChange={(e) => {
                                setMedicalAmount(e.target.value);
                              }}
                            />
                            {errors.medicalAllowance && (
                              <div className="mt-2 text-danger">
                                {typeof errors.medicalAllowance.message ===
                                  "string" && errors.medicalAllowance.message}
                              </div>
                            )}
                          </div>

                          <div className="input-form w-[25%] pl-[2%]">
                            <FormInput
                              type="number"
                              className={clsx({
                                "border-danger": errors.medicalAllowance,
                              })}
                              placeholder={parseFloat(
                                medicalAllowance
                              ).toFixed(2)}
                              disabled
                            />
                            {errors.medicalAllowance && (
                              <div className="mt-2 text-danger">
                                {typeof errors.medicalAllowance.message ===
                                  "string" && errors.medicalAllowance.message}
                              </div>
                            )}
                          </div>
                          <div className="input-form flex items-center justify-center w-[12.5%]">
                            <h1 className="items-center text-right w-full">
                              {parseFloat(
                                medicalAllowance * 12
                              ).toFixed(2)}
                            </h1>
                          </div>
                        </div>
                        <div className="flex justify-between mt-5">
                          <div className="input-form flex items-center w-[28.5%]">
                            <h1 className="flex items-center">
                              Leave Travel Allowance
                            </h1>
                          </div>
                          <div className="input-form w-[25%]">
                            {/* Number input for HRA Percentage */}
                            <FormInput
                              {...register("leaveTravelAllowance")}
                              id="validation-form-leaveTravelAllowance"
                              type="number"
                              name="leaveTravelAllowance"
                              className={clsx({
                                "border-danger": errors.leaveTravelAllowance,
                              })}
                              placeholder="Leave Travel Allowance"
                              value={leaveTravelAllowance}
                              onChange={(e) => {
                                setLeaveTravelAllowance(e.target.value);
                              }}
                            />
                            {errors.leaveTravelAllowance && (
                              <div className="mt-2 text-danger">
                                {typeof errors.leaveTravelAllowance.message ===
                                  "string" && errors.leaveTravelAllowance.message}
                              </div>
                            )}
                          </div>

                          <div className="input-form w-[25%] pl-[2%]">
                            <FormInput
                              type="number"
                              className={clsx({
                                "border-danger": errors.leaveTravelAllowance,
                              })}
                              placeholder={parseFloat(
                                leaveTravelAllowance
                              ).toFixed(2)}
                              disabled
                            />
                            {errors.leaveTravelAllowance && (
                              <div className="mt-2 text-danger">
                                {typeof errors.leaveTravelAllowance.message ===
                                  "string" && errors.leaveTravelAllowance.message}
                              </div>
                            )}
                          </div>
                          <div className="input-form flex items-center justify-center w-[12.5%]">
                            <h1 className="items-center text-right w-full">
                              {parseFloat(
                                leaveTravelAllowance * 12
                              ).toFixed(2)}
                            </h1>
                          </div>
                        </div>
                        <div className="flex justify-between mt-5">
                          <div className="input-form flex items-center w-[28.5%]">
                            <h1 className="flex items-center">
                              Additional Benefits
                            </h1>
                          </div>
                          <div className="input-form w-[25%]">
                            {/* Number input for HRA Percentage */}
                            <FormInput
                              {...register("additionalBenefits")}
                              id="validation-form-additionalBenefits"
                              type="number"
                              name="additionalBenefits"
                              className={clsx({
                                "border-danger": errors.additionalBenefits,
                              })}
                              placeholder="Additional Benefilts"
                              value={additionalBenefits}
                              onChange={(e) => {
                                setAdditionalBenefits(e.target.value);
                              }}
                            />
                            {errors.additionalBenefits && (
                              <div className="mt-2 text-danger">
                                {typeof errors.additionalBenefits.message ===
                                  "string" && errors.additionalBenefits.message}
                              </div>
                            )}
                          </div>

                          <div className="input-form w-[25%] pl-[2%]">
                            <FormInput
                              type="number"
                              className={clsx({
                                "border-danger": errors.additionalBenefits,
                              })}
                              placeholder={parseFloat(
                                additionalBenefits
                              ).toFixed(2)}
                              disabled
                            />
                            {errors.additionalBenefits && (
                              <div className="mt-2 text-danger">
                                {typeof errors.additionalBenefits.message ===
                                  "string" && errors.additionalBenefits.message}
                              </div>
                            )}
                          </div>
                          <div className="input-form flex items-center justify-center w-[12.5%]">
                            <h1 className="items-center text-right w-full">
                              {parseFloat(
                                additionalBenefits * 12
                              ).toFixed(2)}
                            </h1>
                          </div>
                        </div>
                        <div className="flex justify-between mt-5">
                          <div className="input-form flex items-center w-[28.5%]">
                            <h1 className="flex items-center">
                              Performance Incentive
                            </h1>
                          </div>
                          <div className="input-form w-[25%]">
                            {/* Number input for HRA Percentage */}
                            <FormInput
                              {...register("performanceIncentive")}
                              id="validation-form-performanceIncentive"
                              type="number"
                              name="hraPercentage"
                              className={clsx({
                                "border-danger": errors.hraPercentage,
                              })}
                              placeholder="Performance Incentive"
                              value={performanceIncentive}
                              onChange={(e) => {
                                setPerformanceIncentive(e.target.value);
                              }}
                            />
                            {errors.performanceIncentive && (
                              <div className="mt-2 text-danger">
                                {typeof errors.performanceIncentive.message ===
                                  "string" && errors.performanceIncentive.message}
                              </div>
                            )}
                          </div>

                          <div className="input-form w-[25%] pl-[2%]">
                            <FormInput
                              type="number"
                              className={clsx({
                                "border-danger": errors.performanceIncentive,
                              })}
                              placeholder={parseFloat(
                                performanceIncentive
                              ).toFixed(2)}
                              disabled
                            />
                            {errors.performanceIncentive && (
                              <div className="mt-2 text-danger">
                                {typeof errors.performanceIncentive.message ===
                                  "string" && errors.performanceIncentive.message}
                              </div>
                            )}
                          </div>
                          <div className="input-form flex items-center justify-center w-[12.5%]">
                            <h1 className="items-center text-right w-full">
                              {parseFloat(
                                performanceIncentive * 12
                              ).toFixed(2)}
                            </h1>
                          </div>
                        </div>
                        <div className="flex justify-between mt-5">
                          <div className="input-form flex items-center w-[28.5%]">
                            <h1 className="flex items-center">
                              Employee PF Contribution @12
                            </h1>
                          </div>
                          <div className="input-form w-[25%]">
                            {/* Number input for HRA Percentage */}
                            <FormInput
                              {...register("employeePFContribution")}
                              id="validation-form-employeePFContribution"
                              type="number"
                              name="employeePFContribution"
                              className={clsx({
                                "border-danger": errors.employeePFContribution,
                              })}
                              placeholder={ (basicSal * 12)/100}
                              value={(basicSal * 12)/100}
                              onChange={(e) => {
                                setEmployeePFContribution(e.target.value);
                              }}
                              disabled
                            />
                            {errors.employeePFContribution && (
                              <div className="mt-2 text-danger">
                                {typeof errors.employeePFContribution.message ===
                                  "string" && errors.employeePFContribution.message}
                              </div>
                            )}
                          </div>

                          <div className="input-form w-[25%] pl-[2%]">
                            <FormInput
                              type="number"
                              className={clsx({
                                "border-danger": errors.employeePFContribution,
                              })}
                              placeholder={parseFloat(
                                (basicSal * 12)/100
                              ).toFixed(2)}
                              disabled
                            />
                            {errors.employeePFContribution && (
                              <div className="mt-2 text-danger">
                                {typeof errors.employeePFContribution.message ===
                                  "string" && errors.employeePFContribution.message}
                              </div>
                            )}
                          </div>
                          <div className="input-form flex items-center justify-center w-[12.5%]">
                            <h1 className="items-center text-right w-full">
                              {parseFloat(
                                ((basicSal * 12)/100)*12
                              ).toFixed(2)}
                            </h1>
                          </div>
                        </div>
                        <div className="flex justify-between mt-5">
                          <div className="input-form flex items-center w-[28.5%]">
                            <h1 className="flex items-center">
                            Employer PF Contribution @12
                            </h1>
                          </div>
                          <div className="input-form w-[25%]">
                            {/* Number input for HRA Percentage */}
                            <FormInput
                              {...register("employerPFContribution")}
                              id="validation-form-employerPFContribution"
                              type="number"
                              name="employerPFContribution"
                              className={clsx({
                                "border-danger": errors.employerPFContribution,
                              })}
                              placeholder={(basicSal * 12)/100}
                              value={(basicSal * 12)/100}
                              onChange={(e) => {
                                setEmployerPFContribution(e.target.value);
                              }}
                              disabled
                            />
                            {errors.employerPFContribution && (
                              <div className="mt-2 text-danger">
                                {typeof errors.employerPFContribution.message ===
                                  "string" && errors.employerPFContribution.message}
                              </div>
                            )}
                          </div>

                          <div className="input-form w-[25%] pl-[2%]">
                            <FormInput
                              type="number"
                              className={clsx({
                                "border-danger": errors.employerPFContribution,
                              })}
                              placeholder={parseFloat(
                                (basicSal * 12)/100
                              ).toFixed(2)}
                              disabled
                            />
                            {errors.employerPFContribution && (
                              <div className="mt-2 text-danger">
                                {typeof errors.employerPFContribution.message ===
                                  "string" && errors.employerPFContribution.message}
                              </div>
                            )}
                          </div>
                          <div className="input-form flex items-center justify-center w-[12.5%]">
                            <h1 className="items-center text-right w-full">
                              {parseFloat(
                                ((basicSal * 12)/100)  * 12
                              ).toFixed(2)}
                            </h1>
                          </div>
                        </div>
                        <div className="flex justify-between mt-5">
                          <div className="input-form flex items-center w-[28.5%]">
                            <h1 className="flex items-center">
                              ESI Employee Contrinution @0.5
                            </h1>
                          </div>
                          <div className="input-form w-[25%]">
                            {/* Number input for HRA Percentage */}
                            <FormInput
                              {...register("esiEmployeeContribution")}
                              id="validation-form-esiEmployeeContribution"
                              type="number"
                              name="esiEmployeeContribution"
                              className={clsx({
                                "border-danger": errors.esiEmployeeContribution,
                              })}
                              placeholder="ESI Employee Contrinution"
                              value={(basicSal * 0.75)/100}
                              onChange={(e) => {
                                setEsiEmployeeContribution(e.target.value);
                              }}
                              disabled
                            />
                            {errors.esiEmployeeContribution && (
                              <div className="mt-2 text-danger">
                                {typeof errors.esiEmployeeContribution.message ===
                                  "string" && errors.esiEmployeeContribution.message}
                              </div>
                            )}
                          </div>

                          <div className="input-form w-[25%] pl-[2%]">
                            <FormInput
                              type="number"
                              className={clsx({
                                "border-danger": errors.esiEmployeeContribution,
                              })}
                              placeholder={parseFloat(
                                (basicSal * 0.75)/100
                              ).toFixed(2)}
                              disabled
                            />
                            {errors.esiEmployeeContribution && (
                              <div className="mt-2 text-danger">
                                {typeof errors.esiEmployeeContribution.message ===
                                  "string" && errors.esiEmployeeContribution.message}
                              </div>
                            )}
                          </div>
                          <div className="input-form flex items-center justify-center w-[12.5%]">
                            <h1 className="items-center text-right w-full">
                              {parseFloat(
                                (basicSal * 0.75)/100 * 12
                              ).toFixed(2)}
                            </h1>
                          </div>
                        </div>
                        <div className="flex justify-between mt-5">
                          <div className="input-form flex items-center w-[28.5%]">
                            <h1 className="flex items-center">
                              ESI Employer Contrinution @3.25
                            </h1>
                          </div>
                          <div className="input-form w-[25%]">
                            {/* Number input for HRA Percentage */}
                            <FormInput
                              {...register("esiEmployerContribution")}
                              id="validation-form-esiEmployerContribution"
                              type="number"
                              name="esiEmployerContribution"
                              className={clsx({
                                "border-danger": errors.esiEmployerContribution,
                              })}
                              placeholder="ESI Employer Contrinution"
                              value={(basicSal * 3.25)/100 }
                              onChange={(e) => {
                                setEsiEmployerContribution(e.target.value);
                              }}
                              disabled
                            />
                            {errors.esiEmployerContribution && (
                              <div className="mt-2 text-danger">
                                {typeof errors.esiEmployerContribution.message ===
                                  "string" && errors.esiEmployerContribution.message}
                              </div>
                            )}
                          </div>

                          <div className="input-form w-[25%] pl-[2%]">
                            <FormInput
                              type="number"
                              className={clsx({
                                "border-danger": errors.esiEmployerContribution,
                              })}
                              placeholder={parseFloat(
                                (basicSal * 3.25)/100 
                              ).toFixed(2)}
                              disabled
                            />
                            {errors.esiEmployerContribution && (
                              <div className="mt-2 text-danger">
                                {typeof errors.esiEmployerContribution.message ===
                                  "string" && errors.esiEmployerContribution.message}
                              </div>
                            )}
                          </div>
                          <div className="input-form flex items-center justify-center w-[12.5%]">
                            <h1 className="items-center text-right w-full">
                              {parseFloat(
                                (basicSal * 3.25)/100  * 12
                              ).toFixed(2)}
                            </h1>
                          </div>
                        </div>
                        <div className="flex justify-between mt-5">
                          <div className="input-form flex items-center w-[28.5%]">
                            <h1 className="flex items-center">
                              Stock Option
                            </h1>
                          </div>
                          <div className="input-form w-[25%]">
                            {/* Number input for HRA Percentage */}
                            <FormInput
                              {...register("stockAmount")}
                              id="validation-form-stockAmount"
                              type="number"
                              name="stockAmount"
                              className={clsx({
                                "border-danger": errors.stockAmount,
                              })}
                              placeholder="Stock Option"
                              value={stockAmount}
                              onChange={(e) => {
                                setStockAmount(e.target.value);
                              }}
                            />
                            {errors.esiEmployerContribution && (
                              <div className="mt-2 text-danger">
                                {typeof errors.stockAmount.message ===
                                  "string" && errors.stockAmount.message}
                              </div>
                            )}
                          </div>

                          <div className="input-form w-[25%] pl-[2%]">
                            <FormInput
                              type="number"
                              className={clsx({
                                "border-danger": errors.stockAmount,
                              })}
                              placeholder={parseFloat(
                                stockAmount
                              ).toFixed(2)}
                              disabled
                            />
                            {errors.stockAmount && (
                              <div className="mt-2 text-danger">
                                {typeof errors.stockAmount.message ===
                                  "string" && errors.stockAmount.message}
                              </div>
                            )}
                          </div>
                          <div className="input-form flex items-center justify-center w-[12.5%]">
                            <h1 className="items-center text-right w-full">
                              {parseFloat(
                                stockAmount * 12
                              ).toFixed(2)}
                            </h1>
                          </div>
                        </div>
                        <div className="flex justify-between mt-5">
                          <div className="input-form flex items-center w-[28.5%]">
                            <h1 className="flex items-center">
                              Car
                            </h1>
                          </div>
                          <div className="input-form w-[25%]">
                            {/* Number input for HRA Percentage */}
                            <FormInput
                              {...register("carAmount")}
                              id="validation-form-carAmount"
                              type="number"
                              name="carAmount"
                              className={clsx({
                                "border-danger": errors.carAmount,
                              })}
                              placeholder={carAmount}
                              value={carAmount}
                              onChange={(e) => {
                                setCarAmount(e.target.value);
                              }}
                            />
                            {errors.carAmount && (
                              <div className="mt-2 text-danger">
                                {typeof errors.carAmount.message ===
                                  "string" && errors.carAmount.message}
                              </div>
                            )}
                          </div>

                          <div className="input-form w-[25%] pl-[2%]">
                            <FormInput
                              type="number"
                              className={clsx({
                                "border-danger": errors.carAmount,
                              })}
                              placeholder={parseFloat(carAmount).toFixed(2)}
                              disabled
                            />
                            {errors.carAmount && (
                              <div className="mt-2 text-danger">
                                {typeof errors.carAmount.message ===
                                  "string" && errors.carAmount.message}
                              </div>
                            )}
                          </div>
                          <div className="input-form flex items-center justify-center w-[12.5%]">
                            <h1 className="items-center text-right w-full">
                              {parseFloat(
                                carAmount * 12
                              ).toFixed(2)}
                            </h1>
                          </div>
                        </div>
                        <div className="flex justify-between mt-5">
                          <div className="input-form flex items-center w-[28.5%]">
                            <h1 className="flex items-center">
                              Telephone
                            </h1>
                          </div>
                          <div className="input-form w-[25%]">
                            {/* Number input for HRA Percentage */}
                            <FormInput
                              {...register("telephoneExpence")}
                              id="validation-form-telephoneExpence"
                              type="number"

                              name="telephoneExpence"
                              className={clsx({
                                "border-danger": errors.telephoneExpence,
                              })}
                              placeholder="Telephone Expences"
                              value={telephoneExpence}
                              onChange={(e) => {
                                setTelephoneExpence(e.target.value);
                              }}
                            />
                            {errors.telephoneExpence && (
                              <div className="mt-2 text-danger">
                                {typeof errors.telephoneExpence.message ===
                                  "string" && errors.telephoneExpence.message}
                              </div>
                            )}
                          </div>

                          <div className="input-form w-[25%] pl-[2%]">
                            <FormInput
                              type="number"
                              className={clsx({
                                "border-danger": errors.telephoneExpence,
                              })}
                              placeholder={parseFloat(
                                telephoneExpence
                              ).toFixed(2)}
                              disabled
                            />
                            {errors.telephoneExpence && (
                              <div className="mt-2 text-danger">
                                {typeof errors.telephoneExpence.message ===
                                  "string" && errors.telephoneExpence.message}
                              </div>
                            )}
                          </div>
                          <div className="input-form flex items-center justify-center w-[12.5%]">
                            <h1 className="items-center text-right w-full">
                              {parseFloat(
                                telephoneExpence * 12
                              ).toFixed(2)}
                            </h1>
                          </div>
                        </div>
                        <div className="flex justify-between mt-5">
                          <div className="input-form flex items-center w-[28.5%]">
                            <h1 className="flex items-center">
                              Employee In Hand
                            </h1>
                          </div>
                          <div className="input-form w-[25%]">
                            {/* Number input for HRA Percentage */}
                            <FormInput
                              {...register("employeeInHandSal")}
                              id="validation-form-employeeInHandSal"
                              type="number"
                              name="employeeInHandSal"
                              className={clsx({
                                "border-danger": errors.employeeInHandSal,
                              })}
                              placeholder={ basicSal - employerPFContribution - esiEmployerContribution}
                              value= { basicSal - employerPFContribution - esiEmployerContribution}
                              onChange={(e) => {
                                setEmployeeInHandSal(e.target.value);
                              }}
                              disabled
                            />
                            {errors.employeeInHandSal && (
                              <div className="mt-2 text-danger">
                                {typeof errors.employeeInHandSal.message ===
                                  "string" && errors.employeeInHandSal.message}
                              </div>
                            )}
                          </div>

                          <div className="input-form w-[25%] pl-[2%]">
                            <FormInput
                              type="number"
                              className={clsx({
                                "border-danger": errors.employeeInHandSal,
                              })}
                              placeholder={parseFloat(
                                basicSal - employerPFContribution - esiEmployerContribution
                              ).toFixed(2)}
                              disabled
                            />
                            {errors.employeeInHandSal && (
                              <div className="mt-2 text-danger">
                                {typeof errors.employeeInHandSal.message ===
                                  "string" && errors.employeeInHandSal.message}
                              </div>
                            )}
                          </div>
                          <div className="input-form flex items-center justify-center w-[12.5%]">
                            <h1 className="items-center text-right w-full">
                              {parseFloat(
                                (basicSal - employerPFContribution - esiEmployerContribution) * 12
                              ).toFixed(2)}
                            </h1>
                          </div>
                        </div>
                        <div className="flex justify-between mt-5">
                          <div className="input-form flex items-center w-[28.5%]">
                            <h1 className="flex items-center">
                              Gross Salary
                            </h1>
                          </div>
                          <div className="input-form w-[25%]">
                            {/* Number input for HRA Percentage */}
                            <FormInput
                              {...register("grossSal")}
                              id="validation-form-grossSal"
                              type="number"
                              name="grossSal"
                              className={clsx({
                                "border-danger": errors.grossSal,
                              })}
                              placeholder="Gross Salary"
                              value={grossSal}
                              onChange={(e) => {
                                setGrossSal(e.target.value);
                              }}
                              disabled
                            />
                            {errors.grossSal && (
                              <div className="mt-2 text-danger">
                                {typeof errors.grossSal.message ===
                                  "string" && errors.grossSal.message}
                              </div>
                            )}
                          </div>

                          <div className="input-form w-[25%] pl-[2%]">
                            <FormInput
                              type="number"
                              className={clsx({
                                "border-danger": errors.grossSal,
                              })}
                              placeholder={
                                parseFloat(
                                  grossSal 
                                ).toFixed(2)}
                              disabled
                            />
                            {errors.grossSal && (
                              <div className="mt-2 text-danger">
                                {typeof errors.grossSal.message ===
                                  "string" && errors.grossSal.message}
                              </div>
                            )}
                          </div>
                          <div className="input-form flex items-center justify-center w-[12.5%]">
                            <h1 className="items-center text-right w-full">
                              {parseFloat(
                                grossSal  * 12
                              ).toFixed(2)}
                            </h1>
                          </div>
                        </div>
                       
                        <div className="flex justify-between mt-10 bg-[#B9D8F2] pt-5 pb-4 pl-4  pr-5  rounded text-white">
                          <div className="input-form flex items-center w-[28.5%]">
                            <h1 className="flex items-center">
                              Cost To Company
                            </h1>
                          </div>
                          <div className="input-form w-[25%]">
                            <h1 className="items-center w-full"></h1>
                          </div>
                          <div className="input-form w-[25%] pl-[2%]">
                            <h1 className="items-center w-full">
                              ₹{" "}
                              {
                                basicSal != null &&
                                parseFloat(
                                  basicSal + esiEmployerContribution + employerPFContribution)}
                            </h1>
                          </div>
                          <div className="input-form flex items-center justify-center w-[12.5%]">
                            <h1 className="items-center text-right w-full">
                              ₹{" "}
                              {
                                basicSal != null &&
                                parseFloat((basicSal + esiEmployerContribution + employerPFContribution)*12)}
                            </h1>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentState === 2 && (
                      <div>
                        {/* Email ID , Phone number */}
                        <div className="flex justify-center mt-4">
                          <div className="input-form w-1/2">
                            <FormInput
                              {...register("createdBy")}
                              id="validation-form-empID"
                              type="hidden"
                              name="createdBy"
                              value=""
                            />
                            <FormLabel
                              htmlFor="validation-form-empEmail"
                              className="flex flex-col w-full sm:flex-row"
                            >
                              Personal Email Address
                            </FormLabel>
                            <FormInput
                              {...register("personalEmailAddress")}
                              id="validation-form-empEmail"
                              type="text"
                              name="personalEmailAddress"
                              className={clsx({
                                "border-danger": errors.personalEmailAddress,
                              })}
                              placeholder="Employee Email"
                            />
                            {errors.personalEmailAddress && (
                              <div className="mt-2 text-danger">
                                {typeof errors.personalEmailAddress.message ===
                                  "string" &&
                                  errors.personalEmailAddress.message}
                              </div>
                            )}
                          </div>

                          <div className="input-form w-1/2 pl-2">
                            <FormLabel
                              htmlFor="validation-form-empPhone"
                              className="flex flex-col w-full sm:flex-row"
                            >
                              Mobile Number
                            </FormLabel>
                            <FormInput
                              {...register("personalMobileNumber")}
                              id="validation-form-empPhone"
                              type="tel"
                              name="personalMobileNumber"
                              className={clsx("w-full", {
                                "border-danger": errors.personalMobileNumber,
                              })}
                            />
                            {errors.personalMobileNumber && (
                              <div className="mt-2 text-danger">
                                {typeof errors.personalMobileNumber.message ===
                                  "string" &&
                                  errors.personalMobileNumber.message}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-center mt-4">
                          <div className="input-form w-1/2">
                            <FormInput
                              {...register("createdBy")}
                              id="validation-form-empDob"
                              type="hidden"
                              name="createdBy"
                              value=""
                            />
                            <FormLabel
                              htmlFor="validation-form-empDob"
                              className="flex flex-col w-full sm:flex-row"
                            >
                              Date of Birth
                            </FormLabel>
                            <FormInput
                              {...register("dateOfBirth")}
                              id="validation-form-empDob"
                              type="date"
                              name="dateOfBirth"
                              className={clsx({
                                "border-danger": errors.dateOfBirth,
                              })}
                              placeholder="Employee DOB"
                              onChange={(e)=>{ageCalculate(e)}}
                            />
                            {errors.dateOfBirth && (
                              <div className="mt-2 text-danger">
                                {typeof errors.dateOfBirth.message ===
                                  "string" && errors.dateOfBirth.message}
                              </div>
                            )}
                          </div>

                          <div className="input-form w-1/2 pl-2">
                            <FormLabel
                              htmlFor="validation-form-age"
                              className="flex flex-col w-full sm:flex-row"
                            >
                              {"Age (in Years)"}
                            </FormLabel>
                            <FormInput
                              {...register("age")}
                              id="validation-form-age"
                              type="number"
                              name="age"
                              value={calAge}
                              className={clsx("w-full", {
                                "border-danger": errors.age,
                              })}
                              disabled
                            />
                            {/* {errors.age && (
                              <div className="mt-2 text-danger">
                                {typeof errors.age.message === "string" &&
                                  errors.age.message}
                              </div>
                            )} */}
                          </div>
                        </div>

                        <div className="flex justify-center mt-4">
                          <div className="input-form w-1/2">
                            <FormInput
                              {...register("createdBy")}
                              id="validation-form-empID"
                              type="hidden"
                              name="createdBy"
                              value=""
                            />
                            <FormLabel
                              htmlFor="validation-form-fatherName"
                              className="flex flex-col w-full sm:flex-row"
                            >
                              Father Name
                            </FormLabel>
                            <FormInput
                              {...register("fatherName")}
                              id="validation-form-fatherName"
                              type="text"
                              name="fatherName"
                              className={clsx({
                                "border-danger": errors.fatherName,
                              })}
                              placeholder="Father Name"
                            />
                            {errors.fatherName && (
                              <div className="mt-2 text-danger">
                                {typeof errors.fatherName.message ===
                                  "string" && errors.fatherName.message}
                              </div>
                            )}
                          </div>
                          <div className="input-form w-1/2 pl-2">
                            <FormInput
                              {...register("createdBy")}
                              id="validation-form-empID"
                              type="hidden"
                              name="createdBy"
                              value=""
                            />
                            <FormLabel
                              htmlFor="validation-form-motherName"
                              className="flex flex-col w-full sm:flex-row"
                            >
                              Mother Name
                            </FormLabel>
                            <FormInput
                              {...register("motherName")}
                              id="validation-form-motherName"
                              type="text"
                              name="motherName"
                              className={clsx({
                                "border-danger": errors.fatherName,
                              })}
                              placeholder="Mother Name"
                            />
                            {errors.motherName && (
                              <div className="mt-2 text-danger">
                                {typeof errors.motherName.message ===
                                  "string" && errors.motherName.message}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-center mt-4">
                          <div className="input-form w-1/2">
                            <FormLabel
                              htmlFor="validation-form-adhaar"
                              className="flex flex-col w-full sm:flex-row"
                            >
                              Adhaar Number
                            </FormLabel>
                            <FormInput
                              {...register("adhaar")}
                              id="validation-form-adhaar"
                              type="text"
                              name="adhaar"
                              className={clsx("w-full", {
                                "border-danger": errors.pan,
                              })}
                              placeholder="Adhaar Number"
                            />
                            {errors.adhaar && (
                              <div className="mt-2 text-danger">
                                {typeof errors.adhaar.message === "string" &&
                                  errors.adhaar.message}
                              </div>
                            )}
                          </div>
                          <div className="input-form w-1/2 pl-2">
                            <FormLabel
                              htmlFor="validation-form-pan"
                              className="flex flex-col w-full sm:flex-row"
                            >
                              PAN
                            </FormLabel>
                            <FormInput
                              {...register("pan")}
                              id="validation-form-pan"
                              type="text"
                              name="pan"
                              className={clsx("w-full", {
                                "border-danger": errors.pan,
                              })}
                              placeholder="PAN"
                            />
                            {errors.pan && (
                              <div className="mt-2 text-danger">
                                {typeof errors.pan.message === "string" &&
                                  errors.pan.message}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-center mt-4">
                          <div className="input-form w-full">
                            <FormLabel
                              htmlFor="validation-form-empAddress"
                              className="flex flex-col w-full sm:flex-row"
                            >
                              Residential Address
                            </FormLabel>
                            <FormInput
                              {...register("residentialAddress")}
                              id="validation-form-empAddress"
                              type="text"
                              name="residentialAddress"
                              className={clsx({
                                "border-danger": errors.residentialAddress,
                              })}
                              placeholder="Address 1"
                            />
                            {errors.residentialAddress && (
                              <div className="mt-2 text-danger">
                                {typeof errors.residentialAddress.message ===
                                  "string" && errors.residentialAddress.message}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-center mt-4">
                          <div className="input-form w-full">
                            <FormInput
                              {...register("residentialAddress2")}
                              id="validation-form-residentialAddress2"
                              type="text"
                              name="residentialAddress2"
                              className={clsx({
                                "border-danger": errors.residentialAddress,
                              })}
                              placeholder="Address2"
                            />
                          </div>
                        </div>

                        <div className="flex justify-center mt-4">
                          {/* <div className="input-form w-1/3">
                            <FormSelect
                              {...register("country")}
                              id="validation-form-empCountry"
                              name="state"
                              className={clsx("border", {
                                "border-danger": errors.state,
                                "border-gray-300": !errors.state,
                              })}
                              value={countryVal}
                              onChange={(e) => {
                                setCountryVal(e.target.value);
                              }}
                            >
                              <option value="" disabled>
                                Select a Country
                              </option>

                              {countryData.data.map((item, i) => {
                                console.log(countryData);
                                return (
                                  <option
                                    value={item.countrycode}
                                    key={item.id}
                                  >
                                    {item.countryname}
                                  </option>
                                );
                              })}
                            </FormSelect>

                            {errors.state && (
                              <div className="mt-2 text-danger">
                                {typeof errors.state.message === "string" &&
                                  errors.state.message}
                              </div>
                            )}
                          </div> */}
                          <div className="col-span-4 input-form pl-2 pr-2 w-1/4">
                            <FormSelect 
                              {...register("country")}
                              id="country"
                              name="country"
                              className="sm:mr-2"
                              onChange={e => setCountryVal(e.target.value)} 
                              value={countryVal}
                              aria-label="Default select example">
                                {_.take(countryData.data, countryData.data.length).map((item, Key) => {
                                  return <option  value={item.countrycode}
                                  key={item.id}>{item.countryname}</option>
                                })}
                            </FormSelect>                            
                            {/* {errors.countryId && (
                              <div className="mt-2 text-danger">
                                {typeof errors.countryId.message === "string" &&
                                  errors.countryId.message}
                              </div>
                            )} */}
                          </div>
                          <div className="col-span-4 input-form pl-2 pr-2 w-1/4">
                            <FormSelect 
                              {...register("state")}
                              id="state"
                              name="state"
                              className="sm:mr-2"
                              onChange={e => setStateVal(e.target.value)} 
                              value={stateVal}
                              aria-label="Default select example">
                                {_.take(stateData.data, stateData.data.length).map((item, Key) => {
                                  return <option  value={item.countryId}
                                  key={item.id}>{item.stateName}</option>
                                })}
                            </FormSelect>                            
                            {/* {errors.countryId && (
                              <div className="mt-2 text-danger">
                                {typeof errors.countryId.message === "string" &&
                                  errors.countryId.message}
                              </div>
                            )} */}
                          </div>
                         
                          <div className="col-span-4 input-form pl-2 pr-2 w-1/4">
                            <FormSelect 
                              {...register("city")}
                              id="city"
                              name="city"
                              className="sm:mr-2"
                              onChange={e => setCity(e.target.value)} 
                              value={countryVal}
                              aria-label="Default select example">
                                {_.take(cityData.data, cityData.data.length).map((item, Key) => {
                                  return <option  value={item.id}
                                  key={item.id}>{item.cityName}</option>
                                })}
                            </FormSelect>                            
                            {/* {errors.countryId && (
                              <div className="mt-2 text-danger">
                                {typeof errors.countryId.message === "string" &&
                                  errors.countryId.message}
                              </div>
                            )} */}
                          </div>
                          
                          {/* <div className="input-form w-1/4 pl-2">
                            <FormSelect
                              {...register("city")}
                              id="validation-form-empCity"
                              name="city"
                              className={clsx("border", {
                                "border-danger": errors.city,
                                "border-gray-300": !errors.city,
                              })}
                              onChange={(e) => {
                                setCity(e.target.value);
                              }}
                              value={city}
                            >
                              <option value="" disabled>
                                Select a City
                              </option>
                              {cityData.data.map((item, i) => (
                                
                                <option value={item.id} key={i}
                                  selected
                                >
                                  {item.cityName}
                                </option>
                              ))}
                            </FormSelect>
                            {errors.city && (
                              <div className="mt-2 text-danger">
                                {typeof errors.city.message === "string" &&
                                  errors.city.message}
                              </div>
                            )}
                          </div> */}
                          
                         
                          

                          
                          <div className="input-form w-1/4 pl-2 pr-2">
                            <FormInput
                              {...register("pinCode")}
                              id="validation-form-empPinCode"
                              type="text"
                              name="pinCode"
                              className={clsx({
                                "border-danger": errors.pinCode,
                              })}
                              placeholder="PIN Code"
                            />
                            {errors.pinCode && (
                              <div className="mt-2 text-danger">
                                {typeof errors.pinCode.message === "string" &&
                                  errors.pinCode.message}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {currentState === 3 && (
                      <div>
                        <div className="flex justify-left mt-4">
                          <div className="input-form w-1/1">
                            <div className="flex flex-col w-full sm:flex-row">
                              <b>How you want to pay this Employee*</b>
                            </div>
                          </div>
                        </div>
                        <hr className="mt-4" />
                        <div
                          className={
                            payType == "Direct Deposit"
                              ? `flex justify-left pt-4 pb-4 bg-[#F1F5F9] cursor-auto pl-4 pr-4`
                              : `flex justify-left pt-4 pb-4 bg-[white] cursor-pointer pl-4 pr-4`
                          }
                          onClick={() => {
                            setPayType("Direct Deposit");
                          }}
                        >
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                              />
                            </svg>
                          </div>
                          <div className="input-form w-1/1 ml-3 mt-1 flex w-full pr-1/4 space-between">
                            <div className="flex flex-col w-full sm:flex-row">
                              {"Direct Deposit(Automated Process)"}
                            </div>
                            <a className="text-sm word-wrap underline whitespace-nowrap">
                              Configure Now
                            </a>
                          </div>
                        </div>
                        <div
                          className={
                            payType == "Bank Transfer"
                              ? `flex justify-left pt-4 pb-4 bg-[#F1F5F9] cursor-auto align-center pl-4 pr-4`
                              : `flex justify-left pt-4 pb-4 bg-[white] cursor-pointer align-center pl-4 pr-4`
                          }
                          style={{ borderRadius: "10px" }}
                          onClick={() => {
                            setPayType("Bank Transfer");
                          }}
                        >
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
                              />
                            </svg>
                          </div>
                          <div className="input-form w-1/1 align-center ml-3 mt-1  flex w-full pr-1/4 space-between">
                            <div className="flex flex-col w-full sm:flex-row">
                              {"Bank Transfer"}
                            </div>

                            {payType == "Bank Transfer" ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                              </svg>
                            )}
                          </div>
                        </div>

                        <div
                          className={
                            payType == "Cheque"
                              ? `flex justify-left pt-4 pb-4 bg-[#F1F5F9] cursor-auto pl-4 pr-4`
                              : `flex justify-left pt-4 pb-4 bg-[white] cursor-pointer pl-4 pr-4`
                          }
                          onClick={() => {
                            setPayType("Cheque");
                          }}
                        >
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                              />
                            </svg>
                          </div>
                          <div className="input-form w-1/1 ml-3 mt-1 flex w-full pr-1/4 space-between">
                            <div className="flex flex-col w-full sm:flex-row">
                              {"Cheque"}
                            </div>
                            {payType == "Cheque" ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                        <hr className="mt-4" />
                      </div>
                    )}
                    {currentState == 3 ? (
                      <Button
                        variant="primary"
                        // onClick={(e) => {
                        //   onSubmit1(e);
                        // }}
                        type="submit"
                        className="mt-5  mr-1"
                      >
                        Save & Continue
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={() => {
                          setCurrentState(currentState + 1);
                        }}
                        className="mt-5  mr-1"
                        type="button"
                      >
                        Continue
                      </Button>
                    )}

                    {currentState > 0 && (
                      <Button
                        variant="secondary"
                        onClick={() => {
                          if (currentState == 3) {
                            setPayType("");
                          }
                          if (currentState > 0)
                            setCurrentState(currentState - 1);
                        }}
                        className="mt-5  mr-1"
                        type="button"
                      >
                        Back
                      </Button>
                    )}
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

export default editEmployee;
