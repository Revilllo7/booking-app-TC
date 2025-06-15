import React from 'react';

type Booking = {
  id: number;
  username: string;
  service_type: string;
  date: string;
  time: string;
};

function formatBooking(booking: Booking) {
  const dateObj = new Date(booking.date);
  const dateStr = dateObj.toLocaleDateString('pl-PL');
  // Extract "HH:MM:SS" from the time string (which is always "1970-01-01THH:MM:00.000Z")
  const timeStr = booking.time.slice(11, 16); // "12:00"
  console.log('booking.time:', booking.time);
  return `${booking.username} ${booking.service_type} ${dateStr} ${timeStr}`;
}

const BookingDetails = ({ booking }: { booking: Booking }) => (
  <div>
    <h2>Rezerwacja ID {booking.id}</h2>
    <div>{formatBooking(booking)}</div>
  </div>
);

export default BookingDetails;