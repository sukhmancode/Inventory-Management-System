import { ChartArea } from "@/app/Components/AreaChart";
import { ChartBar } from "@/app/Components/BarCharts";

export default function Reports() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            <ChartArea/>
            <ChartBar/>
        </div>
    )
}