// @ts-nocheck
import _, { result } from "lodash";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import fakerData from "../../utils/faker";
import Button from "../../base-components/Button";
import Pagination from "../../base-components/Pagination";
import { FormInput, FormSelect } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import Tippy from "../../base-components/Tippy";
import { Dialog, Menu } from "../../base-components/Headless";
import Table from "../../base-components/Table";

import { fetchAllVendorActivity, deleteVendorActivity } from "./vendorActivitySlice";
import { useAppSelector, useAppDispatch } from "../../stores/hooks";
import { Link } from "react-router-dom";
import { format } from 'date-fns';
import api from "../../../apiconfig.json";

const Main = ()=>{
    const server = api.API_URL;
    const imgaePath = `${server}images/activity/`;
    const dispatch = useAppDispatch();
    const { data } = useAppSelector((state) => state.vendorActivity);

     

  ////console.log("Data: ",data)
  const [superlargeModalSizePreview, setSuperlargeModalSizePreview] = useState(false);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [fiterData, setfilterData] = useState("");
  const deleteButtonRef = useRef(null);
  const deleteValueRef = useRef("");

  const handleDelete = (id: any) => {
    dispatch(deleteVendorActivity(deleteValueRef.current));
    dispatch(fetchAllVendorActivity());
    setDeleteConfirmationModal(false);    
  };
 
  
  useEffect(()=>{
    dispatch(fetchAllVendorActivity());
},[]);  

  

  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y">Manage Activity (Vendor)</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
        <Link to="/add-vendor-activity">
            <Button variant="primary" className="mr-2 shadow-md">
                Add Activity
            </Button>
          </Link>
          <Menu>
            <Menu.Button as={Button} className="px-2 !box">
              <span className="flex items-center justify-center w-5 h-5">
                <Lucide icon="Plus" className="w-4 h-4" />
              </span>
            </Menu.Button>
            <Menu.Items className="w-40">
              <Menu.Item>
                <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export to
                Excel
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export to
                PDF
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
        {/* BEGIN: Users Layout */}
        {_.take(data, data.length).map((item, Key) => (
          
          <div
            key={Key}
            className="col-span-12 intro-y md:col-span-6 lg:col-span-4 xl:col-span-3"
          >
            <div className="box">
              <div className="p-5">
                <div className="h-40 overflow-hidden rounded-md 2xl:h-56 image-fit before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-black before:to-black/10">
                  <img
                    alt="Midone - HTML Admin Template"
                    className="rounded-md"
                    src={imgaePath+item.mainImg}
                  />
                  {/* {faker.trueFalse[0] && (
                    <span className="absolute top-0 z-10 px-2 py-1 m-5 text-xs text-white rounded bg-pending/80">
                      Featured
                    </span>
                  )} */}
                  <div className="absolute bottom-0 z-10 px-5 pb-6 text-white">
                    <a href="" className="block text-base font-medium">
                      {item.activityName}
                    </a>
                    <span className="mt-3 text-xs text-white/90">
                    {_.truncate(item.desc, {length: 80})}
                    </span>
                  </div>
                </div>
                <div className="mt-5 text-slate-600 dark:text-slate-500">
                  {
                    item.adultFee &&  
                  <div className="flex items-center">
                    <Lucide icon="Link" className="w-4 h-4 mr-2" /> Adult Fees: {item.currency}{item.adultFee}
                  </div>
                  }
                  {
                    item.kidFee &&  
                  <div className="flex items-center">
                    <Lucide icon="Link" className="w-4 h-4 mr-2" /> Kid Fees: {item.currency}{item.kidFee}
                  </div>
                  }
                  {
                    item.infantFee &&  
                  <div className="flex items-center">
                    <Lucide icon="Link" className="w-4 h-4 mr-2" /> Infant Fees: {item.currency}{item.infantFee}
                  </div>
                  }
                  {
                    item.guideFee!=0 &&  
                  <div className="flex items-center">
                    <Lucide icon="Link" className="w-4 h-4 mr-2" /> Guide Fees: {item.currency}{item.guideFee}
                  </div>
                  }
                  <div className="flex items-center mt-2">
                    <Lucide icon="Layers" className="w-4 h-4 mr-2" /> Start Time: {item.startTime}
                  </div>
                  <div className="flex items-center mt-2">
                    <Lucide icon="Layers" className="w-4 h-4 mr-2" /> End Time: {item.endTime}
                  </div>
                  <div className="flex items-center mt-2">
                    <Lucide icon="Layers" className="w-4 h-4 mr-2" /> Duration: {item.duration}:{item.durationM}
                  </div>
                  <div 
                  className={clsx([
                    "flex items-center mt-2",
                    { "text-success":  (item.isActive==='Y' ? true : false) },
                    { "text-danger": ! (item.isActive==='Y' ? true : false) },
                  ])} 
                  >
                    <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
                    Status: {item.isActive=='Y' ? "Active" : "Inactive"}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center p-5 border-t lg:justify-end border-slate-200/60 dark:border-darkmode-400">
              <Link to={`/view-vendor-activity/${item.id}`} className="flex items-center mr-auto text-primary" href="#">
                  <Lucide icon="Eye" className="w-4 h-4 mr-1" /> Preview
                </Link>
                <Link to={`/edit-vendor-activity/${item.id}`} className="flex items-center mr-3" href="#">
                  <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" /> Edit
                </Link>
                <a
                  className="flex items-center text-danger"
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                   deleteValueRef.current = item.id;
                   dispatch(setDeleteConfirmationModal(true));
                  }}
                >
                  <Lucide icon="Trash2" className="w-4 h-4 mr-1" /> Delete
                </a>
              </div>
            </div>
          </div>
        ))}
        {/* END: Users Layout */}
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
    </>
  );
}

export default Main;
