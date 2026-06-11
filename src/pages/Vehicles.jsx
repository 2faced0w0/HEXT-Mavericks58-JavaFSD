import { useState, useEffect } from 'react';
import { vehicleService } from '../services/api';
import { DataView } from 'primereact/dataview';
import { Tag } from 'primereact/tag';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  // Filters
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [brandName, setBrandName] = useState('');
  const [vehicleType, setVehicleType] = useState(null);
  const [subType, setSubType] = useState(null);

  const typeOptions = [
    { label: '4 Wheeler', value: '4 Wheeler' },
    { label: '2 Wheeler', value: '2 Wheeler' }
  ];

  const subTypeOptions = vehicleType === '4 Wheeler' 
    ? [ {label: 'EV', value: 'EV'}, {label: 'Petrol', value: 'Petrol'}, {label: 'Diesel', value: 'Diesel'} ]
    : vehicleType === '2 Wheeler' 
      ? [ {label: 'Bike', value: 'Bike'}, {label: 'Scooty', value: 'Scooty'} ]
      : [];

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const params = { page: 0, size: 20 };
      if (startDate) params.startDate = startDate.toISOString();
      if (endDate) params.endDate = endDate.toISOString();
      if (brandName) params.brandName = brandName;
      if (vehicleType) params.vehicleType = vehicleType;
      if (subType) params.subType = subType;

      const response = await vehicleService.searchVehicles(params);
      if (response.data && response.data.content) {
        setVehicles(response.data.content);
      } else {
        setVehicles([]);
      }
    } catch (err) {
      setError('Failed to fetch vehicles. Ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchVehicles();
  };

  const handleRentNow = (vehicleId) => {
    navigate(`/checkout/${vehicleId}`, { state: { startDate: startDate?.toISOString(), endDate: endDate?.toISOString() } });
  };

  const itemTemplate = (vehicle) => {
    return (
      <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
        <div className="p-4 border-1 surface-border surface-card border-round shadow-sm h-100">
          <div className="d-flex flex-column align-items-center gap-3 py-3">
            <i className="pi pi-car text-primary" style={{ fontSize: '3rem' }}></i>
            <div className="text-2xl font-bold text-center">{vehicle.brandName} {vehicle.model}</div>
            <div className="text-muted">{vehicle.vehicleType} {vehicle.subType ? `- ${vehicle.subType}` : ''}</div>
            <Tag value={vehicle.isAvailable ? 'AVAILABLE' : 'UNAVAILABLE'} severity={vehicle.isAvailable ? 'success' : 'danger'}></Tag>
          </div>
          <div className="d-flex align-items-center justify-content-between mt-3">
            <span className="text-xl font-semibold">${vehicle.pricingPerDay}/day</span>
            <button className="btn btn-primary btn-sm" onClick={() => handleRentNow(vehicle.vehicleId)} disabled={!vehicle.isAvailable}>Rent Now</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4">Available Vehicles</h2>
      
      <div className="card p-3 mb-4 shadow-sm border-0 bg-light">
        <div className="row g-3">
          <div className="col-md-3">
            <Calendar value={startDate} onChange={(e) => setStartDate(e.value)} placeholder="Pickup Date & Time" showTime hourFormat="24" className="w-100" />
          </div>
          <div className="col-md-3">
            <Calendar value={endDate} onChange={(e) => setEndDate(e.value)} placeholder="Dropoff Date & Time" showTime hourFormat="24" className="w-100" />
          </div>
          <div className="col-md-2">
            <InputText value={brandName} onChange={(e) => setBrandName(e.target.value)} placeholder="Brand" className="w-100" />
          </div>
          <div className="col-md-2">
            <Dropdown value={vehicleType} options={typeOptions} onChange={(e) => { setVehicleType(e.value); setSubType(null); }} placeholder="Type" className="w-100" showClear />
          </div>
          <div className="col-md-2">
            <Dropdown value={subType} options={subTypeOptions} onChange={(e) => setSubType(e.value)} placeholder="Subtype" className="w-100" showClear disabled={!vehicleType} />
          </div>
          <div className="col-12 text-end">
            <Button label="Search" icon="pi pi-search" onClick={handleSearch} className="p-button-primary" />
          </div>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="card shadow-sm border-0">
          <DataView value={vehicles} itemTemplate={itemTemplate} layout="grid" emptyMessage="No vehicles found." />
        </div>
      )}
    </div>
  );
};

export default Vehicles;
