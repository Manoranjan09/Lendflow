import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Search, Plus } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";

import { toast } from "sonner";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getLoans,
  createLoan,
  deleteLoan,
} from "@/lib/api/loans";

import { getBorrowers } from "@/lib/api/borrowers";
import { getDashboardStats } from "@/lib/api/dashboard";
import {
  getLoanSummary,
} from "@/lib/api/loans";

import {
  getLoanRepayments,
  createRepayment,
} from "@/lib/api/repayments";
export const Route = createFileRoute("/dashboard/loans")({
  component: LoansPage,
});

function LoansPage() {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
const [selectedLoan, setSelectedLoan] =
  useState<number | null>(null);
  const [repaymentOpen, setRepaymentOpen] =
  useState(false);
  const {
  data: stats,
} = useQuery({
  queryKey: ["dashboard-stats"],
  queryFn: getDashboardStats,
});
  const { data: loans = [] } = useQuery({
    queryKey: ["loans"],
    queryFn: getLoans,
  });

  const { data: borrowers = [] } = useQuery({
    queryKey: ["borrowers"],
    queryFn: getBorrowers,
  });
  const borrowerMap = useMemo(() => {
  const map = new Map<number, string>();

  borrowers.forEach((b: any) => {
    map.set(b.id, b.name);
  });

  return map;
}, [borrowers]);

  const createLoanMutation = useMutation({
    mutationFn: createLoan,

    onSuccess: () => {
      toast.success("Loan created successfully");

      queryClient.invalidateQueries({
        queryKey: ["loans"],
      });

      setOpen(false);
    },

    onError: () => {
      toast.error("Failed to create loan");
    },
  });

  const filtered = useMemo(() => {
  return loans.filter((loan: any) => {
    const borrowerName =
      borrowerMap.get(loan.borrower_id) || "";

    return (
      String(loan.id)
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      borrowerName
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  });
}, [loans, search, borrowerMap]);

  async function handleCreateLoan(form: FormData) {
    const borrower_id = Number(
      form.get("borrower_id")
    );

    const principal_amount = Number(
      form.get("principal_amount")
    );

    const interest_rate = Number(
      form.get("interest_rate")
    );

    const interest_type = String(
      form.get("interest_type")
    );

    const issue_date = String(
      form.get("issue_date")
    );

    const due_date = String(
      form.get("due_date")
    );

    createLoanMutation.mutate({
      borrower_id,
      principal_amount,
      interest_rate,
      interest_type,
      is_compound:
        interest_type === "Compound",
      issue_date,
      due_date,
    });
  }
const {
  data: loanSummary,
} = useQuery({
  queryKey: [
    "loan-summary",
    selectedLoan,
  ],
  queryFn: () =>
    getLoanSummary(
      selectedLoan as number
    ),
  enabled: !!selectedLoan,
});

const {
  data: repayments = [],
} = useQuery({
  queryKey: [
    "repayments",
    selectedLoan,
  ],
  queryFn: () =>
    getLoanRepayments(
      selectedLoan as number
    ),
  enabled: !!selectedLoan,
});

const createRepaymentMutation =
  useMutation({
    mutationFn: createRepayment,

    onSuccess: () => {
      toast.success(
        "Repayment added"
      );

      queryClient.invalidateQueries({
        queryKey: [
          "loan-summary",
          selectedLoan,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "repayments",
          selectedLoan,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: ["loans"],
      });

      setRepaymentOpen(false);
    },

    onError: () => {
      toast.error(
        "Failed to add repayment"
      );
    },
  });
  const deleteLoanMutation =
  useMutation({
    mutationFn: deleteLoan,

    onSuccess: () => {
      toast.success(
        "Loan deleted"
      );

      queryClient.invalidateQueries({
        queryKey: ["loans"],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "dashboard-stats",
        ],
      });

      setSelectedLoan(null);
    },

    onError: () => {
      toast.error(
        "Failed to delete loan"
      );
    },
  });
  function handleRepayment(
  form: FormData
) {
  createRepaymentMutation.mutate({
    loan_id: selectedLoan!,
    amount_paid: Number(
      form.get("amount_paid")
    ),
    payment_date: String(
      form.get("payment_date")
    ),
    payment_method: String(
      form.get("payment_method")
    ),
    notes: String(
      form.get("notes")
    ),
  });
}
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-display text-3xl font-semibold">
            Loans
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage and monitor all loans
          </p>
        </div>

        <Dialog
          open={open}
          onOpenChange={setOpen}
        >
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-accent">
              <Plus className="mr-2 h-4 w-4" />
              Add Loan
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Create Loan
              </DialogTitle>

              <DialogDescription>
                Assign a loan to a borrower
              </DialogDescription>
            </DialogHeader>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();

                handleCreateLoan(
                  new FormData(
                    e.currentTarget
                  )
                );
              }}
            >
              <div>
                <Label>Borrower</Label>

                <Select
                  name="borrower_id"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select borrower" />
                  </SelectTrigger>

                  <SelectContent>
                    {borrowers.map(
                      (b: any) => (
                        <SelectItem
                          key={b.id}
                          value={String(
                            b.id
                          )}
                        >
                          {b.name}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>
                  Principal Amount
                </Label>

                <Input
                  name="principal_amount"
                  type="number"
                />
              </div>

              <div>
                <Label>
                  Interest Rate
                </Label>

                <Input
                  name="interest_rate"
                  type="number"
                />
              </div>

              <div>
                <Label>
                  Interest Type
                </Label>

                <Select
                  name="interest_type"
                  defaultValue="Compound"
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Simple">
                      Simple
                    </SelectItem>

                    <SelectItem value="Compound">
                      Compound
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>
                  Issue Date
                </Label>

                <Input
                  name="issue_date"
                  type="date"
                />
              </div>

              <div>
                <Label>
                  Due Date
                </Label>

                <Input
                  name="due_date"
                  type="date"
                />
              </div>

              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-primary to-accent"
                >
                  Create Loan
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
<div className="grid gap-4 md:grid-cols-4">
  <div className="rounded-2xl border border-border/60 bg-card/70 p-5 backdrop-blur">
    <div className="text-sm text-muted-foreground">
      Total Loans
    </div>

    <div className="mt-2 text-3xl font-bold">
      {stats?.total_loans ?? 0}
    </div>
  </div>

  <div className="rounded-2xl border border-border/60 bg-card/70 p-5 backdrop-blur">
    <div className="text-sm text-muted-foreground">
      Total Lent
    </div>

    <div className="mt-2 text-3xl font-bold">
      ₹
      {Number(
        stats?.total_lent ?? 0
      ).toLocaleString()}
    </div>
  </div>

  <div className="rounded-2xl border border-border/60 bg-card/70 p-5 backdrop-blur">
    <div className="text-sm text-muted-foreground">
      Outstanding
    </div>

    <div className="mt-2 text-3xl font-bold">
      ₹
      {Number(
        stats?.outstanding_balance ?? 0
      ).toLocaleString()}
    </div>
  </div>

  <div className="rounded-2xl border border-border/60 bg-card/70 p-5 backdrop-blur">
    <div className="text-sm text-muted-foreground">
      Overdue Loans
    </div>

    <div className="mt-2 text-3xl font-bold">
      {stats?.overdue_loans ?? 0}
    </div>
  </div>
</div>
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

        <Input
          className="pl-9"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
         placeholder="Search by Loan ID or Borrower Name..."
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/70">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="p-4 text-left">
                Loan ID
              </th>
              <th className="p-4 text-left">
                Borrower 
              </th>
              <th className="p-4 text-left">
                Principal
              </th>
              <th className="p-4 text-left">
  Rate
</th>

<th className="p-4 text-left">
  Issue Date
</th>

<th className="p-4 text-left">
  Due Date
</th>

<th className="p-4 text-left">
  Status
</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(
              (loan: any, i: number) => (
                 <motion.tr
  onClick={() =>
    setSelectedLoan(
      loan.id
    )
  }
                  key={loan.id}
                  initial={{
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      i * 0.02,
                  }}
                  className="border-b border-border/30 cursor-pointer"
                >
                  <td className="p-4">
                    #{loan.id}
                  </td>

                  <td className="p-4">
  {borrowerMap.get(loan.borrower_id) ?? `#${loan.borrower_id}`}
</td>

                  <td className="p-4">
                    ₹
                    {loan.principal_amount}
                  </td>

                  <td className="p-4">
  {loan.interest_rate}%
</td>

<td className="p-4">
  {new Date(
    loan.issue_date
  ).toLocaleDateString()}
</td>

<td className="p-4">
  {new Date(
    loan.due_date
  ).toLocaleDateString()}
</td>

<td className="p-4">
  <Badge
    variant="outline"
  >
    Active
  </Badge>
</td>
</motion.tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <Dialog
  open={!!selectedLoan}
  onOpenChange={() =>
    setSelectedLoan(null)
  }
>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>
        Loan Summary
      </DialogTitle>
    </DialogHeader>

    {loanSummary && (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-muted-foreground">
              Principal
            </div>

            <div className="font-semibold">
              ₹{loanSummary.principal}
            </div>
          </div>

          <div>
            <div className="text-xs text-muted-foreground">
              Interest
            </div>

            <div className="font-semibold">
              ₹{loanSummary.interest}
            </div>
          </div>

          <div>
            <div className="text-xs text-muted-foreground">
              Total Due
            </div>

            <div className="font-semibold">
              ₹{loanSummary.total_due}
            </div>
          </div>

          <div>
            <div className="text-xs text-muted-foreground">
              Paid
            </div>

            <div className="font-semibold">
              ₹{loanSummary.paid}
            </div>
          </div>

          <div>
            <div className="text-xs text-muted-foreground">
              Outstanding
            </div>

            <div className="font-semibold">
              ₹{loanSummary.outstanding}
            </div>
          </div>

          <div>
            <div className="text-xs text-muted-foreground">
              Status
            </div>

            <Badge>
              {loanSummary.status}
            </Badge>
            <Button
  variant="destructive"
  className="mt-4"
  onClick={() => {
    if (
      confirm(
        "Delete this loan?"
      )
    ) {
      deleteLoanMutation.mutate(
        selectedLoan!
      );
    }
  }}
>
  Delete Loan
</Button>
          </div>
        </div>

        <div>
         <div className="flex items-center justify-between mb-2">
  <h3 className="font-medium">
    Repayments
  </h3>

  <Button
    size="sm"
    onClick={() =>
      setRepaymentOpen(true)
    }
  >
    Add Repayment
  </Button>
</div>

          {repayments.length === 0 ? (
            <div className="text-sm text-muted-foreground">
              No repayments yet
            </div>
          ) : (
            repayments.map(
              (
                repayment: any
              ) => (
                <div
                  key={
                    repayment.id
                  }
                  className="border rounded-lg p-2 mb-2"
                >
                  ₹
                  {
                    repayment.amount_paid
                  }

                  <div className="text-xs text-muted-foreground">
                    {
                      repayment.payment_date
                    }
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>
    )}
  </DialogContent>
</Dialog>
<Dialog
  open={repaymentOpen}
  onOpenChange={
    setRepaymentOpen
  }
>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>
        Add Repayment
      </DialogTitle>
    </DialogHeader>

    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();

        handleRepayment(
          new FormData(
            e.currentTarget
          )
        );
      }}
    >
      <div>
        <Label>
          Amount Paid
        </Label>

        <Input
          name="amount_paid"
          type="number"
          required
        />
      </div>

      <div>
        <Label>
          Payment Date
        </Label>

        <Input
          name="payment_date"
          type="date"
          required
        />
      </div>

      <div>
        <Label>
          Payment Method
        </Label>

        <Input
          name="payment_method"
          placeholder="UPI / Cash / Bank Transfer"
          required
        />
      </div>

      <div>
        <Label>
          Notes
        </Label>

        <Input
          name="notes"
        />
      </div>

      <DialogFooter>
        <Button
          type="submit"
        >
          Save Repayment
        </Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>
    </div>
  );
}