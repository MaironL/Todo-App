import { useGlobalContext } from 'context';
import { sun, moon } from 'infrastructure/assets/images';

interface HeaderInterface {
  isDarkTheme: boolean;
}

const Header = ({ isDarkTheme }: HeaderInterface) => {
  const { dispatch, C } = useGlobalContext();

  return (
    <header className='flex justify-between items-center sm:mt-6'>
      <h1 className='inline-block text-[1.65rem] h-[26px] text-slate-50 tracking-[0.6rem] font-["Josefin_Sans"] font-bold sm:tracking-[0.9rem] sm:h-[3rem] sm:text-[2.5rem]'>
        TODO
      </h1>
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
