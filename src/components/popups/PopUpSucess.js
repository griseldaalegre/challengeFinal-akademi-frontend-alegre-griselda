import React, { useEffect, useState } from "react";

const PopUpSuccess = ({ header = "¡Éxito!", message }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!show) return null;

  return (
    <div className="ui success message">
      <div className="header">{header}</div>
      <p>{message}</p>
    </div>
  );
};

export default PopUpSuccess;
