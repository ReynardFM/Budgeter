import dynamic from 'next/dynamic';

// Dynamically import the Budget component with server-side rendering (SSR) disabled
const DynamicBudget = dynamic(() => import('./budget'), {
    ssr: false, // Ensures this component is only loaded on the client-side
});

export default function Load() {
    return (
        <>
            {/* Render the dynamically loaded Budget component */}
            <DynamicBudget />
        </>
    );
}