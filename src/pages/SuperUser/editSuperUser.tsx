// @ts-nocheck
import {
  PreviewComponent,
  Preview,
} from "../../base-components/PreviewComponent";
import { FormLabel, FormInput, FormSelect } from "../../base-components/Form";
import Button from "../../base-components/Button";
import Notification from "../../base-components/Notification";
import Lucide from "../../base-components/Lucide";
import { useForm } from "react-hook-form";
import Toastify from "toastify-js";
import clsx from "clsx";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { fetchAllSuperUser, updateSuperUser } from "./SuperUserSlice";
import { useEffect, useState } from "react";
import { Dialog, Disclosure } from "../../base-components/Headless";
import { IsActive, MenuDataItem } from "../../types/types";
import { fetchPermissions } from "../../stores/permissionsSlice";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";

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

const editSuperUser = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.superUser);
  const { permissions } = useAppSelector((state) => state.permissions);
  const { menu } = useAppSelector((state) => state.allMenu);
  const superUserData = data.find((item) => item.id.toString() === params.id);
  const [checkboxes, setCheckboxes] = useState<MenuItem[]>([]);
  const [editModal, setEditModal] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [menuId, setMenuId] = useState(superUserData?.menuId!);

  useEffect(() => {
    dispatch(fetchPermissions());
    dispatch(fetchAllSuperUser());
  }, [menuId]);

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

    const menuTemp = permissions.find((item) => item.id.toString() === menuId);
    if (menuTemp) {
      const menuData =
        typeof JSON.parse(menuTemp.menuTemp) === "string"
          ? JSON.parse(JSON.parse(menuTemp.menuTemp))
          : JSON.parse(menuTemp.menuTemp);

      if (typeof menuData === "object" && menuData.length > 0) {
        setCheckboxes(
          generateHierarchicalMenu(
            menuData.flatMap((item: any) => {
              return item;
            })
          )
        );
      }
    }
  }, [superUserData, permissions, menuId]);

  const schema = yup
    .object({
      sName: yup.string().required().min(2),
      sEmail: yup.string().required().min(2),
      sPass: yup.string().required().min(2),
      createdBy: yup.string().required(),
      isActive: yup.string().required(),
    })
    .required();

  type EditSuperUser = yup.InferType<typeof schema>;

  const {
    trigger,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm<EditSuperUser>({
    resolver: yupResolver(schema),
    defaultValues: {
      sName: superUserData?.sName,
      sEmail: superUserData?.sEmail,
      sPass: superUserData?.sPass,
      createdBy: "1",
      isActive: superUserData?.isActive,
    },
  });

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

  const onSubmit = async (payload: EditSuperUser) => {
    const result = await trigger();
    if (!result) {
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
      let formData = {
        createdBy: payload.createdBy,
        sName: payload.sName,
        sEmail: payload.sEmail,
        sPass: payload.sPass,
        id: parseInt(params.id!),
        menuId: menuId,
        isActive: payload.isActive as IsActive,
        isChanged: isChanged,
      };

      dispatch(updateSuperUser(formData));

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
    setCheckboxes(updatePermissions(checkboxes, id, permission));
  };

  useEffect(() => {
    const menuTemp = permissions.find(
      (item) => item.id.toString() === superUserData?.menuId
    );
    const flattenCheckbox = flattenMenuItems(checkboxes);
    if (menuTemp && flattenCheckbox.length > 0) {
      const menuData = JSON.parse(JSON.parse(menuTemp.menuTemp));
      for (let i = 0; i < menuData.length; i++) {
        if (
          menuData[i].create !== flattenCheckbox[i].create ||
          menuData[i].view !== flattenCheckbox[i].view ||
          menuData[i].update !== flattenCheckbox[i].update ||
          menuData[i].delete !== flattenCheckbox[i].delete
        ) {
          setIsChanged(true);
          break;
        } else {
          setIsChanged(false);
        }
      }
    }
  }, [checkboxes]);

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
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Manage User</h2>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 intro-y lg:col-span-6">
          {/* BEGIN: Form Validation */}
          <PreviewComponent className="intro-y box">
            <>
              <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                <h2 className="mr-auto text-base font-medium">Edit User</h2>
              </div>
              <div className="p-5">
                <Preview>
                  {/* BEGIN: Validation Form */}
                  <form className="validate-form">
                    <div className="input-form">
                      <FormLabel
                        htmlFor="validation-form-1"
                        className="flex flex-col w-full sm:flex-row"
                      >
                        Name
                        <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                          Required, at least 2 characters
                        </span>
                      </FormLabel>
                      <FormInput
                        id="validation-form-1"
                        type="text"
                        className={clsx({
                          "border-danger": errors.sName,
                        })}
                        placeholder="User"
                        {...register("sName")}
                      />
                    </div>

                    {errors.sName && (
                      <div className="mt-2 text-danger">
                        {typeof errors.sName.message === "string" &&
                          errors.sName.message}
                      </div>
                    )}

                    <div className="mt-3 input-form">
                      <FormLabel
                        htmlFor="validation-form-1"
                        className="flex flex-col w-full sm:flex-row"
                      >
                        Email
                        <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                          Required, at least 2 characters
                        </span>
                      </FormLabel>
                      <FormInput
                        id="validation-form-1"
                        type="text"
                        className={clsx({
                          "border-danger": errors.sEmail,
                        })}
                        placeholder="Email"
                        {...register("sEmail")}
                      />
                      {errors.sEmail && (
                        <div className="mt-2 text-danger">
                          {typeof errors.sEmail.message === "string" &&
                            errors.sEmail.message}
                        </div>
                      )}
                    </div>

                    <div className="mt-3 input-form">
                      <FormLabel
                        htmlFor="validation-form-1"
                        className="flex flex-col w-full sm:flex-row"
                      >
                        Password
                        <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                          Required, at least 2 characters
                        </span>
                      </FormLabel>
                      <FormInput
                        id="validation-form-1"
                        type="text"
                        className={clsx({
                          "border-danger": errors.sPass,
                        })}
                        placeholder="Password"
                        {...register("sPass")}
                      />
                      {errors.sPass && (
                        <div className="mt-2 text-danger">
                          {typeof errors.sPass.message === "string" &&
                            errors.sPass.message}
                        </div>
                      )}
                    </div>

                    <div className="mt-3 input-form">
                      <FormLabel
                        htmlFor="validation-form-1"
                        className="flex flex-col w-full sm:flex-row"
                      >
                        Status
                      </FormLabel>
                      <FormSelect
                        className="mt-2 sm:mr-2"
                        aria-label="Default select example"
                        onChange={(e) => setValue("isActive", e.target.value)}
                        value={getValues("isActive")}
                      >
                        <option value="Y">Active</option>
                        <option value="N">Inactive</option>
                      </FormSelect>
                      {errors.isActive && (
                        <div className="mt-2 text-danger">
                          {typeof errors.isActive.message === "string" &&
                            errors.isActive.message}
                        </div>
                      )}
                    </div>

                    <div className="mt-3 input-form">
                      <FormLabel
                        htmlFor="validation-form-1"
                        className="flex flex-col w-full sm:flex-row"
                      >
                        Permission
                      </FormLabel>
                      <div className="flex">
                        <FormSelect
                          className="mt-2 sm:mr-2"
                          aria-label="Default select example"
                          onChange={(e) => setMenuId(e.target.value)}
                          value={menuId}
                        >
                          {permissions.map((item) => {
                            return (
                              <option key={item.id} value={item.id}>
                                {item.menuTempName}
                              </option>
                            );
                          })}
                        </FormSelect>

                        <Button
                          variant="primary"
                          type="button"
                          onClick={() => setEditModal(true)}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      onClick={handleSubmit(onSubmit)}
                      className="mt-5 w-24 mr-1"
                    >
                      Update
                    </Button>
                    <Link to="/super-user">
                      <Button
                        variant="secondary"
                        type="button"
                        className="mt-5 w-24 mr-1"
                      >
                        Cancel
                      </Button>
                    </Link>
                  </form>
                  {/* END: Validation Form */}
                </Preview>
              </div>
            </>
          </PreviewComponent>
          {/* END: Form Validation */}
          <Dialog
            open={editModal}
            onClose={() => {
              setEditModal(false);
            }}
            size="xl"
          >
            <Dialog.Panel>
              <div className="flex justify-end p-5 space-x-3">
                <Checkbox
                  checked={
                    checkboxes.filter(
                      (item) =>
                        item.create === 1 &&
                        item.update === 1 &&
                        item.delete === 1 &&
                        item.view === 1 &&
                        item.children?.filter(
                          (child) =>
                            child.create === 1 &&
                            child.update === 1 &&
                            child.delete === 1 &&
                            child.view === 1
                        ).length === item.children?.length
                    ).length === checkboxes.length
                  }
                  onChange={() => {
                    setCheckboxes(
                      checkboxes.map((item) => {
                        return {
                          ...item,
                          create: item.create ? 0 : 1,
                          update: item.update ? 0 : 1,
                          delete: item.delete ? 0 : 1,
                          view: item.view ? 0 : 1,
                          children: item.children?.map((child) => {
                            return {
                              ...child,
                              create: child.create ? 0 : 1,
                              update: child.update ? 0 : 1,
                              delete: child.delete ? 0 : 1,
                              view: child.view ? 0 : 1,
                            };
                          }),
                        };
                      })
                    );
                  }}
                  label="Select All"
                />

                {/*<Checkbox
                  checked={
                    checkboxes.filter(
                      (item) =>
                        item.create === 1 &&
                        item.children?.filter((child) => child.create === 1)
                          .length === item.children?.length
                    ).length === checkboxes.length
                  }
                  onChange={() => {
                    setCheckboxes(
                      checkboxes.map((item) => {
                        return {
                          ...item,
                          create: item.create ? 0 : 1,
                          children: item.children?.map((child) => {
                            return {
                              ...child,
                              create: child.create ? 0 : 1,
                            };
                          }),
                        };
                      })
                    );
                  }}
                  label="Select All Create"
                />

                <Checkbox
                  checked={
                    checkboxes.filter(
                      (item) =>
                        item.update === 1 &&
                        item.children?.filter((child) => child.update === 1)
                          .length === item.children?.length
                    ).length === checkboxes.length
                  }
                  onChange={() => {
                    setCheckboxes(
                      checkboxes.map((item) => {
                        return {
                          ...item,
                          update: item.update ? 0 : 1,
                          children: item.children?.map((child) => {
                            return {
                              ...child,
                              update: child.update ? 0 : 1,
                            };
                          }),
                        };
                      })
                    );
                  }}
                  label="Select All Update"
                />

                <Checkbox
                  checked={
                    checkboxes.filter(
                      (item) =>
                        item.delete === 1 &&
                        item.children?.filter((child) => child.delete === 1)
                          .length === item.children?.length
                    ).length === checkboxes.length
                  }
                  onChange={() => {
                    setCheckboxes(
                      checkboxes.map((item) => {
                        return {
                          ...item,
                          delete: item.delete ? 0 : 1,
                          children: item.children?.map((child) => {
                            return {
                              ...child,
                              delete: child.delete ? 0 : 1,
                            };
                          }),
                        };
                      })
                    );
                  }}
                  label="Select All Delete"
                />

                <Checkbox
                  checked={
                    checkboxes.filter(
                      (item) =>
                        item.view === 1 &&
                        item.children?.filter((child) => child.view === 1)
                          .length === item.children?.length
                    ).length === checkboxes.length
                  }
                  onChange={() => {
                    setCheckboxes(
                      checkboxes.map((item) => {
                        return {
                          ...item,
                          view: item.view ? 0 : 1,
                          children: item.children?.map((child) => {
                            return {
                              ...child,
                              view: child.view ? 0 : 1,
                            };
                          }),
                        };
                      })
                    );
                  }}
                  label="Select All View"
                />*/}
              </div>
              <div className="p-5 text-center overflow-auto max-h-[90vh]">
                {checkboxes && renderMenuItems(checkboxes)}
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
                  onClick={async () => {
                    const currentMenu = permissions.find(
                      (item) => item.id.toString() === superUserData?.menuId
                    );
                    if (isChanged) {
                      const { data } = await axios.patch(
                        `https://crmapi.srijontours.com/super-menu-access-master/from-user/${superUserData?.id}`,
                        {
                          sName: superUserData?.sName,
                          sUserName: superUserData?.sUserName,
                          createdBy: currentMenu?.createdBy,
                          menuTempName: currentMenu?.menuTempName,
                          menuTemp: JSON.stringify(
                            flattenMenuItems(checkboxes)
                          ),
                          menuType: "C",
                        }
                      );
                      if (data) {
                        setMenuId(data.resData.menuId);
                        setEditModal(false);
                      }
                    } else {
                      setEditModal(false);
                    }
                  }}
                >
                  Submit
                </Button>
              </div>
            </Dialog.Panel>
          </Dialog>
          {/* BEGIN: Success Notification Content */}
          <Notification
            id="success-notification-content"
            className="flex hidden"
          >
            <Lucide icon="CheckCircle" className="text-success" />
            <div className="ml-4 mr-4">
              <div className="font-medium">Data updated successfully!</div>
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
              <div className="font-medium">Data updation failed!</div>
              <div className="mt-1 text-slate-500">
                Please check the fileld form.
              </div>
            </div>
          </Notification>
          {/* END: Failed Notification Content */}
        </div>
      </div>
    </>
  );
};

export default editSuperUser;
