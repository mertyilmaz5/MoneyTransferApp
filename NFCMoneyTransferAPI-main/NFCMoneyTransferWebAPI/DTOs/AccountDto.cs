namespace NFCMoneyTransferAPI.DTOs
{
    public class AccountDto
    {
        public int AccountID { get; set; }
        public decimal Balance { get; set; }
        public int UserID { get; set; }
        public string IBAN { get; set; }  
    }

    public class CreateAccountDto
    {
        public decimal Balance { get; set; }
        public int UserID { get; set; }
    }
}