import { Expense } from "@/pages/Index";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { categories } from "./ExpenseForm";

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

export const ExpenseList = ({ expenses, onDeleteExpense }: ExpenseListProps) => {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No expenses yet. Add your first expense to get started!</p>
      </div>
    );
  }

  const getCategoryLabel = (value: string) => {
    const category = categories.find((cat) => cat.value === value);
    return category?.label || value;
  };

  const getCategoryColor = (value: string) => {
    const category = categories.find((cat) => cat.value === value);
    return category?.color || "hsl(var(--muted-foreground))";
  };

  return (
    <div className="space-y-3">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
        >
          <div className="flex items-center gap-4 flex-1">
            <div
              className="h-10 w-10 rounded-full flex items-center justify-center text-xl"
              style={{ backgroundColor: `${getCategoryColor(expense.category)}15` }}
            >
              {getCategoryLabel(expense.category).split(" ")[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{expense.description}</p>
              <p className="text-sm text-muted-foreground">
                {getCategoryLabel(expense.category).split(" ")[1]} • {new Date(expense.date).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-lg font-semibold">${expense.amount.toFixed(2)}</p>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDeleteExpense(expense.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
