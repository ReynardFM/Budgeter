import React from "react";
import Layout from "./layout";
import Link from "next/link";

export default function Welcome() {
    return (
        <div className="all">
            {/* Include the navigation layout */}
            <Layout />
            <br/>
            <div className="welcome">
                {/* Welcome message and introduction */}
                <h1>Welcome to the Budget Tracker!</h1>
                <p>
                    Take control of your finances with ease. Our intuitive expense tracker helps you monitor 
                    <br /> spending, set budgets, and achieve financial goals—all in one place. 
                    <br /> Start tracking today and make every dollar count!
                </p>
                {/* Button to navigate to the budget-setting page */}
                <Link href={"/realBudget"}>
                    <button className="setBudget" type="submit">Set Budget</button>
                </Link>
            </div>
        </div>
    );
}
