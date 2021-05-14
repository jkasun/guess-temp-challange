import { FC } from "react";

interface IProps {
    didUserWin: boolean;
}

const GameOver: FC<IProps> = ( {didUserWin} ) => {
    if (didUserWin) {
        return (
            <h1>
                Congratulations! You Won
            </h1>
        )
    } else {
        return (
            <h1>
                Sorry! Better luck next time
            </h1>
        )
    }
}

export default GameOver;
