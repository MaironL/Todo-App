import { check } from 'infrastructure/assets/images';

interface NewTaskInterface {
  isCheck: boolean;
  checkIn: React.Dispatch<React.SetStateAction<boolean>>;
  isDarkTheme: boolean;
}

const NewTask = ({ isCheck, checkIn, isDarkTheme }: NewTaskInterface) => {
  return (
    <div
      className={`flex justify-between items-center px-4 py-2 rounded-md mt-10 mb-6 shadow-md ${
        isDarkTheme ? 'bg-[#25273c]' : 'bg-[#fafafa]'
      }`}
    >
      <div
        className='relative flex items-center pr-4'
        tabIndex={0}
        onClick={() => checkIn((prevCheck) => !prevCheck)}
      >
        <div
          className={`border rounded-full w-5 h-5 border-[#9394a5]  ${
            isCheck ? 'bg-gradient-to-r from-[#57ddff] to-[#c058f3]' : ''
          }`}
        ></div>
        {isCheck && <img className='absolute left-[15%]' src={check} alt='check' />}
      </div>

      <input
        type='text'
        className={`${
          isDarkTheme ? 'bg-[#25273c] text-[#fafafa]' : 'bg-[#fafafa] text-[#25273c]'
        } w-full pt-1 font-["Josefin_Sans"] outline-0 outline-none placeholder:text-sm placeholder:text-[#9394a5] placeholder:font-medium`}
        placeholder='Create a new todo...'
      />
    </div>
  );
};

export default NewTask;
