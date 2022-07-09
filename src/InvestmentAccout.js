const InvestmentAccount = ({bal, shares}) => {
    return <div>
        <h6>Investment Account Balance: ${bal.toLocaleString("en-US")}</h6>
        <h6>Shares Owned : {shares}</h6>
    </div>;
};
export default InvestmentAccount;
