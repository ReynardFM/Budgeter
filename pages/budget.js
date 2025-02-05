import React from "react";
import { useState, useEffect } from "react";
import { Layout } from "./layout";
import { useRouter } from 'next/router'


export default function Budget() {
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const router = useRouter();
    const [message, setMessage] = useState(false);
    const [input, setInput] = useState(localStorage.getItem("budget")?localStorage.getItem("budget"):0);
    const [submit, setSubmit] = useState(false);

    
        
    
    const getInput = (event) => {
        if(!submit){
        setInput(event.target.value);
        }
    };
    const setBudget = (event) => {
        event.preventDefault();
        if(input == 0){
            setMessage(false);
            alert('Please enter a value');
        }else{
            localStorage.setItem("budget",input)
            setMessage(true);
            setSubmit(true);
            localStorage.removeItem("expense");
            localStorage.removeItem("sub");
            delay(100);
            router.push('/realExpense');
        }
        if(submit ){
            alert('You can only submit once. Reset budget to resubmit monthly budget.');
        }
    };
    
    const handleReset = () => {
        setSubmit(false);
        setMessage(false);
        setInput('');
        localStorage.removeItem("budget");
    };  

    return (
        <div className="all">
            <Layout />
            <br/>
            <div className="budget">
                <h1>Set Monthly Budget</h1>
                <form onSubmit={setBudget} onReset={handleReset}>
                    <label for="budget">Enter your budget: $ </label>
                    <input type="number" id="budget" name="budget" onKeyUp={getInput} value={input} onChange={(e)=>{setInput(e.target.value)}}></input>
                    <button className="submit" type="submit">Submit</button>
                    <button className="reset" type="reset">Reset</button>
                    <button className="submit" onClick={()=>{router.push('/realExpense')}} type="button">Next</button>
                </form>
            </div>
        </div>
    );

}