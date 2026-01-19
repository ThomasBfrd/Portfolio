import { DOMWrapper, VueWrapper, mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import Projects from "./Projects.vue";
import { byId } from "@/shared/tests/utils/by-id";

describe("Affichage de la vue Projets", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(Projects);
    expect(wrapper).toBeTruthy();
  });

  it("Devrait monter la section Projets", () => {
    const projectsSection: DOMWrapper<HTMLElement> = wrapper.find(byId("projects-section"));
    expect(projectsSection.exists()).toBe(true);
  });

    it("Devrait afficher le composant Activity", () => {
    const projectsTitle: DOMWrapper<HTMLElement> = wrapper.find(byId("work-activities"));
    expect(projectsTitle.exists()).toBeTruthy();
  });
});
