import { DOMWrapper, VueWrapper, mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import Social from "./social.vue";
import { byId } from "@/shared/tests/utils/by-id";
import { ref } from "vue";
import { socialDataMock } from "@/shared/tests/mocks/data-mocks";

describe("Affichage du composant Social", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(Social, {
      props: {
        isCentered: false,
      },
      global: {
        provide: {
          portfolioData: ref({socials: socialDataMock})
        }
      }
    });
  });

  it("Devrait monter le composant Social", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("Devrait afficher les différents liens sociaux", () => {
    const socialWrapper: DOMWrapper<HTMLElement>[] = wrapper.findAll(byId('social'));

    expect(socialWrapper.length).toEqual(2);
  })
});
