import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon, Eye } from "lucide-react";
import { IconType } from "react-icons";
import { Link, useNavigate } from "react-router-dom";
import SportsDialog from "../sports/SportsDialog";
import axios from "axios";

interface DropDownOption {
  id: string;
  label: string;
  icon: IconType;
  link?: string;
}

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
  class?: string;
}

interface OptionsPopupProps {
  dropDownOptions: DropDownOption[] | undefined;
  data: Data;
}

export default function OptionsPopup({ dropDownOptions, data }: OptionsPopupProps) {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [dialogOpenItemId, setDialogOpenItemId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("active");
  const [date, setDate] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (dialogOpenItemId === "1") {
      setTitle(data.question || "");
      setStatus(data.status || "active");

      if (data.endTime) {
        const dateObj = new Date(data.endTime);
        const formattedDate = `${String(dateObj.getMonth() + 1).padStart(2, "0")}/${String(
          dateObj.getDate()
        ).padStart(2, "0")}/${dateObj.getFullYear()}`;
        setDate(formattedDate);
      }
    }
  }, [dialogOpenItemId]);

  const toggleDropdown = (id: string) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  const openDialog = (id: string) => {
    setDialogOpenItemId(id);
    setOpenDropdownId(null);
  };

  const closeDialog = () => {
    setDialogOpenItemId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Updated Question:", title);
    console.log("Updated Status:", status);
    console.log("Updated Date:", date);

    alert("Edit saved");
    closeDialog();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div className="flex items-center space-x-2">
        {data.class === "closedresult" ? (
          <Link
            to={`winner/${data._id}`}
            className="inline-flex justify-center gap-x-1.5 rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-800"
          >
            <Eye size={20} /> Look
          </Link>
        ) : (
          <Link
            to={`winner/${data._id}`}
            className="inline-flex justify-center gap-x-1.5 rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-800"
          >
            <Eye size={20} /> View
          </Link>
        )}

        <button
          className="inline-flex justify-center gap-x-1.5 rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-800"
          onClick={() => toggleDropdown(data._id || "")}
        >
          <ChevronDownIcon className="size-5 text-gray-400" />
        </button>
      </div>

      {data._id === openDropdownId && (
        <div className="absolute p-2 right-0 z-50 mt-2 origin-top-right rounded-md bg-[#1d2736] shadow-lg ring-4 ring-black/5 transition">
          {dropDownOptions &&
            dropDownOptions.map((item) => (
              <label
                key={item.id}
                className="flex cursor-pointer items-center text-sm text-white hover:bg-[#283549] rounded"
              >
                <item.icon size={16} />
                {item.label === "Bet Log" ? (
                  <div
                    className="cursor-pointer px-2 py-2 w-28 text-sm text-white hover:bg-[#283549] rounded"
                    onClick={() => navigate(`/sports/result/bet/user/${data._id}`)}
                  >
                    {item.label}
                  </div>
                ) : (
                  <span
                    className="cursor-pointer px-2 py-2 w-28 text-sm text-white hover:bg-[#283549] rounded"
                    onClick={() => openDialog(item.id)}
                  >
                    {item.label}
                  </span>
                )}
              </label>
            ))}
        </div>
      )}

      {/* Dialogs */}
      {dropDownOptions &&
        dropDownOptions.map((item) => (
          <SportsDialog
            key={item.id}
            handleSubmit={item.label === "Edit" ? handleSubmit : undefined}
            heading={item.label === "Edit" ? "Edit Question" : "✔ Refund Confirmation"}
            isOpen={dialogOpenItemId === item.id}
            close={closeDialog}
          >
            {item.label === "Edit" ? (
              <form onSubmit={handleSubmit}>
                <label className="w-full flex text-white mt-10">Title</label>
                <input
                  type="text"
                  className="w-full my-2 bg-[#1b2533] text-white border ring-1 ring-gray-700 border-[#25364d] p-2 rounded-md"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <label className="w-full flex mt-4 text-white">Status</label>
                <select
                  name="status"
                  className="flex my-2 ring-1 border-[#25364d] ring-gray-700 border w-full p-2 rounded-md text-white bg-[#1b2533]"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>

                <label className="w-full flex mt-4 text-white">End Date</label>
                <input
                  type="text"
                  className="w-full my-2 bg-[#1b2533] text-white border ring-1 ring-gray-700 border-[#25364d] p-2 rounded-md"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </form>
            ) : (
              <div className="py-12 text-white">
                <strong>Do you sure to refund this?</strong>
              </div>
            )}
          </SportsDialog>
        ))}
    </div>
  );
}