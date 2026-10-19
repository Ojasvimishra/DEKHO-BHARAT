import { useCallback, useEffect, useState } from 'react';
import { Check, Pencil, RefreshCw, Trash2, X } from 'lucide-react';
import './booking-manager.css';

const API = '/api';

const authHeaders = () => {
  const headers = { 'Content-Type': 'application/json' };
  const token = localStorage.getItem('db_access_token');
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

const money = (amount) => new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
}).format(amount || 0);

const BookingManager = ({ email }) => {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState(null);
  const [editingVoucher, setEditingVoucher] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const query = email ? `?email=${encodeURIComponent(email)}` : '';
      const [bookingResponse, statsResponse] = await Promise.all([
        fetch(`${API}/bookings/list${query}`, { headers: authHeaders() }),
        fetch(`${API}/stats`, { headers: authHeaders() })
      ]);
      if (!bookingResponse.ok || !statsResponse.ok) throw new Error('Could not load booking data from the API.');
      const [bookingData, statsData] = await Promise.all([bookingResponse.json(), statsResponse.json()]);
      setBookings(bookingData);
      setStats(statsData);
    } catch (loadError) {
      setError(loadError.message || 'Could not load booking data.');
    } finally {
      setLoading(false);
    }
  }, [email]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const beginEdit = (booking) => {
    setEditingVoucher(booking.voucherId);
    setEditValues({
      userName: booking.userName,
      userPhone: booking.userPhone,
      city: booking.city,
      activity: booking.activity,
      price: booking.price,
      guideName: booking.guideName || ''
    });
  };

  const saveEdit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API}/bookings/${encodeURIComponent(editingVoucher)}`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify(editValues)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || Object.values(data.errors || {}).flat().join(' '));
      setEditingVoucher(null);
      await loadData();
    } catch (saveError) {
      setError(saveError.message || 'Booking update failed.');
    }
  };

  const removeBooking = async (voucherId) => {
    if (!window.confirm(`Cancel booking ${voucherId}?`)) return;
    try {
      const response = await fetch(`${API}/bookings/${encodeURIComponent(voucherId)}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Booking deletion failed.');
      await loadData();
    } catch (removeError) {
      setError(removeError.message || 'Booking deletion failed.');
    }
  };

  return (
    <section className="booking-manager" aria-labelledby="booking-manager-title">
      <header className="booking-manager__header">
        <div>
          <p className="booking-manager__eyebrow">MONGODB / PYMONGO</p>
          <h2 id="booking-manager-title">Booking records</h2>
        </div>
        <button className="booking-manager__refresh" type="button" onClick={loadData} disabled={loading} title="Refresh records and analytics">
          <RefreshCw size={16} /> <span>Refresh</span>
        </button>
      </header>

      {error && <p className="booking-manager__error" role="alert">{error}</p>}

      <div className="booking-manager__metrics">
        <div><span>Total bookings</span><strong>{stats?.totalBookings ?? '--'}</strong></div>
        <div><span>Registered users</span><strong>{stats?.totalUsers ?? '--'}</strong></div>
        <div><span>Booking value</span><strong>{stats ? money(stats.totalRevenue) : '--'}</strong></div>
      </div>

      <div className="booking-manager__analytics">
        <div className="booking-manager__aggregate">
          <h3>Top destinations</h3>
          {stats?.topCities?.length ? stats.topCities.map((item) => (
            <div className="booking-manager__rank" key={item.city}>
              <span>{item.city}</span><small>{item.count} bookings · {money(item.revenue)}</small>
            </div>
          )) : <p className="booking-manager__empty">No destination totals yet.</p>}
        </div>
        <div className="booking-manager__aggregate">
          <h3>Popular activities</h3>
          {stats?.topActivities?.length ? stats.topActivities.map((item) => (
            <div className="booking-manager__rank" key={item.activity}>
              <span>{item.activity}</span><small>{item.count} bookings · {money(item.revenue)}</small>
            </div>
          )) : <p className="booking-manager__empty">No activity totals yet.</p>}
        </div>
      </div>

      <div className="booking-manager__table-wrap">
        <table className="booking-manager__table">
          <thead><tr><th>Voucher / traveler</th><th>Destination / activity</th><th>Price</th><th>Booked</th><th><span className="sr-only">Actions</span></th></tr></thead>
          <tbody>
            {loading ? <tr><td colSpan="5" className="booking-manager__empty">Loading records…</td></tr> : bookings.length === 0 ? (
              <tr><td colSpan="5" className="booking-manager__empty">No bookings found for this account.</td></tr>
            ) : bookings.map((booking) => (
              <tr key={booking.voucherId}>
                {editingVoucher === booking.voucherId ? (
                  <td colSpan="5">
                    <form className="booking-manager__edit-form" onSubmit={saveEdit}>
                      {[
                        ['userName', 'Traveler'], ['userPhone', 'Phone'], ['city', 'Destination'],
                        ['activity', 'Activity'], ['price', 'Price'], ['guideName', 'Guide']
                      ].map(([field, label]) => (
                        <label key={field}>{label}
                          <input required={field !== 'guideName'} value={editValues[field] || ''} onChange={(event) => setEditValues({ ...editValues, [field]: event.target.value })} />
                        </label>
                      ))}
                      <div className="booking-manager__actions">
                        <button type="submit" title="Save changes" aria-label="Save changes"><Check size={16} /></button>
                        <button type="button" title="Discard changes" aria-label="Discard changes" onClick={() => setEditingVoucher(null)}><X size={16} /></button>
                      </div>
                    </form>
                  </td>
                ) : (
                  <>
                    <td><strong>{booking.voucherId}</strong><span>{booking.userName}</span></td>
                    <td><strong>{booking.city}</strong><span>{booking.activity}</span></td>
                    <td>{booking.price}</td>
                    <td>{booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : '—'}</td>
                    <td className="booking-manager__actions">
                      <button type="button" title="Edit booking" aria-label={`Edit ${booking.voucherId}`} onClick={() => beginEdit(booking)}><Pencil size={15} /></button>
                      <button type="button" title="Delete booking" aria-label={`Delete ${booking.voucherId}`} onClick={() => removeBooking(booking.voucherId)}><Trash2 size={15} /></button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="booking-manager__footnote">MongoDB aggregation groups booking volume and value by destination and activity.</p>
    </section>
  );
};

export default BookingManager;