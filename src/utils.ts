import { IFilter, ISorter } from "./types";
import { IItem } from "./api";

export function toDateAgo(date: Date): number {
  return Math.ceil((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
}

export function genericSort<T>(objectA: T, objectB: T, sorter: ISorter<T>) {
  const result = () => {
    if (objectA[sorter.property] > objectB[sorter.property]) {
      return 1;
    } else if (objectA[sorter.property] < objectB[sorter.property]) {
      return -1;
    } else {
      return 0;
    }
  };

  return sorter.property === "DateCreated" ? result() * -1 : result();
}

export function genericFilter(object: IItem, filters: Array<IFilter>) {
  if (filters.length === 0) {
    return true;
  }

  return filters.every((filter) => {
    if (filter.property === "none") {
      return object.Owners.length ? !object.Owners : object.Owners;
    }

    if (filter.property === "single") {
      return object.Owners.length === 1 ? object.Owners : !object.Owners;
    }

    if (filter.property === "more") {
      return object.Owners.length >= 2 ? object.Owners : !object.Owners;
    }

    return object.Owners;
  });
}
