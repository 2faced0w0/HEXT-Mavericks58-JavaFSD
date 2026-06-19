import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { vehicleService, reservationService, promotionService } from '../../services/api';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

const ReservationCheckout = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [startDate] = useState(location.state?.startDate || null);
  const [endDate] = useState(location.state?.endDate || null);
  const [optionalExtras, setOptionalExtras] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [promoValid, setPromoValid] = useState(false);

  // Price calculations
  const pickup = new Date(startDate);
  const dropoff = new Date(endDate);
  const days = Math.max(1, Math.ceil((dropoff - pickup) / (1000 * 60 * 60 * 24)));
  const basePrice = vehicle ? vehicle.pricingPerDay * days : 0;
  const discountAmount = (basePrice * discountPercent) / 100;
  const finalPrice = basePrice - discountAmount;

  useEffect(() => {
    if (!startDate || !endDate) {
      setError('Please select both pickup and dropoff dates before renting.');
      setLoading(false);
      return;
    }
    fetchVehicleDetails();
  }, [id]);

  const fetchVehicleDetails = async () => {
    try {
      // In a real app we'd have a getVehicleById endpoint. We can mock it by searching for the id or simply showing a generic checkout if not found
      // Since we don't have getVehicleById, we'll search vehicles and find it
      const response = await vehicleService.searchVehicles({ page: 0, size: 100 });
      if (response.data && response.data.content) {
        const found = response.data.content.find(v => v.vehicleId === parseInt(id));
        if (found) {
          setVehicle(found);
        } else {
          setError('Vehicle not found.');
        }
      }
    } catch (err) {
      setError('Failed to fetch vehicle details.');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;
    try {
      const res = await promotionService.validatePromoCode(promoCode);
      setDiscountPercent(res.data.discountPercentage);
      setPromoValid(true);
      setPromoMessage(`Promo code applied! ${res.data.discountPercentage}% off.`);
    } catch (err) {
      setDiscountPercent(0);
      setPromoValid(false);
      setPromoMessage(err.response?.data || 'Invalid promo code');
    }
  };

  const handleCheckout = async () => {
    const customerId = localStorage.getItem('id');
    if (!customerId) {
      alert("Please login as a Customer to make a reservation.");
      navigate('/login');
      return;
    }

    setSubmitting(true);
    try {
      await reservationService.createReservation({
        customerId: parseInt(customerId),
        vehicleId: parseInt(id),
        pickupTime: startDate,
        dropoffTime: endDate,
        optionalExtras: optionalExtras,
        promoCode: promoValid ? promoCode : null
      });
      alert('Reservation successful!');
      navigate('/vehicles');
    } catch (err) {
      alert('Failed to create reservation: ' + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div></div>;

  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4">Checkout Reservation</h2>
      {error ? (
        <div className="alert alert-danger">
          {error}
          <div className="mt-3">
            <Button label="Go Back to Vehicles" onClick={() => navigate('/vehicles')} className="p-button-secondary" />
          </div>
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-md-8">
            <Card title="Reservation Details" className="shadow-sm border-0">
              <div className="mb-4">
                <h4>{vehicle.brandName} {vehicle.model}</h4>
                <p className="text-muted">{vehicle.vehicleType} {vehicle.subType ? `- ${vehicle.subType}` : ''}</p>
                <h5>Price: Rs. {vehicle.pricingPerDay}/day</h5>
              </div>
              <div className="mb-3">
                <strong>Pickup:</strong> {new Date(startDate).toLocaleString()}<br/>
                <strong>Dropoff:</strong> {new Date(endDate).toLocaleString()}
              </div>
              <div className="mb-4">
                <label className="form-label font-bold">Optional Extras</label>
                <InputTextarea 
                  value={optionalExtras} 
                  onChange={(e) => setOptionalExtras(e.target.value)} 
                  rows={3} 
                  className="w-100" 
                  placeholder="E.g., Baby seat, GPS, etc."
                />
              </div>

              <div className="mb-4">
                <label className="form-label font-bold">Promo Code</label>
                <div className="d-flex gap-2">
                  <input 
                    type="text" 
                    className="form-control" 
                    value={promoCode} 
                    onChange={(e) => setPromoCode(e.target.value)} 
                    placeholder="Enter code" 
                    disabled={promoValid}
                  />
                  <Button 
                    label={promoValid ? "Applied" : "Apply"} 
                    onClick={handleApplyPromo} 
                    disabled={promoValid || !promoCode.trim()} 
                    className={`p-button-${promoValid ? 'success' : 'primary'}`} 
                  />
                </div>
                {promoMessage && (
                  <small className={`mt-2 d-block ${promoValid ? 'text-success' : 'text-danger'}`}>
                    {promoMessage}
                  </small>
                )}
              </div>

              <div className="mb-4 p-3 bg-light rounded border">
                <div className="d-flex justify-content-between mb-2">
                  <span>Base Price ({days} day{days > 1 ? 's' : ''}):</span>
                  <span>Rs. {basePrice.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="d-flex justify-content-between mb-2 text-success">
                    <span>Discount ({discountPercent}%):</span>
                    <span>- Rs. {discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <hr />
                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span>Total Final Price:</span>
                  <span className="text-primary">Rs. {finalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <Button label="Cancel" onClick={() => navigate('/vehicles')} className="p-button-text p-button-secondary" />
                <Button label="Confirm Reservation" icon="pi pi-check" onClick={handleCheckout} loading={submitting} className="p-button-success" />
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationCheckout;
