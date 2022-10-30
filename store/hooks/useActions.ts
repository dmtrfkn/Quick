import { bindActionCreators } from "redux"
import actionCreators from "../action-creators"
import { useAppDispatch } from "./redux"


export const useActions = () => {
  const dispatch = useAppDispatch()
  return bindActionCreators(actionCreators, dispatch)
}