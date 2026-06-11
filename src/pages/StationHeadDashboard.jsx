import NavbarStationHead from "../components/Navbar-StationHead"
import OfficerOnboard from "../components/station_head/OfficerOnboard"
import Sidebar from "../components/station_head/Sidebar"
import Widget from "../components/station_head/Widget"

import '../assets/css/station_head_module_style.css'

const StationHeadDashboard = () => {

    return (
        <div className="bg-light min-vh-100 d-flex flex-column p-3">
            <NavbarStationHead />
            {/* <!-- App Shell Container --> */}
            <div className="d-flex flex-grow-1 gap-3 align-items-stretch"> 
                    <Sidebar />
                <div className="flex-grow-1">
                    <Widget />
                </div>

            </div>

        </div>
    )
}

export default StationHeadDashboard