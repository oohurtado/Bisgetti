using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class PersonUpd2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PersonEntity_AspNetUsers_UserId",
                table: "PersonEntity");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PersonEntity",
                table: "PersonEntity");

            migrationBuilder.RenameTable(
                name: "PersonEntity",
                newName: "People");

            migrationBuilder.RenameIndex(
                name: "IX_PersonEntity_UserId",
                table: "People",
                newName: "IX_People_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_People",
                table: "People",
                column: "PersonId");

            migrationBuilder.AddForeignKey(
                name: "FK_People_AspNetUsers_UserId",
                table: "People",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_People_AspNetUsers_UserId",
                table: "People");

            migrationBuilder.DropPrimaryKey(
                name: "PK_People",
                table: "People");

            migrationBuilder.RenameTable(
                name: "People",
                newName: "PersonEntity");

            migrationBuilder.RenameIndex(
                name: "IX_People_UserId",
                table: "PersonEntity",
                newName: "IX_PersonEntity_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PersonEntity",
                table: "PersonEntity",
                column: "PersonId");

            migrationBuilder.AddForeignKey(
                name: "FK_PersonEntity_AspNetUsers_UserId",
                table: "PersonEntity",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
