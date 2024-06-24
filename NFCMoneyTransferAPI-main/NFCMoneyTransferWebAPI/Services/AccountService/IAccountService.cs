using NFCMoneyTransferAPI.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NFCMoneyTransferAPI.Services.AccountService
{
    public interface IAccountService
    {
        Task<AccountDto> AddAccountAsync(CreateAccountDto createAccountDto);
        Task<IEnumerable<AccountDto>> GetAccountByIdAsync(int accountId);
        Task<IEnumerable<AccountDto>> GetAccountsByUserIdAsync(int userId);
        Task<IEnumerable<AccountDto>> GetAllAccountsAsync();
        Task DeleteAccountAsync(int accountId);
    }
}