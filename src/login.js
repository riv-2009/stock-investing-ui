import { Input, Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";

const Login = (props) => {
    const [player, setPlayer] = useState();
    const [player1Taken, setPlayer1Taken] = useState(false);
    const [player2Taken, setPlayer2Taken] = useState(false);
    const [userName, setUserName] = useState("");
    const [msg, setMsg] = useState("");

    const handleChange = (e) => {
        updatePlayer();
        setPlayer(e.target.value);
    };

    const updatePlayer = (e) => {
        setPlayer1Taken(true);
    }

    const handleStartGame = (e) => {
        if (player !== "" && userName !== "") {
            props.setUserName(userName);
            props.connection
                .invoke("PlayerTaken", player)
                .catch((err) => console.error(err.toString()));
            props.connection.on("PlayerTakenMessage", (player) => {
                setMsg(player);
                updatePlayer();
                console.log(player);
            });
        } else setMsg("Enter a username");
    };
    return (
        <>
            <div className="container">
                <h1 className="title">Grid Word Finder</h1>
                <h6>Enter a username</h6>
                <Input
                    variant="outlined"
                    type="text"
                    className="word-input"
                    value={userName}
                    onChange={(e) => {
                        setUserName(e.target.value);
                    }}
                />
                <div className="word-submit mt-4">
                    <ToggleButtonGroup
                        color="primary"
                        value={player}
                        exclusive
                        onChange={handleChange}
                    >
                        <ToggleButton value="player1" disabled={player1Taken}>
                            Player 1
                        </ToggleButton>

                        <ToggleButton value="player2" disabled={player2Taken}>
                            PLayer 2
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <br />
                    <Button
                        className="options mt-4"
                        variant="contained"
                        onClick={handleStartGame}
                    >
                        start game
                    </Button>
                    <h6 className="text-danger mt-4">{msg}</h6>
                </div>
            </div>
        </>
    );
};

export default Login;
