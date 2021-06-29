using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using API_NetCore_WebApp.Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace API_NetCore_WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _webhostenvironment;


        public EmployeeController(IConfiguration configuration,IWebHostEnvironment webhostenvironment)
        {
            _configuration = configuration;
            _webhostenvironment = webhostenvironment;

        }

        [HttpGet]
        public IActionResult Get()
        {
            string query = @"
                            SELECT EmployeeId, EmployeeName, Deparment, 
                            CONVERT(varchar(10),DateOfJoining,120) DateOfJoining, PhotoFileName
                            FROM dbo.Employee
                            ORDER BY EmployeeId ASC
                            ";

            DataTable table = new DataTable();
            string sqldatasource = _configuration.GetConnectionString("API_Employee_WebApp");
            SqlDataReader myReader;

            using (SqlConnection context = new SqlConnection(sqldatasource))
            {
                context.Open();
                using (SqlCommand myCommand = new SqlCommand(query, context))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    context.Close();
                }
            }

            return Ok(table);
        }

        [HttpPost]
        public IActionResult Post(Employee employee)
        {
            string query = @"
                            INSERT INTO dbo.Employee (EmployeeName,Deparment,DateOfJoining,PhotoFileName)
                            VALUES (@EmployeeName,@Deparment,@DateOfJoining,@PhotoFileName)
                            ";

            DataTable table = new DataTable();
            string sqldatasource = _configuration.GetConnectionString("API_Employee_WebApp");
            SqlDataReader myReader;

            using (SqlConnection context = new SqlConnection(sqldatasource))
            {
                context.Open();
                using (SqlCommand myCommand = new SqlCommand(query, context))
                {
                    myCommand.Parameters.AddWithValue("@EmployeeName", employee.EmployeeName);
                    myCommand.Parameters.AddWithValue("@Deparment", employee.Deparment);
                    myCommand.Parameters.AddWithValue("@DateOfJoining", employee.DateOfJoining);
                    myCommand.Parameters.AddWithValue("@PhotoFileName", employee.PhotoFileName);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    context.Close();
                }
            }

            return Ok("Agregado Exitosamente\n");

        }

        [HttpPut]
        public IActionResult Put(Employee employee)
        {
            string query = @"
                            UPDATE dbo.Employee
                            SET EmployeeName = @EmployeeName
                                ,Deparment = @Deparment
                                ,DateOfJoining = @DateOfJoining
                                ,PhotoFileName = @PhotoFileName
                            WHERE EmployeeId = @EmployeeId
                            ";

            DataTable table = new DataTable();
            string sqldatasource = _configuration.GetConnectionString("API_Employee_WebApp");
            SqlDataReader myReader;

            using (SqlConnection context = new SqlConnection(sqldatasource))
            {
                context.Open();
                using (SqlCommand myCommand = new SqlCommand(query, context))
                {
                    myCommand.Parameters.AddWithValue("@EmployeeId", employee.EmployeeId);
                    myCommand.Parameters.AddWithValue("@EmployeeName", employee.EmployeeName);
                    myCommand.Parameters.AddWithValue("@Deparment", employee.Deparment);
                    myCommand.Parameters.AddWithValue("@DateOfJoining", employee.DateOfJoining);
                    myCommand.Parameters.AddWithValue("@PhotoFileName", employee.PhotoFileName);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    context.Close();
                }
            }

            return Ok("Actualizado Exitosamente\n");

        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            string query = @"
                            DELETE FROM dbo.Employee
                            WHERE EmployeeId = @EmployeeId
                            ";

            DataTable table = new DataTable();
            string sqldatasource = _configuration.GetConnectionString("API_Employee_WebApp");
            SqlDataReader myReader;

            using (SqlConnection context = new SqlConnection(sqldatasource))
            {
                context.Open();
                using (SqlCommand myCommand = new SqlCommand(query, context))
                {
                    myCommand.Parameters.AddWithValue("@EmployeeId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    context.Close();
                }
            }

            return Ok("Eliminado Exitosamente\n");
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedfile = httpRequest.Files[0];
                string filename = postedfile.FileName;
                var physicalPath = _webhostenvironment.ContentRootPath + "/Photos/" + filename;

                using(var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedfile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {
                return new JsonResult("anonymous.png");
            }
        }
    }
}
