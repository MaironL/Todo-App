import { useState } from 'react';
import Header from 'infrastructure/components/molecules/Header/Header';
import NewTask from 'infrastructure/components/molecules/NewTask/NewTask';
import Task from 'infrastructure/components/molecules/Task/Task';

const Home = () => {
  const [isCheck, setIsCheck] = useState(false);
  const [darkTheme, setdarkTheme] = useState(false);

  const markup = [
    { todoTask: 'this is the task 1' },
    { todoTask: 'this is the task 2' },
    { todoTask: 'this is the task 3' },
    { todoTask: 'this is the task 4' },
    { todoTask: 'this is the task 5' },
    { todoTask: 'this is the task 6' },
  ];

  return (
    <main
      className={`w-full h-full relative bg-no-repeat  bg-top bg-contain sm:bg-auto  ${
        darkTheme
          ? 'bg-[#161722] bg-mobileDarkTheme sm:bg-desktopDarkTheme'
          : 'bg-[#fafafa] bg-mobileLightTheme sm:bg-desktopLightTheme'
      } px-6 flex flex-col items-center`}
    >
      <div className='container max-w-[540px] mt-10'>
        {/* Header */}
        <Header isDarkTheme={darkTheme} darkTheme={setdarkTheme} />
        {/* Input */}
        <NewTask isCheck={isCheck} checkIn={setIsCheck} isDarkTheme={darkTheme} />

        {/* task */}
        <div>
          {markup.map((task, i) => {
            const { todoTask } = task;
            return (
              <Task
                isCheck={isCheck}
                checkIn={setIsCheck}
                isDarkTheme={darkTheme}
                todoTask={todoTask}
                key={i}
              />
            );
          })}
        </div>
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
        <a className='text-[#6546C4]' href='#'>
          Mairon Romero
        </a>
        .
      </div>
    </main>
  );
};

export default Home;
