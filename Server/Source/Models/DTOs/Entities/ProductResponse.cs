﻿namespace Server.Source.Models.DTOs.Entities
{
    public class ProductResponse
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Ingredients { get; set; }
        public decimal Price { get; set; }
        public string? Guid { get; set; }
    }
}
