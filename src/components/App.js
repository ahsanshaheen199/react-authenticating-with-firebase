import Signup from './Signup'
import { Col, Container, Row } from 'react-bootstrap'
import {AuthProvider} from '../contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Container>
        <Row className="justify-content-center">
          <Col lg={6}>
            <Signup />
          </Col>
        </Row>
      </Container>
    </AuthProvider>
  );
}

export default App;
