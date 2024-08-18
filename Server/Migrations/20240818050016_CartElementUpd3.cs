using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class CartElementUpd3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "CartElements",
                newName: "ProductQuantity");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "CartElements",
                newName: "ProductPrice");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProductQuantity",
                table: "CartElements",
                newName: "Quantity");

            migrationBuilder.RenameColumn(
                name: "ProductPrice",
                table: "CartElements",
                newName: "Price");
        }
    }
}
