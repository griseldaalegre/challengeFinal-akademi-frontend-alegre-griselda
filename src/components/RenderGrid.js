import React from "react";

const GridItems = ({
  items = [],
  renderItem, 
}) => {

  return (
    <div className="ui grid">
      {items.map((item) => (
        <div key={item._id} className="four wide column">
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
};

export default GridItems;
