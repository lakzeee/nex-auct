using System.Runtime.CompilerServices;
using AuctionService.Controllers;
using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.Entities;
using AuctionService.RequestHelpers;
using AuctionService.UnitTests.Utils;
using AutoFixture;
using AutoMapper;
using MassTransit;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace AuctionService.UnitTests;

public class AuctionControllerTests
{
    private readonly Mock<IAuctionRepository> _repo;
    private readonly Mock<IPublishEndpoint> _publishEndPoint;
    private readonly Fixture _fixture;
    private readonly AuctionControllers _controllers;
    private readonly IMapper _mapper;

    public AuctionControllerTests()
    {
        _repo = new Mock<IAuctionRepository>();
        _publishEndPoint = new Mock<IPublishEndpoint>();
        _fixture = new Fixture();
        var mockMapper = new MapperConfiguration(mc => { mc.AddMaps(typeof(MappingProfiles).Assembly); }).CreateMapper()
            .ConfigurationProvider;

        _mapper = new Mapper(mockMapper);
        _controllers = new AuctionControllers(_repo.Object, _mapper, _publishEndPoint.Object)
        {
            ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext() { User = Helpers.GetClaimsPrincipal() }
            }
        };
    }

    [Fact]
    public async Task GetAllAuctions_WithNoParams_Return10Auction()
    {
        // arrange
        var auctions = _fixture.CreateMany<AuctionDto>(10).ToList();
        _repo.Setup(repo => repo.GetAuctionsAsync(null)).ReturnsAsync(auctions);
        // action
        var result = await _controllers.GetAllAuctions(null);
        // result
        Assert.Equal(10, result.Value.Count);
        Assert.IsType<ActionResult<List<AuctionDto>>>(result);
    }

    [Fact]
    public async Task GetAllAuctionById_WithValidId_ReturnAuction()
    {
        // arrange
        var auction = _fixture.Create<AuctionDto>();
        _repo.Setup(repo => repo.GetAuctionByIdAsync(It.IsAny<Guid>())).ReturnsAsync(auction);
        // action
        var result = await _controllers.GetAuctionById(It.IsAny<Guid>());
        // result
        Assert.Equal(auction.Make, result.Value.Make);
        Assert.IsType<ActionResult<AuctionDto>>(result);
    }

    [Fact]
    public async Task GetAllAuctionById_WithInValidId_ReturnNotFound()
    {
        // arrange
        _repo.Setup(repo => repo.GetAuctionByIdAsync(It.IsAny<Guid>())).ReturnsAsync(value: null);
        // action
        var result = await _controllers.GetAuctionById(It.IsAny<Guid>());
        // result
        Assert.IsType<NotFoundResult>(result.Result);
    }

    [Fact]
    public async Task CreateAuction_WithInValidIdAuction_ReturnCreatedAtAction()
    {
        // arrange
        var auction = _fixture.Create<CreateAuctionDto>();
        _repo.Setup(repo => repo.AddAuction(It.IsAny<Auction>()));
        _repo.Setup(repo => repo.SaveChangesAsync()).ReturnsAsync(true);
        // action
        var result = await _controllers.CreateAuction(auction);
        var createdResult = result.Result as CreatedAtActionResult;

        // result
        Assert.NotNull(createdResult);
        Assert.Equal("GetAuctionById", createdResult.ActionName);
    }

    [Fact]
    public async Task CreateAuction_FailedSave_Returns400BadRequest()
    {
        var auction = _fixture.Create<CreateAuctionDto>();
        _repo.Setup(repo => repo.AddAuction(It.IsAny<Auction>()));
        _repo.Setup(repo => repo.SaveChangesAsync()).ReturnsAsync(false);
        // action
        var result = await _controllers.CreateAuction(auction);
        var createdResult = result.Result;

        // result
        Assert.IsType<BadRequestObjectResult>(createdResult);
    }

    [Fact]
    public async Task UpdateAuction_WithUpdateAuctionDto_ReturnsOkResponse()
    {
        var auction = _fixture.Build<Auction>().Without(x => x.Item).Create();
        auction.Item = _fixture.Build<Item>().Without(x => x.Auction).Create();
        auction.Seller = "testing";
        var auctionDto = _fixture.Create<UpdateAuctionDto>();
        _repo.Setup(repo => repo.GetAuctionEntityById(It.IsAny<Guid>())).ReturnsAsync(auction);
        _repo.Setup(repo => repo.SaveChangesAsync()).ReturnsAsync(true);

        var result = await _controllers.UpdateAuction(It.IsAny<Guid>(), auctionDto);

        Assert.IsType<OkResult>(result);
    }

    [Fact]
    public async Task UpdateAuction_WithInvalidUser_Returns403Forbid()
    {
        var auction = _fixture.Build<Auction>().Without(x => x.Item).Create();
        auction.Item = _fixture.Build<Item>().Without(x => x.Auction).Create();
        auction.Seller = "invalidUser";
        var auctionDto = _fixture.Create<UpdateAuctionDto>();
        _repo.Setup(repo => repo.GetAuctionEntityById(It.IsAny<Guid>())).ReturnsAsync(auction);
        _repo.Setup(repo => repo.SaveChangesAsync()).ReturnsAsync(true);

        var result = await _controllers.UpdateAuction(It.IsAny<Guid>(), auctionDto);

        Assert.IsType<ForbidResult>(result);
    }

    [Fact]
    public async Task UpdateAuction_WithInvalidGuid_ReturnsNotFound()
    {
        var auction = _fixture.Build<Auction>().Without(x => x.Item).Create();
        var auctionDto = _fixture.Create<UpdateAuctionDto>();
        _repo.Setup(repo => repo.GetAuctionEntityById(It.IsAny<Guid>())).ReturnsAsync(value: null);

        var result = await _controllers.UpdateAuction(It.IsAny<Guid>(), auctionDto);

        Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public async Task DeleteAuction_WithValidUser_ReturnsOkResponse()
    {
        var auction = _fixture.Build<Auction>().Without(x => x.Item).Create();
        auction.Seller = "testing";

        _repo.Setup(repo => repo.GetAuctionEntityById(It.IsAny<Guid>())).ReturnsAsync(auction);
        _repo.Setup(repo => repo.SaveChangesAsync()).ReturnsAsync(true);

        var result = await _controllers.DeleteAuction(It.IsAny<Guid>());

        Assert.IsType<OkResult>(result);
    }

    [Fact]
    public async Task DeleteAuction_WithInvalidGuid_Returns404Response()
    {
        var auction = _fixture.Build<Auction>().Without(x => x.Item).Create();

        _repo.Setup(repo => repo.GetAuctionEntityById(It.IsAny<Guid>())).ReturnsAsync(value: null);

        var result = await _controllers.DeleteAuction(It.IsAny<Guid>());

        Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public async Task DeleteAuction_WithInvalidUser_Returns403Response()
    {
        var auction = _fixture.Build<Auction>().Without(x => x.Item).Create();
        auction.Seller = "invalidUser";

        _repo.Setup(repo => repo.GetAuctionEntityById(It.IsAny<Guid>())).ReturnsAsync(auction);

        var result = await _controllers.DeleteAuction(auction.Id);

        Assert.IsType<ForbidResult>(result);
    }
}