export default ({ title, handleClick }: { title: string, handleClick: () => void}) => {
    return (
        <button
          className="bg-transparent border-4 border-white mx-8 my-4 px-6 py-4 text-3xl font-extralight text-white "
          onClick={handleClick}
        >
          {title}
        </button>

    )}
