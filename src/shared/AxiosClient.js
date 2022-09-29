import axios from "axios";

export const clientInstance = axios.create({
    baseURL : process.env.REACT_APP_BASE_URL
})

export const firestoreInstance = axios.create({ baseURL: "https://firestore.googleapis.com/v1/projects/asset-management-dea09/databases/(default)/documents" }) 
export const notificationInstance = axios.create({ baseURL: "https://exp.host/--/api/v2/push" }) 