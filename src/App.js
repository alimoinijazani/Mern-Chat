import './App.css';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navigation from './components/Navigation';
import Chat from './pages/Chat';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
