import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Api from "../api/Api.jsx";
import { Link } from "react-router-dom";
import videoLoading from "../assets/img/animation.webm";
import { MdOutlineDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [showData, setShowData] = useState([]);

  const handleDelete = async note_id => {
    const deleteConfirm = window.confirm(
      "Are you sure you want to delete this note?",
    );
    if (deleteConfirm) {
      setLoading(true);
      try {
        await Api.delete(`/delete/${note_id}`);
        setShowData(prevData =>
          prevData.filter(note => note.note_id !== note_id),
        );
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

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

  if (loading) {
    return (
      <div className="loading-container">
        <video autoPlay loop muted className="loading-video">
          <source src={videoLoading} type="video/webm" />
        </video>
      </div>
    );
  }

  return (
    <>
      <Container>
        <Row className="justify-content-end d-flex align-items-start">
          <Col xs="auto">
            <Link to="/create">
              <button className="fs-5 btn btnn btn-lg fw-bold mt-3 mb-5">
                Add Note
              </button>
            </Link>
          </Col>
        </Row>
        <div className="border border-0">
          <Row className="justify-content-center">
            {showData.length == 0 ? (
              <span className="text-uppercase fs-4 text-center mt-5">
                No notes have been added
              </span>
            ) : (
              showData.map(data => (
                <Col key={data.note_id} xs="12" sm="12" md="6" lg="4" xl="3">
                  <Card>
                    <Card.Img
                      className="card-img-top"
                      src={`http://localhost:3000/uploads/${data.note_image}`}
                    />
                    <Card.Body>
                      <Card.Title className="text-uppercase">
                        {data.note_title}
                      </Card.Title>
                      <br />
                      <textarea
                        rows={4}
                        defaultValue={data.note_body}
                        className="border-0 text-muted"
                      />
                    </Card.Body>
                    <Card.Footer className="text-bg-light">
                      {data.note_date}
                    </Card.Footer>
                    <div className="d-flex ms-auto">
                      <Link to={`/update/${data.note_id}`}>
                        <button className="btn">
                          <BiEdit className="fs-3 text-primary border-0" />
                        </button>
                      </Link>
                      <button
                        className="btn"
                        onClick={() => handleDelete(data.note_id)}
                      >
                        <MdOutlineDelete className="fs-3 text-danger border-0" />
                      </button>
                    </div>
                  </Card>
                  <br />
                  <br />
                  <br />
                </Col>
              ))
            )}
          </Row>
        </div>
      </Container>
    </>
  );
}
