//@ts-nocheck
import {
    PreviewComponent,
    Preview,
  } from "../../../base-components/PreviewComponent";
  import {
    FormCheck,
    FormInput,
    FormTextarea,
    FormHelp,
    FormInline,
    FormLabel,
    FormSelect,
    FormSwitch,
    InputGroup,
  } from "../../../base-components/Form";
  import Table from "../../../base-components/Table";
  import Button from "../../../base-components/Button";
  //import Litepicker from "../../base-components/Litepicker";
  import Notification from "../../../base-components/Notification";
  import Lucide from "../../../base-components/Lucide";
  import { useForm } from "react-hook-form";
  import Toastify from "toastify-js";
  import clsx from "clsx";
  import { yupResolver } from "@hookform/resolvers/yup";
  import * as yup from "yup";
  import { useParams } from "react-router-dom";
  import React, { useState, useRef, useEffect } from "react";
  import { Link } from "react-router-dom";
  import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
  import { createLoan,getLoan,fetchAllLoans} from "./loanSlice";
  import { getEmployee } from "../employeeSlice";
  import _ from "lodash";
  import { useNavigate } from "react-router-dom";
  import { format } from "date-fns";
  //import { fetchAllEmployee, deleteEmployee } from "./employeeSlice";
  
  const AddLoans = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [loanForm,setLoanFormOpen] = useState(false)
    const { loansData } = useAppSelector((state) => state.loan);
    const { data } = useAppSelector((state) => state.employee); 
    const dispatch = useAppDispatch();
    const showLoanForm = (val) =>{
      setLoanFormOpen(val)
    }

   

    useEffect(() => {
      dispatch(getLoan(params.id));
    }, []);

    useEffect(()=>{
      dispatch(getEmployee(params.id));
    },[])

    console.log(loansData.length)

    const schema = yup
      .object({
        empName:yup.string(),
        loanName: yup.string()
        .required("Loan Name is a required field"),
        loanAmount: yup.string()
        .required("Loan Amount is a required field"),
        preRequsiteAmount: yup.string().required("Prerequisite Amount is a required field"),
        disbursementDate: yup.string().required("Disbursement Date is a required field"),
        reason: yup.string().required("Reason  is a required field"),
        paidThroughAmount:yup.string().required('required field')
        
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
  
    const onSubmit = async (e) => {
      e.preventDefault();
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
        
        console.log(data.empID)
        let formData = {
          empName: loansData.empName,
          loanName: getValues("loanName"),
          loanAmount: getValues("loanAmount"),
          empId: params.id,
          preRequsiteAmount: getValues("preRequsiteAmount"),
          disbursementDate: getValues("disbursementDate"),
          loanReason: getValues("reason"),
          paidThroughAmount: getValues("paidThroughAmount"),
          exemptLoan:getValues("exemptLoan")  
        };
        console.log("Data: ", loansData);
        dispatch(createLoan(formData));
  
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
        navigate(`/loans/${data.id}`);
      }
    };
  

  
    return (
      <>
        <div className="flex items-center mt-8 intro-y">
          <h2 className="mr-auto text-lg font-medium">Loans History</h2>
        </div>
        <div>
            
            <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
            <Table className="border-spacing-y-[10px] border-separate -mt-2">
              <Table.Thead>
                <Table.Tr>
                <Table.Th className="border-b-0 whitespace-nowrap">
                    LOAN Name
                  </Table.Th>
                  <Table.Th className="border-b-0 whitespace-nowrap">
                    LOAN AMOUNT
                  </Table.Th>
                  <Table.Th className="border-b-0 whitespace-nowrap">
                    PREREQUISITE AMOUNT
                  </Table.Th>
                  <Table.Th className="border-b-0 whitespace-nowrap">
                    DISBURSEMENT ON
                  </Table.Th>
                  <Table.Th className="border-b-0 whitespace-nowrap">
                    LOAN REASON
                  </Table.Th>
                  <Table.Th className="border-b-0 whitespace-nowrap">
                    EXEMPTED
                  </Table.Th>
                  <Table.Th className="border-b-0 whitespace-nowrap">
                    CREATED ON
                  </Table.Th>
                  <Table.Th className="border-b-0 whitespace-nowrap">
                    UPDATED ON
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {loansData.length>0 ? 
                 ( _.take(loansData, loansData.length).map((item, i) => (
                    <Table.Tr key={i} className="intro-x">
                      <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                        {item[i].loanName}
                      </Table.Td>
                      <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                        {item[i].loanAmount}
                      </Table.Td>
                      <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                        {item[i].preRequsiteAmount}
                      </Table.Td>
                      <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                        {item[i].disbursementDate}
                      </Table.Td>
                      <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                        {item[i].loanReason}
                      </Table.Td>
                      <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                        {
                        item[i].exemptLoan == 'Y' ? "Yes" : "No"}
                      </Table.Td>
                      
                      <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                        {item[i].createdAt}
                      </Table.Td>
                      <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                        {item[i].updatedAt}
                      </Table.Td>
                    </Table.Tr>
                  ))):(<div>No previous loans found !!</div>)}
              </Table.Tbody>
            </Table>
          </div>
          
        </div>
        <div className="flex justify-center mt-4 pl-2 font-medium">
          
        <div className="w-full">
        <Button
            variant="primary"
            onClick={() => {
              showLoanForm(true)
            }}
            className="mt-5  mr-1"
            type="submit"
          >
            Apply Loan
        </Button></div>
        </div>
        { loanForm === true &&
          <div className="grid grid-cols-12 gap-6 mt-5">
          <div className="col-span-12 intro-y lg:col-span-12">
            {/* BEGIN: Form Validation */}
  
            <PreviewComponent className="intro-y box">
              <>
               
                <div className="p-5">
                  <Preview>
                    {/* BEGIN: Validation Form */}
                    <form
                      className="validate-form"
                      onSubmit={onSubmit}
                    >
                    <div>
                        {/* Email ID , Phone number */}
                        <div className="flex justify-center mt-4">
                        
                          <div className="input-form w-1/4">
                            <FormInput
                              {...register("createdBy")}
                              id="validation-form-empID"
                              type="hidden"
                              name="createdBy"
                              value=""
                            />
                            <FormLabel
                              htmlFor="validation-form-loanName"
                              className="flex flex-col w-full sm:flex-row"
                            >
                              Loan Name
                            </FormLabel>
                            <FormInput
                              {...register("loanName")}
                              id="validation-form-loanName"
                              type="text"
                              name="loanName"
                              className={clsx({
                                "border-danger": errors.loanName,
                              })}
                              placeholder="Loan Name"
                            />
                            {errors.loanName && (
                              <div className="mt-2 text-danger">
                                {typeof errors.loanName.message ===
                                  "string" &&
                                  errors.loanName.message}
                              </div>
                            )}
                          </div>

                          <div className="input-form w-1/4 pl-2">
                            <FormLabel
                              htmlFor="validation-form-prerequisiteRate"
                              className="flex flex-col w-full sm:flex-row"
                            >
                              Prerquisite Rate
                            </FormLabel>
                            <FormInput
                              {...register("preRequsiteAmount")}
                              id="validation-form-prerequisiteRate"
                              type="tel"

                              placeholder="Prerquisite Rate"
                              name="preRequsiteAmount"
                              className={clsx("w-full", {
                                "border-danger": errors.prerequisiteRate,
                              })}
                            />
                            {errors.prerequisiteRate && (
                              <div className="mt-2 text-danger">
                                {typeof errors.prerequisiteRate.message ===
                                  "string" &&
                                  errors.prerequisiteRate.message}
                              </div>
                            )}
                          </div>
                          <div className="input-form w-1/4 pl-2"></div>
                          <div className="input-form w-1/4 pl-2"></div>
                        </div>
                        <div className="flex justify-center mt-4">
                          {/* <div className="input-form w-1/4">
                            <FormInput
                              {...register("createdBy")}
                              id="validation-form-empName"
                              type="hidden"
                              name="createdBy"
                              value=""
                            />
                            <FormLabel
                              htmlFor="validation-form-empName"
                              className="flex flex-col w-full sm:flex-row"
                            >
                              Employee Name
                            </FormLabel>
                            <FormInput
                              {...register("empName")}
                              id="validation-form-empName"
                              type="text"
                              name="empName"
                              value={data.empName}
                              className={clsx({
                                "border-danger": errors.empName,
                              })}
                              placeholder="Employee Name"
                              disabled
                            />
                           
                            {errors.empName && (
                              <div className="mt-2 text-danger">
                                {typeof errors.empName.message ===
                                  "string" && errors.empName.message}
                              </div>
                            )}
                          </div> */}

                          <div className="input-form w-1/4 pl-2">
                            <FormLabel
                              htmlFor="validation-form-loan-amount"
                              className="flex flex-col w-full sm:flex-row"
                            >
                              Loan Amount
                            </FormLabel>
                            <FormInput
                              {...register("loanAmount")}
                              id="validation-form-loan-amount"
                              type="number"
                              name="loanAmount"
                              placeholder="Loan Amount"
                              className={clsx("w-full", {
                                "border-danger": errors.loanAmount,
                              })}
                            />
                            {errors.loanAmount && (
                              <div className="mt-2 text-danger">
                                {typeof errors.loanAmount.message === "string" &&
                                  errors.loanAmount.message}
                              </div>
                            )}
                          </div>
                          <div className="input-form w-1/4 pl-2"></div>
                          <div className="input-form w-1/4 pl-2"></div>
                        </div>

                        <div className="flex justify-center mt-4">
                          <div className="input-form w-1/4">
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
                              Disbursement Date
                            </FormLabel>
                            <FormInput
                              {...register("disbursementDate")}
                              id="validation-form-loanDisbursementDate"
                              type="date"
                              name="disbursementDate"
                              className={clsx({
                                "border-danger": errors.loanDisbursementDate,
                              })}
                            />
                            {errors.disbursementDate && (
                              <div className="mt-2 text-danger">
                                {typeof errors.disbursementDate.message ===
                                  "string" && errors.disbursementDate.message}
                              </div>
                            )}
                          </div>
                          <div className="input-form w-1/4 pl-2">
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
                              Paid through Amount
                            </FormLabel>
                            <FormInput
                              {...register("paidThroughAmount")}
                              id="validation-form-paidThroughAmount"
                              type="text"
                              name="paidThroughAmount"
                              className={clsx({
                                "border-danger": errors.paidThroughAmount,
                              })}
                              placeholder="Paid through Amount"
                            />
                            {errors.paidThroughAmount && (
                              <div className="mt-2 text-danger">
                                {typeof errors.paidThroughAmount.message ===
                                  "string" && errors.paidThroughAmount.message}
                              </div>
                            )}
                          </div>
                          <div className="input-form w-1/4 pl-2"></div>
                          <div className="input-form w-1/4 pl-2"></div>
                        </div>
                     
                        <div className="flex justify-center mt-4">
                          <div className="input-form w-1/2">
                            <FormLabel
                              htmlFor="validation-form-loanReason"
                              className="flex flex-col w-full sm:flex-row"
                            >
                              Reason
                            </FormLabel>
                            <FormInput
                              {...register("reason")}
                              id="validation-form-loanReason"
                              type="text"
                              name="reason"
                              className={clsx({
                                "border-danger": errors.reason,
                              })}
                              placeholder="Reason"
                            />
                            {errors.reason && (
                              <div className="mt-2 text-danger">
                                {typeof errors.reason.message ===
                                  "string" && errors.reason.message}
                              </div>
                            )}
                          </div>
                          <div className="input-form w-1/2 pl-2"></div>
                        </div>
                        {/* Enable Portal Access */}
                        <div className="mt-4">
                          <div>
                            <label className="w-full flex">
                              <input
                                {...register("exemptLoan")}
                                type="checkbox"
                                name="exemptLoan"
                                className="mt-0.5 rounded text-[#164E63]"
                              />{" "}
                              <span className="ml-4">
                                {" "}
                                Exampt This Loan from prerequisite calculation
                              </span>
                            </label>
                            <p className="mt-2 ml-8 text-[gray]">
                                According to rule 3(A), employees availing medical loan or any loan below 20000 can be exempted from 
                                prerequisite calculation
                            </p>
                          </div>
                        </div>
                      </div>
                        <Button
                          variant="primary"
                          onClick={() => {
                            //setCurrentState(currentState + 1);
                          }}
                          className="mt-5  mr-1"
                          type="submit"
                        >
                          save
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => {
                            
                            showLoanForm(false)
                          }}
                          className="mt-5  mr-1"
                          type="button"
                        >
                          cancel
                        </Button>
                   
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
        }
        
      </>
    );
  };
  
  export default AddLoans;
  