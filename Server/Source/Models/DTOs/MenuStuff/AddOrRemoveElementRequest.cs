namespace Server.Source.Models.DTOs.MenuStuff
{
    public class AddOrRemoveElementRequest
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
