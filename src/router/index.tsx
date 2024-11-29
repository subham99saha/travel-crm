import { useRoutes } from "react-router-dom";
import SideMenu from "../layouts/SideMenu";
import SimpleMenu from "../layouts/SimpleMenu";
import TopMenu from "../layouts/TopMenu";
// import Page1 from "../pages/Page1";
// import Page2 from "../pages/Page2";

import Login from "../pages/Login";

import TravelType from "../pages/TravelType";
import AddTravelType from "../pages/TravelType/addTravelType";
import EditTravelType from "../pages/TravelType/editTravelType";

import Currency from "../pages/Currency";
import AddCurrency from "../pages/Currency/addCurrency";
import EditCurrency from "../pages/Currency/editCurrency";

import ActivityType from "../pages/ActivityType";
import AddActivityType from "../pages/ActivityType/addActivityType";
import EditActivityType from "../pages/ActivityType/editActivityType";

import LeadSource from "../pages/LeadSource";
import AddLeadSource from "../pages/LeadSource/addLeadSource";
import EditLeadSource from "../pages/LeadSource/editLeadSource";

import ItineraryProduct from "../pages/ItineraryProduct";
import AddItineraryProduct from "../pages/ItineraryProduct/addItineraryProduct";
import EditItineraryProduct from "../pages/ItineraryProduct/editItineraryProduct";

import Proposal from "../pages/Proposal/proposal";

import TravelRequirement from "../pages/TravelRequirement";
import AddTravelRequirement from "../pages/TravelRequirement/addTravelRequirement";
import EditTravelRequirement from "../pages/TravelRequirement/editTravelRequirement";

import State from "../pages/State";
import AddState from "../pages/State/addState";
import EditState from "../pages/State/editState";

import Country from "../pages/Country";
import AddCountry from "../pages/Country/addCountry";
import EditCountry from "../pages/Country/editCountry";

import City from "../pages/City";
import AddCity from "../pages/City/addCity";
import EditCity from "../pages/City/editCity";

import Airline from "../pages/Airline";
import AddAirline from "../pages/Airline/addAirline";
import EditAirline from "../pages/Airline/editAirline";

import SuperUser from "../pages/SuperUser";
import AddSuperUser from "../pages/SuperUser/addSuperUser";
import EditSuperUser from "../pages/SuperUser/editSuperUser";

import TransportType from "../pages/TransportType";
import AddTransportType from "../pages/TransportType/addTransportType";
import EditTransportType from "../pages/TransportType/editTransportType";

import Vendor from "../pages/Vendor";
import AddVendor from "../pages/Vendor/addVendor";
import EditVendor from "../pages/Vendor/editVendor";
import UploadDocVendor from "../pages/Vendor/uploadDoc";
import ShowVendor from "../pages/Vendor/showVendor";
import TransportList from "../pages/Vendor/transport";
import HotelList from "../pages/Vendor/hotel";
import TrainList from "../pages/Vendor/train";
import AcivityList from "../pages/Vendor/activity";
import TravelAgentList from "../pages/Vendor/travelAgent";
import TourisimMarketingList from "../pages/Vendor/tourisimMarketing";
import DriverList from "../pages/Vendor/driver";
import TourGuideList from "../pages/Vendor/tourGuide";
import BusList from "../pages/Vendor/bus";
import RestaurantCafeList from "../pages/Vendor/restaurantCafe";
import TourOperatorList from "../pages/Vendor/tourOperator";
import ValleyCampingList from "../pages/Vendor/valleyCamping";
import MassageBeautyTherapyList from "../pages/Vendor/massageBeautyTherapy";
import TarotReaderList from "../pages/Vendor/tarotReader";
import TravelAgencyList from "../pages/Vendor/travelAgency";
import SafariList from "../pages/Vendor/safari";

import Train from "../pages/Train";
import AddTrain from "../pages/Train/addTrain";
import EditTrain from "../pages/Train/editTrain";

import VendorTrain from "../pages/VendorTrain";
import AddVendorTrain from "../pages/VendorTrain/addTrain";
import EditVendorTrain from "../pages/VendorTrain/editTrain";

import Cruise from "../pages/Cruise";
import AddCruise from "../pages/Cruise/addCruise";
import EditCruise from "../pages/Cruise/editCruise";

import VendorCruise from "../pages/VendorCruise";
import AddVendorCruise from "../pages/VendorCruise/addCruise";
import EditVendorCruise from "../pages/VendorCruise/editCruise";

import Transport from "../pages/Transport";
import AddTransport from "../pages/Transport/addTransport";
import EditTransport from "../pages/Transport/editTransport";

import VendorTransport from "../pages/VendorTransport";
import AddVendorTransport from "../pages/VendorTransport/addTransport";
import EditVendorTransport from "../pages/VendorTransport/editTransport";

import Flight from "../pages/Flight";
import AddFlight from "../pages/Flight/addFlight";
import EditFlight from "../pages/Flight/editFlight";

import VendorFlight from "../pages/VendorFlight";
import AddVendorFlight from "../pages/VendorFlight/addFlight";
import EditVendorFlight from "../pages/VendorFlight/editFlight";

import Department from "../pages/Department";
import AddDepartment from "../pages/Department/addDepartment";
import EditDepartment from "../pages/Department/editDepartment";

import Employee from "../pages/Employee";
import AddEmployee from "../pages/Employee/addEmployee";
import EditEmployee from "../pages/Employee/editEmployee";
import Loans from "../pages/Employee/Loans";
import EmpOverview from "../pages/Employee/empOverview";
import Form16 from "../pages/Employee/Form16";
import Form16Update from "../pages/Employee/Form16/Form16Update";
import AddLoans from "../pages/Employee/Loans/CreateLoans";

import VendorActivity from "../pages/VendorActivity";
import AddVendorActivity from "../pages/VendorActivity/addActivity";
import EditVendorActivity from "../pages/VendorActivity/editActivity";
import ViewVendorActivity from "../pages/VendorActivity/viewActivity";

import VendorHotel from "../pages/VendorHotel";
import AddVendorHotel from "../pages/VendorHotel/addHotel";
import EditVendorHotel from "../pages/VendorHotel/editHotel";
import ViewVendorHotel from "../pages/VendorHotel/viewHotel";
import AddRoomDetails from "../pages/VendorHotel/HotelRoom/addRoom";
import EditRoomDetails from "../pages/VendorHotel/HotelRoom/editRoom";
import HotelInventoryIndex from "../pages/VendorHotel/hotelInvetoryIndex";
import HotelInventoryRoomIndex from "../pages/VendorHotel/hotelInventoryRoomIndex";

//import FlightVendor from "../pages/Vendor/Flight";
//import AddFlightVendor from "../pages/Vendor/Flight/addFlight";
//import EditFlightVendor from "../pages/Vendor/Flight/editFlight";

import Client from "../pages/Client";
import ClientBB from "../pages/Client/bbList";
import ClientCor from "../pages/Client/corporateList";
import AddClient from "../pages/Client/addClient";
import AddClientBB from "../pages/Client/addBbClient";
import ShowBBClient from "../pages/Client/showBBClient";
import AddClientCor from "../pages/Client/addCorporateClient";
import EditClient from "../pages/Client/editClient";
import EditClientBB from "../pages/Client/editBbClient";
import UploadDocBB from "../pages/Client/uploadDocBB";
import EditClientCor from "../pages/Client/editCorporateClient";

import Itinerary from "../pages/Itinerary";
import ItineraryAdd from "../pages/Itinerary/addItinerary";
import EditItinerary from "../pages/Itinerary/editItinerary";
import CreateItinerary from "../pages/Itinerary/createItinerary";
import ViewItinerary from "../pages/Itinerary/viewItinerary";
import UploadImageToRepo from "../pages/Itinerary/uploadImageToRepo";
import ViewPDFItinerary from "../pages/Itinerary/viewPdf";
import SentProposal from "../pages/Proposal";
import DraftProposal from "../pages/Proposal/draft";

import ShowCity from "../pages/Vendor/showVendor";
import AddDayRates from "../pages/DayRates/AddDayRates";
import ManageImageRepo from "../pages/ImageRepo/manageImageRepo";
import ManageDocumentRepo from "../pages/DocumentRepo/manageDocumentRepo";
import ManageHotelRoomImage from "../pages/VendorHotel/HotelImage/roomImage";
import ManageHotelRoomVideo from "../pages/VendorHotel/HotelVideo/roomVideo";

import Bookings from "../pages/Booking";
import CreateBooking from "../pages/Booking/createBooking";
import ViewBooking from "../pages/Booking/viewBooking";
import PayForBooking from "../pages/Booking/payForBooking";

import PreviewRoom from "../pages/VendorHotel/previewRoom";
import { useAppDispatch } from "../stores/hooks";
import { useEffect, useState } from "react";
import { addItems } from "../stores/sideMenuSlice";
import { MenuDataItem } from "../types/types";
import Permission from "../pages/Permissions";
import AddPermission from "../pages/Permissions/add-permission";
import { fetchMenus } from "../stores/allMenuSlice";
import { fetchAllSuperUser } from "../pages/SuperUser/SuperUserSlice";
import { fetchPermissions } from "../stores/permissionsSlice";

interface MenuItem {
  id: number;
  icon: string;
  title: string;
  pathname: string | null;
  create: number;
  update: number;
  view: number;
  delete: number;
  subMenu?: MenuItem[];
}

// if (localStorage.getItem('userInfo') === null) {
//     window.location.href = '/login'
// }

function Router() {
  const dispatch = useAppDispatch();
  const [userMenu, setUserMenu] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem("userInfo") || "{}");

  useEffect(() => {
    dispatch(fetchMenus());
    if (user.resData) {
      setUserMenu(
        typeof JSON.parse(user.resData.menuTemp) === "string"
          ? JSON.parse(JSON.parse(user.resData.menuTemp))
          : JSON.parse(user.resData.menuTemp)
      );
    }
  }, []);

  useEffect(() => {
    if (userMenu.length > 0) {
      const parentToChildren = new Map<number, MenuDataItem[]>();
      userMenu.forEach((item, index) => {
        if (!parentToChildren.has(item.parentId)) {
          parentToChildren.set(item.parentId, []);
        }
        // If the user is SuperAdmin and the item is one of the first two, or the item view is 1, add the item
        if ((user.resData.userType === "S" && index < 2) || item.view === 1) {
          parentToChildren.get(item.parentId)!.push(item);
        }
      });

      // Function to create a menu item
      const createMenuItem = (
        item: MenuDataItem,
        children: MenuDataItem[]
      ): MenuItem => {
        const subMenu = children.map((child) =>
          createMenuItem(child, parentToChildren.get(child.id) || [])
        );
        return {
          id: item.id,
          icon: item.menuIcon,
          title: item.menuTitle,
          pathname: item.menuPathName,
          create: item.create,
          update: item.update,
          view: item.view,
          delete: item.delete,
          ...(subMenu.length > 0 ? { subMenu } : {}),
        };
      };
      // Create the menu
      const menus = (parentToChildren.get(0) || []).map((item) =>
        createMenuItem(item, parentToChildren.get(item.id) || [])
      ); // Dispatch the action

      dispatch(addItems(menus));
    }
  }, [userMenu, user]);

  const routes = [
    {
      path: "/",
      element: <SideMenu />,
      children: [
        {
          path: "travel-type",
          element: <TravelType />,
        },
        {
          path: "add-travel-type",
          element: <AddTravelType />,
        },
        {
          path: "edit-travel-type/:id",
          element: <EditTravelType />,
        },
        {
          path: "currency",
          element: <Currency />,
        },
        {
          path: "add-currency",
          element: <AddCurrency />,
        },
        {
          path: "edit-currency/:id",
          element: <EditCurrency />,
        },
        {
          path: "activity-type",
          element: <ActivityType />,
        },
        {
          path: "add-activity-type",
          element: <AddActivityType />,
        },
        {
          path: "edit-activity-type/:id",
          element: <EditActivityType />,
        },
        {
          path: "lead-source",
          element: <LeadSource />,
        },
        {
          path: "add-lead-source",
          element: <AddLeadSource />,
        },
        {
          path: "edit-lead-source/:id",
          element: <EditLeadSource />,
        },
        {
          path: "itinerary-product",
          element: <ItineraryProduct />,
        },
        {
          path: "add-itinerary-product",
          element: <AddItineraryProduct />,
        },
        {
          path: "edit-itinerary-product/:id",
          element: <EditItineraryProduct />,
        },
        {
          path: "travel-requirement",
          element: <TravelRequirement />,
        },
        {
          path: "add-travel-requirement",
          element: <AddTravelRequirement />,
        },
        {
          path: "edit-travel-requirement/:id",
          element: <EditTravelRequirement />,
        },
        {
          path: "proposal",
          element: <Proposal />,
        },
        {
          path: "sent-proposal",
          element: <SentProposal />,
        },
        {
          path: "draft-proposal",
          element: <DraftProposal />,
        },
        {
          path: "state",
          element: <State />,
        },
        {
          path: "add-state",
          element: <AddState />,
        },
        {
          path: "edit-state/:id",
          element: <EditState />,
        },
        {
          path: "country",
          element: <Country />,
        },
        {
          path: "add-country",
          element: <AddCountry />,
        },
        {
          path: "edit-country/:id",
          element: <EditCountry />,
        },
        {
          path: "city",
          element: <City />,
        },
        {
          path: "add-city",
          element: <AddCity />,
        },
        {
          path: "edit-city/:id",
          element: <EditCity />,
        },
        {
          path: "airline",
          element: <Airline />,
        },
        {
          path: "add-airline",
          element: <AddAirline />,
        },
        {
          path: "edit-airline/:id",
          element: <EditAirline />,
        },
        {
          path: "super-user",
          element: <SuperUser />,
        },
        {
          path: "add-super-user",
          element: <AddSuperUser />,
        },
        {
          path: "edit-super-user/:id",
          element: <EditSuperUser />,
        },
        {
          path: "transport-type",
          element: <TransportType />,
        },
        {
          path: "add-transport-type",
          element: <AddTransportType />,
        },
        {
          path: "edit-transport-type/:id",
          element: <EditTransportType />,
        },
        {
          path: "vendor",
          element: <Vendor />,
        },
        {
          path: "vendor/hotel",
          element: <HotelList />,
        },
        {
          path: "vendor/train",
          element: <TrainList />,
        },
        {
          path: "vendor/transport",
          element: <TransportList />,
        },
        {
          path: "vendor/activity",
          element: <AcivityList />,
        },
        {
          path: "vendor/travel-agent",
          element: <TravelAgentList />,
        },
        {
          path: "vendor/tourisim-marketing",
          element: <TourisimMarketingList />,
        },
        {
          path: "vendor/driver",
          element: <DriverList />,
        },
        {
          path: "vendor/tour-guide",
          element: <TourGuideList />,
        },
        {
          path: "vendor/bus",
          element: <BusList />,
        },
        {
          path: "vendor/restaurant-cafe",
          element: <RestaurantCafeList />,
        },
        {
          path: "vendor/tour-operator",
          element: <TourOperatorList />,
        },
        {
          path: "vendor/valley-camping",
          element: <ValleyCampingList />,
        },
        {
          path: "vendor/massage-beauty-therapy",
          element: <MassageBeautyTherapyList />,
        },
        {
          path: "vendor/tarot-reader",
          element: <TarotReaderList />,
        },
        {
          path: "vendor/travel-agency",
          element: <TravelAgencyList />,
        },
        {
          path: "vendor/safari",
          element: <SafariList />,
        },
        {
          path: "show-vendor/:id",
          element: <ShowVendor />,
        },
        {
          path: "add-vendor",
          element: <AddVendor />,
        },
        {
          path: "edit-vendor/:id",
          element: <EditVendor />,
        },
        {
          path: "upload-doc-vendor/:id",
          element: <UploadDocVendor />,
        },
        {
          path: "super-train",
          element: <Train />,
        },
        {
          path: "add-train",
          element: <AddTrain />,
        },
        {
          path: "edit-train/:id",
          element: <EditTrain />,
        },
        {
          path: "super-cruise",
          element: <Cruise />,
        },
        {
          path: "add-cruise",
          element: <AddCruise />,
        },
        {
          path: "edit-cruise/:id",
          element: <EditCruise />,
        },
        {
          path: "super-transport",
          element: <Transport />,
        },
        {
          path: "add-transport",
          element: <AddTransport />,
        },
        {
          path: "edit-transport/:id",
          element: <EditTransport />,
        },
        {
          path: "client-bc",
          element: <Client />,
        },
        {
          path: "add-client-bc",
          element: <AddClient />,
        },
        {
          path: "edit-client-bc/:id",
          element: <EditClient />,
        },
        {
          path: "client-bb",
          element: <ClientBB />,
        },
        {
          path: "add-client-bb",
          element: <AddClientBB />,
        },
        {
          path: "edit-client-bb/:id",
          element: <EditClientBB />,
        },
        {
          path: "upload-doc-bb/:id",
          element : <UploadDocBB />
        },
        {
          path: "show-bb-client/:id",
          element: <ShowBBClient />
        },
        {
          path: "client-corporate",
          element: <ClientCor />,
        },
        {
          path: "add-client-cor",
          element: <AddClientCor />,
        },
        {
          path: "edit-client-cor/:id",
          element: <EditClientCor />,
        },
        {
          path: "super-flight",
          element: <Flight />,
        },
        {
          path: "add-super-flight",
          element: <AddFlight />,
        },
        {
          path: "edit-super-flight/:id",
          element: <EditFlight />,
        },
        {
          path: "super-department",
          element: <Department />,
        },
        {
          path: "add-super-department",
          element: <AddDepartment />,
        },
        {
          path: "edit-super-department/:id",
          element: <EditDepartment />,
        },
        {
          path: "employee",
          element: <Employee />,
        },
        {
          path: "add-employee",
          element: <AddEmployee />,
        },
        {
          path: "edit-employee/:id",
          element: <EditEmployee />,
        },
        {
          path: "form16/:id",
          element: <Form16Update />,
        },
        {
          path: "loans",
          element: <Loans />,
        },
        {
          path: "loans/:id",
          element: <AddLoans />,
        },
        {
          path: "empOverview/:id",
          element: <EmpOverview/>,
        },
        {
          path: "form16",
          element:  <Form16 />,
        },
        {
          path: "vendor-flight",
          element: <VendorFlight />,
        },
        {
          path: "add-vendor-flight",
          element: <AddVendorFlight />,
        },
        {
          path: "edit-vendor-flight/:id",
          element: <EditVendorFlight />,
        },
        {
          path: "vendor-cruise",
          element: <VendorCruise />,
        },
        {
          path: "add-vendor-cruise",
          element: <AddVendorCruise />,
        },
        {
          path: "edit-vendor-cruise/:id",
          element: <EditVendorCruise />,
        },
        {
          path: "vendor-train",
          element: <VendorTrain />,
        },
        {
          path: "add-vendor-train",
          element: <AddVendorTrain />,
        },
        {
          path: "edit-vendor-train/:id",
          element: <EditVendorTrain />,
        },
        {
          path: "vendor-transport",
          element: <VendorTransport />,
        },
        {
          path: "add-vendor-transport",
          element: <AddVendorTransport />,
        },
        {
          path: "edit-vendor-transport/:id",
          element: <EditVendorTransport />,
        },
        {
          path: "itinerary",
          element: <Itinerary />,
        },
        {
          path: "create-itinerary/",
          element: <CreateItinerary />,
        },
        {
          path: "create-itinerary/:id",
          element: <CreateItinerary />,
        },
        {
          path: "add-itinerary",
          element: <ItineraryAdd />,
        },
        {
          path: "edit-itinerary/:id",
          element: <EditItinerary />,
        },
        {
          path: "view-itinerary/:id",
          element: <ViewItinerary />,
        },
        {
          path: "manage-image-repository",
          element: <UploadImageToRepo />,
        },
        {
          path: "vendor-activity",
          element: <VendorActivity />,
        },
        {
          path: "add-vendor-activity",
          element: <AddVendorActivity />,
        },
        {
          path: "edit-vendor-activity/:id",
          element: <EditVendorActivity />,
        },
        {
          path: "view-vendor-activity/:id",
          element: <ViewVendorActivity />,
        },
        {
          path: "vendor-hotel",
          element: <VendorHotel />,
        },
        {
          path: "add-vendor-hotel",
          element: <AddVendorHotel />,
        },
        {
          path: "edit-vendor-hotel/:id",
          element: <EditVendorHotel />,
        },
        {
          path: "view-vendor-hotel/:id",
          element: <ViewVendorHotel />,
        },
        {
          path: "add-vendor-hotel-room/:id",
          element: <AddRoomDetails />,
        },
        {
          path: "edit-vendor-hotel-room/:id/:rid",
          element: <EditRoomDetails />,
        },
        {
          path: "add-day-rates/:itemType/:itemId",
          element: <AddDayRates />,
        },
        {
          path: "add-day-rates/:month/:year/:rateFor/:itemType/:itemId",
          element: <AddDayRates />,
        },
        {
          path: "manage-image-repo/",
          element: <ManageImageRepo />,
        },
        {
          path: "manage-document-repo/",
          element: <ManageDocumentRepo />,
        },
        {
          path: "bookings/all",
          element: <Bookings filter='all' />,
        },
        {
          path: "bookings/unassigned",
          element: <Bookings filter='unassigned' />,
        },
        {
          path: "bookings/assigned",
          element: <Bookings filter='assigned' />,
        },
        {
          path: "bookings/followup",
          element: <Bookings filter='followup' />,
        },
        {
          path: "bookings/potential",
          element: <Bookings filter='potential' />,
        },
        {
          path: "bookings/customer",
          element: <Bookings filter='customer' />,
        },
        {
          path: "bookings/pax",
          element: <Bookings filter='pax' />,
        },
        {
          path: "bookings/requirement",
          element: <Bookings filter='requirement' />,
        },
        {
          path: "bookings/payment",
          element: <Bookings filter='payment' />,
        },
        {
          path: "bookings/closed",
          element: <Bookings filter='closed' />,
        },
        {
          path: "create-booking/",
          element: <CreateBooking />,
        },
        {
          path: "create-booking/:id",
          element: <CreateBooking />,
        },
        {
          path: "view-booking/:id",
          element: <ViewBooking />,
        },
        {
          path: "pay-for-booking/:id",
          element: <PayForBooking />,
        },
        {
          path: "vendor-hotel-inventory",
          element: <HotelInventoryIndex />,
        },
        {
          path: "vendor-room-inventory/:id",
          element: <HotelInventoryRoomIndex />,
        },
        // {
        //   path: "view-itinerary/:id",
        //   element: <ViewItinerary />,
        // },
        {
          path: "show-city/",
          element: <ShowCity />,
        },
        {
          path: "/manage-room-image",
          element: <ManageHotelRoomImage />,
        },
        {
          path: "/manage-room-video",
          element: <ManageHotelRoomVideo />,
        },
        {
          path: "preview-vendor-hotel-room/:id",
          element: <PreviewRoom />,
        },
        {
          path: "permissions",
          element: <Permission />,
        },
        {
          path: "add-permission",
          element: <AddPermission />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/simple-menu",
      element: <SimpleMenu />,
      children: [
        // {
        //   path: "page-1",
        //   element: <Page1 />,
        // },
        // {
        //   path: "page-2",
        //   element: <Page2 />,
        // },
      ],
    },
    {
      path: "/top-menu",
      element: <TopMenu />,
      children: [
        // {
        //   path: "page-1",
        //   element: <Page1 />,
        // },
        // {
        //   path: "page-2",
        //   element: <Page2 />,
        // },
      ],
    },
    {
      path: "view-pdf/:id",
      element: <ViewPDFItinerary />,
    },
  ];

  return useRoutes(routes);
}

export default Router;
