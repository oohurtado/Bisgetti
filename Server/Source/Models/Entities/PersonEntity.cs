namespace Server.Source.Models.Entities
{
    public class PersonEntity
    {
        /// <summary>
        /// Fields
        /// </summary>

        public string? Name { get; set; }

        /// <summary>
        /// Relationships
        /// </summary>

        public int Id { get; set; }

        public string UserId { get; set; } = null!;
        public UserEntity User { get; set; } = null!;
    }
}
