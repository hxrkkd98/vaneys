// components/ui/AppTable.tsx
"use client";

import DataTable, { TableColumn } from "react-data-table-component";

// 1. Move Custom Styles Here (Reusable)
const customStyles = {
  headCells: {
    style: {
      fontSize: '12px',
      fontWeight: '600',
      textTransform: 'uppercase' as const,
      color: '#64748B',
      backgroundColor: '#F8FAFC',
      paddingLeft: '24px',
      paddingRight: '24px',
    },
  },
  cells: {
    style: {
      paddingLeft: '24px',
      paddingRight: '24px',
    },
  },
  rows: {
    style: {
      minHeight: '72px',
      '&:hover': { backgroundColor: '#F8FAFC' },
    },
  },
  pagination: {
    style: { borderTop: '1px solid #E2E8F0' },
  },
};

// 2. Define Props for the Wrapper
interface AppTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  isLoading: boolean;
  totalRows: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerRowsChange: (newPerPage: number, page: number) => void;
}

// 3. The Generic Component
export default function AppTable<T>({
  columns,
  data,
  isLoading,
  totalRows,
  perPage,
  onPageChange,
  onPerRowsChange,
}: AppTableProps<T>) {
  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm bg-white relative">
      
      {/* Reusable Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center backdrop-blur-[1px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      )}

      <DataTable
        columns={columns}
        data={data}
        // --- Pagination Props ---
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        paginationPerPage={perPage}
        onChangePage={onPageChange}
        onChangeRowsPerPage={onPerRowsChange}
        paginationRowsPerPageOptions={[5, 10, 15, 20]} // Standardize options here
        
        // --- Styling Props ---
        customStyles={customStyles}
        highlightOnHover
        responsive
        
        // --- Empty State ---
        noDataComponent={
          <div className="p-10 text-slate-700">
            No records found
          </div>
        }
      />
    </div>
  );
}