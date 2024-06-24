using Microsoft.AspNetCore.Mvc;
using NFCMoneyTransferAPI.DTOs;
using NFCMoneyTransferAPI.Services.AccountService;
using NFCMoneyTransferWebAPI.Services.UserService;
using System.Threading.Tasks;

namespace NFCMoneyTransferAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto loginRequestDto)
        {
            try
            {
                var user = await _userService.LoginAsync(loginRequestDto);
                return Ok(user);
            }
            catch (ArgumentException ex)
            {
                return Unauthorized(ex.Message);
            }
        }
    }
}