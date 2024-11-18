"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Edit2Icon,
  SortAscIcon,
  Trash2Icon,
  User,
} from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  deleteTransaction,
  getAllTransactions,
  updateTransaction,
} from "@/api/transactions";
import { get } from "http";

type TransactionResponse = {
  amount: number;
  category: string;
  description: string;
  tid: number;
  timestamp: string;
  type: string;
  uid: number;
};

export default function AllTransactions() {
  const [transactions, setTransactions] = useState([] as TransactionResponse[]);
  const [editModalShow, setEditModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [deleteTid, setDeleteTid] = useState(0);
  const [formData, setFormData] = useState({
    amount: 0,
    category: "",
    type: "",
    description: "",
    tid: 0,
  });

  const fetchTransactions = async () => {
    const data = await getAllTransactions();
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [formData, deleteTid]);

  const handleFormChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    // console.log(formData);
  };

  const handleUpdateTransaction = async (event: any) => {
    event.preventDefault();
    const data = await updateTransaction(formData);
    setEditModalShow(false);
    setFormData({
      amount: 0,
      category: "",
      type: "",
      description: "",
      tid: 0,
    });
    console.log(data);
    console.log(formData);
  };

  const handleEditOpen = (transaction: {
    amount: number;
    category: string;
    type: string;
    description: string;
    tid: number;
  }) => {
    // Implement edit functionality
    console.log(`Edit transaction with id: ${transaction.tid}`);
    setEditModalShow(true);
    setFormData(transaction);
  };

  const handleDeleteTransaction = async (event: any) => {
    event.preventDefault();
    const data = await deleteTransaction(deleteTid);
    setDeleteModalShow(false);
    setDeleteTid(0);
    console.log(data);
    console.log(formData);
  };

  const handleDeleteOpen = (tid: number) => {
    // Implement edit functionality
    console.log(`Delete transaction with id: ${tid}`);
    setDeleteModalShow(true);
    setDeleteTid(tid);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {editModalShow && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
          <div className="bg-white px-4 pb-4 pt-2 rounded-lg shadow-lg w-full max-w-md flex flex-col">
            <button
              onClick={() => setEditModalShow(false)}
              className="text-xs flex justify-end text-gray-700"
            >
              Close
            </button>
            <h2 className="text-lg font-semibold mb-2">Edit Transaction</h2>

            <form onSubmit={handleUpdateTransaction}>
              <div className="mb-4">
                <Label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Amount
                </Label>
                <Input
                  type="number"
                  id="amount"
                  name="amount"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.amount}
                  onChange={handleFormChange}
                />
              </div>
              <div className="mb-4">
                <Label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </Label>
                <Input
                  type="text"
                  id="category"
                  name="category"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.category}
                  onChange={handleFormChange}
                />
              </div>
              <div className="mb-4">
                <Label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </Label>
                <Input
                  type="text"
                  id="description"
                  name="description"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.description}
                  onChange={handleFormChange}
                />
              </div>

              <div className="mb-4">
                <Label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Type
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleFormChange({ target: { id: "type", value } })
                  }
                  defaultValue={formData.type}
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
              <Button type="submit">Edit Transaction</Button>
            </form>
          </div>
        </div>
      )}

      {deleteModalShow && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
          <div className="bg-white px-4 pb-4 pt-2 rounded-lg shadow-lg w-full max-w-md flex flex-col">
            <button
              onClick={() => setDeleteModalShow(false)}
              className="text-xs flex justify-end text-gray-700"
            >
              Close
            </button>
            <Button
              type="submit"
              className="bg-red-500 hover:bg-red-600"
              onClick={handleDeleteTransaction}
            >
              Delete Transaction
            </Button>
          </div>
        </div>
      )}

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/">
          <Button className="mb-2">
            <ArrowLeftIcon className="" />
            Back
          </Button>
        </Link>
        <h1 className="text-3xl font-bold mb-8">View All Transactions</h1>

        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]"></TableHead>
                  <TableHead className="max-w-[150px]">Category</TableHead>
                  <TableHead className="max-w-[150px]">Description</TableHead>
                  <TableHead className="max-w-[150px]">Date</TableHead>
                  <TableHead className="max-w-[150px]">Type</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.tid}>
                    <TableCell
                      className={
                        transaction.type === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {transaction.type === "income" ? "+" : "-"}$
                      {transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell className="max-w-[150px] truncate">
                      {transaction.description}
                    </TableCell>
                    <TableCell>
                      {new Date(transaction.timestamp).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          transaction.type === "income"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {transaction.type.charAt(0).toUpperCase() +
                          transaction.type.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditOpen(transaction)}
                        >
                          <Edit2Icon className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteOpen(transaction.tid)}
                        >
                          <Trash2Icon className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
