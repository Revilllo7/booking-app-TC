import { useState } from 'react';

const LoginForm = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState<{ text: string; type: 'error' | 'success' } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setMessage({ text: 'Zalogowano!', type: 'success' });
      window.location.href = '/bookings';
    } else {
      setMessage({ text: 'Błędny login lub hasło.', type: 'error' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Logowanie</h2>
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
      <button type="submit">Zaloguj</button>
      {message && (
        <div className={`form-message ${message.type}`}>{message.text}</div>
      )}
    </form>
  );
};

export default LoginForm;