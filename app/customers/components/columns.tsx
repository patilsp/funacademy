"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/registry/new-york/ui/badge"
import { Checkbox } from "@/registry/new-york/ui/checkbox"

import { names, emails, phones, statuses } from "../data/data"
import { Customer } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<Customer>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]" 
      />
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer ID" />
    ),
    cell: ({ row }) => {
      const id = row.getValue("id");
      const formattedId = Number.isInteger(id) ? `CS-${id}` : `CS-${parseInt(id, 12)}`;
      return <div className="w-[80px]">{formattedId}</div>;
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Name" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email ID" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("email")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("phone")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Address" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("address")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "area",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer City" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("area")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "pincode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PinCode" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("pincode")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <div className="rounded bg-slate-300 p-1">{row.getValue("status")}</div>,
    enableSorting: true,
    enableHiding: true,
  },

  
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
