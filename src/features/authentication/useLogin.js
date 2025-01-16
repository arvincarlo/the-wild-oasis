import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({email, password}) => loginApi({
            email, password
        }),
        onSuccess: (user) => {
            // setting query data, this basically allow us to set data into the react query cache
            queryClient.setQueriesData(["user"], user)
            navigate('/dashboard');
        },
        onError: (error) => {
            console.log("ERROR: ", error)
            toast.error("Invalid login credentials")
        }
    });

    return { login, isLoading };
}

export default useLogin
