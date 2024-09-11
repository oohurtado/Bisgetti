using Server.Source.Models.Validators;
using System.ComponentModel.DataAnnotations;

namespace Server.Source.Models.DTOs.UseCases.MenuStuff
{
    public class ImageElementRequest
    {
        [Display(Name = "Imagen")]
        [FileSizeValidation(fileSizeLimitInBytes: 1)]
        [FileTypeValidation(validTypes: "image/jpeg,image/jpg,image/png,image/gif")]
        public IFormFile? File { get; set; }
    }
}
