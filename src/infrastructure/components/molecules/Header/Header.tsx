import { useGlobalContext } from 'context';
import { sun, moon } from 'infrastructure/assets/images';
import { Detector } from 'react-detect-offline';

interface HeaderInterface {
  isDarkTheme: boolean;
}

const Header = ({ isDarkTheme }: HeaderInterface) => {
  const { dispatch, C } = useGlobalContext();

  return (
    <header className='flex justify-between items-center md:mt-6'>
      <div className='flex flex-col items-start text-slate-50'>
        <h1 className='inline-block text-[1.65rem] h-[26px]  tracking-[0.6rem] font-["Josefin_Sans"] font-bold sm:tracking-[0.9rem] sm:h-[3rem] sm:text-[2.5rem]'>
          TODO
        </h1>
        {/* <h2>Oh no, you lost toy conecction</h2>
        <h3>Your data will be store and updated went internet conection comes back</h3> */}
        <Detector
          render={({ online }) => (
            <div className='flex items-center'>
              <div>
                You are currently {online ? 'online' : 'offline, your request will be stored'}{' '}
              </div>
              <div
                className={`w-[8px] h-[8px] ml-2 mt-1 rounded-full ${
                  online ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
            </div>
          )}
        />
      </div>

      <img
        className='h-[20px] sm:h-6 cursor-pointer'
        onClick={() => dispatch({ type: C.THEME_SWITCH })}
        src={isDarkTheme ? sun : moon}
        alt='lightTheme-sun'
      />
    </header>
  );
};

export default Header;
