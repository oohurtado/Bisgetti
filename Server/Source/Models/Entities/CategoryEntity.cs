namespace Server.Source.Models.Entities
{
    public class CategoryEntity
    {
        public CategoryEntity()
        {
            MenuStuff = [];
        }

        /// <summary>
        /// Fields
        /// </summary>

        public string? Name { get; set; }
        public string? Description { get; set; }

        /// <summary>
        /// Relationships
        /// </summary>
        
        public int Id { get; set; }

        public ICollection<MenuStuffEntity>? MenuStuff { get; set; }
    }
}
