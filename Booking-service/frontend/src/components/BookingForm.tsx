import { useState } from 'react';
import '../index.css';

const BookingForm = ({ onBookingAdded }: { onBookingAdded?: () => void }) => {
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    const token = localStorage.getItem('token');
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      setMessage({ type: 'success', text: 'Rezerwacja zapisana!' });
      setFormData({ service: '', date: '', time: '' });
      onBookingAdded && onBookingAdded();
    } else {
      setMessage({ type: 'error', text: 'Błąd przy rezerwacji.' });
    }
  };

  // Ustal min jako dzisiejszy dzień o 09:00, max jako 30 dni do przodu o 17:00
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const minDate = `${yyyy}-${mm}-${dd}`;

  const maxDateObj = new Date();
  maxDateObj.setDate(maxDateObj.getDate() + 30);
  const maxYyyy = maxDateObj.getFullYear();
  const maxMm = String(maxDateObj.getMonth() + 1).padStart(2, '0');
  const maxDd = String(maxDateObj.getDate()).padStart(2, '0');
  const maxDate = `${maxYyyy}-${maxMm}-${maxDd}`;

  // Walidacja: tylko poniedziałek-piątek i godziny 9-17 co 30 min
  const isValidDate = (value: string) => {
    if (!value) return true;
    const dateObj = new Date(value);
    const day = dateObj.getDay(); // 0 = niedziela, 6 = sobota
    return day >= 1 && day <= 5;
  };

  const showDateError = !!formData.date && !isValidDate(formData.date);

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <select name="service" value={formData.service} onChange={handleChange} required>
        <option value="">Wybierz usługę</option>
        <option value="strzyżenie damskie">Strzyżenie damskie</option>
        <option value="strzyżenie męskie">Strzyżenie męskie</option>
        <option value="strzyżenie brody">Strzyżenie brody</option>
        <option value="strzyżenie dziecięce">Strzyżenie dziecięce</option>
        <option value="koloryzacja">Koloryzacja</option>
        <option value="modelowanie">Modelowanie</option>
        <option value="pielęgnacja">Pielęgnacja</option>
        <option value="fryzura okolicznościowa">Fryzura okolicznościowa</option>
      </select>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
        min={minDate}
        max={maxDate}
      />
      {showDateError && (
        <div style={{ color: 'red', fontSize: '0.95em' }}>
          Wybierz dzień od poniedziałku do piątku.
        </div>
      )}
      <select
        name="time"
        value={formData.time}
        onChange={handleChange}
        required
      >
        <option value="">Wybierz godzinę</option>
        <option value="09:00">09:00</option>
        <option value="09:30">09:30</option>
        <option value="10:00">10:00</option>
        <option value="10:30">10:30</option>
        <option value="11:00">11:00</option>
        <option value="11:30">11:30</option>
        <option value="12:00">12:00</option>
        <option value="12:30">12:30</option>
        <option value="13:00">13:00</option>
        <option value="13:30">13:30</option>
        <option value="14:00">14:00</option>
        <option value="14:30">14:30</option>
        <option value="15:00">15:00</option>
        <option value="15:30">15:30</option>
        <option value="16:00">16:00</option>
        <option value="16:30">16:30</option>
        <option value="17:00">17:00</option>
      </select>
      <button type="submit" disabled={showDateError}>Zarezerwuj</button>
      {message && (
        <div className={`form-message ${message.type}`}>{message.text}</div>
      )}
    </form>
  );
};

export default BookingForm;