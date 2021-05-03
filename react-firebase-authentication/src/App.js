import { Container } from "react-bootstrap";
import "./App.css";
import SignUp from "./Components/SignUp";

function App() {
  return (
    <Container
      className="d-flex align-items-center justfy-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <SignUp />
      </div>
    </Container>
  );
}

export default App;
