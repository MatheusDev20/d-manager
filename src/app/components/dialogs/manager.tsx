/* eslint-disable react-hooks/exhaustive-deps */
import { isToday } from "date-fns";
import { DetailsDailyDialog } from "./daily-details-dialog";
import { NewDailyDialog } from "./new-daily-dialog";
import { useQuery } from "@tanstack/react-query";
import { Daily } from "@/src/@types";
import { fetchDaily } from "../../server/daily";
import { useEffect } from "react";

type Props = {
  dialogState: {
    params: { date: Date | null };
    isOpen: boolean;
  };
  closeDialog: () => void;
  setLoading: (b: boolean) => void;
};

export const ManagerDialogs = ({
  dialogState,
  closeDialog,
  setLoading,
}: Props) => {
  const { isOpen, params } = dialogState;

  const { data, isLoading } = useQuery({
    queryKey: ["details_daily", params],
    queryFn: async () => await fetchDaily({ date: params.date as Date }),
    enabled: true,
  });

  useEffect(() => {
    if (isLoading) setLoading(true);
    else setLoading(false);
  }, [isLoading]);

  const isThisDateToday = isToday(params.date as Date);

  if (isThisDateToday && !data?.daily && data?.status === 404 && !isLoading) {
    return (
      <NewDailyDialog
        date={params.date as Date}
        isOpen={isOpen}
        closeDialog={closeDialog}
      />
    );
  }
  return (
    <>
      {data && !isLoading && (
        <DetailsDailyDialog
          daily={data.daily as Daily | null}
          date={dialogState.params.date as Date}
          isOpen={isOpen}
          closeDialog={closeDialog}
        />
      )}
    </>
  );
};
