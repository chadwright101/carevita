export default function Loading() {
  return (
    <div className="pt-10 px-6 max-w-[1280px] mx-auto">
      <div className="h-5 w-24 bg-black/10 animate-pulse mb-10" />
      <div className="flex flex-col gap-5 desktop:grid desktop:grid-cols-2 desktop:gap-10">
        <div className="w-full aspect-square bg-black/10 animate-pulse hidden desktop:block" />
        <div className="flex flex-col gap-4">
          <div className="h-8 w-3/4 bg-black/10 animate-pulse" />
          <div className="h-4 w-1/3 bg-black/10 animate-pulse" />
          <div className="h-64 w-full bg-black/10 animate-pulse mt-6" />
        </div>
      </div>
    </div>
  );
}
