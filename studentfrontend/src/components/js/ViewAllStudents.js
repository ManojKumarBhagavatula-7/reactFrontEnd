import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./ViewAllStudents.css"; //
import { useNavigate } from 'react-router-dom';



function ViewStudents() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [filteredStudent, setFilteredStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:9099/students")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }
        return response.json();
      })
      .then((data) => setStudents(data))
      .catch((err) => setError(err.message));
  }, []);

  const handleSearch = () => {
    const result = students.find((s) => s.id?.toString() === searchId.trim());
    setFilteredStudent(result || null);
  };

  const handleClear = () => {
    setSearchId("");
    setFilteredStudent(null);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:9099/students/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setStudents((prev) => prev.filter((student) => student.id !== id));
          setFilteredStudent(null); // Clear filtered view if needed
        } else {
          alert("Failed to delete student");
        }
      })
      .catch(() => alert("Error deleting student"));
  };

  return (
    <div className="container-style">
      <div>
        {error && <Alert variant="danger">{error}</Alert>}
        <h2>All Students</h2>

        <Form className="mb-3" style={{ maxWidth: "400px" }}>
          <Form.Control
            type="text"
            placeholder="Search by ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <div className="mt-2 d-flex gap-2">
            <Button variant="primary" onClick={handleSearch}>
              Search
            </Button>
            <Button variant="secondary" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </Form>

        <Table striped bordered hover className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudent ? (
              <tr>
                <td>{filteredStudent.id}</td>
                <td>{filteredStudent.firstName}</td>
                <td>{filteredStudent.lastName}</td>
                <td>{filteredStudent.email}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() =>
                      navigate(`/update-student/${filteredStudent.id}`)
                    }
                    className="me-2"
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(filteredStudent.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ) : (
              students.map((student, index) => (
                <tr key={student.id || index}>
                  <td>{student.id}</td>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{student.email}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => navigate(`/update-student/${student.id}`)}
                      className="me-2"
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ViewStudents;
