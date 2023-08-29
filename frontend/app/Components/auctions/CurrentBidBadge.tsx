type Props = {
  amount?: number;
  reservePrice: number;
};

export default function CurrentBidBadge({ amount, reservePrice }: Props) {
  const text = amount ? "$ " + amount : "No Bids";
  const color = amount
    ? amount > reservePrice
      ? "badge-accent"
      : "badge-secondary"
    : "badge-neutral";
  const tooltipText = amount
    ? amount > reservePrice
      ? "Highest bid"
      : "Lower than Reserved"
    : "Be the first to bid";
  return (
    <div className="tooltip tooltip-left z-40" data-tip={tooltipText}>
      <div className={`badge ${color} z-40`}>{text}</div>
    </div>
  );
}
