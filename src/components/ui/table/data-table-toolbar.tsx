"use client";

"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import * as ReactTable from "@tanstack/react-table";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

const gender: { label: string; value: string }[] = [
  {
    label: "Male",
    value: "Male",
  },
  {
    label: "Female",
    value: "Female",
  }
];

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const globalFilterValue = table.getState().globalFilter ?? ""; // Get global filter state
  // Get selected rows
  const selectedRows = table.getSelectedRowModel().rows;

  // Delete handler
  async function handleDeleteSelected(selectedRows: ReactTable.Row<TData>[]) {
    const selectedIds = selectedRows.map(
      (row) => (row.original as { id: string }).id
    );
    console.log(selectedIds);
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          data-id="input-search"
          placeholder="Search all data..."
          value={globalFilterValue}
          onChange={(event) => table.setGlobalFilter(event.target.value)} // Set global filter
          className={`h-8 w-[150px] lg:w-[250px] `}
        />
        {table.getColumn("gender") && (
          <DataTableFacetedFilter
            column={table.getColumn("gender")}
            title="Gender"
            options={gender}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
        {/* delete button in this */}
        {selectedRows.length > 0 && (
          <Button
            variant="destructive"
            size={"sm"}
            onClick={() => handleDeleteSelected(selectedRows)}
          >
            {`Delete ${selectedRows.length} Selected`}
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
