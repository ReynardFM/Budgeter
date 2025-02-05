import React from "react";
import { useState } from "react";
import Layout  from "./layout";
import Link from "next/link";

export default function Welcome() {
    return (
        <div className="all">
            <Layout />
            <br/>
            <div className="welcome">
                <h1>Welcome to the Budget Tracker!</h1>
                <p>Take control of your finances with ease. Our intuitive expense tracker helps you monitor 
                    <br/> spending, set budgets, and achieve financial goals—all in one place. 
                    <br/> Start tracking today and make every dollar count!</p>
                    <Link href={"/realBudget"}><button className="setBudget" type="submit">Set Budget</button></Link>
            </div>
        </div>
    );
}