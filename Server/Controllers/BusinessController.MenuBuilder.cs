using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Source.Models.DTOs.Business.Category;

namespace Server.Controllers
{
    public partial class BusinessController
    {

        // TODO: oohg menu builder

        /*        
            * Init
                X get categories
                X get products               

            * Elementos agregar/quitar
                * agregar 'categoria a menu'/'producto a categoria'
                    * post
                    * menu-builder/add-remove
                    * AddElement(elementId, elementType=category/product, toElementId, toElementType=menu/category)
                *  quitar 'categoria de menu'/'producto de menu'
                    *  delete
                    *  menu-buider/element
                    *  DeleteElement(elementId, elementType=category/product, fromElementId, fromElementType=menu/category)
        
            * Visibilidad 
                - Mostrar/Ocultar = isVisible            
                - Disponible/No disponible = isAvailable
                - Vendido = isSoldOut
                * actualizar ...
                    * put
                    * menu-builder/visibility
                    * UpdateVisibilityElement(elementId, elementType=menu/category/product, field=visible/available/sold-out, value=true/false)

            * Mover elementos en el menu
                * move up/down
                    * put
                    * menu-builder/position
                    * UpdatePositionElement(elementId, direction=up/down) 
         
            * Imagenes                 
                * agregar imagen a menu/categoria/producto
                    * post
                    * menu-builder/image/add-remove
                    * AddImage(elementId, typeElement=menu/category/product, file)
                *  quitar imagen de menu/categoria/producto
                    * delete
                    * menu-builder/image
                    * DeleteImage(elementId, typeElement=menu/category/product)
                    
        */
    }
}
