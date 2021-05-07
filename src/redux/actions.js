import { BUY_MOON, UPDATE_MOON_INFO, UPDATE_USER } from "./action-types";

export const buy = (payload) => ({
    type: BUY_MOON,
    payload: payload
});

export const updateMoon = (info) => ({
    type: UPDATE_MOON_INFO,
    payload: info
});

export const updateUser = (user) => ({
    type: UPDATE_USER,
    payload: user
});