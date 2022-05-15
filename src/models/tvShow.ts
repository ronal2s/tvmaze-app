type TVShow = {
  id: number;
  url: string;
  name: string;
  language: string;
  genres: string[];
  status: string;
  premiered: string | null;
  ended: string | null;
  officialSite: string;
  schedule: {
    time: string;
    days: string[];
  };
  rating: {
    average: number | null;
  };
  network: {
    id: number;
    name: string;
    country: {
      name: string;
      code: string;
      timezone: string;
    };
    officialSite: string | null;
  };
  webChannel: {
    id: number;
    name: string;
    country: {
      name: string;
      code: string;
      timezone: string;
    };
    officialSite: string | null;
  };
  image: {
    medium: string;
    original: string;
  } | null;
  summary: string;
  _links: {
    self: {
      href: string;
    };
    previousepisode: {
      href: string;
    };
  };
};

export default TVShow;
