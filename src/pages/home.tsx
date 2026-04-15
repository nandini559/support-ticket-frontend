import {useState} from "react";

import TicketForm from "../components/ticketForm";
import TicketList from "../components/ticketList";
import StatsDashboard from "../components/statsDashboard";

const Home = () => {
  const [refresh, setRefresh] = useState(0);

  const triggerRefresh = () => {
    console.log("Refreshing UI 🔄");
    setRefresh((prev) => prev + 1);
  };
  console.log("Refresh value:", refresh);

  return (<div className="grid grid-cols-3 gap-6 p-6">
    <TicketForm onSuccess={triggerRefresh}/>
    <TicketList refresh={refresh}/>
    <StatsDashboard refresh={refresh}/>
  </div>);
};

export default Home;
