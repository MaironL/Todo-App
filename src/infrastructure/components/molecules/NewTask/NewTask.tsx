import { useEnterKey, useForm } from './newTaskHooks';

interface NewTaskInterface {
  isDarkTheme: boolean;
}

const NewTask = ({ isDarkTheme }: NewTaskInterface) => {
  const { taskWrited, handleChange, handleSubmit } = useForm();
  const { enterKey } = useEnterKey();

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex justify-between items-center px-5 py-[10px] rounded-md mt-10 mb-4 shadow-lg sm:py-5 sm:mb-6 sm:shadow-2xl sm:shadow-[#220a47] ${
        isDarkTheme ? 'bg-[#25273c]' : 'bg-[#ffffff]'
      }`}
    >
      <button className='relative flex items-center pr-4 sm:pr-5'>
        <div
          className={`border rounded-full w-5 h-5 sm:w-6 sm:h-6 sm:border-2 cursor-pointer ${
            isDarkTheme ? 'border-[#33354A]' : 'border-[#ECECEE]'
          }`}
        ></div>
      </button>

      <input
        type='text'
        onKeyDown={enterKey}
        onChange={handleChange}
        value={taskWrited}
        className={`${
          isDarkTheme
            ? 'bg-[#25273c] text-[#fafafa] placeholder:text-[#696B80]'
            : 'bg-[#ffffff] text-[#25273c] placeholder:text-[#A8A7AB]'
        } w-full pt-1 font-["Josefin_Sans"] outline-0 outline-none placeholder:text-xs  placeholder:font-medium sm:placeholder:text-lg`}
        placeholder='Create a new todo...'
      />
    </form>
  );
};

export default NewTask;
