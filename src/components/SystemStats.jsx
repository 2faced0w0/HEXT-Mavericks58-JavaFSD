import React, { useMemo } from 'react';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';

const SystemStats = ({ reports, vehicles }) => {
  const chartData = useMemo(() => {
    const distribution = {};
    if (vehicles) {
      vehicles.forEach(v => {
        const agentName = v.agentName || 'Unassigned';
        distribution[agentName] = (distribution[agentName] || 0) + 1;
      });
    }

    return {
      labels: Object.keys(distribution),
      datasets: [
        {
          data: Object.values(distribution),
          backgroundColor: [
            '#FFC107', '#28A745', '#17A2B8', '#DC3545', '#007BFF', '#6C757D'
          ],
          hoverBackgroundColor: [
            '#FFD54F', '#4CAF50', '#4DD0E1', '#E57373', '#64B5F6', '#90A4AE'
          ],
          borderWidth: 0
        }
      ]
    };
  }, [vehicles]);

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: '#ffffff'
        }
      }
    }
  };

  return (
    <>
      <div className="row g-4">
        <div className="col-md-3">
          <Card className="text-center bg-primary text-white shadow-sm border-0">
            <i className="pi pi-indian-rupee" style={{ fontSize: '2rem' }}></i>
            <h3 className="mt-3">Rs. {reports?.totalRevenue || 0}</h3>
            <p className="mb-0">Total Revenue</p>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="text-center bg-success text-white shadow-sm border-0">
            <i className="pi pi-users" style={{ fontSize: '2rem' }}></i>
            <h3 className="mt-3">{reports?.totalUsers || 0}</h3>
            <p className="mb-0">Total Users</p>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="text-center bg-warning text-white shadow-sm border-0">
            <i className="pi pi-calendar" style={{ fontSize: '2rem' }}></i>
            <h3 className="mt-3">{reports?.totalReservations || 0}</h3>
            <p className="mb-0">Reservations</p>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="text-center bg-info text-white shadow-sm border-0">
            <i className="pi pi-car" style={{ fontSize: '2rem' }}></i>
            <h3 className="mt-3">{reports?.totalVehicles || 0}</h3>
            <p className="mb-0">Vehicles in Fleet</p>
          </Card>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12 col-md-8 mx-auto">
          <Card title="Vehicle Distribution by Agent" className="shadow-sm border-0 bg-dark text-white text-center">
            <div className="d-flex justify-content-center">
              <Chart type="pie" data={chartData} options={chartOptions} className="w-100" style={{ maxWidth: '400px' }} />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SystemStats;
