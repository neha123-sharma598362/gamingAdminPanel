import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import TableComponent_Results from "../components/results/TableComponent_Results";
import AIPoweredInsights from "../components/analytics/AIPoweredInsights";
import axios from "axios";

export default function BetterList() {
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  const tableHeading = [
    { heading: "No." },
    { heading: "User" },
    { heading: "Question" },
    { heading: "Option" },
    { heading: "Result" },
  ];

  useEffect(() => {
    const fetchBetLogs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:2000/api/v1/admin/question_bets"
        );

        if (res.data.success) {
          const betLogs = res.data.data;

          const formatted = await Promise.all(
            betLogs.map(async (item: any, index: number) => {
              let questionName = "N/A";
              let optionName = "N/A";

              try {
                // Fetch question by market ID
                const qRes = await axios.get(
                  `http://localhost:2000/api/v1/admin/questions/${item.market}`
                );

                if (qRes.data?.data) {
                  const question = qRes.data.data;

                  // Set Question Name
                  questionName = question.question || "N/A";

                  // Find the selected option
                  const selectedOption = question.selections.find(
                    (s: any) => s._id === item.selection
                  );

                  if (selectedOption) {
                    optionName = selectedOption.name;
                  }
                }
              } catch (err) {
                console.log("Error fetching question:", err);
              }

              return {
                _id: item._id,
                no: index + 1,
                user: {
                  username: String(item.user).slice(0, 6) + "...",
                  useremail: item.user || "N/A",
                },
                question: questionName,
                option: optionName,
                result: item.result || item.status || "pending",
              };
            })
          );

          setTableData(formatted);
        } else {
          setError("No data found");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchBetLogs();
  }, []);

  return (
    <div className="flex-1 overflow-auto relative z-10 text-white bg-gray-900">
      <Header title={"Bet List"} />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {loading ? (
          <p className="text-center text-gray-400">Loading bet logs...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <TableComponent_Results
            TableData={tableData}
            TableHeading={tableHeading}
            Title=""
          />
        )}

        <AIPoweredInsights />
      </main>
    </div>
  );
}
