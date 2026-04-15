export default function PriceTag({ deals }) {
  if (!deals || deals.length === 0) {
    return <span className="text-xs text-gray-500">No deals found</span>
  }

  return (
    <div className="flex flex-col gap-1">
      {deals.map((deal, i) => (
        <a
          key={i}
          href={deal.url}
          target="_blank"
          rel="noreferrer"
          className="flex justify-between items-center text-xs text-gray-400 hover:text-white transition"
        >
          <span>{deal.shop?.name ?? 'Store'}</span>
          <span className={i === 0 ? 'text-green-400 font-medium' : ''}>
            ${deal.price?.amount?.toFixed(2)}
          </span>
        </a>
      ))}
    </div>
  )
}