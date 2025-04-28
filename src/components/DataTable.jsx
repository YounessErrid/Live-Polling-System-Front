
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPolls, addPoll, deletePoll } from "../store/pollsSlice";
import PollForm from "./CreatePullForm"; // Import the PollForm component

export const DataTable = ({ search }) => {
  const dispatch = useDispatch();
  const [editPoll, setEditPoll] = useState(null);

  const polls = useSelector((state) => state.polls.polls);
  const loading = useSelector((state) => state.polls.loading);
  const error = useSelector((state) => state.polls.error);

  useEffect(() => {
    dispatch(fetchPolls());

    const socket = new WebSocket("ws://127.0.0.1:8000/ws/polls/");
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "new_poll") {
        dispatch(addPoll(data.poll));
      }
    };

    return () => socket.close();
  }, [dispatch]);

  const filteredPolls = polls.filter((poll) =>
    poll.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && filteredPolls.length > 0 ? (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="p-4">#</th>
              <th className="px-6 py-3">Poll Question</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Created At</th>
              <th className="px-6 py-3">Updated At</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPolls.map((poll) => (
              <tr key={poll.id} className="bg-white border-b hover:bg-gray-50">
                <td className="w-4 p-4">#</td>
                <td className="px-6 py-4">{poll.question}</td>
                <td className="px-6 py-4">{poll.status ? "Active" : "Inactive"}</td>
                <td className="px-6 py-4">{new Date(poll.created_at).toLocaleString()}</td>
                <td className="px-6 py-4">{new Date(poll.updated_at).toLocaleString()}</td>
                <td className="px-6 py-4">
                  <button onClick={() => setEditPoll(poll)} className="text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => dispatch(deletePoll(poll.id))} className="text-red-600 hover:underline ms-3">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && !error && <p>No polls available.</p>
      )}

      {editPoll && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Edit Poll</h2>
              <button
                onClick={() => setEditPoll(null)}
                className="text-gray-500 hover:text-red-500 text-xl"
              >
                ×
              </button>
            </div>
            <PollForm
              mode="edit"
              initialData={editPoll}
              onSuccess={() => setEditPoll(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;






// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchPolls, addPoll, deletePoll } from "../store/pollsSlice"; // Import actions
// export const DataTable = ({ search }) => {
//   const dispatch = useDispatch();
//   const polls = useSelector((state) => state.polls.polls); // Get polls from Redux store
//   const loading = useSelector((state) => state.polls.loading);
//   const error = useSelector((state) => state.polls.error);

//   useEffect(() => {
//     dispatch(fetchPolls());

//     // WebSocket connection
//     const socket = new WebSocket("ws://127.0.0.1:8000/ws/polls/");

//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       if (data.type === "new_poll") {
//         dispatch(addPoll(data.poll)); // Dispatch the addPoll action when a new poll is received
//       }
//     };

//     return () => socket.close();
//   }, [dispatch]);

//   // Filter polls based on the search term
//   const filteredPolls = polls.filter((poll) =>
//     poll.question.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">Error: {error}</p>}

//       {!loading && !error && filteredPolls.length > 0 ? (
//         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th scope="col" className="p-4">
//                 <div className="flex items-center">
//                   <input
//                     id="checkbox-all-search"
//                     type="checkbox"
//                     className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
//                   />
//                   <label htmlFor="checkbox-all-search" className="sr-only">
//                     checkbox
//                   </label>
//                 </div>
//               </th>
//               <th scope="col" className="px-6 py-3">Poll Question</th>
//               <th scope="col" className="px-6 py-3">Status</th>
//               <th scope="col" className="px-6 py-3">Created At</th>
//               <th scope="col" className="px-6 py-3">Updated At</th>
//               <th scope="col" className="px-6 py-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredPolls.map((poll) => (
//               <tr key={poll.id} className="bg-white border-b hover:bg-gray-50">
//                 <td className="w-4 p-4">
//                   <div className="flex items-center">
//                     <input
//                       id={`checkbox-${poll.id}`}
//                       type="checkbox"
//                       className="w-4 h-4 text-blue-600 border-gray-300 rounded-sm focus:ring-blue-500"
//                     />
//                     <label htmlFor={`checkbox-${poll.id}`} className="sr-only">
//                       checkbox
//                     </label>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">{poll.question}</td>
//                 <td className="px-6 py-4">{poll.status ? "Active" : "Inactive"}</td>
//                 <td className="px-6 py-4">{new Date(poll.created_at).toLocaleString()}</td>
//                 <td className="px-6 py-4">{new Date(poll.updated_at).toLocaleString()}</td>
//                 <td className="px-6 py-4">
//                   <a href="#" className="text-blue-600 hover:underline">Edit</a>
//                   <a onClick={() => dispatch(deletePoll(poll.id))} href="#" className="text-red-600 hover:underline ms-3">Remove</a>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         !loading && !error && <p>No polls available.</p>
//       )}
//     </div>
//   );
// };

// export default DataTable;
