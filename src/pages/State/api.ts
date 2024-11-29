// @ts-nocheck
import axios from "axios";
import api from "../../../apiconfig.json";

const URL = `${api.API_URL}${api.API_ENDPOINT.STATE}`;

export const indexStates = async () => {
    const { data } = await axios.get(`${URL}`);
    // console.log({data})
    return data;
};