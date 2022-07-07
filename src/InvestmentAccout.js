const InvestmentAccount = ({bal, shares}) => {
    return <div>
        Investment Account Balance: ${bal.toLocaleString("en-US")}
        {"  "}Shares Owned : {shares}
    </div>;
};
export default InvestmentAccount;
