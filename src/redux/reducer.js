import { combineReducers } from "redux";
import { BUY, INITIAL } from "./action-types";

const initialState = {
    totalSold: 0,
    moonLeft: 1000,
    nextIncreaseRate: 10,
    moonRate: 50,
    thbtBalance: 100,
    history: [1,2,3,4]
};

export default function(state = initialState, action) {
    switch (action.type) {
        case INITIAL: {
            return {
                total_sold: 0,
                moon_rate: 50,
                thbt_balance: 50
            }
        }
        case BUY: {
            const { id, content } = action.payload;
            return {
                ...state,
                total_sold: state.total_sold++,
            };
        }

        default:
            return state;
    }
}