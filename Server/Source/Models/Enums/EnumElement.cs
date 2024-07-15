using System.ComponentModel;

namespace Server.Source.Models.Enums
{
    public enum EnumAddElement
    {
        [Description("category-to-menu")]
        CategoryToMenu,

        [Description("product-to-category")]
        ProductToCategory,
    }

    public enum EnumRemoveElement
    {
        [Description("category-from-menu")]
        CategoryFromMenu,

        [Description("product-from-category")]
        ProductFromCategory,
    }
}
