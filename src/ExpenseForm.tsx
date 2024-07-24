import { ChangeEvent, FormEvent, useState } from "react";
import { ExpenseItem } from "./types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const ExpenseForm = (props: {getExpenseAmount: (amount: number) => void}) => {
  const [expense, setExpense] = useState({
    expenseSource: "",
    expenseAmount: 0,
    expenseDate: "",
  });

  const [expenseList, setExpenseList] = useState<ExpenseItem[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setExpense((prevExpense) => {
      return { ...prevExpense, [name]: value };
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (expense.expenseSource && expense.expenseAmount && expense.expenseDate) {
      const newExpense = { ...expense, id: uuidv4() };
      setExpenseList((prevExpenseList: any) => {
        return [...prevExpenseList, newExpense];
      });
      props.getExpenseAmount(expense.expenseAmount);
      toast.success("expense added successfully.");
    } else {
      toast.error("You must fill all fields.");
    }
  };

  const handleReset = () => {
    setExpense({
      expenseSource: "",
      expenseAmount: 0,
      expenseDate: "",
    });
  };

  const handleClick = (id: number) => {
    const filteredExpense = expenseList.filter((expense) => expense.id !== id);
    setExpenseList(filteredExpense);
  };

  return (
    <div className="grid-item2">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div>
          <label htmlFor="expenseSource">Expense Source:</label>
          <input
            type="text"
            name="expenseSource"
            id="expenseSource"
            value={expense.expenseSource}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="expenseAmount">Amount of Expense:</label>
          <input
            type="number"
            min="0"
            name="expenseAmount"
            id="expenseAmount"
            value={expense.expenseAmount}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="expenseDate">Date of Expense:</label>
          <input
            type="date"
            name="expenseDate"
            id="expenseDate"
            value={expense.expenseDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-btns">
          <button type="submit" className="add-btn">
            Add Expense
          </button>
          <button type="reset" className="reset-btn">
            Reset
          </button>
        </div>
      </form>

      <ul>
        {expenseList.length > 0 &&
          expenseList.map((expense) => (
            <li key= {expense.id}>
              {expense.expenseSource}: {expense.expenseAmount} SAR on{" "}
              {expense.expenseDate}{" "}
              <button
                className="delete-btn"
                onClick={() => handleClick(expense.id)}
              >
                ×
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ExpenseForm;
