namespace NFCMoneyTransferAPI.DTOs;


    public class LoginRequestDto
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }



    public class LoginResponseDto
    {
        public string UserName { get; set; }
        public int UserID { get; set; } // JWT token
    }

