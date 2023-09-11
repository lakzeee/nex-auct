import { useParamsStore } from "@/app/Components/hooks/useParamsStore";
import {
  BiAlarm,
  BiAlarmExclamation,
  BiAlarmOff,
  BiMeteor,
  BiSortAZ,
  BiSun,
} from "react-icons/bi";

type Props = {
  pageSize: number;
  setPageSize: (size: number) => void;
};
const pageSizeButtons = [4, 8, 12];
const orderByButtons = [
  {
    label: "A-Z",
    icon: BiSortAZ,
    value: "make",
  },

  {
    label: "Ending Soon",
    icon: BiAlarm,
    value: "endingSoon",
  },
  {
    label: "New",
    icon: BiMeteor,
    value: "new",
  },
];

const filterByButtons = [
  {
    label: "Live",
    icon: BiSun,
    value: "live",
  },

  {
    label: "End In 6H",
    icon: BiAlarmExclamation,
    value: "endingSoon",
  },
  {
    label: "Completed",
    icon: BiAlarmOff,
    value: "finished",
  },
];
export default function Filters() {
  const pageSize = useParamsStore((state) => state.pageSize);
  const setParams = useParamsStore((state) => state.setParams);
  const orderBy = useParamsStore((state) => state.orderBy);
  const filterBy = useParamsStore((state) => state.filterBy);
  return (
    <div className="flex flex-col items-start mb-4 gap-2 justify-between lg:flex-row lg:justify-between">
      <div>
        <span className="mr-2 text-xs">FILTER</span>
        <div className="join">
          {filterByButtons.map(({ label, icon: Icon, value }) => (
            <button
              key={value}
              onClick={() => setParams({ filterBy: value })}
              className={`join-item btn btn-xs md:btn-sm ${
                filterBy === value && "btn-primary"
              }`}
            >
              <Icon />
              {label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <span className="mr-2 text-xs">ORDER</span>
        <div className="join">
          {orderByButtons.map(({ label, icon: Icon, value }) => (
            <button
              key={value}
              onClick={() => setParams({ orderBy: value })}
              className={`join-item btn btn-xs md:btn-sm ${
                orderBy === value && "btn-primary"
              }`}
            >
              <Icon />
              {label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <span className="mr-2 text-xs">PAGE SIZE</span>
        <div className="join">
          {pageSizeButtons.map((value, i) => (
            <button
              key={i}
              onClick={() => setParams({ pageSize: value })}
              className={`join-item btn btn-xs md:btn-sm ${
                pageSize === value && "btn-primary"
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
