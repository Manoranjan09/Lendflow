
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  Search,
  Plus,
  
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
  getBorrowerProfile,
  downloadBorrowerStatement,
  getBorrowerRisk,
  getBorrowerDocuments,
  uploadBorrowerDocument,
  viewDocument,
  deleteDocument,
} from "@/lib/api/borrowers";


export default function BorrowersPage() {
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
  const [
  selectedBorrower,
  setSelectedBorrower,
] = useState<number | null>(null);
const [uploadOpen, setUploadOpen] =
  useState(false);
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
const {
  data: borrowerProfile,
} = useQuery({
  queryKey: [
    "borrower-profile",
    selectedBorrower,
  ],

  queryFn: () =>
    getBorrowerProfile(
      selectedBorrower!
    ),

  enabled:
    !!selectedBorrower,
});
const {
  data: borrowerRisk,
} = useQuery({
  queryKey: [
    "borrower-risk",
    selectedBorrower,
  ],

  queryFn: () =>
    getBorrowerRisk(
      selectedBorrower!
    ),

  enabled:
    !!selectedBorrower,
});
const {
  data: documents = [],
} = useQuery({
  queryKey: [
    "documents",
    selectedBorrower,
  ],

  queryFn: () =>
    getBorrowerDocuments(
      selectedBorrower!
    ),

  enabled:
    !!selectedBorrower,
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
  const uploadDocumentMutation =
  useMutation({
    mutationFn: ({
      borrowerId,
      formData,
    }: any) =>
      uploadBorrowerDocument(
        borrowerId,
        formData
      ),

    onSuccess: () => {

      toast.success(
        "Document uploaded"
      );

      queryClient.invalidateQueries({
        queryKey: [
          "documents",
          selectedBorrower,
        ],
      });

      setUploadOpen(false);
    },
  });
  const deleteDocumentMutation =
  useMutation({
    mutationFn:
      deleteDocument,

    onSuccess: () => {

      toast.success(
        "Document deleted"
      );

      queryClient.invalidateQueries({
        queryKey: [
          "documents",
          selectedBorrower,
        ],
      });
    },

    onError: () => {
      toast.error(
        "Failed to delete document"
      );
    },
  });
  const list = borrowersData ?? [];

  const filtered = useMemo(() => {
    return list.filter((b: any) => {
      const borrowerCode = `BR-${String(
  b.id
).padStart(4, "0")}`;

return (
  !q ||
  b.name?.toLowerCase().includes(
    q.toLowerCase()
  ) ||
  borrowerCode
    .toLowerCase()
    .includes(q.toLowerCase()) ||
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

          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
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
  <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
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
  onClick={() =>
    setSelectedBorrower(
      b.id
    )
  }
                key={b.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.25,
                  delay: i * 0.02,
                }}
               className="border-t border-border/40 hover:bg-secondary/30 cursor-pointer"
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
    BR-{String(b.id).padStart(4, "0")}
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
  size="sm"
  variant="destructive"
  onClick={(e) => {

    e.stopPropagation();

    if (
      confirm("Delete borrower?")
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
  onClick={(e) => {

    e.stopPropagation();

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
      <Dialog
  open={!!selectedBorrower}
  onOpenChange={() =>
    setSelectedBorrower(null)
  }
>
  <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">

    <DialogHeader>
      <DialogTitle>
        Borrower Profile
      </DialogTitle>
    </DialogHeader>

    {borrowerProfile && (
      <div className="space-y-6">

        {/* Profile */}

        <div className="rounded-xl border p-3">
         <div className="flex items-start justify-between mb-4">

  <h3 className="text-3xl font-bold">
    {borrowerProfile.borrower.name}
  </h3>

 <div className="flex gap-2">

  <Button
    onClick={() =>
      downloadBorrowerStatement(
        borrowerProfile.borrower.id
      )
    }
    className="bg-gradient-to-r from-primary to-accent"
  >
    📄 Download Statement
  </Button>

  <Button
    variant="outline"
    onClick={() =>
      setUploadOpen(true)
    }
  >
    📤 Upload Document
  </Button>

</div>

</div>
          <p className="text-sm text-muted-foreground">
            📞 {borrowerProfile.borrower.phone}
          </p>

          <p className="text-sm text-muted-foreground">
            📍 {borrowerProfile.borrower.address}
          </p>

          <p className="text-sm text-muted-foreground">
            Aadhaar:
            {" "}
            {borrowerProfile.borrower.aadhaar}
          </p>
        </div>
{borrowerRisk && (
  <div
    className={`rounded-2xl border p-5 ${
      borrowerRisk.risk === "LOW"
        ? "border-green-500/40 bg-green-500/10"
        : borrowerRisk.risk === "MEDIUM"
        ? "border-yellow-500/40 bg-yellow-500/10"
        : "border-red-500/40 bg-red-500/10"
    }`}
  >
    <div className="flex items-center justify-between">

      <div>
        <div className="text-sm text-muted-foreground">
          AI Risk Analysis
        </div>

        <div className="mt-1 text-3xl font-bold">
          {borrowerRisk.score}/100
        </div>
      </div>

      <Badge
        className={
          borrowerRisk.risk === "LOW"
            ? "bg-green-500"
            : borrowerRisk.risk === "MEDIUM"
            ? "bg-yellow-500 text-black"
            : "bg-red-500"
        }
      >
        {borrowerRisk.risk} RISK
      </Badge>

    </div>

    <div className="mt-4 space-y-1 text-sm">

      {borrowerRisk.reasons.map(
        (
          reason: string,
          index: number
        ) => (
          <div key={index}>
            • {reason}
          </div>
        )
      )}
<div className="mt-5 border-t pt-4">

  <div className="mb-2 font-medium">
    AI Suggestions
  </div>

  <div className="space-y-2">

    {borrowerRisk.suggestions?.map(
      (
        suggestion: string,
        index: number
      ) => (
        <div
          key={index}
          className="rounded-lg border border-green-500/20 bg-green-500/5 p-2 text-sm text-green-400"
        >
          ✓ {suggestion}
        </div>
      )
    )}

  </div>

</div>
    </div>
  </div>
)}

        {/* Summary Cards */}

        <div className="grid md:grid-cols-4 gap-4">

          <div className="rounded-xl border p-4">
            <div className="text-xs text-muted-foreground">
              Total Loans
            </div>

            <div className="text-2xl font-bold">
              {borrowerProfile.total_loans}
            </div>
          </div>

          <div className="rounded-xl border p-4">
            <div className="text-xs text-muted-foreground">
              Borrowed
            </div>

            <div className="text-2xl font-bold">
              ₹
              {borrowerProfile.total_borrowed.toLocaleString()}
            </div>
          </div>

          <div className="rounded-xl border p-4">
            <div className="text-xs text-muted-foreground">
              Outstanding
            </div>

            <div className="text-2xl font-bold text-red-500">
              ₹
              {borrowerProfile.outstanding.toLocaleString()}
            </div>
          </div>

          <div className="rounded-xl border p-4">
            <div className="text-xs text-muted-foreground">
              Total Paid
            </div>

            <div className="text-2xl font-bold text-green-500">
              ₹
              {borrowerProfile.total_paid.toLocaleString()}
            </div>
          </div>

        </div>
{/* Timeline */}

<div>

  <h3 className="font-semibold mb-3">
    Timeline
  </h3>

  <div className="space-y-2">

    {borrowerProfile.loans.map(
      (loan: any) => (
        <div
          key={`loan-${loan.id}`}
          className="rounded-lg border p-3"
        >
          <div className="font-medium">
            💰 Loan Created
          </div>

          <div className="text-sm text-muted-foreground">
            Loan #{loan.id}
          </div>

          <div className="text-xs text-muted-foreground">
            Due: {loan.due_date}
          </div>
        </div>
      )
    )}

    {borrowerProfile.repayments.map(
      (r: any) => (
        <div
          key={`repayment-${r.id}`}
          className="rounded-lg border border-green-500/30 bg-green-500/5 p-3"
        >
          <div className="font-medium text-green-400">
            ✅ Repayment Received
          </div>

          <div>
            ₹{r.amount_paid.toLocaleString()}
          </div>

          <div className="text-xs text-muted-foreground">
            {r.payment_date}
          </div>
        </div>
      )
    )}

  </div>

</div>
      <div className="grid md:grid-cols-2 gap-6">
<div>

  <h3 className="font-semibold mb-3">
    Documents
  </h3>

  {documents.length === 0 ? (

    <div className="text-sm text-muted-foreground">
      No documents uploaded
    </div>

  ) : (

    documents.map(
      (doc: any) => (

        <div
          key={doc.id}
          className="mb-2 flex items-center justify-between rounded-lg border p-3"
        >

          <div>

            <div className="font-medium">
              📄 {doc.file_name}
            </div>

            <div className="text-xs text-muted-foreground">
              {doc.document_type}
            </div>

          </div>

         <div className="flex gap-2">

  <Button
    size="sm"
    onClick={() =>
      viewDocument(
        doc.id
      )
    }
  >
    View
  </Button>

  <Button
    size="sm"
    variant="destructive"
    onClick={() => {

      if (
        confirm(
          "Delete this document?"
        )
      ) {
        deleteDocumentMutation.mutate(
          doc.id
        );
      }

    }}
  >
    Delete
  </Button>

</div>

        </div>
      )
    )

  )}

</div>
  {/* Loans */}

  <div>

    <h3 className="font-semibold mb-3">
      Loans
    </h3>

    {borrowerProfile.loans.map(
      (loan: any) => (
        <div
          key={loan.id}
          className="mb-2 rounded-lg border p-3"
        >
          <div className="font-medium">
            LN-{String(loan.id).padStart(4, "0")}
          </div>

          <div className="text-sm text-muted-foreground">
            Outstanding:
            ₹
            {loan.outstanding.toLocaleString()}
          </div>
        </div>
      )
    )}

  </div>

  {/* Repayment History */}

  <div>

    <h3 className="font-semibold mb-3">
      Repayment History
    </h3>

    {borrowerProfile.repayments.map(
      (r: any) => (
        <div
          key={r.id}
          className="mb-2 rounded-lg border p-3"
        >
          <div>
            ₹
            {Number(
              r.amount_paid
            ).toLocaleString()}
          </div>

          <div className="text-xs text-muted-foreground">
            {r.payment_date}
          </div>
        </div>
      )
    )}

  </div>

</div>

      </div>
    )}

  </DialogContent>
</Dialog>
<Dialog
  open={uploadOpen}
  onOpenChange={
    setUploadOpen
  }
>
  <DialogContent>

    <DialogHeader>
      <DialogTitle>
        Upload Document
      </DialogTitle>
    </DialogHeader>

    <form
      className="space-y-4"
      onSubmit={(e) => {

        e.preventDefault();

        const form =
          new FormData(
            e.currentTarget
          );

        uploadDocumentMutation.mutate({
          borrowerId:
            selectedBorrower,
          formData: form,
        });
      }}
    >

      <Input
        name="document_type"
        placeholder="Aadhaar / PAN / Agreement"
        required
      />

      <Input
        type="file"
        name="file"
        required
      />

      <Button type="submit">
        Upload
      </Button>

    </form>

  </DialogContent>
</Dialog>
    </div>
  );
}

