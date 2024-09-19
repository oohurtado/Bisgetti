using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class Orders : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductJson",
                table: "OrderElements");

            migrationBuilder.AddColumn<string>(
                name: "ProductDescription",
                table: "OrderElements",
                type: "varchar(100)",
                maxLength: 100,
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "ProductIngredients",
                table: "OrderElements",
                type: "varchar(100)",
                maxLength: 100,
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "ProductName",
                table: "OrderElements",
                type: "varchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<decimal>(
                name: "ProductPrice",
                table: "OrderElements",
                type: "decimal(15,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductDescription",
                table: "OrderElements");

            migrationBuilder.DropColumn(
                name: "ProductIngredients",
                table: "OrderElements");

            migrationBuilder.DropColumn(
                name: "ProductName",
                table: "OrderElements");

            migrationBuilder.DropColumn(
                name: "ProductPrice",
                table: "OrderElements");

            migrationBuilder.AddColumn<string>(
                name: "ProductJson",
                table: "OrderElements",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
