import { useState, useEffect } from 'react';
import { reservationService } from '../../services/api';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import ResponsiveStarRating from '../../components/ResponsiveStarRating';
import api from '../../services/api';

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [showModifyDialog, setShowModifyDialog] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [modifyData, setModifyData] = useState({
    pickupTime: '',
    dropoffTime: '',
    optionalExtras: ''
  });

  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 5, comments: '' });

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const res = await reservationService.getMyReservations({ page: 0, size: 50 });
      setReservations(res.data.content || []);
    } catch (err) {
      setError('Failed to fetch reservations.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this reservation?')) return;
    try {
      await reservationService.cancelReservation(id);
      alert('Reservation cancelled successfully.');
      fetchReservations();
    } catch (err) {
      alert('Failed to cancel: ' + (err.response?.data?.message || err.message));
    }
  };

  const formatDateTime = (dtStr) => dtStr ? dtStr.substring(0, 16) : '';

  const openModifyDialog = (reservation) => {
    setSelectedReservation(reservation);
    setModifyData({
      pickupTime: formatDateTime(reservation.pickupTime),
      dropoffTime: formatDateTime(reservation.dropoffTime),
      optionalExtras: reservation.optionalExtras || ''
    });
    setShowModifyDialog(true);
  };

  const handleModifySubmit = async () => {
    try {
      await reservationService.modifyReservation(selectedReservation.reservationId, {
        customerId: selectedReservation.customerId,
        vehicleId: selectedReservation.vehicleId,
        pickupTime: modifyData.pickupTime,
        dropoffTime: modifyData.dropoffTime,
        optionalExtras: modifyData.optionalExtras
      });
      alert('Reservation modified successfully.');
      setShowModifyDialog(false);
      fetchReservations();
    } catch (err) {
      alert('Failed to modify: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleReviewSubmit = async () => {
    try {
      await api.post('/reviews', {
        reservationId: selectedReservation.reservationId,
        rating: reviewData.rating,
        comments: reviewData.comments
      });
      alert('Review submitted successfully.');
      setShowReviewDialog(false);
    } catch (err) {
      alert('Failed to submit review.');
    }
  };

  const isActive = (status) => ['PENDING', 'CONFIRMED', 'ACTIVE'].includes(status);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div></div>;

  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4">My Reservations</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      
      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <div className="row">
          {reservations.map(res => (
            <div className="col-md-6 mb-4" key={res.reservationId}>
              <Card title={`Reservation #${res.reservationId}`} subTitle={`Status: ${res.bookingStatus}`} className="shadow-sm border-0">
                <div className="mb-3">
                  <p className="mb-1"><strong>Vehicle ID:</strong> {res.vehicleId}</p>
                  <p className="mb-1"><strong>Pickup:</strong> {new Date(res.pickupTime).toLocaleString()}</p>
                  <p className="mb-1"><strong>Dropoff:</strong> {new Date(res.dropoffTime).toLocaleString()}</p>
                  {res.optionalExtras && <p className="mb-1"><strong>Extras:</strong> {res.optionalExtras}</p>}
                </div>
                
                {isActive(res.bookingStatus) && (
                  <div className="d-flex justify-content-end gap-2 border-top pt-3">
                    <Button label="Modify" icon="pi pi-pencil" className="p-button-sm p-button-outlined p-button-info" onClick={() => openModifyDialog(res)} />
                    <Button label="Cancel" icon="pi pi-times" className="p-button-sm p-button-outlined p-button-danger" onClick={() => handleCancel(res.reservationId)} />
                  </div>
                )}
                {res.bookingStatus === 'COMPLETED' && (
                  <div className="d-flex justify-content-end gap-2 border-top pt-3">
                    <Button label="Leave a Review" icon="pi pi-star" className="p-button-sm p-button-success p-button-outlined" onClick={() => { setSelectedReservation(res); setReviewData({rating: 5, comments: ''}); setShowReviewDialog(true); }} />
                  </div>
                )}
              </Card>
            </div>
          ))}
        </div>
      )}

      <Dialog header="Modify Reservation" visible={showModifyDialog} style={{ width: '50vw', minWidth: '300px' }} onHide={() => setShowModifyDialog(false)}>
        <div className="mb-3">
          <label className="form-label font-bold">Pickup Time</label>
          <input 
            type="datetime-local" 
            className="form-control" 
            value={modifyData.pickupTime} 
            onChange={(e) => setModifyData({...modifyData, pickupTime: e.target.value})} 
          />
        </div>
        <div className="mb-3">
          <label className="form-label font-bold">Dropoff Time</label>
          <input 
            type="datetime-local" 
            className="form-control" 
            value={modifyData.dropoffTime} 
            onChange={(e) => setModifyData({...modifyData, dropoffTime: e.target.value})} 
          />
        </div>
        <div className="mb-3">
          <label className="form-label font-bold">Optional Extras</label>
          <InputTextarea 
            value={modifyData.optionalExtras} 
            onChange={(e) => setModifyData({...modifyData, optionalExtras: e.target.value})} 
            rows={3} 
            className="w-100" 
            placeholder="E.g., Baby seat, GPS, etc."
          />
        </div>
        <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
          <Button label="Cancel" onClick={() => setShowModifyDialog(false)} className="p-button-text p-button-secondary" />
          <Button label="Save Changes" onClick={handleModifySubmit} className="p-button-primary" />
        </div>
      </Dialog>

      <Dialog header="Leave a Review" visible={showReviewDialog} style={{ width: '40vw', minWidth: '300px' }} onHide={() => setShowReviewDialog(false)}>
        <div className="mb-3 d-flex justify-content-center">
          <ResponsiveStarRating 
            rating={reviewData.rating} 
            maxStars={5} 
            readOnly={false} 
            onChange={(val) => setReviewData({...reviewData, rating: val})} 
          />
        </div>
        <div className="mb-3">
          <label className="form-label font-bold">Comments</label>
          <InputTextarea 
            value={reviewData.comments} 
            onChange={(e) => setReviewData({...reviewData, comments: e.target.value})} 
            rows={4} 
            className="w-100" 
            placeholder="Tell us about your experience..."
          />
        </div>
        <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
          <Button label="Cancel" onClick={() => setShowReviewDialog(false)} className="p-button-text p-button-secondary" />
          <Button label="Submit Review" onClick={handleReviewSubmit} className="p-button-success" />
        </div>
      </Dialog>
    </div>
  );
};

export default MyReservations;
