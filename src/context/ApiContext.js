import { createDataContext } from "./createDataContext";
import disasterApi from "../api/disasterApi";

const reducer = (state, action) => {
  switch (action.type) {
    case "getAllIncidents":
      return { ...state, allIncidents: action.payload };
    case "getFloodIncidents":
      return { ...state, floodIncidents: action.payload };
    case "getEarthquakeIncidents":
      return { ...state, earthquakeIncidents: action.payload };
    case "getFireIncidents":
      return { ...state, fireIncidents: action.payload };
    case "getIncidentsByType":
      return { ...state, typeIncidents: action.payload };
    case "getDisasterTypeNames":
      return { ...state, disasterTypeNames: action.payload };
    case "getDistricts":
      return { ...state, districts: action.payload };
    case "getSources":
      return { ...state, sources: action.payload };
    case "getVMsForDistrict":
      return { ...state, VMsForDistrict: action.payload };
    case "loading":
      return { ...state, isLoading: true };
    case "loaded":
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

const getAllIncidents = (dispatch) => async () => {
  dispatch({ type: "loading" });
  try {
    const response = await disasterApi.get("/");
    dispatch({ type: "getAllIncidents", payload: response.data });
  } catch (err) {
    console.log(err);
  }
  dispatch({ type: "loaded" });
};
const getFloodIncidents = (dispatch) => async (id) => {
  dispatch({ type: "loading" });
  try {
    const response = await disasterApi.get(`/incident/view/flood`);
    dispatch({ type: "getFloodIncidents", payload: response.data });
  } catch (err) {
    console.log(err);
  }
  dispatch({ type: "loaded" });
};

const getEarthquakeIncidents = (dispatch) => async () => {
  dispatch({ type: "loading" });
  try {
    const response = await disasterApi.get(`/incident/view/earthquake`);
    dispatch({ type: "getEarthquakeIncidents", payload: response.data });
  } catch (err) {
    console.log(err);
  }
  dispatch({ type: "loaded" });
};

const getFireIncidents = (dispatch) => async () => {
  dispatch({ type: "loading" });
  try {
    const response = await disasterApi.get(`/incident/view/fire`);
    dispatch({ type: "getFireIncidents", payload: response.data });
  } catch (err) {
    console.log(err);
  }
  dispatch({ type: "loaded" });
};

const getIncidentsByType = (dispatch) => async (disasterType) => {
  dispatch({ type: "loading" });
  try {
    const response = await disasterApi.get(`/incident/view/${disasterType}`);
    dispatch({ type: "getIncidentsByType", payload: response.data });
  } catch (err) {
    console.log(err);
  }
  dispatch({ type: "loaded" });
};

const getDistricts = (dispatch) => async () => {
  dispatch({ type: "loading" });
  try {
    const response = await disasterApi.get(`/district/view`);
    dispatch({ type: "getDistricts", payload: response.data });
  } catch (err) {
    console.log(err);
  }
  dispatch({ type: "loaded" });
};

const getSources = (dispatch) => async () => {
  dispatch({ type: "loading" });
  try {
    const response = await disasterApi.get("/datasource/view");
    dispatch({ type: "getSources", payload: response.data });
  } catch (err) {
    console.log(err);
  }
  dispatch({ type: "loaded" });
};
const getDisasterTypeNames = (dispatch) => async () => {
  dispatch({ type: "loading" });
  try {
    const response = await disasterApi.get("/disastertype/view");
    dispatch({ type: "getDisasterTypeNames", payload: response.data });
  } catch (err) {
    console.log(err);
  }
  dispatch({ type: "loaded" });
};

const getVMsForDistrict = (dispatch) => async (name) => {
  dispatch({ type: "loading" });
  try {
    const response = await disasterApi.get(`/vm/district/${name}`);
    dispatch({ type: "getVMsForDistrict", payload: response.data });
  } catch (err) {
    console.log(err);
  }
  dispatch({ type: "loaded" });
};

const addIncident = (dispatch) => async (values) => {
  dispatch({ type: "loading" });
  try {
    await disasterApi.post("/incident/insert", values);
  } catch (err) {
    console.log(err);
  }
  dispatch({ type: "loaded" });
};

const updateIncident = (dispatch) => async (id, values) => {
  dispatch({ type: "loading" });
  try {
    await disasterApi.patch(`/incident/update/${id}`, values);
  } catch (err) {
    console.log(err);
  }
  dispatch({ type: "loaded" });
};
const deleteIncident = (dispatch) => async (id) => {
  dispatch({ type: "loading" });
  try {
    await disasterApi.delete(`/incident/delete/${id}`);
  } catch (err) {
    console.log(err);
  }
  dispatch({ type: "loaded" });
};

export const { Context, Provider } = createDataContext(
  reducer,
  {
    getAllIncidents,
    getFloodIncidents,
    getEarthquakeIncidents,
    getFireIncidents,
    getDistricts,
    getSources,
    getVMsForDistrict,
    addIncident,
    updateIncident,
    deleteIncident,
    getDisasterTypeNames,
    getIncidentsByType,
  },
  {
    allIncidents: null,
    floodIncidents: null,
    earthquakeIncidents: null,
    fireIncidents: null,
    typeIncidents:null,
    districts: null,
    sources: null,
    VMsForDistrict: null,
    disasterTypeNames: null,
    isLoading: false,
  }
);
