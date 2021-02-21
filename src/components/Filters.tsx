import * as React from "react";
import { FilterItems, IFiltersProps } from "../types";

export function Filters<T>(props: IFiltersProps<T>) {
  const { filters, onChangeFilter } = props;

  const getChecked = (str: FilterItems) => {
    const x = filters.filter((item) => item.property === str);
    return x[0].checked;
  };

  return (
    <div className="Filter">
      <div className="item item-title"> Фильтр по владельцам</div>
      <div className="item">
        <input
          type="checkbox"
          id="checkAll"
          value="checkAll"
          checked={filters.every((f) => f.checked)}
          onChange={(event) =>
            onChangeFilter("checkAll" as keyof T, event.target.checked)
          }
        />
        <label htmlFor="checkAll">Все</label>
      </div>
      <div className="item">
        <input
          type="checkbox"
          id="none"
          name="none"
          checked={getChecked("none")}
          onChange={(event) =>
            onChangeFilter("none" as keyof T, event.target.checked)
          }
        />
        <label htmlFor="none">Без владельцев</label>
      </div>
      <div className="item">
        <input
          type="checkbox"
          id="single"
          name="single"
          checked={getChecked("single")}
          onChange={(event) =>
            onChangeFilter("single" as keyof T, event.target.checked)
          }
        />
        <label htmlFor="single">Один владелец</label>
      </div>
      <div className="item">
        <input
          type="checkbox"
          id="more"
          name="more"
          checked={getChecked("more")}
          onChange={(event) =>
            onChangeFilter("more" as keyof T, event.target.checked)
          }
        />
        <label htmlFor="more">Два и более владельцев</label>
      </div>
    </div>
  );
}
