import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";
import { ExpenseSummary } from "@/components/ExpenseSummary";
import { ExpenseChart } from "@/components/ExpenseChart";
import { Wallet } from "lucide-react";

export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

const Index = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      amount: 45.50,
      category: "food",
      description: "Grocery shopping",
      date: new Date().toISOString().split('T')[0],
    },
    {
      id: "2",
      amount: 12.00,
      category: "transport",
      description: "Bus ticket",
      date: new Date().toISOString().split('T')[0],
    },
  ]);

  const addExpense = (expense: Omit<Expense, "id">) => {
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
    };
    setExpenses([newExpense, ...expenses]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <Wallet className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Expense Tracker</h1>
              <p className="text-muted-foreground">Manage your finances with ease</p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <ExpenseSummary expenses={expenses} />

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3 mt-6">
          {/* Add Expense Form */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Add Expense</CardTitle>
              <CardDescription>Track your spending</CardDescription>
            </CardHeader>
            <CardContent>
              <ExpenseForm onAddExpense={addExpense} />
            </CardContent>
          </Card>

          {/* Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
              <CardDescription>Visual breakdown of your expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <ExpenseChart expenses={expenses} />
            </CardContent>
          </Card>
        </div>

        {/* Expense List */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
            <CardDescription>All your tracked expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
