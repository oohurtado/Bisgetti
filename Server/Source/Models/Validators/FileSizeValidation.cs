using System.ComponentModel.DataAnnotations;

namespace Server.Source.Models.Validators
{
    public class FileSizeValidation : ValidationAttribute
    {
        private readonly int fileSizeLimitInBytes;

        public FileSizeValidation(int fileSizeLimitInBytes)
        {
            this.fileSizeLimitInBytes = fileSizeLimitInBytes;
        }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value == null)
            {
                return ValidationResult.Success;
            }

            if (value is not IFormFile formFile)
            {
                return ValidationResult.Success;
            }

            if (formFile.Length >= fileSizeLimitInBytes * 1024 * 1024)
            {
                return new ValidationResult($"File size exceeds the maximum limit, maximum limit: {fileSizeLimitInBytes}mb");
            }

            return ValidationResult.Success;
        }
    }
}
