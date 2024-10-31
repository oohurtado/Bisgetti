namespace Server.Source.Models.Hubs
{
    public class MessageOrderHub
    {
        public string? GroupName { get; set; }
        public string? Message { get; set; }

        //public string? UserIdFrom { get; set; }
        //public string? UserIdTo { get; set; }

        //public string? RoleFrom { get; set; }
        //public string? RoleTo { get; set; }

        public string? StatusFrom { get; set; }
        public string? StatusTo { get; set; }

        public string? ExtraData { get; set; }


    }
}
