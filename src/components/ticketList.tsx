import {useEffect, useState} from "react";
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

  return (<div className="flex justify-center items-start min-h-screen bg-gray-100 py-10">
    <div className="w-full max-w-3xl space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">🎫 Support Tickets</h2>

      {tickets.length === 0 && (<p className="text-gray-500 text-sm">No tickets found 😢</p>)}

      {
        tickets.map((t : any) => (<div key={t.id} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition duration-200 border">
          {/* Header */}
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-gray-800 text-lg">{t.title}</h3>

            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(t.status)}`}>
              {t.status.toLowerCase().replace("_", " ")}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {t.description}
          </p>

          {/* Tags */}
          <div className="flex gap-2 mt-3 flex-wrap">
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
              📂 {t.category}
            </span>

            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
              ⚡ {t.priority}
            </span>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center mt-4">
            <select className="border px-2 py-1 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-400" value={t.status.toLowerCase()} onChange={e => changeStatus(t.id, e.target.value)}>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>

            <span className="text-xs text-gray-400">ID: #{t.id}</span>
          </div>
        </div>))
      }
    </div>
  </div>);
};

export default TicketList;
