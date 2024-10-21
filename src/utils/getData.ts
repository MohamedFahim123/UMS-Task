import axios from "axios";
import { SetStateAction } from "./Types";


export const getData = async (
    url: string,
    setData: SetStateAction<object | undefined>,
    setLoading: SetStateAction<boolean>,
    setError: SetStateAction<string | null>
): Promise<void> => {
    setLoading(true);
    try {
        const res = await axios.get(url, {
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json'
            }
        });
        setData(res?.data);
    } catch (err: unknown) {
        setError(err?.response?.data?.message || 'Error fetching data');
    } finally {
        setLoading(false);
    };
};
