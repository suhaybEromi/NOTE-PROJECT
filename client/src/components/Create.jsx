import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../api/Api";
import { Col, Container, Row, Form } from "react-bootstrap";

export default function Create() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [insertData, setInsertData] = useState({
    note_title: "",
    note_body: "",
    note_date: "",
    note_image: "",
  });

  const handleChange = e => {
    setInsertData({ ...insertData, [e.target.name]: e.target.value });
  };

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("note_title", insertData.note_title);
    formData.append("note_body", insertData.note_body);
    formData.append("note_date", insertData.note_date);
    formData.append("file", file);
    try {
      await Api.post("/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setInsertData({
        note_title: "",
        note_body: "",
        note_date: "",
        note_image: "",
      });
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <Container className="mt-2">
        <Row className="p-3 justify-content-center">
          <Col xs="11" sm="11" md="7" lg="6">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  name="note_title"
                  value={insertData.note_title}
                  placeholder="Enter Title"
                  required
                />
                <br />
                <Form.Label>Text</Form.Label>
                <Form.Control
                  type="text"
                  as="textarea"
                  rows={4}
                  onChange={handleChange}
                  name="note_body"
                  value={insertData.note_body}
                  placeholder="Enter Text"
                  required
                />
                <br />
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  onChange={handleChange}
                  name="note_date"
                  value={insertData.note_date}
                  placeholder="Enter Date"
                  required
                />
                <br />
                <Form.Label>Select The Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleFileChange}
                  name="note_image"
                  required
                />
              </Form.Group>
              <button className="btn btn-lg btnn">Submit</button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
