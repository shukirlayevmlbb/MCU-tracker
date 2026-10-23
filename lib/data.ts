import type { Item, MovieItem, SeriesItem } from './types';

const P_ANCIENT = 'Qadimiy davr';
const P_INFINITY = 'Infinity Saga';
const P_MULTI = 'Multiverse Saga';

const movie = (
  id: string,
  title: string,
  date: string,
  year: number,
  phase: string,
  runtime?: number
): MovieItem => ({
  id, title, date, order: 0, phase, tmdbType: 'movie', year, type: 'movie', runtime,
});

const series = (
  id: string,
  title: string,
  date: string,
  year: number,
  episodeCount: number,
  phase: string
): SeriesItem => ({
  id, title, date, order: 0, phase, tmdbType: 'tv', year, type: 'series',
  episodes: Array.from({ length: episodeCount }, (_, i) => ({
    num: i + 1,
    title: `${i + 1}-qism`,
  })),
});

const RAW: Item[] = [
  series('eyes-of-wakanda', 'Eyes of Wakanda', '2026-10-23', 2025, 4, P_ANCIENT),
  movie('captain-america-the-first-avenger', 'Captain America: The First Avenger', '2026-10-25', 2011, P_INFINITY, 124),
  series('agent-carter', 'Agent Carter', '2026-10-26', 2015, 18, P_INFINITY),
  movie('captain-marvel', 'Captain Marvel', '2026-10-29', 2019, P_INFINITY, 124),
  movie('iron-man', 'Iron Man', '2026-10-30', 2008, P_INFINITY, 126),
  movie('the-incredible-hulk', 'The Incredible Hulk', '2026-10-31', 2008, P_INFINITY, 112),
  movie('iron-man-2', 'Iron Man 2', '2026-11-01', 2010, P_INFINITY, 124),
  movie('thor', 'Thor', '2026-11-02', 2011, P_INFINITY, 115),
  movie('the-avengers', 'The Avengers', '2026-11-03', 2012, P_INFINITY, 143),
  movie('iron-man-3', 'Iron Man 3', '2026-11-04', 2013, P_INFINITY, 130),
  movie('thor-the-dark-world', 'Thor: The Dark World', '2026-11-05', 2013, P_INFINITY, 112),
  movie('captain-america-the-winter-soldier', 'Captain America: The Winter Soldier', '2026-11-06', 2014, P_INFINITY, 136),
  movie('guardians-of-the-galaxy', 'Guardians of the Galaxy', '2026-11-07', 2014, P_INFINITY, 122),
  movie('guardians-of-the-galaxy-vol-2', 'Guardians of the Galaxy Vol. 2', '2026-11-08', 2017, P_INFINITY, 137),
  series('i-am-groot', 'I Am Groot', '2026-11-09', 2022, 10, P_INFINITY),
  movie('avengers-age-of-ultron', 'Avengers: Age of Ultron', '2026-11-10', 2015, P_INFINITY, 141),
  movie('ant-man', 'Ant-Man', '2026-11-11', 2015, P_INFINITY, 117),
  movie('captain-america-civil-war', 'Captain America: Civil War', '2026-11-12', 2016, P_INFINITY, 147),
  movie('black-widow', 'Black Widow', '2026-11-13', 2021, P_INFINITY, 134),
  movie('black-panther', 'Black Panther', '2026-11-14', 2018, P_INFINITY, 134),
  movie('doctor-strange', 'Doctor Strange', '2026-11-15', 2016, P_INFINITY, 115),
  movie('spider-man-homecoming', 'Spider-Man: Homecoming', '2026-11-16', 2017, P_INFINITY, 133),
  movie('ant-man-and-the-wasp', 'Ant-Man and the Wasp', '2026-11-17', 2018, P_INFINITY, 118),
  movie('thor-ragnarok', 'Thor: Ragnarok', '2026-11-18', 2017, P_INFINITY, 130),
  movie('avengers-infinity-war', 'Avengers: Infinity War', '2026-11-19', 2018, P_INFINITY, 149),
  movie('avengers-endgame', 'Avengers: Endgame', '2026-11-20', 2019, P_INFINITY, 181),
  series('wandavision', 'WandaVision', '2026-11-22', 2021, 9, P_MULTI),
  series('the-falcon-and-the-winter-soldier', 'The Falcon and the Winter Soldier', '2026-11-25', 2021, 6, P_MULTI),
  movie('spider-man-far-from-home', 'Spider-Man: Far From Home', '2026-11-27', 2019, P_MULTI, 129),
  series('loki', 'Loki', '2026-11-28', 2021, 12, P_MULTI),
  movie('spider-man-no-way-home', 'Spider-Man: No Way Home', '2026-12-02', 2021, P_MULTI, 148),
  movie('eternals', 'Eternals', '2026-12-03', 2021, P_MULTI, 156),
  movie('shang-chi', 'Shang-Chi and the Legend of the Ten Rings', '2026-12-04', 2021, P_MULTI, 132),
  series('hawkeye', 'Hawkeye', '2026-12-05', 2021, 6, P_MULTI),
  movie('doctor-strange-multiverse-of-madness', 'Doctor Strange in the Multiverse of Madness', '2026-12-07', 2022, P_MULTI, 126),
  series('moon-knight', 'Moon Knight', '2026-12-08', 2022, 6, P_MULTI),
  series('ms-marvel', 'Ms. Marvel', '2026-12-10', 2022, 6, P_MULTI),
  movie('thor-love-and-thunder', 'Thor: Love and Thunder', '2026-12-12', 2022, P_MULTI, 119),
  series('she-hulk', 'She-Hulk: Attorney at Law', '2026-12-13', 2022, 9, P_MULTI),
  movie('black-panther-wakanda-forever', 'Black Panther: Wakanda Forever', '2026-12-16', 2022, P_MULTI, 161),
  movie('werewolf-by-night', 'Werewolf by Night', '2026-12-17', 2022, P_MULTI, 53),
  movie('gotg-holiday-special', 'The Guardians of the Galaxy Holiday Special', '2026-12-17', 2022, P_MULTI, 44),
  movie('ant-man-quantumania', 'Ant-Man and the Wasp: Quantumania', '2026-12-18', 2023, P_MULTI, 124),
  movie('gotg-vol-3', 'Guardians of the Galaxy Vol. 3', '2026-12-19', 2023, P_MULTI, 150),
  series('secret-invasion', 'Secret Invasion', '2026-12-20', 2023, 6, P_MULTI),
  movie('the-marvels', 'The Marvels', '2026-12-22', 2023, P_MULTI, 105),
  series('echo', 'Echo', '2026-12-23', 2024, 5, P_MULTI),
  series('agatha-all-along', 'Agatha All Along', '2026-12-25', 2024, 9, P_MULTI),
  movie('deadpool-wolverine', 'Deadpool & Wolverine', '2026-12-28', 2024, P_MULTI, 128),
  movie('captain-america-brave-new-world', 'Captain America: Brave New World', '2026-12-29', 2025, P_MULTI, 118),
  movie('thunderbolts', 'Thunderbolts*', '2026-12-30', 2025, P_MULTI, 126),
  movie('fantastic-four-first-steps', 'The Fantastic Four: First Steps', '2026-12-31', 2025, P_MULTI, 130),
  series('daredevil-born-again', 'Daredevil: Born Again', '2027-01-01', 2025, 9, P_MULTI),
];

export const ITEMS: Item[] = RAW.map((it, i) => ({ ...it, order: i + 1 }));
