using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

[ApiController]
[Route("api/v2/orders")]
public class OrderController : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] Order order)
    {
        if (order != null)
        {
            try
            {
                // Build the JSON request data based on the 'order' object
                var orderData = new
                {
                    totalAmount = new
                    {
                        currency = "EUR",
                        amount = "190.00",
                    },
                    consumer = new
                    {
                        givenNames = order.FirstName,
                        surname = order.LastName,
                    },
                    shipping = new
                    {
                        countryCode = order.CountryCode,
                        postcode = order.Zip,
                        suburb = order.Suburb,
                        name = $"{order.FirstName} {order.LastName}",
                        line1 = order.Address, 
                    },
                    merchant = new
                    {
                        redirectCancelUrl = "https://portal.integration.scalapay.com/failure-url",
                        redirectConfirmUrl = "https://portal.integration.scalapay.com/success-url"
                    },
                    shippingAmount = new
                    {
                        currency = "EUR",
                        amount = "10.00"
                    },
                    taxAmount = new
                    {
                        currency = "EUR",
                        amount = "3.70"
                    },
                    type = "online",
                    product = "pay-in-3",
                    frequency = new
                    {
                        number = 1,
                        frequencyType = "monthly"
                    },
                    orderExpiryMilliseconds = 600000,
                    items = new List<object>
                    {
                        new
                        {
                            price = new
                            {
                                currency = "EUR",
                                amount = order.Cost,
                            },
                            quantity = order.Quantity,
                            name = "T-Shirt",
                            category = order.Category,
                            sku = order.SKU,
                        }
                    }
                };

                // Call the Scalapay API with the constructed data
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri("https://integration.api.scalapay.com/v2/orders");
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "qhtfs87hjnc12kkos");
                    
                    // Send a POST request with the JSON data
                    var response = await client.PostAsJsonAsync("", orderData);

                    if (response.IsSuccessStatusCode)
                    {
                        var responseBody = await response.Content.ReadAsStringAsync();
                        // Parse JSON response để lấy checkoutUrl
                        var responseObject = JObject.Parse(responseBody);
                        var checkoutUrl = responseObject["checkoutUrl"].ToString();

                        // Return the 'checkoutUrl' to the frontend
                        return Ok(new { checkoutUrl });
                    }
                    else
                    {
                        return BadRequest("Gọi API Scalapay không thành công");
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Đã xảy ra lỗi: " + ex.Message);
            }
        }
        else
        {
            return BadRequest("Dữ liệu không hợp lệ");
        }
    }
}
