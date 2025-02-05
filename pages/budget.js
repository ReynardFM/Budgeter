import React from "react";
import { useState, useEffect } from "react";
import Layout from "./layout";
import { useRouter } from 'next/router';

export default function Budget() {
    // Function to introduce a delay using a Promise
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const router = useRouter(); // Hook for navigation in Next.js
    const [message, setMessage] = useState(false); // State to track submission message visibility
    const [input, setInput] = useState(0); // State to store user input for budget
    const [submit, setSubmit] = useState(false); // State to track if the budget has been submitted

    useEffect(() => {
        // Retrieve the budget from local storage when the component mounts
        setInput(localStorage.getItem("budget") ? localStorage.getItem("budget") : 0);
    }, []);

    // Function to handle input changes
    const getInput = (event) => {
        if (!submit) { // Prevents changes after submission
            setInput(event.target.value);
        }
    };

    // Function to handle budget submission
    const setBudget = (event) => {
        event.preventDefault(); // Prevents form default submission behavior
        
        if (input == 0) {
            setMessage(false);
            alert('Please enter a value'); // Alert if input is 0
        } else {
            // Store the budget in local storage
            localStorage.setItem("budget", Number(input));
            setMessage(true);
            setSubmit(true); // Prevent further submissions
            localStorage.removeItem("expense"); // Clear any previous expense data
            localStorage.setItem("sub", Number(input));

            delay(100); // Short delay before navigation
            router.push('/realExpense'); // Redirect to realExpense page
        }

        if (submit) {
            alert('You can only submit once. Reset budget to resubmit monthly budget.');
        }
    };

    // Function to reset budget-related values
    const handleReset = () => {
        setSubmit(false);
        setMessage(false);
        setInput('');
        localStorage.removeItem("budget");
        localStorage.removeItem("expense");
        localStorage.removeItem("sub");
    };

    return (
        <div className="all">
            <Layout /> {/* Layout component for consistent UI structure */}
            <br/>
            <div className="budget">
                <h1>Set Monthly Budget</h1>
                <form onSubmit={setBudget} onReset={handleReset}>
                    <label for="budget">Enter your budget: $ </label>
                    <input 
                        type="number" 
                        id="budget" 
                        name="budget" 
                        onKeyUp={getInput} 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button className="submit" type="submit">Submit</button>
                    <button className="reset" type="reset">Reset</button>
                    <button className="submit" onClick={() => router.push('/realExpense')} type="button">Next</button>
                </form>
            </div>
        </div>
    );
}
