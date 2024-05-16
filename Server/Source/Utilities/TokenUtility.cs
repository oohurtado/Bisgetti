using Microsoft.IdentityModel.Tokens;
using Server.Source.Models.DTOs.User;
using Server.Source.Models.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Server.Source.Utilities
{
    public static class TokenUtility
    {
        public static UserTokenResponse BuildToken(List<Claim> claims, string jwtKey)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddDays(365);

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: null,
                audience: null,
                claims: claims,
                expires: expiration,
                signingCredentials: creds);

            var userToken = new UserTokenResponse()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                ExpiresIn = expiration,
            };

            return userToken;
        }

        public static List<Claim> CreateClaims(UserEntity user, List<string> roles)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id!),
                new Claim(ClaimTypes.Name, user.FirstName!),
                new Claim(ClaimTypes.Surname, user.LastName!),
                new Claim(ClaimTypes.Email, user.Email!),
            };

            roles.ForEach(p => claims.Add(new Claim(ClaimTypes.Role, p)));

            return claims;
        }
    }
}
