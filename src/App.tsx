import Window from "./components/window";
import Wallpaper4 from "./images/wallpaper4.png";
import BrandyHeart from "./images/brandyheart.png";
import Resume from "./images/resume.png";
import "./App.css";

function App() {
  return (
    <div
      className="min-h-screen bg-cover bg-center "
      style={{
        backgroundImage: `url(${Wallpaper4})`,
      }}
    >
      <Window />
      <div
        className="flex flex-row h-8 min-w-screen font-semibold text-white"
        style={{ backgroundColor: "#44131b" }}
      >
        <div className="ml-2 w-4 py-2 ml-5">
          <img src={BrandyHeart} alt={BrandyHeart}></img>
        </div>
        <div className="ml-4 py-1">feli's personal website</div>
      </div>
      <div className="top-14 right-6 fixed items-center flex-col flex text-center">
        <img className="w-14" src={Resume}></img>
        <div className="text-white items-center">my resume</div>
      </div>
    </div>
  );
}

export default App;
