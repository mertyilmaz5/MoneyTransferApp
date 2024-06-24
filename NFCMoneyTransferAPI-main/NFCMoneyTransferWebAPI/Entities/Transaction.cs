namespace NFCMoneyTransferAPI.Entity
{
    public class Transaction
    {
        public int TransactionID { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public int FromAccountID { get; set; }
        public Account FromAccount { get; set; }
        public int ToAccountID { get; set; }
        public Account ToAccount { get; set; }
    }
}