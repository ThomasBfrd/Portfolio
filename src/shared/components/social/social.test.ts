import { DOMWrapper, VueWrapper, mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import Social from "./social.vue";
import { byId } from "@/shared/tests/utils/by-id";

describe("Affichage du composant Social", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(Social);
  });

  it("Devrait monter le composant Social", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("Devrait afficher les différents liens sociaux", () => {
    const socialWrapper: DOMWrapper<Element>[] = wrapper.findAll(byId('social'));

    expect(socialWrapper.length).toBeGreaterThan(0);
  })
});
