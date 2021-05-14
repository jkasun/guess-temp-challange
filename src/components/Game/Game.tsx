import React, { FC, useState } from 'react';
import style from './Game.module.scss';
import { Cities } from '../../core/constants/game.settings';
import weatherApi from '../../core/api/weather.api';
import classnames from 'classnames';
import { connect } from 'react-redux';

interface Guess {
    city: string;
    guess: number;
    original: number;
    won: boolean;
}

interface IProps {
    handleGameOver: (payload: { didUserWin: boolean }) => void;
}

const Game: FC<IProps> = (props) => {
    const [temperature, setTemperature] = useState(0)
    const [currentGuess, setCurrentGuess] = useState(0);
    const [message, setMessage] = useState('');
    const [guesses, setGuesses] = useState<Guess[]>([])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setTemperature(parseInt(value));
    }

    const handleSubmit = async () => {
        const city = Cities[currentGuess];
        const weatherInfo = await weatherApi.getWeatherDataByCityName(city);

        const originalTemperature = weatherInfo.main.temp;
        const won = Math.abs(temperature - originalTemperature) <= 5

        let guess: Guess = {
            city,
            guess: temperature,
            original: originalTemperature,
            won,
        }

        setGuesses([...guesses, guess]);

        const numberOfWins = guesses.filter(i => i.won).length;

        if (currentGuess === 4) {
            props.handleGameOver({
                didUserWin: numberOfWins >= 3
            })

            return;
        }

        setCurrentGuess(currentGuess + 1);
        setTemperature(0);

        if (won) {
            setMessage("Congratulations! Your guess is correct")
        } else {
            setMessage("Sorry, Try again")
        }
    }

    return (
        <div className={style.container}>
            <div className={style.form}>
                <div>
                    <div className={style.label}>
                        Guess Temperature for {Cities[currentGuess]}
                    </div>

                    <div className={style.formControl}>
                        <input
                            type="number"
                            value={temperature}
                            onChange={handleChange} />

                        <button
                            onClick={handleSubmit}>
                            Check
                        </button>
                    </div>

                    <div className={style.message}>
                        {message}
                    </div>
                </div>
            </div>

            <div className={style.footer}>
                {
                    guesses.map((i, j) => {
                        return (
                            <div key={j} className={classnames(style.guess, {
                                [style.won]: i.won,
                                [style.lost]: !i.won
                            })}>
                                <div className={style.value}>
                                    {i.guess}
                                </div>

                                <div className={style.original}>
                                    Was {i.original}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

const mapDispatch = {
    handleGameOver: (payload: { didUserWin: boolean }) => ({ type: 'GAME_OVER', payload }),
}

export default connect(
    undefined,
    mapDispatch
)(Game)
