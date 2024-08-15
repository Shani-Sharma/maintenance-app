// src/Details.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateInvoice } from './utils/generateInvoice';
import jsPDF from 'jspdf';
import { html2canvas } from 'html2canvas';

const getCurrentMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

const Details = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [selectedRow, setSelectedRow] = useState(null);
  const [duePayments, setDuePayments] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    // Fetch or define due payments and history here
    setDuePayments([
      { id: 1, date: '2024-08-01', amount: 500, status: 'Pending' },
      { id: 2, date: '2024-07-01', amount: 450, status: 'Paid' },
      { id: 3, date: '2024-09-01', amount: 550, status: 'Upcoming' },
      // Add more due payments as needed
    ]);

    setPaymentHistory([
      { id: 1, date: '2024-07-15', amount: 500, status: 'Completed' },
      { id: 2, date: '2024-06-15', amount: 450, status: 'Completed' },
      // Add more history items as needed
    ]);
  }, []);

  const currentMonth = getCurrentMonth();

  const handleRowClick = (rowId) => {
    setSelectedRow(rowId);
  };

  const handlePay = () => {
    if (selectedRow) {
      const payment = duePayments.find(item => item.id === selectedRow);
      // Navigate to payment page with the selected payment details
      navigate('/payment', { state: { payment } });
    }
  };

  const invoiceData = {
    invoiceNumber: 'INV-00123',
    invoiceDate: 'August 15, 2024',
    dueDate: 'September 15, 2024',
    customerName: 'John Doe',
    customerAddress: '123 Main Street, Apt 4B, Cityville, ST, 12345',
    customerPhone: '(987) 654-3210',
    flatNumber: 'Flat No. 101',
    unitPrice: '$200.00',
    totalPrice: '$200.00',
    subtotal: '$350.00',
    taxRate: '10',
    taxes: '$35.00',
    totalAmount: '$385.00',
  };

  return (
    <div className="h-screen flex flex-col items-center bg-gray-100 p-8">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Maintenance Details</h2>
        <button
          onClick={() => generateInvoice(invoiceData)}
          className="mb-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Download Invoice
        </button>

        {/* Due Payments Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Due Payments</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {duePayments.map((item) => {
                let status;
                if (item.date === currentMonth && item.status === 'Pending') {
                  status = 'Unpaid';
                } else if (item.date > currentMonth) {
                  status = 'Upcoming';
                } else {
                  status = item.status;
                }

                return (
                  <tr
                    key={item.id}
                    className={`cursor-pointer ${selectedRow === item.id ? 'bg-blue-50 border border-blue-300' : 'hover:bg-gray-50'}`}
                    onClick={() => handleRowClick(item.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {status !== 'Paid' && selectedRow === item.id && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent row click event
                            handlePay();
                          }}
                          className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Pay
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Payment History Section */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Payment History</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paymentHistory.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Details;
