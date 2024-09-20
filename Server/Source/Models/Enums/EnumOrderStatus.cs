using System.ComponentModel;

namespace Server.Source.Models.Enums
{
    public enum EnumOrderStatus
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
