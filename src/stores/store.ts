import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import darkModeReducer from "./darkModeSlice";
import colorSchemeReducer from "./colorSchemeSlice";
import sideMenuReducer from "./sideMenuSlice";
import simpleMenuReducer from "./simpleMenuSlice";
import topMenuReducer from "./topMenuSlice";
import permissionsSlice from "./permissionsSlice";

import travelTypeReducer from "../pages/TravelType/TravelTypeSlice";
import currencyReducer from "../pages/Currency/CurrencySlice";
import leadSourceReducer from "../pages/LeadSource/LeadSourceSlice";
import itineraryProductReducer from "../pages/ItineraryProduct/ItineraryProductSlice";
import travelRequirementReducer from "../pages/TravelRequirement/TravelRequirementSlice";
import stateReducer from "../pages/State/StateSlice";
import countryReducer from "../pages/Country/CountrySlice";
import cityReducer from "../pages/City/CitySlice";
import airlineReducer from "../pages/Airline/AirlineSlice";
import superUserReducer from "../pages/SuperUser/SuperUserSlice";
import transportTypeReducer from "../pages/TransportType/TransportTypeSlice";
import vendorReducer from "../pages/Vendor/vendorSlice";
import trainReducer from "../pages/Train/trainSlice";
import vendorTrainReducer from "../pages/VendorTrain/vendorTrainSlice";
import cruiseReducer from "../pages/Cruise/cruiseSlice";
import vendorCruiseReducer from "../pages/VendorCruise/vendorCruiseSlice";
import transportReducer from "../pages/Transport/transportSlice";
import vendorTransportReducer from "../pages/VendorTransport/vendorTransportSlice";
import clientReducer from "../pages/Client/clientSlice";
import flightReducer from "../pages/Flight/flightSlice";
import vendorFlightReducer from "../pages/VendorFlight/vendorFlightSlice";
import departmentReducer from "../pages/Department/departmentSlice";
import employeeReducer from "../pages/Employee/employeeSlice";
import itineraryReducer from "../pages/Itinerary/ItinerarySlice";
import vendorActivityReducer from "../pages/VendorActivity/vendorActivitySlice";
import vendorHotelReducer from "../pages/VendorHotel/vendorHotelSlice";
import vendorHotelRoomReducer from "../pages/VendorHotel/HotelRoom/vendorHotelRoomSlice";
import hotelReducer from "../pages/Hotel/HotelSlice";
import proposalReducer from "../pages/Proposal/proposalSlice";
import activityTypeReducer from "../pages/ActivityType/activityTypeSlice";

import loginReducer from "../pages/Login/loginSlice";
import verifyLoginReducer from "../pages/Login/verifyLogin";
import hotelRoomImageReducer from "../pages/VendorHotel/HotelImage/RoomImageSlice";
import hotelRoomVideoReducer from "../pages/VendorHotel/HotelVideo/RoomVideoSlice";
import allMenuSlice from "./allMenuSlice";
import loanReducer from "../pages/Employee/Loans/loanSlice";

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    colorScheme: colorSchemeReducer,
    sideMenu: sideMenuReducer,
    simpleMenu: simpleMenuReducer,
    topMenu: topMenuReducer,
    travelType: travelTypeReducer,
    currency: currencyReducer,
    leadSource: leadSourceReducer,
    itineraryProduct: itineraryProductReducer,
    travelRequirement: travelRequirementReducer,
    state: stateReducer,
    country: countryReducer,
    city: cityReducer,
    airline: airlineReducer,
    superUser: superUserReducer,
    transportType: transportTypeReducer,
    vendor: vendorReducer,
    train: trainReducer,
    vendorTrain: vendorTrainReducer,
    cruise: cruiseReducer,
    vendorCruise: vendorCruiseReducer,
    transport: transportReducer,
    vendorTransport: vendorTransportReducer,
    client: clientReducer,
    flight: flightReducer,
    vendorFlight: vendorFlightReducer,
    department: departmentReducer,
    employee: employeeReducer,
    loan:loanReducer,
    itinerary: itineraryReducer,
    vendorActivity: vendorActivityReducer,
    vendorHotel: vendorHotelReducer,
    hotel: hotelReducer,
    proposal: proposalReducer,
    activityType: activityTypeReducer,
    login: loginReducer,
    verifyLoginReducer: verifyLoginReducer,
    hotelRoomReducer: vendorHotelRoomReducer,
    hotelRoomImageReducer,
    hotelRoomVideoReducer,
    permissions: permissionsSlice,
    allMenu: allMenuSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
