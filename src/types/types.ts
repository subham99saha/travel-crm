export interface SuperUser {
  id: number;
  sUserName: string;
  sName: string;
  sEmail: string;
  menuId: string;
  sPass: string;
  menuTemp: string;
  isActive: IsActive;
  lastLogin: null | string;
  userType: UserType;
  createdAt: Date;
  updatedAt: Date;
}

export enum IsActive {
  Y = "Y",
}

export enum UserType {
  S = "S",
  V = "V",
}

export interface MenuDataItem {
  id: number;
  menuName: string;
  parentId: number;
  menuIcon: string;
  menuPathName: string | null;
  menuTitle: string;
  isActive: string;
  createdAt: string;
  updatedAt: string;
  create: number;
  update: number;
  delete: number;
  view: number;
}

export interface Menu {
  createdAt: Date;
  createdBy: number;
  id: number;
  menuTemp: string;
  menuTempName: string;
  updatedAt: Date;
}
