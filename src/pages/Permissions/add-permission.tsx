// @ts-nocheck
import Notification from "../../base-components/Notification";
import Lucide from "../../base-components/Lucide";

import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { useEffect, useState } from "react";
// import Checkbox from "../../base-components/Checkbox";
import Button from "../../base-components/Button";
import { Link } from "react-router-dom";
import {
  createPermission,
  fetchPermissions,
} from "../../stores/permissionsSlice";
import Toastify from "toastify-js";
import { FormInput } from "../../base-components/Form";
import { MenuDataItem } from "../../types/types";
import { Disclosure } from "../../base-components/Headless";
import { ChevronDown } from "lucide-react";
import { classNames } from 'classnames';

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
    className="inline-flex items-center space-x-2 cursor-pointer"
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

const AddPermission = () => {
  const dispatch = useAppDispatch();
  const { menu } = useAppSelector((state) => state.allMenu);
  const [groupName, setGroupName] = useState<string>("");
  const [hierarchicalMenu, setHierarchicalMenu] = useState<MenuItem[]>([]);
  const allPermissionsGranted = (item: MenuItem) =>
    item.create === 1 &&
    item.update === 1 &&
    item.delete === 1 &&
    item.view === 1;
  const allChildrenPermissionsGranted = (item: MenuItem) =>
    item.children?.filter(allPermissionsGranted).length ===
    item.children?.length;
  const allCheckboxesChecked =
    hierarchicalMenu.filter(
      (item) =>
        allPermissionsGranted(item) && allChildrenPermissionsGranted(item)
    ).length === hierarchicalMenu.length;

  // const setAllPermissions = (item: MenuItem, value: number): MenuItem => ({
    
  //   ...item,
  //   {item.menuType!='I' ? { create: value,
  //     update: value,
  //     delete: value,
  //     view: value,}
  //     :
     
  //     {create: value,
  //     update: 0,
  //     delete: 0,
  //     view: 0,
  //   }
  //     )
  // }
   


  //   children: item.children?.map((child) => setAllPermissions(child, value)),
  // });

const setAllPermissions = (item: MenuItem, value: number): MenuItem => ({
  ...item,
  ...(item.menuType !== 'I'
    ? { create: value, update: value, delete: value, view: value }
    : { create: value, update: 0, delete: 0, view: 0 }),
  children: item.children?.map((child) => setAllPermissions(child, value)),
});

  const allCreatePermissionsGranted = (item: MenuItem) => item.create === 1;
  const allChildrenCreatePermissionsGranted = (item: MenuItem) =>
    item.children?.filter(allCreatePermissionsGranted).length ===
    item.children?.length;
  const allCreateChecked =
    hierarchicalMenu.filter(
      (item) =>
        allCreatePermissionsGranted(item) &&
        allChildrenCreatePermissionsGranted(item)
    ).length === hierarchicalMenu.length;

  const setAllCreatePermissions = (item: MenuItem,value: number): MenuItem => ({
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
    hierarchicalMenu.filter(
      (item) =>
        allUpdatePermissionsGranted(item) &&
        allChildrenUpdatePermissionsGranted(item)
    ).length === hierarchicalMenu.length;

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
    hierarchicalMenu.filter(
      (item) =>
        allDeletePermissionsGranted(item) &&
        allChildrenDeletePermissionsGranted(item)
    ).length === hierarchicalMenu.length;

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
    hierarchicalMenu.filter(
      (item) =>
        allViewPermissionsGranted(item) &&
        allChildrenViewPermissionsGranted(item)
    ).length === hierarchicalMenu.length;

  const setAllViewPermissions = (item: MenuItem, value: number): MenuItem => ({
    ...item,
    ...(item.menuType !== 'I'
    ? { view: value }
    : { view: 0 }),
    view: value,
    children: item.children?.map((child) =>
      setAllViewPermissions(child, value)
    ),

  });

  useEffect(() => {
    const generateHierarchicalMenu = (
      menuItems: MenuDataItem[]
    ): MenuItem[] => {
      let menuMap = new Map<string, MenuItem & { children?: MenuItem[] }>();

      // Initialize items with permissions set to 0
      menuItems.forEach((item) => {
        menuMap.set(item.id.toString(), {
          ...item,
          create: 0,
          update: 0,
          delete: 0,
          view: 0,
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

    setHierarchicalMenu(generateHierarchicalMenu(menu));
  }, [menu]);

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

  const handleSubmit = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    const flatMenuItems = flattenMenuItems(hierarchicalMenu);

    const data = await dispatch(
      createPermission({
        createdBy: userInfo.resData.id,
        menuTempName: groupName,
        menuTemp: JSON.stringify(flatMenuItems),
      })
    );
    if (data) {
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

    setHierarchicalMenu(updatePermissions(hierarchicalMenu, id, permission));
  };

  const renderMenuItems = (items: MenuItem[]) =>
    items.map((item) => (
      <Disclosure className={`"mx-4 my-2 ${item.menuType!='I' ? "" : "permission_check_wrap"}`} key={item.id}>
        {({ open }) => (
          <>
            
          {item.menuType!='I'? (<Disclosure.Button className="flex justify-between items-center w-full px-4 text-left text-sm font-medium  rounded-lg  focus:outline-none focus-visible:ring bg-orange-200">
              <div className="w-2/12">
                {item.menuName} 
              </div>
              <div className="flex space-x-12 w-8/12 justify-center items-center">
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

          ( <div className="check_area">
            <Checkbox
                  checked={item.create === 1}
                  onChange={() => handleCheckboxChange(item.id, "create")}
                  label= {item.menuName}
                  onClick={(e) => e.stopPropagation()}
                />
          </div>

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
    <div className="w-full">
      <div className="col-span-12 intro-y lg:col-span-6">
        {/* BEGIN: Form Validation */}
        {/* <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
          <h2 className="mr-auto text-base font-medium">Assign Permission</h2>
        </div> */}
        <h2 className="mt-10 text-lg font-medium intro-y">
          Assign Permission
        </h2>
        {/* <div className="flex justify-between px-5">
          <FormInput
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter Group Name"
            className="w-[300px] h-[30px] p-2 outline-none"
          />
        </div> */}
        <div className="py-5 max-w-7xl mx-auto">
          <div className="flex justify-between py-5 space-x-3">
          <FormInput
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter Group Name"
            className="w-[300px] h-[40px] p-2 outline-none bg-white text-[#a4a4a4]"
          />
            <Checkbox
              checked={allCheckboxesChecked}
              onChange={() => {
                setHierarchicalMenu(
                  hierarchicalMenu.map((item) =>
                    setAllPermissions(item, allCheckboxesChecked ? 0 : 1)
                  )
                );
              }}
              label="Select All"
            />

           {/* <Checkbox
              checked={allCreateChecked}
              onChange={() => {
                setHierarchicalMenu(
                  hierarchicalMenu.map((item) =>
                    setAllCreatePermissions(item, allCreateChecked ? 0 : 1)
                  )
                );
              }}
              label="Select All Create"
            />

            <Checkbox
              checked={allUpdateChecked}
              onChange={() => {
                setHierarchicalMenu(
                  hierarchicalMenu.map((item) =>
                    setAllUpdatePermissions(item, allUpdateChecked ? 0 : 1)
                  )
                );
              }}
              label="Select All Update"
            />

            <Checkbox
              checked={allDeleteChecked}
              onChange={() => {
                setHierarchicalMenu(
                  hierarchicalMenu.map((item) =>
                    setAllDeletePermissions(item, allDeleteChecked ? 0 : 1)
                  )
                );
              }}
              label="Select All Delete"
            />

            <Checkbox
              checked={allViewChecked}
              onChange={() => {
                setHierarchicalMenu(
                  hierarchicalMenu.map((item) =>
                    setAllViewPermissions(item, allViewChecked ? 0 : 1)
                  )
                );
              }}
              label="Select All View"
            /> */}
          </div>
          {hierarchicalMenu && renderMenuItems(hierarchicalMenu)}

          <div className="flex justify-end mt-5 space-x-4 submit-sction">
            <Link to="/permissions">
              <Button variant="secondary" type="button">
                Cancel
              </Button>
            </Link>
            <Button variant="primary" onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </div>
        {/* END: Form Validation */}
        {/* BEGIN: Success Notification Content */}
        <Notification id="success-notification-content" className="hidden">
          <Lucide icon="CheckCircle" className="text-success" />
          <div className="ml-4 mr-4">
            <div className="font-medium">Data save successfully!</div>
          </div>
        </Notification>
        {/* END: Success Notification Content */}
        {/* BEGIN: Failed Notification Content */}
        <Notification id="failed-notification-content" className="flex hidden">
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
  );
};

export default AddPermission;
