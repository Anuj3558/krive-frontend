import React, { useState, useEffect } from 'react';

const AlterationRequests = () => {
  const [alterations, setAlterations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlterations();
  }, []);

  const fetchAlterations = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/getallaltrequest`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setAlterations(data);
    } catch (error) {
      alert('Failed to fetch alteration requests');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch('/admin/updatealteration', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          status: newStatus,
        }),
      });

      if (!response.ok) throw new Error('Failed to update');
      
      setAlterations(alterations.map(alt => 
        alt._id === id ? { ...alt, status: newStatus } : alt
      ));

      alert('Status updated successfully');
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100';
      case 'Processing': return 'bg-blue-100';
      case 'Cancelled': return 'bg-red-100';
      default: return 'bg-yellow-100';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Alteration Requests</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {alterations.map((alteration) => (
          <div 
            key={alteration._id} 
            className="border rounded-lg shadow-lg p-4 bg-white"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold">
                Request #{alteration._id.slice(-4)}
              </span>
              <span className={`px-2 py-1 rounded text-sm ${getStatusColor(alteration.status)}`}>
                {alteration.status}
              </span>
            </div>

            <div className="space-y-4">
              <img
                src={alteration.image}
                alt="Alteration request"
                className="w-full h-48 object-cover rounded-lg"
              />

              <div>
                <h3 className="font-semibold">Instructions:</h3>
                <p className="text-gray-600 mt-1">{alteration.instruction}</p>
              </div>

              <div>
                <h3 className="font-semibold">Customer Details:</h3>
                <div className="text-gray-600 space-y-1 mt-1">
                  <p>{alteration.userDetails.name}</p>
                  <p>{alteration.userDetails.email}</p>
                  <p>{alteration.userDetails.phone}</p>
                </div>
              </div>

              <div className="pt-2">
                <select
                  className="w-full p-2 border rounded-lg"
                  value={alteration.status}
                  onChange={(e) => updateStatus(alteration._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlterationRequests;