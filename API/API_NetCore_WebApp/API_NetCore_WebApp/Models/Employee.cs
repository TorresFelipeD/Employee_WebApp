using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_NetCore_WebApp.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string Deparment { get; set; }
        public DateTime DateOfJoining { get; set; }
        public string PhotoFileName { get; set; }
    }
}
