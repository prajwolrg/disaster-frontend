import { createDataContext } from "./createDataContext";
import disasterApi from "../api/disasterApi";

const reducer = (state, action) => {
  switch (action.type) {
    case "getAllIncidents":
      return { ...state, allIncidents: action.payload };
    case "getIncidentsByType":
      return { ...state, typeIncidents: action.payload };
    case "getImagesForIncident":
      return { ...state, imagesForIncident: action.payload };
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
  if (!name) return dispatch({ type: "getVMsForDistrict", payload: null });
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
  delete values.imagesToDelete;
  const formData = new FormData();
  for (const key in values) {
    if (key === "images") {
      const { images } = values;
      if (images)
        for (let i = 0; i < images.length; i++) {
          formData.append("images", images[i]);
        }
    } else formData.append(key, values[key]);
  }
  try {
    await disasterApi.post("/incident/insert", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    await getAllIncidents(dispatch)();
  } catch (err) {
    console.log(err);
  }
  dispatch({ type: "loaded" });
};

const addDataSource = (dispatch) => async (values) => {
  dispatch({ type: "loading" });
  try {
    await disasterApi.post("/datasource/insert", values);
    await getSources(dispatch)();
  } catch (err) {
    console.log(err);
  }
  dispatch({ type: "loaded" });
};

const getImagesForIncident = (dispatch) => async (id) => {
  dispatch({ type: "loading" });
  try {
    const response = await disasterApi.get(`/incident/image/${id}`);
    dispatch({ type: "getImagesForIncident", payload: response.data });
    console.log(id, response.data);
  } catch (err) {
    console.log(err);
  }
  dispatch({ type: "loaded" });
};

const updateIncident = (dispatch) => async (id, values) => {
  dispatch({ type: "loading" });
  const formData = new FormData();
  for (const key in values) {
    if (key === "images") {
      const { images } = values;
      if (images)
        for (let i = 0; i < images.length; i++) {
          formData.append("images", images[i]);
        }
    } else if (key === "imagesToDelete") {
      let imagesToDelete = values.imagesToDelete.map((image) => image.value);
      if (imagesToDelete)
        for (let i = 0; i < imagesToDelete.length; i++) {
          formData.append("imagesToDelete", imagesToDelete[i]);
        }
    } else formData.append(key, values[key]);
  }
  try {
    await disasterApi.patch(`/incident/update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    await getAllIncidents(dispatch)();
  } catch (err) {
    console.log(err);
  }
  dispatch({ type: "loaded" });
};
const deleteIncident = (dispatch) => async (id) => {
  dispatch({ type: "loading" });
  try {
    await disasterApi.delete(`/incident/delete/${id}`);
    await getAllIncidents(dispatch)();
  } catch (err) {
    console.log(err);
  }
  dispatch({ type: "loaded" });
};
const deleteMultipleIncidents = (dispatch) => async (idArray) => {
  dispatch({ type: "loading" });
  try {
    await idArray.forEach(async (id) => {
      await disasterApi.delete(`/incident/delete/${id}`);
    });
    await getAllIncidents(dispatch)();
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
    addDataSource,
    deleteMultipleIncidents,
    getDisasterTypeNames,
    getIncidentsByType,
    getImagesForIncident,
  },
  {
    allIncidents: null,
    districts: null,
    sources: null,
    VMsForDistrict: null,
    disasterTypeNames: null,
    imagesForIncident: null,
    isLoading: false,
  }
);
