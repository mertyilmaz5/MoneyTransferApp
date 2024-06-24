using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NFCMoneyTransferAPI.Migrations
{
    /// <inheritdoc />
    public partial class ıbanaddded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "IBAN",
                table: "Accounts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IBAN",
                table: "Accounts");
        }
    }
}
