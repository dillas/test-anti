import React, { useEffect, useState } from "react";
import { api, IItem } from "./api";
import { ISorter, IFilter } from "./types";
import { genericSort } from "./utils";
import Sorters from "./components/Sorters";
import Item from "./components/Item";
import { Filters } from "./components/Filters";

function App() {
  const [lodingData, setLoadingData] = useState<boolean>(true);

  const [data, setData] = useState<IItem[]>([]);

  const [activeSorter, setActiveSorter] = useState<ISorter<IItem>>({
    property: "DateCreated",
  });

  const [activeFilters, setActiveFilters] = useState<Array<IFilter>>([
    { property: "none", checked: true },
    { property: "single", checked: true },
    { property: "more", checked: true },
  ]);

  const resultWidgets = data
    ?.filter((data) => {
      return activeFilters.every((filter) => {
        if (!filter.checked && filter.property === "none") {
          return !(data.Owners.length === 0) ? true : false;
        }

        if (!filter.checked && filter.property === "single") {
          return !(data.Owners.length === 1) ? true : false;
        }

        if (!filter.checked && filter.property === "more") {
          return !(data.Owners.length >= 2) ? true : false;
        }
        return true;
      });
    })
    .sort((widgetA, widgetB) =>
      genericSort<IItem>(widgetA, widgetB, activeSorter)
    );

  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      setData(await api.getItems());
      setLoadingData(false);
    };
    fetchData();
  }, []);

  if (!data || lodingData) return <p>Загрузка данных</p>;

  return (
    <div className="grid-container">
      <div className="sorter">
        <Sorters<IItem>
          object={data[0]}
          checked={activeSorter.property}
          onChangeSorter={(property) => {
            setActiveSorter({
              property,
            });
          }}
        />
      </div>
      <div className="items">
        {resultWidgets.length > 0 && (
          <>
            {resultWidgets.map((item) => (
              <Item key={item.ID + item.Name} {...item} />
            ))}
          </>
        )}
        {resultWidgets.length === 0 && <p>Не выбран фильтр</p>}
      </div>
      <div className="filter">
        <Filters
          filters={activeFilters}
          onChangeFilter={(changedFilterProperty, checked) => {
            if (changedFilterProperty === "checkAll") {
              setActiveFilters([
                ...activeFilters.map((f) => ({ ...f, checked })),
              ]);
            } else {
              setActiveFilters([
                ...activeFilters.filter(
                  (filter) => filter.property !== changedFilterProperty
                ),
                { property: changedFilterProperty, checked },
              ]);
            }
          }}
        />
      </div>
      <div className="footer">
        <button
          className="btn"
          onClick={async () => {
            setLoadingData(true);
            setData(await api.getItems());
            setLoadingData(false);
          }}
        >
          Обновить
        </button>
      </div>
    </div>
  );
}

export default App;
