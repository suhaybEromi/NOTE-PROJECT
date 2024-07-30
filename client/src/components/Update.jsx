import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Container, Form, Row } from "react-bootstrap";
import Api from "../api/Api";

export default function Update() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updateData, setUpdateData] = useState({
    note_title: "",
    note_body: "",
    note_date: "",
  });

  const handleChange = e => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("note_title", updateData.note_title);
    formData.append("note_body", updateData.note_body);
    formData.append("note_date", updateData.note_date);
    try {
      await Api.put(`/update/${id}`, formData);
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const handleShow = async () => {
      try {
        const response = await Api.get(`/get/${id}`);
        setUpdateData({
          note_title: response.data.note_title || "",
          note_body: response.data.note_body || "",
          note_date: response.data.note_date || "",
        });
      } catch (err) {
        console.log(err.message);
      }
    };
    handleShow();
  }, [id]);

  return (
    <div>
      <Container className="mt-2">
        <Row className="p-3 justify-content-center">
          <Col xs="11" sm="11" md="7" lg="6">
            <Form onSubmit={handleUpdate}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="note_title"
                  placeholder="Enter Title"
                  value={updateData.note_title}
                  onChange={handleChange}
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
                  value={updateData.note_body}
                  onChange={handleChange}
                  required
                />
                <br />
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="note_date"
                  placeholder="Enter Date"
                  value={updateData.note_date}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <button className="btn btn-lg btnn" type="submit">
                Update
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
