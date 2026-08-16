import { useQuery } from "@tanstack/react-query"
import { getAccounts } from "../../api/accounts/accounts"



export const useGetAccounts = () => {

    return useQuery({
        queryFn: getAccounts,
        queryKey: ["accounts"]
    })
}