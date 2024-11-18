"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getBalance, getIncome, getExpenses } from "@/api/balance";
import { getAllTransactions, addTransaction, updateTransaction, deleteTransaction } from "@/api/transactions";
import Summary from "@/components/Summary";
import AddTransaction from "@/components/AddTransaction";
import RecentTransactions from "@/components/RecentTransactions";
import SpendingBreakdown from "@/components/SpendingBreakdown";
import { BARREL_OPTIMIZATION_PREFIX } from "next/dist/shared/lib/constants";
import BottomNav from "@/components/BottomNav";

export default function Home() {
  const [transactions, setTransactions] = useState<void | any[]>([]);
  
  useEffect(() => {
    const fetchTransactions = async () => {
      const trans = await getAllTransactions();
      setTransactions(trans);
      console.log(trans);
    };
    fetchTransactions();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Summary />
      <AddTransaction />
      <div className="mt-8 grid gap-8 ">
        <RecentTransactions />
        {/* <SpendingBreakdown /> */}
      </div>
      <BottomNav />
      </main>
      
      {/* <div>
        Transactions:{" "}
        {transactions
          ? transactions.map((trans) => (
              <div key={trans.tid} className="m-4 border border-white ">
                <div>Transaction ID: {trans.tid}</div>
                <div>UID: {trans.uid}</div>
                <div>Amount: {trans.amount}</div>
                <div>Type: {trans.type}</div>
                <div>Category: {trans.category}</div>
                <div>Description: {trans.description}</div>
              </div>
            ))
          : "none"}
      </div>
      <div>
        <button onClick={addTransaction}>add transaction</button>
      </div>
      <div>
        <button onClick={deleteTransaction}>delete transaction</button>
      </div>
      <div>
        <button onClick={updateTransaction}>update transaction</button>
      </div> */}
    </div>
  );
}
