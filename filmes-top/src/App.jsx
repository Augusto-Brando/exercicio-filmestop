import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"

import "./App.css";
import SearchInput from "./components/SearchInput";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <SearchInput />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
