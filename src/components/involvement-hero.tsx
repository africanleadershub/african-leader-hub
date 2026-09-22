export function InvolvementHero({
  title,
  banner,
  kicker = "Get involved",
}: {
  title: string;
  banner: string;
  kicker?: string;
}) {
  return (
    <section className="relative h-[320px] text-white md:h-[380px]">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${banner})` }} />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#8B4513]/40 to-black/70" />
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-10 sm:px-6 lg:px-8">
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-amber-200">{kicker}</p>
        <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
      </div>
    </section>
  );
}
