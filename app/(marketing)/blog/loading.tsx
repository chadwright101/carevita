export default function Loading() {
  return (
    <div className="mt-10 px-6 grid grid-cols-1 gap-10 max-w-[1280px] tablet:mx-auto tablet:grid-cols-2 desktop:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-4">
          <div className="w-full aspect-[5/3] bg-black/10 animate-pulse" />
          <div className="flex flex-col gap-2">
            <div className="h-6 w-3/4 bg-black/10 animate-pulse" />
            <div className="h-4 w-1/2 bg-black/10 animate-pulse" />
            <div className="h-16 w-full bg-black/10 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
