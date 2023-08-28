using Microsoft.AspNetCore.Mvc;
using StudentManagementAPI.DataLayer;
using StudentManagementAPI.Model;

namespace StudentManagementAPI.Controllers
{
    [Route("[controller]")]
    public class StudentMgtController : Controller
    {
        public readonly DbStudentMgt _context;

        public StudentMgtController(DbStudentMgt context)
        {
            _context = context;
        }

        [HttpPost("Create")]
        public IActionResult Create([FromBody]StudentEntity StudentDetails)
        {
            if (ModelState.IsValid)
            {
                _context.StudentsData.Add(StudentDetails);
                _context.SaveChanges();
            }
            else
            { 
                var errors = ModelState.Select(x => x.Value.Errors)
                         .Where(y => y.Count > 0)
                         .ToList();

                return BadRequest(errors);
            }
            return Ok();
        }

        [HttpGet("GetStudent")]
        public IEnumerable<StudentEntity> GetStudents()
        {
            IEnumerable<StudentEntity> studentEntities = _context.StudentsData.ToList();
            return studentEntities;
        }
        [HttpGet("GetDetailsById")]
        public IActionResult GetdetailsforUpdate(int? id)
        {
            var _Studentdetails = _context.StudentsData.Find(id);
            if (_Studentdetails == null) { 
            return NotFound();
            }

        return Ok(_Studentdetails);
        }

        [HttpDelete("Delete")]
        public IActionResult Delete(int? id)
        {
            var _StudentDetail = _context.StudentsData.Find(id);
            if (_StudentDetail == null) 
            { 
            return NotFound();  
            }
            _context.StudentsData.Remove(_StudentDetail);
            _context.SaveChanges();
            return Ok(_StudentDetail);
        }


    }
}
