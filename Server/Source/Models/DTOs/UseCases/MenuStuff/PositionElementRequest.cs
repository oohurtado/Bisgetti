namespace Server.Source.Models.DTOs.UseCases.MenuStuff
{
    public class PositionElementRequest
    {
        public int? MenuId { get; set; }
        public int? CategoryId { get; set; }
        public int? ProductId { get; set; }

        /// <summary>
        /// EnumElementAction
        /// </summary>
        public string Action { get; set; } = null!;
    }
}
