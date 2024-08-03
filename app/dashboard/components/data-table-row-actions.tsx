"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Button } from "@/registry/new-york/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
} from "@/registry/new-york/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/registry/new-york/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/new-york/ui/select";
import { names, statuses } from "../data/data";
import { complaintsSchema } from "../data/schema";
import toast from 'react-hot-toast';
import { useForm, Controller } from "react-hook-form";

interface DataTableRowActionsProps {
  row: Row<Complaint>;
  onEdit: (complaintId: string) => void;
  onDelete: (complaintId: string) => void;
  onRefresh?: () => void; // Optional prop
}

export function DataTableRowActions({
  row,
  onEdit,
  onDelete,
  onRefresh,
}: DataTableRowActionsProps) {
  const router = useRouter();
  const complaint = complaintsSchema.parse(row.original);
  const [showAssignDialog, setShowAssignDialog] = React.useState(false);
  const [users, setUsers] = React.useState<{ value: string, username: string }[]>([]);
  

  const dummyUsers = [
    { value: "user1", username: "Alice Johnson" },
    { value: "user2", username: "Bob Smith" },
    { value: "user3", username: "Carol White" },
    { value: "user4", username: "David Brown" },
    { value: "user5", username: "Emily Davis" },
  ];


  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      assignUser: "",
      status: ""
    }
  });
  
  const assignUser = watch("assignUser");
  const status = watch("status");

  React.useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, []);

  const handleEdit = () => {
    if (complaint.id) {
      router.push(`/update-complaint?id=${complaint.id}`);
    } else {
      console.error("Complaint ID is undefined");
    }
  };

  const handleDelete = async () => {
    const hasConfirmed = confirm("Are you sure you want to delete this complaint?");
    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/complaint/${complaint.id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete complaint");
        } else {
          toast.success("Complaint has been deleted!");
          if (onRefresh) {
            onRefresh();
          } else {
            router.refresh();
          }
        }
        if (onDelete) {
          onDelete(complaint.id);
        }
      } catch (error) {
        toast.error("Error deleting complaint: " + error.message);
      }
    }
  };

  const handleAssign = async () => {
    if (assignUser && status) {
        try {
            const response = await fetch(`/api/complaint/${complaint.id}/assign`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: assignUser, status }),
            });

            if (!response.ok) {
                throw new Error(`Failed to assign complaint: ${response.statusText}`);
            }

            toast.success(`Complaint assigned to ${assignUser} with status ${status}`);
            router.refresh();
            setShowAssignDialog(false);
        } catch (error) {
            toast.error(`Error assigning complaint: ${error.message}`);
        }
    } else {
        toast.error("Please select a user and status.");
    }
};

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex size-8 bg-slate-100 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onSelect={handleEdit}>Edit</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setShowAssignDialog(true)}>
            Assign Complaint
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Other</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={complaint.label}>
                {names.map((label) => (
                  <DropdownMenuRadioItem key={label.value} value={label.value}>
                    {label.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={handleDelete}>
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Assign Complaint Modal */}
      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Complaint</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(handleAssign)} className="space-y-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="assignUser" className="font-medium">Select Engineer</label>
                <Controller
                  name="assignUser"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value || ""}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an Engineer" />
                      </SelectTrigger>
                      {/* <SelectContent>
                        {users.length > 0 ? (
                          users.map((user) => (
                            <SelectItem key={user.value} value={user.value}>
                              {user.username}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="">No users available</SelectItem>
                        )}
                      </SelectContent> */}


                      <SelectContent>
                        {dummyUsers.map((user) => (
                          <SelectItem key={user.value} value={user.value}>
                            {user.username}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="status" className="font-medium">Select Status</label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value || ""}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.length > 0 ? (
                          statuses.map((statusOption) => (
                            <SelectItem key={statusOption.value} value={statusOption.value}>
                              {statusOption.label}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="">No statuses available</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAssignDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Assign
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
