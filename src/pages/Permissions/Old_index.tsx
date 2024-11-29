// @ts-nocheck
import _ from "lodash";
import { useState, useRef, useEffect } from "react";
import Button from "../../base-components/Button";
import { FormInput } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import { Dialog, Disclosure, Menu } from "../../base-components/Headless";
import Table from "../../base-components/Table";

import { useAppSelector, useAppDispatch } from "../../stores/hooks";
import { Link } from "react-router-dom";
import {
  Permission,
  deletePermission,
  fetchPermissions,
  getPermission,
  updatePermission,
} from "../../stores/permissionsSlice";
import Toastify from "toastify-js";
import Notification from "../../base-components/Notification";
import { MenuDataItem } from "../../types/types";
import { ChevronDown } from "lucide-react";

interface MenuItem extends MenuDataItem {
  children?: MenuItem[];
  create: number;
  update: number;
  delete: number;
  view: number;
}

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  onClick?: (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void; // Add onClick prop
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  onClick,
}) => (
  <label
    onClick={onClick}
    className="flex items-center space-x-2 cursor-pointer"
  >
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="form-checkbox rounded text-blue-600 focus:ring-blue-500 focus:border-blue-500"
    />
    <span>{label}</span>
  </label>
);

const Permissions = () => {
  const dispatch = useAppDispatch();
  const { permissions } = useAppSelector((state) => state.permissions);
  const { menu } = useAppSelector((state) => state.allMenu);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [menuData, setMenuData] = useState<{
    id: string;
    createdBy: string;
    menuTemp: MenuDataItem[];
    menuTempName: string;
  }>();
  const [parsedPermissions, setParsedPermissions] = useState<Permission[]>([]);
  const [groupName, setGroupName] = useState<string>("");

  const [checkboxes, setCheckboxes] = useState<MenuItem[]>([]);
  const [editModal, setEditModal] = useState(false);
  const deleteButtonRef = useRef(null);
  const deleteValueRef = useRef("");
  const allPermissionsGranted = (item: MenuItem) =>
    item.create === 1 &&
    item.update === 1 &&
    item.delete === 1 &&
    item.view === 1;
  const allChildrenPermissionsGranted = (item: MenuItem) =>
    item.children?.filter(allPermissionsGranted).length ===
    item.children?.length;
  const allCheckboxesChecked =
    checkboxes.filter(
      (item) =>
        allPermissionsGranted(item) && allChildrenPermissionsGranted(item)
    ).length === checkboxes.length;

  const setAllPermissions = (item: MenuItem, value: number): MenuItem => ({
    ...item,
    create: value,
    update: value,
    delete: value,
    view: value,
    children: item.children?.map((child) => setAllPermissions(child, value)),
  });

  const allCreatePermissionsGranted = (item: MenuItem) => item.create === 1;
  const allChildrenCreatePermissionsGranted = (item: MenuItem) =>
    item.children?.filter(allCreatePermissionsGranted).length ===
    item.children?.length;
  const allCreateChecked =
    checkboxes.filter(
      (item) =>
        allCreatePermissionsGranted(item) &&
        allChildrenCreatePermissionsGranted(item)
    ).length === checkboxes.length;

  const setAllCreatePermissions = (
    item: MenuItem,
    value: number
  ): MenuItem => ({
    ...item,
    create: value,
    children: item.children?.map((child) =>
      setAllCreatePermissions(child, value)
    ),
  });

  const allUpdatePermissionsGranted = (item: MenuItem) => item.update === 1;
  const allChildrenUpdatePermissionsGranted = (item: MenuItem) =>
    item.children?.filter(allUpdatePermissionsGranted).length ===
    item.children?.length;
  const allUpdateChecked =
    checkboxes.filter(
      (item) =>
        allUpdatePermissionsGranted(item) &&
        allChildrenUpdatePermissionsGranted(item)
    ).length === checkboxes.length;

  const setAllUpdatePermissions = (
    item: MenuItem,
    value: number
  ): MenuItem => ({
    ...item,
    update: value,
    children: item.children?.map((child) =>
      setAllUpdatePermissions(child, value)
    ),
  });

  const allDeletePermissionsGranted = (item: MenuItem) => item.delete === 1;
  const allChildrenDeletePermissionsGranted = (item: MenuItem) =>
    item.children?.filter(allDeletePermissionsGranted).length ===
    item.children?.length;
  const allDeleteChecked =
    checkboxes.filter(
      (item) =>
        allDeletePermissionsGranted(item) &&
        allChildrenDeletePermissionsGranted(item)
    ).length === checkboxes.length;

  const setAllDeletePermissions = (
    item: MenuItem,
    value: number
  ): MenuItem => ({
    ...item,
    delete: value,
    children: item.children?.map((child) =>
      setAllDeletePermissions(child, value)
    ),
  });

  const allViewPermissionsGranted = (item: MenuItem) => item.view === 1;
  const allChildrenViewPermissionsGranted = (item: MenuItem) =>
    item.children?.filter(allViewPermissionsGranted).length ===
    item.children?.length;
  const allViewChecked =
    checkboxes.filter(
      (item) =>
        allViewPermissionsGranted(item) &&
        allChildrenViewPermissionsGranted(item)
    ).length === checkboxes.length;

  const setAllViewPermissions = (item: MenuItem, value: number): MenuItem => ({
    ...item,
    view: value,
    children: item.children?.map((child) =>
      setAllViewPermissions(child, value)
    ),
  });

  useEffect(() => {
    dispatch(fetchPermissions());
  }, []);

  useEffect(() => {
    const generateHierarchicalMenu = (
      menuItems: MenuDataItem[]
    ): MenuItem[] => {
      let menuMap = new Map<string, MenuItem & { children?: MenuItem[] }>();

      // Initialize items with permissions set to 0
      menuItems.forEach((item) => {
        menuMap.set(item.id.toString(), {
          ...item,
          children: [],
        });
      });

      // Construct the hierarchy
      menuItems.forEach((item) => {
        if (item.parentId) {
          const parent = menuMap.get(item.parentId.toString());
          parent?.children?.push(menuMap.get(item.id.toString())!);
        }
      });

      // Filter out root items
      return Array.from(menuMap.values()).filter((item) => !item.parentId);
    };
    if (menuData)
      setCheckboxes(
        generateHierarchicalMenu(
          menuData?.menuTemp.flatMap((item) => {
            return item;
          })
        )
      );
  }, [menu, menuData]);

  useEffect(() => {
    if (permissions.length > 0) {
      setParsedPermissions([
        ...permissions.map((item) => {
          return {
            ...item,
            menuTemp:
              typeof JSON.parse(item.menuTemp) === "string"
                ? JSON.parse(JSON.parse(item.menuTemp))
                : [],
          };
        }),
      ]);
    }
  }, [permissions]);

  const handleDelete = async () => {
    await dispatch(deletePermission(deleteValueRef.current));
    await dispatch(fetchPermissions());
    setDeleteConfirmationModal(false);
  };

  const onSubmit = async () => {
    let formData = {
      id: menuData?.id!,
      menuTemp: JSON.stringify(flattenMenuItems(checkboxes)),
      menuTempName: groupName,
      createdBy: menuData?.createdBy!,
    };
    const data = await dispatch(updatePermission(formData));
    if (!data.payload) {
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
      dispatch(fetchPermissions());
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
    }
  };

  const flattenMenuItems = (items: MenuItem[]): MenuItem[] => {
    let flatList: MenuItem[] = [];

    const flatten = (items: MenuItem[]) => {
      items.forEach((item) => {
        const { children, ...itemWithoutChildren } = item; // Destructure to separate children from the rest
        flatList.push(itemWithoutChildren);

        if (item.children && item.children.length > 0) {
          flatten(item.children); // Recursively flatten children
        }
      });
    };

    flatten(items);
    return flatList;
  };

  const handleCheckboxChange = (
    id: number,
    permission: "create" | "update" | "delete" | "view"
  ) => {
    const updatePermissions = (
      items: MenuItem[],
      id: number,
      permission: "create" | "update" | "delete" | "view"
    ): MenuItem[] =>
      items.map((item) => {
        if (item.id === id) {
          const updatedItem = {
            ...item,
            [permission]: item[permission] ? 0 : 1,
          };
          // Optionally, check if all permissions are now 0 and handle accordingly
          // This might involve additional logic if you need to perform actions when all are 0
          return updatedItem;
        } else if (item.children) {
          return {
            ...item,
            children: updatePermissions(item.children, id, permission),
          };
        }
        return item;
      });
    setCheckboxes(updatePermissions(checkboxes, id, permission));
  };

  const renderMenuItems = (items: MenuItem[]) =>
    items.map((item) => (
      <Disclosure className={"mx-4 my-2"} key={item.id}>
        {({ open }) => (
          <>
             {item.menuType!='I'? (<Disclosure.Button className="flex justify-between items-center w-full px-4 text-left text-sm font-medium  rounded-lg  focus:outline-none focus-visible:ring bg-[#e2e8f0]">
              <div className="w-2/12">
                {item.menuName} 
              </div>
              <div className="flex space-x-3 w-8/12 justify-center items-center">
                <Checkbox
                  checked={item.create === 1}
                  onChange={() => handleCheckboxChange(item.id, "create")}
                  label="Create"
                  onClick={(e) => e.stopPropagation()}
                />
                <Checkbox
                  checked={item.update === 1}
                  onChange={() => handleCheckboxChange(item.id, "update")}
                  label="Update"
                  onClick={(e) => e.stopPropagation()}
                />
                <Checkbox
                  checked={item.delete === 1}
                  onChange={() => handleCheckboxChange(item.id, "delete")}
                  label="Delete"
                  onClick={(e) => e.stopPropagation()}
                />
                <Checkbox
                  checked={item.view === 1}
                  onChange={() => handleCheckboxChange(item.id, "view")}
                  label="View"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <div className="w-2/12 flex items-end justify-end">
                <ChevronDown
                  className={`${open ? "transform rotate-180" : ""} w-5 h-5 `}
                />
              </div>
            </Disclosure.Button>) : 

          ( <Checkbox
                  checked={item.create === 1}
                  onChange={() => handleCheckboxChange(item.id, "create")}
                  label= {item.menuName}
                  onClick={(e) => e.stopPropagation()}
                />

        )}
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm rounded-b-lg">
              {item.children &&
                item.children.length > 0 &&
                renderMenuItems(item.children)}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    ));

  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y">
        Manage Permission Groups
      </h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
          <Link to="/add-permission">
            <Button variant="primary" className="mr-2 shadow-md">
              Add Permission Group
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
        {/* BEGIN: Data List */}
        <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
          <Table className="border-spacing-y-[10px] border-separate -mt-2 table_section">
            <Table.Thead>
              <Table.Tr>
                {/* <Table.Th className="border-b-0 whitespace-nowrap">
                  IMAGES
                </Table.Th> */}
                <Table.Th className="border-b-0 whitespace-nowrap rounded-tl-lg">
                  Name
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  Module
                </Table.Th>

                <Table.Th className="text-center border-b-0 whitespace-nowrap rounded-tr-lg">
                  ACTIONS
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {_.take(parsedPermissions, parsedPermissions.length).map(
                (item, Key) => (
                  <Table.Tr key={Key} className="intro-x">
                    <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                      {item.menuTempName}
                    </Table.Td>
                    <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                      {typeof item.menuTemp === "object" &&
                        item.menuTemp
                          .map((item) => item.menuName)
                          .join(", ")}{" "}
                    </Table.Td>

                    <Table.Td className="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                      <div className="flex items-center justify-center space-x-2">
                        <a
                          className="flex items-center text-primary"
                          href="#"
                          onClick={async (event) => {
                            event.preventDefault();
                            const data = await dispatch(
                              getPermission(item.id.toString())
                            );
                            setGroupName(data.payload.menuTempName);
                            setMenuData({
                              id: item.id.toString(),
                              menuTemp: JSON.parse(
                                JSON.parse(data.payload.menuTemp)
                              ),
                              createdBy: data.payload.createdBy,
                              menuTempName: data.payload.menuTempName,
                            });
                            setEditModal(true);
                          }}
                        >
                          <Lucide icon="Edit3" className="w-4 h-4 mr-1" /> Edit
                        </a>
                        <a
                          className="flex items-center text-danger"
                          href="#"
                          onClick={(event) => {
                            event.preventDefault();
                            deleteValueRef.current = item.id.toString();
                            setDeleteConfirmationModal(true);
                          }}
                        >
                          <Lucide icon="Trash2" className="w-4 h-4 mr-1" />{" "}
                          Delete
                        </a>
                      </div>
                    </Table.Td>
                  </Table.Tr>
                )
              )}
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
      <Dialog
        open={editModal}
        onClose={() => {
          setEditModal(false);
        }}
        initialFocus={deleteButtonRef}
        size="xl"
      >
        <Dialog.Panel>
          <div className="p-5 text-center">
            <div className="flex justify-between px-5">
              <FormInput
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter Group Name"
                className="w-[300px] h-[30px] p-2 outline-none"
              />
            </div>
            <div className="flex justify-end p-5 space-x-3">
              <Checkbox
                checked={allCheckboxesChecked}
                onChange={() => {
                  setCheckboxes(
                    checkboxes.map((item) =>
                      setAllPermissions(item, allCheckboxesChecked ? 0 : 1)
                    )
                  );
                }}
                label="Select All"
              />

              {/*<Checkbox
                checked={allCreateChecked}
                onChange={() => {
                  setCheckboxes(
                    checkboxes.map((item) =>
                      setAllCreatePermissions(item, allCreateChecked ? 0 : 1)
                    )
                  );
                }}
                label="Select All Create"
              />

              <Checkbox
                checked={allUpdateChecked}
                onChange={() => {
                  setCheckboxes(
                    checkboxes.map((item) =>
                      setAllUpdatePermissions(item, allUpdateChecked ? 0 : 1)
                    )
                  );
                }}
                label="Select All Update"
              />

              <Checkbox
                checked={allDeleteChecked}
                onChange={() => {
                  setCheckboxes(
                    checkboxes.map((item) =>
                      setAllDeletePermissions(item, allDeleteChecked ? 0 : 1)
                    )
                  );
                }}
                label="Select All Delete"
              />

              <Checkbox
                checked={allViewChecked}
                onChange={() => {
                  setCheckboxes(
                    checkboxes.map((item) =>
                      setAllViewPermissions(item, allViewChecked ? 0 : 1)
                    )
                  );
                }}
                label="Select All View"
              />*/}
            </div>
            <div className="max-h-[80vh] overflow-auto p-3">
              {checkboxes && renderMenuItems(checkboxes)}
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => {
                setEditModal(false);
              }}
              className="w-24 mr-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="button"
              className="w-24"
              onClick={onSubmit}
            >
              Submit
            </Button>
          </div>
        </Dialog.Panel>
      </Dialog>
      {/* END: Delete Confirmation Modal */}
      {/* BEGIN: Success Notification Content */}
      <Notification id="success-notification-content" className="flex hidden">
        <Lucide icon="CheckCircle" className="text-success" />
        <div className="ml-4 mr-4">
          <div className="font-medium">Data updated successfully!</div>
        </div>
      </Notification>
      {/* END: Success Notification Content */}
      {/* BEGIN: Failed Notification Content */}
      <Notification id="failed-notification-content" className="flex hidden">
        <Lucide icon="XCircle" className="text-danger" />
        <div className="ml-4 mr-4">
          <div className="font-medium">Data updation failed!</div>
          <div className="mt-1 text-slate-500">
            Please check the fileld form.
          </div>
        </div>
      </Notification>
      {/* END: Failed Notification Content */}
    </>
  );
};

export default Permissions;
