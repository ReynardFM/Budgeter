import dynamic from 'next/dynamic';

const DynamicHeader = dynamic(() => import('./budget'), {
        ssr: false,
    });

export default function Load(){
    return(
        <>
            <DynamicHeader/>
        </>
    );
}