using Newtonsoft.Json;

public class Order
{
    [JsonProperty("sku")]
    public string SKU { get; set; }

    [JsonProperty("firstname")]
    public string FirstName { get; set; }

    [JsonProperty("lastname")]
    public string LastName { get; set; }

    [JsonProperty("address")]
    public string Address { get; set; }

    [JsonProperty("countrycode")]
    public string CountryCode { get; set; }

    [JsonProperty("suburb")]
    public string Suburb { get; set; }

    [JsonProperty("zip")]
    public string Zip { get; set; }

    [JsonProperty("category")]
    public string Category { get; set; }

    [JsonProperty("cost")]
    public decimal Cost { get; set; }

    [JsonProperty("quantity")]
    public decimal Quantity { get; set; }

}
