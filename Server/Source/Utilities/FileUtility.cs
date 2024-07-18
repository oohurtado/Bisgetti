using Server.Source.Services.Interfaces;

namespace Server.Source.Utilities
{
    public static class FileUtility
    {
        public static async Task<string> CreateOrUpdateAsync(IStorageFile storageFile, IFormFile file, string? currentImage, string container)
        {
            await DeleteAsync(storageFile, currentImage!, container);
            return await CreateAsync(storageFile, file, container);
        }

        public static async Task<string> CreateAsync(IStorageFile storageFile, IFormFile file, string container)
        {
            using var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);
            var content = memoryStream.ToArray();
            var extension = Path.GetExtension(file.FileName);
            return await storageFile.SaveFileAsync(content, extension, container);
        }

        public static async Task DeleteAsync(IStorageFile storageFile, string currentImage, string container)
        {
            if (string.IsNullOrEmpty(currentImage))
            {
                return;
            }

            await storageFile.DeleteFileAsync(currentImage, container);
        }
    }
}
