namespace Server.Source.Models.DTOs
{
    public class Response
    {
        public bool Success { get; set; } = true;
        public object? Data { get; set; } 
        public string ErrorMessage { get; set; } = string.Empty;
        public int ErrorCode { get; set; }
    }
}
