using System.ComponentModel.DataAnnotations;
using System.Diagnostics.Contracts;

namespace StudentManagementAPI.Model
{
    public class StudentEntity
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Please Enter FirstName")]
        [Display(Name = "First Name")]
        public string? FirstName { get; set; }

        [Required(ErrorMessage = "Please Enter LastName")]
        [Display(Name = "Last Name")]
        public string? LastName { get; set; }

        [Required(ErrorMessage = "Please Enter MotherName")]
        [Display(Name = "Mother Name")]
        public string? MothersName { get; set; }

        [Required(ErrorMessage = "Please Enter FatherName")]
        [Display(Name = "Father Name")]
        public string? FatherName { get; set; }

        [Required(ErrorMessage = "Please Enter Address")]
        [Display(Name = "Address")]
        public string? Address { get; set; }

        [Required(ErrorMessage = "Select Gender")]
        [Display(Name = "Gender")]
        public string? Gender { get; set; }

        [Required(ErrorMessage = "Select State")]
        [Display(Name = "State")]
        public string? State { get; set; }

        [Required(ErrorMessage = "Select City")]
        [Display(Name = "City")]
        public string? City { get; set; }

        [Required(ErrorMessage = "Select Date")]
        [DataType(DataType.Date)]
        public DateTime? DateOfBirth { get; set; }

        [Required(ErrorMessage = "Please Enter Your EmailID")]
        [DataType(DataType.EmailAddress)]
        public string? EmailId { get; set; }

        [Required(ErrorMessage ="Enter Your Pincode")]
       
        public int Pincode { get; set; }

        [Required(ErrorMessage ="Choose Language")]
        [Display(Name ="Language")]
        public string? Language { get; set; }

        [Required(ErrorMessage ="Choose Hobbies")]
        [Display(Name ="Hobbies")]
        public string? Hobbies { get; set; }

        [Required(ErrorMessage ="Upload File")]
        [Display(Name ="Choose FILe")]
        public string? ImageFile { get; set; }

    }
}
