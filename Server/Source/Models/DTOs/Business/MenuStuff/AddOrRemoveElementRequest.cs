namespace Server.Source.Models.DTOs.Business.MenuStuff
{
    public class AddOrRemoveElementRequest
    {
        public int? MenuId { get; set; }
        public int? CategoryId { get; set; }
        public int? ProductId { get; set; }
        public string Action { get; set; } = null!;
        public string ElementType { get; set; } = null!;
    }
}
