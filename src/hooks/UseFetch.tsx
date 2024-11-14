import { useEffect, useRef, useState } from "react"

export const UseFetch = (address: string, method: 'GET' | 'POST' | 'DELETE' = 'GET', payload?: any) => {
    const [res, setRes] = useState<Response>();
    const [data, setData] = useState<any>();

    const loading = useRef(true);
    const url = useRef<string>(import.meta.env.VITE_API_URL);

    const fetching = async () => {
        try {
            loading.current = true;

            console.log('trying fetch to', url.current + address);
            const res = await fetch(url.current + address, {
                method: method,
                body: payload ? JSON.stringify(payload) : undefined,
                headers: payload ? {
                    'Content-type': 'application/json'
                } : undefined
            });
            setRes(res);

            const data = await res.json();
            setData(data);
        } catch (error) {
            console.log('ERROR at fetching (' + method + ') ' + address, error);
        } finally {
            console.log('');
        }
    }

    useEffect(() => {
        if(!url.current) {
            console.log('no base url for fetching found');
            return;
        }


        fetching();
    }, [])

    return {
        loading,
        res,
        data,
        refetch: fetching
    }
}