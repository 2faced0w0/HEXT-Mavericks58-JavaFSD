import { useState, useEffect } from 'react';
import { adminService, vehicleService } from '../services/api';
import { TabView, TabPanel } from 'primereact/tabview';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [reports, setReports] = useState(null);
  const [vehicles, setVehicles] = useState([]);

  // Promotion Form State
  const [promoCode, setPromoCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(null);
  const [validTill, setValidTill] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchPromotions();
    fetchReports();
    fetchVehicles();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await adminService.getUsers();
      setUsers(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchPromotions = async () => {
    try {
      const res = await adminService.getPromotions();
      setPromotions(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchReports = async () => {
    try {
      const res = await adminService.getReports();
      setReports(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchVehicles = async () => {
    try {
      const res = await vehicleService.searchVehicles({ page: 0, size: 100 });
      if (res.data && res.data.content) setVehicles(res.data.content);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleUserStatus = async (user) => {
    try {
      if (user.active) {
        await adminService.deactivateUser(user.id);
      } else {
        await adminService.activateUser(user.id);
      }
      fetchUsers();
    } catch (e) {
      alert("Failed to update user status.");
    }
  };

  const handleAddPromotion = async (e) => {
    e.preventDefault();
    if (!promoCode || !discountPercentage || !validTill) return;
    try {
      await adminService.addPromotion({
        promoCode,
        discountPercentage,
        validTill: validTill.toISOString()
      });
      fetchPromotions();
      setPromoCode('');
      setDiscountPercentage(null);
      setValidTill(null);
    } catch (e) {
      alert("Failed to add promotion.");
    }
  };

  const deleteVehicle = async (id) => {
    try {
      await vehicleService.deleteVehicle(id);
      fetchVehicles();
    } catch (e) {
      alert("Failed to delete vehicle.");
    }
  };

  const statusTemplate = (rowData) => {
    return <span className={`badge ${rowData.active ? 'bg-success' : 'bg-danger'}`}>{rowData.active ? 'Active' : 'Inactive'}</span>;
  };

  const actionTemplate = (rowData) => {
    return (
      <Button 
        label={rowData.active ? "Deactivate" : "Activate"} 
        icon={rowData.active ? "pi pi-times" : "pi pi-check"} 
        className={`p-button-sm ${rowData.active ? 'p-button-danger' : 'p-button-success'}`} 
        onClick={() => toggleUserStatus(rowData)} 
      />
    );
  };

  const vehicleActionTemplate = (rowData) => {
    return (
      <Button 
        icon="pi pi-trash" 
        className="p-button-rounded p-button-danger p-button-text" 
        onClick={() => deleteVehicle(rowData.vehicleId)} 
      />
    );
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4">Admin Dashboard</h2>
      
      <TabView className="shadow-sm">
        <TabPanel header="Users" leftIcon="pi pi-users mr-2">
          <DataTable value={users} paginator rows={10} className="p-datatable-sm">
            <Column field="id" header="ID" sortable></Column>
            <Column field="username" header="Username" sortable></Column>
            <Column field="role" header="Role" sortable></Column>
            <Column header="Status" body={statusTemplate}></Column>
            <Column header="Actions" body={actionTemplate}></Column>
          </DataTable>
        </TabPanel>

        <TabPanel header="Promotions" leftIcon="pi pi-tags mr-2">
          <Card title="Add Promotion" className="mb-4 shadow-sm border-0 bg-light">
            <form onSubmit={handleAddPromotion} className="row g-3">
              <div className="col-md-3">
                <InputText value={promoCode} onChange={(e) => setPromoCode(e.target.value)} placeholder="Promo Code" className="w-100" />
              </div>
              <div className="col-md-3">
                <InputNumber value={discountPercentage} onValueChange={(e) => setDiscountPercentage(e.value)} placeholder="Discount %" className="w-100" suffix="%" />
              </div>
              <div className="col-md-4">
                <Calendar value={validTill} onChange={(e) => setValidTill(e.value)} placeholder="Valid Till" showTime className="w-100" />
              </div>
              <div className="col-md-2">
                <Button type="submit" label="Add" icon="pi pi-plus" className="w-100 p-button-primary" />
              </div>
            </form>
          </Card>
          
          <DataTable value={promotions} paginator rows={10} className="p-datatable-sm">
            <Column field="promotionId" header="ID"></Column>
            <Column field="promoCode" header="Promo Code"></Column>
            <Column field="discountPercentage" header="Discount %"></Column>
            <Column field="validTill" header="Valid Till"></Column>
          </DataTable>
        </TabPanel>

        <TabPanel header="Reports" leftIcon="pi pi-chart-bar mr-2">
          {reports && (
            <div className="row g-4">
              <div className="col-md-3">
                <Card className="text-center bg-primary text-white shadow-sm">
                  <i className="pi pi-dollar" style={{ fontSize: '2rem' }}></i>
                  <h3 className="mt-3">${reports.totalRevenue}</h3>
                  <p className="mb-0">Total Revenue</p>
                </Card>
              </div>
              <div className="col-md-3">
                <Card className="text-center bg-success text-white shadow-sm">
                  <i className="pi pi-users" style={{ fontSize: '2rem' }}></i>
                  <h3 className="mt-3">{reports.totalUsers}</h3>
                  <p className="mb-0">Total Users</p>
                </Card>
              </div>
              <div className="col-md-3">
                <Card className="text-center bg-warning text-white shadow-sm">
                  <i className="pi pi-calendar" style={{ fontSize: '2rem' }}></i>
                  <h3 className="mt-3">{reports.totalReservations}</h3>
                  <p className="mb-0">Reservations</p>
                </Card>
              </div>
              <div className="col-md-3">
                <Card className="text-center bg-info text-white shadow-sm">
                  <i className="pi pi-car" style={{ fontSize: '2rem' }}></i>
                  <h3 className="mt-3">{reports.totalVehicles}</h3>
                  <p className="mb-0">Vehicles in Fleet</p>
                </Card>
              </div>
            </div>
          )}
        </TabPanel>

        <TabPanel header="Fleet Management" leftIcon="pi pi-car mr-2">
          <DataTable value={vehicles} paginator rows={10} className="p-datatable-sm">
            <Column field="vehicleId" header="ID" sortable></Column>
            <Column field="brandName" header="Brand" sortable></Column>
            <Column field="model" header="Model" sortable></Column>
            <Column field="vehicleType" header="Type" sortable></Column>
            <Column field="pricingPerDay" header="Price/Day" sortable></Column>
            <Column header="Actions" body={vehicleActionTemplate}></Column>
          </DataTable>
        </TabPanel>
      </TabView>
    </div>
  );
};

export default AdminDashboard;
