import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker, defaultStaticRanges } from "react-date-range";
import { useContext } from "react";
import overviewContext from "../../../store/overview/overviewContext";
import { subDays } from "date-fns";

const CustomDateRangePicker = () => {
    const { dateRange, setDateRange } = useContext(overviewContext)
    const filteredStaticRanges = defaultStaticRanges.filter(range => (range.label !== "Today" && range.label !== "This Week"));
    return (
        <DateRangePicker
            onChange={(item) => { setDateRange([item.selection]); console.log(item.selection) }}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={dateRange}
            direction="horizontal"
            minDate={subDays(new Date(), 46)}
            maxDate={subDays(new Date(), 1)}
            staticRanges={filteredStaticRanges}
        />
    );
};

export default CustomDateRangePicker;
