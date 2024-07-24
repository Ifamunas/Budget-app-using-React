import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaReact } from "react-icons/fa";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import IncomeForm from "./IncomeForm";
import ExpenseForm from "./ExpenseForm";
import TargetForm from "./TargetForm";
import TransferForm from "./TransferForm";
import NavBar from "./NavBar";
import Contact from "./Contact";
import About from "./About";

function App() {
  const [savingAmount, setSavingAmount] = useState(0);
  const [incomeAmount, setIncomeAmount] = useState(0);
  const [expenseAmount, setExpenseAmount] = useState(0);

  const getSavingAmount = (amount: number) => {
    setSavingAmount((prevAmount) => prevAmount + amount);
  };

  const getIncomeAmount = (amount: number) => {
    setIncomeAmount((prevAmount) => prevAmount + Number(amount));
  };

  const getExpenseAmount = (amount: number) => {
    console.log(amount);
    setExpenseAmount((prevAmount) => prevAmount + Number(amount));
  };

  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="heading">
        <h1>
          Budget Management System using React <FaReact></FaReact>
        </h1>
      </div>

      <div className="nav-bar">
      <BrowserRouter>
          <NavBar></NavBar>
          <Routes>
            <Route path="/Contact" element={<Contact />} />
            <Route path="/About" element={<About />} />
          </Routes>
        </BrowserRouter>
      </div>

      <div className="main-div">
        <IncomeForm getIncomeAmount={getIncomeAmount}></IncomeForm>
        <ExpenseForm getExpenseAmount={getExpenseAmount}></ExpenseForm>
        <TargetForm savingAmount={savingAmount}></TargetForm>
        <TransferForm
          getSavingAmount={getSavingAmount}
          balance={incomeAmount - (expenseAmount + savingAmount)}
        ></TransferForm>
      </div>
    </>
  );
}

export default App;
