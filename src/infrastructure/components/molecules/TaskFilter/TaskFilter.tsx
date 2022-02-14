interface TaskFilterInterface {
  isDarkTheme: boolean;
}

const TaskFilter = ({ isDarkTheme }: TaskFilterInterface) => {
  return (
    <div
      className={`flex justify-around items-center px-[4.3rem] py-3 rounded-md mt-4 shadow-md font-["Josefin_Sans"] text-sm sm:py-0 sm:mt-0 sm:shadow-none sm:px-0 ${
        isDarkTheme ? 'bg-[#25273c] text-[#696B80]' : 'bg-[#fafafa] text-[#A8A7AB]'
      }`}
    >
      <button
        className={`pt-1 font-bold cursor-pointer ${
          isDarkTheme ? ' hover:text-[#BEC0D9]' : 'hover:text-[#64636E]'
        }`}
      >
        All
      </button>
      <button
        className={`pt-1 font-bold sm:mx-[1.8rem] cursor-pointer ${
          isDarkTheme ? ' hover:text-[#BEC0D9]' : 'hover:text-[#64636E]'
        }`}
      >
        Active
      </button>
      <button
        className={`pt-1 font-bold cursor-pointer ${
          isDarkTheme ? ' hover:text-[#BEC0D9]' : 'hover:text-[#64636E]'
        }`}
      >
        Completed
      </button>
    </div>
  );
};

export default TaskFilter;
