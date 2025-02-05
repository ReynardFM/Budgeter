import React from "react";
import { useState, useEffect } from "react";
import { Layout } from "./layout";
import Link from "next/link";

export default function Expense() {
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const [local, setlocal] = useState(localStorage.getItem("budget"));
    const [input, setInput] = useState(null);
    const [end, min] = useState(localStorage.getItem("sub")?localStorage.getItem("sub"):local);
    const [expense, append] = useState(localStorage.getItem("expense")?JSON.parse(localStorage.getItem("expense")):[]);
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState(0);

    
    
    function getAmount(e){
        setAmount(e.target.value);
    }

    function getInput(e){
        setInput(e.target.value);
    }
    
    function getCat(e){
        setCategory(e.target.value);
    }

    function addExpense(){
        
        if(category === ""|| amount === 0){
            setMessage(false);
            alert('Please enter a category or amount');
        }else if(end-amount < 0){
            alert('You have reached your budget');
        } 
        else{
            append([...expense,{cat:category,num:amount}]);
            min(end-amount)
            let temp = localStorage.getItem("expense")?JSON.parse(localStorage.getItem("expense")):[];
            temp.push({cat:category,num:amount});
            localStorage.setItem("expense",JSON.stringify(temp));
            localStorage.setItem("sub",end-amount);
            document.querySelector('form').reset();
            return false;
        }
    };

    function delExpense(){
        if(local == end || !input){
            alert("No expense to delete or wrong input");
            document.querySelectorAll('form').forEach((e)=>{
                e.reset();
            });
            return false;
        }else{
            alert("Deleting expense " + input)
            let temp = localStorage.getItem("expense")?JSON.parse(localStorage.getItem("expense")):[];
            let tempamount = Number(expense[input-1].num);
    
            temp.splice(input-1,1);
            delay(100);
            append(temp);
            delay(100);
            min(end+tempamount)
            delay(100);            
            localStorage.setItem("expense",JSON.stringify(temp));
            localStorage.setItem("sub",end);
            document.querySelectorAll('form').forEach((e)=>{
                e.reset();
            });
            return false;
        }
    }

    return (
        <div className="all">  
            <Layout />
            <br/>
            {(local)&&
            <div>
                <div className="expense">
                    <h1>Add Expenses</h1>
                    <p>Click on expense in the summary to delete expense.</p>
                    <form onSubmit={(e)=>{e.preventDefault()}} id="fm">
                        <label for="expense" className="expense">Enter Category:</label>
                        <input type="text" id="expense" name="expense" onKeyUp={getCat}></input>
                        <label for="amount" className="expense">Enter the amount:</label>
                        <input type="number" id="amount" name="amount" onKeyUp={getAmount}></input>
                        <br/>
                        <button style={{marginTop: 20 + "px"}} type="submit" className="submit" onClick={addExpense}>Submit</button>
                    </form>
                </div>
                <div className="summary">
                    <h2>Expense Summary</h2>
                    <div className="indent">
                        <table>
                            <tr>
                                <td class="Category"><b>Budget</b></td>
                                <td class="amount">${local}</td>
                            </tr>
                            {(expense)&&expense.map((item,index)=>(
                                <tr className="expense">
                                    <td class="Category">{index+1}. {item.cat}</td>
                                    <td class="amount">-${item.num}</td>
                                </tr>
                            ))}
                            <tr>
                                <td class="Category"><b>Total</b></td>
                                <td class="amount">${end}</td>
                            </tr>
                        </table>
                    </div>
                    <div>
                            <form style={{width: "70%",marginLeft:"20px", marginTop:"20px",display:"block"} }onSubmit={(e)=>{e.preventDefault()}}>
                                <label for="expense">Select which expense to delete: </label>
                                <br/>
                                <input type="number" id="budget" name="expense" onKeyUp={getInput}></input>
                                <button className="submit" type="submit" style={{marginLeft:"10px"}} onClick={delExpense}>Delete</button>
                            </form>
                        </div>
                    
                </div>
            </div>
            }
            {!(local)&&<div className="expense">
                <h1>No budget</h1>
                <Link href={"/budget"}><button className="setBudget" type="submit">Set Budget</button></Link>
            </div>}
        </div>
    );
}
