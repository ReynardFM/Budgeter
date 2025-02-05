import React from "react";
import { useState, useEffect } from "react";
import Layout from "./layout";
import Link from "next/link";

export default function Expense() {

    // State variables
    const [local, setLocal] = useState(false); // Stores initial budget value from localStorage
    const [input, setInput] = useState(null); // Stores the user input for deleting an expense
    const [count, changeCount] = useState(0); // Tracks number of expenses
    const [end, min] = useState(local); // Tracks remaining budget
    const [expense, append] = useState([]); // Stores expense list
    const [category, setCategory] = useState(""); // Stores selected expense category
    const [amount, setAmount] = useState(0); // Stores entered amount for expense

    // Load initial values from localStorage when the component mounts
    useEffect(() => {
        setLocal(localStorage.getItem("budget") ? localStorage.getItem("budget") : false);
        min(localStorage.getItem("sub") ? localStorage.getItem("sub") : local);
        append(localStorage.getItem("expense") ? JSON.parse(localStorage.getItem("expense")) : []);
    }, []);

    // Function to handle amount input
    function getAmount(e) {
        setAmount(e.target.value);
    }

    // Function to handle category input
    function getCat(e) {
        setCategory(e.target.value);
    }

    // Function to handle expense deletion input
    function getInput(e) {
        setInput(e.target.value);
    }

    // Function to add an expense
    function addExpense() {
        if (category === "" || amount === 0) {
            alert('Please enter a category or amount');
        } else if (end - amount < 0) {
            alert('You have reached your budget');
        } else {
            changeCount(count + 1);
            append([...expense, { cat: category, num: amount }]);
            min(end - amount);

            // Update localStorage
            let temp = localStorage.getItem("expense") ? JSON.parse(localStorage.getItem("expense")) : [];
            temp.push({ cat: category, num: amount });
            localStorage.setItem("expense", JSON.stringify(temp));
            localStorage.setItem("sub", end - amount);

            // Reset form
            document.querySelector('form').reset();
        }
    }

    // Function to delete an expense
    function delExpense() {
        if (local == end || !input || input > count) {
            alert("No expense to delete or wrong input");
            document.querySelectorAll('form').forEach((e) => e.reset());
        } else {
            changeCount(count - 1);
            alert("Deleting expense " + input);

            let temp = localStorage.getItem("expense") ? JSON.parse(localStorage.getItem("expense")) : [];
            let tempAmount = Number(expense[input - 1].num);

            temp.splice(input - 1, 1);
            append(temp);
            min(end + tempAmount);

            // Update localStorage
            localStorage.setItem("expense", JSON.stringify(temp));
            localStorage.setItem("sub", end + tempAmount);

            document.querySelectorAll('form').forEach((e) => e.reset());
        }
    }

    return (
        <div className="all">
            <Layout />
            <br />
            {local ? (
                <div>
                    <div className="expense">
                        <h1>Add Expenses</h1>
                        <p>Click on an expense in the summary to delete it.</p>
                        <form onSubmit={(e) => e.preventDefault()} id="fm">
                            <label htmlFor="expense" className="expense">Enter Category:</label>
                            <input type="text" id="expense" name="expense" onKeyUp={getCat} />
                            <label htmlFor="amount" className="expense">Enter the amount:</label>
                            <input type="number" id="amount" name="amount" onKeyUp={getAmount} />
                            <br />
                            <button style={{ marginTop: "20px" }} type="submit" className="submit" onClick={addExpense}>
                                Submit
                            </button>
                        </form>
                    </div>
                    <div className="summary">
                        <h2>Expense Summary</h2>
                        <div className="indent">
                            <table>
                                <tr>
                                    <td className="Category"><b>Budget</b></td>
                                    <td className="amount">${local}</td>
                                </tr>
                                {expense && expense.map((item, index) => (
                                    <tr className="expense" key={index}>
                                        <td className="Category">{index + 1}. {item.cat}</td>
                                        <td className="amount">-${item.num}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td className="Category"><b>Total</b></td>
                                    <td className="amount">${end}</td>
                                </tr>
                            </table>
                        </div>
                        <div>
                            <form
                                style={{
                                    width: "70%",
                                    marginLeft: "20px",
                                    marginTop: "20px",
                                    display: "block"
                                }}
                                onSubmit={(e) => e.preventDefault()}
                            >
                                <label htmlFor="expense">Select which expense to delete:</label>
                                <br />
                                <input type="number" id="budget" name="expense" onKeyUp={getInput} />
                                <button className="submit" type="submit" style={{ marginLeft: "10px" }} onClick={delExpense}>
                                    Delete
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="expense">
                    <h1>No budget</h1>
                    <Link href={"/realBudget"}>
                        <button className="setBudget" type="submit">Set Budget</button>
                    </Link>
                </div>
            )}
        </div>
    );
}
