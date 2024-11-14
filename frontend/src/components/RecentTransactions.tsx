import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { getAllTransactions } from "@/api/transactions";

const RecentTransactions = () => {
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
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
      <ul className="space-y-4">
      {transactions ? transactions.map((trans) => (
        <li className="flex justify-between items-center">
        <div>
          <p className="font-medium">{trans.category}</p>
          <p className="text-sm text-gray-500">{trans.description}</p>
        </div>
        <span className={`${trans.type==="income" ? "text-green-500" : "text-red-500"} font-medium`}>{trans.type==="income" ? "+" : "-"}{trans.amount.toFixed(2)}</span>
      </li>
      )) : "none"}
      </ul>


        {/* <ul className="space-y-4">
          <li className="flex justify-between items-center">
            <div>
              <p className="font-medium">Grocery Shopping</p>
              <p className="text-sm text-gray-500">Food</p>
            </div>
            <span className="text-red-500 font-medium">-$85.32</span>
          </li>
          <li className="flex justify-between items-center">
            <div>
              <p className="font-medium">Salary</p>
              <p className="text-sm text-gray-500">Income</p>
            </div>
            <span className="text-green-500 font-medium">+$3000.00</span>
          </li>
          <li className="flex justify-between items-center">
            <div>
              <p className="font-medium">Movie Night</p>
              <p className="text-sm text-gray-500">Entertainment</p>
            </div>
            <span className="text-red-500 font-medium">-$25.00</span>
          </li>
        </ul> */}
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
