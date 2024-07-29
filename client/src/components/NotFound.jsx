import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col>
            <p className="fs-1 text-center">Oops!</p>
            <br />
            <p className="fs-2 text-center">This page doesn’t exist</p>
            <br />
            <p className="fs-3 text-center">
              Please check your URL or return to the main section.
            </p>
            <br />
            <div className="justify-content-center align-items-center d-flex mt-5">
              <button className="btn btnn btn-lg w-50">
                <Link className="text-decoration-none text-white fs-5" to="/">
                  Go Home
                </Link>
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
