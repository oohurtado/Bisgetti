namespace Server.Source.Data
{
    public interface IAspNetRepository
    {
        /// <summary>
        /// Create roles from enum
        /// </summary>
        Task CreateRolesAsync(List<string> appRoles);

        /// <summary>
        /// Deletes roles not in use and not in enum
        /// </summary>
        Task DeleteRolesAsync(List<string> appRoles);
    }
}
