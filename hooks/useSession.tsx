import type {NextPage} from 'next'
import { useSelector } from 'react-redux'
import {storeTypes} from "../redux/reduxInterfaces";

const useSession = () => {
    const token = useSelector((state:storeTypes) => state.layout.token)
    return token !== '';
}

export default useSession