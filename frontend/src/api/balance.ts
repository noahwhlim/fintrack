export const getBalance = async () => {
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

export const getIncome = async () => {
  const response = await fetch("http://127.0.0.1:5000/income", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
  return data.balance;
};

export const getExpenses = async () => {
  const response = await fetch("http://127.0.0.1:5000/expenses", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
  return data.balance;
};
