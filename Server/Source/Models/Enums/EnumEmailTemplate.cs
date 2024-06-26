﻿using Server.Source.Models.Enums;
using System.ComponentModel;

namespace Server.Source.Models.Enums
{
    public enum EnumEmailTemplate
    {
        [Description("Resources/Emails/Welcome.html")]       
        Welcome,

        [Description("Resources/Emails/PasswordRecovery.html")]
        PasswordRecovery,

        [Description("Resources/Emails/ChangeRole.html")]
        ChangeRole,
    }
}