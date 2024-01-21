import { useEffect, useState } from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import toastr from "toastr";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar/>
      <Dashboard/>
      <Footer />
    </>
  );
}

export default App;
