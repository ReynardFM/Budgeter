import dynamic from 'next/dynamic';

// Dynamically import the Expense component with server-side rendering (SSR) disabled
const DynamicExpense = dynamic(() => import('./expense'), {
    ssr: false, // Ensures that this component is only loaded on the client-side
});

export default function Load() {
    return (
        <>
            {/* Render the dynamically loaded Expense component */}
            <DynamicExpense />
        </>
    );
}
