import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [showForgotDialog, setShowForgotDialog] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const toast = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await authService.login(credentials.username, credentials.password);
      const { name, token, username, role, id } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('role', role);
      localStorage.setItem('name', name);
      localStorage.setItem('id', id);

      if (role === 'ADMIN') {
        navigate('/admin');
      } else if (role === 'AGENT') {
        navigate('/agent');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Invalid username or password');
      console.error(err);
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please enter your email', life: 3000 });
      return;
    }
    setForgotLoading(true);
    try {
      await authService.forgotPassword(forgotEmail);
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Password reset request submitted.', life: 3000 });
      setShowForgotDialog(false);
      setForgotEmail('');
    } catch (err) {
      console.error(err);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to submit request. Verify the email is correct.', life: 3000 });
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <Toast ref={toast} />
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h3 className="text-center mb-4 text-primary">Login</h3>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Username (Email)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="text-end mb-3">
                  <a href="#!" className="text-decoration-none" onClick={() => setShowForgotDialog(true)}>Forgot Password?</a>
                </div>
                <button type="submit" className="btn btn-primary w-100 py-2">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Dialog header="Forgot Password" visible={showForgotDialog} style={{ width: '50vw', maxWidth: '400px' }} onHide={() => setShowForgotDialog(false)}>
        <p className="m-0 mb-3">Enter your email address to request a password reset from the administrator.</p>
        <div className="mb-3">
          <InputText 
            placeholder="Email address" 
            className="w-100" 
            value={forgotEmail} 
            onChange={(e) => setForgotEmail(e.target.value)} 
          />
        </div>
        <div className="text-end">
          <Button label="Cancel" icon="pi pi-times" onClick={() => setShowForgotDialog(false)} className="p-button-text" />
          <Button label="Submit Request" icon="pi pi-check" onClick={handleForgotPassword} loading={forgotLoading} autoFocus />
        </div>
      </Dialog>
    </div>
  );
};

export default Login;
