import axios, { AxiosError } from "axios";

export const getData = async <T>(
    url: string,
    setCurrData: React.Dispatch<React.SetStateAction<T | null>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<AxiosError | null>>
): Promise<void> => {
    setLoading(true);
    try {
        const response = await axios.get<T>(url);
        setCurrData(response?.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            setError(error as AxiosError);
        } else {
            setError(new AxiosError("An unknown error occurred"));
        }
    } finally {
        setLoading(false);
    }
};
