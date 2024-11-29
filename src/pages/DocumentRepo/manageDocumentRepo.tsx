// @ts-nocheck
import { useState, useEffect } from "react";
import {
    PreviewComponent,
    Preview,
  } from "../../base-components/PreviewComponent";
  import {
    FormLabel,
    FormInput,
    FormSelect,
  } from "../../base-components/Form";
  import Button from "../../base-components/Button";
  import Alert from "../../base-components/Alert";
  import Notification from "../../base-components/Notification";
  import Lucide from "../../base-components/Lucide";
  import { useForm } from "react-hook-form";
  import Toastify from "toastify-js";
  import clsx from "clsx";
  import { yupResolver } from "@hookform/resolvers/yup";
  import * as yup from "yup";
  import React from "react";
  import { Link } from "react-router-dom";
  import { useAppDispatch, useAppSelector } from "../../stores/hooks";
  import api from "../../../apiconfig.json";
  import axios from "axios";
  
  const uploadDocumentToRepo = ()=>{
    const dispatch = useAppDispatch();
    const [repoObj,setRepoObj] = useState({})
    const [uploadStatus,setUploadStatus] = useState('')
    const [deleteStatus,setDeleteStatus] = useState('')
    const [reload,setReload] = useState(0)

    const [selected,setSelected] = useState([])
    const [renderer,setRenderer] = useState(0)
    const select = (id) => {
      let index = selected.indexOf(id)
      if (index === -1) {
        setSelected([...selected,id])
      } else {
        let newSelected = selected
        newSelected.splice(index, 1)
        setSelected(newSelected)
        setRenderer(renderer+1)
      }
      console.log({selected})
    }

    const deleteSelected = () => {
      // dispatch(deleteDocument({ files: selected, folder: repoFor }))
      const URL = `${api.API_URL}${api.API_ENDPOINT.DOCUMENT_REPO}`;
      axios.post(`${URL}/delete-document?folder=${repoFor}`, { files: selected, folder: repoFor }, {
        headers: {},
      }).catch(err => {
        console.log({err})
      });
      setDeleteStatus(selected.length + ' document(s) deleted') 
      setSelected([])
      setReload(reload + 1)      
    }
    
    // const repoDocuments = useAppSelector((state) => state.itinerary);
    const [repoFor,setRepoFor] = useState('crm-lead/')
    const [repoDocuments,setRepoDocuments] = useState([])
    useEffect(() => {
      // dispatch(viewGallery()) 
      const URL = `${api.API_URL}${api.API_ENDPOINT.DOCUMENT_REPO}`;
      axios.post(`${URL}/view-gallery/?folder=${repoFor}`, {}, {
        headers: {},
      }).then((result)=>{
        console.log({documents: result})
        setRepoDocuments(result.data.files)
        // console.log({repoDocuments})
      }).catch(err => {
        console.log({err})
      });    
    },[reload,repoFor])
    // console.log({repoDocuments})

    const uploadRepoDocument = async () => {
      if (Object.keys(repoObj).length != 0) {
        var formData = new FormData();
        Object.keys(repoObj).map((Key) => {
          formData.append('files', repoObj[Key]);
        });
        console.log({repoObj})
        formData.append('folder', 'uploads/documents');
        for (var [key, value] of formData.entries()){
          console.log(key,value);
        }
        // let x = await dispatch(uploadGalleryDocument(formData,'uploads/hotel'))
        const URL = `${api.API_URL}${api.API_ENDPOINT.DOCUMENT_REPO}`;
        axios.post(`${URL}/upload-multi-document/${repoFor}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        }).then((result)=>{
          console.log(result.data.filenames)
          setUploadStatus(result.data.filenames.length + ' document(s) uploaded succesfully.')
          setReload(reload + 1)
        }).catch(err => {
          console.log({err})
        });
         
      } else {
          console.log('Select a file first')
      }   
    }
  
    return (
      <>
        <div className="flex items-center mt-8 intro-y">
          <h2 className="mr-auto text-lg font-medium">Manage Document Repository</h2>
        </div>
        <div className="grid grid-cols-12 gap-6 mt-5">
          <div className="col-span-12 intro-y lg:col-span-12">
            {/* BEGIN: Form Validation */}
            <PreviewComponent className="intro-y box">
              
                <>
                  <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                    <h2 className="mr-auto text-base font-medium">
                      Upload Documents
                    </h2>
                  </div>
                  <div className="p-5">
                    <Preview>
                      <div className="input-form mb-5">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Repository For
                        </FormLabel>
                        <FormSelect 
                          className="sm:mr-2"
                          onChange={e => setRepoFor(e.target.value)} 
                          value={repoFor}
                          aria-label="Default select example">
                            <option value='crm-lead/'>CRM Leads</option>
                        </FormSelect>
                      </div>
                      <div className="input-form">                        
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Select One or Many Files
                          {/* <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                            Required, at least 2 characters
                          </span> */}
                        </FormLabel>
                        <FormInput
                          id="choose-files"
                          type="file"
                          name="choose-files"
                          onChange={(e) => setRepoObj(e.target.files)}
                          multiple
                        />

                        
                        { (uploadStatus != '') ? <Alert variant="outline-success" className="flex items-center my-2">
                            {({ dismiss }) => (
                            <>
                                {uploadStatus}
                                <Alert.DismissButton type="button" className="btn-close" onClick={() => {dismiss; setUploadStatus('');}} aria-label="Close">
                                    <Lucide icon="X" className="w-4 h-4" />
                                </Alert.DismissButton>
                            </>
                            )}
                        </Alert> : ''}

                        { (deleteStatus != '') ? <Alert variant="outline-danger" className="flex items-center my-2">
                            {({ dismiss }) => (
                            <>
                                {deleteStatus}
                                <Alert.DismissButton type="button" className="btn-close" onClick={() => {dismiss; setDeleteStatus('');}} aria-label="Close">
                                    <Lucide icon="X" className="w-4 h-4" />
                                </Alert.DismissButton>
                            </>
                            )}
                        </Alert> : ''}

                        <Button variant="primary" type="submit" className="mt-5 w-24 mr-1" onClick={() => uploadRepoDocument()}>
                            Upload
                        </Button>
                        <Button variant="outline-primary" type="submit" onClick={() => deleteSelected()} disabled={(selected.length === 0) ? 'true' : '' } className="mt-5 mr-1" >
                            Delete selected
                        </Button>
                        
                      </div>
                    </Preview>
                  </div>
                </>
            
            </PreviewComponent>
            {/* END: Form Validation */}
            
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 mt-5">
            <div className="col-span-12 intro-y lg:col-span-12">
                <div className="intro-y box">                
                    <>
                    <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                        <h2 className="mr-auto text-base font-medium">
                        Document Repository
                        </h2>
                    </div>
                    <div className="grid grid-cols-3 gap-6 p-5">
                        {/* {repoDocuments.data.files?.map((file,Key) => { */}
                        {repoDocuments.map((file,Key) => {
                            var border = ''
                            if (selected.includes(file)) {
                              border = 'border-dashed'
                            }
                            return <div key={Key} onClick={() => {select(file)}} className={`${border} border-4 border-primary rounded-xl p-4`}>
                              {/* <div className="rounded " onClick={() => {select(file)}} style={{height:'200px', backgroundDocument:`url(${api.API_URL}documents/${repoFor}${file})`, backgroundPosition:'center', backgroundSize:'cover', border }}>
                            
                              </div> */}
                              {file}
                            </div>
                        })}
                    </div>
                    </>
                </div>
            </div>
        </div>

        {/* BEGIN: Success Notification Content */}
        <Notification
            id="success-notification-content"
            className="flex hidden"
        >
            <Lucide icon="CheckCircle" className="text-success" />
            <div className="ml-4 mr-4">
            <div className="font-medium">Data saved successfully!</div>
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
                Please check the file upload guidelines.
            </div>
            </div>
        </Notification>
        {/* END: Failed Notification Content */}
      </>
    );
  }
  
  export default uploadDocumentToRepo;