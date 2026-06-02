import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Phone,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";

import { toast } from "sonner";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getBorrowers,
  createBorrower,
  deleteBorrower,
  updateBorrower,
} from "@/lib/api/borrowers";
export const Route = createFileRoute("/dashboard/borrowers")({
  component: BorrowersPage,
});

function BorrowersPage() {
  const queryClient = useQueryClient();
  const deleteBorrowerMutation =
  useMutation({
    mutationFn: deleteBorrower,

    onSuccess: () => {
      toast.success(
        "Borrower deleted"
      );

      queryClient.invalidateQueries({
        queryKey: ["borrowers"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.message ||
        "Cannot delete borrower"
      );
    },
  });
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
 const [editingBorrower, setEditingBorrower] =
  useState<any>(null);
  const user = JSON.parse(
  localStorage.getItem("user") || "{}"
);
  const {
  data: borrowersData = [],
  isLoading,
} = useQuery({
  queryKey: [
    "borrowers",
    user?.dbUser?.id,
  ],

  queryFn: () =>
    getBorrowers(
      user.dbUser.id
    ),
});

  const createBorrowerMutation = useMutation({
    mutationFn: createBorrower,

    onSuccess: () => {
      toast.success("Borrower created successfully");

      queryClient.invalidateQueries({
        queryKey: ["borrowers"],
      });

      setOpen(false);
    },

    onError: (error) => {
      console.error(error);

      toast.error("Failed to create borrower");
    },
  });
const updateBorrowerMutation =
  useMutation({
    mutationFn: ({
      id,
      data,
    }: any) =>
      updateBorrower(
        id,
        data
      ),

    onSuccess: () => {
      toast.success(
        "Borrower updated"
      );

      queryClient.invalidateQueries({
        queryKey: ["borrowers"],
      });

      setEditingBorrower(null);
    },

    onError: () => {
      toast.error(
        "Update failed"
      );
    },
  });
  const list = borrowersData ?? [];

  const filtered = useMemo(() => {
    return list.filter((b: any) => {
      return (
        !q ||
        b.name?.toLowerCase().includes(q.toLowerCase()) ||
        String(b.id).includes(q)
      );
    });
  }, [list, q]);

async function addBorrower(form: FormData) {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const name = String(
    form.get("name") || ""
  );

  const phone = String(
    form.get("phone") || ""
  );

  const address = String(
    form.get("address") || ""
  );

  const aadhaar = String(
    form.get("aadhaar") || ""
  );

  createBorrowerMutation.mutate({
    lender_id:
      user.dbUser.id,

    name,
    phone,
    address,
    aadhaar,
  });
}
  if (isLoading) {
    return (
      <div className="p-6">
        Loading borrowers...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            Borrowers
          </h1>

          <p className="text-sm text-muted-foreground">
            {filtered.length} of {list.length} accounts
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground glow hover:opacity-90">
              <Plus className="mr-1.5 h-4 w-4" />
              Add borrower
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display">
                New Borrower
              </DialogTitle>

              <DialogDescription>
                Enter borrower details.
              </DialogDescription>
            </DialogHeader>

            <form
              className="grid gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                addBorrower(
                  new FormData(e.currentTarget)
                );
              }}
            >
              <div className="grid gap-1.5">
                <Label htmlFor="name">
                  Full Name
                </Label>

                <Input
                  id="name"
                  name="name"
                  placeholder="Rahul Sharma"
                  required
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="phone">
                  Phone
                </Label>

                <Input
                  id="phone"
                  name="phone"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="address">
                  Address
                </Label>

                <Input
                  id="address"
                  name="address"
                  placeholder="Delhi"
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="aadhaar">
                  Aadhaar
                </Label>

                <Input
                  id="aadhaar"
                  name="aadhaar"
                  placeholder="123412341234"
                />
              </div>

              <DialogFooter className="mt-2">
                <Button
                  type="submit"
                  disabled={
                    createBorrowerMutation.isPending
                  }
                  className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
                >
                  {createBorrowerMutation.isPending
                    ? "Creating..."
                    : "Create Borrower"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <Dialog
  open={!!editingBorrower}
  onOpenChange={() =>
    setEditingBorrower(null)
  }
>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>
        Edit Borrower
      </DialogTitle>

      <DialogDescription>
        Update borrower details
      </DialogDescription>
    </DialogHeader>

    {editingBorrower && (
      <form
        className="grid gap-3"
        onSubmit={(e) => {
          e.preventDefault();

          const form =
            new FormData(
              e.currentTarget
            );

          updateBorrowerMutation.mutate({
            id: editingBorrower.id,

            data: {
              name: form.get("name"),
              phone: form.get("phone"),
              address: form.get("address"),
              aadhaar: form.get("aadhaar"),
            },
          });
        }}
      >
        <div className="grid gap-1.5">
          <Label>Name</Label>

          <Input
            name="name"
            defaultValue={
              editingBorrower.name
            }
          />
        </div>

        <div className="grid gap-1.5">
          <Label>Phone</Label>

          <Input
            name="phone"
            defaultValue={
              editingBorrower.phone
            }
          />
        </div>

        <div className="grid gap-1.5">
          <Label>Address</Label>

          <Input
            name="address"
            defaultValue={
              editingBorrower.address
            }
          />
        </div>

        <div className="grid gap-1.5">
          <Label>Aadhaar</Label>

          <Input
            name="aadhaar"
            defaultValue={
              editingBorrower.aadhaar
            }
          />
        </div>

        <DialogFooter>
          <Button
            type="submit"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </form>
    )}
  </DialogContent>
</Dialog>
      </div>

      <div className="relative flex-1 min-w-[240px]">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name or ID..."
          className="pl-9"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/70 backdrop-blur">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-3 text-left">
                Borrower
              </th>

              <th className="px-5 py-3 text-left">
                Contact
              </th>

              <th className="px-5 py-3 text-right">
                Address
              </th>

              <th className="px-5 py-3 text-right">
                Aadhaar
              </th>

              <th className="px-5 py-3 text-right">
                Status
              </th>

              <th className="px-5 py-3"></th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((b: any, i: number) => (
              <motion.tr
                key={b.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.25,
                  delay: i * 0.02,
                }}
                className="border-t border-border/40 hover:bg-secondary/30"
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary/30 to-accent/30 text-xs font-semibold">
                      {b.name
                        ?.split(" ")
                        .map((s: string) => s[0])
                        .slice(0, 2)
                        .join("")}
                    </div>

                    <div>
                      <div className="font-medium">
                        {b.name}
                      </div>

                      <div className="text-xs text-muted-foreground">
                        ID #{b.id}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-3.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-3 w-3" />
                    {b.phone || "-"}
                  </div>
                </td>

                <td className="px-5 py-3.5 text-right">
                  {b.address || "-"}
                </td>

                <td className="px-5 py-3.5 text-right">
                  {b.aadhaar || "-"}
                </td>

                <td className="px-5 py-3.5 text-right">
                  <Badge variant="outline">
                    Active
                  </Badge>
                </td>
<td className="px-5 py-3.5 text-right flex gap-2 justify-end">

  <Button
    variant="ghost"
    size="sm"
    onClick={() => {
      if (
        confirm(`Delete ${b.name}?`)
      ) {
        deleteBorrowerMutation.mutate(
          b.id
        );
      }
    }}
  >
    Delete
  </Button>

  <Button
    size="sm"
    onClick={() => {
      console.log(b);
      setEditingBorrower(b);
    }}
  >
    Edit
  </Button>

</td>
              </motion.tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-10 text-center text-sm text-muted-foreground"
                >
                  No borrowers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

