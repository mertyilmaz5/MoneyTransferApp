using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using NFCMoneyTransferAPI.DbContext;
using NFCMoneyTransferAPI.DTOs;
using NFCMoneyTransferAPI.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NFCMoneyTransferAPI.Services.AccountService
{
    public class AccountService : IAccountService
    {
        private readonly AppDbContext _context;
        private static readonly Random _random = new Random();

        public AccountService(AppDbContext context)
        {
            _context = context;
        }

        private string GenerateRandomNumber()
        {
            const int numberLength = 11;
            const string digits = "0123456789";

            var randomDigits = new string(Enumerable.Repeat(digits, numberLength)
                .Select(s => s[_random.Next(s.Length)]).ToArray());

            return randomDigits;
        }

        public async Task<AccountDto> AddAccountAsync(CreateAccountDto createAccountDto)
        {
            using (IDbContextTransaction transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    var account = new Account
                    {
                        Balance = createAccountDto.Balance,
                        UserID = createAccountDto.UserID,
                        IBAN = GenerateRandomNumber()
                    };

                    _context.Accounts.Add(account);
                    await _context.SaveChangesAsync();

                    await transaction.CommitAsync();

                    return new AccountDto
                    {
                        AccountID = account.AccountID,
                        Balance = account.Balance,
                        UserID = account.UserID,
                        IBAN = account.IBAN
                    };
                }
                catch
                {
                    await transaction.RollbackAsync();
                    throw;
                }
            }
        }

        public async Task<IEnumerable<AccountDto>> GetAccountByIdAsync(int accountId)
        {
            var account = await _context.Accounts.FindAsync(accountId);
            if (account == null) return Enumerable.Empty<AccountDto>();

            return new List<AccountDto>
            {
                new AccountDto
                {
                    AccountID = account.AccountID,
                    Balance = account.Balance,
                    UserID = account.UserID,
                    IBAN = account.IBAN
                }
            };
        }

        public async Task<IEnumerable<AccountDto>> GetAccountsByUserIdAsync(int userId)
        {
            var accounts = await _context.Accounts.Where(x => x.UserID == userId).ToListAsync();
            if (accounts.Count == 0) return Enumerable.Empty<AccountDto>();

            return accounts.Select(account => new AccountDto
            {
                AccountID = account.AccountID,
                Balance = account.Balance,
                UserID = account.UserID,
                IBAN = account.IBAN
            }).ToList();
        }

        public async Task<IEnumerable<AccountDto>> GetAllAccountsAsync()
        {
            var accounts = await _context.Accounts.ToListAsync();
            var accountDtos = new List<AccountDto>();

            foreach (var account in accounts)
            {
                accountDtos.Add(new AccountDto
                {
                    AccountID = account.AccountID,
                    Balance = account.Balance,
                    UserID = account.UserID,
                    IBAN = account.IBAN
                });
            }

            return accountDtos;
        }

        public async Task DeleteAccountAsync(int accountId)
        {
            using (IDbContextTransaction transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    var account = await _context.Accounts.FindAsync(accountId);
                    if (account == null)
                    {
                        throw new ArgumentException("Account not found.");
                    }

                    _context.Accounts.Remove(account);
                    await _context.SaveChangesAsync();

                    await transaction.CommitAsync();
                }
                catch
                {
                    await transaction.RollbackAsync();
                    throw;
                }
            }
        }
    }
}
