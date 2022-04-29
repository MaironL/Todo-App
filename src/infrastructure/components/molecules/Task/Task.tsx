import { useGlobalContext } from 'context';
import { check, cross } from 'infrastructure/assets/images';
import useModifyTask from './taskHooks/useModifyTask';

interface TaskInterface {
  isCheck: boolean;
  isDarkTheme: boolean;
  todoTask: string;
  id: string;
}
const Task = ({ isCheck, isDarkTheme, todoTask, id }: TaskInterface) => {
  const { dispatch, C } = useGlobalContext();
  const { updateTask, deleteTask, checkingTask } = useModifyTask();

  return (
    <div
      className={`flex justify-between items-center px-5 py-4 first:rounded-t-md last:rounded-b-md last:border-b-0 last:shadow-lg border-b-[1px] ${
        isDarkTheme ? 'bg-[#25273c] border-b-[#303348]' : 'bg-[#ffffff] border-b-[#EDECF2]'
      }`}
    >
      <div className='flex w-3/4'>
        <div
          className='relative flex items-center pr-4 sm:pr-5'
          tabIndex={0}
          onClick={() => checkingTask(id)}
        >
          <div
            className={`border rounded-full w-5 h-5 sm:w-6 sm:h-6 sm:border-2 cursor-pointer ${
              isDarkTheme ? 'border-[#33354A]' : 'border-[#ECECED]'
            }   ${isCheck && 'bg-gradient-to-r from-[#57ddff] to-[#c058f3]'}`}
          ></div>
          {isCheck && <img className='absolute left-[15%]' src={check} alt='check' />}
        </div>
        <span
          onDoubleClick={() => updateTask(id)}
          className={`text-xs font-["Josefin_Sans"] pt-1 cursor-pointer w-full outline-0 outline-none ${
            isDarkTheme && !isCheck
              ? 'bg-[#25273c] text-[#BEC0D9]'
              : isDarkTheme && isCheck
              ? 'bg-[#25273c] text-[#696B80] line-through'
              : !isDarkTheme && !isCheck
              ? 'bg-[#ffffff] text-[#64636E]'
              : 'bg-[#ffffff] text-[#cdcdd6] line-through'
          } sm:text-lg `}
        >
          {todoTask}
        </span>
      </div>

      <img
        className='h-3 ml-2 sm:h-4 cursor-pointer'
        src={cross}
        alt='delete'
        onClick={() => deleteTask(id)}
      />
    </div>
  );
};

export default Task;
