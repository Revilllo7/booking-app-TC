import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [form, setForm] = useState({ username: '', password: '', role: 'client' });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setMessage({ type: 'success', text: 'Rejestracja udana! Przekierowanie do logowania...' });
      setTimeout(() => navigate('/login'), 1500);
    } else {
      setMessage({ type: 'error', text: 'Błąd rejestracji.' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Rejestracja</h2>
      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Nazwa użytkownika"
        required
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Hasło"
        required
      />
      <button type="submit">Zarejestruj</button>
      {message && (
        <div className={`form-message ${message.type}`}>{message.text}</div>
      )}
    </form>
  );
};

export default RegisterForm;