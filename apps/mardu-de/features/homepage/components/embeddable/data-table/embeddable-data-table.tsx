'use client';

import {
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  Minus,
} from 'lucide-react';
import type { CSSProperties, KeyboardEvent, ReactNode } from 'react';
import { useDeferredValue, useEffect, useId, useRef, useState } from 'react';

import styles from './embeddable-data-table.module.css';

export type EmbeddableTableTheme = 'light' | 'dark' | 'auto';
export type EmbeddableTableDensity = 'comfortable' | 'compact';
export type EmbeddableTableColumnPriority = 'primary' | 'secondary' | 'tertiary';
export type EmbeddableTableBadgeTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';
export type EmbeddableTableSortDirection = 'ascending' | 'descending';
export type EmbeddableTableButtonVariant = 'default' | 'outline' | 'ghost';

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
  firstPage: string;
  lastPage: string;
  rowsPerPage: string;
  selectAll: string;
  selectRow: string;
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
  pageSizeOptions?: readonly number[];
  loading?: boolean;
  selectable?: boolean;
  toolbarFilters?: ReactNode;
  toolbarActions?: ReactNode;
  footer?: ReactNode;
  showResultCount?: boolean;
  emptyState?: ReactNode;
  labels?: Partial<EmbeddableTableLabels>;
  onRowClick?: (row: TData) => void;
  getRowLabel?: (row: TData) => string;
}

export interface EmbeddableTableBadgeProps {
  children: ReactNode;
  tone?: EmbeddableTableBadgeTone;
  className?: string;
  showIcon?: boolean;
}

export interface EmbeddableTableButtonProps {
  children?: ReactNode;
  icon?: ReactNode;
  variant?: EmbeddableTableButtonVariant;
  compact?: boolean;
  iconOnly?: boolean;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
}

const DEFAULT_LABELS: EmbeddableTableLabels = {
  loading: 'Daten werden geladen …',
  noResultsTitle: 'Keine passenden Einträge',
  noResultsDescription: 'Versuchen Sie einen anderen Suchbegriff.',
  previousPage: 'Vorherige Seite',
  nextPage: 'Nächste Seite',
  firstPage: 'Erste Seite',
  lastPage: 'Letzte Seite',
  rowsPerPage: 'Zeilen pro Seite',
  selectAll: 'Alle Zeilen auswählen',
  selectRow: 'Zeile auswählen',
  pageStatus: (page, pageCount) => `Seite ${page} von ${pageCount}`,
  resultCount: (count) => `${count} ${count === 1 ? 'Eintrag' : 'Einträge'}`,
  openRow: 'Eintrag öffnen',
};

const DEFAULT_PAGE_SIZES = [7, 10, 15, 30, 40, 50, 100] as const;

function joinClassNames(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(' ');
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

function TableSelectionCheckbox({
  checked,
  label,
  onChange,
}: {
  checked: boolean | 'mixed';
  label: string;
  onChange: (checked: boolean) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = checked === 'mixed';
  }, [checked]);

  return (
    <label className={styles.checkboxWrap}>
      <input
        ref={inputRef}
        type="checkbox"
        className={styles.checkbox}
        checked={checked === true}
        aria-label={label}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className={styles.checkboxIndicator} aria-hidden="true">
        {checked === 'mixed' ? <Minus /> : <Check />}
      </span>
    </label>
  );
}

export function EmbeddableTableBadge({
  children,
  tone = 'neutral',
  className,
  showIcon = true,
}: EmbeddableTableBadgeProps) {
  return (
    <span className={joinClassNames(styles.badge, className)} data-tone={tone}>
      {showIcon ? <CheckCircle2 aria-hidden="true" /> : null}
      {children}
    </span>
  );
}

export function EmbeddableTableButton({
  children,
  icon,
  variant = 'outline',
  compact = false,
  iconOnly = false,
  className,
  ariaLabel,
  onClick,
}: EmbeddableTableButtonProps) {
  const controlClassName = joinClassNames(
    styles.control,
    iconOnly && styles.iconControl,
    className,
  );
  const content = (
    <>
      {icon ? <span className={styles.controlIcon}>{icon}</span> : null}
      {children ? <span className={styles.controlLabel}>{children}</span> : null}
    </>
  );
  const dataProps = {
    'data-variant': variant,
    'data-compact': compact ? 'true' : undefined,
  };

  if (!onClick) {
    return (
      <span className={controlClassName} aria-hidden="true" {...dataProps}>
        {content}
      </span>
    );
  }

  return (
    <button
      type="button"
      className={controlClassName}
      aria-label={ariaLabel}
      onClick={onClick}
      {...dataProps}
    >
      {content}
    </button>
  );
}

export function EmbeddableTableVerifiedMark({ label = 'Bestätigt' }: { label?: string }) {
  return (
    <span className={styles.verifiedMark} title={label} aria-label={label}>
      <CheckCircle2 aria-hidden="true" />
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
  pageSizeOptions = DEFAULT_PAGE_SIZES,
  loading = false,
  selectable = false,
  toolbarFilters,
  toolbarActions,
  footer,
  showResultCount = false,
  emptyState,
  labels: labelOverrides,
  onRowClick,
  getRowLabel,
}: EmbeddableDataTableProps<TData>) {
  const titleId = useId();
  const descriptionId = useId();
  const [internalSearchValue, setInternalSearchValue] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(() =>
    pageSize > 0 ? Math.max(1, Math.floor(pageSize)) : 0,
  );
  const [selectedRowIds, setSelectedRowIds] = useState<ReadonlySet<string>>(() => new Set());
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

  const normalizedPageSize = currentPageSize > 0 ? currentPageSize : 0;
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
  const visibleRowIds = visibleRows.map(getRowId);
  const selectedVisibleCount = visibleRowIds.filter((id) => selectedRowIds.has(id)).length;
  const allVisibleSelected =
    visibleRowIds.length > 0 && selectedVisibleCount === visibleRowIds.length;
  const headerSelectionState = allVisibleSelected
    ? true
    : selectedVisibleCount > 0
      ? ('mixed' as const)
      : false;
  const hasToolbar = Boolean(configuredSearch || toolbarFilters || toolbarActions);

  const handleSearchChange = (value: string) => {
    setPageIndex(0);
    if (!isSearchControlled) setInternalSearchValue(value);
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

  const setVisibleSelection = (checked: boolean) => {
    setSelectedRowIds((current) => {
      const next = new Set(current);
      visibleRowIds.forEach((id) => (checked ? next.add(id) : next.delete(id)));
      return next;
    });
  };

  const setRowSelection = (rowId: string, checked: boolean) => {
    setSelectedRowIds((current) => {
      const next = new Set(current);
      if (checked) next.add(rowId);
      else next.delete(rowId);
      return next;
    });
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
        <h2 id={titleId} className={styles.title}>
          {title}
        </h2>
        {description ? (
          <p id={descriptionId} className={styles.description}>
            {description}
          </p>
        ) : null}
      </header>

      <div className={styles.tableBlock}>
        {hasToolbar ? (
          <div className={styles.toolbar}>
            <div className={styles.toolbarLeading}>
              {configuredSearch ? (
                <input
                  type="search"
                  value={searchValue}
                  onChange={(event) => handleSearchChange(event.target.value)}
                  placeholder={configuredSearch.placeholder ?? 'Tabelle durchsuchen …'}
                  aria-label={configuredSearch.label ?? 'Suchen'}
                  className={styles.searchInput}
                  readOnly={isSearchControlled && !configuredSearch.onChange}
                />
              ) : null}
              {toolbarFilters}
            </div>
            {toolbarActions ? <div className={styles.toolbarActions}>{toolbarActions}</div> : null}
          </div>
        ) : null}

        <div className={styles.tableViewport}>
          <table className={styles.table}>
            <caption className={styles.srOnly}>
              {caption ?? (typeof title === 'string' ? title : 'Datentabelle')}
            </caption>
            <thead>
              <tr>
                {selectable ? (
                  <th className={styles.selectionCell} scope="col">
                    <TableSelectionCheckbox
                      checked={headerSelectionState}
                      label={labels.selectAll}
                      onChange={setVisibleSelection}
                    />
                  </th>
                ) : null}
                {columns.map((column) => {
                  const sortDirection = sort?.columnId === column.id ? sort.direction : undefined;
                  const columnStyle: CSSProperties | undefined = column.width
                    ? { width: column.width }
                    : undefined;

                  return (
                    <th
                      key={column.id}
                      scope="col"
                      data-column-id={column.id}
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
                          <ChevronsUpDown
                            className={styles.sortIcon}
                            data-active={Boolean(sortDirection)}
                            aria-hidden="true"
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
                    {selectable ? (
                      <td className={styles.selectionCell}>
                        <span className={styles.skeletonCheckbox} />
                      </td>
                    ) : null}
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
                visibleRows.map((row, rowIndex) => {
                  const rowId = getRowId(row);
                  const isSelected = selectedRowIds.has(rowId);

                  return (
                    <tr
                      key={rowId}
                      data-interactive={onRowClick ? 'true' : undefined}
                      data-selected={isSelected ? 'true' : undefined}
                      tabIndex={onRowClick ? 0 : undefined}
                      aria-label={onRowClick ? (getRowLabel?.(row) ?? labels.openRow) : undefined}
                      onClick={(event) => {
                        if (!onRowClick || isInteractiveTarget(event.target)) return;
                        onRowClick(row);
                      }}
                      onKeyDown={(event) => handleRowKeyDown(event, row)}
                    >
                      {selectable ? (
                        <td className={styles.selectionCell}>
                          <TableSelectionCheckbox
                            checked={isSelected}
                            label={`${labels.selectRow}: ${rowIndex + 1}`}
                            onChange={(checked) => setRowSelection(rowId, checked)}
                          />
                        </td>
                      ) : null}
                      {columns.map((column) => {
                        const value = getColumnValue(column, row);
                        return (
                          <td
                            key={column.id}
                            data-column-id={column.id}
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
                  );
                })
              ) : (
                <tr>
                  <td colSpan={columns.length + (selectable ? 1 : 0)} className={styles.emptyCell}>
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
          {showResultCount ? (
            <span className={styles.resultCount}>{labels.resultCount(sortedRows.length)}</span>
          ) : null}
          {footer ? <div className={styles.footerSlot}>{footer}</div> : null}
          {normalizedPageSize ? (
            <div className={styles.paginationArea}>
              <label className={styles.pageSizeControl}>
                <span>{labels.rowsPerPage}</span>
                <select
                  value={normalizedPageSize}
                  onChange={(event) => {
                    setCurrentPageSize(Number(event.target.value));
                    setPageIndex(0);
                  }}
                >
                  {Array.from(new Set([...pageSizeOptions, normalizedPageSize]))
                    .sort((left, right) => left - right)
                    .map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                </select>
              </label>
              <span className={styles.pageStatus}>
                {labels.pageStatus(safePageIndex + 1, pageCount)}
              </span>
              <nav className={styles.pagination} aria-label="Tabellenseiten">
                <button
                  type="button"
                  onClick={() => setPageIndex(0)}
                  disabled={safePageIndex === 0}
                  aria-label={labels.firstPage}
                >
                  <ChevronsLeft />
                </button>
                <button
                  type="button"
                  onClick={() => setPageIndex(Math.max(0, safePageIndex - 1))}
                  disabled={safePageIndex === 0}
                  aria-label={labels.previousPage}
                >
                  <ChevronLeft />
                </button>
                <button
                  type="button"
                  onClick={() => setPageIndex(Math.min(pageCount - 1, safePageIndex + 1))}
                  disabled={safePageIndex === pageCount - 1}
                  aria-label={labels.nextPage}
                >
                  <ChevronRight />
                </button>
                <button
                  type="button"
                  onClick={() => setPageIndex(pageCount - 1)}
                  disabled={safePageIndex === pageCount - 1}
                  aria-label={labels.lastPage}
                >
                  <ChevronsRight />
                </button>
              </nav>
            </div>
          ) : null}
        </footer>
      </div>

      <span className={styles.srOnly} aria-live="polite">
        {loading ? labels.loading : labels.resultCount(sortedRows.length)}
      </span>
    </section>
  );
}
