using System.ComponentModel.DataAnnotations;

namespace Server.Source.Models.Validators
{
    public class FileTypeValidation : ValidationAttribute
    {
        private readonly string validTypes;

        public FileTypeValidation(string validTypes)
        {
            this.validTypes = validTypes;
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

            if (!validTypes.Split(',').ToList().Any(p => p == formFile.ContentType))
            {
                return new ValidationResult($"File type is invalid, valid types: {validTypes.Replace(",", ", ")}");
            }

            return ValidationResult.Success;
        }
    }
}
