function StatsCard({
  title,
  value,
  className
}) {

  return (
    <div className={`card ${className}`}>

      <p>{title}</p>

      <span className={className}>
        {value}
      </span>

    </div>
  )
}

export default StatsCard