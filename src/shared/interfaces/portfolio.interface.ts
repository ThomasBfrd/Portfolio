import type { Activity } from "./activity.interface";
import type { Profile } from "./profile.interface";
import type { Social } from "./social.interface";

export interface Portfolio {
    profile: Profile,
    experiences: Activity[],
    works: Activity[],
    socials: Social[],
}