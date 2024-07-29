import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

export default function Update() {
  const [showData, setShowData] = useState([]);

  useEffect(() => {
    const handleShow = async () => {
      setLoading(true);
      try {
        const response = await Api.get("/get");
        setShowData(response.data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    handleShow();
  }, []);

  return (
    <div>
      <Container className="mt-2">
        <Row className="p-3 justify-content-center">
          <Col xs="11" sm="11" md="7" lg="6">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="note_title"
                  placeholder="Enter Title"
                  required
                />
                <br />
                <Form.Label>Text</Form.Label>
                <Form.Control
                  type="text"
                  as="textarea"
                  rows={4}
                  name="note_body"
                  placeholder="Enter Text"
                  required
                />
                <br />
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="note_date"
                  placeholder="Enter Date"
                  required
                />
                <br />
                <Form.Label>Select The Image</Form.Label>
                <Form.Control type="file" name="note_image" required />
              </Form.Group>
              <button className="btn btn-lg btnn">Update</button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
