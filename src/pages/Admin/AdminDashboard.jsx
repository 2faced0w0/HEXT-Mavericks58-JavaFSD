import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../store/slices/usersSlice';
import { adminService, vehicleService } from '../../services/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { Badge } from 'primereact/badge';
import { Dialog } from 'primereact/dialog';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import SystemStats from '../../components/SystemStats';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [activeRequestSubTab, setActiveRequestSubTab] = useState('maintenance');

  const dispatch = useDispatch();
  const users = useSelector(state => state.users.data);

  const [promotions, setPromotions] = useState([]);
  const [reports, setReports] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [requests, setRequests] = useState([]);

  // Promotion Form State
  const [promoCode, setPromoCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(null);
  const [validTill, setValidTill] = useState(null);

  // Request Resolution Modal
  const [resolveDialogVisible, setResolveDialogVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [newPassword, setNewPassword] = useState('');

  const toast = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'ADMIN') {
      navigate(role === 'AGENT' ? '/agent' : '/');
      return;
    }
    dispatch(fetchUsers());
    fetchPromotions();
    fetchReports();
    fetchVehicles();
    fetchRequests();
  }, []);

  // Removed local fetchUsers, using Redux


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

  const fetchRequests = async () => {
    try {
      const res = await adminService.getRequests();
      setRequests(res.data || []);
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
      dispatch(fetchUsers());
    } catch (e) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to update user status.' });
      console.error(e);
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
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Promotion added successfully.' });
    } catch (e) {
      console.error(e);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to add promotion.' });
    }
  };

  const handleSetActiveBanner = async (promoId) => {
    try {
      await adminService.setActiveBanner(promoId);
      fetchPromotions();
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Active banner updated.' });
    } catch (e) {
      console.error(e);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to update active banner.' });
    }
  };

  const deleteVehicle = async (id) => {
    try {
      await vehicleService.deleteVehicle(id);
      fetchVehicles();
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Vehicle deleted.' });
    } catch (e) {
      console.error(e);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete vehicle.' });
    }
  };

  const handleResolvePassword = async () => {
    if (!newPassword) return;
    try {
      await adminService.resolvePasswordRequest(selectedRequest.id, newPassword);
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Password resolved successfully.' });
      setResolveDialogVisible(false);
      setNewPassword('');
      fetchRequests();
    } catch (e) {
      console.error(e);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to resolve password request.' });
    }
  };

  const handleAddForMaintenance = async (reqId) => {
    try {
      await adminService.resolveMaintenanceRequest(reqId);
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Vehicle added for maintenance.' });
      fetchRequests();
      fetchVehicles(); // Refresh vehicles to update the "under maintenance" list
    } catch (e) {
      console.error(e);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to process maintenance request.' });
    }
  };

  const handleFinishMaintenance = async (vehicleId) => {
    try {
      await vehicleService.finishMaintenance(vehicleId);
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Vehicle marked as available.' });
      fetchVehicles();
    } catch (e) {
      console.error(e);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to update vehicle status.' });
    }
  };

  const handleAddAgent = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      mobile: formData.get('mobile'),
    };
    try {
      await adminService.createAgent(data);
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Agent created successfully.' });
      e.target.reset();
    } catch (err) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to create agent.' });
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
        className={`p-button-sm ${rowData.active ? 'btn btn-warning' : 'btn btn-info'}`}
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

  const promoActionTemplate = (rowData) => {
    return (
      <Button
        label={rowData.isBannerActive ? "Active Banner" : "Set Active"}
        icon={rowData.isBannerActive ? "pi pi-check" : "pi pi-star"}
        className={`p-button-sm ${rowData.isBannerActive ? 'p-button-success' : 'p-button-primary'}`}
        onClick={() => handleSetActiveBanner(rowData.promotionId)}
        disabled={rowData.isBannerActive}
      />
    );
  };

  const maintenanceRequests = requests.filter(r => r.requestType === 'MAINTENANCE');
  const passwordRequests = requests.filter(r => r.requestType === 'PASSWORD_RESET');
  const pendingCount = requests.length;

  const vehiclesUnderMaintenance = vehicles.filter(v => v.availabilityStatus === 'MAINTENANCE');

  return (
    <div className="container-fluid mt-5 mb-5 px-4 flex-grow-1">
      <Toast ref={toast} />
      <h2 className="mb-4 text-primary">Admin Dashboard</h2>

      <div className="row">
        {/* Vertical Sidebar */}
        <div className="col-md-3 col-lg-2 mb-4">
          <div className="list-group shadow-sm bg-dark">
            <button className={`list-group-item list-group-item-action border-0 py-3 ${activeTab === 'users' ? 'active bg-warning text-dark' : 'bg-dark text-white'}`} onClick={() => setActiveTab('users')}>
              <i className="pi pi-users me-2"></i> Users
            </button>
            <button className={`list-group-item list-group-item-action border-0 py-3 ${activeTab === 'promotions' ? 'active bg-warning text-dark' : 'bg-dark text-white'}`} onClick={() => setActiveTab('promotions')}>
              <i className="pi pi-tags me-2"></i> Promotions
            </button>
            <button className={`list-group-item list-group-item-action border-0 py-3 ${activeTab === 'reports' ? 'active bg-warning text-dark' : 'bg-dark text-white'}`} onClick={() => setActiveTab('reports')}>
              <i className="pi pi-chart-bar me-2"></i> Reports
            </button>
            <button className={`list-group-item list-group-item-action border-0 py-3 ${activeTab === 'fleet' ? 'active bg-warning text-dark' : 'bg-dark text-white'}`} onClick={() => setActiveTab('fleet')}>
              <i className="pi pi-car me-2"></i> Fleet Management
            </button>
            <button className={`list-group-item list-group-item-action border-0 py-3 d-flex justify-content-between align-items-center ${activeTab === 'requests' ? 'active bg-warning text-dark' : 'bg-dark text-white'}`} onClick={() => setActiveTab('requests')}>
              <span><i className="pi pi-bell me-2"></i> Requests</span>
              {pendingCount > 0 && <Badge value={pendingCount} severity="danger" className="ms-2"></Badge>}
            </button>
            <button className={`list-group-item list-group-item-action border-0 py-3 ${activeTab === 'add-agent' ? 'active bg-warning text-dark' : 'bg-dark text-white'}`} onClick={() => setActiveTab('add-agent')}>
              <i className="pi pi-user-plus me-2"></i> Add Agent
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="col-md-9 col-lg-10">
          {activeTab === 'users' && (
            <div className="card shadow-sm border-0 p-3">
              <h4 className="mb-3">Users Management</h4>
              <DataTable value={users} paginator rows={10} className="p-datatable-sm shadow-sm bg-dark text-white">
                <Column field="id" header="ID" sortable></Column>
                <Column field="username" header="Username" sortable></Column>
                <Column field="role" header="Role" sortable></Column>
                <Column header="Status" body={statusTemplate}></Column>
                <Column header="Actions" body={actionTemplate}></Column>
              </DataTable>
            </div>
          )}

          {activeTab === 'promotions' && (
            <div className="card shadow-sm border-0 p-3">
              <h4 className="mb-3">Promotions</h4>
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
              <DataTable value={promotions} paginator rows={10} className="p-datatable-sm shadow-sm">
                <Column field="promotionId" header="ID"></Column>
                <Column field="promoCode" header="Promo Code"></Column>
                <Column field="discountPercentage" header="Discount %"></Column>
                <Column field="validTill" header="Valid Till"></Column>
                <Column header="Actions" body={promoActionTemplate}></Column>
              </DataTable>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="card shadow-sm border-0 p-3">
              <h4 className="mb-3">System Reports</h4>
              {reports ? (
                <SystemStats reports={reports} vehicles={vehicles} />
              ) : (
                <p>Loading reports...</p>
              )}
            </div>
          )}

          {activeTab === 'fleet' && (
            <div className="card shadow-sm border-0 p-3">
              <h4 className="mb-3">Fleet Management</h4>
              <DataTable value={vehicles} paginator rows={10} className="p-datatable-sm shadow-sm">
                <Column field="vehicleId" header="ID" sortable></Column>
                <Column field="brandName" header="Brand" sortable></Column>
                <Column field="model" header="Model" sortable></Column>
                <Column field="vehicleType" header="Type" sortable></Column>
                <Column field="pricingPerDay" header="Price/Day" sortable></Column>
                <Column header="Actions" body={vehicleActionTemplate}></Column>
              </DataTable>
            </div>
          )}

          {activeTab === 'requests' && (
            <div className="card shadow-sm border-0 p-3">
              <h4 className="mb-4">Pending Requests</h4>
              <ul className="nav nav-pills mb-4">
                <li className="nav-item">
                  <button
                    className={`nav-link rounded-pill px-4 ${activeRequestSubTab === 'maintenance' ? 'bg-primary text-white shadow-sm' : 'text-primary'}`}
                    style={{ fontWeight: '600' }}
                    onClick={() => setActiveRequestSubTab('maintenance')}
                  >
                    <i className="pi pi-wrench me-2"></i>Maintenance
                  </button>
                </li>
                <li className="nav-item ms-3">
                  <button
                    className={`nav-link rounded-pill px-4 ${activeRequestSubTab === 'customer' ? 'bg-warning text-dark shadow-sm' : 'text-warning'}`}
                    style={{ fontWeight: '600' }}
                    onClick={() => setActiveRequestSubTab('customer')}
                  >
                    <i className="pi pi-user me-2"></i>Customer
                  </button>
                </li>
              </ul>

              {activeRequestSubTab === 'maintenance' && (
                <div>
                  <DataTable value={requests.filter(r => r.requestType === 'MAINTENANCE')} paginator rows={10} className="p-datatable-sm shadow-sm mt-3" emptyMessage="No maintenance requests pending.">
                    <Column field="id" header="Req ID"></Column>
                    <Column field="requestedByEmail" header="Agent Email"></Column>
                    <Column field="vehicleId" header="Vehicle ID"></Column>
                    <Column field="vehicleModel" header="Model"></Column>
                    <Column field="description" header="Particulars"></Column>
                    <Column field="daysSinceLastService" header="Days Since Last Service"></Column>
                    <Column header="Actions" body={(rowData) => <Button label="Add for maintenance" className="p-button-sm p-button-info" icon="pi pi-cog" onClick={() => handleAddForMaintenance(rowData.id)} />} />
                  </DataTable>

                  <div className="mt-5">
                    <h5 className="mb-3">Vehicles Currently Under Maintenance</h5>
                    <DataTable value={vehiclesUnderMaintenance} paginator rows={10} className="p-datatable-sm shadow-sm" emptyMessage="No vehicles currently under maintenance.">
                      <Column field="vehicleId" header="Vehicle ID"></Column>
                      <Column field="brandName" header="Brand"></Column>
                      <Column field="model" header="Model"></Column>
                      <Column field="location" header="Location"></Column>
                      <Column header="Actions" body={(rowData) => <Button label="Mark Available" className="p-button-sm btn btn-warning text-dark font-bold" onClick={() => handleFinishMaintenance(rowData.vehicleId)} />} />
                    </DataTable>
                  </div>
                </div>
              )}

              {activeRequestSubTab === 'customer' && (
                <div>
                  <DataTable value={passwordRequests} paginator rows={10} className="p-datatable-sm shadow-sm" emptyMessage="No pending password reset requests">
                    <Column field="id" header="Req ID"></Column>
                    <Column field="requestedByEmail" header="User Email"></Column>
                    <Column field="requestedByRole" header="Role"></Column>
                    <Column body={(rowData) => <Button label="Resolve" className="p-button-sm p-button-warning text-dark font-bold" icon="pi pi-key" onClick={() => { setSelectedRequest(rowData); setResolveDialogVisible(true); }} />} header="Action"></Column>
                  </DataTable>
                </div>
              )}
            </div>
          )}

          {activeTab === 'add-agent' && (
            <div className="card shadow-sm border-0 p-3">
              <h4 className="mb-4">Add Rental Agent</h4>
              <form onSubmit={handleAddAgent} className="row g-3">
                <div className="col-md-6 offset-md-3">
                  <div className="mb-3">
                    <InputText name="name" placeholder="Full Name" className="w-100" required />
                  </div>
                  <div className="mb-3">
                    <InputText name="email" type="email" placeholder="Email" className="w-100" required />
                  </div>
                  <div className="mb-3">
                    <InputText name="password" type="text" placeholder="Password" className="w-100" required />
                  </div>
                  <div className="mb-3">
                    <InputText name="mobile" type="tel" placeholder="Mobile Number" className="w-100" required />
                  </div>
                  <div className="mb-3 text-center">
                    <Button type="submit" label="Create Agent" icon="pi pi-user-plus" className="p-button-primary w-100 py-3" />
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      <Dialog header="Resolve Password Reset" visible={resolveDialogVisible} style={{ width: '50vw', maxWidth: '400px' }} onHide={() => setResolveDialogVisible(false)}>
        {selectedRequest && (
          <div className="pt-2">
            <p className="mb-2"><strong>User:</strong> {selectedRequest.requestedByEmail}</p>
            <p className="mb-4"><strong>Role:</strong> {selectedRequest.requestedByRole}</p>
            <div className="mb-4">
              <label className="form-label font-bold text-secondary">New Password</label>
              <Password
                className="w-100"
                inputClassName="w-100"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                toggleMask
                feedback={false}
              />
            </div>
            <div className="text-end mt-4">
              <Button label="Cancel" icon="pi pi-times" onClick={() => setResolveDialogVisible(false)} className="p-button-text" />
              <Button label="Save Password" icon="pi pi-check" onClick={handleResolvePassword} className="p-button-success" autoFocus />
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
