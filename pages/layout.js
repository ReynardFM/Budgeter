import Link from "next/link";
import React from "react";

export default function Layout(){
    return(
        <div className="nav">
            <h1 className="title">Budgeter</h1>
            <nav>
                <ul>
                    <li>
                        <Link href="/welcome">Home</Link>
                    </li>
                    <li>
                        <Link href="/realBudget">Set Budget</Link>
                    </li>
                    <li>
                        <Link href="/realExpense">Add Expenses</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}