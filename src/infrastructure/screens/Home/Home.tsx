import { Header, NewTask, Task, TaskLeft, TaskFilter } from 'infrastructure/components';
import { useGlobalContext } from 'context';

const Home = () => {
  const { isDarkTheme, tasks } = useGlobalContext();

  return (
    <main
      className={`w-full h-full relative bg-no-repeat bg-top bg-contain sm:bg-auto pb-[4.4rem] sm:pb-[2rem]  ${
        isDarkTheme
          ? 'bg-[#161620] bg-mobileDarkTheme sm:bg-desktopDarkTheme'
          : 'bg-[#fafafa] bg-mobileLightTheme sm:bg-desktopLightTheme'
      } px-6 flex flex-col items-center`}
    >
      <div className='container max-w-[540px] mt-11'>
        {/* Header */}
        <Header isDarkTheme={isDarkTheme} />
        {/* Input */}
        <NewTask isDarkTheme={isDarkTheme} />
        {/* task */}
        <div>
          {tasks.map((task, i) => {
            const { todoTask, id, isCheck } = task;
            return (
              <Task
                id={id}
                isCheck={isCheck}
                isDarkTheme={isDarkTheme}
                todoTask={todoTask}
                key={i}
              />
            );
          })}
          {/*task left */}
          <TaskLeft isDarkTheme={isDarkTheme} />
        </div>
        <div className='sm:hidden'>
          <TaskFilter isDarkTheme={isDarkTheme} />
        </div>
      </div>

      <div
        className={`${
          isDarkTheme ? ' text-[#696B80]' : ' text-[#25273c]'
        }  font-["Josefin_Sans"] mt-[2.7rem] text-[0.85rem]`}
      >
        <p>Drag and drop to reorder list</p>
      </div>

      <div className='text-[11px] text-center absolute bottom-2 text-[#9394a5]'>
        Challenge by
        <a
          className='pl-1 text-[#6546C4]'
          href='https://www.frontendmentor.io?ref=challenge'
          target='_blank'
          rel='noreferrer'
        >
          Frontend Mentor
        </a>
        . Coded by{' '}
        <a className='text-[#6546C4]' href='https://www.linkedin.com/in/maironromero/'>
          Mairon Romero
        </a>
        .
      </div>
    </main>
  );
};

export default Home;
