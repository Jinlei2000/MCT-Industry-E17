export default ({ title, handleClick }: { title: string, handleClick: () => void}) => {
    return (
        <button
          className="absolute left-4 top-4 rounded bg-blue-500 px-4 py-2 text-lg font-medium text-white hover:bg-blue-600"
          onClick={handleClick}
        >
          {title}
        </button>

    )}