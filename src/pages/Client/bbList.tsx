// @ts-nocheck
import _ from "lodash";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "../../base-components/Button";
import Pagination from "../../base-components/Pagination";
import { FormLabel,FormInput, FormInline } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import Tippy from "../../base-components/Tippy";
import { Dialog, Menu } from "../../base-components/Headless";
import Table from "../../base-components/Table";

import { fetchAllVendor, deleteVendor } from "../Vendor/vendorSlice";
import { useAppSelector, useAppDispatch } from "../../stores/hooks";
import { Link, useParams } from "react-router-dom";
import { format } from 'date-fns';
import axios from "axios";
import api from "../../../apiconfig.json";


const Main = ()=>{
  const server = api.API_URL;
  const userId = JSON.parse(localStorage.getItem("userInfo"))["resData"]["sUserName"];
    const params = useParams();
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
    } = useForm({
      mode: "onChange",
      resolver: yupResolver(schema),
    });
    
    //const paramsType = (params.type)? params.type : 'all';
    //console.log("param :", paramsType);
    const dispatch = useAppDispatch();
    const { data } = useAppSelector((state) => state.vendor);

    useEffect(()=>{
      dispatch(fetchAllVendor('B2B'));
  },[]);   

    ////console.log("Data: ",data)
  
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const deleteButtonRef = useRef(null);
  const deleteValueRef = useRef("");

  const handleDelete = (id: any) => {
    dispatch(deleteVendor(deleteValueRef.current));
    dispatch(fetchAllVendor());
    setDeleteConfirmationModal(false);
    
    
  };
  const config = { responseType: 'blob' };
  const handleExport = ()=>{
    const res = axios.get(`${server}customer-data/`, config).then(function (response) {
      console.log(response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'bbClient.csv');
      document.body.appendChild(link);
      link.click();
      alert("Data Download Successfully");
    })
    .catch(function (error) {
      console.log(error);
      alert("Data Not Downloaded");
    });
  }

  const [dataImportModal, setDataImportModal] = useState(false);
  const [csvFile, setCsvFile] = useState('');

  const hanleImport = ()=>{
    setDataImportModal(true);
  }

  const uploadCsv = ()=>{
    
    if(csvFile && csvFile.name.split('.').pop()==='csv'){
      let formdata = new FormData();
      formdata.append("file", csvFile);
      console.log(formdata);
  
      const res = axios.post(`${server}customer-data/upload`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(function (response) {
        //console.log(response);
        alert(response.data.message);
        setDataImportModal(false);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
        const xmlString = error.response.data;
        const doc = new DOMParser().parseFromString(xmlString, "text/xml");
        alert(doc.innerHTML);
      });
    }else{
      alert("Please Upload CSV file");
    }
  }

  

  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y">Manage B2B Client</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
        <Link to="/add-client-bb">
            <Button variant="primary" className="mr-2 shadow-md">
                Add Client
            </Button>
          </Link>
          <Menu>
            <Menu.Button as={Button} className="px-2 !box">
              <span className="flex items-center justify-center w-5 h-5">
                <Lucide icon="Plus" className="w-4 h-4" />
              </span>
            </Menu.Button>
            <Menu.Items className="w-40">
              <Menu.Item onClick={handleExport}>
                <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export to
                Excel
              </Menu.Item>
              <Menu.Item onClick={hanleImport}>
                <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Import Client
              </Menu.Item>
            </Menu.Items>
          </Menu>
          <div className="hidden mx-auto md:block text-slate-500">
            {/* Showing 1 to 10 of 150 entries */}
          </div>
          <div className="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
            <div className="relative w-56 text-slate-500">
              <FormInput
                type="text"
                className="w-56 pr-10 !box"
                placeholder="Search..."
              />
              <Lucide
                icon="Search"
                className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
              />
            </div>
          </div>
        </div>
        {/* BEGIN: Data List */}
        <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
          <Table className="border-spacing-y-[10px] border-separate -mt-2">
            <Table.Thead>
              <Table.Tr>
                {/* <Table.Th className="border-b-0 whitespace-nowrap">
                  IMAGES
                </Table.Th> */}
                <Table.Th className="border-b-0 whitespace-nowrap">
                  CLIENT ID
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  NAME
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  EMAIL
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  MOBILE
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  CREATED BY
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  CREATED ON
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  UPDATED ON
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  STATUS
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  ACTIONS
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {_.take(data, data.length).map((item, Key) => (
                <Table.Tr key={Key} className="intro-x">
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    {/* <a href="" className="font-medium whitespace-nowrap"> */}
                      {item.vUserName}
                    {/* </a> */}
                    {/* <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                      Tags: {faker.categories[0].tags}
                    </div> */}
                  </Table.Td>                
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    {/* <a href="" className="font-medium whitespace-nowrap"> */}
                    <Link to={`/show-bb-client/${item.id}`} className="hover:text-red-500">
                        {item.vName}
                    </Link>
                      
                    {/* </a> */}
                    {/* <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                      Tags: {faker.categories[0].tags}
                    </div> */}
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                  { item.vEmail }
                    
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                  { item.vMobile }
                    
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                  { item.uName }
                    
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                  { format(new Date(item.createdAt), 'yyyy/MM/dd kk:mm:ss') }
                    
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                  { format(new Date(item.updatedAt), 'yyyy/MM/dd kk:mm:ss') }
                    
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div
                        className={clsx([
                            "flex items-center justify-center",
                            { "text-success":  (item.isActive==='Y' ? true : false) },
                            { "text-danger": ! (item.isActive==='Y' ? true : false) },
                          ])} 
                    >
                      <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
                      {item.isActive==='Y' ? "Active" : "Inactive"}
                    </div>
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                    <div className="flex items-center justify-center">
                    <Link to={`/upload-doc-bb/${item.id}`}>
                      <a className="flex items-center mr-3" >
                        <Lucide icon="Upload" className="w-4 h-4 mr-1" />
                        Document
                      </a>
                      </Link>
                      <Link to={`/edit-client-bb/${item.id}`}>
                      <a className="flex items-center mr-3" >
                        <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" />
                        Edit
                      </a>
                      </Link>
                      {userId==='SSTU2097'?
                      <a
                        className="flex items-center text-danger"
                        href="#"
                        onClick={(event) => {
                          event.preventDefault();
                         deleteValueRef.current = item.id;
                         setDeleteConfirmationModal(true);
                          
                        }}
                      >
                        <Lucide icon="Trash2" className="w-4 h-4 mr-1" /> Delete
                      </a>
                      :''}
                    </div>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
        {/* END: Data List */}
        {/* BEGIN: Pagination */}
        {/* <div className="flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap">
          <Pagination className="w-full sm:w-auto sm:mr-auto">
            <Pagination.Link>
              <Lucide icon="ChevronsLeft" className="w-4 h-4" />
            </Pagination.Link>
            <Pagination.Link>
              <Lucide icon="ChevronLeft" className="w-4 h-4" />
            </Pagination.Link>
            <Pagination.Link>...</Pagination.Link>
            <Pagination.Link>1</Pagination.Link>
            <Pagination.Link active>2</Pagination.Link>
            <Pagination.Link>3</Pagination.Link>
            <Pagination.Link>...</Pagination.Link>
            <Pagination.Link>
              <Lucide icon="ChevronRight" className="w-4 h-4" />
            </Pagination.Link>
            <Pagination.Link>
              <Lucide icon="ChevronsRight" className="w-4 h-4" />
            </Pagination.Link>
          </Pagination>
          <FormSelect className="w-20 mt-3 !box sm:mt-0">
            <option>10</option>
            <option>25</option>
            <option>35</option>
            <option>50</option>
          </FormSelect>
        </div> */}
        {/* END: Pagination */}
      </div>
      {/* BEGIN: Delete Confirmation Modal */}
      <Dialog
        open={deleteConfirmationModal}
        onClose={() => {
          setDeleteConfirmationModal(false);
        }}
        initialFocus={deleteButtonRef}
      >
        <Dialog.Panel>
          <div className="p-5 text-center">
            <Lucide
              icon="XCircle"
              className="w-16 h-16 mx-auto mt-3 text-danger"
            />
            <div className="mt-5 text-3xl">Are you sure?</div>
            <div className="mt-2 text-slate-500">
              Do you really want to delete these records? <br />
              This process cannot be undone.
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => {
                setDeleteConfirmationModal(false);
              }}
              className="w-24 mr-1"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              type="button"
              className="w-24"
              ref={deleteButtonRef}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </Dialog.Panel>
      </Dialog>
      {/* END: Delete Confirmation Modal */}
      {/* BEGIN: Delete Confirmation Modal */}
      <Dialog
        open={dataImportModal}
        onClose={() => {
          setDataImportModal(false);
        }}
      >
        <Dialog.Panel>
                        <Dialog.Title>
                          <h2 className="mr-auto text-base font-medium">
                            Import Client
                          </h2>
                          
                        </Dialog.Title>
                        <Dialog.Description >
                            <div>
                            <FormInput
                              {...register("csvFile")}
                              id="csvFile"
                              type="file"
                              className="mt-3 sm:mt-0"
                              onChange={(e) => setCsvFile(e.target.files[0])}
                            />
                            </div>
                          
                        </Dialog.Description>
                        <Dialog.Footer>
                          <Button
                            type="button"
                            variant="outline-secondary"
                            onClick={() => {
                              setDataImportModal(false);
                            }}
                            className="w-20 mr-1"
                          >
                            Cancel
                          </Button>
                          <Button 
                              type="button" 
                              onClick={()=>uploadCsv()} 
                              variant="primary" 
                              className="mt-2 sm:mt-0"> Upload
                            </Button>
                        </Dialog.Footer>
                      </Dialog.Panel>
      </Dialog>
      {/* END: Delete Confirmation Modal */}
    </>
  );
}

export default Main;
