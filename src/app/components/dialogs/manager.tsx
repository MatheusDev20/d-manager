import { isToday } from "date-fns";
import { DetailsDailyDialog } from "./daily-details-dialog";
import { NewDailyDialog } from "./new-daily-dialog";
import { useQuery } from "@tanstack/react-query";
import { Daily } from "@/src/app/@types";
import { fetchDaily } from "../../server/daily";

type Props = {
  dialogState: {
    params: { date: Date | null };
    isOpen: boolean;
  };
  closeDialog: () => void;
};

export const ManagerDialogs = ({ dialogState, closeDialog }: Props) => {
  const { isOpen, params } = dialogState;

  const { data, isLoading } = useQuery({
    queryKey: ["details_daily", params],
    queryFn: async () => await fetchDaily({ date: params.date as Date }),
    enabled: true,
  });

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
