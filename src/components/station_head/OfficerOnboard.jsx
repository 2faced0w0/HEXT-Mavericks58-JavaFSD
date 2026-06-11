import axios from "axios";
import { useState } from "react"

const OfficerOnboard = () => {

    const [name, setName] = useState()
    const [username, setUsername] = useState()
    const postApi = 'http://localhost:8081/api/officer/add';

    const [successMsg, setSuccessMsg] = useState()
    const [errMsg, setErrMsg] = useState()

    const [errMsgName, setErrMsgName] = useState()
    const [errMsgUsername, setErrMsgUsername] = useState()

    const onboardOfficer = async (e) => {
        e.preventDefault()
        let body = {
            'name': name,
            'username': username
        }
        const config_details = {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        }
        try {
            const response = await axios.post(postApi, body, config_details)
            setSuccessMsg("Officer Onboarded")
            setName('')
            setUsername('')
            setErrMsg(undefined)
            setErrMsgName(undefined)
            setErrMsgUsername(undefined)
        }
        catch (err) {
            console.log(err.response.data)

            setErrMsg("Onboarding Failed " +( err.response?.data?.message || "" ));
            setErrMsgName(err.response?.data?.name  || undefined)
            setErrMsgUsername(err.response?.data?.username || undefined)
            setSuccessMsg(undefined); 
        }

    }
    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-header">
                        Officer Onboarding
                    </div>
                    <div className="card-body">
                        <form onSubmit={(e) => onboardOfficer(e)}>
                            {
                                successMsg !== undefined ?
                                    <div className="alert alert-primary mb-4"  >
                                        {successMsg}
                                    </div> :
                                    ""
                            }
                            {
                                errMsg !== undefined ?
                                    <div className="alert alert-danger mb-4"  >
                                        {errMsg}
                                    </div> : ""
                            }

                            <div className="mb-4">
                                <label>Officer Name: </label>
                                {
                                    errMsgName !== undefined? 
                                    <span style={{color:'red' , fontSize : '11px'}}>
                                        {errMsgName}
                                    </span> : ""
                                }   
                                <input type="text" className="form-control" required  
                                    onChange={(e) => setName(e.target.value)} value={name}/>
                            </div>
                            <div className="mb-4">
                                <label>Officer Username: </label>
                                {
                                    errMsgUsername !== undefined? 
                                    <span style={{color:'red' , fontSize : '11px'}}>
                                        {errMsgUsername}
                                    </span> : ""
                                }
                                <input type="text" className="form-control" required
                                    onChange={(e) => setUsername(e.target.value)} value={username}  />
                            </div>
                            <div className="mb-4">
                                <input type="submit" className="btn btn-secondary"
                                    value="Add Officer in System" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OfficerOnboard