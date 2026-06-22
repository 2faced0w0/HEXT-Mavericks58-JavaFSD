import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { vehicleService, reservationService, maintenanceService, brandService } from '../../services/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';

const RentalAgentDashboard = () => {
  const [activeTab, setActiveTab] = useState('checkinout');
  const [vehicles, setVehicles] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  const [brands, setBrands] = useState([]);

  // Maintenance Form
  const [mVehicleId, setMVehicleId] = useState(null);
  const [mParticulars, setMParticulars] = useState('');
  const [mDays, setMDays] = useState(null);

  const [displayDialog, setDisplayDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState(''); // 'checkin' or 'checkout'
  const [selectedResId, setSelectedResId] = useState(null);
  const [conditionDesc, setConditionDesc] = useState('');
  const [resDetailsForm, setResDetailsForm] = useState({
    customerId: null,
    vehicleId: null,
    pickupTime: '',
    dropoffTime: '',
    optionalExtras: ''
  });

  // Dialog state for Add/Update Details
  const [detailsDialog, setDetailsDialog] = useState(false);
  const [detailsMode, setDetailsMode] = useState('add');
  const [resDetails, setResDetails] = useState('');

  // Dialog state for Vehicle Add/Edit
  const [vehicleDialog, setVehicleDialog] = useState(false);
  const [maintenanceDialog, setMaintenanceDialog] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [vehicleForm, setVehicleForm] = useState({
    vehicleId: null,
    brandId: null,
    model: '',
    specifications: '',
    pricingPerDay: null,
    imageUrl: '',
    location: '',
    vehicleType: '',
    subType: ''
  });

  const toast = useRef(null);
  const navigate = useNavigate();
  const agentId = localStorage.getItem('id');

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'AGENT' && role !== 'ADMIN') {
      navigate('/');
      return;
    }
    fetchVehicles();
    fetchReservations();
    fetchMaintenance();
    fetchBrands();
  }, [navigate]);

  const fetchVehicles = async () => {
    try {
      const res = await vehicleService.getAgentVehicles({ page: 0, size: 100 });
      if (res.data && res.data.content) setVehicles(res.data.content);
    } catch (e) { console.error(e); }
  };

  const fetchReservations = async () => {
    try {
      const res = await reservationService.getAgentReservations({ page: 0, size: 100 });
      if (res.data && res.data.content) setReservations(res.data.content);
    } catch (e) { console.error(e); }
  };

  const fetchMaintenance = async () => {
    try {
      const res = await maintenanceService.getRecords({ page: 0, size: 100 });
      if (res.data && res.data.content) setMaintenanceRecords(res.data.content);
    } catch (e) { console.error(e); }
  };

  const fetchBrands = async () => {
    try {
      const res = await brandService.getAllBrands();
      setBrands(res.data || []);
    } catch (e) { console.error(e); }
  };

  const toggleAvailability = async (vehicle) => {
    try {
      const newStatus = vehicle.availabilityStatus === 'AVAILABLE' ? 'MAINTENANCE' : 'AVAILABLE';
      await vehicleService.updateStatus(vehicle.vehicleId, newStatus);
      fetchVehicles();
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Vehicle status updated', life: 3000 });
    } catch (e) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to update status', life: 3000 });
    }
  };

  const deleteVehicle = async (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      try {
        await vehicleService.deleteVehicle(id);
        fetchVehicles();
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Vehicle deleted', life: 3000 });
      } catch (e) {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete vehicle', life: 3000 });
      }
    }
  };

  const openAddVehicle = () => {
    setVehicleForm({
      vehicleId: null,
      brandId: null,
      model: '',
      specifications: '',
      pricingPerDay: null,
      imageUrl: '',
      location: '',
      vehicleType: '',
      subType: ''
    });
    setIsEditMode(false);
    setVehicleDialog(true);
  };

  const openEditVehicle = (vehicle) => {
    // We need to map the brandName to brandId if necessary, but searchVehicles doesn't return brandId directly in dto usually. 
    // Assuming we can match by name or the vehicleDto includes brandId. Let's try matching name if ID isn't there.
    let matchingBrand = brands.find(b => b.brandName === vehicle.brandName);
    setVehicleForm({
      vehicleId: vehicle.vehicleId,
      brandId: matchingBrand ? matchingBrand.brandId : null,
      model: vehicle.model || '',
      specifications: vehicle.specifications || '',
      pricingPerDay: vehicle.pricingPerDay || null,
      imageUrl: vehicle.imageUrl || '',
      location: vehicle.location || '',
      vehicleType: vehicle.vehicleType || '',
      subType: vehicle.subType || ''
    });
    setIsEditMode(true);
    setVehicleDialog(true);
  };

  const handleVehicleSubmit = async () => {
    try {
      const payload = {
        ...vehicleForm,
        agentId: parseInt(agentId)
      };

      if (isEditMode) {
        await vehicleService.updateVehicle(vehicleForm.vehicleId, payload);
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Vehicle updated', life: 3000 });
      } else {
        await vehicleService.addVehicle(payload);
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Vehicle added', life: 3000 });
      }
      setVehicleDialog(false);
      fetchVehicles();
    } catch (e) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to save vehicle', life: 3000 });
    }
  };

  const handleFileUpload = async (e) => {
    if (e.files && e.files.length > 0) {
      const file = e.files[0];
      const formData = new FormData();
      formData.append('file', file);

      setUploadingImage(true);
      try {
        const response = await vehicleService.uploadImage(formData);
        setVehicleForm({ ...vehicleForm, imageUrl: response.data });
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Image uploaded successfully.', life: 3000 });
      } catch (err) {
        console.error(err);
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to upload image.', life: 3000 });
      } finally {
        setUploadingImage(false);
      }
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
      toast.current.show({ severity: 'success', summary: 'Reported', detail: 'Maintenance reported.', life: 3000 });
      fetchMaintenance();
      fetchVehicles();
      setMaintenanceDialog(false);
      setMVehicleId(null);
      setMParticulars('');
      setMDays(null);
    } catch (e) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to report maintenance.', life: 3000 });
    }
  };

  const openDialog = (mode, rowData) => {
    setDialogMode(mode);
    setSelectedResId(rowData.reservationId);
    setConditionDesc('');
    setResDetailsForm({
      customerId: rowData.customerId,
      vehicleId: rowData.vehicleId,
      pickupTime: rowData.pickupTime ? rowData.pickupTime.substring(0, 16) : '',
      dropoffTime: rowData.dropoffTime ? rowData.dropoffTime.substring(0, 16) : '',
      optionalExtras: rowData.optionalExtras || ''
    });
    setDisplayDialog(true);
  };

  const submitCheckInOut = async () => {
    try {
      // First update the reservation details based on the form
      await reservationService.modifyReservation(selectedResId, resDetailsForm);

      // Then process checkin/checkout with condition
      if (dialogMode === 'checkin') {
        await reservationService.checkIn(selectedResId, conditionDesc);
      } else {
        await reservationService.checkOut(selectedResId, conditionDesc);
      }
      setDisplayDialog(false);
      fetchReservations();
      toast.current.show({ severity: 'success', summary: 'Success', detail: `Successfully ${dialogMode === 'checkin' ? 'Checked In' : 'Checked Out'}`, life: 3000 });
    } catch (e) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: `Failed to ${dialogMode}.`, life: 3000 });
    }
  };

  const availabilityTemplate = (rowData) => {
    let color = 'bg-success';
    if (rowData.availabilityStatus === 'RENTED') color = 'bg-danger';
    if (rowData.availabilityStatus === 'MAINTENANCE') color = 'bg-warning text-dark';
    return <span className={`badge ${color}`}>{rowData.availabilityStatus}</span>;
  };

  const openDetailsDialog = (mode) => {
    setDetailsMode(mode);
    setResDetails('');
    setDetailsDialog(true);
  };

  const submitDetails = () => {
    toast.current.show({ severity: 'success', summary: 'Success', detail: `Details ${detailsMode === 'add' ? 'added' : 'updated'} successfully.`, life: 3000 });
    setDetailsDialog(false);
  };

  const getDaysSinceLastService = (vehicleId) => {
    const records = maintenanceRecords.filter(r => r.vehicleId === vehicleId);
    if (records.length > 0) {
      // Return the max days found for this vehicle
      return Math.max(...records.map(r => r.daysSinceLastService));
    }
    return 0;
  };

  const openMaintenanceRequest = (vehicleId = null) => {
    setMVehicleId(vehicleId);
    setMParticulars('');
    setMDays(vehicleId ? getDaysSinceLastService(vehicleId) : null);
    setMaintenanceDialog(true);
  };

  const actionTemplate = (rowData) => {
    const isOverdue = getDaysSinceLastService(rowData.vehicleId) > 30;
    const isRented = rowData.availabilityStatus === 'RENTED';
    return (
      <div className="d-flex gap-2">
        <Button
          icon={rowData.availabilityStatus === 'AVAILABLE' ? "pi pi-wrench" : "pi pi-check"}
          tooltip={rowData.availabilityStatus === 'AVAILABLE' ? "Mark Maintenance" : "Mark Available"}
          className={`p-button-rounded p-button-text ${rowData.availabilityStatus === 'AVAILABLE' ? 'p-button-warning text-dark' : 'p-button-success'}`}
          onClick={() => toggleAvailability(rowData)}
          disabled={isRented}
        />
        <Button
          icon="pi pi-pencil"
          tooltip="Edit Details"
          className="p-button-rounded p-button-info p-button-text"
          onClick={() => openEditVehicle(rowData)}
        />
        <Button
          icon="pi pi-trash"
          tooltip="Delete Vehicle"
          className="p-button-rounded p-button-danger p-button-text"
          onClick={() => deleteVehicle(rowData.vehicleId)}
        />
        {isOverdue && (
          <Button
            icon="pi pi-wrench"
            tooltip="Request Maintenance"
            className="p-button-rounded p-button-warning"
            onClick={() => openMaintenanceRequest(rowData.vehicleId)}
          />
        )}
      </div>
    );
  };

  const rowClassName = (rowData) => {
    return getDaysSinceLastService(rowData.vehicleId) > 30 ? 'bg-danger text-white' : '';
  };

  const resActionTemplate = (rowData) => {
    return (
      <div className="d-flex gap-2">
        <input type="button" value="Check-Out" className='btn btn-info' onClick={() => openDialog('checkout', rowData)} disabled={rowData.bookingStatus !== 'CONFIRMED'} />
        <input type="button" value="Check-In" className='btn btn-primary' onClick={() => openDialog('checkin', rowData)} disabled={rowData.bookingStatus !== 'CHECKED_OUT'} />
      </div>
    );
  };

  return (
    <div className="container-fluid mt-5 mb-5 px-4 flex-grow-1">
      <Toast ref={toast} />
      <h2 className="mb-4 text-light">Rental Agent Dashboard</h2>

      <div className="row">
        {/* Vertical Sidebar */}
        <div className="col-md-3 col-lg-2 mb-4">
          <div className="list-group shadow-sm bg-dark">
            <button className={`list-group-item list-group-item-action border-0 py-3 ${activeTab === 'checkinout' ? 'active bg-warning text-dark' : 'bg-dark text-white'}`} onClick={() => setActiveTab('checkinout')}>
              <i className="pi pi-calendar me-2"></i> Check-In / Out
            </button>
            <button className={`list-group-item list-group-item-action border-0 py-3 ${activeTab === 'inventory' ? 'active bg-warning text-dark' : 'bg-dark text-white'}`} onClick={() => setActiveTab('inventory')}>
              <i className="pi pi-car me-2"></i> Inventory Management
            </button>
            <button className={`list-group-item list-group-item-action border-0 py-3 ${activeTab === 'maintenance' ? 'active bg-warning text-dark' : 'bg-dark text-white'}`} onClick={() => setActiveTab('maintenance')}>
              <i className="pi pi-wrench me-2"></i> Maintenance
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="col-md-9 col-lg-10">
          {activeTab === 'checkinout' && (
            <div className="card shadow-sm border-0 p-3">
              <h4 className="mb-3">Check-In / Check-Out</h4>
              <DataTable value={reservations} paginator rows={10} className="p-datatable-sm shadow-sm bg-dark text-white" emptyMessage="No reservations found or endpoint not available.">
                <Column field="reservationId" header="Res ID" sortable></Column>
                <Column field="vehicleId" header="Vehicle ID" sortable></Column>
                <Column field="pickupTime" header="Pickup"></Column>
                <Column field="dropoffTime" header="Dropoff"></Column>
                <Column field="bookingStatus" header="Status"></Column>
                <Column header="Actions" body={resActionTemplate}></Column>
              </DataTable>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="card shadow-sm border-0 p-3">
              <h4 className="mb-3">Inventory Management</h4>
              <div className="mb-3 text-end d-flex justify-content-end gap-2">
                <Button label="Add Vehicle" icon="pi pi-plus" className="btn btn-info" onClick={openAddVehicle} />
                <Button label="Raise Request" icon="pi pi-wrench" className="btn btn-warning" onClick={() => openMaintenanceRequest()} />
              </div>
              <DataTable value={vehicles} paginator rows={10} className="p-datatable-sm shadow-sm bg-dark text-white" rowClassName={rowClassName}>
                <Column field="vehicleId" header="Vehicle ID" sortable></Column>
                <Column field="model" header="Model" sortable></Column>
                <Column field="vehicleType" header="Type" sortable></Column>
                <Column field="pricingPerDay" header="Price/Day" sortable></Column>
                <Column header="Status" body={availabilityTemplate}></Column>
                <Column header="Actions" body={actionTemplate}></Column>
              </DataTable>
            </div>
          )}

          {activeTab === 'maintenance' && (
            <div className="card shadow-sm border-0 p-3">
              <h4 className="mb-3">Maintenance</h4>

              <DataTable value={maintenanceRecords} paginator rows={10} className="p-datatable-sm shadow-sm bg-dark text-white" emptyMessage="No maintenance records found.">
                <Column field="recordId" header="Record ID" sortable></Column>
                <Column field="vehicleId" header="Vehicle ID" sortable></Column>
                <Column field="particulars" header="Particulars"></Column>
                <Column field="daysSinceLastService" header="Days Since Last Service" sortable></Column>
              </DataTable>
            </div>
          )}
        </div>
      </div>

      {/* Check In/Out Dialog */}
      <Dialog header={`Vehicle ${dialogMode === 'checkin' ? 'Check-In' : 'Check-Out'}`} visible={displayDialog} style={{ width: '50vw' }} onHide={() => setDisplayDialog(false)}>
        <div className="p-fluid grid formgrid row">
          <div className="field col-md-6 mb-3">
            <label>Customer ID</label>
            <InputNumber value={resDetailsForm.customerId} onValueChange={(e) => setResDetailsForm({ ...resDetailsForm, customerId: e.value })} />
          </div>
          <div className="field col-md-6 mb-3">
            <label>Vehicle ID</label>
            <InputNumber value={resDetailsForm.vehicleId} onValueChange={(e) => setResDetailsForm({ ...resDetailsForm, vehicleId: e.value })} />
          </div>
          <div className="field col-md-6 mb-3">
            <label>Pickup Time</label>
            <InputText type="datetime-local" value={resDetailsForm.pickupTime} onChange={(e) => setResDetailsForm({ ...resDetailsForm, pickupTime: e.target.value })} />
          </div>
          <div className="field col-md-6 mb-3">
            <label>Dropoff Time</label>
            <InputText type="datetime-local" value={resDetailsForm.dropoffTime} onChange={(e) => setResDetailsForm({ ...resDetailsForm, dropoffTime: e.target.value })} />
          </div>
          <div className="field col-12 mb-3">
            <label>Optional Extras</label>
            <InputTextarea value={resDetailsForm.optionalExtras} onChange={(e) => setResDetailsForm({ ...resDetailsForm, optionalExtras: e.target.value })} rows={2} />
          </div>
          <div className="field col-12 mb-3">
            <label htmlFor="condition">Vehicle Condition Notes (Initial/Final)</label>
            <InputTextarea id="condition" value={conditionDesc} onChange={(e) => setConditionDesc(e.target.value)} rows={3} placeholder="Describe any damages, fuel level, etc." />
          </div>
          <div className="col-12 text-end">
            <Button label="Cancel" icon="pi pi-times" onClick={() => setDisplayDialog(false)} className="p-button-text me-2" />
            <Button label="Submit & Update" icon="pi pi-check" onClick={submitCheckInOut} className="p-button-success" />
          </div>
        </div>
      </Dialog>

      {/* Add/Update Details Dialog */}
      <Dialog header={detailsMode === 'add' ? 'Add Details' : 'Update Details'} visible={detailsDialog} style={{ width: '40vw' }} onHide={() => setDetailsDialog(false)}>
        <div className="p-fluid">
          <div className="field mb-3">
            <label>Additional Reservation Details</label>
            <InputTextarea value={resDetails} onChange={(e) => setResDetails(e.target.value)} rows={4} placeholder="Enter supplementary details..." />
          </div>
          <div className="text-end">
            <Button label="Cancel" type="button" icon="pi pi-times" onClick={() => setDetailsDialog(false)} className="p-button-text me-2" />
            <Button label="Save" type="button" icon="pi pi-check" onClick={submitDetails} className="p-button-primary" />
          </div>
        </div>
      </Dialog>

      {/* Add/Edit Vehicle Dialog */}
      <Dialog header={isEditMode ? "Edit Vehicle" : "Add New Vehicle"} visible={vehicleDialog} style={{ width: '50vw' }} onHide={() => setVehicleDialog(false)}>
        <div className="p-fluid grid formgrid row">
          <div className="field col-md-6 mb-3">
            <label>Brand</label>
            <Dropdown
              value={vehicleForm.brandId}
              options={brands}
              optionLabel="brandName"
              optionValue="brandId"
              onChange={(e) => setVehicleForm({ ...vehicleForm, brandId: e.value })}
              placeholder="Select a Brand"
              disabled={isEditMode}
            />
          </div>
          <div className="field col-md-6 mb-3">
            <label>Model</label>
            <InputText value={vehicleForm.model} onChange={(e) => setVehicleForm({ ...vehicleForm, model: e.target.value })} placeholder="e.g. Civic" />
          </div>
          <div className="field col-md-6 mb-3">
            <label>Type</label>
            <InputText value={vehicleForm.vehicleType} onChange={(e) => setVehicleForm({ ...vehicleForm, vehicleType: e.target.value })} placeholder="e.g. Sedan" />
          </div>
          <div className="field col-md-6 mb-3">
            <label>Sub Type</label>
            <InputText value={vehicleForm.subType} onChange={(e) => setVehicleForm({ ...vehicleForm, subType: e.target.value })} placeholder="e.g. Standard" />
          </div>
          <div className="field col-md-6 mb-3">
            <label>Pricing Per Day ($)</label>
            <InputNumber value={vehicleForm.pricingPerDay} onValueChange={(e) => setVehicleForm({ ...vehicleForm, pricingPerDay: e.value })} mode="currency" currency="USD" locale="en-US" />
          </div>
          <div className="field col-md-6 mb-3">
            <label>Location</label>
            <InputText value={vehicleForm.location} onChange={(e) => setVehicleForm({ ...vehicleForm, location: e.target.value })} placeholder="e.g. Downtown Hub" />
          </div>
          <div className="field col-12 mb-3">
            <label>Specifications</label>
            <InputTextarea value={vehicleForm.specifications} onChange={(e) => setVehicleForm({ ...vehicleForm, specifications: e.target.value })} rows={2} placeholder="Engine, seats, features..." />
          </div>
          <div className="field col-12 mb-4">
            <label>Vehicle Image</label>
            <FileUpload mode="basic" name="image" accept="image/*" maxFileSize={1000000} customUpload uploadHandler={handleFileUpload} auto chooseLabel={vehicleForm.imageUrl ? "Change Image" : "Upload Image"} className="w-100" disabled={uploadingImage} />
            {uploadingImage && <small className="text-primary d-block mt-2"><i className="pi pi-spin pi-spinner"></i> Uploading...</small>}
            {vehicleForm.imageUrl && <small className="text-muted d-block mt-2">Selected Image: {vehicleForm.imageUrl}</small>}
          </div>
          <div className="col-12 text-end">
            <Button label="Cancel" icon="pi pi-times" onClick={() => setVehicleDialog(false)} className="p-button-text me-2" />
            <Button label="Save" icon="pi pi-check" onClick={handleVehicleSubmit} autoFocus />
          </div>
        </div>
      </Dialog>

      {/* Maintenance Request Dialog */}
      <Dialog header="Report Maintenance" visible={maintenanceDialog} style={{ width: '40vw' }} onHide={() => setMaintenanceDialog(false)}>
        <form onSubmit={handleMaintenanceSubmit} className="p-fluid">
          <div className="field mb-3">
            <label>Vehicle ID</label>
            <InputNumber value={mVehicleId} onValueChange={(e) => setMVehicleId(e.value)} placeholder="Enter Vehicle ID" />
          </div>
          <div className="field mb-3">
            <label>Days Since Last Service</label>
            <InputNumber value={mDays} onValueChange={(e) => setMDays(e.value)} placeholder="E.g., 35" />
          </div>
          <div className="field mb-4">
            <label>Particulars / Issues</label>
            <InputTextarea value={mParticulars} onChange={(e) => setMParticulars(e.target.value)} rows={3} placeholder="Describe the maintenance required..." />
          </div>
          <div className="text-end">
            <Button label="Cancel" type="button" icon="pi pi-times" onClick={() => setMaintenanceDialog(false)} className="p-button-text me-2" />
            <Button label="Submit Request" type="submit" icon="pi pi-send" className="p-button-danger" />
          </div>
        </form>
      </Dialog>

    </div>
  );
};

export default RentalAgentDashboard;
