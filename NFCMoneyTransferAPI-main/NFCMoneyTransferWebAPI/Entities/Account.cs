namespace NFCMoneyTransferAPI.Entity
{
    public class Account
    {
        public int AccountID { get; set; }
        public decimal Balance { get; set; }
        public string IBAN { get; set; }
        public int UserID { get; set; }
        public User User { get; set; }
        public List<Transaction> Transactions { get; set; }
    }
}