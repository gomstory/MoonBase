import { BUY_MOON, UPDATE_MOON_INFO, UPDATE_USER } from "./action-types";

const initialState = {
    id: 0,
    socket: '',
    totalSold: 0,
    moonLeft: 1000,
    moonRate: 0,
    thbtBalance: 0,
    history: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case BUY_MOON: {
            return {
                ...state,
                totalSold: state.totalSold + action.payload.moon,
                moonLeft: (state.moonLeft - action.payload.moon),
                thbtBalance: (state.thbtBalance - action.payload.thbt),
                history: [...state.history, action.payload]
            }
        }

        case UPDATE_MOON_INFO: {
            return {
                ...state,
                ...action.payload
            }
        }

        case UPDATE_USER: {
            return {
                ...state,
                ...action.payload
            }
        }

        default:
            return state;
    }
}