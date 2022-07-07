const Prompt = (props) => {

    return (
        <>
            <form onSubmit={props.handleSubmit}>
                <label>
                    <h3>{props.stockOpenMsg}</h3>
                    <h4 >{props.message}</h4>
                    <input
                        type="text"
                        className="form-control"
                        value={props.input}
                        onChange={(e) => {
                            props.setInput(e.target.value);
                        }}
                    />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </label>
            </form>
        </>
    );
};

export default Prompt;
