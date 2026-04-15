import React, {useEffect, useState} from "react";
import {getTickets, updateTicket} from "../services/api";

const TicketList = ({refresh} : any) => {
  const [tickets, setTickets] = useState([]);

  // ✅ MOVE HERE (outside functions)
  const getStatusColor = (status : string) => {
    switch (status) {
      case "OPEN":
        return "bg-yellow-100 text-yellow-700";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-700";
      case "RESOLVED":
        return "bg-green-100 text-green-700";
      case "CLOSED":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-gray-100";
    }
  };

  const fetchTickets = async () => {
    try {
      const res = await getTickets();
      console.log("Tickets:", res.data);
      setTickets(res.data);
    } catch (err) {
      console.error("Error fetching tickets ❌", err);
    }
  };

  useEffect(() => {
    console.log("Fetching tickets 🔄");
    fetchTickets();
  }, [refresh]);

  const changeStatus = async (id : number, status : string) => {
    try {
      await updateTicket(id, {
        status: status.toUpperCase() // ✅ backend expects uppercase
      });
      fetchTickets();
    } catch (err) {
      console.error("Status update failed ❌", err);
    }
  };

  return (<div className="bg-white p-4 rounded shadow w-full">
    <h2 className="text-lg font-semibold mb-4">Support Tickets</h2>

    {tickets.length === 0 && (<p className="text-gray-500 text-sm">No tickets found 😢</p>)}

    {
      tickets.map((t : any) => (<div key={t.id} className="border-b py-3">
        <h3 className="font-semibold">{t.title}</h3>

        <p className="text-sm text-gray-600 truncate">{t.description}</p>

        {/* Tags */}
        <div className="flex gap-3 mt-2 text-xs">
          <span className="bg-gray-100 px-2 py-1 rounded">{t.category}</span>

          <span className="bg-gray-100 px-2 py-1 rounded">{t.priority}</span>

          {/* ✅ NOW WORKS */}
          <span className={`px-2 py-1 rounded text-xs ${getStatusColor(t.status)}`}>
            {t.status.toLowerCase().replace("_", " ")}
          </span>
        </div>

        {/* Status Dropdown */}
        <select className="mt-2 border p-1 text-sm rounded" value={t.status.toLowerCase()} onChange={e => changeStatus(t.id, e.target.value)}>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
      </div>))
    }
  </div>);
};

export default TicketList;
