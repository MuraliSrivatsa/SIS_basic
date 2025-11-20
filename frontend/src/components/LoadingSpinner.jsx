 import React from 'react';
 import { Container } from 'react-bootstrap';
 const LoadingSpinner = () => {
  return (
    <Container className="spinner-container">
      <div className="text-center">
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading Student Information System...</p>
      </div>
    </Container>
  );
 };
 export default LoadingSpinner;