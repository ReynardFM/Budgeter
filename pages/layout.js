import Link from "next/link"; // Importing Link component from Next.js for client-side navigation
import React from "react";

export default function Layout() {
    return (
        <div className="nav">
            {/* Application title */}
            <h1 className="title">Budgeter</h1>
            
            {/* Navigation menu */}
            <nav>
                <ul>
                    <li>
                        {/* Link to the Home page */}
                        <Link href="/welcome">Home</Link>
                    </li>
                    <li>
                        {/* Link to the budget-setting page */}
                        <Link href="/realBudget">Set Budget</Link>
                    </li>
                    <li>
                        {/* Link to the expenses-tracking page */}
                        <Link href="/realExpense">Add Expenses</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
