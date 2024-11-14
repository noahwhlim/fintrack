export const getAllTransactions = async () => {
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

export const addTransaction = async () => {
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

export const updateTransaction = async () => {
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

export const deleteTransaction = async () => {
  const response = await fetch("http://127.0.0.1:5000/transactions/3", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
};
