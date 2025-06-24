import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import './UpdateStudent.css';

function UpdateStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:9099/students/${id}`)
      .then(res => res.json())
      .then(data => setFormData(data))
      .catch(() => setMessage({ type: 'error', text: 'Failed to load student data' }));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:9099/students/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (res.ok) {
          setMessage({ type: 'success', text: 'Student updated successfully' });
          setTimeout(() => navigate('/view-students'), 2000);
        } else {
          setMessage({ type: 'error', text: 'Update failed' });
        }
      })
      .catch(() => setMessage({ type: 'error', text: 'Update failed' }));
  };

  return (
    <div className="container-style">
      <div>
        {message && (
          <Alert variant={message.type === 'success' ? 'success' : 'danger'}>
            {message.text}
          </Alert>
        )}
        <h2>Update Student</h2>
        <Form className="form-style" onSubmit={handleUpdate}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">Update</Button>
        </Form>
      </div>
    </div>
  );
}

export default UpdateStudent;
