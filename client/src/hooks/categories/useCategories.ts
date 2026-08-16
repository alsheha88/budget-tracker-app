import {useQuery} from '@tanstack/react-query'
import { getCategories } from '../../api/categories/categories'

export const useGetCategories = () => {

    return useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
        staleTime: Infinity
    })

}