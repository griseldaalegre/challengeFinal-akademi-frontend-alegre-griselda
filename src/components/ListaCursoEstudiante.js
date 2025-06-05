import React, { useState } from "react";
import { Link } from "react-router-dom";
const ListItems = ({
  items = [],
  renderItem, //enntidad a dibujar
}) => {
  const [itemDetalle, setitemDetalle] = useState(false);



  return (
    <div className="ui middle aligned divided list">
      {items.map((item) => (
        <div key={item._id} className="item">
          <div className="right floated content">
           <Link
              to={`/student/courses/${item._id}`}
              className="right floated content"
            >
              <div className="ui button">Ver Detalle</div>
            </Link>
          </div>
          {renderItem(item)}
        </div>
      ))}


    </div>
  );
};

export default ListItems;
