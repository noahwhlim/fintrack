import React, { useState } from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { addTransaction } from "@/api/transactions";

const AddTransaction = () => {
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);

  const toggleAddTransaction = () =>
    setIsAddingTransaction(!isAddingTransaction);

  const handleAddTransaction = () => {
    console.log("Adding transaction");
  }

  return (
    <div className="mt-8">
      <Button onClick={toggleAddTransaction}>
        <PlusIcon className="mr-2 h-4 w-4" /> Quick Add Transaction
      </Button>
      {isAddingTransaction && (
        <Card className="mt-4">
          <CardContent className="pt-6">
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    placeholder="Enter amount"
                    type="number"
                    step="1.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    placeholder="Enter category"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" placeholder="Enter description" />
                </div>
              </div>

              <Button type="submit" onSubmit={handleAddTransaction}>Add Transaction</Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AddTransaction;
