import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import PageNotFound from "./pages/PageNotFound";
import OfficerDashboard from "./pages/OfficerDashboard";
import StationHeadDashboard from "./pages/StationHeadDashboard";

const App = ()=>{

  return(
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Auth />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
        <Route path="/officer" element={<OfficerDashboard />}></Route>
        <Route path="/station-head" element={<StationHeadDashboard />}></Route>
      </Routes>
    </div>
  )

}

export default App; 