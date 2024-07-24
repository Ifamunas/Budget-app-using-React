import { ChangeEvent, FormEvent, useState } from "react";

const TransferForm = (props: {
  getSavingAmount: (amount: number) => void;
  balance: number;
}) => {
  const [transferAmount, setTransferAmount] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTransferAmount(Number(e.target.value));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    props.getSavingAmount(transferAmount);
  };

  return (
    <div className="grid-item4">
      <p onChange={handleChange}>Current Balance: {props.balance}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="transfer">Transfer to Saving Account</label>
        <input
          type="number"
          min="0"
          name="transfer"
          id="transfer"
          onChange={handleChange}
          required
        />
        <button type="submit" className="add-btn">
          Transfer
        </button>
      </form>
    </div>
  );
};

export default TransferForm;
