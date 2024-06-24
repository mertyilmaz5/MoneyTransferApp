using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using NFCMoneyTransferAPI.DbContext;
using NFCMoneyTransferAPI.DTOs;
using NFCMoneyTransferAPI.Entity;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NFCMoneyTransferAPI.Services.TransactionService
{
    public class TransactionService : ITransactionService
    {
        private readonly AppDbContext _context;

        public TransactionService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<TransactionDto> TransferFundsAsync(string fromIBAN, string receiverIBAN, decimal amount)
        {
            using (IDbContextTransaction transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    var fromAccount = await _context.Accounts.FirstOrDefaultAsync(a => a.IBAN == fromIBAN);
                    var toAccount = await _context.Accounts.FirstOrDefaultAsync(a => a.IBAN == receiverIBAN);

                    if (fromAccount == null || toAccount == null)
                    {
                        throw new ArgumentException("Account not found.");
                    }

                    if (fromAccount.Balance < amount)
                    {
                        throw new InvalidOperationException("Insufficient funds.");
                    }

                    fromAccount.Balance -= amount;
                    toAccount.Balance += amount;

                    var transactionRecord = new Transaction
                    {
                        Amount = amount,
                        Date = DateTime.UtcNow,
                        FromAccountID = fromAccount.AccountID,
                        FromAccount = fromAccount,
                        ToAccountID = toAccount.AccountID,
                        ToAccount = toAccount
                    };

                    _context.Transactions.Add(transactionRecord);
                    await _context.SaveChangesAsync();

                    await transaction.CommitAsync();

                    return new TransactionDto
                    {
                        TransactionID = transactionRecord.TransactionID,
                        Amount = transactionRecord.Amount,
                        Date = transactionRecord.Date,
                        FromAccountID = transactionRecord.FromAccountID,
                        SenderIban = fromAccount.IBAN,
                        ToAccountID = transactionRecord.ToAccountID,
                        ReceiverIban = toAccount.IBAN
                    };
                }
                catch
                {
                    await transaction.RollbackAsync();
                    throw;
                }
            }
        }

        public async Task<List<TransactionDto>> GetTransactionsByUserIdAsync(int userId)
        {
            var transactions = await _context.Transactions
                .Include(t => t.FromAccount)
                .Include(t => t.ToAccount)
                .Where(t => t.FromAccount.UserID == userId || t.ToAccount.UserID == userId)
                .ToListAsync();

            return transactions.Select(t => new TransactionDto
            {
                TransactionID = t.TransactionID,
                Amount = t.Amount,
                Date = t.Date,
                FromAccountID = t.FromAccountID,
                SenderIban = t.FromAccount.IBAN,
                ToAccountID = t.ToAccountID,
                ReceiverIban = t.ToAccount.IBAN
            }).ToList();
        }
    }
}
