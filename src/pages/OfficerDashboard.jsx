import { useEffect, useState } from "react"
import NavbarOfficer from "../components/NavBar-Officer"
import axios from "axios"

const OfficerDashboard = () => {

    const [file, setFile] = useState()
    const [errMsg, setErrMsg] = useState()
    const uploadApi = "http://localhost:8080/api/officer/id/upload"
    const [successMsg, setSuccessMsg] = useState()

    const [fileName, setFileName] = useState()
    useEffect(() => {
        // check if token is available 

        // check if User role is permissible 

        // else logout and go back to login 
    }, [])

    const handleFileChange = (e) => {
        console.log(e.target.files[0])
        setFile(e.target.files[0])
        setErrMsg(undefined)
    }

    const handleUpload = async (e) => {
        if (!file) {
            setErrMsg("Please select a file")
            return
        }

        // Create a FormData
        const formData = new FormData()
        formData.append('file', file)
        // Critical part- api wants the file to be set to 'file' key

        // Prepare the header 
        const config_details = {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        }

        // Call the API 
        /**
         1. API path
         2. Body / Formdata
         3. Header
         */
        try {
            const response = await axios.post(uploadApi, formData, config_details)
            setSuccessMsg('File Successfully uploaded')
            setFileName(file.name)
            setFile(undefined)

        }
        catch (err) {
            console.log(err) //err.response.data.message
        }

    }
    return (
        <div>
            <NavbarOfficer />
            <h1>Officer Dashboard</h1>
            <div className="container">
                <div className="row">
                    <div className="col-sm-3"> </div>
                    <div className="col-md-6">
                        {
                            successMsg !== undefined ?
                                <div>
                                    {successMsg}
                                </div> : ""
                        }

                        <label>Upload ID:</label> <br />
                        <input type="file" onChange={(e) => handleFileChange(e)} />
                        &nbsp;&nbsp;
                        {
                            errMsg !== undefined ?
                                <span style={{ color: 'red' }}>{errMsg}</span> :
                                ""
                        }
                        <br />
                        <button onClick={(e) => handleUpload(e)}>Upload Id</button>
                    </div>
                    <div className="col-sm-3"> </div>
                </div>
                {
                    fileName !== undefined ? <img src={`images/${fileName}`} style={{width: '200px'}}></img>:""
                }
                 
            </div>

        </div>
    )
}

export default OfficerDashboard