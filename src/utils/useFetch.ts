import { useEffect, useState } from "react";
import { getData } from "./getData";

export const useFetch = <T,>(url: string) => {
    const [currData, setCurrData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        getData(url, setCurrData, setLoading, setError);
    }, [url]);

    return [currData, loading, error, setCurrData, setLoading, setError] as const;
};
