const BankAccount = ({bal}) => {
    return (
        <h6>Bank account balance: ${bal.toLocaleString("en-US")}</h6>
    );
};
export default BankAccount;
