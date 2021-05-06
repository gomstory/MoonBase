import { BUY_MOON, UPDATE_RATE } from "./action-types";

let nexId = 0;

export const buy = (payload) => ({
    type: BUY_MOON,
    payload: payload
});

export const updateRate = (rate) => ({
    type: UPDATE_RATE,
    payload: {
        rate
    }
});