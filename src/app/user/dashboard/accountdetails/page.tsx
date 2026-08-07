import AccountDetailsForm from "@/components/dash/forms/AccountDetailsForm";
import { getCurrentUser } from "@/lib/current-user";

export default async function AccountDetailsPage() {
  const user = await getCurrentUser();
  const wi = user?.withdrawal_info ?? {};
  return (
    <>
      <div className="mt-2 mb-4">
        <h1 className="text-light">Add your withdrawal info</h1>
      </div>
      <AccountDetailsForm
        bankName={wi.bank?.bank_name ?? ""}
        accountName={wi.bank?.account_name ?? ""}
        accountNumber={wi.bank?.account_number ?? ""}
        routingNumber={wi.bank?.routing_number ?? ""}
        btcAddress={wi.crypto?.btc_address ?? ""}
        cashAppTag={wi.cash_app?.cash_app_tag ?? ""}
      />
    </>
  );
}
