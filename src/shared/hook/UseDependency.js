import {useContext} from "react";
import {DependencyContext} from "../context/DependencyContext";

export function useDependency() {
    return useContext(DependencyContext);
}