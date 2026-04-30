import { useState, useRef } from "react";

const AVATAR_EMOJIS = ["😎", "🦊", "🐱", "🦁", "🐻", "🐼", "🐨", "🐸", "🤖", "👽", "🎃", "💀"];

export default function Profile({ user, setUser, onLogout }) {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [avatarIdx, setAvatarIdx] = useState(0);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || ""
  });
  const fileInputRef = useRef(null);

  // Profile photo upload handler
  function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Image too large. Please select an image under 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setUser({ ...user, profilePhoto: ev.target.result });
    };
    reader.readAsDataURL(file);
  }

  function removePhoto() {
    setUser({ ...user, profilePhoto: null });
  }

  function handleAvatarClick() {
    // If no photo, offer to upload; otherwise cycle emoji
    fileInputRef.current?.click();
  }

  // Multiple addresses management
  const defaultAddresses = user?.addresses || [
    { id: 1, label: "Home", detail: user?.address || "123 Main Street, NY 10001", isDefault: true }
  ];
  const [addresses, setAddresses] = useState(defaultAddresses);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  
  const initialAddressObj = { label: "Home", buildingNo: "", street: "", road: "", place: "", mandal: "", district: "", state: "", country: "", pincode: "" };
  const [newAddress, setNewAddress] = useState(initialAddressObj);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [locating, setLocating] = useState(false);

  // Profile Handlers
  function handleSaveProfile(e) {
    e.preventDefault();
    setUser({ ...user, ...profileData, avatar: AVATAR_EMOJIS[avatarIdx] });
    setIsEditingProfile(false);
  }

  function cycleAvatar() {
    setAvatarIdx((prev) => (prev + 1) % AVATAR_EMOJIS.length);
  }

  function buildDetailString(addrObj) {
    if (addrObj.detail && !addrObj.buildingNo && !addrObj.street) return addrObj.detail; // fallback for old data
    const parts = [
      addrObj.buildingNo, 
      addrObj.street, 
      addrObj.road, 
      addrObj.mandal, 
      addrObj.place, 
      addrObj.district, 
      addrObj.state, 
      addrObj.country
    ].filter(Boolean);
    return parts.join(", ") + (addrObj.pincode ? ` - ${addrObj.pincode}` : "");
  }

  // Address Handlers
  function handleAddAddress(e) {
    e.preventDefault();
    const newId = Date.now();
    const detailStr = buildDetailString(newAddress);
    const addr = { ...newAddress, detail: detailStr, id: newId, isDefault: addresses.length === 0 };
    const updated = [...addresses, addr];
    setAddresses(updated);
    setIsAddingAddress(false);
    setNewAddress(initialAddressObj);
    updateUserAddresses(updated);
  }

  function handleUpdateAddress(e, id) {
    e.preventDefault();
    // Only handling generic updates via textarea for simplicity on edit
    setEditingAddressId(null);
    updateUserAddresses(addresses);
  }

  function removeAddress(id) {
    const updated = addresses.filter(a => a.id !== id);
    if (updated.length > 0 && addresses.find(a => a.id === id).isDefault) {
      updated[0].isDefault = true;
    }
    setAddresses(updated);
    updateUserAddresses(updated);
  }

  function setAsDefault(id) {
    const updated = addresses.map(a => ({ ...a, isDefault: a.id === id }));
    setAddresses(updated);
    updateUserAddresses(updated);
  }

  function updateUserAddresses(list) {
    const defaultAddr = list.find(a => a.isDefault)?.detail || list[0]?.detail || "";
    setUser({ ...user, addresses: list, address: defaultAddr });
  }

  function handleAutoDetect() {
    setLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const resp = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
          const data = await resp.json();
          const addrData = data.address || {};
          setNewAddress(prev => ({
            ...prev,
            buildingNo: addrData.house_number || prev.buildingNo,
            street: addrData.road || addrData.pedestrian || prev.street,
            road: addrData.suburb || addrData.neighbourhood || prev.road,
            mandal: addrData.subdistrict || addrData.taluka || addrData.tehsil || prev.mandal,
            place: addrData.city || addrData.town || addrData.village || addrData.state_district || prev.place,
            district: addrData.county || addrData.district || prev.district,
            state: addrData.state || prev.state,
            country: addrData.country || prev.country,
            pincode: addrData.postcode || prev.pincode
          }));
        } catch (e) {
          console.error("Location lookup failed", e);
        }
        setLocating(false);
      }, () => setLocating(false));
    } else {
      setLocating(false);
    }
  }

  return (
    <div className="page-container profile-page">
      <div className="profile-header">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handlePhotoUpload}
        />
        <div className="avatar-wrapper">
          <div className="avatar" onClick={handleAvatarClick} title="Click to upload photo">
            {user?.profilePhoto ? (
              <img src={user.profilePhoto} alt="Profile" className="avatar-photo" />
            ) : (
              user?.avatar || AVATAR_EMOJIS[avatarIdx]
            )}
            <div className="avatar-edit-hint">📷</div>
          </div>
          <div className="avatar-actions">
            {user?.profilePhoto && (
              <button className="remove-photo-btn" onClick={removePhoto} title="Remove photo">✕ Remove Photo</button>
            )}
            {!user?.profilePhoto && (
              <button className="emoji-cycle-btn" onClick={cycleAvatar} title="Change emoji">🔄 Change Emoji</button>
            )}
          </div>
        </div>
        <h2>{user?.name}</h2>
        <p>{user?.email || "No email set"}</p>
      </div>

      {/* Personal Information Card */}
      <div className="profile-card">
        <div className="card-header">
          <h3>👤 Personal Information</h3>
          {!isEditingProfile && (
            <button className="btn-secondary small" onClick={() => setIsEditingProfile(true)}>Edit</button>
          )}
        </div>

        {isEditingProfile ? (
          <form onSubmit={handleSaveProfile} className="profile-form">
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                value={profileData.name} 
                onChange={e => setProfileData({...profileData, name: e.target.value})} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                value={profileData.email} 
                onChange={e => setProfileData({...profileData, email: e.target.value})} 
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input 
                type="tel" 
                value={profileData.phone} 
                onChange={e => setProfileData({...profileData, phone: e.target.value})} 
                required 
              />
            </div>
            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={() => setIsEditingProfile(false)}>Cancel</button>
              <button type="submit" className="btn-primary">Save Info</button>
            </div>
          </form>
        ) : (
          <div className="profile-details">
            <div className="detail-row"><strong>Name:</strong> <span>{user?.name}</span></div>
            <div className="detail-row"><strong>Email:</strong> <span>{user?.email || "Not set"}</span></div>
            <div className="detail-row"><strong>Phone:</strong> <span>{user?.phone}</span></div>
          </div>
        )}
      </div>

      {/* Address Management Card */}
      <div className="profile-card">
        <div className="card-header">
          <h3>📍 Saved Addresses</h3>
          {!isAddingAddress && (
            <button className="btn-secondary small" onClick={() => setIsAddingAddress(true)}>+ Add New</button>
          )}
        </div>

        {isAddingAddress && (
          <form onSubmit={handleAddAddress} className="profile-form" style={{marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)'}}>
            <div className="address-form-header">
               <h4>Add New Address</h4>
               <button type="button" className="btn-secondary small" onClick={handleAutoDetect} disabled={locating}>
                 {locating ? "📡 Locating..." : "📍 Auto-Detect Location"}
               </button>
            </div>
            
            <div className="form-group">
              <label>Address Label</label>
              <select value={newAddress.label} onChange={e => setNewAddress({...newAddress, label: e.target.value})}>
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-row">
               <div className="form-group flex-1">
                 <label>Building / Flat No.</label>
                 <input type="text" value={newAddress.buildingNo} onChange={e => setNewAddress({...newAddress, buildingNo: e.target.value})} required placeholder="E.g. Flat 101" />
               </div>
               <div className="form-group flex-2">
                 <label>Street / Area</label>
                 <input type="text" value={newAddress.street} onChange={e => setNewAddress({...newAddress, street: e.target.value})} required placeholder="E.g. MG Road" />
               </div>
            </div>
            <div className="form-row">
               <div className="form-group flex-1">
                 <label>Road / Area</label>
                 <input type="text" value={newAddress.road} onChange={e => setNewAddress({...newAddress, road: e.target.value})} placeholder="E.g. Near Metro Station" />
               </div>
               <div className="form-group flex-1">
                 <label>Mandal / Sub-District</label>
                 <input type="text" value={newAddress.mandal} onChange={e => setNewAddress({...newAddress, mandal: e.target.value})} placeholder="E.g. Goregaon" />
               </div>
               <div className="form-group flex-1">
                 <label>City / Place</label>
                 <input type="text" value={newAddress.place} onChange={e => setNewAddress({...newAddress, place: e.target.value})} required placeholder="E.g. Mumbai" />
               </div>
            </div>
            <div className="form-row">
               <div className="form-group flex-1">
                 <label>District</label>
                 <input type="text" value={newAddress.district} onChange={e => setNewAddress({...newAddress, district: e.target.value})} placeholder="E.g. Mumbai Suburban" />
               </div>
               <div className="form-group flex-1">
                 <label>State</label>
                 <input type="text" value={newAddress.state} onChange={e => setNewAddress({...newAddress, state: e.target.value})} required placeholder="E.g. Maharashtra" />
               </div>
               <div className="form-group flex-1">
                 <label>Country</label>
                 <input type="text" value={newAddress.country} onChange={e => setNewAddress({...newAddress, country: e.target.value})} required placeholder="E.g. India" />
               </div>
               <div className="form-group flex-1">
                 <label>Pincode</label>
                 <input type="text" value={newAddress.pincode} onChange={e => setNewAddress({...newAddress, pincode: e.target.value})} required placeholder="E.g. 400001" maxLength="6" />
               </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={() => setIsAddingAddress(false)}>Cancel</button>
              <button type="submit" className="btn-primary">Save Address</button>
            </div>
          </form>
        )}

        <div className="addresses-list">
          {addresses.length === 0 && <p style={{color: 'var(--text-secondary)'}}>No saved addresses yet.</p>}
          
          {addresses.map(addr => (
            <div key={addr.id} style={{
              padding: '1rem', 
              background: 'var(--bg-surface)', 
              borderRadius: '12px', 
              marginBottom: '1rem',
              border: addr.isDefault ? '2px solid var(--accent-color)' : '1px solid transparent'
            }}>
              {editingAddressId === addr.id ? (
                <form onSubmit={(e) => handleUpdateAddress(e, addr.id)}>
                   <div className="form-group">
                      <select 
                        value={addr.label} 
                        onChange={e => setAddresses(addresses.map(a => a.id === addr.id ? {...a, label: e.target.value} : a))}
                      >
                        <option value="Home">Home</option><option value="Work">Work</option><option value="Other">Other</option>
                      </select>
                   </div>
                   <div className="form-group">
                      <textarea 
                        rows="2" 
                        value={addr.detail} 
                        onChange={e => setAddresses(addresses.map(a => a.id === addr.id ? {...a, detail: e.target.value} : a))}
                        placeholder="Full address details"
                        required
                      />
                   </div>
                   <button type="submit" className="btn-primary small">Update</button>
                </form>
              ) : (
                <>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.8rem'}}>
                      <span style={{background: 'var(--bg-card)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600}}>
                        {addr.label}
                      </span>
                      {addr.isDefault && <span style={{color: 'var(--accent-color)', fontSize: '0.8rem', fontWeight: 700}}>✓ Default</span>}
                    </div>
                    <div style={{display: 'flex', gap: '0.5rem'}}>
                      {!addr.isDefault && (
                        <button style={{color: 'var(--info)', fontSize: '0.85rem', fontWeight: 600}} onClick={() => setAsDefault(addr.id)}>Set Default</button>
                      )}
                      <button style={{color: 'var(--text-secondary)', fontSize: '0.85rem'}} onClick={() => setEditingAddressId(addr.id)}>Edit</button>
                      <button style={{color: 'var(--danger)', fontSize: '0.85rem'}} onClick={() => removeAddress(addr.id)}>Delete</button>
                    </div>
                  </div>
                  <p style={{color: 'var(--text-primary)', lineHeight: 1.5}}>{addr.detail}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Security Card */}
      <div className="profile-card">
        <div className="card-header">
          <h3>🔒 Login & Security</h3>
        </div>
        <div className="profile-details">
          <div className="detail-row">
            <strong>Password:</strong> <span>••••••••</span>
          </div>
          <div className="detail-row">
            <strong>2-Step Auth:</strong> <span style={{color: "var(--success)"}}>✅ Enabled (OTP)</span>
          </div>
        </div>
      </div>

      <button className="btn-danger logout-btn" onClick={onLogout}>🚪 Logout</button>
    </div>
  );
}
