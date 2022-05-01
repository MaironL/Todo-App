import { Header, NewTask, Task, TaskLeft, TaskFilter } from 'infrastructure/components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useGlobalContext } from 'context';
import { useReorder, useLogout, useGetTasks } from './homeHooks';
import { useEffect } from 'react';

const Home = () => {
  const { C, toLocalStorage, filteredTask, tasksList, userAuth, listStatus, dispatch } =
    useGlobalContext();
  const { controller, getTasks } = useGetTasks();
  const { reorder } = useReorder();
  const { logout } = useLogout();

  useEffect(() => {
    dispatch({ type: C.FILTER_TASKS, payload: 'All' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasksList]);

  useEffect(() => {
    localStorage.setItem('ToDo', JSON.stringify(toLocalStorage));
  }, [toLocalStorage]);

  useEffect(() => {
    getTasks();
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listStatus]);

  return (
    <div
      className={`w-full h-full relative bg-no-repeat bg-top bg-contain sm:bg-auto pb-[4.4rem] sm:pb-[2rem]  ${
        toLocalStorage.isDarkTheme
          ? 'bg-[#161620] bg-mobileDarkTheme sm:bg-desktopDarkTheme'
          : 'bg-[#fafafa] bg-mobileLightTheme sm:bg-desktopLightTheme'
      } px-6 flex flex-col items-center`}
    >
      <div className='flex-col self-end items-end md:absolute md:right-8 flex mt-4'>
        <span className='text-slate-50 tracking-[0.3rem] font-semibold drop-shadow-lg shadow-indigo-800'>
          Welcome {userAuth.role} {userAuth.name}
        </span>
        <button
          onClick={logout}
          className='mt-4 bg-red-500 hover:bg-red-600 tracking-[0.1rem] transition-colors text-slate-50 font-medium px-4 py-1 rounded-lg'
        >
          Logout
        </button>
      </div>
      <DragDropContext
        onDragEnd={(result) => {
          const { source, destination } = result;
          if (!destination) {
            return;
          }
          if (
            source.index === destination.index &&
            source.droppableId === destination.droppableId
          ) {
            return;
          }
          reorder(tasksList, source.index, destination.index);
        }}
      >
        <div className='container max-w-[540px] mt-11'>
          {/* Header */}
          <Header isDarkTheme={toLocalStorage.isDarkTheme} />
          {/* Input */}
          <NewTask isDarkTheme={toLocalStorage.isDarkTheme} />
          {/* task */}
          <Droppable droppableId='tasks'>
            {(droppProv) => (
              <div {...droppProv.droppableProps} ref={droppProv.innerRef}>
                {filteredTask.map((taskItem, i) => {
                  const { task, _id, isCheck } = taskItem;

                  return (
                    <Draggable key={_id} draggableId={_id} index={i}>
                      {(draggProv) => (
                        <div
                          className={` border-b-[1px] ${
                            toLocalStorage.isDarkTheme
                              ? 'bg-[#25273c] border-b-[#303348]'
                              : 'bg-[#ffffff] border-b-[#EDECF2]'
                          }`}
                          {...draggProv.draggableProps}
                          {...draggProv.dragHandleProps}
                          ref={draggProv.innerRef}
                        >
                          <Task
                            id={_id}
                            isCheck={isCheck}
                            isDarkTheme={toLocalStorage.isDarkTheme}
                            todoTask={task}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {/*task left */}
                {droppProv.placeholder}
                <TaskLeft isDarkTheme={toLocalStorage.isDarkTheme} />
              </div>
            )}
          </Droppable>
          <div className='sm:hidden'>
            <TaskFilter isDarkTheme={toLocalStorage.isDarkTheme} />
          </div>
        </div>
      </DragDropContext>

      <div
        className={`${
          toLocalStorage.isDarkTheme ? ' text-[#696B80]' : ' text-[#25273c]'
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
    </div>
  );
};

export default Home;
