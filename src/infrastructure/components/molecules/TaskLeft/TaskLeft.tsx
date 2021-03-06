import { useGlobalContext } from 'context';
import TaskFilter from 'infrastructure/components/molecules/TaskFilter/TaskFilter';
import { useHowMany, useDeleteMany } from './taskleftHooks';

interface TaskLeftInterface {
  isDarkTheme: boolean;
}
const TaskLeft = ({ isDarkTheme }: TaskLeftInterface) => {
  const { tasksList } = useGlobalContext();
  const { deleteTasks } = useDeleteMany();
  const { howMany } = useHowMany();

  return (
    <div
      className={`font-["Josefin_Sans"] text-xs flex justify-between items-center px-4 py-4 first:rounded-t-md last:rounded-b-md last:border-b-0 last:shadow-lg border-b-[1px] sm:text-sm ${
        isDarkTheme
          ? 'bg-[#25273c] border-b-[#303348] text-[#696B80]'
          : 'bg-[#ffffff] border-b-[#EDECF2] text-[#A8A7AB]'
      }`}
    >
      <p>{howMany(tasksList)} items left</p>
      <div className='hidden sm:block'>
        <TaskFilter isDarkTheme={isDarkTheme} />
      </div>
      <p
        onClick={deleteTasks}
        className={`cursor-pointer  ${
          isDarkTheme ? ' hover:text-[#BEC0D9]' : 'hover:text-[#64636E]'
        }`}
      >
        Clear Completed
      </p>
    </div>
  );
};

export default TaskLeft;
