import React, { useState } from "react";
import { Link } from "react-router-dom";
import PollForm from "./CreatePullForm"; // new reusable form

export const Navbar = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreatePollClick = () => {
    setShowCreateModal(true);
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </a>

          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {/* User menu... (unchanged) */}
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none"
              aria-controls="navbar-user"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 flex-1" id="navbar-user">
            <ul className="ml-8 flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <button
                  onClick={handleCreatePollClick}
                  type="button"
                  className="cursor-pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  + Create Poll
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Poll Creation Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Create New Poll</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-500 hover:text-red-500 text-xl"
              >
                ×
              </button>
            </div>
            <PollForm
              mode="create"
              onSuccess={() => {
                setShowCreateModal(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;







// import React from "react";
// import { Link } from "react-router-dom";
// import CreatePullForm from "./CreatePullForm";

// export const Navbar = () => {
//   const handleCreatePull = () => {
//     // const modal = document.getElementById("crud-modal");
//     // modal.classList.remove("hidden");
//   };

//   return (
//     <>
//       <nav className="bg-white border-gray-200 dark:bg-gray-900">
//         <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//           <a
//             href="/"
//             className="flex items-center space-x-3 rtl:space-x-reverse"
//           >
//             <img
//               src="https://flowbite.com/docs/images/logo.svg"
//               className="h-8"
//               alt="Flowbite Logo"
//             />
//             <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
//               Flowbite
//             </span>
//           </a>
//           <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
//             <button
//               type="button"
//               className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 cursor-pointer"
//               id="user-menu-button"
//               aria-expanded="false"
//               data-dropdown-toggle="user-dropdown"
//               data-dropdown-placement="bottom"
//             >
//               <span className="sr-only">Open user menu</span>
//               <img
//                 src='https://flowbite.com/docs/images/logo.svg'
//                 className="w-8 h-8 rounded-full"
//                 alt="user photo"
//               />
//             </button>
//             <div
//               className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600"
//               id="user-dropdown"
//             >
//               <div className="px-4 py-3">
//                 <span className="block text-sm text-gray-900 dark:text-white">
//                   Bonnie Green
//                 </span>
//                 <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
//                   name@flowbite.com
//                 </span>
//               </div>
//               <ul className="py-2" aria-labelledby="user-menu-button">
//                 <li>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
//                   >
//                     Dashboard
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
//                   >
//                     Settings
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
//                   >
//                     Earnings
//                   </a>
//                 </li>
//                 <li>
//                   <Link to="/Logout"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
//                   >
//                     Sign out
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <button
//               data-collapse-toggle="navbar-user"
//               type="button"
//               className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//               aria-controls="navbar-user"
//               aria-expanded="false"
//             >
//               <span className="sr-only">Open main menu</span>
//               <svg
//                 className="w-5 h-5"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 17 14"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M1 1h15M1 7h15M1 13h15"
//                 />
//               </svg>
//             </button>
//           </div>
//           <div
//             className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 flex-1"
//             id="navbar-user"
//           >
//             <ul className="ml-8 flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//               <li>
//               <button onClick={handleCreatePull} data-modal-target="crud-modal" data-modal-toggle="crud-modal" type="button" className="cursor-pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
//               + Create Poll</button>

//               </li>
//               <li>
                
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//       <CreatePullForm />
      
//     </>
//   );
// };
// export default Navbar;
