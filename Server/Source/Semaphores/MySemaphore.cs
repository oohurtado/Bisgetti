namespace Server.Source.Semaphores
{
    public class MySemaphore
    {
        public SemaphoreSlim OrderSemaphore { get; set; }

        public MySemaphore()
        {
            OrderSemaphore = new SemaphoreSlim(1,1);
        }
    }
}
