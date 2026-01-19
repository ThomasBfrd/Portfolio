import { DOMWrapper, VueWrapper, mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import Home from "./Home.vue";
import { byId } from "@/shared/tests/utils/by-id";

describe("Affichage de la vue Home", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(Home);
    expect(wrapper).toBeTruthy();
  });

  it("Devrait afficher la section Home", () => {
    const homeSection: DOMWrapper<HTMLElement> = wrapper.find(byId("home-section"));
    expect(homeSection.exists()).toBe(true);
  });

  it("Devrait afficher le nom du profil", () => {
    const profileName: DOMWrapper<HTMLElement> = wrapper.find(byId("profile-name"));
    expect(profileName.text()).toBe('Thomas Bouffard');
  });

  it("Devrait afficher l'email du profil", () => {
    const profileEmail: DOMWrapper<HTMLElement> = wrapper.find(byId("profile-email"));
    expect(profileEmail.text()).toBe('thomas.bfrd@gmail.com');
  });

    it("Devrait afficher les compétences du profil", () => {
    const skillItems: DOMWrapper<HTMLElement>[] = wrapper.findAll(byId("skill-items"));
    expect(skillItems.length).toBeGreaterThan(0);
  });

    it("Devrait afficher les activités récentes", () => {
    const recentActivities: DOMWrapper<HTMLElement> = wrapper.find(byId("recent-activities"));
    expect(recentActivities.exists()).toBe(true);
  });
});
