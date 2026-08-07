import { getAllPlans } from "@/lib/admin-data";
import PlanForm from "@/components/admin/PlanForm";

export const dynamic = "force-dynamic";

export default async function AdminPlansPage() {
  const plans = await getAllPlans();

  return (
    <>
      <div className="admin-topbar">
        <h1 className="admin-h1">Investment Plans</h1>
      </div>
      <p className="admin-muted" style={{ marginTop: -12, marginBottom: 20 }}>
        These values drive the pricing cards on the public landing page.
      </p>

      <PlanForm planId="starter" {...plans.starter} />
      <PlanForm planId="silver" {...plans.silver} />
      <PlanForm planId="gold" {...plans.gold} />
    </>
  );
}
