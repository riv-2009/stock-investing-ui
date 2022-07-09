const Table = () => {
	return (
		<table className="table">
			<thead>
				<tr>
					<th>Symbol</th>
                    <th>Day #</th>
                    <th>Shares owened</th>
					<th>Investment Account Balance</th>
                    <th>Daily Gain/Loss</th>
                    <th>Total Gain/Loss</th>
				</tr>
			</thead>
			<tbody>
				{/* {data.map((item, i) => {
					return (
						<tr key={i}>
							<td key={item.transactionDate}>{item.transactionDate}</td>
							<td key={item.accountId}>{item.accountName}</td>
							<td key={item.transferAccountId}>{item.transferAccountName}</td>
							<td key={item.amount}>{item.amount / 100}</td>
						</tr>
					);
				})} */}
			</tbody>
		</table>
	);
};

export default Table;