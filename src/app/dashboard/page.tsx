import { WidgetItem } from "@/components";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {

  const session = await auth();
  if (!session?.user) return redirect('/api/auth/signin');

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <WidgetItem title="Usuario conectado S-Side">
        <div className="flex flex-col">
          <span> { session?.user?.name } </span>
          <span> { session?.user?.image } </span>
          <span> { session?.user?.email } </span>
        </div>
      </WidgetItem>
    </div>
  );
}