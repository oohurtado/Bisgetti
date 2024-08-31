﻿using System.ComponentModel.DataAnnotations;

namespace Server.Source.Models.DTOs.MyAccount
{
    public class UpdateAddressDefaultRequest
    {
        [Display(Name = "Predeterminado")]
        [Required(ErrorMessage = "Campo requerido")]
        public bool IsDefault { get; set; }
    }
}