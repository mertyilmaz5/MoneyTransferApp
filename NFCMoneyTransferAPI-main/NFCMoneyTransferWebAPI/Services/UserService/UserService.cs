using Microsoft.EntityFrameworkCore;
using NFCMoneyTransferAPI.DbContext;
using NFCMoneyTransferAPI.DTOs;


namespace NFCMoneyTransferWebAPI.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public UserService(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<LoginResponseDto> LoginAsync(LoginRequestDto loginRequest)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == loginRequest.UserName && u.Password == loginRequest.Password);
            if (user == null)
            {
                throw new ArgumentException("Invalid username or password");
            }

            return new LoginResponseDto
            {
                UserName = user.UserName,
                UserID = user.UserID
            };
        }
    }
}