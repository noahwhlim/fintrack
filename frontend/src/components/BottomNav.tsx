import Link from "next/link";
import React from "react";

const BottomNav = () => {
  return (
    <nav className="mt-8">
      <ul className="flex space-x-4">
        <li>
          <Link
            href="/add-transaction"
            className="text-blue-600 hover:underline"
          >
            Add Transaction
          </Link>
        </li>
        <li>
          <Link
            href="/view-transactions"
            className="text-blue-600 hover:underline"
          >
            View All Transactions
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNav;
