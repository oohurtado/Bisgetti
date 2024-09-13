import { EnumRole } from "./models/enums/role.enum";

export const general = {
	URL_API: 'https://localhost:7239/api',

	MS_ROLE: "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",
	MS_ID: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
	MS_FIRST_NAME: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
	MS_LAST_NAME: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname",
	MS_EMAIL_ADDRESS: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
	
    LS_TOKEN: 'token',

    LS_ROLE_USER_ADMIN: EnumRole.UserAdmin,
    LS_ROLE_USER_CUSTOMER: EnumRole.UserCustomer,
    LS_ROLE_USER_BOSS: EnumRole.UserBoss,

	LS_PAGE_SIZE: 'page-size',

	LS_FIRST_NAME: "user_first_name",
	LS_LAST_NAME: "user_last_name",
	LS_EMAIL_ADDRESS: "user_email",

	DELIVERY_METHOD_FOR_DELIVER: "for-delivery",
	DELIVERY_METHOD_TAKE_AWAY: "take-away",
}