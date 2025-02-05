import dynamic from 'next/dynamic';

const DynamicHeader = dynamic(() => import('./expense'), {
        ssr: false,
    });

export default function Load(){
    return(
        <>
            <DynamicHeader/>
        </>
    );
}