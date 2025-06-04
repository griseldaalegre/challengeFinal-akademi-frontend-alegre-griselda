import React from "react";

const ListItems = ({
  items = [],
  renderItem, //enntidad a dibujar
}) => {
  return (
    <div className="ui middle aligned divided list">
      {items.map((item) => (
        <div key={item._id} className="item">
          <div className="right floated content"></div>
          <p> {renderItem(item)}</p>
        </div>
      ))}
    </div>
  );
};

export default ListItems;
