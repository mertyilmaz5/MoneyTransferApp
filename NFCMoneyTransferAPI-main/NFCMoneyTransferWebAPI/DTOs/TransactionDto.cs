namespace NFCMoneyTransferAPI.DTOs
{
    public class TransactionDto
    {
        public int TransactionID { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public int FromAccountID { get; set; }
        public string SenderIban { get; set; }
        public int ToAccountID { get; set; }
        public string ReceiverIban { get; set; }
    }
}