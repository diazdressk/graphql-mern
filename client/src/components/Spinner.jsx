import React from 'react';

export default function Spinner() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <span className="spinner-border" role="status"></span>
      <span className="sr-only"> Loading...</span>
    </div>
  );
}
