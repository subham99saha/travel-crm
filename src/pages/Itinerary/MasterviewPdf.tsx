// @ts-nocheck
import _ from "lodash";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import fakerData from "../../utils/faker";
import Button from "../../base-components/Button";
import Pagination from "../../base-components/Pagination";
import { FormInput, FormHelp, FormLabel, FormInline } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import Tippy from "../../base-components/Tippy";
import { Dialog, Menu } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import axios from "axios";

import { getItinerary, fetchItineraryDetails } from "./ItinerarySlice";
import { useAppSelector, useAppDispatch } from "../../stores/hooks";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ClassicEditor } from "../../base-components/Ckeditor";
import { Link, useParams, useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import api from "../../../apiconfig.json";

import { fetchAllCity } from "../City/CitySlice";
import { fetchAllState } from "../State/StateSlice";
import { fetchAllCountry } from "../Country/CountrySlice";
//import { fetchAllHotel } from "../Hotel/HotelSlice";
import { fetchAllVendorHotel } from "../VendorHotel/vendorHotelSlice";
import { fetchAllVendorActivity } from "../VendorActivity/vendorActivitySlice";
import { fetchAllFlight } from "../Flight/flightSlice";
import { fetchAllTransport } from "../Transport/transportSlice";

import parse from 'html-react-parser';

import buddhaParkRavangla from "../../assets/images/buddha-park-ravangla.jpg";
import boxImage from "../../assets/images/box_img.jpg";
import logoImg from "../../assets/images/logo.png";
//import bodyLogo from "../../assets/images/logo_body.png";


import { Bold } from "lucide-react";

//=============Modal====================
import {
    PreviewComponent,
    Preview,
    Source,
    Highlight,
  } from "../../base-components/PreviewComponent";
//   import {
//     FormLabel,
    
//     FormInput,
//     FormSelect,
//   } from "../../base-components/Form";
  //import { Menu, Dialog } from "../../base-components/Headless";
  import TinySlider from "../../base-components/TinySlider";
  //import Button from "../../base-components/Button";
  //import Lucide from "../../base-components/Lucide";
  //import fakerData from "../../utils/faker";
  //import React, { useState, useRef } from "react";
//=============End Modal===================

const Main = () =>{
   const params = useParams();
   const navigate = useNavigate();
   const _id = params.id
   
      
 

   const dispatch = useAppDispatch();
//   const { data } = useAppSelector((state) => state.itinerary); 
//   const [data,setData] = useState([]) 
  const [iti,setIti] = useState([]) 
  const [isLoading,setIsLoading] = useState(true)
  const city = useAppSelector((state) => state.city);
  const state = useAppSelector((state) => state.state);
  const country = useAppSelector((state) => state.country);    
//   const hotel = useAppSelector((state) => state.vendorHotel);
//   const activity = useAppSelector((state) => state.vendorActivity);
//   const flight = useAppSelector((state) => state.flight);
//   const transport = useAppSelector((state) => state.transport);

  
useEffect(() => {
   const URL = `${api.API_URL}${api.API_ENDPOINT.ITINERARY}`;
   axios.post(`${URL}/${_id}`, {}, {
       headers: {},
   }).then((result)=>{
       console.log("Result: ",{result})
       setIti([result.data])
       setIsLoading(false)
   });      
     
 },[])
 
 useEffect(() => {
   // dispatch(getItinerary(_id))
   dispatch(fetchAllCity()) 
   dispatch(fetchAllState()) 
   dispatch(fetchAllCountry()) 
   // dispatch(fetchAllVendorHotel())
   // dispatch(fetchAllVendorActivity())
   // dispatch(fetchAllFlight()) 
   // dispatch(fetchAllTransport()) 
 },[])
  

 const getCityName = (id) => {
   let c = city.data.filter(x => x.id === id)
   return c[0]?.cityName
 }
 const getStateName = (id) => {
   let s = state.data.filter(x => x.id === id)
   return s[0]?.stateName
 }
 const getCountryName = (id) => {
   let c = country.data.filter(x => x.id === id)
   return c[0]?.countryname
 }

  const [overlappingModalPreview, setOverlappingModalPreview] = useState(false);
  const [nextOverlappingModalPreview, setNextOverlappingModalPreview] = useState(false);
  const [editorData, setEditorData] = useState("");

  const bodyLogo = api.API_URL+'images/assets/logo.png';
  const htmlContent = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
  <body style="page-break-inside: avoid; , textAlign: "justify">`;
  const footer = `</body>
  </html>`;
    return (
      
      <>      
      <div dangerouslySetInnerHTML={ {__html: htmlContent} } ></div>
      {iti.map(data => {

      let _pax = JSON.parse(data.pax);
      let _paxTC = [0,0,0,0];
      if(_pax.length > 4){
          _paxTC = _.split(_pax[4], ",");
      }
       
      let _paxItems = (data.paxItems) ? JSON.parse(data.paxItems) : [];
      let _gallery = (data.gallery) ? JSON.parse(data.gallery) : []
      return <div className="bg-white overflow-hidden w-full">
         <table
            border={0}
            cellPadding={0}
            cellSpacing={0}
            width={750}
            style={{
               marginTop: 0,
               marginRight: 'auto',
               marginBottom: 0,
               marginLeft: 'auto',
            }}>


            {/* Header Section Start Here */}
            <tr>
               <td>
                  <table
                     border={0}
                     cellPadding={0}
                     cellSpacing={0}
                     width={750}
                  >
                     <tr>
                        <td style={{ position: "relative" }}>
                           <img
                              alt="logoImg"
                              style={{ marginBottom: 20, position: "absolute", left: 20, top: 20, }}
                              src={logoImg}
                           />
                           <div style={{ marginBottom: 20, position: "absolute", bottom: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.5)', padding: 20, textAlign: "center" }} >
                              {/* <p style={{ color: "#ffffff", fontSize: 20, lineHeight: "100%", fontWeight: "bold", textTransform: "uppercase" }}><span style={{ color: "#f25c21", paddingRight: 5, }}>{data.totalDays}</span>Day</p> */}
                              <p style={{ color: "#ffffff", fontSize: 40, lineHeight: "100%", fontWeight: "bold", textTransform: "uppercase" }}>{data.tourName}</p>
                              {/* <p style={{ color: "#ffffff", fontSize: 16, lineHeight: "100%", textTransform: "uppercase" }}>Singdha Srijon Tours Private Limited</p> */}
                           </div>
                           <img
                              alt={`${data.thumbnail}`}
                              style={{ marginBottom: 20, width: "100%" }}
                              src={`${api.API_URL}images/${data.thumbnail}`}
                           />
                        </td>
                     </tr>

                     <tr>
                        <td style={{ fontSize: 16, color: "#000000", paddingBottom: 5, paddingLeft: 20, paddingRight: 20, }}>Respected Sir / Madam,</td>
                     </tr>
                     <tr>
                        <td style={{ fontSize: 14, color: "#000000", paddingBottom: 10, paddingLeft: 20, paddingRight: 20, textAlign: "justify"}}>Greetings from <b>SINGDHA SRIJON TOURS PVT. LTD. !!!</b> You are invited to joining for hotel booking first time to
                            &nbsp;<b>SINGDHA SRIJON TOURS PRIVATE LIMITED</b>.
                        </td>
                     </tr>
                     <tr>
                        <td style={{ fontSize: 14, color: "#000000", paddingBottom: 20, paddingLeft: 20, paddingRight: 20, textAlign: "justify" }}>
                        {parse(data.description || '')}
                        </td>
                     </tr>


                  </table>
               </td>
            </tr>
            {/* Header Section Ends Here */}

            {/* Wrapper Section Start Here */}

            <tr>
               <td>
                  <table
                     border={0}
                     cellPadding={0}
                     cellSpacing={0}
                     width={750}
                  >



                     <tr>
                        <td>
                           <table border={0} cellPadding={0} cellSpacing={0}
                              // width={710} style={{ backgroundImage: `url(${bodyLogo})`, backgroundRepeat: "no-repeat", backgroundPosition: 'right top', backgroundSize: "contain", }}
                              width={710} style={{ backgroundRepeat: "no-repeat", backgroundPosition: 'right top', backgroundSize: "contain", }}>
                              {(data.dayDetails) ? data.dayDetails.sort((x, y) => {return x.day - y.day}).map((day,idx) => {
                                 return <tr>
                                 <td style={{ fontSize: 14, height: 25, lineHeight: "120%", fontWeight: 700, paddingBottom: 5, paddingLeft: 20, paddingRight: 20, color: "#000000" }}>
                                    <span style={{ color: "#f25c21" }}>DAY {idx+1} :</span>{day.title}
                                 </td>
                              </tr>
                                 }) : ''}
                           </table>
                        </td>
                     </tr>
                  </table>
               </td>
            </tr>



            <table border={0} cellPadding={0} cellSpacing={0} width={710} style={{ paddingLeft: 20, marginTop: 30, marginBottom: 0, marginLeft: 20, marginRight: 20, }}>
            {(data.dayDetails) ? data.dayDetails.sort((x, y) => {return x.day - y.day}).map((day,idx) => {
               let plan = day.plan
               return <tr style={{borderTop: "#f25c21 1px dashed",}}>

                  <td width={480} style={{ paddingBottom: 20, paddingRight: 10, paddingLeft: 0, paddingTop: 30, marginLeft: 20, }}>
                     <table border={0} cellPadding={0} cellSpacing={0}
                        width={500}>
                        <tr>
                           <td colSpan={2}
                              style={{ fontSize: 14, color: "#000000", paddingBottom: 20, marginLeft: 20, textAlign: "justify", paddingRight: 10}}>
                              <p style={{ fontSize: 19, color: "#f25c21", marginBottom: 10, fontWeight: "bold", borderWidth: 1, borderStyle: "solid", borderRadius: "8px", borderColor: "#ff0000", paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, display: "inline-block" }}><span style={{ fontSize: 16, color: "#000000", paddingBottom: 10 }}>DAY</span> {idx+1}</p>
                              <p style={{ fontSize: 16, color: "#000000", paddingBottom: 10, fontWeight: "bold"}}>{day.title}</p>
                              {day.description}
                              <br />
                           </td>
                        </tr>
                        <tr>
                           <td colSpan={2}>
                           <p style={{ fontSize: 16, color: "#000000", paddingBottom: 20, fontWeight: "bold"}}>Day Plan</p>
                        { (plan.length) ? _.take(plan, plan.length).map((a, Key) => {
                              return <>
                                 <div style={{ float: "left", width: "50%", minHeight: "80px" }}>
                                 <div style={{ fontSize: 14, lineHeight: "100%", color: "#000000", width: "50%", paddingBottom: 20, }}>
                                    <h3 style={{ fontSize: 16, color: "#f25c21", paddingBottom: 10, }}>{Key+1}.{_.startCase(a.field)}</h3>
                                    <b>{a.others[0]}</b> <br />                                 
                                 </div>
                                 </div>
                              </>
                           }) : ''}
                           </td>
                        </tr>
                     </table>
                  </td>
                  <td valign="top" style={{ paddingTop: 70}}>
                     <table border={0} cellPadding={0} cellSpacing={0} width={200}>
                        <tr>
                           <td>
                              <img
                                 alt="boxImage"
                                 style={{ marginBottom: 20 }}
                                 src={`${api.API_URL}images/${day.thumbnail}`}
                              />

                           </td>
                        </tr>
                     </table>
                  </td>
               </tr>
            
            }) : ''}
            </table>
            <table border={0} cellPadding={0} cellSpacing={0} width={750} style={{ marginTop: 20, marginLeft: 0, marginRight: 0, marginBottom: 0, }}>
               <tr>
                  <td valign={top} width={710}
                     style={{ borderWidth: 1, borderStyle: "dashed", borderColor: "#ff0000", padding: 20 }}>
                     <table border={0} cellPadding={0} cellSpacing={0}
                        width={"100%"}
                        style={{ marginRight: 0, marginBottom: 0, }}>
                        <tbody>
                        <tr>
                           <td valign="top" colSpan={2}
                              style={{ paddingBottom: 10, fontSize: 15, color: "#000000", }}>
                              <span style={{ fontSize: 15, color: "#000000", fontWeight: "bold" }}>RATE {data.noOfNights} NIGHT {data.noOfDays} DAYS (B)</span>
                           </td>
                        </tr>
                        <tr>
                           <td style={{ background:"#f36623", borderBottom: "1px solid #ffffff", width: "50%", height: 32, fontSize: 12, fontWeight: 700, textAlign: "center", paddingBottom: 0, lineHeight: "100%", color: "#ffffff", }}>
                              <div style={{backgroundColor:"red"}}>2 PAX RS {_pax[1] + _pax[2] + Number(_paxTC[0])}</div>
                           </td>
                           <td style={{ background:"#2a3787", borderBottom: "1px solid #ffffff", width: "50%", height: 32, fontSize: 12, fontWeight: 700, textAlign: "center", paddingBottom: 0, lineHeight: "100%", color: "#ffffff", }}>
                              PER PAX {_.round((_pax[1] + _pax[2] + Number(_paxTC[0]))/2)}
                           </td>
                        </tr>
                        <tr>
                           <td style={{ background: "#f36623", borderBottom: "1px solid #ffffff", width: "50%", height: 32, fontSize: 12, fontWeight: 700, textAlign: "center", paddingBottom: 0, lineHeight: "100%", color: "#ffffff", }}>
                              4 PAX RS {2*_pax[1] + _pax[2] + Number(_paxTC[1])}
                           </td>
                           <td style={{ background: "#2a3787", borderBottom: "1px solid #ffffff", width: "50%", height: 32, fontSize: 12, fontWeight: 700, textAlign: "center", paddingBottom: 0, lineHeight: "100%", color: "#ffffff", }}>
                              PER PAX {_.round((2*_pax[1] + _pax[2] + Number(_paxTC[1]))/4)}
                           </td>
                        </tr>
                        <tr>
                           <td style={{ background: "#f36623", borderBottom: "1px solid #ffffff", width: "50%", height: 32, fontSize: 12, fontWeight: 700, textAlign: "center", paddingBottom: 0, lineHeight: "100%", color: "#ffffff", }}>
                              6 PAX RS {3*_pax[1] + _pax[2] + Number(_paxTC[2])}
                           </td>
                           <td style={{ background: "#2a3787", borderBottom: "1px solid #ffffff", width: "50%", height: 32, fontSize: 12, fontWeight: 700, textAlign: "center", paddingBottom: 0, lineHeight: "100%", color: "#ffffff", }}>
                              PER PAX {_.round((3*_pax[1] + _pax[2] + Number(_paxTC[1]))/6)}
                           </td>
                        </tr>
                        <tr>
                           <td style={{ background: "#f36623", borderBottom: "1px solid #ffffff", width: "50%", height: 32, fontSize: 12, fontWeight: 700, textAlign: "center", paddingBottom: 0, lineHeight: "100%", color: "#ffffff", }}>
                              8 PAX RS {4*_pax[1] + _pax[2] + Number(_paxTC[3])}
                           </td>
                           <td style={{ background: "#2a3787", borderBottom: "1px solid #ffffff", width: "50%", height: 32, fontSize: 12, fontWeight: 700, textAlign: "center", paddingBottom: 0, lineHeight: "100%", color: "#ffffff", }}>
                              PER PAX {_.round((4*_pax[1] + _pax[2] + Number(_paxTC[1]))/8)}
                           </td>
                        </tr>

                        <tr>
                           <td colSpan={2}>
                              &nbsp;
                           </td>
                        </tr>

                        <tr>
                           <td colSpan={2}
                              bgcolor="#000000"
                              style={{ width: "50%", fontSize: 14, fontWeight: 400, paddingBottom: 10, textAlign: "center", paddingTop: 10, lineHeight: "100%", color: "#ffffff", background: "#000000" }}>
                              Extra person with bed <b style={{ color: "#f36623" }}>Rs {_pax[3]}</b>
                              {/* , child with out bed <b style={{ color: "#f36623" }}>Rs 16000</b> */}
                           </td>
                        </tr>
                        </tbody>
                     </table>


                  </td>
               </tr>
            </table>


            <table border={0} cellPadding={0} cellSpacing={0} width={750}
               style={{ borderWidth: 1, borderStyle: "dashed", borderColor: "#ff0000", padding: 20, marginTop: 20, marginLeft: 0, marginRight: 0, marginBottom: 0, }}>

               <tr>
                  <td valign="top"
                     style={{ padding: 0 }}>

                     <table border={0} cellPadding={0} cellSpacing={0}
                        width={208}
                        style={{ marginRight: 20, marginLeft: 20, marginTop: 20, }}>
                        <tr>
                           <td valign="top"
                              style={{ fontSize: 20, fontWeight: 700, paddingBottom: 0, lineHeight: "100%", color: "#f25c21", }}>
                              01.
                           </td>
                           <td valign="top"
                              style={{ fontSize: 14, fontWeight: 400, paddingBottom: 5, lineHeight: "130%", color: "#000000", }}>
                              <span style={{ fontWeight: 700, }}> Account:</span> Singdha Srijon Tours Private Limited
                           </td>
                        </tr>
                        <tr>
                           <td valign="top"
                              style={{ paddingBottom: 5 }}>
                              &nbsp;
                           </td>
                           <td valign="top"
                              style={{ fontSize: 14, fontWeight: 400, paddingBottom: 5, lineHeight: "100%", color: "#000000", }}>
                              <span style={{ fontWeight: 700, }}>Bank:</span>
                              SATE BANK OF INDIA
                           </td>
                        </tr>
                        <tr>
                           <td valign="top"
                              style={{ paddingBottom: 5 }}>
                              &nbsp;
                           </td>
                           <td valign="top"
                              style={{ fontSize: 14, fontWeight: 400, paddingBottom: 5, lineHeight: "100%", color: "#000000", }}>
                              <span style={{ fontWeight: 700, }}>Branch:</span>
                              KATABAGAN, (07147)
                           </td>
                        </tr>
                        <tr>
                           <td valign="top"
                              style={{ paddingBottom: 5 }}>
                              &nbsp;
                           </td>
                           <td valign="top"
                              style={{ fontSize: 14, fontWeight: 400, paddingBottom: 5, lineHeight: "100%", color: "#000000", }}>
                              <span style={{ fontWeight: 700, }}>A/c No:</span>
                              39053858287
                           </td>
                        </tr>
                        <tr>
                           <td valign="top"
                              style={{ paddingBottom: 5 }}>
                              &nbsp;
                           </td>
                           <td valign="top"
                              style={{ fontSize: 14, fontWeight: 400, paddingBottom: 5, lineHeight: "100%", color: "#000000", }}>
                              <span style={{ fontWeight: 700, }}>IFSC Code:</span>
                              SBIN0007147
                           </td>
                        </tr>
                        <tr>
                           <td valign="top"
                              style={{ paddingBottom: 5 }}>
                              &nbsp;
                           </td>
                           <td valign="top"
                              style={{ fontSize: 14, fontWeight: 400, paddingBottom: 5, lineHeight: "100%", color: "#000000", }}>
                              <span style={{ fontWeight: 700, }}>MICR -</span>
                              742002101
                           </td>
                        </tr>
                     </table>

                  </td>

                  <td valign="top"
                     style={{ padding: 20 }}>

                     <table border={0} cellPadding={0} cellSpacing={0}
                        width={208}>
                        <tr>
                           <td valign="top"
                              style={{ fontSize: 20, fontWeight: 700, paddingBottom: 0, lineHeight: "100%", color: "#f25c21", }}>
                              02.
                           </td>
                           <td valign="top"
                              style={{ fontSize: 14, fontWeight: 400, paddingBottom: 5, lineHeight: "130%", color: "#000000", }}>
                              <span style={{ fontWeight: 700, }}>Account:</span> Singdha Srijon Tours Private Limited
                           </td>
                        </tr>
                        <tr>
                           <td valign="top"
                              style={{ paddingBottom: 5 }}>
                              &nbsp;
                           </td>
                           <td valign="top"
                              style={{ fontSize: 14, fontWeight: 400, paddingBottom: 5, lineHeight: "100%", color: "#000000", }}>
                              <span style={{ fontWeight: 700, }}>Bank Name:</span>
                              ICICI Bank
                           </td>
                        </tr>
                        <tr>
                           <td valign="top"
                              style={{ paddingBottom: 5 }}>
                              &nbsp;
                           </td>
                           <td valign="top"
                              style={{ fontSize: 14, fontWeight: 400, paddingBottom: 5, lineHeight: "100%", color: "#000000", }}>
                              <span style={{ fontWeight: 700, }}>Branch:</span>
                              Baharampur
                           </td>
                        </tr>
                        <tr>
                           <td valign="top"
                              style={{ paddingBottom: 5 }}>
                              &nbsp;
                           </td>
                           <td valign="top"
                              style={{ fontSize: 14, fontWeight: 400, paddingBottom: 5, lineHeight: "100%", color: "#000000", }}>
                              <span style={{ fontWeight: 700, }}>A/c No:</span>
                              333105005202
                           </td>
                        </tr>
                        <tr>
                           <td valign="top"
                              style={{ paddingBottom: 5 }}>
                              &nbsp;
                           </td>
                           <td valign="top"
                              style={{ fontSize: 14, fontWeight: 400, paddingBottom: 5, lineHeight: "100%", color: "#000000", }}>
                              <span style={{ fontWeight: 700, }}>IFSC Code:</span>
                              ICIC0003331
                           </td>
                        </tr>
                        <tr>
                           <td valign="top"
                              style={{ paddingBottom: 5 }}>
                              &nbsp;
                           </td>
                           <td valign="top"
                              style={{ fontSize: 14, fontWeight: 400, paddingBottom: 5, lineHeight: "100%", color: "#000000", }}>
                              <span style={{ fontWeight: 700, }}>Micro Code -</span>
                              742229002
                           </td>
                        </tr>
                     </table>
                  </td>
                  <td valign="top" colSpan={2}
                     style={{ paddingLeft: 0 }}>

                     <table border={0} cellPadding={0} cellSpacing={0}
                        width={208}
                        style={{ marginTop: 20, marginBottom: 20, marginRight: "auto", marginLeft: "auto", }}>
                        <tr>
                           <td valign="top"
                              style={{ fontSize: 20, fontWeight: 700, paddingBottom: 0, lineHeight: "100%", color: "#f25c21", }}>
                              03.
                           </td>
                           <td valign="top"
                              style={{ fontSize: 14, fontWeight: 400, paddingBottom: 5, lineHeight: "130%", color: "#000000", }}>
                              <span style={{ fontWeight: 700, }}>Account:</span> Singdha Srijon Tours Private Limited
                           </td>
                        </tr>
                        <tr>
                           <td valign="top"
                              style={{ paddingBottom: 5 }}>
                              &nbsp;
                           </td>
                           <td valign="top"
                              style={{ fontSize: 14, fontWeight: 400, paddingBottom: 5, lineHeight: "100%", color: "#000000", }}>
                              <span style={{ fontWeight: 700, }}>Bank:</span>
                              SATE BANK OF INDIA
                           </td>
                        </tr>
                        <tr>
                           <td valign="top"
                              style={{ paddingBottom: 5 }}>
                              &nbsp;
                           </td>
                           <td valign="top"
                              style={{ fontSize: 14, fontWeight: 400, paddingBottom: 5, lineHeight: "100%", color: "#000000", }}>
                              <span style={{ fontWeight: 700, }}>Branch:</span>
                              KATABAGAN, (07147)
                           </td>
                        </tr>
                        <tr>
                           <td valign="top"
                              style={{ paddingBottom: 5 }}>
                              &nbsp;
                           </td>
                           <td valign="top"
                              style={{ fontSize: 14, fontWeight: 400, paddingBottom: 5, lineHeight: "100%", color: "#000000", }}>
                              <span style={{ fontWeight: 700, }}>A/c No:</span>
                              41706109116
                           </td>
                        </tr>
                        <tr>
                           <td valign="top"
                              style={{ paddingBottom: 5 }}>
                              &nbsp;
                           </td>
                           <td valign="top"
                              style={{ fontSize: 14, fontWeight: 400, paddingBottom: 5, lineHeight: "100%", color: "#000000", }}>
                              <span style={{ fontWeight: 700, }}>IFSC Code:</span>
                              SBIN0007147
                           </td>
                        </tr>
                        <tr>
                           <td valign="top"
                              style={{ paddingBottom: 5 }}>
                              &nbsp;
                           </td>
                           <td valign="top"
                              style={{ fontSize: 14, fontWeight: 400, paddingBottom: 5, lineHeight: "100%", color: "#000000", }}>
                              <span style={{ fontWeight: 700, }}>MICR -</span>
                              742002101
                           </td>
                        </tr>
                     </table>
                  </td>
               </tr>
               <tr>
                  
               </tr>
            </table>



            {/* Wrapper Section Ends Here */}

            {/* Footer Section Start here */}

            <table border={0} cellPadding={0} cellSpacing={0} style={{ marginBottom: 20, marginLeft: 0, marginRight: 0,}}
               width={750} >
               <tr>
                  <td valign={top}
                     style={{fontSize: 14, lineHeight: "140%", background: "#f36623", color: "#ffffff", padding: 20,}}>
                     <span style={{fontSize: 16, color: "#ffffff", paddingBottom: 5, fontWeight: 700,}}>
                        COMPANY NAME - SINGDHA SRIJON TOURS PRIVATE. LIMITED.</span> <br/>
                     <span style={{color: "#000000", fontWeight:700,}}>Address:</span> “Nirupama abasan” House No. 89, r.n Tagore Road, Laldighi, Berhampore, Murshidabad, West Bengal<br />
                     <span style={{color: "#000000", fontWeight:700,}}> Pin:</span> 742101 , india. <span style={{color: "#000000", fontWeight:700,}}> Mob:</span> 07431021007, 9733810397,
                     <span style={{color: "#000000", fontWeight:700,}}> E-mail:</span> support@srijontours.com , ajoy@srijontours.com
                  </td>
               </tr>
            </table>
            {/* Footer Section Ends here */}
         </table>
      </div>
      })}
      <div dangerouslySetInnerHTML={ {__html: footer} } ></div>
      
      </>
   
    );
  
}

export default Main;