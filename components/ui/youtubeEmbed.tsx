type Props = {
  youtubeId: string,
}

const YoutubeEmbed = ({
  youtubeId
}: Props) => {
  return (
    <div>
      <iframe
        className="w-full h-[200px] md:h-[500px] lg:h-[800px]"
        src={`https://www.youtube.com/embed/${youtubeId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};

export default YoutubeEmbed;
