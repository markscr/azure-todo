namespace TodoApi.Data;

using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

public class TodoContext(DbContextOptions<TodoContext> options) : DbContext(options)
{
    public DbSet<TodoItem> TodoItems { get; set; }
}
