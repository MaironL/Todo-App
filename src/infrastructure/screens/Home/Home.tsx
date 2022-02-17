import { Header, NewTask, Task, TaskLeft, TaskFilter } from 'infrastructure/components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useGlobalContext } from 'context';
import useReorder from './useReorderHook';
import { useEffect } from 'react';

const Home = () => {
  const { isDarkTheme, filteredTask, tasks, C, state, dispatch } = useGlobalContext();
  const { reorder } = useReorder();

  useEffect(() => {
    dispatch({ type: C.FILTER_TASKS, payload: 'All' });
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state));
  }, [state]);
  return (
    <div
      className={`w-full h-full relative bg-no-repeat bg-top bg-contain sm:bg-auto pb-[4.4rem] sm:pb-[2rem]  ${
        isDarkTheme
          ? 'bg-[#161620] bg-mobileDarkTheme sm:bg-desktopDarkTheme'
          : 'bg-[#fafafa] bg-mobileLightTheme sm:bg-desktopLightTheme'
      } px-6 flex flex-col items-center`}
    >
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
          reorder(tasks, source.index, destination.index);
        }}
      >
        <div className='container max-w-[540px] mt-11'>
          {/* Header */}
          <Header isDarkTheme={isDarkTheme} />
          {/* Input */}
          <NewTask isDarkTheme={isDarkTheme} />
          {/* task */}
          <Droppable droppableId='tasks'>
            {(droppProv) => (
              <div {...droppProv.droppableProps} ref={droppProv.innerRef}>
                {filteredTask.map((task, i) => {
                  const { todoTask, id, isCheck } = task;

                  return (
                    <Draggable key={id} draggableId={id} index={i}>
                      {(draggProv) => (
                        <div
                          className={` border-b-[1px] ${
                            isDarkTheme
                              ? 'bg-[#25273c] border-b-[#303348]'
                              : 'bg-[#ffffff] border-b-[#EDECF2]'
                          }`}
                          {...draggProv.draggableProps}
                          {...draggProv.dragHandleProps}
                          ref={draggProv.innerRef}
                        >
                          <Task
                            id={id}
                            isCheck={isCheck}
                            isDarkTheme={isDarkTheme}
                            todoTask={todoTask}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {/*task left */}
                {droppProv.placeholder}
                <TaskLeft isDarkTheme={isDarkTheme} />
              </div>
            )}
          </Droppable>
          <div className='sm:hidden'>
            <TaskFilter isDarkTheme={isDarkTheme} />
          </div>
        </div>
      </DragDropContext>

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
    </div>
  );
};

export default Home;
