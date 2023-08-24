using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers;

public class AuctionFinishedConsumer : IConsumer<AuctionFinished>
{
    public async Task Consume(ConsumeContext<AuctionFinished> context)
    {
        var item = await DB.Find<Item>().OneAsync(context.Message.AuctionId);
        if (context.Message.ItemSold)
        {
            item.Winner = context.Message.Winner;
            if (context.Message.Amount != null) item.SoldAmount = (int)context.Message.Amount;
        }

        item.Status = "Finished";
        await item.SaveAsync();
    }
}