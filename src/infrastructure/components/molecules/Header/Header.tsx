import { sun, moon } from 'infrastructure/assets/images';

interface HeaderInterface {
  isDarkTheme: boolean;
  darkTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ isDarkTheme, darkTheme }: HeaderInterface) => {
  return (
    <header className='flex justify-between items-center sm:mt-6'>
      <h1 className='inline-block text-[1.65rem] h-[26px] text-slate-50 tracking-[0.6rem] font-["Josefin_Sans"] font-bold sm:tracking-[0.9rem] sm:h-[3rem] sm:text-[2.5rem]'>
        TODO
      </h1>
      <img
        className='h-[20px] sm:h-6 cursor-pointer'
        onClick={() => darkTheme((prevTheme) => !prevTheme)}
        src={isDarkTheme ? sun : moon}
        alt='lightTheme-sun'
      />
    </header>
  );
};

export default Header;
