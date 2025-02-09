import { useState, useEffect } from "react";
import aboutmepic from "../images/aboutme.png";
import AboutMe from "./aboutme";

function Window() {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [screen, setScreen] = useState("home");

  const aboutMeStamps = [
    { title: "about me", image: aboutmepic, screen: "aboutMe" },
    { title: "projects", image: aboutmepic, screen: "projects" },
    { title: "experience", image: aboutmepic, screen: "experience" },

  ];

  const handleClicks = () => {
    setScreen("aboutMe");
  };

  const onMouseDown = (e) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const onMouseMove = (e) => {
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

  // if you want to add more screens, add here :)
  const renderScreen = () => {
    if (screen === "aboutMe") {
      return (
        <div className="p-4 text-white">
          <div className="flex flex-row">
            <div className="flex flex-col">
              <button
                className="flex mr-auto mb-1"
                onClick={() => setScreen("home")}
              >
                home
              </button>
              {aboutMeStamps.map((item) => (
                <button
                  key={item.title}
                  className="flex mr-auto mb-1"
                  onClick={() => setScreen(item.screen)}
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
    } else if (screen == "projects") {
      return (
        <div className="p-4 text-white">
          <div className="flex flex-row">
            <div className="flex flex-col">
              <button
                className="flex mr-auto mb-1"
                onClick={() => setScreen("home")}
              >
                home
              </button>
              {aboutMeStamps.map((item) => (
                <button
                  key={item.title}
                  className="flex mr-auto mb-1"
                  onClick={() => setScreen(item.screen)}
                >
                  {item.title}
                </button>
              ))}
            </div>
            <div className="flex ml-auto h-7 w-72 text-left">
            projects
            </div>
          </div>
        </div>
      );
    } else if (screen == "experience") {
      return (
        <div className="p-4 text-white">
          <div className="flex flex-row">
            <div className="flex flex-col">
              <button
                className="flex mr-auto mb-1"
                onClick={() => setScreen("home")}
              >
                home
              </button>
              {aboutMeStamps.map((item) => (
                <button
                  key={item.title}
                  className="flex mr-auto mb-1"
                  onClick={() => setScreen(item.screen)}
                >
                  {item.title}
                </button>
              ))}
            </div>
            <div className="flex ml-auto h-7 w-72 text-left">
              experience
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="p-10">
        <div className="justify-items-center grid grid-cols-8 gap-y-5 gap-x-6 mt-5">
          {aboutMeStamps.map((item) => (
            <AboutMe
              key={item.title}
              image={item.image}
              title={item.title}
              onClick={handleClicks}
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
      className="rounded-lg w-4/6 h-4/6 border-2"
    > 
      <div
        className="rounded-t-lg"
        style={{
          background: "#222222",
          padding: "10px",
          cursor: "move",
        }}
      >
        <div className="flex flex-row">
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
        </div>
      </div>
      {renderScreen()}
    </div>
  );
}

export default Window;
