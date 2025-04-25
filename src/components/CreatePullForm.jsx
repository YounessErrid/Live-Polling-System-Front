import React, { useState, useEffect } from "react";
import { addPoll, resetPollStatus } from "../store/pollsSlice";
import { useDispatch, useSelector } from "react-redux";
import { pollSchema } from "../utils/schemas/pollSchema";
const CreatePullForm = () => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState("");
  const { loading, error, status } = useSelector((state) => state.polls);
  const [choices, setChoices] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  const handleAddChoice = (e) => {
    e.preventDefault();
    setChoices([...choices, ""]);
  };

  const handleChoiceChange = (index, value) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = value;
    setChoices(updatedChoices);
  };

  const handleDeleteChoice = (index) => {
    const updatedChoices = choices.filter((_, i) => i !== index);
    setChoices(updatedChoices);
  };
  const handleResetForm = (e) => {
    e.preventDefault();
    setQuestion("");
    setChoices([]);
    setFormErrors({});
  };
  const handleCreatePoll = async (e) => {
    e.preventDefault();
    console.log("Creating poll...");
    // Get form data
    const pollData = { question, choices };
    const result = pollSchema.safeParse(pollData);
    console.log(pollData);

    if (!result.success) {
      // Collect errors from Zod
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      console.log("validating poll...");

      setFormErrors(fieldErrors);
      return;
    }
    setFormErrors({});
    dispatch(addPoll(pollData));
    console.log("saving poll...");

    handleResetForm(e);
  };
  // Inside your component
  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        dispatch(resetPollStatus());
      }, 2000); // Wait 2 sec before resetting
      return () => clearTimeout(timer);
    }
  }, [status, dispatch]);

  return (
    <div>
      <div
        id="crud-modal"
        data-modal-backdrop="static"
        tabIndex="-1"
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New Poll
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form onSubmit={handleCreatePoll} className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="question"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Poll Question
                  </label>
                  <input
                    type="text"
                    name="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    id="question"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type poll question"
                    required
                  />
                  {formErrors.question && (
                    <p className="text-red-500">{formErrors.question}</p>
                  )}
                </div>

                <div className="col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <label
                      htmlFor="Choices"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Poll Choices
                    </label>

                    <button
                      type="button"
                      onClick={handleAddChoice}
                      className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <svg
                        className="me-1 -ms-1 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Add Choice
                    </button>
                  </div>

                  {choices.map((choice, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        value={choice}
                        onChange={(e) =>
                          handleChoiceChange(index, e.target.value)
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder={`Choice ${index + 1}`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteChoice(index)}
                        className="text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg "
                      >
                        <svg
                          class="w-6 h-6 text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600 dark:focus:ring-red-800 cursor-pointer"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                  {formErrors.choices && (
                    <p className="text-red-500">{formErrors.choices}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="text-white inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Create Poll
                </button>
                <button
                  data-modal-hide="default-modal"
                  data-modal-toggle="crud-modal"
                  type="button"
                  onClick={handleResetForm}
                  class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-gray-200 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
              {loading && (
                <p className="text-sm text-blue-500">Creating poll...</p>
              )}
              {error && <p className="text-sm text-red-500">Error: {error}</p>}
              {status === "success" && (
                <p className="text-sm text-green-500">
                  Poll created successfully!
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePullForm;
