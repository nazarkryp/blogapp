namespace BlogApp.Entities
{
    public interface IKeyed<T>
    {
        T Id { get; set; }
    }
}
