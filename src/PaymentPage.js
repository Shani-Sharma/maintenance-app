// src/PaymentPage.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const payment = state?.payment; // Access the payment state
  const [paymentMethod, setPaymentMethod] = useState('credit'); // Default payment method

  const handlePaymentSubmit = () => {
    // Logic for processing payment goes here
    alert(`Payment of ${payment?.amount} has been processed for ${payment?.date} using ${paymentMethod}`);
    navigate('/details'); // Navigate back to the details page after payment
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Payment Page</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Payment Details</h3>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Date:</strong> {payment?.date}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Amount:</strong> INR {payment?.amount}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Status:</strong> {payment?.status}
            </p>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Select Payment Method</h3>
          <div className="flex flex-col space-y-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="upi"
                checked={paymentMethod === 'upi'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="form-radio h-5 w-5 text-indigo-600"
              />
              <span className="text-gray-700">UPI</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="credit"
                checked={paymentMethod === 'credit'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="form-radio h-5 w-5 text-indigo-600"
              />
              <span className="text-gray-700">Credit Card</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="debit"
                checked={paymentMethod === 'debit'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="form-radio h-5 w-5 text-indigo-600"
              />
              <span className="text-gray-700">Debit Card</span>
            </label>
          </div>
        </div>

        {/* Payment Form */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Payment Information</h3>
          <form className="space-y-4">
            {paymentMethod === 'credit' || paymentMethod === 'debit' ? (
              <>
                <div className="flex flex-col mb-4">
                  <label htmlFor="cardNumber" className="text-sm font-medium text-gray-700">Card Number</label>
                  <input
                    id="cardNumber"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label htmlFor="expiryDate" className="text-sm font-medium text-gray-700">Expiry Date</label>
                  <input
                    id="expiryDate"
                    type="text"
                    placeholder="MM/YY"
                    className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label htmlFor="cvv" className="text-sm font-medium text-gray-700">CVV</label>
                  <input
                    id="cvv"
                    type="text"
                    placeholder="123"
                    className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              </>
            ) : paymentMethod === 'upi' ? (
              <div className="flex flex-col mb-4">
                <label htmlFor="upiId" className="text-sm font-medium text-gray-700">UPI ID</label>
                <input
                  id="upiId"
                  type="text"
                  placeholder="example@upi"
                  className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            ) : null}
          </form>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => navigate('/details')}
            className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handlePaymentSubmit}
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Submit Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
