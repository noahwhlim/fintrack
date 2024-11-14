import React, { useEffect, useState } from "react";
import { getBalance, getIncome, getExpenses } from "@/api/balance";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  DollarSign,
  PlusIcon,
  User,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import AddTransaction from "./AddTransaction";

const Summary = () => {
  const [balance, setBalance] = useState<void | number>(0);
  const [income, setIncome] = useState<void | number>(0);
  const [expenses, setExpenses] = useState<void | number>(0);
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);

  const toggleAddTransaction = () =>
    setIsAddingTransaction(!isAddingTransaction);

  useEffect(() => {
    const fetchBalance = async () => {
      const num = await getBalance();
      setBalance(num.toFixed(2));
      console.log(num);
    };

    const fetchIncome = async () => {
      const num = await getIncome();
      setIncome(num.toFixed(2));
      console.log(num);
    };

    const fetchExpenses = async () => {
      const num = await getExpenses();
      setExpenses(num.toFixed(2));
      console.log(num);
    };

    fetchBalance();
    fetchIncome();
    fetchExpenses();
  }, []);

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${balance ? balance : "error"}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Income</CardTitle>
          <ArrowUpIcon className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${income ? income : "error"}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Expenses</CardTitle>
          <ArrowDownIcon className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${expenses ? expenses : "error"}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Summary;
