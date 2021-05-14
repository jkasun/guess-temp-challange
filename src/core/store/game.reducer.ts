import { GAME_OVER } from "../constants/actions/game";

interface Action {
    type: string;
    payload: any;
}

const defaultState = {
    gameOver: false,
    didUserWin: false,
};

const auth = (state = defaultState, action: Action) => {
    if (action && action.payload) {
        console.log("IM HERE", action.payload);

        switch (action.type) {
            case GAME_OVER:
                const { didUserWin } = action.payload;
                return {
                    gameOver: true,
                    didUserWin
                };

            default:
                return { ...state };
        }
    }

    return state;
};

export default auth;
