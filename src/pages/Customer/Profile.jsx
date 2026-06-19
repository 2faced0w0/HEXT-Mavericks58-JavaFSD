import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { customerService } from '../../services/api';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

const Profile = () => {
    const [profile, setProfile] = useState({ name: '', phoneNumber: '', email: '' });
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (role !== 'CUSTOMER') {
            navigate(role === 'ADMIN' ? '/admin' : role === 'AGENT' ? '/agent' : '/');
            return;
        }
        fetchProfile();
    }, [navigate]);

    const fetchProfile = async () => {
        try {
            const response = await customerService.getProfile();
            setProfile({
                name: response.data.name || '',
                phoneNumber: response.data.phoneNumber || '',
                email: response.data.email || ''
            });
        } catch (error) {
            console.error("Error fetching profile", error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to load profile', life: 3000 });
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await customerService.updateProfile({
                name: profile.name,
                phoneNumber: profile.phoneNumber,
                password: newPassword ? newPassword : null
            });
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Profile updated successfully', life: 3000 });
            setNewPassword('');
        } catch (error) {
            console.error("Error updating profile", error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to update profile', life: 3000 });
        }
    };

    return (
        <div className="container mt-5">
            <Toast ref={toast} />
            {loading ? (
                <div className="text-center mt-5"><i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i></div>
            ) : (
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow-sm border-0">
                            <div className="card-body p-5">
                                <h2 className="mb-4 text-primary text-center">My Profile</h2>
                                <form onSubmit={handleSave}>
                                <div className="mb-4">
                                    <label className="form-label font-bold text-secondary">Email (Read Only)</label>
                                    <InputText className="w-100" value={profile.email} readOnly disabled />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label font-bold text-secondary">Full Name</label>
                                    <InputText className="w-100" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} required />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label font-bold text-secondary">Phone Number</label>
                                    <InputText className="w-100" value={profile.phoneNumber} onChange={(e) => setProfile({...profile, phoneNumber: e.target.value})} required />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label font-bold text-secondary">New Password (leave blank to keep current)</label>
                                    <Password className="w-100" inputClassName="w-100" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} toggleMask feedback={false} />
                                </div>
                                <div className="text-center mt-5">
                                    <Button label="Save Changes" icon="pi pi-check" className="p-button-primary w-100 py-3" type="submit" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
};

export default Profile;
