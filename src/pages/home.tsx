// pages/Home.tsx
import {useState} from "react";
import TicketForm from "../components/ticketForm";

const Home = () => {
  const [refresh, setRefresh] = useState(0);

  const triggerRefresh = () => {
    setRefresh((prev) => prev + 1);
  };

  return (<div className="p-6">
    <TicketForm onSuccess={triggerRefresh}/>
  </div>);
};

export default Home;
