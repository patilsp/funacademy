import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Complaint } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<Complaint>[] = [
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
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User Name" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
    enableSorting: true,
    enableHiding: false,
  },

  {
    accessorKey: "complaintType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type of Issue" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("complaintType")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status");
      let badgeColor = "bg-gray-200";

      switch (status) {
        case "Warranty":
          badgeColor = "bg-blue-500";
          break;
        case "Completed":
          badgeColor = "bg-green-500";
          break;
        case "Cancelled":
          badgeColor = "bg-red-500";
          break;
        case "Out Of Warranty":
          badgeColor = "bg-yellow-500";
          break;
        default:
          badgeColor = "bg-gray-200";
      }

      return (
        <Badge className={`flex w-32 justify-center rounded py-2 text-center text-white ${badgeColor}`}>
          {status}
        </Badge>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
];
