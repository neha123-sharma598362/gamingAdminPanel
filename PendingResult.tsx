import Header from "../components/common/Header";
import SportsOverviewCards from "../components/sports/SportsOverviewCards";
import AIPoweredInsights from "../components/analytics/AIPoweredInsights";
import { IconType } from "react-icons";
import { HiStatusOnline } from "react-icons/hi";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { BiEdit, BiPaperPlane } from "react-icons/bi";
import { TbLogs } from "react-icons/tb";
import TableComponent_Profile from "../components/profile/TableComponent_Profile";
import axios from "axios";
import { useEffect, useState } from "react";

interface DataItem {
  name: string;
  value: number;
  Total: number;
  icon: IconType;
}

type TableHeadings = {
  heading: string;
};

const TableHeading: TableHeadings[] = [
  { heading: "Question" },
  { heading: "Match" },
  { heading: "End Time" },
  { heading: "Predictions" },
  { heading: "Action" },
];

interface Transaction {
  _id?: string;
  question?: string;
  match?: string;
  endTime?: string;
  predictions?: string | number;
  status?: string;
}

interface DropDownOptions {
  id: string;
  label: string;
  icon: IconType;
  link?: string;
}

const dropDownOptions: DropDownOptions[] = [
  { id: "1", label: "Edit", icon: BiEdit },
  { id: "2", label: "Refund Bet", icon: BiPaperPlane },
  { id: "3", label: "Bet Log", link: "bet-logs", icon: TbLogs },
];

const PendingResult = () => {
  const data: DataItem[] = [
    { name: "Active Category", value: 6, Total: 7, icon: HiStatusOnline },
    { name: "InActive Category", value: 1, Total: 7, icon: HiStatusOnline },
    { name: "Created Today", value: 5, Total: 7, icon: MdOutlineBookmarkAdded },
    { name: "Created This month", value: 6, Total: 15, icon: MdOutlineBookmarkAdded },
  ];

  const [matchData, setMatchData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = "http://localhost:2000";
  const API_ENDPOINT = `${API_BASE_URL}/api/v1/admin/questions`;

  // Fetch Questions 
  const fetchQuestions = async () => {
    try {
      setLoading(true);

      const matchRes = await axios.get(`${API_BASE_URL}/api/v1/admin/get_matches`);
      const matches = matchRes.data?.data?.matches || [];

      const matchMap = new Map<string, string>();
      matches.forEach((m: any) => {
        matchMap.set(m._id, m.title);
      });

      const response = await axios.get(API_ENDPOINT);
      const result = response.data?.data?.questions || [];

      const formattedData: Transaction[] = result.map((item: any) => {
        const matchName = matchMap.get(item.matchId) || "Match";

        return {
          _id: item._id,
          question: item.question || "N/A",
          match: matchName,
          endTime: item.endTime
            ? new Date(item.endTime).toLocaleString()
            : "N/A",
          predictions: item.selections?.length || 0,
          status: item.status || "N/A",
        };
      });

      setMatchData(formattedData);
    } catch (err) {
      console.error("Error fetching:", err);
      setError("Error fetching questions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="flex-1 overflow-auto relative z-10 text-white bg-gray-900">
      <Header title={"Pending Results"} />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <SportsOverviewCards data={data} />

        <div className="w-full justify-between flex mt-16 my-5 items-center">
          <span className="text-lg font-bold">Result History</span>
        </div>

        {loading ? (
          <div className="text-center text-gray-400 my-10">Loading results...</div>
        ) : error ? (
          <div className="text-center text-red-500 my-10">{error}</div>
        ) : (
          <TableComponent_Profile
            TableData={matchData}
            TableHeading={TableHeading}
            dropDownOptions={dropDownOptions}
          />
        )}

        <AIPoweredInsights />
      </main>
    </div>
  );
};

export default PendingResult;
