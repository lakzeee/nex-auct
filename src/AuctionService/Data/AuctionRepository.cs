using AuctionService.DTOs;
using AuctionService.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace AuctionService.Data;

public class AuctionRepository : IAuctionRepository
{
    private readonly AuctionDbContext _context;
    private readonly IMapper _mapper;

    public AuctionRepository(AuctionDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public Task<List<AuctionDto>> GetAuctionsAsync(string date)
    {
        var queryable = _context.Auctions.OrderBy(x => x.Item.Make).AsQueryable();
        if (!string.IsNullOrEmpty(date))
            queryable = queryable.Where(x => x.UpdatedAt.CompareTo(DateTime.Parse(date).ToUniversalTime()) > 0);
        return queryable.ProjectTo<AuctionDto>(_mapper.ConfigurationProvider).ToListAsync();
    }

    public async Task<AuctionDto> GetAuctionByIdAsync(Guid id)
    {
        return await _context.Auctions.ProjectTo<AuctionDto>(_mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<Auction> GetAuctionEntityById(Guid id)
    {
        return await _context.Auctions
            .Include(x => x.Item)
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public void AddAuction(Auction action)
    {
        _context.Auctions.Add(action);
    }

    public void RemoveAuction(Auction action)
    {
        _context.Auctions.Remove(action);
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}