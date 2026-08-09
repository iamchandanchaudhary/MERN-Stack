const DashboardCardList = ({ title, items }) => {
  return (
    <>
      <article className="rounded-2xl border border-[#e8eef8] bg-[linear-gradient(155deg,#ffffff,#f8fbff)] p-[18px]">
        <h3 className="font-heading text-[1.06rem]">{title}</h3>
        <ul className="marker:text-[var(--accent-primary)] mt-3 list-disc pl-[18px] text-[#334155] leading-[1.7]">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
    </>
  );
};

export default DashboardCardList;
