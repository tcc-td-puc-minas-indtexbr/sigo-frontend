import React from "react";

const Spinner: React.FC = () => (
  <div className="spinner-border text-primary" role="status">
    <span className="sr-only">Carregando...</span>
  </div>
);

export default Spinner;
