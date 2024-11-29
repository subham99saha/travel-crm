//@ts-nocheck
import {
  PreviewComponent,
  Preview,
} from "../../../base-components/PreviewComponent";
import {
  FormLabel,
  FormInput,
  FormSelect,
  FormTextarea
} from "../../../base-components/Form";
import {useEffect,useRef } from "react";
import axios from "axios";
import Button from "../../../base-components/Button";
import Notification from "../../../base-components/Notification";
import Lucide from "../../../base-components/Lucide";
import { useForm } from "react-hook-form";
import Toastify from "toastify-js";
import clsx from "clsx";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, {useState} from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { getEmployee, updateEmployee } from "../employeeSlice";
import { fetchAllDepartment } from "../../Department/departmentSlice";
import TomSelect from "../../../base-components/TomSelect";
import _ from "lodash";
import { fetchAllCity } from '../../City/CitySlice';
import api from "../../../../apiconfig.json";


const form16URL = `${api.API_URL}${api.API_ENDPOINT.FORM16}`;

export default function Form16Update() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const params = useParams();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.employee); 

  const [selectDepartment, setDepartment] = useState("");
  const departmentData = useAppSelector((state) => state.department);

  const [selectCity, setCity] = useState("");
  const cityData = useAppSelector((state) => state.city);

  useEffect(()=>{
    dispatch(fetchAllDepartment());
  },[]);

  useEffect(()=>{
    dispatch(fetchAllCity());
  },[]);

 

  useEffect(()=>{
    dispatch(getEmployee(params.id));
  },[])

  console.log(data)

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current!.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
   //debugger;
   //console.log(data.empName);
    let sendData = {
      createdBy:"Santosh",
      empName:"Santosh",
      empId: 45
     } ;

     console.log(sendData)

     let formdata = new FormData();
     formdata.append("thumbnail", file);
     formdata.append("sendData", JSON.stringify(sendData));
     const res = await axios.post(`${form16URL}`, formdata,{
      headers: {
        "content-type": "multipart/form-data"
      },
     }).then((result)=>{
      //reset();
      const successEl = document
        .querySelectorAll("#success-notification-content")[0]
        .cloneNode(true) as HTMLElement;
      successEl.classList.remove("hidden");
      Toastify({
        node: successEl,
        checkOutTime: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
      }).showToast();
    }); 
    
  };

  return (
    <div>
      <div className="w-full bg-[#E2E8F0] pb-7 mb-7">
        <h1
          className="pt-10 color-[gray] text-center text-base"
          style={{
            fontSize: "17px",
          }}
        >
          {" "}
          Its time to generate Form 16 for the financial year 2022-2023
        </h1>
        <div className="flex justify-center mt-1">
          <div className="bg-[#164E63] h-1 w-[5%] rounded-2xl"></div>
        </div>
        <h1
          className="pt-7 color-[gray] text-center font-normal text-base"
          style={{ fontWeight: 500, fontSize: "16px" }}
        >
          {" "}
          Verify your tax deducter before you generate Form 16
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              width: "30%",
              height: "100px",
              backgroundColor: "white",
              borderRadius: "10px",
              display: "flex",
            }}
          >
            <div
              style={{
                width: "30%",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <img
                src="data:image/png;base64,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"
                style={{ height: "90px", width: "auto", marginTop: "5px" }}
              />
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                // class="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg> */}
            </div>
            <div
              style={{
                width: "70%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <div>
                <h1 style={{ textAlign: "left" }}>{data.empName}</h1>
                <h2 style={{ textAlign: "left", marginTop: "5px" }}>
                  Son/Daughter of {data.fatherName}
                </h2>
              </div>
            </div>
            <div style={{ width: "10%", cursor: "pointer" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 mt-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </div>
          </div>
        </div>
        <h1
          className="pt-3 color-[gray] text-center font-normal text-base"
          style={{ fontWeight: 400, fontSize: "15px" }}
        >
          {" "}
          Note: Remember that once you generate Form 16, you cannot change the
          deductor details
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            marginBottom: "30px",
          }}
        >
          {/* <form onSubmit={handleButtonClick}>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <button
          type="submit"
            style={{
              paddingTop: "15px",
              paddingBottom: "15px",
              paddingLeft: "30px",
              paddingRight: "30px",
              backgroundColor: "#009E60",
              color: "white",
              fontWeight: 500,
              fontSize: "17px",
              borderRadius: "10px",
            }}
          >
            Generate Form 16
          </button>
          </form> */}
           <form>
      
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            
            <Button
              variant="primary"
              className="mt-5  mr-1"
              type="button"
              onClick={handleFileChange}
            >
              Generate Form 16
            </Button>
            {status ? <h1>{status}</h1> : null}
          </form>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <h1 style={{ fontSize: "17px", fontWeight: 500 }}>
            Steps to generate Form 16 for your employees{status}
          </h1>
        </div>
      </div>
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
  );
}
