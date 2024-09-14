using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class ProductInJson : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductDescription",
                table: "RequestElements");

            migrationBuilder.DropColumn(
                name: "ProductIngredients",
                table: "RequestElements");

            migrationBuilder.DropColumn(
                name: "ProductName",
                table: "RequestElements");

            migrationBuilder.DropColumn(
                name: "ProductPrice",
                table: "RequestElements");

            migrationBuilder.AddColumn<string>(
                name: "ProductJson",
                table: "RequestElements",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductJson",
                table: "RequestElements");

            migrationBuilder.AddColumn<string>(
                name: "ProductDescription",
                table: "RequestElements",
                type: "varchar(100)",
                maxLength: 100,
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "ProductIngredients",
                table: "RequestElements",
                type: "varchar(100)",
                maxLength: 100,
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "ProductName",
                table: "RequestElements",
                type: "varchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<decimal>(
                name: "ProductPrice",
                table: "RequestElements",
                type: "decimal(15,2)",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
