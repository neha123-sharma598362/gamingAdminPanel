import { useState, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { Search, Send } from "lucide-react";
import { IconType } from "react-icons";
import SportsDialog from "../sports/SportsDialog";

interface Data {
  _id?: string | undefined;
  trxNumber?: string;
  method?: string;
  amount?: string;
  charge?: string;
  payableAmount?: string;
  payableInBase?: string;
  status?: string;
  date?: string;
  action?: string;
  payout?: string;
  verificationType?: string;
  betDescription?: string;
  remarks?: string;
  question?: string;
  predictions?: string;
  endTime?: string;
  match?: string;
  options?: string;
  ratio?: string;
  totalPrediction?: string;
  user?: { username: string; useremail: string };
  option?: string;
  result?: string;
}

type TableHeading = {
  heading: string;
};

interface dropDownOptions {
  id: string;
  label: string;
  icon: IconType;
  link?: string;
}

interface Props {
  TableData: Data[];
  TableHeading: TableHeading[];
  Title?: string;
  dropDownOptions?: dropDownOptions[];
}

const TableComponent_Results = ({
  TableData,
  TableHeading,
  Title = "Data",
}: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  // ✅ FINAL FIXED SEARCH FUNCTION
  const filteredData = TableData.filter((data) => {
    const term = searchTerm.toLowerCase();

    return (
      data.user?.username?.toLowerCase().includes(term) ||
      data.user?.useremail?.toLowerCase().includes(term) ||
      data.method?.toLowerCase().includes(term) ||
      data.status?.toLowerCase().includes(term) ||
      data.date?.toLowerCase().includes(term) ||
      data.question?.toLowerCase().includes(term) ||
      data.option?.toLowerCase().includes(term) ||
      data.options?.toLowerCase().includes(term) ||
      data.result?.toLowerCase().includes(term) ||
      data.match?.toLowerCase().includes(term) ||
      data.endTime?.toLowerCase().includes(term)
    );
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">{Title}</h2>

        {/* 🔍 Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search data..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              {TableHeading.map((heading) => (
                <th
                  key={heading.heading}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  {heading.heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredData.map((data, index) => (
              <motion.tr
                key={data._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {TableHeading.map(
                  (heading) =>
                    heading.heading === "No." && (
                      <td
                        key={heading.heading}
                        className="px-6 py-4 whitespace-nowrap"
                      >
                        <div className="text-sm text-gray-300">{index + 1}</div>
                      </td>
                    )
                )}

                {/* USER */}
                {data.user && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                        {data.user.username.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-100">
                          {data.user.username}
                        </div>
                        <div className="text-xs text-gray-300">
                          {data.user.useremail}
                        </div>
                      </div>
                    </div>
                  </td>
                )}

                {data.trxNumber && (
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {data.trxNumber}
                  </td>
                )}

                {data.options && (
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {data.options}
                  </td>
                )}

                {data.ratio && (
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {data.ratio}
                  </td>
                )}

                {data.totalPrediction && (
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {data.totalPrediction}
                  </td>
                )}

                {data.method && (
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {data.method}
                  </td>
                )}

                {data.amount && (
                  <td className="px-6 py-4">
                    <div
                      className={`${
                        data.status === "Pending"
                          ? "text-yellow-600"
                          : data.status === "Successful"
                          ? "text-green-600"
                          : "text-red-600"
                      } font-bold text-sm`}
                    >
                      {data.amount}
                    </div>
                  </td>
                )}

                {data.question && (
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {data.question}
                  </td>
                )}

                {data.option && (
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {data.option}
                  </td>
                )}

                {data.result && (
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {data.result}
                  </td>
                )}

                {data.match && (
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {data.match}
                  </td>
                )}

                {data.endTime && (
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {data.endTime}
                  </td>
                )}

                {/* Status */}
                {data.status && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex items-center text-xs font-semibold rounded-full
                        ${
                          data.status === "Successful"
                            ? "bg-green-200 text-green-600"
                            : data.status === "Pending"
                            ? "text-yellow-600"
                            : data.status === "Active"
                            ? "bg-green-200 text-green-600"
                            : data.status === "Win"
                            ? "bg-green-200 text-green-600"
                            : data.status === "Refunded"
                            ? "bg-pink-200 text-pink-400"
                            : "bg-red-200 text-red-600"
                        }
                      `}
                    >
                      {data.status}
                    </span>
                  </td>
                )}

                {/* Date */}
                {data.date && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-blue-900 text-white">
                      {data.date.split("T")[0]}
                    </span>
                  </td>
                )}

                {/* Action */}
                {TableHeading.map(
                  (heading) =>
                    heading.heading === "Action" && (
                      <td
                        key="action"
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex items-center"
                      >
                        {data.status === "Pending" && (
                          <div
                            onClick={openDialog}
                            className="border cursor-pointer border-gray-800 px-2 py-1 rounded"
                          >
                            <Send size={20} />
                          </div>
                        )}

                        {(data.status === "Lost" ||
                          data.status === "Win" ||
                          data.status === "Refunded") && (
                          <button
                            disabled
                            className="border disabled:cursor-not-allowed disabled:opacity-20 border-gray-800 px-2 py-1 rounded"
                          >
                            <Send size={20} />
                          </button>
                        )}
                      </td>
                    )
                )}
              </motion.tr>
            ))}
          </tbody>
        </table>

        {/* Dialog */}
        <SportsDialog
          isOpen={isOpen}
          close={closeDialog}
          heading="✔ Make Winner"
          positiveButtonName={"YES"}
        >
          <div className="py-12 text-white">
            <strong>Do you want to make this winner ?</strong>
          </div>
        </SportsDialog>
      </div>
    </motion.div>
  );
};

export default TableComponent_Results;
