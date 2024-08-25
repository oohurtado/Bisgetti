namespace Server.Source.Models.DTOs.MenuStuff
{
    public class SettingsElementRequest
    {
        public int? MenuId { get; set; }
        public int? CategoryId { get; set; }
        public int? ProductId { get; set; }

        public bool? IsVisible { get; set; }
        public bool? IsAvailable { get; set; }
    }
}
