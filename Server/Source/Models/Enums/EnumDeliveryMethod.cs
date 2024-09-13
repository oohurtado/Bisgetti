using System.ComponentModel;

namespace Server.Source.Models.Enums
{
    public enum EnumDeliveryMethod
    {
        [Description("for-delivery")]
        ForDelivery,

        [Description("take-away")]
        TakeAway
    }

    public enum EnumDeliveryMethodSteps
    {        
        [Description("Empezado")]
        Started,

        [Description("Aceptado")]
        Accepted,

        [Description("Cancelado")]
        Canceled,

        [Description("Declinado")]
        Declined,

        [Description("Cocinando")]
        Cooking,

        [Description("Listo")]
        Ready,

        [Description("En ruta")]
        OnTheRoad,

        [Description("Entregado")]
        Delivered,
    }
}