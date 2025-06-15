import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Bookings from './pages/Bookings';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Project from './pages/Project';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/project" element={<Project />} />
      </Routes>
    </Router>
  );
}
export default App;