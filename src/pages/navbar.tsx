// components/Navbar.tsx
import {NavLink} from "react-router-dom";

const Navbar = () => {
  const linkStyle = "px-4 py-2 rounded-lg transition duration-200 hover:bg-gray-700";

  const activeStyle = "bg-gray-900";

  return (<div className="bg-gray-800 text-white shadow-md">
    <div className="max-w-5xl mx-auto flex justify-between items-center p-4">
      {/* Logo / Title */}
      <h1 className="text-lg font-bold tracking-wide">
        🎫 Support Ticket System
      </h1>

      {/* Links */}
      <div className="flex gap-3 text-sm font-medium">
        <NavLink to="/" className={(
            {isActive}) => `${linkStyle} ${isActive
            ? activeStyle
            : ""}`
}>
          Create
        </NavLink>

        <NavLink to="/all-tickets" className={(
            {isActive}) => `${linkStyle} ${isActive
            ? activeStyle
            : ""}`
}>
          Tickets
        </NavLink>

        <NavLink to="/stats" className={(
            {isActive}) => `${linkStyle} ${isActive
            ? activeStyle
            : ""}`
}>
          Stats
        </NavLink>
      </div>
    </div>
  </div>);
};

export default Navbar;
