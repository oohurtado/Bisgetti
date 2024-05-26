namespace Server.Source.Models.DTOs.Common
{
    public class PageResponse<T>
    {
        public int GrandTotal { get; set; }
        public List<T>? Data { get; set; }
    }
}
