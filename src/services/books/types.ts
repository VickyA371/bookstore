export type LOG_ENTRY_WORK = {
  title: string;
  key: string;
  author_keys: string[];
  author_names: string[];
  first_publish_year: number;
  lending_edition_s: string;
  edition_key: string[];
  cover_id: number;
  cover_edition_key: string;
};

export type LOG_ENTRY = {
  work: LOG_ENTRY_WORK;
  logged_edition: string;
  logged_date: string;
};

export type GET_BOOKS_RESPONSE = {
  page: number;
  reading_log_entries: LOG_ENTRY[];
};

export enum BOOK_COVER_RESOLUTION {
  small = 'S',
  medium = 'M',
  large = 'L',
}
