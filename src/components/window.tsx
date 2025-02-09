import { useState, useEffect } from "react";
import snoopy from "../images/snoopy.png";
import froggy from "../images/froggy.png";
import pomegranate from "../images/pomegranate.png";
import mug from "../images/mug.png";
import flower from "../images/flower.png";
import intermezzo from "../images/intermezzo.png";
import File from "./file";
import back from "../images/back.png";
import forward from "../images/forward.png";

function Window() {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [screenHistory, setScreenHistory] = useState<string[]>(["home"]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const FileStamps = [
    { title: "about me", image: snoopy, screen: "aboutMe" },
    { title: "experience", image: pomegranate, screen: "experience" },
    { title: "projects", image: froggy, screen: "projects" },
    { title: "bookshelf", image: intermezzo, screen: "bookshelf" },
    { title: "blog", image: mug, screen: "blog" },
    { title: "contact", image: flower, screen: "contact" },
  ];

  const navigateTo = (newScreen: string) => {
    const newHistory = screenHistory.slice(0, currentIndex + 1);
    setScreenHistory([...newHistory, newScreen]);
    setCurrentIndex(newHistory.length);
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goForward = () => {
    if (currentIndex < screenHistory.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const onMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    } else {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging]);

  const currentScreen = screenHistory[currentIndex];

  const renderScreen = () => {
    if (currentScreen === "aboutMe") {
      return (
        <div className="p-4 text-white">
          <div className="flex flex-row">
            <div className="flex flex-col">
            {FileStamps.map((item) => (
                <button
                  key={item.title}
                  className="flex mr-auto mb-1"
                  onClick={() => navigateTo(item.screen)}
                >
                  {item.title}
                </button>
              ))}
            </div>
            <div className="flex ml-auto h-7 w-72 text-left">
              I am a Computer Science student at UC Davis passionate about
              product management, software engineering, and building
              user-centric products. I thrive in fast-paced environments, love
              out-of-the-box problem-solving, and enjoy exploring the
              intersection of tech, design, and business.
            </div>
          </div>
        </div>
      );
    } else if (currentScreen == "projects") {
      return (
        <div className="p-4 text-white">
          <div className="flex flex-row">
            <div className="flex flex-col">
            {FileStamps.map((item) => (
                <button
                  key={item.title}
                  className="flex mr-auto mb-1"
                  onClick={() => navigateTo(item.screen)}
                >
                  {item.title}
                </button>
              ))}
            </div>
            <div className="flex ml-auto h-7 w-72 text-left">projects</div>
          </div>
        </div>
      );
    } else if (currentScreen == "experience") {
      return (
        <div className="p-4 text-white">
          <div className="flex flex-row">
            <div className="flex flex-col">
            {FileStamps.map((item) => (
                <button
                  key={item.title}
                  className="flex mr-auto mb-1"
                  onClick={() => navigateTo(item.screen)}
                >
                  {item.title}
                </button>
              ))}
            </div>
            <div className="flex ml-auto h-7 w-72 text-left">experience</div>
          </div>
        </div>
      );
    }

    return (
      <div className="p-10">
        <div className="justify-items-center grid grid-cols-8 gap-y-5 gap-x-6 mt-5">
        {FileStamps.map((item) => (
            <File
              key={item.title}
              image={item.image}
              title={item.title}
              onClick={() => navigateTo(item.screen)}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      onMouseDown={onMouseDown}
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        userSelect: "none",
        background: "#7F7F7F",
      }}
      className="rounded-lg w-4/6 h-4/6"
    >
      <div
        className="rounded-t-lg"
        style={{
          background: "#222222",
          padding: "10px",
          cursor: "move",
        }}
      >
        <div className="flex flex-row items-center">
          <div
            className="rounded-full w-4 h-4 mr-2"
            style={{ backgroundColor: "#ff5f57" }}
          ></div>
          <div
            className="rounded-full w-4 h-4 mr-2"
            style={{ backgroundColor: "#febc2e" }}
          ></div>
          <div
            className="rounded-full w-4 h-4"
            style={{ backgroundColor: "#27c840" }}
          ></div>

          <button
            onClick={goBack}
            disabled={currentIndex === 0}
            className="mr-2 disabled:opacity-50"
          >
            <img src={back} alt="Back" className="w-4 h-4 ml-4" />
          </button>
          <button
            onClick={goForward}
            disabled={currentIndex === screenHistory.length - 1}
            className="mr-4 disabled:opacity-50"
          >
            <img src={forward} alt="Forward" className="w-4 h-4 ml-2" />
          </button> 
        </div>

      </div>
      {renderScreen()}
    </div>
  );
}

export default Window;
