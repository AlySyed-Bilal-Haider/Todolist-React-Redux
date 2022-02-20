import Reducer from "./reduxinfo/Usereducer";
 import { createStore } from "redux";
 const createstore=createStore(Reducer);
 export default createstore;