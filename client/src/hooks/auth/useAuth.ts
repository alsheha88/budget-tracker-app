import { useMutation } from "@tanstack/react-query"
import { login } from "../../api/authApi/authApi"
import {useNavigate} from "react-router-dom"
import { setAuthToken } from "../../lib/api"


export const useLogin = () => {

    return useMutation({
        mutationFn: login,
        onSuccess: (token) => {
            setAuthToken(token)
        },
        onError: (e) => {console.log(e)}
    })
}