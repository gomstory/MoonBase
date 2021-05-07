import { BUY_MOON, UPDATE_INFO, UPDATE_RATE } from "./action-types";

const initialState = {
    totalSold: 0,
    moonLeft: 1000,
    moonRate: 50,
    thbtBalance: 100,
    history: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case UPDATE_INFO: {
            return {
                ...state,
                ...action.payload
            }
        }

        case BUY_MOON: {
            return {
                ...state,
                totalSold: state.totalSold + action.payload.moon,
                moonLeft: (state.moonLeft - action.payload.moon),
                thbtBalance: (state.thbtBalance - action.payload.thbt),
                history: [...state.history, action.payload]
            }
        }

        case UPDATE_RATE: {
            return {
                ...state,
                moonRate: action.payload.rate
            }
        }


        default:
            return state;
    }
}