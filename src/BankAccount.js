const BankAccount = ({bal}) => {
    return (
        <div>Bank account balance: ${bal.toLocaleString("en-US")}</div>
    );
};
export default BankAccount;
