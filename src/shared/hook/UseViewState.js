import {useState} from "react";

const useViewState = () => {
    const [viewState, setViewState] = useState({isLoading: false, data: null, error: null})
    const setLoading = (isLoading = true) => {
        setViewState({isLoading: isLoading, data: null, error: null})
    }
    const setData = (data) => {
        setViewState({isLoading: false, data: data, error: null})
    }
    const setError = (error) => {
        setViewState({isLoading: false, data: null, error: error})
    }
    return {viewState, setLoading, setData, setError};
}
export default useViewState
