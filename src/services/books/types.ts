import {Type} from 'class-transformer';

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

export class LOG_ENTRY {
  work!: LOG_ENTRY_WORK;
  logged_edition!: string;
  logged_date!: string;
}

export class GET_BOOKS_RESPONSE {
  page!: number;
  reading_log_entries!: LOG_ENTRY[];
}

export type KEY_TYPE = {
  key: string;
};

export type BOOK_DETAILS_AUTHOR_TYPE = {
  author: KEY_TYPE;
  type: KEY_TYPE;
};

export type BOOK_DETAILS_DATE_TYPE = {
  type: string;
  value: string;
};

export interface GET_BOOK_DETAILS_RESPONSE {
  title: string;
  key: string;
  authors: BOOK_DETAILS_AUTHOR_TYPE[];
  type: KEY_TYPE;
  description?: string;
  covers: number[];
  subject_places: string[];
  subjects: string[];
  subject_people: string[];
  subject_times: string[];
  location: string;
  latest_revision: number;
  revision: number;
  created: BOOK_DETAILS_DATE_TYPE;
  last_modified: BOOK_DETAILS_DATE_TYPE;
  publish_date?: string;
  publish_country?: string;
  languages?: KEY_TYPE[];
  other_titles?: string[];
  notes?: string;
  subtitle?: string;
  by_statement?: string;
  publishers?: string[];
  publish_places?: string[];
  pagination?: string;
  number_of_pages?: number;
  source_records?: string[];
  full_title?: string;
  works?: KEY_TYPE[];
  identifiers?: {
    goodreads: string[];
  };
  classifications?: {};
  physical_format?: string;
  copyright_date?: string;
  ocaid?: string;
  isbn_10?: string[];
  isbn_13?: string[];
  oclc_numbers?: string[];
  dewey_decimal_class?: string[];
  lc_classifications?: string[];
  local_id?: string[];
}

export enum BOOK_COVER_RESOLUTION {
  small = 'S',
  medium = 'M',
  large = 'L',
}

export class SEARCH_DOC_TYPE {
  key!: string;
  title!: string;
  first_publish_year!: number;
  cover_i!: number;
  author_name!: string[];
}

export interface GET_SEARCH_RESULTS_RESPONSE_TYPE {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: SEARCH_DOC_TYPE[];
  num_found: number;
  q: string;
  offset?: number;
}

export class FETCH_BOOKS {
  @Type(() => LOG_ENTRY)
  data!: LOG_ENTRY[];
}

export class FETCH_SEARCH_BOOKS {
  @Type(() => SEARCH_DOC_TYPE)
  data!: SEARCH_DOC_TYPE[];
}
