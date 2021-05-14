import React, { FC } from 'react';
import Game from '../Game/Game';
import GameOver from '../GamOver/GameOver';
import { connect } from 'react-redux';

interface IProps {
    gameOver: boolean;
    didUserWin: boolean;
}

const Main: FC<IProps> = (props) => {
    const { gameOver, didUserWin } = props;

    if (gameOver) {
        return (
            <GameOver didUserWin={didUserWin}/>
        )
    } else {
        return (
            <Game />
        )
    }
}

const mapStateToProps = (state: any) => {
    const { gameOver, didUserWin } = state.gameReducer;

    return {
        gameOver,
        didUserWin
    }
}

export default connect(
    mapStateToProps,
)(Main)
