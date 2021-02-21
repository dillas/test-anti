import * as React from "react";
import { ISortersProps } from "../types";

export default function Sorters<T>(props: ISortersProps<T>) {
  const { object, onChangeSorter, checked } = props;

  const hendleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeSorter(event.target.value as keyof T);
  };

  return (
    <div className="Sorter">
      {Object.keys(object)
        .filter((i) => i === "Price" || i === "DateCreated")
        .map((key) => {
          let label;
          if (key === "Price") label = "Самые дешёвые";
          else if (key === "DateCreated") label = "Самые новые";
          return (
            <div key={key} className="sorter-item">
              <input
                value={key}
                id={key}
                onChange={(event) => hendleOnChange(event)}
                type="radio"
                name="sorter"
                checked={checked === key}
              />
              <label htmlFor={key}>{label}</label>
            </div>
          );
        })}
    </div>
  );
}
