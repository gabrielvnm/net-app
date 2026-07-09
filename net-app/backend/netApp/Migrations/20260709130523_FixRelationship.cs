using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace netApp.Migrations
{
    /// <inheritdoc />
    public partial class FixRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Users_UserId1",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_UserId1",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "Transactions");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Users",
                type: "TEXT",
                maxLength: 100,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "Value",
                table: "Transactions",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "TEXT");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Users",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<decimal>(
                name: "Value",
                table: "Transactions",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AddColumn<int>(
                name: "UserId1",
                table: "Transactions",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_UserId1",
                table: "Transactions",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Users_UserId1",
                table: "Transactions",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
