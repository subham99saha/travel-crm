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
import { fetchAllVendorHotel, searchByCity } from "../VendorHotel/vendorHotelSlice";
import { fetchAllVendorActivity } from "../VendorActivity/vendorActivitySlice";
import { fetchAllFlight } from "../Flight/flightSlice";
import { fetchAllTransport } from "../Transport/transportSlice";

import parse from 'html-react-parser';

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

      const onSave = (type: any)=>{
        // const sendProposalTo = {
        //   all : chkAll,
        //   bc : chkBC,
        //   bb: chkBB,
        //   cor: chkCor
        // }
        const savaData = {
          sendProposalTo : {
                            all : false,
                            bc : false,
                            bb: false,
                            cor: false
                          },
          bcEmail: '',
          bbEmail: '',
          corEmail: '',
          otherEmail: getValues('guestClient'),
          subject: getValues("subject"),
          body: editorData,
          itinerary: _id,
          isDraft: type
        }
      
        console.log("Test: ", savaData);
      
       // let formdata = new FormData();
      //   formdata.append("sendData", JSON.stringify(savaData));
      let sendData = JSON.stringify(savaData);
      
          console.log(sendData);
      
          const res = axios.post(`${api.API_URL}${api.API_ENDPOINT.SEND_PROPOSAL}/send-proposal`, sendData, {
            headers: {
              'Content-Type': 'application/json',
            },
          }).then((result)=>{
            reset();
            setNextOverlappingModalPreview(true);
            setEditorData('');
          });      
      
      }
 

  const dispatch = useAppDispatch();
//   const { data } = useAppSelector((state) => state.itinerary); 
//   const [data,setData] = useState([]) 
  const [iti,setIti] = useState([]) 
  const [isLoading,setIsLoading] = useState(true)
  const city = useAppSelector((state) => state.city);
  const state = useAppSelector((state) => state.state);
  const country = useAppSelector((state) => state.country);    
  const hotel = useAppSelector((state) => state.vendorHotel);
  const activity = useAppSelector((state) => state.vendorActivity);
  const flight = useAppSelector((state) => state.flight);
  const transport = useAppSelector((state) => state.transport);

  
  useEffect(() => {
    const URL = `${api.API_URL}${api.API_ENDPOINT.ITINERARY}`;
    axios.post(`${URL}/${_id}`, {}, {
        headers: {},
    }).then((result)=>{
        console.log({result})
        setIti([result.data])
        setIsLoading(false)
    });      
      
  },[])
  
  useEffect(() => {
    // dispatch(getItinerary(_id))
    dispatch(fetchAllCity()) 
    dispatch(fetchAllState()) 
    dispatch(fetchAllCountry()) 
    dispatch(fetchAllVendorHotel())
    dispatch(fetchAllVendorActivity())
    dispatch(fetchAllFlight()) 
    dispatch(fetchAllTransport()) 
  },[])
  //console.log({data})
//   console.log({city})
//   console.log({hotel})
//   console.log({activity})
//   console.log({flight})
//   console.log({transport})

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
  const getHotelName = (id) => {
    let h = hotel.data.filter(x => x.id === id)
    return h[0]?.hotelName
  }
  const getActivityName = (id) => {
    let a = activity.data.filter(x => x.id === id)
    return a[0]?.activityName
  }
  const getFlightName = (id) => {
    let f = flight.data.filter(x => x.id === id)
    return f[0]?.flightName
  }
  const getTransportName = (id) => {
    let t = transport.data.filter(x => x.id === id)
    return t[0]?.transportName
  }

  const [overlappingModalPreview, setOverlappingModalPreview] = useState(false);
  const [nextOverlappingModalPreview, setNextOverlappingModalPreview] = useState(false);
  const [editorData, setEditorData] = useState("");
    return (
        <>
        {iti.map(data => {
          let _pax = JSON.parse(data.pax);
          let _paxItems = (data.paxItems) ? JSON.parse(data.paxItems) : [];
          let _gallery = (data.gallery) ? JSON.parse(data.gallery) : [];
          
          return <div>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <title>Modular Template Patterns</title>
        {/*
        	This email is an experimental proof-of-concept based on the
            idea that the most common design patterns seen in email can
            be placed in modular blocks and moved around to create
            different designs.

			The same principle is used to build the email templates in
            MailChimp's Drag-and-Drop email editor.

			This email is optimized for mobile email clients, and even
            works relatively well in the Android Gmail App, which does
            not support Media Queries, but does have limited mobile-
            friendly functionality.

			While this coding method is very flexible, it can be more
            brittle than traditionally-coded emails, particularly in
            Microsoft Outlook 2007-2010. Outlook-specific conditional
            CSS is included to counteract the inconsistencies that
            crop up.
            
            For more information on HTML email design and development,
            visit http://templates.mailchimp.com
        */}
        <style type="text/css" dangerouslySetInnerHTML={{__html: "\n        /*////// RESET STYLES //////*/\n        body,\n        #bodyTable,\n        #bodyCell {\n            height: 100% !important;\n            margin: 0;\n            padding: 0;\n            width: 100% !important;\n        }\n\n        table {\n            border-collapse: collapse;\n        }\n\n        img,\n        a img {\n            border: 0;\n            outline: none;\n            text-decoration: none;\n        }\n\n        h1,\n        h2,\n        h3,\n        h4,\n        h5,\n        h6 {\n            margin: 0;\n            padding: 0;\n        }\n\n        p {\n            margin: 1em 0;\n        }\n\n        /*////// CLIENT-SPECIFIC STYLES //////*/\n        .ReadMsgBody {\n            width: 100%;\n        }\n\n        .ExternalClass {\n            width: 100%;\n        }\n\n        /* Force Hotmail/Outlook.com to display emails at full width. */\n        .ExternalClass,\n        .ExternalClass p,\n        .ExternalClass span,\n        .ExternalClass font,\n        .ExternalClass td,\n        .ExternalClass div {\n            line-height: 100%;\n        }\n\n        /* Force Hotmail/Outlook.com to display line heights normally. */\n        table,\n        td {\n            mso-table-lspace: 0pt;\n            mso-table-rspace: 0pt;\n        }\n\n        /* Remove spacing between tables in Outlook 2007 and up. */\n        #outlook a {\n            padding: 0;\n        }\n\n        /* Force Outlook 2007 and up to provide a \"view in browser\" message. */\n        img {\n            -ms-interpolation-mode: bicubic;\n        }\n\n        /* Force IE to smoothly render resized images. */\n        body,\n        table,\n        td,\n        p,\n        a,\n        li,\n        blockquote {\n            -ms-text-size-adjust: 100%;\n            -webkit-text-size-adjust: 100%;\n        }\n\n        /* Prevent Windows- and Webkit-based mobile platforms from changing declared text sizes. */\n\n        /*////// FRAMEWORK STYLES //////*/\n        .flexibleContainerCell {\n            padding-top: 20px;\n            padding-Right: 20px;\n            padding-Left: 20px;\n        }\n\n        .flexibleImage {\n            height: auto;\n        }\n\n        .bottomShim {\n            padding-bottom: 20px;\n        }\n\n        .imageContent,\n        .imageContentLast {\n            padding-bottom: 20px;\n        }\n\n        .nestedContainerCell {\n            padding-top: 20px;\n            padding-Right: 20px;\n            padding-Left: 20px;\n        }\n\n        /*////// GENERAL STYLES //////*/\n        body,\n        #bodyTable {\n            background-color: #F5F5F5;\n        }\n\n        #bodyCell {\n            padding-top: 40px;\n            padding-bottom: 40px;\n        }\n\n        #emailBody {\n            background-color: #FFFFFF;\n            border: 1px solid #DDDDDD;\n            border-collapse: separate;\n            border-radius: 4px;\n        }\n\n        h1,\n        h2,\n        h3,\n        h4,\n        h5,\n        h6 {\n            color: #202020;\n            font-family: Helvetica;\n            font-size: 20px;\n            line-height: 125%;\n            text-align: Left;\n        }\n\n        .textContent,\n        .textContentLast {\n            color: #404040;\n            font-family: Helvetica;\n            font-size: 16px;\n            line-height: 125%;\n            text-align: Left;\n            padding-bottom: 20px;\n        }\n\n        .textContent a,\n        .textContentLast a {\n            color: #2C9AB7;\n            text-decoration: underline;\n        }\n\n        .nestedContainer {\n            background-color: #E5E5E5;\n            border: 1px solid #CCCCCC;\n        }\n\n        .emailButton {\n            background-color: #2C9AB7;\n            border-collapse: separate;\n            border-radius: 4px;\n        }\n\n        .buttonContent {\n            color: #FFFFFF;\n            font-family: Helvetica;\n            font-size: 18px;\n            font-weight: bold;\n            line-height: 100%;\n            padding: 15px;\n            text-align: center;\n        }\n\n        .buttonContent a {\n            color: #FFFFFF;\n            display: block;\n            text-decoration: none;\n        }\n\n        .emailCalendar {\n            background-color: #FFFFFF;\n            border: 1px solid #CCCCCC;\n        }\n\n        .emailCalendarMonth {\n            background-color: #2C9AB7;\n            color: #FFFFFF;\n            font-family: Helvetica, Arial, sans-serif;\n            font-size: 16px;\n            font-weight: bold;\n            padding-top: 10px;\n            padding-bottom: 10px;\n            text-align: center;\n        }\n\n        .emailCalendarDay {\n            color: #2C9AB7;\n            font-family: Helvetica, Arial, sans-serif;\n            font-size: 60px;\n            font-weight: bold;\n            line-height: 100%;\n            padding-top: 20px;\n            padding-bottom: 20px;\n            text-align: center;\n        }\n\n        /*////// MOBILE STYLES //////*/\n        @media only screen and (max-width: 480px) {\n\n            /*////// CLIENT-SPECIFIC STYLES //////*/\n            body {\n                width: 100% !important;\n                min-width: 100% !important;\n            }\n\n            /* Force iOS Mail to render the email at full width. */\n\n            /*////// FRAMEWORK STYLES //////*/\n            /*\n\t\t\t\t\tCSS selectors are written in attribute\n\t\t\t\t\tselector format to prevent Yahoo Mail\n\t\t\t\t\tfrom rendering media query styles on\n\t\t\t\t\tdesktop.\n\t\t\t\t*/\n            table[id=\"emailBody\"],\n            table[class=\"flexibleContainer\"] {\n                width: 100% !important;\n            }\n\n            /*\n\t\t\t\t\tThe following style rule makes any\n\t\t\t\t\timage classed with 'flexibleImage'\n\t\t\t\t\tfluid when the query activates.\n\t\t\t\t\tMake sure you add an inline max-width\n\t\t\t\t\tto those images to prevent them\n\t\t\t\t\tfrom blowing out. \n\t\t\t\t*/\n            img[class=\"flexibleImage\"] {\n                height: auto !important;\n                width: 100% !important;\n            }\n\n            /*\n\t\t\t\t\tMake buttons in the email span the\n\t\t\t\t\tfull width of their container, allowing\n\t\t\t\t\tfor left- or right-handed ease of use.\n\t\t\t\t*/\n            table[class=\"emailButton\"] {\n                width: 100% !important;\n            }\n\n            td[class=\"buttonContent\"] {\n                padding: 0 !important;\n            }\n\n            td[class=\"buttonContent\"] a {\n                padding: 15px !important;\n            }\n\n            td[class=\"textContentLast\"],\n            td[class=\"imageContentLast\"] {\n                padding-top: 20px !important;\n            }\n\n            /*////// GENERAL STYLES //////*/\n            td[id=\"bodyCell\"] {\n                padding-top: 10px !important;\n                padding-Right: 10px !important;\n                padding-Left: 10px !important;\n            }\n        }\n    " }} />
        {/*
        	Outlook Conditional CSS

            These two style blocks target Outlook 2007 & 2010 specifically, forcing
            columns into a single vertical stack as on mobile clients. This is
            primarily done to avoid the 'page break bug' and is optional.

            More information here:
			http://templates.mailchimp.com/development/css/outlook-conditional-css
        */}
        {/*[if mso 12]>
            <style type="text/css">
            	.flexibleContainer{display:block !important; width:100% !important;}
            </style>
        <![endif]*/}
        {/*[if mso 14]>
            <style type="text/css">
            	.flexibleContainer{display:block !important; width:100% !important;}
            </style>
        <![endif]*/}
        <center>
          <table border={0} cellPadding={0} cellSpacing={0} height="100%" width="100%" id="bodyTable">
            <tbody><tr>
                <td align="center" valign="top" id="bodyCell">
                  {/* EMAIL CONTAINER // */}
                  {/*
                        	The table "emailBody" is the email's container.
                            Its width can be set to 100% for a color band
                            that spans the width of the page.
                        */}
                  <table border={0} cellPadding={0} cellSpacing={0} width={750} id="emailBody">
                    {/* MODULE ROW // */}
                    <tbody><tr>
                        <td align="center" valign="top">
                          {/* CENTERING TABLE // */}
                          <table border={0} cellPadding={0} cellSpacing={0} width="100%">
                            <tbody><tr>
                                <td align="center" valign="top">
                                  {/* FLEXIBLE CONTAINER // */}
                                  <table border={0} cellPadding={0} cellSpacing={0} width={750} className="flexibleContainer">
                                    <tbody><tr>
                                        <td valign="top" width={750} className="flexibleContainerCell">
                                          {/* CONTENT TABLE // */}
                                          {/*
                                                            	In multi-column content blocks, the
                                                                content tables are given set widths
                                                                and the flexibleContainer class.
                                                            */}
                                          <table align="Left" border={0} cellPadding={0} cellSpacing={0} width={710} className="flexibleContainer">
                                            <tbody><tr>
                                                <td valign="center" className="textContent" style={{textAlign: 'center'}}>
                                                  <img src={api.API_URL+'images/assets/logo.png'} width={149} className="flexibleImage" style={{maxWidth: '150px'}} />
                                                </td>
                                              </tr>
                                            </tbody></table>
                                          {/* // CONTENT TABLE */}
                                          {/* CONTENT TABLE // */}
                                          <table align="Right" border={0} cellPadding={0} cellSpacing={0} width={710} className="flexibleContainer">
                                            <tbody><tr>
                                                <td valign="top" className="textContentLast" style={{fontSize: '14px', lineHeight: '20px', color: '#000000', paddingBottom: 0}}>
                                                  <h3 style={{fontSize: '16px', color: '#000000', paddingBottom: '5px'}}>
                                                    COMPANY NAME (BILLING INVOICE) - SINGDHA SRIJON
                                                    TOURS PRIVATE. LIMITED.</h3>
                                                  <span style={{color: '#f25c21', fontWeight: 700}}>Address:</span>
                                                  “Nirupama abasan” House No. 89, r.n Tagore
                                                  Road, Laldighi, Berhampore, Murshidabad, West Bengal
                                                  <br />
                                                  <span style={{color: '#f25c21', fontWeight: 700}}>Pin:</span>
                                                  742101 , india. <span style={{color: '#f25c21', fontWeight: 700}}>Mob:</span>
                                                  07431021007, 9733810397,
                                                  <span style={{color: '#f25c21', fontWeight: 700}}>E-mail:</span>
                                                  support@srijontours.com , ajoy@srijontours.com
                                                </td>
                                              </tr>
                                            </tbody></table>
                                          {/* // CONTENT TABLE */}
                                        </td>
                                      </tr>
                                    </tbody></table>
                                  {/* // FLEXIBLE CONTAINER */}
                                </td>
                              </tr>
                            </tbody></table>
                          {/* // CENTERING TABLE */}
                        </td>
                      </tr>
                      {/* // MODULE ROW */}
                      {/* MODULE ROW // */}
                      <tr>
                        <td align="center" valign="top">
                          {/* CENTERING TABLE // */}
                          <table border={0} cellPadding={0} cellSpacing={0} width="100%">
                            <tbody><tr>
                                <td align="center" valign="top">
                                  {/* FLEXIBLE CONTAINER // */}
                                  <table border={0} cellPadding={0} cellSpacing={0} width={750} className="flexibleContainer">
                                    <tbody><tr>
                                        <td align="center" valign="top" width={750} className="flexibleContainerCell">
                                          {/* CONTENT TABLE // */}
                                          <table border={0} cellPadding={0} cellSpacing={0} width="100%">
                                            <tbody><tr>
                                                <td valign="top" className="imageContentLast">
                                                  <img src={api.API_URL+'images/'+data.thumbnail} width={710} height={50} className="flexibleImage" style={{maxWidth: '710px', height:'400px'}} />
                                                </td>
                                              </tr>
                                              <tr>
                                                <td valign="top" className="textContent" style={{fontSize: '14px', lineHeight: '20px', color: '#000000'}}>
                                                  <h3 style={{fontSize: '16px', color: '#000000', paddingBottom: '5px'}}>
                                                    Respected Sir / Madam,</h3>
                                                  Greetings from <b>SINGDHA SRIJON TOURS PVT. LTD.
                                                    !!!</b> You are invited to joining for hotel
                                                  booking first time to <b>SINGDHA SRIJON TOURS
                                                    PRIVATE LIMITED</b>.
                                                </td>
                                              </tr>
                                              <tr>
                                                <td valign="top" className="textContent" style={{fontSize: '14px', lineHeight: '20px', paddingBottom: 0, color: '#000000'}}>
                                                  <h3 style={{fontSize: '16px', color: '#000000', paddingBottom: '5px'}}>
                                                  TOUR THEME: <b> {data.tourTheme} </b></h3>
                                                </td>
                                              </tr>
                                            </tbody></table>
                                          {/* // CONTENT TABLE */}
                                        </td>
                                      </tr>
                                    </tbody></table>
                                  {/* // FLEXIBLE CONTAINER */}
                                </td>
                              </tr>
                            </tbody></table>
                          {/* // CENTERING TABLE */}
                        </td>
                      </tr>
                      {/* // MODULE ROW */}
                      {/* MODULE ROW // */}
                      <tr>
                        <td align="center" valign="top">
                          {/* CENTERING TABLE // */}
                          <table border={0} cellPadding={0} cellSpacing={0} width="100%">
                            <tbody><tr>
                                <td align="center" valign="top">
                                  {/* FLEXIBLE CONTAINER // */}
                                  <table border={0} cellPadding={0} cellSpacing={0} width={750} className="flexibleContainer">
                                    <tbody><tr>
                                        <td valign="top" width={710} className="nestedContainerCell">
                                          {/* CONTENT TABLE // */}
                                          <table align="Left" border={0} cellPadding={0} cellSpacing={0} width={355} className="flexibleContainer">
                                            <tbody>
                                            {(data.dayDetails) ? data.dayDetails.sort((x, y) => {return x.day - y.day}).map((day,idx) => {
                                               return <tr>
                                               <td valign="top" className="textContent" style={{fontSize: '14px', fontWeight: 700, paddingBottom: '5px', lineHeight: '20px', color: '#000000'}}>
                                                 <span style={{color: '#f25c21'}}>Day {idx+1}: </span>
                                                 {day.title}
                                               </td>
                                             </tr>
                                            }) : ''}
                                            </tbody></table>
                                          {/* // CONTENT TABLE */}
                                        </td>
                                      </tr>
                                    </tbody></table>
                                  {/* // FLEXIBLE CONTAINER */}
                                </td>
                              </tr>
                            </tbody></table>
                          {/* // CENTERING TABLE */}
                        </td>
                      </tr>
                      {/* // MODULE ROW */}
                      {/* MODULE ROW PAX // */}
                      <tr>
                        <td align="center" valign="top">
                          {/* CENTERING TABLE // */}
                          <table border={0} cellPadding={0} cellSpacing={0} width="100%">
                            <tbody><tr>
                                <td align="center" valign="top">
                                  {/* FLEXIBLE CONTAINER // */}
                                  <table border={0} cellPadding={0} cellSpacing={0} width={710} className="flexibleContainer" style={{marginTop: '25px'}}>
                                    <tbody><tr>
                                        <td valign="top" width={710} className="flexibleContainerCell" style={{border: '#f25c21 1px solid'}}>
                                          {/* CONTENT TABLE // */}
                                          <table align="Left" border={0} cellPadding={0} cellSpacing={0} width={600} className="flexibleContainer" style={{marginRight: '25px', marginBottom: '20px'}}>
                                            <tbody>
                                              {/* <tr>
                                                <td valign="top" className="textContent" colSpan={2} style={{paddingBottom: '10px'}}>
                                                  <h3 style={{fontSize: '15px', color: '#000000'}}>
                                                    RATE 10 NIGHT 11 DAYS (B)</h3>
                                                </td>
                                              </tr> */}
                                              {_pax.slice(1).map((p,idx) => {
                                               return <tr>
                                                <td valign="top" className="textContent" style={{background: '#f36623', borderBottom: '#ffffff 1px solid', width: '50%', fontSize: '12px', fontWeight: 700, textAlign: 'center', paddingBottom: 0, lineHeight: '30px', color: '#ffffff'}}>
                                                {(idx + 1)*2} PAX RS {p}
                                                </td>
                                                <td valign="top" className="textContent" style={{background: '#2a3787', borderBottom: '#ffffff 1px solid', width: '50%', fontSize: '12px', fontWeight: 700, textAlign: 'center', paddingBottom: 0, lineHeight: '30px', color: '#ffffff'}}>
                                                  PER PAX {p/((idx + 1)*2)}
                                                </td>
                                              </tr>
                                              })}
                                              <tr>
                                                <td valign="top" colSpan={2} className="textContent" style={{borderBottom: '#ffffff 1px solid', width: '100%', fontSize: '12px', fontWeight: 400, paddingBottom: 0, paddingTop: '10px', lineHeight: '16px', color: '#000000'}}>
                                                  Extra person with bed <b>Rs 24000</b>, child without bed <b>Rs 16000</b>
                                                </td>
                                              </tr>
                                            </tbody></table>
                                          {/* // CONTENT TABLE */}
                                        </td>
                                      </tr>
                                    </tbody></table>
                                  {/* // FLEXIBLE CONTAINER */}
                                </td>
                              </tr>
                            </tbody></table>
                          {/* // CENTERING TABLE */}
                        </td>
                      </tr>
                      {/* // MODULE ROW PAX */}
                      {/* MODULE ROW ACCOUNT INFO // */}
                      <tr>
                        <td align="center" valign="top">
                          {/* CENTERING TABLE // */}
                          <table border={0} cellPadding={0} cellSpacing={0} width="100%">
                            <tbody><tr>
                                <td align="center" valign="top">
                                  {/* FLEXIBLE CONTAINER // */}
                                  <table border={0} cellPadding={0} cellSpacing={0} width={710} className="flexibleContainer" style={{marginTop: '20px'}}>
                                    <tbody><tr>
                                        <td valign="top" width={710} className="flexibleContainerCell" style={{border: '#f25c21 1px solid', paddingBottom: '20px'}}>
                                          {/* CONTENT TABLE // */}
                                          <table align="Left" border={0} cellPadding={0} cellSpacing={0} width={310} className="flexibleContainer" style={{marginRight: '20px'}}>
                                            <tbody><tr>
                                                <td valign="top" className="textContent" style={{fontSize: '20px', fontWeight: 700, paddingBottom: 0, lineHeight: '20px', color: '#f25c21'}}>
                                                  01.
                                                </td>
                                                <td valign="top" className="textContent" style={{fontSize: '12px', fontWeight: 400, paddingBottom: '5px', lineHeight: '18px', color: '#000000'}}>
                                                  <span style={{fontWeight: 700}}>Account Holder
                                                    Name:</span> Singdha Srijon Tours Private
                                                  Limited
                                                </td>
                                              </tr>
                                              <tr>
                                                <td valign="top" className="textContent" style={{paddingBottom: '5px'}}>
                                                  &nbsp;
                                                </td>
                                                <td valign="top" className="textContent" style={{fontSize: '12px', fontWeight: 400, paddingBottom: '5px', lineHeight: '18px', color: '#000000'}}>
                                                  <span style={{fontWeight: 700}}>Bank Name:</span>
                                                  State Bank of India
                                                </td>
                                              </tr>
                                              <tr>
                                                <td valign="top" className="textContent" style={{paddingBottom: '5px'}}>
                                                  &nbsp;
                                                </td>
                                                <td valign="top" className="textContent" style={{fontSize: '12px', fontWeight: 400, paddingBottom: '5px', lineHeight: '18px', color: '#000000'}}>
                                                  <span style={{fontWeight: 700}}>Branch:</span>
                                                  Katabagan
                                                </td>
                                              </tr>
                                              <tr>
                                                <td valign="top" className="textContent" style={{paddingBottom: '5px'}}>
                                                  &nbsp;
                                                </td>
                                                <td valign="top" className="textContent" style={{fontSize: '12px', fontWeight: 400, paddingBottom: '5px', lineHeight: '18px', color: '#000000'}}>
                                                  <span style={{fontWeight: 700}}>A/c No:</span>
                                                  39053858287
                                                </td>
                                              </tr>
                                              <tr>
                                                <td valign="top" className="textContent" style={{paddingBottom: '5px'}}>
                                                  &nbsp;
                                                </td>
                                                <td valign="top" className="textContent" style={{fontSize: '12px', fontWeight: 400, paddingBottom: '5px', lineHeight: '18px', color: '#000000'}}>
                                                  <span style={{fontWeight: 700}}>IFSC Code:</span>
                                                  SBIN0007147
                                                </td>
                                              </tr>
                                              <tr>
                                                <td valign="top" className="textContent" style={{paddingBottom: '5px'}}>
                                                  &nbsp;
                                                </td>
                                                <td valign="top" className="textContent" style={{fontSize: '12px', fontWeight: 400, paddingBottom: '5px', lineHeight: '18px', color: '#000000'}}>
                                                  <span style={{fontWeight: 700}}>Micro Code -</span>
                                                  742002101
                                                </td>
                                              </tr>
                                            </tbody></table>
                                          {/* // CONTENT TABLE */}
                                          {/* CONTENT TABLE // */}
                                          <table align="Left" border={0} cellPadding={0} cellSpacing={0} width={310} className="flexibleContainer">
                                            <tbody><tr>
                                                <td valign="top" className="textContent" style={{fontSize: '20px', fontWeight: 700, paddingBottom: 0, lineHeight: '20px', color: '#f25c21'}}>
                                                  02.
                                                </td>
                                                <td valign="top" className="textContent" style={{fontSize: '12px', fontWeight: 400, paddingBottom: '5px', lineHeight: '18px', color: '#000000'}}>
                                                  <span style={{fontWeight: 700}}>Account Holder
                                                    Name:</span> Singdha Srijon Tours Private
                                                  Limited
                                                </td>
                                              </tr>
                                              <tr>
                                                <td valign="top" className="textContent" style={{paddingBottom: '5px'}}>
                                                  &nbsp;
                                                </td>
                                                <td valign="top" className="textContent" style={{fontSize: '12px', fontWeight: 400, paddingBottom: '5px', lineHeight: '18px', color: '#000000'}}>
                                                  <span style={{fontWeight: 700}}>Bank Name:</span>
                                                  State Bank of India
                                                </td>
                                              </tr>
                                              <tr>
                                                <td valign="top" className="textContent" style={{paddingBottom: '5px'}}>
                                                  &nbsp;
                                                </td>
                                                <td valign="top" className="textContent" style={{fontSize: '12px', fontWeight: 400, paddingBottom: '5px', lineHeight: '18px', color: '#000000'}}>
                                                  <span style={{fontWeight: 700}}>Branch:</span>
                                                  Katabagan
                                                </td>
                                              </tr>
                                              <tr>
                                                <td valign="top" className="textContent" style={{paddingBottom: '5px'}}>
                                                  &nbsp;
                                                </td>
                                                <td valign="top" className="textContent" style={{fontSize: '12px', fontWeight: 400, paddingBottom: '5px', lineHeight: '18px', color: '#000000'}}>
                                                  <span style={{fontWeight: 700}}>A/c No:</span>
                                                  39053858287
                                                </td>
                                              </tr>
                                              <tr>
                                                <td valign="top" className="textContent" style={{paddingBottom: '5px'}}>
                                                  &nbsp;
                                                </td>
                                                <td valign="top" className="textContent" style={{fontSize: '12px', fontWeight: 400, paddingBottom: '5px', lineHeight: '18px', color: '#000000'}}>
                                                  <span style={{fontWeight: 700}}>IFSC Code:</span>
                                                  SBIN0007147
                                                </td>
                                              </tr>
                                              <tr>
                                                <td valign="top" className="textContent" style={{paddingBottom: '5px'}}>
                                                  &nbsp;
                                                </td>
                                                <td valign="top" className="textContent" style={{fontSize: '12px', fontWeight: 400, paddingBottom: '5px', lineHeight: '18px', color: '#000000'}}>
                                                  <span style={{fontWeight: 700}}>Micro Code -</span>
                                                  742002101
                                                </td>
                                              </tr>
                                            </tbody></table>
                                          {/* // CONTENT TABLE */}
                                        </td>
                                      </tr>
                                    </tbody></table>
                                  {/* // FLEXIBLE CONTAINER */}
                                </td>
                              </tr>
                            </tbody></table>
                          {/* // CENTERING TABLE */}
                        </td>
                      </tr>
                      {/* // MODULE ROW  */}
                      <tr>
                        <td align="center" valign="top">
                          {/* CENTERING TABLE  // */}
                          <table border={0} cellPadding={0} cellSpacing={0} width="100%">
                            <tbody>
                              <tr>
                                <td align="center" valign="top">
                                  {/* FLEXIBLE CONTAINER // */}
                                  <table border={0} cellPadding={0} cellSpacing={0} width={750} className="flexibleContainer">
                                    <tbody>
                                      <tr>
                                        <td align="center" valign="top" width={750} className="flexibleContainerCell bottomShim">
                                          <table border={0} cellPadding={0} cellSpacing={0} width="100%" className>
                                            <tbody>
                                              <tr>
                                                <td align="center" valign="top" className>
                                                  {/* CONTENT TABLE // */}
                                                  <table border={0} cellPadding={0} cellSpacing={0} width="100%">
                                                    <tbody>
                                                      <tr>
                                                        <td valign="top" className="textContent" style={{fontSize: '14px', color: '#000000'}}>
                                                          <h3 style={{paddingBottom: '10px'}}>{data.tourName}</h3>
                                                          {parse(data.description || '')}
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td valign="top" className="textContent" style={{fontSize: '14px', color: '#000000'}}>
                                                              <table width="100%">
                                                                <tr>
                                                                  <td><b>City: </b> {getCityName(data.cityId)}</td>
                                                                  <td><b>State: </b> {getStateName(data.stateId)}</td>
                                                                  <td><b>Country: </b> {getCountryName(data.countryId)}</td>
                                                                </tr>
                                                              </table>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  {/* // CONTENT TABLE */}
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  {/* // FLEXIBLE CONTAINER */}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          {/* // CENTERING TABLE */}
                        </td>
                      </tr>
                      {/* MODULE ROW // */}
                      {(data.dayDetails) ? data.dayDetails.sort((x, y) => {return x.day - y.day}).map((day,idx) => {
                       let hotels = day.hotel
                       let activities = day.activity
                       let flights = day.flight
                       let transports = day.transport
                      return <tr>
                        <td align="center" valign="top">
                          {/* CENTERING TABLE // */}
                          <table border={0} cellPadding={0} cellSpacing={0} width="100%">
                            <tbody>
                              <tr>
                                <td align="center" valign="top">
                                  {/* FLEXIBLE CONTAINER // */}
                                  <table border={0} cellPadding={0} cellSpacing={0} width={750} className="flexibleContainer">
                                    <tbody><tr>
                                        <td valign="top" width={750} className="flexibleContainerCell">
                                          {/* CONTENT TABLE // */}
                                          {/*
                                                            	Keeping the table markup in its original
                                                                order and swapping the align attribute values
                                                                allows the tables to wrap in the correct order
                                                                on small displays.
                                                            */}
                                          <table align="Right" border={0} cellPadding={0} cellSpacing={0} width={200} className="flexibleContainer">
                                            <tbody><tr>
                                                <td align="Left" valign="top" className="imageContent">
                                                  <img src={`${api.API_URL}images/${day.thumbnail}`} width={200} className="flexibleImage" style={{maxWidth: '200px'}} />
                                                </td>
                                              </tr>
                                            </tbody></table>
                                          {/* // CONTENT TABLE */}
                                          {/* CONTENT TABLE // */}
                                          <table align="Left" border={0} cellPadding={0} cellSpacing={0} width={500} className="flexibleContainer">
                                            <tbody><tr>
                                                <td valign="top" colSpan={2} className="textContent" style={{fontSize: '14px', color: '#000000'}}>
                                                  <h3 style={{fontSize: '16px', color: '#000000'}}><span style={{fontSize: '50px', color: '#f25c21'}}>
                                                    { idx+1<10 ? `0${idx+1}` : idx+1 }</span>DAY
                                                  </h3>
                                                  <br />
                                                  <h3 style={{fontSize: '16px', color: '#000000'}}>
                                                  {day.title}</h3>
                                                  <br />
                                                  {day.description}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td valign="top" className="textContent" style={{fontSize: '14px', lineHeight: '20px', color: '#000000', width: '50%', paddingBottom: '20px'}}>
                                                  <h3 style={{fontSize: '16px', color: '#f25c21', paddingBottom: '10px'}}>Hotels</h3>
                                                  {_.take(hotels, hotels.length).map((h, Key) => {
                                                        return <div>
                                                            <b>{Key+1}. {getHotelName(h)}</b>
                                                        </div>                                                
                                                })}
                                                </td>
                                                <td valign="top" className="textContent" style={{fontSize: '14px', color: '#000000', width: '50%', paddingBottom: '20px'}}>
                                                  <h3 style={{fontSize: '16px', color: '#f25c21', paddingBottom: '10px'}}>Activities</h3>
                                                  {_.take(activities, activities.length).map((h, Key) => {
                                                        return <div>
                                                            <b>{Key+1}. {getActivityName(h)}</b>
                                                        </div>                                                
                                                })}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td valign="top" className="textContent" style={{fontSize: '14px', color: '#000000', width: '50%', paddingBottom: '20px'}}>
                                                  <h3 style={{fontSize: '16px', color: '#f25c21', paddingBottom: '10px'}}>Flights</h3>
                                                  {_.take(flights, flights.length).map((h, Key) => {
                                                        return <div>
                                                            <b>{Key+1}. {getFlightName(h)}</b>
                                                        </div>                                                
                                                })}
                                                </td>
                                                <td valign="top" className="textContent" style={{fontSize: '14px', color: '#000000', width: '50%', paddingBottom: '20px'}}>
                                                  <h3 style={{fontSize: '16px', color: '#f25c21', paddingBottom: '10px'}}>Travels</h3>
                                                  {_.take(transports, transports.length).map((h, Key) => {
                                                        return <div>
                                                            <b>{Key+1}. {getTransportName(h)}</b>
                                                        </div>                                                
                                                })}
                                                </td>
                                              </tr>
                                            </tbody></table>
                                          {/* // CONTENT TABLE */}
                                        </td>
                                      </tr>
                                    </tbody></table>
                                  {/* // FLEXIBLE CONTAINER */}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          {/* // CENTERING TABLE */}
                        </td>
                      </tr>
                      }) : ''}
                      {/* // MODULE ROW */}
                     
                    </tbody></table>
                  {/* // EMAIL CONTAINER */}
                </td>
              </tr>
            </tbody></table>
        </center>
      </div>
      })}
        </>
    );
  
}

export default Main;