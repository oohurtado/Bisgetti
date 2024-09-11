using System.ComponentModel.DataAnnotations;

namespace Server.Source.Models.DTOs.UseCases.Product
{
    public class CreateOrUpdateProductRequest
    {
        [Display(Name = "Nombre")]
        [Required(ErrorMessage = "Campo requerido")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string? Name { get; set; }

        [Display(Name = "Descripción")]
        [StringLength(100, MinimumLength = 0, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string? Description { get; set; }

        [Display(Name = "Ingredientes")]
        [StringLength(100, MinimumLength = 0, ErrorMessage = "Este campo debe tener entre {2} y {1} caracteres")]
        public string? Ingredients { get; set; }

        [Display(Name = "Precio")]
        [Required(ErrorMessage = "Campo requerido")]
        public decimal Price { get; set; }
    }
}
