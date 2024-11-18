export const getAllTransactions = async () => {
  const response = await fetch("http://127.0.0.1:5000/transactions", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  // console.log(data);
  return data;
};

interface TransactionFormData {
  amount: number;
  type: string;
  category: string;
  description: string;
}

export const addTransaction = async (formData: TransactionFormData) => {
  const response = await fetch("http://127.0.0.1:5000/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: formData.amount,
      type: formData.type,
      category: formData.category,
      description: formData.description,
    }),
  });
  const data = await response.json();
  console.log(data);
};

export const updateTransaction = async (formData: { amount: number; category: string; type: string; description: string; tid: number }) => {
  const response = await fetch(`http://127.0.0.1:5000/transactions/${formData.tid}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: formData.amount,
      type: formData.type,
      category: formData.category,
      description: formData.description,
    }),
  });
  const data = await response.json();
  console.log(data);
};

export const deleteTransaction = async (tid: number) => {
  const response = await fetch(`http://127.0.0.1:5000/transactions/${tid}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
};
