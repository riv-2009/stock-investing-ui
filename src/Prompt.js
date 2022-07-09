import { Input } from "@mui/material";

const Prompt = (props) => {
    return (
        <>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <h4>{props.message}</h4>
                    <Input
                        variant='outlined'
                        type="text"
                        className="ticker-input"
                        value={props.input}
                        onChange={(e) => {
                            props.setInput(e.target.value);
                        }}
                    />
                    <div className="ticker-submit">
                        <button type="submit" className=" btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Prompt;
