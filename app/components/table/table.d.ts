export interface TableProps<T> {
  data?: T[];
  columns: TableColumn[];
  loading?: boolean;
  filters?: any;

  config?: TableConfig;
}

export interface TableSlots {
  toolbar(props: { tableLoading: boolean }): void;
  head(props: { config: TableConfig; columns: TableColumn[]; tableLoading: boolean }): void;
  body(props: { config: TableConfig; columns: TableColumn[]; tableLoading: boolean; renderData: T[] }): void;
  loading(props: { config: TableConfig }): void;
  "no-results"(props: { config: TableConfig; columns: TableColumn[] }): void;
}

export interface TableRowProps<T> {
  data: T;
  columns: TableColumn[];
  to?: string;

  // Config
  cellPadding?: "normal" | "compact" | "none";
  hoverable?: boolean;
}

export interface TableRowEmits {
  (e: "click", data: any): void;
}

export interface TableConfig {
  cellPadding?: "normal" | "compact" | "none";
  hoverable?: boolean;
  noResultsText?: string;
  amountOfLoadingRows?: number;
}

export interface TableColumn {
  id: string;
  label: string;
  sortable?: boolean;
  sortKey?: string;
  responsive?: "sm" | "md" | "lg" | "xl" | "2xl";
  class?: string | Record<string, boolean | string>;
}
