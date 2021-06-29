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

namespace API_NetCore_WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeparmentController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public DeparmentController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Get()
        {
            string query = @"
                            SELECT DeparmentId, DeparmentName
                            FROM dbo.Deparment
                            ORDER BY DeparmentId ASC 
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
        public IActionResult Post(Deparment deparment)
        {
            string query = @"
                            INSERT INTO dbo.Deparment
                            VALUES (@DeparmentName)
                            ";

            DataTable table = new DataTable();
            string sqldatasource = _configuration.GetConnectionString("API_Employee_WebApp");
            SqlDataReader myReader;

            using (SqlConnection context = new SqlConnection(sqldatasource))
            {
                context.Open();
                using (SqlCommand myCommand = new SqlCommand(query, context))
                {
                    myCommand.Parameters.AddWithValue("@DeparmentName", deparment.DeparmentName);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    context.Close();
                }
            }

            return Ok("Agregado Exitosamente\n");

        }

        [HttpPut]
        public IActionResult Put(Deparment deparment)
        {
            string query = @"
                            UPDATE dbo.Deparment
                            SET DeparmentName = @DeparmentName
                            WHERE DeparmentId = @DeparmentId
                            ";

            DataTable table = new DataTable();
            string sqldatasource = _configuration.GetConnectionString("API_Employee_WebApp");
            SqlDataReader myReader;

            using (SqlConnection context = new SqlConnection(sqldatasource))
            {
                context.Open();
                using (SqlCommand myCommand = new SqlCommand(query, context))
                {
                    myCommand.Parameters.AddWithValue("@DeparmentId", deparment.DeparmentId);
                    myCommand.Parameters.AddWithValue("@DeparmentName", deparment.DeparmentName);
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
                            DELETE FROM dbo.Deparment
                            WHERE DeparmentId = @DeparmentId
                            ";

            DataTable table = new DataTable();
            string sqldatasource = _configuration.GetConnectionString("API_Employee_WebApp");
            SqlDataReader myReader;

            using (SqlConnection context = new SqlConnection(sqldatasource))
            {
                context.Open();
                using (SqlCommand myCommand = new SqlCommand(query, context))
                {
                    myCommand.Parameters.AddWithValue("@DeparmentId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    context.Close();
                }
            }

            return Ok("Eliminado Exitosamente\n");
        }
    }
}
