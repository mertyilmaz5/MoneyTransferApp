namespace NFCMoneyTransferAPI.Entity;

public class User
{
    public int UserID { get; set; }
    public string UserName { get; set; }
    public string Password { get; set; }
    public List<Account> Accounts { get; set; }
}