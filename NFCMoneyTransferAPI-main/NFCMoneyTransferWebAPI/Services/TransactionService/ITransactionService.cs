using NFCMoneyTransferAPI.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NFCMoneyTransferAPI.Services.TransactionService
{
    public interface ITransactionService
    {
        Task<TransactionDto> TransferFundsAsync(string fromAccountId, string toAccountId, decimal amount);
        Task<List<TransactionDto>> GetTransactionsByUserIdAsync(int userId);
    }
}