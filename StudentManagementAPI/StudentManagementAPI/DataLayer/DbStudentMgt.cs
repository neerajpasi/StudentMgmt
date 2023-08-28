using Microsoft.EntityFrameworkCore;
using StudentManagementAPI.Model;

namespace StudentManagementAPI.DataLayer
{
    public class DbStudentMgt : DbContext
    {
        public DbStudentMgt(DbContextOptions options) : base(options)
        {
        }

        public DbSet<StudentEntity> StudentsData { get; set; }
    }
}
