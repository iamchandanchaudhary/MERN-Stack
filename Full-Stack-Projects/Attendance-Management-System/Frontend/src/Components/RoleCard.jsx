import { Link } from "react-router-dom";

const RoleCard = ({ roleKey, role }) => {
  return (
    <Link
      to={`/login/${roleKey}`}
      className="relative block overflow-hidden rounded-[22px] bg-white p-5 text-inherit no-underline shadow-[0_16px_32px_rgba(15,23,42,0.08)] transition duration-200 ease-in-out hover:-translate-y-1.5 hover:shadow-[0_20px_34px_rgba(15,23,42,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 before:absolute before:inset-[-30%_50%_auto_-10%] before:h-[120px] before:rotate-[-6deg] before:bg-gradient-to-r before:from-[var(--card-primary)] before:to-[var(--card-secondary)] before:opacity-[0.16] before:content-['']"
      style={{
        "--card-primary": role.accentPrimary,
        "--card-secondary": role.accentSecondary,
      }}
    >
      <span className="relative z-[1] inline-flex min-w-11 items-center justify-center rounded-full bg-[rgba(15,23,42,0.08)] px-3 py-1.5 font-heading text-[0.78rem] font-bold tracking-[0.06em]">
        {role.shortCode}
      </span>
      <h3 className="relative z-[1] mt-[14px] font-heading text-[1.12rem]">{role.title}</h3>
      <p className="relative z-[1] mb-[18px] mt-[10px] text-[0.95rem] leading-[1.45] text-text-muted">
        {role.description}
      </p>
      <span className="relative z-[1] text-[0.88rem] font-extrabold text-[var(--card-primary)]">
        Open {role.title} Login
      </span>
    </Link>
  );
};

export default RoleCard;
