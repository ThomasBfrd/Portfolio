export interface Profile {
  name: string;
  pseudo: string;
  email: string;
  profileImg: string;
  skills: Skills[];
  resume: string;
  bio: string[];
}

export interface Skills {
  name: string;
  gradient: string;
}