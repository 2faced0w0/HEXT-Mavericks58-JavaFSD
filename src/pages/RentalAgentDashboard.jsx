import { useState, useEffect } from 'react';
import { vehicleService, reservationService, maintenanceService } from '../services/api';
import { TabView, TabPanel } from 'primereact/tabview';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';

const RentalAgentDashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  
  // Maintenance Form
  const [mVehicleId, setMVehicleId] = useState(null);
  const [mParticulars, setMParticulars] = useState('');
  const [mDays, setMDays] = useState(null);

  // Dialog state for Check-in / Check-out
  const [displayDialog, setDisplayDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState(''); // 'checkin' or 'checkout'
  const [selectedResId, setSelectedResId] = useState(null);
  const [conditionDesc, setConditionDesc] = useState('');

  const agentId = localStorage.getItem('id');

  useEffect(() => {
    fetchVehicles();
    fetchReservations();
    fetchMaintenance();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await vehicleService.searchVehicles({ page: 0, size: 100 });
      if (res.data && res.data.content) setVehicles(res.data.content);
    } catch (e) { console.error(e); }
  };

  const fetchReservations = async () => {
    try {
      // Assuming agent sees all past/current reservations (or a specific endpoint if available)
      // Since we don't have a specific agent reservation endpoint, we'll just show them if they exist
      // For demo, we'll try to use getMyReservations, but wait, agent might not be a customer.
      // We will leave reservations empty or mock if the endpoint fails
      const res = await reservationService.getMyReservations({ page: 0, size: 100 });
      if (res.data && res.data.content) setReservations(res.data.content);
    } catch (e) { console.error(e); }
  };

  const fetchMaintenance = async () => {
    try {
      const res = await maintenanceService.getRecords({ page: 0, size: 100 });
      if (res.data && res.data.content) setMaintenanceRecords(res.data.content);
    } catch (e) { console.error(e); }
  };

  const toggleAvailability = async (vehicle) => {
    try {
      await vehicleService.updateStatus(vehicle.vehicleId, !vehicle.isAvailable);
      fetchVehicles();
    } catch (e) {
      alert("Failed to update status.");
    }
  };

  const handleMaintenanceSubmit = async (e) => {
    e.preventDefault();
    if (!mVehicleId || !mParticulars || mDays === null) return;
    try {
      await maintenanceService.addRecord({
        vehicleId: mVehicleId,
        agentId: parseInt(agentId),
        particulars: mParticulars,
        daysSinceLastService: mDays
      });
      alert('Maintenance reported. Vehicle automatically set to UNAVAILABLE.');
      fetchMaintenance();
      fetchVehicles(); // Refresh vehicles to show updated status
      setMVehicleId(null);
      setMParticulars('');
      setMDays(null);
    } catch (e) {
      alert("Failed to report maintenance.");
    }
  };

  const openDialog = (mode, id) => {
    setDialogMode(mode);
    setSelectedResId(id);
    setConditionDesc('');
    setDisplayDialog(true);
  };

  const submitCheckInOut = async () => {
    try {
      if (dialogMode === 'checkin') {
        await reservationService.checkIn(selectedResId, conditionDesc);
      } else {
        await reservationService.checkOut(selectedResId, conditionDesc);
      }
      setDisplayDialog(false);
      fetchReservations();
    } catch (e) {
      alert(`Failed to ${dialogMode}.`);
    }
  };

  const availabilityTemplate = (rowData) => {
    return <span className={`badge ${rowData.isAvailable ? 'bg-success' : 'bg-danger'}`}>{rowData.isAvailable ? 'Available' : 'Maintenance/Rented'}</span>;
  };

  const toggleActionTemplate = (rowData) => {
    return (
      <Button 
        label="Toggle Status" 
        className="p-button-sm p-button-outlined" 
        onClick={() => toggleAvailability(rowData)} 
      />
    );
  };

  const resActionTemplate = (rowData) => {
    return (
      <div className="d-flex gap-2">
        <Button label="Check-Out" size="small" severity="warning" onClick={() => openDialog('checkout', rowData.reservationId)} />
        <Button label="Check-In" size="small" severity="success" onClick={() => openDialog('checkin', rowData.reservationId)} />
      </div>
    );
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4">Rental Agent Dashboard</h2>
      
      <TabView className="shadow-sm">
        <TabPanel header="Check-In / Check-Out" leftIcon="pi pi-calendar mr-2">
          <DataTable value={reservations} paginator rows={10} className="p-datatable-sm" emptyMessage="No reservations found or endpoint not available.">
            <Column field="reservationId" header="Res ID" sortable></Column>
            <Column field="vehicleId" header="Vehicle ID" sortable></Column>
            <Column field="pickupTime" header="Pickup"></Column>
            <Column field="dropoffTime" header="Dropoff"></Column>
            <Column field="bookingStatus" header="Status"></Column>
            <Column header="Actions" body={resActionTemplate}></Column>
          </DataTable>
        </TabPanel>

        <TabPanel header="Inventory Management" leftIcon="pi pi-car mr-2">
          <DataTable value={vehicles} paginator rows={10} className="p-datatable-sm">
            <Column field="vehicleId" header="Vehicle ID" sortable></Column>
            <Column field="model" header="Model" sortable></Column>
            <Column field="vehicleType" header="Type" sortable></Column>
            <Column header="Status" body={availabilityTemplate}></Column>
            <Column header="Actions" body={toggleActionTemplate}></Column>
          </DataTable>
        </TabPanel>

        <TabPanel header="Maintenance Alerts" leftIcon="pi pi-exclamation-triangle mr-2">
          <Card title="Report Maintenance" className="mb-4 shadow-sm border-0 bg-light">
            <form onSubmit={handleMaintenanceSubmit} className="row g-3">
              <div className="col-md-2">
                <InputNumber value={mVehicleId} onValueChange={(e) => setMVehicleId(e.value)} placeholder="Vehicle ID" className="w-100" />
              </div>
              <div className="col-md-3">
                <InputNumber value={mDays} onValueChange={(e) => setMDays(e.value)} placeholder="Days Since Last Service" className="w-100" />
              </div>
              <div className="col-md-5">
                <InputTextarea value={mParticulars} onChange={(e) => setMParticulars(e.target.value)} placeholder="Particulars / Issues" rows={1} className="w-100" />
              </div>
              <div className="col-md-2">
                <Button type="submit" label="Report" icon="pi pi-send" className="w-100 p-button-danger" />
              </div>
            </form>
          </Card>

          <DataTable value={maintenanceRecords} paginator rows={10} className="p-datatable-sm">
            <Column field="recordId" header="Record ID"></Column>
            <Column field="vehicleModel" header="Vehicle"></Column>
            <Column field="particulars" header="Issues"></Column>
            <Column field="daysSinceLastService" header="Days"></Column>
            <Column field="agentName" header="Reported By"></Column>
          </DataTable>
        </TabPanel>
      </TabView>

      <Dialog header={`Vehicle ${dialogMode === 'checkin' ? 'Check-In' : 'Check-Out'}`} visible={displayDialog} style={{ width: '50vw' }} onHide={() => setDisplayDialog(false)}>
        <div className="p-fluid">
          <div className="field">
            <label htmlFor="condition">Vehicle Condition Notes</label>
            <InputTextarea id="condition" value={conditionDesc} onChange={(e) => setConditionDesc(e.target.value)} rows={3} placeholder="Describe any damages, fuel level, etc." />
          </div>
          <Button label="Submit" onClick={submitCheckInOut} className="mt-3" />
        </div>
      </Dialog>
    </div>
  );
};

export default RentalAgentDashboard;
