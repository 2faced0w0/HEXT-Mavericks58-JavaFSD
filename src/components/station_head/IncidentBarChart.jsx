import { useEffect, useState } from "react"
// Prime React imports 
import { Chart } from 'primereact/chart';
import axios from "axios";

const IncidentBarChart =()=>{
const incidentStatApi = "http://localhost:8081/api/incident/stat/by-type"
// Prime React States 
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(()=>{
 // Prepare the header 
        const config_details = {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        }
         // Bar Chart for Incident
        const getIncidentStat = async () => {
            try {
                const resp = await axios.get(incidentStatApi, config_details)
                console.log(resp)
                
                // Prime React variables 
                const data = {
                    labels: resp.data.label,
                    datasets: [
                        {
                            label: resp.data.title,
                            data: resp.data.data,
                            backgroundColor: [
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(153, 102, 255, 0.2)'
                            ],
                            borderColor: [
                                'rgb(255, 159, 64)',
                                'rgb(75, 192, 192)',
                                'rgb(54, 162, 235)',
                                'rgb(153, 102, 255)'
                            ],
                            borderWidth: 1
                        }
                    ]
                };
                const options = {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                };

                setChartData(data);
                setChartOptions(options);
            }
            catch (err) {  }
        }
        getIncidentStat()
    },[])
    return(
         <Chart type="bar" data={chartData} options={chartOptions} />
        )
}

export default IncidentBarChart