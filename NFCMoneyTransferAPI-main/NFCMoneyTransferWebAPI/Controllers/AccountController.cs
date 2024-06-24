using Microsoft.AspNetCore.Mvc;
using NFCMoneyTransferAPI.DTOs;
using NFCMoneyTransferAPI.Services.AccountService;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NFCMoneyTransferAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

      

        [HttpGet("{accountId}")]
        public async Task<IActionResult> GetAccountById(int accountId)
        {
            var account = await _accountService.GetAccountByIdAsync(accountId);
            if (account == null) return NotFound();

            return Ok(account);
        }

        [HttpGet("User/{userId}")]
        public async Task<IActionResult> GetAccountsByUserId(int userId)
        {
            var accounts = await _accountService.GetAccountsByUserIdAsync(userId);
            return Ok(accounts);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAccounts()
        {
            var accounts = await _accountService.GetAllAccountsAsync();
            return Ok(accounts);
        }

       
    }
}