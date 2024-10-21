import { useEffect, useState } from "react";
import { getData } from "./getData";
import { AxiosError } from "axios";

export const useFetch = <T,>(url: string) => {
    const [currData, setCurrData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<AxiosError | null>(null);

    useEffect(() => {
        getData(url, setCurrData, setLoading, setError);
    }, [url]);
    
    return [currData, loading, error, setCurrData, setLoading, setError] as const;
};
