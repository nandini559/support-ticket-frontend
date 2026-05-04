import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import Home from "./pages/home";
import TicketList from "./components/ticketList";
import StatsDashboard from "./components/statsDashboard";
import Navbar from "./pages/navbar";

function App() {
  return (<BrowserRouter>
    <Toaster position="top-right" reverseOrder={false}/>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/all-tickets" element={<TicketList />}/>
      <Route path="/stats" element={<StatsDashboard />}/>
    </Routes>
  </BrowserRouter>);
}

export default App;
