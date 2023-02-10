import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaSpaceShuttle } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const navigate = useNavigate();
  return (
    <Row>
      <Col
        md={6}
        className="d-flex justify-content-center align-items-center home__container-left"
      >
        <div>
          <h1>Share The world With Friends</h1>
          <p>
            Chat app which connect you to the world no matter whats your
            location
          </p>
          <Button variant="success" onClick={() => navigate('/login')}>
            Get Started <FaSpaceShuttle />
          </Button>
        </div>
      </Col>
      <Col md={6} className="d-flex home__container-right"></Col>
    </Row>
  );
}
