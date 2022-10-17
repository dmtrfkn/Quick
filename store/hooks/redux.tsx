import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "../index";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
