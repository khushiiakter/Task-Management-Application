import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../provider/AuthProvider";
import { useContext } from "react";


const useTask = () => {
    const { user } = useContext(AuthContext);
    const {data: tasks = [],  refetch} = useQuery({
        queryKey: ['tasks'], 
        queryFn: async() =>{
            const res = await axios.get(`https://task-management-server-eight-sigma.vercel.app/tasks?email=${user?.email}`);
            return res.data;
        }
    })


    return [tasks, refetch]
};

export default useTask;