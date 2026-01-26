import type { Activity } from "@/shared/interfaces/activity.interface";
import type { Profile } from "@/shared/interfaces/profile.interface";
import type { Social } from "@/shared/interfaces/social.interface";

export const profileDataMock: Profile = {
  name: "John Doe",
  profileImg: "image.jpg",
  pseudo: "@jdoe",
  email: "john-doe@gmail.com",
  skills: [
    {name: "skill1", background: "color1"},
    {name: "skill2", background: "color2"},
  ],
  resume: "",
  bio: ["mock1", "mock2", "mock3"]
};

export const experiencesDataMock: Activity[] = [
    {
        title: "Title mock",
        image: "logo.jpg",
        screen: "screen.jpg",
        company: "Company Mock",
        website: "website.com",
        period: "date mock",
        tools: [
            "tool1",
            "tool2"
        ],
        description: [
        "mock1",
        "mock2",
        ],
        toDo: []
    },
    {
        title: "Title mock",
        image: "logo.jpg",
        screen: "screen.jpg",
        company: "Company Mock",
        website: "website.com",
        period: "date mock",
        tools: [
            "tool1",
            "tool2"
        ],
        description: [
        "mock1",
        "mock2",
        ],
        toDo: []
    },
];

export const worksDataMock: Activity[] = [
    {
        title: "Title mock",
        image: "logo.jpg",
        screen: "screen.jpg",
        company: "Company Mock",
        website: "website.com",
        period: "date mock",
        tools: [
            "tool1",
            "tool2"
        ],
        description: [
        "mock1",
        "mock2",
        ],
        toDo: ["todo1", 'todo2']
    },
    {
        title: "Title mock",
        image: "logo.jpg",
        screen: "screen.jpg",
        company: "Company Mock",
        website: "website.com",
        period: "date mock",
        tools: [
            "tool1",
            "tool2"
        ],
        description: [
        "mock1",
        "mock2",
        ],
        toDo: ["todo1", "todo2"]
    },
];

export const socialDataMock: Social[] = [
    {
      platform: "social1",
      icon: 'icon1',
      url: "url1"
    },
    {
      platform: "social2",
      icon: 'icon2',
      url: "url2"
    },
];