namespace Server.Source.Services.Interfaces
{
    public interface IStorageFile
    {
        Task<string> SaveFileAsync(byte[] content, string extension, string container);
        Task DeleteFileAsync(string filename, string container);
        string GetUrl(string filename, string container);
    }
}
