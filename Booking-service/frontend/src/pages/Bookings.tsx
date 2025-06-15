import { useState, useCallback } from 'react';
import BookingForm from '../components/BookingForm';
import BookingList from '../components/BookingList';
import '../index.css';

export default function Bookings() {
  const [refreshFlag, setRefreshFlag] = useState(0);

  const refreshBookings = useCallback(() => {
    setRefreshFlag(f => f + 1);
  }, []);

  return (
    <div className="container">
      <h1 className="heading">Rezerwacje</h1>
      <BookingForm onBookingAdded={refreshBookings} />
      <BookingList refreshFlag={refreshFlag} />
    </div>
  );
}

