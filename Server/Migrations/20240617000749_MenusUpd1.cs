using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class MenusUpd1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MenuCategoryProducts_Categories_CategoryId",
                table: "MenuCategoryProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_MenuCategoryProducts_Products_ProductId",
                table: "MenuCategoryProducts");

            migrationBuilder.AddForeignKey(
                name: "FK_MenuCategoryProducts_Categories_CategoryId",
                table: "MenuCategoryProducts",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MenuCategoryProducts_Products_ProductId",
                table: "MenuCategoryProducts",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "ProductId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MenuCategoryProducts_Categories_CategoryId",
                table: "MenuCategoryProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_MenuCategoryProducts_Products_ProductId",
                table: "MenuCategoryProducts");

            migrationBuilder.AddForeignKey(
                name: "FK_MenuCategoryProducts_Categories_CategoryId",
                table: "MenuCategoryProducts",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_MenuCategoryProducts_Products_ProductId",
                table: "MenuCategoryProducts",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "ProductId");
        }
    }
}
