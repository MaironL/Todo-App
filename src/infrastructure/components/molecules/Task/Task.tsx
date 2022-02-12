import { check, cross } from 'infrastructure/assets/images';

interface NewTaskInterface {
  isCheck: boolean;
  checkIn: React.Dispatch<React.SetStateAction<boolean>>;
  isDarkTheme: boolean;
  todoTask: string;
}
const Task = ({ isCheck, checkIn, isDarkTheme, todoTask }: NewTaskInterface) => {
  return (
    <div
      className={`flex justify-between items-center px-4 py-4 first:rounded-t-md last:rounded-b-md last:shadow-lg border-b-[1px] ${
        isDarkTheme ? 'bg-[#25273c]' : 'bg-[#ffffff]'
      }`}
    >
      <div className='flex'>
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
        <p
          className={`${
            isDarkTheme ? 'bg-[#25273c] text-[#fafafa]' : 'bg-[#fafafa] text-[#25273c]'
          }`}
        >
          {todoTask}
        </p>
      </div>

      <img className='h-3 ml-2' src={cross} alt='delete' />
    </div>
  );
};

export default Task;
