import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";

function App() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    console.log(localStorage.getItem("ocm-token"));
    if (localStorage.getItem("ocm-token")) {
      setLogin(true);
    }
  }, []);

  return (
    <div>
      {login ? 
        
         <Home />
        
       : 
        <Routes>
          <Route path="*" element={<Navigate to={"/login"} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      }
    </div>
  );
}

export default App;
