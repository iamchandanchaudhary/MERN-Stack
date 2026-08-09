import PortalLayout from "../Components/PortalLayout";
import RoleCard from "../Components/RoleCard";
import { ROLE_CONFIG } from "../data/roleConfig";

const RoleSelectionPage = () => {
  return (
    <PortalLayout>
      <section>
        <h2 className="font-heading">Select Your Role</h2>
        <p className="mt-[10px] text-text-muted">
          Choose Student, Teacher, or Admin to continue to the dedicated login
          screen.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 min-[641px]:grid-cols-2 min-[901px]:grid-cols-3">
          {Object.entries(ROLE_CONFIG).map(([roleKey, role]) => (
            <RoleCard key={roleKey} roleKey={roleKey} role={role} />
          ))}
        </div>
      </section>
    </PortalLayout>
  );
};

export default RoleSelectionPage;
