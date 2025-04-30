import React, { Suspense } from "react";

import { AppTable } from "@/app/components/table";
import { list } from "@/app/data";

export default async function Page() {
  const developers = await list({ bringTasks: true, taskStatus: "Pending" });

  return (
    <div className="p-6">
      <Suspense fallback={<p>Carregando</p>}>
        <AppTable
          caption="Desenvolvedores cadastrados"
          head={["Nome", "Status", "Pendências Cadastradas"]}
          values={developers}
        />
      </Suspense>
    </div>
  );
}
