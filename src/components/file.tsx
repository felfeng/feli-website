interface FileProp {
  title: string;
  image: string;
  onClick: () => void;
}

const File: React.FC<FileProp> = ({ image, title, onClick }) => {
  return (
    <div className="flex flex-col w-24 h-10 rounded-lg">
      <button onClick={onClick}>
        <img className="rounded-lg w-24 h-24" src={image} alt="image" />
      </button>
      <div className="mt-4 mb-4 text-white">{title}</div>
    </div>
  );
};
export default File;
