using System.Net;
using System.Net.Http.Json;
using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.IntegrationTests.Fixtures;
using AuctionService.IntegrationTests.Util;
using Microsoft.Extensions.DependencyInjection;

namespace AuctionService.IntegrationTests;

[Collection("Shared Collection")]
public class AuctionControllerTest : IAsyncLifetime
{
    private readonly CustomWebAppFactory _factory;
    private readonly HttpClient _httpClient;
    private const string GtId = "afbee524-5972-4075-8800-7d1f9d7b0a0c";

    public AuctionControllerTest(CustomWebAppFactory factory)
    {
        _factory = factory;
        _httpClient = factory.CreateClient();
    }

    [Fact]
    public async Task GetAuctions_ShouldReturn3Auctions()
    {
        var response = await _httpClient.GetFromJsonAsync<List<AuctionDto>>("api/auctions");

        Assert.Equal(3, response.Count);
    }

    [Fact]
    public async Task GetAuctionsById_WithValidId_ShouldReturnAuction()
    {
        var response = await _httpClient.GetFromJsonAsync<AuctionDto>($"api/auctions/{GtId}");

        Assert.Equal("GT", response.Model);
    }

    [Fact]
    public async Task GetAuctionsById_WithInvalidId_ShouldReturn404()
    {
        var response = await _httpClient.GetAsync($"api/auctions/{new Guid()}");

        Assert.Equal((HttpStatusCode)404, response.StatusCode);
    }

    [Fact]
    public async Task GetAuctionsById_WithInvalidGuid_ShouldReturn400()
    {
        var response = await _httpClient.GetAsync($"api/auctions/notaguid");

        Assert.Equal((HttpStatusCode)400, response.StatusCode);
    }

    [Fact]
    public async Task CreateAuctions_WithNoAuth_ShouldReturn401()
    {
        var response = await _httpClient
            .PostAsJsonAsync($"api/auctions", new CreateAuctionDto() { Make = "test" });

        Assert.Equal((HttpStatusCode)401, response.StatusCode);
    }

    [Fact]
    public async Task CreateAuctions_WithAuth_ShouldReturn201()
    {
        var auction = GetAuctionForCreate();
        _httpClient.SetFakeJwtBearerToken(AuthHelper.GetBearForUser("bob"));

        var response = await _httpClient
            .PostAsJsonAsync("api/auctions", auction);
        var createdAuction = await response.Content.ReadFromJsonAsync<AuctionDto>();

        response.EnsureSuccessStatusCode();
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        Assert.Equal("bob", createdAuction.Seller);
    }

    [Fact]
    public async Task CreateAuction_WithInvalidCreateAuctionDto_ShouldReturn400()
    {
        var auction = GetAuctionForCreate();
        auction.Make = null;
        _httpClient.SetFakeJwtBearerToken(AuthHelper.GetBearForUser("bob"));

        var response = await _httpClient
            .PostAsJsonAsync("api/auctions", auction);

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task UpdateAuction_WithValidUpdateDtoAndUser_ShouldReturn200()
    {
        var auction = GetUpdateAuctionDto();
        _httpClient.SetFakeJwtBearerToken(AuthHelper.GetBearForUser("bob"));

        var response = await _httpClient
            .PutAsJsonAsync($"api/auctions/{GtId}", auction);

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task UpdateAuction_WithValidUpdateDtoAndInvalidUser_ShouldReturn403()
    {
        var auction = GetUpdateAuctionDto();
        _httpClient.SetFakeJwtBearerToken(AuthHelper.GetBearForUser("invalidUser"));

        var response = await _httpClient
            .PutAsJsonAsync($"api/auctions/{GtId}", auction);

        Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
    }

    public Task InitializeAsync()
    {
        return Task.CompletedTask;
    }

    public Task DisposeAsync()
    {
        using var scope = _factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AuctionDbContext>();
        DbHelper.ReInitDbForTest(db);
        return Task.CompletedTask;
    }

    private CreateAuctionDto GetAuctionForCreate()
    {
        return new CreateAuctionDto()
        {
            Make = "test",
            Model = "testModel",
            ImageUrl = "test",
            Color = "test",
            Mileage = 10,
            Year = 10,
            ReservePrice = 10
        };
    }

    private UpdateAuctionDto GetUpdateAuctionDto()
    {
        return new UpdateAuctionDto()
        {
            Make = "Ford Update",
            Model = "GT",
            Color = "White",
            Mileage = 50000,
            Year = 2020
        };
    }
}