type tvEpisode = {
  id: number;
  season: number;
  number: number;
  name: string;
  airdate: string;
  airtime: string;
  rating: {
    average: number | null;
  };
  image: {
    medium: string;
    original: string;
  } | null;
  summary: string | null;
};


export default tvEpisode;