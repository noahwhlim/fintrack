"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [balance, setBalance] = useState<void | number>(0);
  const [transactions, setTransactions] = useState<void | any[]>([]);

  
  const addTransaction = async () => {
    const response = await fetch("http://127.0.0.1:5000/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: 789,
        amount: 25.7531,
        type: "expense",
        category: "Groceries",
        description: "Weekly grocery shopping",
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  const deleteTransaction = async () => {
    const response = await fetch("http://127.0.0.1:5000/transactions/3", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };

  const updateTransaction = async () => {
    const response = await fetch("http://127.0.0.1:5000/transactions/1", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 50.0,
        type: "income",
        category: "Salary",
        description: "Monthly salary",
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  const getBalance = async () => {
    const response = await fetch("http://127.0.0.1:5000/balance", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    return data.balance;
  };

  const getAllTransactions = async () => {
    const response = await fetch("http://127.0.0.1:5000/transactions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  };

  

  useEffect(() => {
    const fetchBalance = async () => {
      const num = await getBalance();
      setBalance(num);
      console.log(num);
    };
    fetchBalance();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      const trans = await getAllTransactions();
      setTransactions(trans);
      console.log(trans);
    };
    fetchTransactions();
  }, []);

  return (
    <div className="flex items-center justify-center flex-col">
      <div>Balance: ${balance ? balance : 0}</div>
      <div>
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
      </div>
    </div>
  );
}
