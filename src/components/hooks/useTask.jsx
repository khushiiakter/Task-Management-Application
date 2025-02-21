import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useTask = () => {
    const {data: tasks = [],  refetch} = useQuery({
        queryKey: ['tasks'], 
        queryFn: async() =>{
            const res = await axios.get('http://localhost:5000/tasks');
            return res.data;
        }
    })


    return [tasks, refetch]
};

export default useTask;