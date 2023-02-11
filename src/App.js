import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Navigation from './components/Navigation';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Signup from './pages/Signup';
function App() {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer position="bottom center" limit={1}></ToastContainer>
        <Navigation />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
