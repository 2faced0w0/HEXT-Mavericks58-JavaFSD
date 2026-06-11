import axios from "axios"
import { useEffect, useState } from "react"

import IncidentBarChart from "./IncidentBarChart";

const Widget = () => {

    const statApi = "http://localhost:8081/api/station-head/stats"
     const [label, setLabel] = useState([])
    const [data, setData] = useState([])
    useEffect(() => {

        // Prepare the header 
        const config_details = {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        }

        const getStats = async () => {
            try {
                const response = await axios.get(statApi, config_details)
                setLabel(response.data.label)
                setData(response.data.count)
                console.log(response.data)
            }
            catch (err) {}
        }
        getStats()

    }, [])
    return (
        <div>
            {/* <!-- Central Working Page --> */}
            <main className="dashboard-content flex-grow-1 bg-white border border-light shadow-sm rounded-3 p-4">
                <div className="widget-container border border-dashed rounded-4 p-4 h-100 d-flex flex-column justify-content-between position-relative">

                    {/* <!-- Metrics Summary Grid Row --> */}
                    <div className="row row-cols-1 row-cols-md-3 g-3 w-100 mx-auto mb-4">
                        {/* <!-- Officers Metric Card --> */}
                        <div className="col-12 col-md-4"  >
                            <div className="metric-card p-3 bg-white border border-light shadow-sm rounded-3 d-flex align-items-center gap-3">
                                <div className="metric-icon bg-info bg-opacity-10 text-info rounded-3 p-2 fs-4 d-flex align-items-center justify-content-center">
                                    <i className="bi bi-people-fill"></i>
                                </div>
                                <div>
                                    <h3 className="text-muted fs-7 text-uppercase tracking-wider mb-0 fw-semibold">{label.length > 0 ? label[0] : 0}</h3>
                                    <p className="fs-3 fw-bold text-dark mb-0 leading-none">{data.length > 0 ? data[0] : 0}</p>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Incidents Metric Card --> */}
                        <div className="col-12 col-md-4"  >
                            <div className="metric-card p-3 bg-white border border-light shadow-sm rounded-3 d-flex align-items-center gap-3">
                                <div className="metric-icon bg-danger bg-opacity-10 text-danger rounded-3 p-2 fs-4 d-flex align-items-center justify-content-center">
                                    <i className="bi bi-exclamation-triangle-fill"></i>
                                </div>
                                <div>
                                    <h3 className="text-muted fs-7 text-uppercase tracking-wider mb-0 fw-semibold">{label.length > 1 ? label[1] : 0}</h3>
                                    <p className="fs-3 fw-bold text-dark mb-0 leading-none">{data.length > 1 ? data[1] : 0}</p>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Station Metric Card --> */}
                        <div className="col-12 col-md-4"  >
                            <div className="metric-card p-3 bg-white border border-light shadow-sm rounded-3 d-flex align-items-center gap-3">
                                <div className="metric-icon bg-success bg-opacity-10 text-success rounded-3 p-2 fs-4 d-flex align-items-center justify-content-center">
                                    <i className="bi bi-building-fill"></i>
                                </div>
                                <div>
                                    <h3 className="text-muted fs-7 text-uppercase tracking-wider mb-0 fw-semibold">{label.length > 2 ? label[2] : 0}</h3>
                                    <p className="fs-3 fw-bold text-dark mb-0 leading-none">{data.length > 2 ? data[2] : 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Data Visualization Cards --> */}
                    <div className="row align-items-stretch flex-grow-1 g-4 my-2 w-100 mx-auto">
                        {/* <!-- Officers Data Box --> */}
                        <div className="col-12 col-md-6 d-flex">
                            <div className="data-box flex-grow-1 border border-light bg-light bg-opacity-20 shadow-sm rounded-3 p-4">
                                <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2 border-light">
                                    <h4 className="fs-6 fw-bold text-dark mb-0">Incident Stats By Type</h4>
                                    <i className="bi bi-bar-chart-line text-muted"></i>
                                </div>
                                <div >
                                    {/* Here goes prime react Bar chart  */}
                                    <IncidentBarChart />
                                </div>
                            </div>
                        </div>

                        {/* <!-- Incidents Data Box --> */}
                        <div className="col-12 col-md-6 d-flex">
                            <div className="data-box flex-grow-1 border border-light bg-light bg-opacity-20 shadow-sm rounded-3 p-4">
                                <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2 border-light">
                                    <h4 className="fs-6 fw-bold text-dark mb-0">Incident Rates</h4>
                                    <i className="bi bi-graph-up-arrow text-muted"></i>
                                </div>
                                <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1 text-center py-4">
                                    <div className="chart-mock-circle d-flex align-items-center justify-content-center mb-2">
                                        <i className="bi bi-activity text-danger opacity-50 fs-2"></i>
                                    </div>
                                    <span className="text-secondary small fw-medium">Incident per station</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Floating Code Tag 
                    <div className="text-end w-100 pt-3">
                        <span className="badge bg-dark bg-opacity-10 text-dark font-monospace px-3 py-2 border border-dark border-opacity-10 d-inline-block">&lt;Widget /&gt;</span>
                    </div> --> */}
                </div>
            </main>
        </div>
    )
}

export default Widget