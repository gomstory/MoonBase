import { BUY } from "./action-types";

let nexId = 0;

export const buyCoin = content => ({
    type: BUY,
    payload: {
        id: ++nexId,
        content
    }
});