import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3004/api" // ✅ remove /api unless your backend has global prefix
});

export const getTickets = (params? : any) => API.get("/tickets", {params});

export const createTicket = (data : any) => API.post("/tickets", data);

export const classifyTicket = (description : string) => API.post("/tickets/classify", {description});

export const getStats = () => API.get("/tickets/stats");

export const updateTicket = (id : number, data : any) => API.patch(`/tickets/${id}`, data);
