import { DOMWrapper, mount, VueWrapper } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import About from "./About.vue";
import { byId } from "@/shared/tests/utils/by-id";

describe("Affichage de la vue A propos", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(About);
    expect(wrapper).toBeTruthy();
  });

  it("Devrait contenir une section A propos", () => {
    const aboutSection: DOMWrapper<HTMLElement> = wrapper.find(byId("about-section"));
    expect(aboutSection.exists()).toBe(true);
  });

  it("Devrait contenir un titre A propos", () => {
    const aboutTitle: DOMWrapper<HTMLElement> = wrapper.find("h2");
    expect(aboutTitle.text()).toBe("A propos");
  });

  it("Devrait contenir plusieurs paragraphes", () => {
    const aboutParagraph: DOMWrapper<HTMLElement> = wrapper.find("p");
    expect(aboutParagraph.findAllComponents.length).toBeGreaterThan(0);
  });
});
