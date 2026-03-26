import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVehicleById, createReservation } from '../services/api';
import Footer from '../components/Footer';

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  const [formData, setFormData] = useState({
    pickupDate: '',
    dropoffDate: '',
    pickupLocation: '',
    dropoffLocation: '',
  });

  useEffect(() => {
    fetchVehicle();
  }, [id]);

  useEffect(() => {
    calculatePrice();
  }, [formData.pickupDate, formData.dropoffDate, vehicle]);

  const fetchVehicle = async () => {
    try {
      const response = await getVehicleById(id);
      setVehicle(response.data);
    } catch (err) {
      setError('Vehicle not found');
    } finally {
      setLoading(false);
    }
  };

  const calculatePrice = () => {
    if (formData.pickupDate && formData.dropoffDate && vehicle) {
      const start = new Date(formData.pickupDate);
      const end = new Date(formData.dropoffDate);
      const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
      setTotalPrice(days * vehicle.pricePerDay);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const reservation = {
        userId: user.id,
        vehicleId: parseInt(id),
        pickupDate: formData.pickupDate + ':00',
        dropoffDate: formData.dropoffDate + ':00',
        pickupLocation: formData.pickupLocation,
        dropoffLocation: formData.dropoffLocation,
      };
      const response = await createReservation(reservation);
      setSuccess('Booking successful! Redirecting to payment...');
      setTimeout(() => {
        navigate(`/payment/${response.data.id}`);
      }, 2000);
    } catch (err) {
      setError(err.response?.data || 'Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-orange-500
        border-t-transparent rounded-full animate-spin"/>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-gray-950 px-4 py-10">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <h1 className="text-3xl font-bold text-white mb-8">
            Book a <span className="text-orange-500">Vehicle</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Vehicle Card */}
            <div className="bg-gray-900 rounded-2xl overflow-hidden
              border border-gray-800">
              <div className="h-56 bg-gray-800 overflow-hidden">
                {vehicle?.imageUrl ? (
                  <img
                    src={vehicle.imageUrl}
                    alt={vehicle.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center
                    justify-center text-6xl">
                    
                  </div>
                )}
              </div>
              <div className="p-6">
                <h2 className="text-white text-xl font-bold">
                  {vehicle?.name || vehicle?.category}
                </h2>
                <p className="text-gray-400 mt-1">
                  {vehicle?.brand} • {vehicle?.year}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  📍 {vehicle?.location}
                </p>
                <div className="flex gap-4 mt-3 text-sm text-gray-400">
                  <span>⛽ {vehicle?.fuelType}</span>
                  <span>💺 {vehicle?.numberOfSeats} seats</span>
                  <span>🏷️ {vehicle?.category}</span>
                </div>
                <div className="mt-4 p-4 bg-gray-800 rounded-xl">
                  <p className="text-gray-400 text-sm">Price per day</p>
                  <p className="text-orange-500 text-2xl font-bold">
                    {vehicle?.pricePerDay?.toLocaleString()} FCFA
                  </p>
                </div>
                {totalPrice > 0 && (
                  <div className="mt-3 p-4 bg-orange-500/10
                    border border-orange-500 rounded-xl">
                    <p className="text-gray-400 text-sm">Total Price</p>
                    <p className="text-orange-500 text-2xl font-bold">
                      {totalPrice?.toLocaleString()} FCFA
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-gray-900 rounded-2xl p-6
              border border-gray-800">
              <h3 className="text-white font-bold text-lg mb-6">
                Booking Details
              </h3>

              {error && (
                <div className="bg-red-500/10 border border-red-500
                  text-red-400 rounded-lg p-3 mb-4 text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-500/10 border border-green-500
                  text-green-400 rounded-lg p-3 mb-4 text-sm">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Pickup Date */}
                <div>
                  <label className="text-gray-400 text-sm mb-1 block">
                    Pickup Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().slice(0, 16)}
                    className="w-full bg-gray-800 text-white rounded-lg
                      px-4 py-3 border border-gray-700 focus:outline-none
                      focus:border-orange-500"
                  />
                </div>

                {/* Dropoff Date */}
                <div>
                  <label className="text-gray-400 text-sm mb-1 block">
                    Return Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    name="dropoffDate"
                    value={formData.dropoffDate}
                    onChange={handleChange}
                    required
                    min={formData.pickupDate}
                    className="w-full bg-gray-800 text-white rounded-lg
                      px-4 py-3 border border-gray-700 focus:outline-none
                      focus:border-orange-500"
                  />
                </div>

                {/* Pickup Location */}
                <div>
                  <label className="text-gray-400 text-sm mb-1 block">
                    Pickup Location
                  </label>
                  <input
                    type="text"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Centre Ville Bertoua"
                    className="w-full bg-gray-800 text-white rounded-lg
                      px-4 py-3 border border-gray-700 focus:outline-none
                      focus:border-orange-500"
                  />
                </div>

                {/* Dropoff Location */}
                <div>
                  <label className="text-gray-400 text-sm mb-1 block">
                    Drop-off Location
                  </label>
                  <input
                    type="text"
                    name="dropoffLocation"
                    value={formData.dropoffLocation}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Aéroport Bertoua"
                    className="w-full bg-gray-800 text-white rounded-lg
                      px-4 py-3 border border-gray-700 focus:outline-none
                      focus:border-orange-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-orange-500 hover:bg-orange-600
                    text-white font-semibold py-3 rounded-lg
                    transition duration-200 mt-2">
                  {submitting ? 'Processing...' : 'Confirm Booking →'}
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/vehicles')}
                  className="w-full bg-gray-800 hover:bg-gray-700
                    text-gray-300 font-semibold py-3 rounded-lg
                    transition duration-200">
                  ← Back to Vehicles
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}