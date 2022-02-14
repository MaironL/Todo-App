import { check } from 'infrastructure/assets/images';

interface NewTaskInterface {
  isCheck: boolean;
  checkIn: React.Dispatch<React.SetStateAction<boolean>>;
  isDarkTheme: boolean;
}

const NewTask = ({ isCheck, checkIn, isDarkTheme }: NewTaskInterface) => {
  return (
    <div
      className={`flex justify-between items-center px-5 py-[10px] rounded-md mt-10 mb-4 shadow-lg sm:py-5 sm:mb-6 sm:shadow-2xl sm:shadow-[#220a47] ${
        isDarkTheme ? 'bg-[#25273c]' : 'bg-[#fafafa]'
      }`}
    >
      <div
        className='relative flex items-center pr-4 sm:pr-5'
        tabIndex={0}
        onClick={() => checkIn((prevCheck) => !prevCheck)}
      >
        <div
          className={`border rounded-full w-5 h-5 sm:w-6 sm:h-6 sm:border-2 cursor-pointer ${
            isDarkTheme ? 'border-[#33354A]' : 'border-[#ECECEE]'
          }  ${isCheck ? 'bg-gradient-to-r from-[#57ddff] to-[#c058f3]' : ''}`}
        ></div>
        {isCheck && <img className='absolute left-[15%]' src={check} alt='check' />}
      </div>

      <input
        type='text'
        className={`${
          isDarkTheme
            ? 'bg-[#25273c] text-[#fafafa] placeholder:text-[#696B80]'
            : 'bg-[#fafafa] text-[#25273c] placeholder:text-[#A8A7AB]'
        } w-full pt-1 font-["Josefin_Sans"] outline-0 outline-none placeholder:text-xs  placeholder:font-medium sm:placeholder:text-lg`}
        placeholder='Create a new todo...'
      />
    </div>
  );
};

export default NewTask;
