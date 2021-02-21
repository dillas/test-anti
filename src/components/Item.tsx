import React from "react";
import { IItem } from "../api";
import { toDateAgo } from "../utils";

const Item: React.FC<IItem> = ({
  Name,
  DateCreated,
  Owners = ["нет"],
  Price,
}) => {
  return (
    <div className="Items">
      <div className="item item--price">
        <span className="item-label">Цена</span>
        {Price} ₽
      </div>

      <div className="item item--name">
        <span className="item-label">Имя</span>
        {Name}
      </div>
      <div className="item item--owner">
        <span className="item-label">Владельцы</span>
        {Owners.length !== 0 ? Owners.join(", ") : "нет"}
      </div>
      <div className="item item--date">
        <span className="item-label">добавленно</span>
        {toDateAgo(DateCreated)} дн. назад
      </div>
    </div>
  );
};

export default Item;
