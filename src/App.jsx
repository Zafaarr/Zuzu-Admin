import { Routes, Route } from "react-router-dom";
// import { Navigate, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Table from "./components/Table/Table";
import Form from "./components/Form/Form";
import HomePage from "./components/HomePage/HomePage";
import Branches from "./components/Branches/Branches";
import Products from "./components/Products/Products";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:slug" element={<Table />} />
      <Route path="/:slug" element={<Table />} />
      <Route path="/:slug/create" element={<Form />} />
      <Route path="/:slug/update/:id" element={<Form />} />
    </Routes>
    // <Routes>
    //   <Route path="/" element={<Navigate to="/branches" />} />
    //   <Route path="/:slug" element={<Table />} />
    //   <Route path="/:slug/create" element={<Form />} />
    //   <Route path="/:slug/update/:id" element={<Form />} />
    // </Routes>
  );
}

export default App;
