import { Input, Button } from "@mui/material";
import { useState } from "react";

const Login = (props) => {
    const [username, setUserName] = useState("");
    const [disableStartGameBtn, setdisableStartGameBtn] = useState(false);
    const [msg, setMsg] = useState("");
    
    const handleStartGame = (e) => {
        
        if (username === "") {
            setMsg("Enter a username.");
        } else {
            //setdisableStartGameBtn(true);
            props.connection
                .invoke("Numplayers", username)
                .catch((err) => console.error(err.toString()));
            props.connection.on("NumPlayersCount", (playerCount, user) => {
                if(playerCount==1){
                    props.setPlayer1(user);
                    setMsg("Waiting for player 2.");
                }
                if(playerCount==2){
                    props.setPlayer2(user);
                }
            });
        }
       
    };
    return (
        <>
            <div className="container">
                <h1 className="title">Grid Word Finder</h1>
                <h6 className="mt-4">Enter a username</h6>
                <Input
                    variant="outlined"
                    type="text"
                    onChange={(e) => {
                        setUserName(e.target.value);
                    }}
                />
                <div className="mt-4">
                    <Button
                        className="options mt-4"
                        variant="contained"
                        onClick={handleStartGame}
                        disabled={disableStartGameBtn}
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
