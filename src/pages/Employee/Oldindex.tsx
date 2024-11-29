// @ts-nocheck
import _ from "lodash";
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
import React from "react";

import { fetchAllEmployee, deleteEmployee } from "./employeeSlice";
import { useAppSelector, useAppDispatch } from "../../stores/hooks";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const Main = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.employee);

  const [displayData, setDisplayData] = React.useState(null);
  const [employeeType, setEmployeeType] = React.useState("Y");
  const [searchTerm, setSearchTerm] = React.useState("");
  let path = window.location.href;
  let form16 = path.search('form16');
  let loans = path.search('loans');
  //console.log(form16)

  useEffect(() => {
    dispatch(fetchAllEmployee());
  }, [loans]);

  useEffect(() => {
    employeeTypeFilter(employeeType);
  }, [data]);

  //console.log("Data: ", data);

  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const deleteButtonRef = useRef(null);
  const deleteValueRef = useRef("");

  const handleDelete = (id: any) => {
    dispatch(deleteEmployee(deleteValueRef.current));
    dispatch(fetchAllEmployee());
    setDeleteConfirmationModal(false);
  };

  const employeeTypeFilter = (empType) => {
    if (empType == "A") {
      setDisplayData(data);
      return;
    }
    //alert(1)
    if(data.length>1){
      let temp = data.filter((item) => item.isActive == empType);

    setDisplayData(temp);
    }
    
  };

  const searchFunction = (term) => {
    if (term?.length < 3) {
      employeeTypeFilter(employeeType);
      return;
    }

    let temp = data.filter((item) => {
      if (
        item === null ||
        item === undefined ||
        item.empName === null ||
        item.empName === undefined
      ) {
        return false;
      }

      const lowercasedEmpName = item.empName.toLowerCase();
      const lowercasedTerm = term.toLowerCase();

      return lowercasedEmpName.includes(lowercasedTerm);
    });

    

    setDisplayData(temp);
  };

  console.log("Emp: ",data);

  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y">Manage Employee</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
          <FormSelect
            id="active_employees_manage_employees"
            name="active_employees"
            className="w-44"
            onChange={(e) => {
              setEmployeeType(e.target.value);
              employeeTypeFilter(e.target.value);
            }}
            value={employeeType}
          >
            <option value="A">Select All</option>
            <option value="Y">Active Employees</option>
            <option value="N">Inactive Employees</option>
          </FormSelect>
          <Menu className="ml-4">
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
          <div className="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0 flex">
            <Link to="/add-employee">
              <Button variant="primary" className="mr-2 shadow-md">
                Add Employee
              </Button>
            </Link>

            <div className="relative w-56 text-slate-500 ml-3">
              <FormInput
                type="text"
                className="w-56 pr-10 !box"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  searchFunction(e.target.value);
                }}
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
                  Employee ID
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
              {displayData &&
                _.take(displayData, displayData.length).map((item, Key) => (
                  <Table.Tr key={Key} className="intro-x">
                    <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                      {/* <a href="" className="font-medium whitespace-nowrap"> */}
                      {item.id}
                      {/* </a> */}
                      {/* <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                      Tags: {faker.categories[0].tags}
                    </div> */}
                    </Table.Td>

                    <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                      {/* <a href="" className="font-medium whitespace-nowrap"> */}
                      <a href={loans !== -1 ? `/loans/${item.id}`  : `/empOverview/${item.id}`} className="text-sm word-wrap underline whitespace-nowrap">{item.empName}</a>
                      {/* </a> */}
                      {/* <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                      Tags: {faker.categories[0].tags}
                    </div> */}
                    </Table.Td>
                    <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                      {item.empEmail}
                    </Table.Td>
                    <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                      {item.empPhone}
                    </Table.Td>
                    <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                      {format(new Date(item.createdAt), "yyyy/MM/dd kk:mm:ss")}
                    </Table.Td>
                    <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                      {format(new Date(item.updatedAt), "yyyy/MM/dd kk:mm:ss")}
                    </Table.Td>
                    <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                      <div
                        className={clsx([
                          "flex items-center justify-center",
                          {
                            "text-success":
                              item.isActive === "Y" ? true : false,
                          },
                          {
                            "text-danger": !(item.isActive === "Y"
                              ? true
                              : false),
                          },
                        ])}
                      >
                        <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
                        {item.isActive === "Y" ? "Active" : "Inactive"}
                      </div>
                    </Table.Td>
                    <Table.Td className="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                      <div className="flex items-center justify-center">
                        <Link to={`/edit-employee/${item.id}`}>
                          <a className="flex items-center mr-3">
                            <Lucide
                              icon="CheckSquare"
                              className="w-4 h-4 mr-1"
                            />
                            Edit
                          </a>
                        </Link>
                        { form16 !== -1 &&
                            <Link to={`/form16/${item.id}`}>
                            <a className="flex items-center mr-3 whitespace-nowrap">
                              <Lucide icon="Book" className="w-4 h-4 mr-1" />
                              form 16
                            </a>
                          </Link>
                        }
                        
                        <a
                          className="flex items-center text-danger"
                          href="#"
                          onClick={(event) => {
                            event.preventDefault();
                            deleteValueRef.current = item.id;
                            setDeleteConfirmationModal(true);
                          }}
                        >
                          <Lucide icon="Trash2" className="w-4 h-4 mr-1" />{" "}
                          Delete
                        </a>
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
    </>
  );
};

export default Main;
