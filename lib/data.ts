import type { Item, MovieItem, SeriesItem } from './types';

const P_ANCIENT = 'Qadimiy davr';
const P_INFINITY = 'Infinity Saga';
const P_MULTI = 'Multiverse Saga';

// TMDB ID'lari qo'shildi
const movie = (id: string, tmdbId: number, title: string, date: string, year: number, phase: string): MovieItem => ({
  id, tmdbId, title, date, order: 0, phase, tmdbType: 'movie', year, type: 'movie',
});

const series = (id: string, tmdbId: number, title: string, date: string, year: number, episodeCount: number, phase: string): SeriesItem => ({
  id, tmdbId, title, date, order: 0, phase, tmdbType: 'tv', year, type: 'series',
  episodes: Array.from({ length: episodeCount }, (_, i) => ({ num: i + 1, title: `${i + 1}-qism` })),
});

const RAW: Item[] = [
  series('eyes-of-wakanda', 138501, 'Eyes of Wakanda', '2026-10-23', 2025, 4, P_ANCIENT),
  movie('captain-america-1', 1771, 'Captain America: The First Avenger', '2026-10-25', 2011, P_INFINITY),
  series('agent-carter', 62126, 'Agent Carter', '2026-10-26', 2015, 18, P_INFINITY),
  movie('captain-marvel', 299537, 'Captain Marvel', '2026-10-29', 2019, P_INFINITY),
  movie('iron-man', 1726, 'Iron Man', '2026-10-30', 2008, P_INFINITY),
  movie('incredible-hulk', 1724, 'The Incredible Hulk', '2026-10-31', 2008, P_INFINITY),
  movie('iron-man-2', 10138, 'Iron Man 2', '2026-11-01', 2010, P_INFINITY),
  movie('thor', 10195, 'Thor', '2026-11-02', 2011, P_INFINITY),
  movie('avengers', 24428, 'The Avengers', '2026-11-03', 2012, P_INFINITY),
  movie('iron-man-3', 68721, 'Iron Man 3', '2026-11-04', 2013, P_INFINITY),
  movie('thor-dark-world', 76338, 'Thor: The Dark World', '2026-11-05', 2013, P_INFINITY),
  movie('cap-winter-soldier', 100402, 'Captain America: The Winter Soldier', '2026-11-06', 2014, P_INFINITY),
  movie('gotg', 118340, 'Guardians of the Galaxy', '2026-11-07', 2014, P_INFINITY),
  movie('gotg-vol-2', 283995, 'Guardians of the Galaxy Vol. 2', '2026-11-08', 2017, P_INFINITY),
  series('i-am-groot', 105300, 'I Am Groot', '2026-11-09', 2022, 10, P_INFINITY),
  movie('avengers-ultron', 99861, 'Avengers: Age of Ultron', '2026-11-10', 2015, P_INFINITY),
  movie('ant-man', 102899, 'Ant-Man', '2026-11-11', 2015, P_INFINITY),
  movie('cap-civil-war', 271110, 'Captain America: Civil War', '2026-11-12', 2016, P_INFINITY),
  movie('black-widow', 497698, 'Black Widow', '2026-11-13', 2021, P_INFINITY),
  movie('black-panther', 284054, 'Black Panther', '2026-11-14', 2018, P_INFINITY),
  movie('doctor-strange', 284052, 'Doctor Strange', '2026-11-15', 2016, P_INFINITY),
  movie('spiderman-homecoming', 315635, 'Spider-Man: Homecoming', '2026-11-16', 2017, P_INFINITY),
  movie('ant-man-wasp', 363088, 'Ant-Man and the Wasp', '2026-11-17', 2018, P_INFINITY),
  movie('thor-ragnarok', 284053, 'Thor: Ragnarok', '2026-11-18', 2017, P_INFINITY),
  movie('avengers-infinity-war', 299536, 'Avengers: Infinity War', '2026-11-19', 2018, P_INFINITY),
  movie('avengers-endgame', 299534, 'Avengers: Endgame', '2026-11-20', 2019, P_INFINITY),
  series('wandavision', 85271, 'WandaVision', '2026-11-22', 2021, 9, P_MULTI),
  series('falcon-winter-soldier', 88396, 'The Falcon and the Winter Soldier', '2026-11-25', 2021, 6, P_MULTI),
  movie('spiderman-far-from-home', 429617, 'Spider-Man: Far From Home', '2026-11-27', 2019, P_MULTI),
  series('loki', 84958, 'Loki', '2026-11-28', 2021, 12, P_MULTI),
  movie('spiderman-no-way-home', 634649, 'Spider-Man: No Way Home', '2026-12-02', 2021, P_MULTI),
  movie('eternals', 524434, 'Eternals', '2026-12-03', 2021, P_MULTI),
  movie('shang-chi', 566525, 'Shang-Chi and the Legend of the Ten Rings', '2026-12-04', 2021, P_MULTI),
  series('hawkeye', 88329, 'Hawkeye', '2026-12-05', 2021, 6, P_MULTI),
  movie('dr-strange-2', 453395, 'Doctor Strange in the Multiverse of Madness', '2026-12-07', 2022, P_MULTI),
  series('moon-knight', 92749, 'Moon Knight', '2026-12-08', 2022, 6, P_MULTI),
  series('ms-marvel', 92782, 'Ms. Marvel', '2026-12-10', 2022, 6, P_MULTI),
  movie('thor-love-thunder', 616037, 'Thor: Love and Thunder', '2026-12-12', 2022, P_MULTI),
  series('she-hulk', 92783, 'She-Hulk: Attorney at Law', '2026-12-13', 2022, 9, P_MULTI),
  movie('black-panther-2', 505642, 'Black Panther: Wakanda Forever', '2026-12-16', 2022, P_MULTI),
  movie('werewolf-by-night', 894205, 'Werewolf by Night', '2026-12-17', 2022, P_MULTI),
  movie('gotg-holiday', 774752, 'The Guardians of the Galaxy Holiday Special', '2026-12-17', 2022, P_MULTI),
  movie('ant-man-3', 640146, 'Ant-Man and the Wasp: Quantumania', '2026-12-18', 2023, P_MULTI),
  movie('gotg-vol-3', 447365, 'Guardians of the Galaxy Vol. 3', '2026-12-19', 2023, P_MULTI),
  series('secret-invasion', 114472, 'Secret Invasion', '2026-12-20', 2023, 6, P_MULTI),
  movie('the-marvels', 609681, 'The Marvels', '2026-12-22', 2023, P_MULTI),
  series('echo', 122226, 'Echo', '2026-12-23', 2024, 5, P_MULTI),
  series('agatha', 138501, 'Agatha All Along', '2026-12-25', 2024, 9, P_MULTI),
  movie('deadpool-wolverine', 533535, 'Deadpool & Wolverine', '2026-12-28', 2024, P_MULTI),
  movie('cap-brave-new-world', 822119, 'Captain America: Brave New World', '2026-12-29', 2025, P_MULTI),
  movie('thunderbolts', 986056, 'Thunderbolts*', '2026-12-30', 2025, P_MULTI),
  movie('fantastic-four', 617126, 'The Fantastic Four: First Steps', '2026-12-31', 2025, P_MULTI),
  series('daredevil-ba', 202555, 'Daredevil: Born Again', '2027-01-01', 2025, 9, P_MULTI),
];

export const ITEMS: Item[] = RAW.map((it, i) => ({ ...it, order: i + 1 }));
