const InvestmentAccount = ({bal}) => {
    return <div>
        Investment Account Balance: ${bal.toLocaleString("en-US")}
    </div>;
};
export default InvestmentAccount;
