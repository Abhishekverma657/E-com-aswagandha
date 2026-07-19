import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { User, MapPin, Plus, Trash2, Edit3, ArrowLeft, Loader2, Save, X, Phone, ShieldCheck } from 'lucide-react';

export default function Profile() {
  const { user, token, setUser } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('details'); // 'details' or 'addresses'
  
  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState(null);

  // Address list state
  const [addresses, setAddresses] = useState(user?.addresses || []);
  const [editingAddress, setEditingAddress] = useState(null); // address object or 'new'
  const [addressForm, setAddressForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    isDefault: false
  });
  const [updatingAddress, setUpdatingAddress] = useState(false);
  const [addressError, setAddressError] = useState(null);

  if (!token) {
    navigate('/login');
    return null;
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setUpdatingProfile(true);
    setProfileMsg(null);
    try {
      const res = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileForm)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update profile');
      setUser(data);
      setProfileMsg({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      console.error(err);
      setProfileMsg({ type: 'error', text: err.message });
    } finally {
      setUpdatingProfile(false);
    }
  };

  const openAddressForm = (addr = null) => {
    setAddressError(null);
    if (addr === 'new') {
      setEditingAddress('new');
      setAddressForm({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phone: '',
        isDefault: false
      });
    } else {
      setEditingAddress(addr);
      setAddressForm({
        firstName: addr.firstName,
        lastName: addr.lastName,
        address: addr.address,
        city: addr.city,
        state: addr.state,
        zipCode: addr.zipCode,
        phone: addr.phone,
        isDefault: addr.isDefault
      });
    }
  };

  const closeAddressForm = () => {
    setEditingAddress(null);
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    setUpdatingAddress(true);
    setAddressError(null);
    const url = editingAddress === 'new' 
      ? '/api/users/addresses' 
      : `/api/users/addresses/${editingAddress._id}`;
    const method = editingAddress === 'new' ? 'POST' : 'PUT';

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(addressForm)
      });
      const updatedAddresses = await res.json();
      if (!res.ok) throw new Error(updatedAddresses.error || 'Failed to save address');
      setAddresses(updatedAddresses);
      setUser(prev => ({ ...prev, addresses: updatedAddresses }));
      setEditingAddress(null);
    } catch (err) {
      console.error(err);
      setAddressError(err.message);
    } finally {
      setUpdatingAddress(false);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm('Are you sure you want to delete this address?')) return;
    try {
      const res = await fetch(`/api/users/addresses/${addressId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const updatedAddresses = await res.json();
      if (!res.ok) throw new Error(updatedAddresses.error || 'Failed to delete address');
      setAddresses(updatedAddresses);
      setUser(prev => ({ ...prev, addresses: updatedAddresses }));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="bg-secondary min-h-screen pt-28 pb-24 text-left font-sans">
      <div className="max-w-5xl mx-auto px-6">
        {/* Back Link */}
        <Link to="/shop" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary/60 hover:text-accent font-bold mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> <span>Back to Shop</span>
        </Link>

        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-10 text-primary tracking-wide">My Account</h1>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Navigation Sidebar */}
          <div className="w-full md:w-1/4 flex flex-col gap-2">
            <button
              onClick={() => setActiveTab('details')}
              className={`flex items-center gap-3 px-5 py-4 text-xs font-bold uppercase tracking-widest border transition-all rounded-xs text-left cursor-pointer ${
                activeTab === 'details'
                  ? 'bg-primary text-secondary border-primary shadow-md'
                  : 'bg-white text-primary border-primary/10 hover:border-accent'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile Details</span>
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`flex items-center gap-3 px-5 py-4 text-xs font-bold uppercase tracking-widest border transition-all rounded-xs text-left cursor-pointer ${
                activeTab === 'addresses'
                  ? 'bg-primary text-secondary border-primary shadow-md'
                  : 'bg-white text-primary border-primary/10 hover:border-accent'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Saved Addresses</span>
            </button>
            <Link
              to="/orders"
              className="flex items-center gap-3 px-5 py-4 text-xs font-bold uppercase tracking-widest border bg-white text-primary border-primary/10 hover:border-accent rounded-xs"
            >
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>Order History</span>
            </Link>
          </div>

          {/* Main Content Area */}
          <div className="flex-grow">
            
            {/* TAB: PROFILE DETAILS */}
            {activeTab === 'details' && (
              <div className="bg-white p-8 border border-primary/5 rounded-sm shadow-md space-y-6">
                <div className="border-b border-primary/5 pb-4">
                  <h2 className="font-serif text-2xl font-bold text-primary">Edit Profile</h2>
                  <p className="text-dark/50 text-xs mt-1">Keep your credentials up to date for fast checkout support.</p>
                </div>

                {profileMsg && (
                  <div className={`p-4 text-xs rounded-xs font-semibold ${profileMsg.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    {profileMsg.text}
                  </div>
                )}

                <form onSubmit={handleProfileSubmit} className="space-y-6 text-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-primary uppercase tracking-wider block">Full Name</label>
                      <input 
                        type="text" 
                        value={profileForm.name}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full border border-primary/10 bg-secondary/15 px-4 py-3.5 focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium rounded-xs" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-primary uppercase tracking-wider block">Email Address</label>
                      <input 
                        type="email" 
                        value={profileForm.email}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full border border-primary/10 bg-secondary/15 px-4 py-3.5 focus:outline-none focus:border-accent focus:bg-white transition-all text-primary/70 font-medium rounded-xs cursor-not-allowed bg-secondary/5" 
                        disabled 
                        title="Email cannot be changed"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={updatingProfile}
                    className="bg-primary text-secondary hover:bg-primary-light font-bold py-4 px-10 uppercase tracking-[0.2em] text-xs transition-all duration-300 rounded-sm shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {updatingProfile ? <Loader2 className="w-4 h-4 animate-spin text-accent" /> : <Save className="w-4 h-4 text-accent" />}
                    <span>Save Changes</span>
                  </button>
                </form>
              </div>
            )}

            {/* TAB: SAVED ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                
                {/* Header card with Add Address option */}
                <div className="bg-white p-6 border border-primary/5 rounded-sm shadow-md flex justify-between items-center">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-primary">Saved Addresses</h2>
                    <p className="text-dark/50 text-xs mt-1">Manage multiple addresses for family shipments.</p>
                  </div>
                  {!editingAddress && (
                    <button 
                      onClick={() => openAddressForm('new')}
                      className="bg-accent text-primary hover:bg-accent-dark font-bold py-3 px-5 text-xs uppercase tracking-widest transition-all rounded-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New</span>
                    </button>
                  )}
                </div>

                {/* Add/Edit address inline form panel */}
                {editingAddress && (
                  <div className="bg-white p-8 border border-accent/20 rounded-sm shadow-md space-y-6 animate-fade-in">
                    <div className="flex justify-between items-center border-b border-primary/5 pb-4">
                      <h3 className="font-serif text-xl font-bold text-primary">
                        {editingAddress === 'new' ? 'Add Shipping Address' : 'Edit Shipping Address'}
                      </h3>
                      <button onClick={closeAddressForm} className="text-dark/50 hover:text-red-500 transition-colors">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {addressError && (
                      <div className="p-4 bg-red-50 text-red-700 text-xs rounded-xs border border-red-200">
                        {addressError}
                      </div>
                    )}

                    <form onSubmit={handleAddressSubmit} className="space-y-6 text-sm">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-primary uppercase tracking-wider block">First Name</label>
                          <input 
                            type="text" 
                            value={addressForm.firstName}
                            onChange={(e) => setAddressForm(prev => ({ ...prev, firstName: e.target.value }))}
                            className="w-full border border-primary/10 bg-secondary/10 px-4 py-3 focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium rounded-xs" 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-primary uppercase tracking-wider block">Last Name</label>
                          <input 
                            type="text" 
                            value={addressForm.lastName}
                            onChange={(e) => setAddressForm(prev => ({ ...prev, lastName: e.target.value }))}
                            className="w-full border border-primary/10 bg-secondary/10 px-4 py-3 focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium rounded-xs" 
                            required 
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-primary uppercase tracking-wider block">Street Address</label>
                        <input 
                          type="text" 
                          value={addressForm.address}
                          onChange={(e) => setAddressForm(prev => ({ ...prev, address: e.target.value }))}
                          placeholder="House No, Apartment, Street Name"
                          className="w-full border border-primary/10 bg-secondary/10 px-4 py-3 focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium rounded-xs" 
                          required 
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-primary uppercase tracking-wider block">City</label>
                          <input 
                            type="text" 
                            value={addressForm.city}
                            onChange={(e) => setAddressForm(prev => ({ ...prev, city: e.target.value }))}
                            className="w-full border border-primary/10 bg-secondary/10 px-4 py-3 focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium rounded-xs" 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-primary uppercase tracking-wider block">State</label>
                          <input 
                            type="text" 
                            value={addressForm.state}
                            onChange={(e) => setAddressForm(prev => ({ ...prev, state: e.target.value }))}
                            className="w-full border border-primary/10 bg-secondary/10 px-4 py-3 focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium rounded-xs" 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-primary uppercase tracking-wider block">Zip Code</label>
                          <input 
                            type="text" 
                            value={addressForm.zipCode}
                            onChange={(e) => setAddressForm(prev => ({ ...prev, zipCode: e.target.value }))}
                            className="w-full border border-primary/10 bg-secondary/10 px-4 py-3 focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium rounded-xs" 
                            required 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-primary uppercase tracking-wider block">Phone Number</label>
                          <input 
                            type="tel" 
                            value={addressForm.phone}
                            onChange={(e) => setAddressForm(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder="10-digit number"
                            className="w-full border border-primary/10 bg-secondary/10 px-4 py-3 focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium rounded-xs" 
                            required 
                          />
                        </div>
                        <div className="flex items-center h-full pt-8">
                          <label className="flex items-center gap-2 cursor-pointer font-bold text-xs uppercase text-primary tracking-wider">
                            <input 
                              type="checkbox" 
                              checked={addressForm.isDefault}
                              onChange={(e) => setAddressForm(prev => ({ ...prev, isDefault: e.target.checked }))}
                              className="w-4 h-4 border border-primary/10 rounded-xs focus:ring-accent accent-accent" 
                            />
                            <span>Set as Default Address</span>
                          </label>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button 
                          type="submit" 
                          disabled={updatingAddress}
                          className="bg-primary text-secondary hover:bg-primary-light font-bold py-3.5 px-8 uppercase tracking-[0.2em] text-xs transition-all duration-300 rounded-sm shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                          {updatingAddress ? <Loader2 className="w-4 h-4 animate-spin text-accent" /> : <Save className="w-4 h-4 text-accent" />}
                          <span>Save Address</span>
                        </button>
                        <button 
                          type="button" 
                          onClick={closeAddressForm}
                          className="bg-white border border-primary/10 hover:border-accent text-primary font-bold py-3.5 px-8 uppercase tracking-[0.2em] text-xs transition-all duration-300 rounded-sm shadow-xs cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Grid list of addresses */}
                {addresses.length === 0 ? (
                  <div className="bg-white p-12 text-center border border-primary/5 rounded-sm shadow-md font-sans">
                    <p className="text-dark/65 font-light text-sm mb-4">No shipping addresses saved yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {addresses.map((addr) => (
                      <div 
                        key={addr._id} 
                        className={`bg-white p-6 border rounded-sm shadow-xs flex flex-col justify-between space-y-4 transition-all hover:shadow-md ${
                          addr.isDefault ? 'border-accent ring-1 ring-accent/20' : 'border-primary/5'
                        }`}
                      >
                        <div className="space-y-1.5 text-xs text-dark/75">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-sm text-primary">{addr.firstName} {addr.lastName}</span>
                            {addr.isDefault && (
                              <span className="bg-accent/15 text-accent text-[9px] font-bold px-2 py-0.5 uppercase rounded-xs">Default</span>
                            )}
                          </div>
                          <span className="block mt-2 font-medium">{addr.address}</span>
                          <span className="block">{addr.city}, {addr.state} - {addr.zipCode}</span>
                          <span className="flex items-center gap-1.5 mt-2 font-semibold text-primary/70">
                            <Phone className="w-3.5 h-3.5 text-accent" />
                            <span>{addr.phone}</span>
                          </span>
                        </div>

                        <div className="flex gap-4 border-t border-primary/5 pt-4 text-xs font-bold uppercase tracking-wider">
                          <button 
                            onClick={() => openAddressForm(addr)}
                            className="text-primary/60 hover:text-accent transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" /> Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteAddress(addr._id)}
                            className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
