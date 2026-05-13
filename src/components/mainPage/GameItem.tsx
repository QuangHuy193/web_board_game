const GameItem = () => {
  return (
    <div>
      <button
        className="
              group
              aspect-square
              rounded-3xl
              bg-white/10
              backdrop-blur-lg
              border border-white/10
              hover:border-cyan-400/50
              hover:scale-105
              transition-all duration-300
              flex flex-col items-center justify-center
              gap-4
              shadow-xl
            "
      >
        <div
          className="
                w-18 h-18
                rounded-2xl
                bg-cyan-400/10
                flex items-center justify-center
                group-hover:bg-cyan-400/20
                transition
              "
        >
         {/* <Icon size={42} className="text-cyan-300" /> */}
        </div>

        <p className="text-white font-semibold text-lg">game1</p>
      </button>
    </div>
  );
};

export default GameItem;
