import { Routes, Route } from "react-router-dom";

import Home from "./routes/Home";
import Admins from "./routes/Admins";
import ShowAdmin from "./routes/ShowAdmin";
import Teachers from "./routes/Teachers";

import "./index.css";

const Manage = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admins" element={<Admins />} />
      <Route path="/admin/:id" element={<ShowAdmin />} />
      <Route path="/teachers" element={<Teachers />} />
    </Routes>
  );
};

export default Manage;
