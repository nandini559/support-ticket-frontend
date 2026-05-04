import axios from "axios";

const API = axios.create({baseURL: "http://localhost:3004/api"});

export const getTickets = (params? : any) => API.get("/tickets", {params});

export const createTicket = (data : any) => API.post("/tickets", data);

// ✅ export it
export const classifyTicket = async (description : string) => {
  const res = await fetch("http://localhost:3004/api/tickets/classify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({description})
  });

  return res.json();
};

export const getStats = () => API.get("/tickets/stats");

export const updateTicket = (id : number, data : any) => API.patch(`/tickets/${id}`, data);
