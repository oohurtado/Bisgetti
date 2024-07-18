using Server.Source.Services.Interfaces;

namespace Server.Source.Services
{
    public class StorageFileLocal : IStorageFile
    {
        private readonly IWebHostEnvironment _env;
        private readonly IHttpContextAccessor _accessor;

        public StorageFileLocal(IWebHostEnvironment env, IHttpContextAccessor accessor)
        {
            _env = env;
            _accessor = accessor;

            if (string.IsNullOrWhiteSpace(_env.WebRootPath))
            {
                env.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            }
        }

        public Task DeleteFileAsync(string filename, string container)
        {
            var path = Path.Combine(_env.WebRootPath, container, filename);
            if (File.Exists(path))
            {
                File.Delete(path);
            }

            return Task.FromResult(0);
        }

        public async Task<string> SaveFileAsync(byte[] content, string extension, string container)
        {
            var fileName = $"{Guid.NewGuid()}{extension}";
            var folder = Path.Combine(_env.WebRootPath, container);

            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }

            var path = Path.Combine(folder, fileName);
            await File.WriteAllBytesAsync(path, content);

            return fileName;
        }

        public string GetUrl(string filename, string container)
        {
            var host = $"{_accessor.HttpContext?.Request.Scheme}://{_accessor.HttpContext?.Request.Host}";
            var url = Path.Combine(host, container, filename).Replace("\\", "/");
            return url;
        }
    }
}
