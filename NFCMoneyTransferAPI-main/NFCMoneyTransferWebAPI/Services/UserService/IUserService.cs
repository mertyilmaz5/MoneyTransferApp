using NFCMoneyTransferAPI.DTOs;

namespace NFCMoneyTransferWebAPI.Services.UserService;

public interface IUserService
{
    Task<LoginResponseDto> LoginAsync(LoginRequestDto loginRequest);
}