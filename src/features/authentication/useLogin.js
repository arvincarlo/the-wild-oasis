import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useLogin() {
    const navigate = useNavigate();

    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({email, password}) => loginApi({
            email, password
        }),
        onSuccess: () => {
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
