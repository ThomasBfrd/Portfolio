import { DOMWrapper, VueWrapper, mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import Home from "./Home.vue";
import { byId } from "@/shared/tests/utils/by-id";
import { ref } from "vue";
import { experiencesDataMock, profileDataMock, worksDataMock } from "@/shared/tests/mocks/data-mocks";

describe("Affichage de la vue Home", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(Home, {
      global: {
        provide: {
          portfolioData: ref({profile: profileDataMock, experiences: experiencesDataMock, works: worksDataMock})
        }
      }
    });
    expect(wrapper).toBeTruthy();
  });

  it("Devrait afficher la section Home", () => {
    const homeSection: DOMWrapper<HTMLElement> = wrapper.find(byId("home-section"));
    expect(homeSection.exists()).toBe(true);
  });

  it("Devrait afficher le nom du profil", () => {
    const profileName: DOMWrapper<HTMLElement> = wrapper.find(byId("profile-name"));
    expect(profileName.text()).toBe('John Doe');
  });

  it("Devrait afficher l'email du profil", () => {
    const profileEmail: DOMWrapper<HTMLElement> = wrapper.find(byId("profile-email"));
    expect(profileEmail.text()).toBe('john-doe@gmail.com');
  });

    it("Devrait afficher les compétences du profil", () => {
    const skillItems: DOMWrapper<HTMLElement>[] = wrapper.findAll(byId("skill-items"));
    expect(skillItems.length).toEqual(2);
  });

    it("Devrait afficher les activités récentes", () => {
    const recentActivities: DOMWrapper<HTMLElement> = wrapper.find(byId("recent-activities"));
    expect(recentActivities.exists()).toBe(true);
  });
});
