interface AboutMeProp {
  title: string;
  image: string;
  onClick: () => void;
}

const AboutMe: React.FC<AboutMeProp> = ({ image, title, onClick }) => {
  return (
    <div className="flex flex-col w-24 h-10 rounded-lg">
      <button onClick={onClick}>
        <img className="rounded-lg" src={image} alt="About Me" />
      </button>
      <div className="mt-4 mb-4 text-white">{title}</div>
    </div>
  );
};
export default AboutMe;
