using System.ComponentModel;

namespace Server.Source.Models.Enums
{
    public enum EnumOrderStatus
    {
        [Description("Recibido")]
        Received,

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

        [Description("En Ruta")]
        OnTheRoad,

        [Description("Entregado")]
        Delivered,
    }
}
