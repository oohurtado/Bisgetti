using Server.Source.Services.Interfaces;
using System.ComponentModel;

namespace Server.Source.Utilities
{
    public static class FileUtility
    {
        public static async Task<string> CreateOrUpdateAsync(IStorageFile storageFile, IFormFile file, string? filename, string container)
        {
            await DeleteAsync(storageFile, filename!, container);
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

        public static async Task DeleteAsync(IStorageFile storageFile, string filename, string container)
        {
            if (string.IsNullOrEmpty(filename))
            {
                return;
            }

            await storageFile.DeleteFileAsync(filename, container);
        }

        public static string GetUrlFile(IStorageFile storageFile, string filename, string container)
        {
            return storageFile.GetUrl(filename, container);
        }
    }
}
