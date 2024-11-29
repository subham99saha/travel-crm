// @ts-nocheck
import axios from "axios";
import api from "../../../apiconfig.json";

const URL = `${api.API_URL}${api.API_ENDPOINT.LEAD}`;
const hist_URL = `${api.API_URL}${api.API_ENDPOINT.LEAD_HISTORY}`;
// const state_URL = `${api.API_URL}${api.API_ENDPOINT.STATE}`;
// const emp_URL = `${api.API_URL}${api.API_ENDPOINT.EMPLOYEE}`;

export const createLead = async (addData) => {
    const { data } = await axios.post(`${URL}`, addData);
    // console.log({data})
    return data;
};

export const getLead = async (id) => {
    const { data } = await axios.post(`${URL}/${id}`);
    // console.log({data})
    return data;
};

export const updateLead = async(updateData,id)=>{
    const { data } = await axios.patch(`${URL}/${id}`, updateData);
    // console.log({data})
    return data;
};

export const indexLeads = async (filter) => {
    const { data } = await axios.get(`${URL}/${filter}`);
    // console.log({data})
    return data;
};

export const assignLead = async(updateData,id)=>{
    const { data } = await axios.patch(`${URL}/assign/${id}`, updateData);
    // console.log({data})
    return data;
};

export const createLeadHistory = async (addData) => {
    const { data } = await axios.post(`${hist_URL}`, addData);
    // console.log({data})
    return data;
};

export const getLeadHistory = async (id) => {
    const { data } = await axios.post(`${hist_URL}/${id}`);
    // console.log({data})
    return data;
};

// export const indexStates = async () => {
//     const { data } = await axios.get(`${state_URL}`);
//     // console.log({data})
//     return data;
// };

// export const indexEmployees = async () => {
//     const { data } = await axios.get(`${emp_URL}`);
//     console.log({data})
//     return data;
// };