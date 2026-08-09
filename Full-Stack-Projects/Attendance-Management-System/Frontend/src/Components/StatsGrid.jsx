const StatsGrid = ({ stats }) => {
  return (
    <>
      <div className="mb-4 grid grid-cols-1 gap-[14px] min-[641px]:grid-cols-2 min-[901px]:grid-cols-3">
        {stats.map((item) => (
          <article
            key={item.label}
            className="rounded-2xl border border-[#e6edf8] bg-white p-4 shadow-[0_10px_20px_rgba(15,23,42,0.05)]"
          >
            <p className="m-0 text-[0.88rem] text-text-muted">{item.label}</p>
            <h3 className="mt-2 font-heading text-[1.48rem]">{item.value}</h3>
          </article>
        ))}
      </div>
    </>
  );
};

export default StatsGrid;
