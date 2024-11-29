//@ts-nocheck
import {
  PreviewComponent,
  Preview,
} from "../../base-components/PreviewComponent";
import { useNavigate } from "react-router-dom";
import {
  FormInput,
  FormInline,
  FormSelect,
  FormLabel,
  FormHelp,
  FormCheck,
  InputGroup,
  FormSwitch,
} from "../../base-components/Form";
import {useEffect } from "react";
import Button from "../../base-components/Button";
import Notification from "../../base-components/Notification";
import { useForm } from "react-hook-form";
import Toastify from "toastify-js";
import clsx from "clsx";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, {useState} from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { getEmployee, updateEmployee } from "./employeeSlice";
import { fetchAllDepartment } from "../Department/departmentSlice";
import _ from "lodash";
import Table from "../../base-components/Table";
import Lucide from "../../base-components/Lucide";
import Tippy from "../../base-components/Tippy";
import TomSelect from "../../base-components/TomSelect";
import { Menu } from "../../base-components/Headless";
import { fetchAllCity } from '../City/CitySlice';
import { PDFDownloadLink } from '@react-pdf/renderer';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { createLoan,getLoan,fetchAllLoans} from "./Loans/loanSlice";

const EmpOverview = ()=>{
  const params = useParams();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.employee); 
  const [navValue, setNavValue] = useState("overview");
  const [selectDepartment, setDepartment] = useState("");
  const departmentData = useAppSelector((state) => state.department);
  const navigate = useNavigate();
  const [selectCity, setCity] = useState("");
  const cityData = useAppSelector((state) => state.city);
  const [loading, setLoading] = useState(false);
  const { loansData } = useAppSelector((state) => state.loan);

  useEffect(()=>{
    dispatch(fetchAllDepartment());
  },[]);

  useEffect(()=>{
    dispatch(fetchAllCity());
  },[]);

  useEffect(() => {
    dispatch(getLoan(params.id));
  }, []);

 

  useEffect(()=>{
    dispatch(getEmployee(params.id));
  },[])

  console.log(data)

  const numberWithCommas = (x) =>{
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
  }

  // const onSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    
  // };
//



//


  const exportToPDF = async() => {
     
    new Promise((resolve,reject)=>{
      resolve(setLoading(true))
    }).then(()=>{
      const contentDiv = document.getElementById('pdf');
      html2canvas(contentDiv)
      .then((canvas) => {
        const pdf = new jsPDF({
        format: [contentDiv.offsetWidth, contentDiv.offsetHeight],
        })
        const imgData = canvas.toDataURL('image/png');
        //const pdf = new jsPDF();
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();
        //const width = "100%";
        //const height = "100%";
        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        pdf.save('document.pdf');
      });
    }).then(()=>{
      setLoading(false)
    })
    
  };



  return (
    <>

  <div className="flex items-center mt-8 intro-y">
  <div className="flex items-center px-5 py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                
                <Button
                  variant="outline-secondary"
                  className="px-2 mr-2"
                  onClick={()=>{
                    navigate("/employee");
                  }}
                >
                  <Lucide icon="ChevronLeft" className="w-4 h-4" />
                </Button>
                <h2 className="mr-auto text-lg font-medium">{`   ${data.empName}`}</h2>
              </div>
              
       
      </div>
    <nav className="flex">
      <a className="mt-4 pl-2 block appearance-none px-5 border text-slate-800 dark:text-white border-b-2 border-transparent dark:border-transparent border-b-primary font-medium dark:border-b-primary py-4 cursor-pointer" href="#" onClick={()=>{
        setNavValue('overview')
      }}>Overview</a>
      <a className="mt-4 pl-2 block appearance-none px-5 border text-slate-800 dark:text-white border-b-2 border-transparent dark:border-transparent border-b-primary font-medium dark:border-b-primary py-4 cursor-pointer" href="#" onClick={()=>{
        setNavValue('salary')
      }}>Salary Details</a>
      <a className="mt-4 pl-2 block appearance-none px-5 border text-slate-800 dark:text-white border-b-2 border-transparent dark:border-transparent border-b-primary font-medium dark:border-b-primary py-4 cursor-pointer" href="#" onClick={()=>{
        setNavValue('investment')
      }}>Investments</a>
      
      <a className="mt-4 pl-2 block appearance-none px-5 border text-slate-800 dark:text-white border-b-2 border-transparent dark:border-transparent border-b-primary font-medium dark:border-b-primary py-4 cursor-pointer" href="#" onClick={()=>{
        setNavValue('tax')
      }}>Loans</a>
    </nav>
    {

    navValue === "overview" && 
      <div className="grid grid-cols-12 gap-6">
        {/* BEGIN: Profile Menu */}
        <div className="flex flex-col-reverse col-span-12 lg:col-span-4 2xl:col-span-3 lg:block">
          <div className="mt-5 intro-y box">
            <div className="relative flex items-center p-5">
              <div className="w-24 h-24 image-fit flex col-span-12 lg:col-span-4 gap-6 ml-4" style={{width:'100%',height:'175%'}}>
                <div className="col-span-4" style={{width:'20%'}}></div>
                <div>
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="rounded-full"
                  src="data:image/png;base64,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"
                />
                <div className="text-base flex font-medium items-center" style={{justifyContent:'center'}}>
                  {data.empName}
                </div>
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-slate-200/60 dark:border-darkmode-400">
            <div className="ml-4 mr-auto">
                
              </div>
              <a className="flex items-center font-medium text-primary" href="">
                <Lucide icon="Activity" className="w-4 h-4 mr-2" /> Basic
                Information
              </a>
              <a className="flex items-center mt-5" href="">
                <Lucide icon="Mail" className="w-4 h-4 mr-2" /> {data.empEmail}
              </a>
              <a className="flex items-center mt-5" href="">
                <Lucide icon="Baby" className="w-4 h-4 mr-2" /> {data.empGender}
              </a>
              <a className="flex items-center mt-5" href="">
                <Lucide icon="Calendar" className="w-4 h-4 mr-2" /> {data.dateOfJoining}
                
              </a>
              <a className="flex items-center mt-5" href="">
                <Lucide icon="Map" className="w-4 h-4 mr-2" /> {data.location}
                
              </a>
            </div>
            <hr></hr>
            <div className="mt-5">
               
                <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0 pl-2">
                  <FormLabel className="xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium pl-2">Employee's Provident Fund</div>
                        {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          Required
                        </div> */}
                      </div>
                      
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <FormSwitch>
                      <FormSwitch.Input
                        id="product-status-active"
                        type="checkbox"
                      />
                      
                    </FormSwitch>
                  </div>
                </FormInline>
                <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0 pl-2">
                  <FormLabel className="xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium pl-2">Employee's State Insaurance</div>
                        {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          Required
                        </div> */}
                      </div>
                      
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <FormSwitch>
                      <FormSwitch.Input
                        id="product-status-active"
                        type="checkbox"
                      />
                      
                    </FormSwitch>
                  </div>
                </FormInline>
                <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0 pl-2">
                  <FormLabel className="xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium pl-2">Professional Tax</div>
                        {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          Required
                        </div> */}
                      </div>
                      
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <FormSwitch>
                      <FormSwitch.Input
                        id="product-status-active"
                        type="checkbox"
                      />
                    
                    </FormSwitch>
                  </div>
                </FormInline>
               
              </div>
            {/* <div className="p-5 border-t border-slate-200/60 dark:border-darkmode-400">
              <a className="flex items-center" href="">
                <Lucide icon="Activity" className="w-4 h-4 mr-2" /> Email
                Settings
              </a>
              <a className="flex items-center mt-5" href="">
                <Lucide icon="Box" className="w-4 h-4 mr-2" /> Saved Credit
                Cards
              </a>
              <a className="flex items-center mt-5" href="">
                <Lucide icon="Lock" className="w-4 h-4 mr-2" /> Social Networks
              </a>
              <a className="flex items-center mt-5" href="">
                <Lucide icon="Settings" className="w-4 h-4 mr-2" /> Tax
                Information
              </a>
            </div>
            <div className="flex p-5 border-t border-slate-200/60 dark:border-darkmode-400">
              <Button variant="primary" type="button" className="px-2 py-1">
                New Group
              </Button>
              <Button
                variant="outline-secondary"
                type="button"
                className="px-2 py-1 ml-auto"
              >
                New Quick Link
              </Button>
            </div> */}
          </div>
        </div>
        {/* END: Profile Menu */}
        <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
          {/* BEGIN: Personal Information */}
          <div className="intro-y box lg:mt-5">
            <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
              <h2 className="mr-auto text-base font-medium">
                Personal Information
              </h2>
            </div>
            <div className="p-5">
              <div className="flex flex-col xl:flex-row">
                <div className="flex-1 mt-6 xl:mt-0">
                  <div className="grid grid-cols-3 gap-x-5">
                    <div className="p-5 border-t border-slate-200/60 dark:border-darkmode-400">
                        
                        <a className="flex items-center mt-5" href="">
                         {'Date Of Birth'}
                        </a>
                        <a className="flex items-center mt-5" href="">
                          {'Father Name'}
                        </a>
                        <a className="flex items-center mt-5" href="">
                          {'Pan Number'}
                          
                        </a>
                        <a className="flex items-center mt-5" href="">
                          {'Personal Email Id'}
                          
                        </a>

                        <a className="flex items-center mt-5" href="">
                          {'Mobile Number'}
                          
                        </a>
                        <a className="flex items-center mt-5" href="">
                          {'Residential Address'}
                          
                        </a>
                    </div>
                    <div className="p-5 border-t border-slate-200/60 dark:border-darkmode-400">
                       
                        <a className="flex items-center mt-5" href="">
                           {data.dateOfBirth}
                        </a>
                        <a className="flex items-center mt-5" href="">
                           {data.fatherName}
                        </a>
                        <a className="flex items-center mt-5" href="">
                          {data.pan}
                          
                        </a>
                        <a className="flex items-center mt-5" href="">
                           {data.empEmail}
                          
                        </a>

                        <a className="flex items-center mt-5" href="">
                           {data.empPhone}
                          
                        </a>
                        <a className="flex items-center mt-5" href="">
                          {data.empAddress}
                          
                        </a>
                    </div>
                  </div> 
                </div>
              </div>
            </div>
          </div>
          {/* END: Personal Information */}
          {/* BEGIN: Payment Information */}
          <div className="intro-y box lg:mt-5">
            <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
              <h2 className="mr-auto text-base font-medium">
                Payment Information
              </h2>
            </div>
            <div className="p-5">
              <div className="flex flex-col xl:flex-row">
                <div className="flex-1 mt-6 xl:mt-0">
                  <div className="grid grid-cols-3 gap-x-5">
                    <div className="p-5 border-t border-slate-200/60 dark:border-darkmode-400">
                        
                        <a className="flex items-center mt-5" href="">
                         {'Account Holder Name'}
                        </a>
                        <a className="flex items-center mt-5" href="">
                          {'Bank Name'}
                        </a>
                        <a className="flex items-center mt-5" href="">
                          {'IFSC Code'}
                          
                        </a>
                        <a className="flex items-center mt-5" href="">
                          {'Account Type'}
                          
                        </a>

                       
                    </div>
                    <div className="p-5 border-t border-slate-200/60 dark:border-darkmode-400">
                       
                        <a className="flex items-center mt-5" href="">
                           {"none"}
                        </a>
                        <a className="flex items-center mt-5" href="">
                        {"none"}
                        </a>
                        <a className="flex items-center mt-5" href="">
                        {"none"}
                          
                        </a>
                        <a className="flex items-center mt-5" href="">
                        {"none"}
                          
                        </a>

                       
                    </div>
                  </div> 
                </div>
              </div>
            </div>
          </div>
          {/* END: Payment Information */}
        </div>
      </div>
      }
      {
        navValue === "salary" && 
        <div className="grid grid-cols-12 gap-6 mt-10" id="pdf">
        <div className="bg-white box col-span-12 lg:col-span-8 2xl:col-span-9">
        <div className="flex justify-between mt-5">
          <div className="input-form w-1/4 mt-5 pl-5">
            <FormLabel
                htmlFor="validation-form-ctc"
                className="flex flex-col w-full sm:flex-row"
              >
                ANNUAL CTC
              </FormLabel>
              <span className="font-semibold">₹{numberWithCommas(data.costToCompany)} per year</span>
                
          </div>
          <div className="input-form w-1/4 mt-5 pl-2">
            <FormLabel
              htmlFor="validation-form-ctc"
              className="flex flex-col w-full sm:flex-row"
            >
              MONTHLY CTC
            </FormLabel>
            <span className="font-semibold">₹{numberWithCommas((data.costToCompany/12).toFixed(2))} per month</span>
          </div>
          
          {!loading && (
            <div>
              <Button variant="primary" className="mr-2 shadow-md mt-5 pl-2 pr-10" onClick={()=>{
                navigate(`/edit-employee/${params.id}`)
              }}>
                 Revise Salary
              </Button>
          
              <Button variant="primary" className="mr-2 shadow-md mt-5 pl-2 pr-10" onClick={()=>{
                exportToPDF()
              }}>
                 Export to PDF
              </Button>
              </div>
          )}
            
        </div>
        <div className="box">
        <div className="flex justify-between mt-10 w-full box">
          <div className="input-form mt-5 pl-2" >SALARY COMPONENTS</div>
          
          <div className="input-form mt-5">MONTHLY AMOUNT</div>{" "}
          <div className="input-form mt-5 pl-2 pr-4">ANNUAL AMOUNT</div>
        </div>
        <div className="w-full mt-4 mb-4 h-1 bg-[#E2E8F0]"></div>
        <div className="mt-0">
          <div className="input-form w-1/4">
            <h1 className="text-xl font-semibold pl-2">Earnings</h1>
          </div>
        </div>
        <div className="flex justify-between mt-10">
          <div className="input-form flex items-center w-[28.5%]">
            <h1 className="flex items-center mt-5 pl-2">Basic</h1>
          </div>
          

          <div className="input-form w-[25%] pl-[2%]">
            <span>₹{data.percentageOfCTC}</span>
          </div>
          <div className="input-form flex items-center justify-center w-[12.5%]">
            <h1 className="items-center text-right w-full pr-4">
            ₹{parseFloat(data.percentageOfCTC)*12}
            </h1>
          </div>
        </div>
        <div className="flex justify-between mt-5">
          <div className="input-form flex items-center w-[28.5%] mt-5 pl-2">
            <h1 className="flex items-center">
              House Rent Allowance
            </h1>
          </div>
         

          <div className="input-form w-[25%] pl-[2%]">
            <span>₹{numberWithCommas(parseInt((data.costToCompany * data.hraPercentage)/100))}</span>
          </div>
          <div className="input-form flex items-center justify-center w-[12.5%]">
            <h1 className="items-center text-right w-full pr-4">
            ₹{}
            </h1>
          </div>
        </div>
        <div className="flex justify-between mt-5">
          <div className="input-form flex items-center w-[28.5%] mt-5 pl-2">
            <h1 className="flex items-center">
            Medical Allowance
            </h1>
          </div>
         
          <div className="input-form w-[25%] pl-[2%]">
            <span>₹{data.medicalAllowance}</span>
          </div>
          <div className="input-form flex items-center justify-center w-[12.5%]">
            <h1 className="items-center text-right w-full pr-4">
            ₹{parseFloat(data.medicalAllowance * 12)}
            </h1>
          </div>
        </div>
        <div className="flex justify-between mt-5">
          <div className="input-form flex items-center w-[28.5%] mt-5 pl-2">
            <h1 className="flex items-center">
            Leave Travel Allowance
            </h1>
          </div>
          
          <div className="input-form w-[25%] pl-[2%]">
            <span>₹{data.leaveTravelAllowance}</span>
          </div>
          <div className="input-form flex items-center justify-center w-[12.5%]">
            <h1 className="items-center text-right w-full pr-4">
            ₹{parseInt(data.leaveTravelAllowance) * 12}
            </h1>
          </div>
        </div>
        <div className="flex justify-between mt-10">
          <div className="input-form flex items-center w-[28.5%]">
            <h1 className="flex items-center mt-5 pl-2">Additional Benefits</h1>
          </div>
          

          <div className="input-form w-[25%] pl-[2%]">
            <span>₹{data.additionalBenefits}</span>
          </div>
          <div className="input-form flex items-center justify-center w-[12.5%]">
            <h1 className="items-center text-right w-full pr-4">
            ₹{parseFloat(data.additionalBenefits)*12}
            </h1>
          </div>
        </div>
        <div className="flex justify-between mt-5">
          <div className="input-form flex items-center w-[28.5%] mt-5 pl-2">
            <h1 className="flex items-center">
              Performance Incentive
            </h1>
          </div>
         

          <div className="input-form w-[25%] pl-[2%]">
            <span>₹{data.performanceIncentive}</span>
          </div>
          <div className="input-form flex items-center justify-center w-[12.5%]">
            <h1 className="items-center text-right w-full pr-4">
            ₹{parseFloat(data.performanceIncentive) * 12}
            </h1>
          </div>
        </div>
        <div className="flex justify-between mt-5">
          <div className="input-form flex items-center w-[28.5%] mt-5 pl-2">
            <h1 className="flex items-center">
            Employee PF Contribution @12
            </h1>
          </div>
         
          <div className="input-form w-[25%] pl-[2%]">
            <span>₹{data.employeePFContribution}</span>
          </div>
          <div className="input-form flex items-center justify-center w-[12.5%]">
            <h1 className="items-center text-right w-full pr-4">
            ₹{parseFloat(data.employeePFContribution)*12}
            </h1>
          </div>
        </div>
        <div className="flex justify-between mt-5">
          <div className="input-form flex items-center w-[28.5%] mt-5 pl-2">
            <h1 className="flex items-center">
            Employer PF Contribution @12
            </h1>
          </div>
          
          <div className="input-form w-[25%] pl-[2%]">
            <span>₹{data.employerPFContribution}</span>
          </div>
          <div className="input-form flex items-center justify-center w-[12.5%]">
            <h1 className="items-center text-right w-full pr-4">
            ₹{parseFloat(data.employerPFContribution) * 12}
            </h1>
          </div>
        </div>
        <div className="flex justify-between mt-10">
          <div className="input-form flex items-center w-[28.5%]">
            <h1 className="flex items-center mt-5 pl-2">ESI Employee Contrinution @0.75</h1>
          </div>
          

          <div className="input-form w-[25%] pl-[2%]">
            <span>₹{data.ESIEmployeeContribution}</span>
          </div>
          <div className="input-form flex items-center justify-center w-[12.5%]">
            <h1 className="items-center text-right w-full pr-4">
            ₹{parseFloat(data.ESIEmployeeContribution)* 12}
            </h1>
          </div>
        </div>
        <div className="flex justify-between mt-5">
          <div className="input-form flex items-center w-[28.5%] mt-5 pl-2">
            <h1 className="flex items-center">
            ESI Employer Contrinution @3.25
            </h1>
          </div>
         

          <div className="input-form w-[25%] pl-[2%]">
            <span>₹{data.ESIEmployerContribution}</span>
          </div>
          <div className="input-form flex items-center justify-center w-[12.5%]">
            <h1 className="items-center text-right w-full pr-4">
            ₹{parseFloat(data.ESIEmployerContribution)* 12}
            </h1>
          </div>
        </div>
        <div className="flex justify-between mt-5">
          <div className="input-form flex items-center w-[28.5%] mt-5 pl-2">
            <h1 className="flex items-center">
            Stock Option
            </h1>
          </div>
         
          <div className="input-form w-[25%] pl-[2%]">
            <span>₹{data.stockOption}</span>
          </div>
          <div className="input-form flex items-center justify-center w-[12.5%]">
            <h1 className="items-center text-right w-full pr-4">
            ₹{parseFloat(data.stockOption) * 12}
            </h1>
          </div>
        </div>
        <div className="flex justify-between mt-5">
          <div className="input-form flex items-center w-[28.5%] mt-5 pl-2">
            <h1 className="flex items-center">
              Car
            </h1>
          </div>
          
          <div className="input-form w-[25%] pl-[2%]">
            <span>₹{data.carExpences}</span>
          </div>
          <div className="input-form flex items-center justify-center w-[12.5%]">
            <h1 className="items-center text-right w-full pr-4">
            ₹{parseFloat(data.carExpences)* 12}
            </h1>
          </div>
        </div>
        <div className="flex justify-between mt-10">
          <div className="input-form flex items-center w-[28.5%]">
            <h1 className="flex items-center mt-5 pl-2">Phone Expenses</h1>
          </div>
          

          <div className="input-form w-[25%] pl-[2%]">
            <span>₹{data.telephoneExpences}</span>
          </div>
          <div className="input-form flex items-center justify-center w-[12.5%]">
            <h1 className="items-center text-right w-full pr-4">
            ₹{parseFloat(data.telephoneExpences) * 12}
            </h1>
          </div>
        </div>
        <div className="flex justify-between mt-5">
          <div className="input-form flex items-center w-[28.5%] mt-5 pl-2">
            <h1 className="flex items-center">
              Employee In Hand Salary
            </h1>
          </div>
         

          <div className="input-form w-[25%] pl-[2%]">
            <span>₹{data.employeeInHand}</span>
          </div>
          <div className="input-form flex items-center justify-center w-[12.5%]">
            <h1 className="items-center text-right w-full pr-4">
            ₹{parseFloat(data.employeeInHand) * 12}
            </h1>
          </div>
        </div>
        <div className="flex justify-between mt-5">
          <div className="input-form flex items-center w-[28.5%] mt-5 pl-2">
            <h1 className="flex items-center">
              Gross Salary
            </h1>
          </div>
         
          <div className="input-form w-[25%] pl-[2%]">
            <span>₹{data.grossSalary}</span>
          </div>
          <div className="input-form flex items-center justify-center w-[12.5%]">
            <h1 className="items-center text-right w-full pr-4">
            ₹{parseFloat(data.grossSalary) * 12}
            </h1>
          </div>
        </div>
       

        </div>
        </div>
         <div className="bg-white box col-span-12 lg:col-span-8 2xl:col-span-9 mt-10  pt-5 pb-4 pl-4  pr-5  rounded text-black box">
         <div className="input-form flex items-center w-[28.5%] mt-5 pl-2">
           <h1 className="flex items-center font-semibold">
             Prerequisits
           </h1>
           
         </div>
       </div>
      </div>

      }

{
        navValue === "investment" && 
        <div className="grid grid-cols-12 gap-6" id="salary">
        {/* BEGIN: Profile Menu */}
        <div className="flex flex-col-reverse col-span-12 lg:col-span-4 2xl:col-span-3 lg:block">
          <div className="mt-5 intro-y box">
            <div className="relative flex items-center p-5">
              <div className="w-48 h-48 image-fit">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="rounded-full"
                  // src={fakerData[0].photos[0]}
                  src="data:image/png;base64,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"

                />
              </div>
            </div>
            <div className="p-5 border-t border-slate-200/60 dark:border-darkmode-400">
            <div className="ml-4 mr-auto">
                <div className="text-base font-medium">
                  {data.empName}
                </div>
              </div>
              <a className="flex items-center font-medium text-primary" href="">
                <Lucide icon="Activity" className="w-4 h-4 mr-2" /> Investment
                Details
              </a>
           
            </div>
            <hr></hr>
           
           
          </div>
        </div>
        {/* END: Profile Menu */}
        
      </div>
      }

{
        navValue === "paySlip" && 
        <div className="grid grid-cols-12 gap-6" id="salary">
        {/* BEGIN: Profile Menu */}
        <div className="flex flex-col-reverse col-span-12 lg:col-span-4 2xl:col-span-3 lg:block">
          <div className="mt-5 intro-y box">
            
            <div className="p-5 border-t border-slate-200/60 dark:border-darkmode-400">
            <div className="ml-4 mr-auto">
                <div className="text-base font-medium">
                  {data.empName}
                </div>
              </div>
              <a className="flex items-center font-medium text-primary" href="">
                <Lucide icon="Activity" className="w-4 h-4 mr-2" /> PaySlip
                Information
              </a>
             
            </div>
            <hr></hr>
            
           
          </div>
        </div>
        {/* END: Profile Menu */}
       
      </div>
      }

{
        navValue === "tax" && 
        <div className="grid grid-cols-12 gap-6" id="salary">
        {/* BEGIN: Profile Menu */}
         
            
         
       
            
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
                  ))):(<Table.Tr className="intro-x"><Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                  No Records Found !!
                </Table.Td></Table.Tr>)}
              </Table.Tbody>
            </Table>
          </div>
          
        </div>
        
        
      
      }
     
    </>
  );
}

export default EmpOverview;
