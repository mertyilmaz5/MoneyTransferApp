using Microsoft.AspNetCore.Mvc;
using NFCMoneyTransferAPI.Services.TransactionService;
using NFCMoneyTransferAPI.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NFCMoneyTransferAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpPost("Transfer")]
        public async Task<IActionResult> TransferFunds([FromBody] TransferRequestDto request)
        {
            try
            {
                var transaction = await _transactionService.TransferFundsAsync(request.SenderIban, request.ReceiverIban, request.Amount);
                return Ok(transaction);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("UserTransactions/{userId}")]
        public async Task<IActionResult> GetTransactionsByUserId(int userId)
        {
            try
            {
                var transactions = await _transactionService.GetTransactionsByUserIdAsync(userId);
                return Ok(transactions);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }

    public class TransferRequestDto
    {
        public string SenderIban { get; set; }
        public string ReceiverIban { get; set; }
        public decimal Amount { get; set; }
    }

}