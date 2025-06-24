import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import './AddStudent.css';
import NavBar from'./NavBar' // Make sure the path is correct

function BasicExample() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:9099/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.ok) {
        setMessage({ type: 'success', text: 'New student added successfully' });
      } else {
        setMessage({ type: 'error', text: 'Failed to add student' });
      }
      setTimeout(() => setMessage(null), 2000);
    })
    .catch(() => {
      setMessage({ type: 'error', text: 'Failed to add student' });
      setTimeout(() => setMessage(null), 2000);
    });

    console.log('Form submitted:', formData);
  };

  return (
    <div className="container-style">
      <div>
        {message && (
          <Alert
            variant={message.type === 'success' ? 'success' : 'danger'}
            className="message-style"
          >
            {message.text}
          </Alert>
        )}
        <Form className="form-style" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange = {handleChange}
              required
            />
            <Form.Text className="mb-3">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default BasicExample;
