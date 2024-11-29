// @ts-nocheck
import axios from "axios";
import api from "../../../apiconfig.json";

const URL = `${api.API_URL}${api.API_ENDPOINT.CITY}`;

export const indexCities = async () => {
    const { data } = await axios.get(`${URL}`);
    // console.log({data})
    return data;
};