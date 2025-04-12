import { format, isToday } from "date-fns";
import { DetailsDailyDialog } from "./daily-details-dialog";
import { NewDailyDialog } from "./new-daily-dialog";
import { useQuery } from "@tanstack/react-query";
import { Daily } from "@/src/app/@types";

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
    queryKey: ["details_daily"],
    queryFn: async () => {
      const response = await fetch(
        `/api/daily?byDay=${format(new Date(dialogState.params.date as Date), "yyyy-MM-dd")}`,
      );

      if (response.ok) {
        const parsed = await response.json();
        const { data, status } = parsed;
        return { daily: data, status };
      }

      return null;
    },
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
