import { sun, moon } from 'infrastructure/assets/images';

interface HeaderInterface {
  isDarkTheme: boolean;
  darkTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ isDarkTheme, darkTheme }: HeaderInterface) => {
  return (
    <header className='flex justify-between items-center'>
      <h1 className='inline-block text-2xl h-[26px] text-slate-50 tracking-[0.5rem] font-["Josefin_Sans"] font-bold'>
        TODO
      </h1>
      <img
        className='h-[20px]'
        onClick={() => darkTheme((prevTheme) => !prevTheme)}
        src={isDarkTheme ? sun : moon}
        alt='lightTheme-sun'
      />
    </header>
  );
};

export default Header;
