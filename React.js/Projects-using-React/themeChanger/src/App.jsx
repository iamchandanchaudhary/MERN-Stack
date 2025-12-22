import { useEffect, useState } from 'react';
import './App.css';
import { ThemeProvider } from './context/theme';
import Card from './components/card';
import ThemeBtn from './components/ThemeBtn';

const App = () => {

  const [themeMode, setThemeMode] = useState();

  const lightTheme = () => {
    setThemeMode("light");
  }

  const darkTheme = () => {
    setThemeMode("dark");
  }

  // changing the theme
  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>

      <div className="flex flex-wrap min-h-screen items-center">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            <ThemeBtn />
          </div>

          <div className="w-full max-w-sm mx-auto">
            <Card />
          </div>
        </div>
      </div>

    </ThemeProvider>
  )
}

export default App;