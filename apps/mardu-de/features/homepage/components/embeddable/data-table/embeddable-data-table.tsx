'use client';

import type { ComponentProps, CSSProperties, KeyboardEvent, ReactNode } from 'react';
import { useDeferredValue, useId, useState } from 'react';

import styles from './embeddable-data-table.module.css';

export type EmbeddableTableTheme = 'light' | 'dark' | 'auto';
export type EmbeddableTableDensity = 'comfortable' | 'compact';
export type EmbeddableTableColumnPriority = 'primary' | 'secondary' | 'tertiary';
export type EmbeddableTableBadgeTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';
export type EmbeddableTableSortDirection = 'ascending' | 'descending';

export interface EmbeddableTableCellContext {
  rowIndex: number;
  value: unknown;
}

export interface EmbeddableTableColumn<TData> {
  id: string;
  header: ReactNode;
  accessor?: keyof TData | ((row: TData) => unknown);
  render?: (row: TData, context: EmbeddableTableCellContext) => ReactNode;
  searchText?: (row: TData) => string;
  sortValue?: (row: TData) => string | number | Date | null | undefined;
  sortable?: boolean;
  sortLabel?: string;
  priority?: EmbeddableTableColumnPriority;
  align?: 'start' | 'center' | 'end';
  width?: string;
  cellClassName?: string;
}

export interface EmbeddableTableSearch<TData> {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  getRowText?: (row: TData) => string;
}

export interface EmbeddableTableLabels {
  loading: string;
  noResultsTitle: string;
  noResultsDescription: string;
  previousPage: string;
  nextPage: string;
  pageStatus: (page: number, pageCount: number) => string;
  resultCount: (count: number) => string;
  openRow: string;
}

export interface EmbeddableDataTableProps<TData> {
  title: ReactNode;
  description?: ReactNode;
  caption?: string;
  data: readonly TData[];
  columns: readonly EmbeddableTableColumn<TData>[];
  getRowId: (row: TData) => string;
  theme?: EmbeddableTableTheme;
  density?: EmbeddableTableDensity;
  className?: string;
  search?: EmbeddableTableSearch<TData> | false;
  pageSize?: number;
  loading?: boolean;
  toolbarActions?: ReactNode;
  footer?: ReactNode;
  emptyState?: ReactNode;
  labels?: Partial<EmbeddableTableLabels>;
  onRowClick?: (row: TData) => void;
  getRowLabel?: (row: TData) => string;
}

export interface EmbeddableTableBadgeProps {
  children: ReactNode;
  tone?: EmbeddableTableBadgeTone;
  className?: string;
}

const DEFAULT_LABELS: EmbeddableTableLabels = {
  loading: 'Daten werden geladen …',
  noResultsTitle: 'Keine passenden Einträge',
  noResultsDescription: 'Versuchen Sie einen anderen Suchbegriff.',
  previousPage: 'Vorherige Seite',
  nextPage: 'Nächste Seite',
  pageStatus: (page, pageCount) => `Seite ${page} von ${pageCount}`,
  resultCount: (count) => `${count} ${count === 1 ? 'Eintrag' : 'Einträge'}`,
  openRow: 'Eintrag öffnen',
};

function joinClassNames(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(' ');
}

function IconBase({ children, ...props }: ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

function SearchIcon(props: ComponentProps<'svg'>) {
  return (
    <IconBase {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </IconBase>
  );
}

function ChevronLeftIcon(props: ComponentProps<'svg'>) {
  return (
    <IconBase {...props}>
      <path d="m15 18-6-6 6-6" />
    </IconBase>
  );
}

function ChevronRightIcon(props: ComponentProps<'svg'>) {
  return (
    <IconBase {...props}>
      <path d="m9 18 6-6-6-6" />
    </IconBase>
  );
}

function SortIcon(props: ComponentProps<'svg'>) {
  return (
    <IconBase {...props}>
      <path d="m8 9 4-4 4 4M16 15l-4 4-4-4" />
    </IconBase>
  );
}

function getColumnValue<TData>(column: EmbeddableTableColumn<TData>, row: TData) {
  if (!column.accessor) return undefined;
  if (typeof column.accessor === 'function') return column.accessor(row);
  return row[column.accessor];
}

function renderPrimitiveValue(value: unknown): ReactNode {
  if (value === null || value === undefined || value === '') return '—';
  if (typeof value === 'string' || typeof value === 'number') return value;
  if (typeof value === 'boolean') return value ? 'Ja' : 'Nein';
  if (value instanceof Date) return value.toLocaleString();
  return String(value);
}

function getDefaultSearchText<TData>(row: TData, columns: readonly EmbeddableTableColumn<TData>[]) {
  return columns
    .flatMap((column) => {
      if (column.searchText) return column.searchText(row);
      const value = getColumnValue(column, row);
      if (typeof value === 'string' || typeof value === 'number') return String(value);
      return [];
    })
    .join(' ');
}

function normalizeSortValue(value: string | number | Date | null | undefined) {
  if (value instanceof Date) return value.getTime();
  return value ?? '';
}

function compareSortValues(
  left: string | number | Date | null | undefined,
  right: string | number | Date | null | undefined,
) {
  const normalizedLeft = normalizeSortValue(left);
  const normalizedRight = normalizeSortValue(right);
  if (typeof normalizedLeft === 'number' && typeof normalizedRight === 'number') {
    return normalizedLeft - normalizedRight;
  }
  return String(normalizedLeft).localeCompare(String(normalizedRight), undefined, {
    numeric: true,
    sensitivity: 'base',
  });
}

function isInteractiveTarget(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    Boolean(
      target.closest(
        'a, button, input, select, textarea, [role="button"], [role="checkbox"], [role="menuitem"]',
      ),
    )
  );
}

export function EmbeddableTableBadge({
  children,
  tone = 'neutral',
  className,
}: EmbeddableTableBadgeProps) {
  return (
    <span className={joinClassNames(styles.badge, className)} data-tone={tone}>
      <span className={styles.badgeDot} aria-hidden="true" />
      {children}
    </span>
  );
}

export function EmbeddableDataTable<TData>({
  title,
  description,
  caption,
  data,
  columns,
  getRowId,
  theme = 'auto',
  density = 'comfortable',
  className,
  search = false,
  pageSize = 0,
  loading = false,
  toolbarActions,
  footer,
  emptyState,
  labels: labelOverrides,
  onRowClick,
  getRowLabel,
}: EmbeddableDataTableProps<TData>) {
  const titleId = useId();
  const descriptionId = useId();
  const [internalSearchValue, setInternalSearchValue] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [sort, setSort] = useState<{
    columnId: string;
    direction: EmbeddableTableSortDirection;
  } | null>(null);
  const labels = { ...DEFAULT_LABELS, ...labelOverrides };
  const configuredSearch = search || undefined;
  const isSearchControlled = configuredSearch?.value !== undefined;
  const searchValue = isSearchControlled ? (configuredSearch?.value ?? '') : internalSearchValue;
  const deferredSearchValue = useDeferredValue(searchValue);
  const normalizedSearchValue = deferredSearchValue.trim().toLocaleLowerCase();

  const filteredRows = normalizedSearchValue
    ? data.filter((row) => {
        const rowText = configuredSearch?.getRowText
          ? configuredSearch.getRowText(row)
          : getDefaultSearchText(row, columns);
        return rowText.toLocaleLowerCase().includes(normalizedSearchValue);
      })
    : data.slice();

  const activeSortColumn = sort ? columns.find((column) => column.id === sort.columnId) : undefined;
  const sortedRows = activeSortColumn
    ? filteredRows.slice().sort((left, right) => {
        const getValue = activeSortColumn.sortValue
          ? activeSortColumn.sortValue
          : (row: TData) => getColumnValue(activeSortColumn, row) as string | number | Date;
        const comparison = compareSortValues(getValue(left), getValue(right));
        return sort?.direction === 'descending' ? -comparison : comparison;
      })
    : filteredRows;

  const normalizedPageSize = pageSize > 0 ? Math.max(1, Math.floor(pageSize)) : 0;
  const pageCount = normalizedPageSize
    ? Math.max(1, Math.ceil(sortedRows.length / normalizedPageSize))
    : 1;
  const safePageIndex = Math.min(pageIndex, pageCount - 1);
  const visibleRows = normalizedPageSize
    ? sortedRows.slice(
        safePageIndex * normalizedPageSize,
        safePageIndex * normalizedPageSize + normalizedPageSize,
      )
    : sortedRows;

  const handleSearchChange = (value: string) => {
    setPageIndex(0);
    if (!isSearchControlled) {
      setInternalSearchValue(value);
    }
    configuredSearch?.onChange?.(value);
  };

  const handleSort = (column: EmbeddableTableColumn<TData>) => {
    if (!column.sortable) return;
    setPageIndex(0);
    setSort((current) => {
      if (current?.columnId !== column.id) {
        return { columnId: column.id, direction: 'ascending' };
      }
      return {
        columnId: column.id,
        direction: current.direction === 'ascending' ? 'descending' : 'ascending',
      };
    });
  };

  const handleRowKeyDown = (event: KeyboardEvent<HTMLTableRowElement>, row: TData) => {
    if (!onRowClick || isInteractiveTarget(event.target)) return;
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    onRowClick(row);
  };

  return (
    <section
      className={joinClassNames(styles.root, className)}
      data-theme={theme}
      data-density={density}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      aria-busy={loading}
    >
      <header className={styles.header}>
        <div className={styles.headingGroup}>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
          {description ? (
            <p id={descriptionId} className={styles.description}>
              {description}
            </p>
          ) : null}
        </div>
        {toolbarActions ? <div className={styles.toolbarActions}>{toolbarActions}</div> : null}
      </header>

      {configuredSearch ? (
        <div className={styles.searchArea}>
          <label className={styles.searchField}>
            <span className={styles.searchLabel}>{configuredSearch.label ?? 'Suchen'}</span>
            <span className={styles.searchInputWrap}>
              <SearchIcon className={styles.searchIcon} />
              <input
                type="search"
                value={searchValue}
                onChange={(event) => handleSearchChange(event.target.value)}
                placeholder={configuredSearch.placeholder ?? 'Tabelle durchsuchen …'}
                className={styles.searchInput}
                readOnly={isSearchControlled && !configuredSearch.onChange}
              />
            </span>
          </label>
        </div>
      ) : null}

      <div className={styles.tableViewport}>
        <table className={styles.table}>
          <caption className={styles.srOnly}>
            {caption ?? (typeof title === 'string' ? title : 'Datentabelle')}
          </caption>
          <thead>
            <tr>
              {columns.map((column) => {
                const sortDirection = sort?.columnId === column.id ? sort.direction : undefined;
                const columnStyle: CSSProperties | undefined = column.width
                  ? { width: column.width }
                  : undefined;

                return (
                  <th
                    key={column.id}
                    scope="col"
                    data-priority={column.priority ?? 'secondary'}
                    data-align={column.align ?? 'start'}
                    style={columnStyle}
                    aria-sort={sortDirection ?? (column.sortable ? 'none' : undefined)}
                  >
                    {column.sortable ? (
                      <button
                        type="button"
                        className={styles.sortButton}
                        onClick={() => handleSort(column)}
                        aria-label={column.sortLabel ?? `Nach ${String(column.header)} sortieren`}
                      >
                        <span>{column.header}</span>
                        <SortIcon
                          className={styles.sortIcon}
                          data-active={Boolean(sortDirection)}
                        />
                      </button>
                    ) : (
                      column.header
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 4 }, (_, rowIndex) => (
                <tr key={`loading-${rowIndex}`} aria-hidden="true">
                  {columns.map((column) => (
                    <td
                      key={column.id}
                      data-priority={column.priority ?? 'secondary'}
                      data-align={column.align ?? 'start'}
                    >
                      <span className={styles.skeleton} />
                    </td>
                  ))}
                </tr>
              ))
            ) : visibleRows.length ? (
              visibleRows.map((row, rowIndex) => (
                <tr
                  key={getRowId(row)}
                  data-interactive={onRowClick ? 'true' : undefined}
                  tabIndex={onRowClick ? 0 : undefined}
                  aria-label={onRowClick ? (getRowLabel?.(row) ?? labels.openRow) : undefined}
                  onClick={(event) => {
                    if (!onRowClick || isInteractiveTarget(event.target)) return;
                    onRowClick(row);
                  }}
                  onKeyDown={(event) => handleRowKeyDown(event, row)}
                >
                  {columns.map((column) => {
                    const value = getColumnValue(column, row);
                    return (
                      <td
                        key={column.id}
                        data-priority={column.priority ?? 'secondary'}
                        data-align={column.align ?? 'start'}
                        className={column.cellClassName}
                      >
                        {column.render
                          ? column.render(row, { rowIndex, value })
                          : renderPrimitiveValue(value)}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className={styles.emptyCell}>
                  {emptyState ?? (
                    <div className={styles.emptyState}>
                      <strong>{labels.noResultsTitle}</strong>
                      <span>{labels.noResultsDescription}</span>
                    </div>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <footer className={styles.footer}>
        <span className={styles.resultCount}>{labels.resultCount(sortedRows.length)}</span>
        {footer ? <div className={styles.footerSlot}>{footer}</div> : null}
        {normalizedPageSize && pageCount > 1 ? (
          <nav className={styles.pagination} aria-label="Tabellenseiten">
            <span>{labels.pageStatus(safePageIndex + 1, pageCount)}</span>
            <button
              type="button"
              onClick={() => setPageIndex(Math.max(0, safePageIndex - 1))}
              disabled={safePageIndex === 0}
              aria-label={labels.previousPage}
            >
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              onClick={() => setPageIndex(Math.min(pageCount - 1, safePageIndex + 1))}
              disabled={safePageIndex === pageCount - 1}
              aria-label={labels.nextPage}
            >
              <ChevronRightIcon />
            </button>
          </nav>
        ) : null}
      </footer>
      <span className={styles.srOnly} aria-live="polite">
        {loading ? labels.loading : labels.resultCount(sortedRows.length)}
      </span>
    </section>
  );
}
