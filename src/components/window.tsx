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
import fileIcon from "../images/file-icon.png"

type FileContent = {
  type: 'file';
  icon: string;
  content: string;
};

type FolderContent = {
  type: 'folder';
  icon: string;
  contents: Record<string, FileSystemItem>;
};

type FileSystemItem = FileContent | FolderContent;

function Window() {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [screenHistory, setScreenHistory] = useState<string[]>(["home"]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set(['about']));
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const FileStamps = [
    { title: "about me", image: snoopy, screen: "aboutMe" },
    { title: "experience", image: pomegranate, screen: "experience" },
    { title: "projects", image: froggy, screen: "projects" },
    { title: "bookshelf", image: intermezzo, screen: "bookshelf" },
    { title: "blog", image: mug, screen: "blog" },
    { title: "contact", image: flower, screen: "contact" },
  ];

  const fileSystem = {
    about: {
      type: 'folder' as const,
      icon: snoopy,
      contents: {
        'profile.md': {
          type: 'file' as const,
          icon: fileIcon,
          content: `# About Me\n\nHey, I'm Felicia!\n\nWelcome to my desktop 🧸\n\nI'm a 4th year Computer Science student at UC Davis passionate about building user-centric software products. I thrive in fast-paced environments, love out-of-the-box problem-solving, and enjoy exploring the intersection of coding, design, and business.\n\nI’m a fervent lover of art at heart, so you’ll most likely find me stealing away hours of my day exploring new films, novels, or recording hour-long voice memos as I walk back home from my classes, ruminating on the human condition while listening to The Cranberries.`
        },
      }
    },
    experience: {
      type: 'folder' as const,
      icon: pomegranate,
      contents: {
        'work.md': {
          type: 'file' as const,
          icon: fileIcon,
          content: `# Work Experience\n\n## Current Role\n- Position\n- Responsibilities`
        },
        'skills.md': {
          type: 'file' as const,
          icon: fileIcon,
          content: `# Technical Skills\n\n- Frontend: React, TypeScript\n- Backend: Node.js\n- Other: Git, AWS`
        }
      }
    },
    projects: {
      type: 'folder' as const,
      icon: froggy,
      contents: {
        'project1.md': {
          type: 'file' as const,
          icon: fileIcon,
          content: `# Project 1\n\n## Overview\nDescription of your first project`
        },
        'project2.md': {
          type: 'file' as const,
          icon: fileIcon,
          content: `# Project 2\n\n## Overview\nDescription of your second project`
        }
      }
    }
  };

  const toggleFolder = (folderId: string) => {
    const newOpenFolders = new Set(openFolders);
    if (newOpenFolders.has(folderId)) {
      newOpenFolders.delete(folderId);
    } else {
      newOpenFolders.add(folderId);
    }
    setOpenFolders(newOpenFolders);
  };

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

  const renderFileSystem = (structure: Record<string, FileSystemItem>, level = 0) => {
    return Object.entries(structure).map(([id, item]) => (
      <div key={id} className="select-none">
        <div
          className={`flex items-center px-4 py-1 space-x-2 cursor-pointer hover:bg-gray-700 ${
            selectedFile === id ? 'bg-gray-600' : ''
          }`}
          style={{ paddingLeft: `${level * 16 + 16}px` }}
          onClick={() => {
            if (item.type === 'folder') {
              toggleFolder(id);
            } else {
              setSelectedFile(id);
            }
          }}
        >
          <img src={item.icon} alt="" className="w-5 h-5" />
          <span className="text-sm text-white">{id}</span>
        </div>
        {item.type === 'folder' && openFolders.has(id) && (
          <div className="py-1">
            {renderFileSystem(item.contents, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  const renderFileContent = (content: string) => {
    return (
      <div className="p-4 font-mono text-sm text-white whitespace-pre-wrap">
        {content}
      </div>
    );
  };

  const getSelectedFileContent = () => {
    for (const folder of Object.values(fileSystem)) {
      if (folder.type === 'folder') {
        for (const [id, file] of Object.entries(folder.contents)) {
          if (id === selectedFile && file.type === 'file') {
            return file.content;
          }
        }
      }
    }
    return null;
  };

  const currentScreen = screenHistory[currentIndex];

  const renderScreen = () => {
    if (currentScreen !== "home") {
      return (
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 bg-gray-800 overflow-y-auto">
            {renderFileSystem(fileSystem)}
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {selectedFile ? (
              renderFileContent(getSelectedFileContent() || '')
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Select a file to view its contents
              </div>
            )}
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