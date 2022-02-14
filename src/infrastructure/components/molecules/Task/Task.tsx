import { check, cross } from 'infrastructure/assets/images';

interface TaskInterface {
  isCheck: boolean;
  checkIn: React.Dispatch<React.SetStateAction<boolean>>;
  isDarkTheme: boolean;
  todoTask: string;
}
const Task = ({ isCheck, checkIn, isDarkTheme, todoTask }: TaskInterface) => {
  return (
    <div
      className={`flex justify-between items-center px-5 py-4 first:rounded-t-md last:rounded-b-md last:border-b-0 last:shadow-lg border-b-[1px] ${
        isDarkTheme
          ? 'bg-[#25273c] border-b-[#303348]'
          : 'bg-[#ffffff] border-b-[#EDECF2]'
      }`}
    >
      <div className='flex'>
        <div
          className='relative flex items-center pr-4 sm:pr-5'
          tabIndex={0}
          onClick={() => checkIn((prevCheck) => !prevCheck)}
        >
          <div
            className={`border rounded-full w-5 h-5 sm:w-6 sm:h-6 sm:border-2 cursor-pointer ${
              isDarkTheme ? 'border-[#33354A]' : 'border-[#ECECED]'
            }   ${isCheck && 'bg-gradient-to-r from-[#57ddff] to-[#c058f3]'}`}
          ></div>
          {isCheck && <img className='absolute left-[15%]' src={check} alt='check' />}
        </div>
        <p
          className={`text-xs font-["Josefin_Sans"] pt-1 cursor-pointer ${
            isDarkTheme ? 'bg-[#25273c] text-[#BEC0D9]' : 'bg-[#fafafa] text-[#64636E]'
          } ${isCheck && 'line-through text-[#696B80]'} sm:text-lg`}
        >
          {todoTask}
        </p>
      </div>

      <img className='h-3 ml-2 sm:h-4 cursor-pointer' src={cross} alt='delete' />
    </div>
  );
};

export default Task;
