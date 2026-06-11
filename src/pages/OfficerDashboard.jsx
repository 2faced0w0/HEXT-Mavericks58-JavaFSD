import NavbarOfficer from "../components/NavBar-Officer"
import { useEffect } from "react"

const OfficerDashboard = ()=>{
     useEffect(()=>{
        // check if token is available 
        
        // check if User role is permissible 

        // else logout and go back to login 
    },[])

    return(
        <div>
            <NavbarOfficer />
            <h1>Officer Dashboard</h1>
        </div>
    )
}

export default OfficerDashboard