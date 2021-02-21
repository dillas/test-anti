export interface IListItems {
  loading: boolean;
  items: IItem[];
}

export interface ISorter<T> {
  property: Extract<keyof T, string | number | Date>;
}

export interface IFilter {
  property: FilterItems;
  checked: boolean;
}

export interface ISortersProps<T> {
  checked: keyof IItem;
  object: T;
  onChangeSorter: (sortProperty: keyof T) => void;
}

export interface IFiltersProps<T> {
  filters: Array<IFilter>;
  onChangeFilter: (filterProperty: keyof T, checked: boolean) => void;
}

export interface IInputFilterPrors {
  name: FilterItems;
  onChangeFilter: (filterProperty: keyof FilterItems, checked: boolean) => void;
}

export type FilterItems = "none" | "single" | "more";
