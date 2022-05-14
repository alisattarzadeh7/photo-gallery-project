import type { NextPage } from 'next';
import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSession from '../../hooks/useSession';

interface sessionLayoutInterface{
    children: ReactElement
}

const SessionLayout: NextPage<sessionLayoutInterface> = ({ children }) => {
    const { token } = useSession();
    const router = useRouter();
    useEffect(() => {
        if (token) router.push('/');
    }, []);

    return (
        <>
            {children}
        </>
    );
};

export default SessionLayout;
