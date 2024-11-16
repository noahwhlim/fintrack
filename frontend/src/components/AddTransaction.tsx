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
  const [formData, setFormData] = useState({
    amount: 0,
    category: "",
    type: "",
    description: "",
  });

  const handleFormChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    console.log(formData);
  };

  const toggleAddTransaction = () =>
    setIsAddingTransaction(!isAddingTransaction);

  const handleAddTransaction = async (event: any) => {
    event.preventDefault();
    await addTransaction(formData);
    setFormData({
      amount: 0,
      category: "",
      type: "",
      description: "",
    });
    console.log(formData);
  };

  return (
    <div className="mt-8">
      <Button onClick={toggleAddTransaction}>
        <PlusIcon className="mr-2 h-4 w-4" /> Quick Add Transaction
      </Button>
      {isAddingTransaction && (
        <Card className="mt-4">
          <CardContent className="pt-6">
            <form className="space-y-4" onSubmit={handleAddTransaction}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={formData.amount}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    placeholder="Enter category"
                    type="text"
                    value={formData.category}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Type</Label>
                  <Select
                    onValueChange={(value) =>
                      handleFormChange({ target: { id: "type", value } })
                    }
                  >
                    <SelectTrigger>
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
                  <Input
                    id="description"
                    placeholder="Enter description"
                    value={formData.description}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              <Button type="submit" onSubmit={handleAddTransaction}>
                Add Transaction
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AddTransaction;
