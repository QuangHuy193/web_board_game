// components/ui/Loader.tsx
type LoaderProps = {
  text?: string;
};

const Loader = ({ text }: LoaderProps) => {
  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center
      bg-black/50 backdrop-blur-md
    "
    >
      <div className=" flex items-center flex-col">
        <div
          className="
            relative
    
            flex h-28 w-28
            items-center justify-center
          "
        >
          {/* outer ring */}
          <div
            className="
              absolute inset-0
    
              animate-spin
    
              rounded-full
              border-4
              border-purple-500/20
              border-t-pink-500
              border-r-purple-500
    
              shadow-[0_0_40px_rgba(168,85,247,0.5)]
            "
          />

          {/* inner ring */}
          <div
            className="
              absolute inset-3
    
              animate-spin
              rounded-full
    
              border-4
              border-pink-500/10
              border-b-pink-400
    
              [animation-direction:reverse]
              [animation-duration:1.2s]
            "
          />

          {/* center */}
          <div
            className="
              z-10
              rounded-full

              bg-linear-to-r
              from-pink-500
              to-purple-500
              w-5 h-5
              shadow-lg
            "
          ></div>
        </div>
        <div
          className="mt-3 bg-linear-to-r rounded-full   text-sm
              font-extrabold
              tracking-wider
              text-white px-2 py-1
              from-pink-500
              to-purple-500"
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export default Loader;
