import { useState, ChangeEvent } from "react";
import { motion } from "framer-motion";
import {  Edit,Edit2,Eye,Lock,Logs,Search, Trash2,  } from "lucide-react";
import { IconType } from "react-icons";
import SportsDialog from "../sports/SportsDialog";
import OptionsPopup from "../common/Dropdown";
import { MenuItem, MenuItems } from "@headlessui/react";
import { Link } from "react-router-dom";
import { BiEdit, BiPaperPlane } from "react-icons/bi";
import { TbLogs } from "react-icons/tb";


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
  payout?:string
  verificationType?:string;
  betDescription?:string
  remarks?:string;
  question?:string;
  predictions?:string;
  endTime?:string;
  match?:string;
  options?:string
  ratio?:string
  totalPrediction?:string
  class?:string
  user?:{username:string,useremail:string}
}
type TableHeading={
  heading:string;
  }


      
  interface dropDownOptions{
    id:string;
    label:string;
    icon:IconType
    link?:string
  }
  interface Props{
    TableData:Data[] ;
    TableHeading:TableHeading[]
    Title?:string
    dropDownOptions?:dropDownOptions[]
  }



const TableComponent_Profile = ({TableData,TableHeading,Title='Data',dropDownOptions}:Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Data[]>(TableData);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenViewDialog, setIsOpenViewDialog] = useState(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  const closeViewDialog = () => setIsOpenViewDialog(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Data | null>(null);
  const [openPopupId, setOpenPopupId] = useState<string | null>(null);
  
  
  const togglePopup = (id: string) => {
    setOpenPopupId((prevId) => (prevId === id ? null : id));
  };


  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
  const term = e.target.value.toLowerCase();
  setSearchTerm(term);

  const filtered = TableData.filter((data) => {
    const question = data.question?.toLowerCase() || "";
    const match = data.match?.toLowerCase() || "";
    const endTime = data.endTime?.toLowerCase() || "";
    const date = data.date?.toLowerCase() || "";
    const status = data.status?.toLowerCase() || "";

    return (
      question.includes(term) ||
      match.includes(term) ||
      endTime.includes(term) ||
      date.includes(term) ||
      status.includes(term)
    );
  });

  setFilteredData(filtered);
};


  const handleEdit =()=>{
    setIsOpen(true)
  }
  
  const handleView =()=>{
    setIsOpenViewDialog(true)
  }





    const [isModalOpen, setIsModalOpen] = useState(false);
  
    
    const paymentInfo = {
      amountPaid: '$23,809.52',
      datePaid: '15/11/2024',
      paymentMethod: 'Bank Transfer',
      accountNumber: '77458999+',
      beneficiaryName: 'Gjuhbdfhjj',
      address: '6458990854',
      nid: 'Image Description', 
    };
  
  
    const [feedback, setFeedback] = useState('');
  
    
    const openModal = () => setIsModalOpen(true);
  
    
    const closeModal = () => setIsModalOpen(false);
  

    const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFeedback(e.target.value);
    };
  
    
    const handleSubmitFeedback = () => {
      console.log('Feedback submitted:', feedback);
      closeModal(); 
    };


  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">{Title}</h2>
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

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
            {TableHeading.map((heading)=>(
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {heading.heading}
               </th>
            ))}
          
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredData.map((data,index) => (
              <motion.tr
                key={data._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                 {TableHeading.map((heading)=>(
                   heading.heading==='No.'&&<>{ index+1 &&  <td className="px-6 py-4 whitespace-nowrap ">
                   <div className="text-sm text-gray-300">{index+1}</div>
                 </td> }</>
                     ))}

                { data.trxNumber &&  <td className="px-6 py-4 whitespace-nowrap ">
                  <div className="text-sm text-gray-300">{data.trxNumber}</div>
                </td> }
               
              {data.user &&
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">

                    
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                        {data.user?.username.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-100 grid items-center"><span>{data.user?.username}</span> <span className="text-[12px] text-gray-300">{data.user?.useremail}</span></div>

                    </div>
                  </div>
                </td> }
            


                { data.method &&  <td className="px-6 py-4 whitespace-nowrap ">
                  <div className="text-sm text-gray-300">{data.method}</div>
                </td> }

                { data.amount &&  <td className="px-6  py-4 whitespace-nowrap ">
                  <div className={` ${data.status=='Pending'?'text-yellow-600':data.status=='Successful'?'text-green-600':'text-red-600'} font-bold text-sm text-gray-300`}>{data.amount}</div>
                </td> }
              
                { data.verificationType &&  <td className="px-6  py-4 whitespace-nowrap ">
                  <div className="text-sm text-gray-300">{data.verificationType}</div>
                </td> }
              
                { data.charge?  <td className="px-6 py-4 whitespace-nowrap ">
                  <div className="text-sm text-red-600 font-bold">{data.charge}</div>
                </td> :null}
                { data.payout?  <td className="px-6 py-4 whitespace-nowrap ">
                  <div className="text-sm text-gray-300">{data.payout}</div>
                </td> :null}

             
                { data.betDescription?  <td className="px-6bg-red-300 py-4 whitespace-nowrap ">
                  <div className="text-sm text-gray-300">{data.betDescription}</div>
                </td> :null}
               
                { data.remarks?  <td className="px-6  py-4 whitespace-nowrap ">
                  <div className="text-sm text-gray-300">{data.remarks}</div>
                </td> :null}
               
                { data.question &&  <td className="px-6  py-4 whitespace-nowrap ">
                  <div className="text-sm text-gray-300">{data.question}</div>
                </td> } 
                { data.match?  <td className="px-6 py-4 whitespace-nowrap ">
                  <div className="text-sm text-gray-300">{data.match}</div>
                </td> :null}  
                { data.endTime?  <td className="px-6 py-4 whitespace-nowrap ">
                  <div className="text-sm text-gray-300">{data.endTime}</div>
                </td> :null}  
                 { data.predictions &&  <td className="px-6 py-4 whitespace-nowrap ">
                  <div className="text-sm text-gray-300">{data.predictions}</div>
                </td> } 
             
               

                { data.payableAmount?  <td className="px-6 py-4 whitespace-nowrap ">
                  <div className="text-sm text-gray-300">{data.payableAmount}</div>
                </td> :null}
                
                { data.payableInBase?  <td className="px-6 py-4 whitespace-nowrap ">
                  <div className="text-sm text-gray-300">{data.payableInBase}</div>
                </td> :null}

               {data.status?    <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${
                        data.status === 'Successful'
                      ? 'bg-green-200 text-green-600'
                      : data.status === 'Pending'
                      ? 'text-yellow-600'
                      : data.status === 'Active'
                      ? 'bg-green-200 text-green-600'
                      : data.status === 'Inactive'
                      ? 'bg-red-200 text-red-600'
                      : 'bg-red-200 text-red-600'
                  }`}
                >
                  {data.status}
                </span>
                  </td> :null}
             
                  {data.date &&
                   <td className="px-6  py-4 whitespace-nowrap">
                   <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-900 text-white">
                     {data.date.split('T')[0]}
                   </span>
                 </td>
                   } 

              
                
                    {/* {data.locker && 
              <td>{TableHeading.map((item)=>(
                item.heading==='Locker'?
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex items-center">
                <Lock className="text-indigo-400 hover:text-indigo-300 mr-2 cursor-pointer"  />
              </td>
                :null
              ))}
              </td>} */}


                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex items-center">
                  <Edit onClick={handleEdit} className="text-indigo-400 hover:text-indigo-300 mr-2 cursor-pointer"  />
                  <Trash2 className="text-red-400 hover:text-red-300 cursor-pointer"/>
                </td> */}


   {/* Action Column */}
   {TableHeading.map((heading)=>(
    heading.heading==='Action'&&
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex items-center">
    {data.status === 'Successful' && data.trxNumber &&  (<>
      <Eye
        onClick={() => handleView()}
        className="text-green-400 hover:text-green-300 mr-2 cursor-pointer"
      /></>
    )}
    {data.status === 'Pending' && (
      <Edit
        onClick={() => handleEdit()}
        className="text-orange-400 hover:text-orange-300 mr-2 cursor-pointer"
      />
    )}
    {data.status === 'Cancel' && (<>
      <Eye
        onClick={() => handleView()}
        className="text-red-400 hover:text-red-300 cursor-pointer"
      /> </>
    )}

 {  data.method ? null:
      <OptionsPopup  data={data}  dropDownOptions={dropDownOptions} />
    } 
  </td>
  
      ))}
              
 
          
              </motion.tr>
            ))}
          </tbody>
        </table>
        <SportsDialog  heading="view" isOpen={isOpen} close={closeDialog}>
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 ">
          <div className="bg-gray-800 text-white p-6 rounded-lg ">
            <h2 className="text-xl font-semibold mb-4 justify-center flex ">Payment Information</h2>

            {/* Payment Information */}
            <div className="mb-4 flex gap-16">
              <p className="text-gray-500 text-[11px]">AMOUNT PAID:    <p className="text-white text-sm">{paymentInfo.amountPaid}</p></p>             
              <p className="text-gray-500 text-[11px]">DATE PAID:      <p className="text-white text-sm"><strong> {paymentInfo.datePaid}</strong></p></p>
              <p className="text-gray-500 text-[11px]">PAYMENT METHOD: <p className="text-white text-sm"><strong> {paymentInfo.paymentMethod}</strong></p></p>
            </div>

            <div className="mb-4 grid grid-cols-1 ">
              <h3 className="font-medium my-2">Summary</h3>
              <p className="flex justify-between text-sm rounded-t-md p-4 border border-gray-600">Account Number:  <span className="font-bold">{paymentInfo.accountNumber}</span></p>
              <p className="flex justify-between text-sm p-4 border border-gray-600">Beneficiary Name:             <span className="font-bold">{paymentInfo.beneficiaryName}</span></p>
              <p className="flex justify-between text-sm p-4 border border-gray-600">Address:                      <span className="font-bold">{paymentInfo.address}</span></p>
              <p className="flex justify-between text-sm rounded-b-md p-4 border border-gray-600">NID:             <span className="font-bold">{paymentInfo.nid}</span></p>
            </div>

            {/* Feedback Form */}
            <div className="mb-4">
              <h3 className="font-medium">Send Your Feedback</h3>
              <input
                type="text"
                value={feedback}
                onChange={handleFeedbackChange}
                placeholder="Enter feedback here"
                className="border p-2 w-full mt-2"
              />
            </div>

            <div className="mt-4 flex justify-between space-x-2 gap-4 ">
              <div>
              <button
                onClick={handleSubmitFeedback}
                className="bg-green-600 text-white p-2 rounded-md mr-4"
              >
                Approved
              </button>
              <button
                onClick={handleSubmitFeedback}
                className="bg-red-600 text-white p-2 rounded-md"
              >
                Rejected
              </button>
              </div>
              <button
                onClick={closeDialog}
                className="bg-transparent border-gray-600  text-white p-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
        </SportsDialog>



        {/* view doalog */}

        <SportsDialog  heading="view" isOpen={isOpenViewDialog} close={closeViewDialog}>
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg ">
            <h2 className="text-xl font-semibold mb-4 justify-center flex ">Payment Information</h2>

            {/* Payment Information */}
            <div className="mb-4 flex gap-16">
              <p className="text-gray-500 text-[11px]">AMOUNT PAID:    <p className="text-white text-sm">{paymentInfo.amountPaid}</p></p>             
              <p className="text-gray-500 text-[11px]">DATE PAID:      <p className="text-white text-sm"><strong> {paymentInfo.datePaid}</strong></p></p>
              <p className="text-gray-500 text-[11px]">PAYMENT METHOD: <p className="text-white text-sm"><strong> {paymentInfo.paymentMethod}</strong></p></p>
            </div>

            <div className="mb-4 grid grid-cols-1 ">
              <h3 className="font-medium my-2">Summary</h3>
              <p className="flex justify-between text-sm rounded-t-md p-4 border border-gray-600">Account Number:  <span className="font-bold">{paymentInfo.accountNumber}</span></p>
              <p className="flex justify-between text-sm p-4 border border-gray-600">Beneficiary Name:             <span className="font-bold">{paymentInfo.beneficiaryName}</span></p>
              <p className="flex justify-between text-sm p-4 border border-gray-600">Address:                      <span className="font-bold">{paymentInfo.address}</span></p>
              <p className="flex justify-between text-sm rounded-b-md p-4 border border-gray-600">NID:             <span className="font-bold">{paymentInfo.nid}</span></p>
            </div>

            {/* Feedback Form */}
            <div className="mb-4">
              <h3 className="font-medium">Send Your Feedback</h3>
              <input
                type="text"
                value={feedback}
                onChange={handleFeedbackChange}
                placeholder="Enter feedback here"
                className="border p-2 w-full mt-2"
              />
            </div>

            <div className="mt-4 flex justify-between space-x-2 gap-4 ">
          
              <button
                onClick={closeViewDialog}
                className="bg-transparent border-gray-600  text-white p-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
        </SportsDialog>
      </div>
    </motion.div>
  );
};

export default TableComponent_Profile;
