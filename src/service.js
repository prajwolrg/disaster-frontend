const baseUrl = "http://localhost:5000";

// get
export function getIncidents() {
    return fetch(baseUrl + "/incident/view").then((res) => res.json());
}

//add

//update

//delete
