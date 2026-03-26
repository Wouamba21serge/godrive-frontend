import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { processPayment } from '../services/api';
import API from '../services/api';
import Footer from '../components/Footer';

export default function PaymentPage() {
  const { reservationId } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    fetchReservation();
  }, [reservationId]);

  const fetchReservation = async () => {
    try {
      const response = await API.get(`/reservations/${reservationId}`);
      setReservation(response.data);
    } catch (err) {
      setError('Reservation not found');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!selectedMethod) {
      setError('Please select a payment method');
      return;
    }
    if (!phoneNumber.trim()) {
      setError('Please enter your phone number');
      return;
    }

    setProcessing(true);
    setError('');

    const user = JSON.parse(localStorage.getItem('user'));

    try {
      await processPayment({
        reservationId: parseInt(reservationId),
        userId: user.id,
        paymentMethod: selectedMethod,
        paymentReference: phoneNumber,
      });
      setSuccess('Payment successful! Your booking is confirmed. 🎉');
      setTimeout(() => navigate('/dashboard'), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Payment failed. Please try again.');
    } finally {
      setProcessing(false);
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
        <div className="max-w-lg mx-auto">

          {/* Header */}
          <h1 className="text-3xl font-bold text-white mb-2">
            Complete <span className="text-orange-500">Payment</span>
          </h1>
          <p className="text-gray-400 mb-8">
            Secure payment for your vehicle booking
          </p>

          {/* Booking Summary */}
          <div className="bg-gray-900 rounded-2xl p-6
            border border-gray-800 mb-6">
            <h3 className="text-white font-bold mb-4">Booking Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Reservation ID</span>
                <span className="text-white font-mono">
                  #{reservation?.id}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Pickup</span>
                <span className="text-white">
                  {new Date(reservation?.pickupDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Return</span>
                <span className="text-white">
                  {new Date(reservation?.dropoffDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Pickup Location</span>
                <span className="text-white">
                  {reservation?.pickupLocation}
                </span>
              </div>
              <div className="border-t border-gray-700 pt-3
                flex justify-between">
                <span className="text-white font-bold">Total Amount</span>
                <span className="text-orange-500 font-bold text-xl">
                  {reservation?.totalPrice?.toLocaleString()} FCFA
                </span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-gray-900 rounded-2xl p-6
            border border-gray-800 mb-6">
            <h3 className="text-white font-bold mb-4">
              Select Payment Method
            </h3>

            <div className="space-y-3">

              {/* MTN Mobile Money */}
              <div
                onClick={() => setSelectedMethod('MOBILE_MONEY_MTN')}
                className={`flex items-center gap-4 p-4 rounded-xl
                  border-2 cursor-pointer transition ${
                  selectedMethod === 'MOBILE_MONEY_MTN'
                    ? 'border-yellow-400 bg-yellow-400/10'
                    : 'border-gray-700 hover:border-gray-600'
                }`}>
                <div className="w-12 h-12 rounded-xl bg-yellow-400
                  flex items-center justify-center text-2xl">
                  📱
                </div>
                <div>
                  <p className="text-white font-bold">MTN Mobile Money</p>
                  <p className="text-gray-400 text-sm">
                    Pay with MTN MoMo
                  </p>
                </div>
                {selectedMethod === 'MOBILE_MONEY_MTN' && (
                  <span className="ml-auto text-yellow-400 text-xl">✓</span>
                )}
              </div>

              {/* Orange Money */}
              <div
                onClick={() => setSelectedMethod('MOBILE_MONEY_ORANGE')}
                className={`flex items-center gap-4 p-4 rounded-xl
                  border-2 cursor-pointer transition ${
                  selectedMethod === 'MOBILE_MONEY_ORANGE'
                    ? 'border-orange-400 bg-orange-400/10'
                    : 'border-gray-700 hover:border-gray-600'
                }`}>
                <div className="w-12 h-12 rounded-xl bg-orange-500
                  flex items-center justify-center text-2xl">
                  💳
                </div>
                <div>
                  <p className="text-white font-bold">Orange Money</p>
                  <p className="text-gray-400 text-sm">
                    Pay with Orange Money
                  </p>
                </div>
                {selectedMethod === 'MOBILE_MONEY_ORANGE' && (
                  <span className="ml-auto text-orange-400 text-xl">✓</span>
                )}
              </div>

              {/* Bank Transfer */}
              <div
                onClick={() => setSelectedMethod('BANK_TRANSFER')}
                className={`flex items-center gap-4 p-4 rounded-xl
                  border-2 cursor-pointer transition ${
                  selectedMethod === 'BANK_TRANSFER'
                    ? 'border-blue-400 bg-blue-400/10'
                    : 'border-gray-700 hover:border-gray-600'
                }`}>
                <div className="w-12 h-12 rounded-xl bg-blue-600
                  flex items-center justify-center text-2xl">
                  🏦
                </div>
                <div>
                  <p className="text-white font-bold">Bank Transfer</p>
                  <p className="text-gray-400 text-sm">
                    Pay via bank account
                  </p>
                </div>
                {selectedMethod === 'BANK_TRANSFER' && (
                  <span className="ml-auto text-blue-400 text-xl">✓</span>
                )}
              </div>
            </div>
          </div>

          {/* Phone Number */}
          {selectedMethod && (
            <div className="bg-gray-900 rounded-2xl p-6
              border border-gray-800 mb-6">
              <label className="text-gray-400 text-sm mb-2 block">
                {selectedMethod === 'BANK_TRANSFER'
                  ? 'Bank Account Number'
                  : 'Mobile Money Number'}
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder={
                  selectedMethod === 'BANK_TRANSFER'
                    ? 'Enter bank account number'
                    : '+237 6XX XXX XXX'
                }
                className="w-full bg-gray-800 text-white rounded-lg
                  px-4 py-3 border border-gray-700 focus:outline-none
                  focus:border-orange-500"
              />
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500
              text-red-400 rounded-lg p-3 mb-4 text-sm">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="bg-green-500/10 border border-green-500
              text-green-400 rounded-lg p-4 mb-4 text-center">
              <p className="text-xl mb-1">🎉</p>
              <p className="font-bold">{success}</p>
              <p className="text-sm mt-1">Redirecting to dashboard...</p>
            </div>
          )}

          {/* Pay Button */}
          {!success && (
            <button
              onClick={handlePayment}
              disabled={processing}
              className="w-full bg-orange-500 hover:bg-orange-600
                text-white font-bold py-4 rounded-xl text-lg
                transition duration-200 mb-4">
              {processing
                ? 'Processing Payment...'
                : `Pay ${reservation?.totalPrice?.toLocaleString()} FCFA`
              }
            </button>
          )}

          <button
            onClick={() => navigate(-1)}
            className="w-full bg-gray-800 hover:bg-gray-700
              text-gray-300 font-semibold py-3 rounded-xl transition">
            ← Go Back
          </button>

        </div>
      </div>
      <Footer />
    </>
  );
}