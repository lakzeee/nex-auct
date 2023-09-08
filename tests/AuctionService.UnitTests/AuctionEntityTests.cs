using AuctionService.Entities;

namespace AuctionService.UnitTests;

public class AuctionEntityTests
{
    [Fact]
    public void HasReservedPrice_ReservePriceIsNotZero_True()
    {
        var entity = new Auction { Id = new Guid(), ReservePrice = 10 };
        var result = entity.HasReservedPrice();
        Assert.True(result);
    }
}