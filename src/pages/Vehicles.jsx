import { useState, useEffect } from 'react';
import { vehicleService, brandService } from '../services/api';
import { DataView } from 'primereact/dataview';
import { Tag } from 'primereact/tag';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVehicles } from '../store/vehicleSlice';
import HoverCarousel from '../components/HoverCarousel';

const VehicleCard = ({ vehicle, onRentNow }) => {
  const [isHovered, setIsHovered] = useState(false);
  const images = vehicle.imageUrl ? vehicle.imageUrl.split(',').map(s => s.trim()).filter(s => s.length > 0) : [];

  return (
    <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
      <div className="p-4 border-1 surface-border surface-card border-round shadow-sm h-100 transition-all bg-dark text-light industrial-shadow">
        <div className="d-flex flex-column align-items-center gap-3 py-3" style={{ minHeight: '220px' }}>
          {images.length > 0 ? (
            <div style={{ width: '100%', height: '150px', borderRadius: '8px', overflow: 'hidden' }}>
              <HoverCarousel images={images} altText={`${vehicle.brandName} ${vehicle.model}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ) : (
            <i className="pi pi-car text-primary" style={{ fontSize: '3rem', height: '150px', display: 'flex', alignItems: 'center' }}></i>
          )}
          <div className="text-2xl font-bold text-center mt-2 text-primary">{vehicle.brandName} {vehicle.model}</div>
          <div className="text-light">{vehicle.vehicleType} {vehicle.subType ? `- ${vehicle.subType}` : ''}</div>
          <Tag value={vehicle.availabilityStatus} severity={vehicle.availabilityStatus === 'AVAILABLE' ? 'success' : vehicle.availabilityStatus === 'MAINTENANCE' ? 'warning' : 'danger'}></Tag>
        </div>
        <div className="d-flex align-items-center justify-content-between mt-3 w-100 px-3">
          <span className="text-xl font-semibold text-white">Rs.{vehicle.pricingPerDay}/day</span>
          <button className="btn btn-primary btn-sm rounded-pill fw-bold" onClick={() => onRentNow(vehicle.vehicleId)} disabled={vehicle.availabilityStatus !== 'AVAILABLE'}>Rent Now</button>
        </div>
      </div>
    </div>
  );
};

const Vehicles = () => {
  const dispatch = useDispatch();
  const vehicles = useSelector(state => state.vehicles.data);
  const loading = useSelector(state => state.vehicles.loading);
  const error = useSelector(state => state.vehicles.error);
  const [brands, setBrands] = useState([]);

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
    ? [{ label: 'EV', value: 'EV' }, { label: 'Petrol', value: 'Petrol' }, { label: 'Diesel', value: 'Diesel' }]
    : vehicleType === '2 Wheeler'
      ? [{ label: 'Bike', value: 'Bike' }, { label: 'Scooty', value: 'Scooty' }]
      : [];

  useEffect(() => {
    loadVehicles();
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await brandService.getAllBrands();
      const brandOptions = response.data.map(brand => ({ label: brand.brandName, value: brand.brandName }));
      setBrands(brandOptions);
    } catch (err) {
      console.error('Failed to fetch brands', err);
    }
  };

  const loadVehicles = () => {
    dispatch(fetchVehicles({
      model: null,
      maxPrice: null,
      brandName: brandName || null,
      location: null,
      startDate: startDate ? startDate.toISOString() : null,
      endDate: endDate ? endDate.toISOString() : null,
      vehicleType: vehicleType || null,
      subType: subType || null,
      page: 0,
      size: 100
    }));
  };

  const handleSearch = () => {
    loadVehicles();
  };

  const handleRentNow = (vehicleId) => {
    navigate(`/checkout/${vehicleId}`, { state: { startDate: startDate?.toISOString(), endDate: endDate?.toISOString() } });
  };

  const itemTemplate = (vehicle) => {
    return <VehicleCard key={vehicle.vehicleId} vehicle={vehicle} onRentNow={handleRentNow} />;
  };

  return (
    <div className="container mt-5 mb-5 text-light">
      <h2 className="mb-4 text-primary text-uppercase" style={{ letterSpacing: '1px' }}>Available Vehicles</h2>

      <div className="card p-3 mb-4 border-0 industrial-shadow bg-dark">
        <div className="row g-3">
          <div className="col-md-3">
            <Calendar value={startDate} onChange={(e) => setStartDate(e.value)} placeholder="Pickup Date & Time" showTime hourFormat="24" className="w-100" />
          </div>
          <div className="col-md-3">
            <Calendar value={endDate} onChange={(e) => setEndDate(e.value)} placeholder="Dropoff Date & Time" showTime hourFormat="24" className="w-100" />
          </div>
          <div className="col-md-2">
            <Dropdown value={brandName} options={brands} onChange={(e) => setBrandName(e.value)} placeholder="Brand" className="w-100" showClear />
          </div>
          <div className="col-md-2">
            <Dropdown value={vehicleType} options={typeOptions} onChange={(e) => { setVehicleType(e.value); setSubType(null); }} placeholder="Type" className="w-100" showClear />
          </div>
          <div className="col-md-2">
            <Dropdown value={subType} options={subTypeOptions} onChange={(e) => setSubType(e.value)} placeholder="Subtype" className="w-100" showClear disabled={!vehicleType} />
          </div>
          <div className="col-12 text-end">
            <Button label="Search" icon="pi pi-search" onClick={handleSearch} className="p-button-primary fw-bold px-4" />
          </div>
        </div>
      </div>

      {error && <div className="alert alert-danger">{typeof error === 'string' ? error : 'Failed to load vehicles'}</div>}
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="border-0">
          <DataView value={vehicles} itemTemplate={itemTemplate} layout="grid" emptyMessage="No vehicles found." />
        </div>
      )}
    </div>
  );
};

export default Vehicles;
