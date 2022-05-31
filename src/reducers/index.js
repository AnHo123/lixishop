import { combineReducers } from "redux";
import brandListFilter from "./brandListFilter";
import priceListFilter from "./priceListFilter";

const allReducers = combineReducers({
    brandListReducer: brandListFilter,
    priceListReducer: priceListFilter,
})

export default allReducers;