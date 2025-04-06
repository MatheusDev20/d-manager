import { StartNewDaily } from "@/app/page";
import { DetailsDailyDialog } from "./daily-details-dialog";
import { NewDailyDialog } from "./new-daily-dialog";

type Props = {
  type: "new" | "details" | null;
  isOpen: boolean;
  closeDialog: () => void;
  dailyData?: Omit<StartNewDaily, "isPastDate">;
};

export const ManagerDialogs = ({
  type,
  dailyData,
  isOpen,
  closeDialog,
}: Props) => {
  return (
    <>
      {type === "new" && dailyData && dailyData.day && dailyData.begin && (
        <NewDailyDialog
          data={{ day: dailyData.day, begin: dailyData.begin }}
          isOpen={isOpen}
          closeDialog={closeDialog}
        />
      )}
      {type === "details" && (
        <DetailsDailyDialog isOpen={isOpen} closeDialog={closeDialog} />
      )}
    </>
  );
};
