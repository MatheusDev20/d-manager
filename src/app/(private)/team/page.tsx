import React, { Suspense } from "react";

import { AppTable } from "@/src/app/components/table";
import { list } from "@/src/data";

export default async function Page() {
  const developers = await list({ bringTasks: false });

  return (
    <div className="p-6">
      {/* <h1 className="text-2xl font-bold mb-4">Desenvolvedores</h1> */}
      <Suspense fallback={<p>Carregando</p>}>
        <AppTable
          caption="Desenvolvedores cadastrados"
          head={["Nome", "Status", "Ações"]}
          values={developers}
        />
      </Suspense>
    </div>
  );
}
