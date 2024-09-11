using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class RequestsUpd2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Tip",
                table: "Requests",
                newName: "TipPercent");

            migrationBuilder.RenameColumn(
                name: "StatusTracking",
                table: "Requests",
                newName: "StatusTrackingJson");

            migrationBuilder.AddColumn<string>(
                name: "AddressJson",
                table: "Requests",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AddressJson",
                table: "Requests");

            migrationBuilder.RenameColumn(
                name: "TipPercent",
                table: "Requests",
                newName: "Tip");

            migrationBuilder.RenameColumn(
                name: "StatusTrackingJson",
                table: "Requests",
                newName: "StatusTracking");
        }
    }
}
