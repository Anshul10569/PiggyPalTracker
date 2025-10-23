import { Expense } from "@/pages/Index";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, DollarSign, Calendar } from "lucide-react";

interface ExpenseSummaryProps {
  expenses: Expense[];
}

export const ExpenseSummary = ({ expenses }: ExpenseSummaryProps) => {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const today = new Date().toISOString().split('T')[0];
  const todayExpenses = expenses
    .filter((expense) => expense.date === today)
    .reduce((sum, expense) => sum + expense.amount, 0);

  const thisMonth = new Date().toISOString().slice(0, 7);
  const monthlyExpenses = expenses
    .filter((expense) => expense.date.startsWith(thisMonth))
    .reduce((sum, expense) => sum + expense.amount, 0);

  const summaryCards = [
    {
      title: "Total Expenses",
      value: `$${totalExpenses.toFixed(2)}`,
      icon: DollarSign,
      gradient: "from-purple-500 to-purple-600",
    },
    {
      title: "This Month",
      value: `$${monthlyExpenses.toFixed(2)}`,
      icon: Calendar,
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Today",
      value: `$${todayExpenses.toFixed(2)}`,
      icon: TrendingUp,
      gradient: "from-pink-500 to-pink-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {summaryCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold">{card.value}</p>
                </div>
                <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${card.gradient} flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
