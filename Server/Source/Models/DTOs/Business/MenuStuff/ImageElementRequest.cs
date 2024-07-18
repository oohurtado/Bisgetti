using Server.Source.Models.Validators;
using System.ComponentModel.DataAnnotations;

namespace Server.Source.Models.DTOs.Business.MenuStuff
{
    public class ImageElementRequest
    {
        public int? MenuId { get; set; }
        public int? CategoryId { get; set; }
        public int? ProductId { get; set; }

        [Display(Name = "Imagen")]
        [FileSizeValidation(fileSizeLimitInBytes: 1)]
        [FileTypeValidation(validTypes: "image/jpeg,image/jpg,image/png,image/gif")]
        public IFormFile? File { get; set; }
    }
}
