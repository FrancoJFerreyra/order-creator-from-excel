interface Props {
  title: string;
}

const Subtitle = ({ title }: Props) => {
  return (
    <h2 className="text-center font-bold">{title}</h2>
  );
}

export default Subtitle;
