import { useParamsStore } from "@/app/Components/hooks/useParamsStore";
import Heading from "@/app/Components/layout/Heading";

type Props = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
};
export default function EmptyFilter({
  title = "No Matches Found",
  subtitle = "Try changing or resetting the filter",
  showReset,
}: Props) {
  const reset = useParamsStore((state) => state.reset);
  return (
    <div className="h-[40vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subTitle={subtitle} center />
      <div className="mt-4">
        {showReset && (
          <button className="btn btn-outline" onClick={reset}>
            Remove Filters
          </button>
        )}
      </div>
    </div>
  );
}
