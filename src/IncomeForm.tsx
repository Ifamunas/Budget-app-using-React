import { ChangeEvent, FormEvent, useState } from "react";
import { IncomeItem } from "./types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const IncomeForm = (props: {getIncomeAmount: (amount:number) => void}) => {
  const [income, setIncome] = useState({
    incomeSource: "",
    incomeAmount: 0,
    incomeDate: "",
  });

  const [incomesList, setIncomesList] = useState<IncomeItem[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setIncome((prevIncome) => {
      return { ...prevIncome, [name]: value };
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (income.incomeSource && income.incomeAmount && income.incomeDate) {
      const newIncome = { ...income, id: uuidv4() };
      setIncomesList((prevIncomes: any) => {
        return [...prevIncomes, newIncome];
      });
      props.getIncomeAmount(income.incomeAmount);
      toast.success("income added successfully.");
    } else {
      toast.error("You must fill all fields.");
    }
  };

  const handleReset = () => {
    setIncome({
      incomeSource: "",
      incomeAmount: 0,
      incomeDate: "",
    });
  };

  const handleClick = (id: number) => {
    const filteredIncome = incomesList.filter((income) => income.id !== id);
    setIncomesList(filteredIncome);
  };

  return (
    <div className="grid-item1">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div>
          <label htmlFor="incomeSource">Income Source:</label>
          <input
            type="text"
            name="incomeSource"
            id="incomeSource"
            placeholder="e.g. Salary"
            value={income.incomeSource}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="incomeAmount">Amount of Income:</label>
          <input
            type="number"
            min="0"
            name="incomeAmount"
            id="incomeAmount"
            value={income.incomeAmount}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="incomeDate">Date of Income:</label>
          <input
            type="date"
            name="incomeDate"
            id="incomeDate"
            value={income.incomeDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-btns">
          <button type="submit" className="add-btn">
            Add Income
          </button>
          <button type="reset" className="reset-btn">
            Reset
          </button>
        </div>
      </form>

      <ul>
        {incomesList.length > 0 &&
          incomesList.map((income) => (
            <li key={income.id}>
              {income.incomeSource}: {income.incomeAmount} SAR on{" "}
              {income.incomeDate}{" "}
              <button
                className="delete-btn"
                onClick={() => handleClick(income.id)}
              >
                ×
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default IncomeForm;
