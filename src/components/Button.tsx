export default ({
  children,
  handleClick,
}: {
  children: React.ReactNode
  handleClick: () => void
}) => {
  return (
    <button
      className="h-20 w-40 bg-e17-secondary-700 text-2xl font-bold text-white xl:h-24 xl:w-48 xl:text-3xl"
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
