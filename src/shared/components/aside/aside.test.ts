import { DOMWrapper, mount, type VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import Aside from "./aside.vue";
import { byId } from "@/shared/tests/utils/by-id";

describe("Affichage du composant Aside", () => {
  let wrapper: VueWrapper;
  let setDarkMode: Mock<() => void>;
  let setSidebarOpen: Mock<(open: boolean) => void>;
  let setRouterPath: Mock<(path: string) => void>;

  beforeEach(() => {
    setSidebarOpen = vi.fn((open: boolean) => {
      wrapper.setProps({ sidebarOpen: open });
    });

    setRouterPath = vi.fn((path: string) => {
      wrapper.setProps({ path: path });
    });

    setDarkMode = vi.fn();

    wrapper = mount(Aside, {
      props: {
        path: "about",
        sidebarOpen: true,
        setSidebarOpen,
        setRouterPath,
        setDarkMode,
      },
    });
  });

  it("Devrait monter le composant Aside", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Devrait afficher la balise Aside", () => {
    const asideWrapper: DOMWrapper<Element> = wrapper.find(byId("aside"));

    expect(asideWrapper.exists()).toBeTruthy();
  });

  it("Devrait afficher le nom, la photo de profil, le menu et les réseaux sociaux", () => {
    const toggleResposiveBtn: DOMWrapper<Element> = wrapper.find(
      byId("toggle-aside-btn"),
    );
    const pseudoWrapper: DOMWrapper<Element> = wrapper.find(byId("pseudo"));
    const profilePicture: DOMWrapper<Element> = wrapper.find(
      byId("profile-picture"),
    );
    const menuWrapper: DOMWrapper<Element>[] = wrapper.findAll(
      byId("menu-item"),
    );
    const menuWActionrapper: DOMWrapper<Element>[] = wrapper.findAll(
      byId("menu-action"),
    );
    const toggleThemeButton: DOMWrapper<Element> = wrapper.find(
      byId("toggle-theme"),
    );
    const socialsWrapper: DOMWrapper<Element> = wrapper.find(byId("socials"));

    expect(toggleResposiveBtn.exists()).toBeTruthy();
    expect(pseudoWrapper.exists()).toBeTruthy();
    expect(pseudoWrapper.text()).toContain("@thomasbfrd");
    expect(profilePicture.exists()).toBeTruthy();
    expect(menuWrapper.length).toBeTruthy();
    expect(menuWActionrapper.length).toBeTruthy();
    expect(toggleThemeButton.exists()).toBeTruthy();
    expect(socialsWrapper.exists()).toBeTruthy();
  });

  describe("Comportements de l'aside", () => {
    it("Devrait fermer l'aside au clique du bouton", async () => {
      let asideWrapper: DOMWrapper<Element> = wrapper.find(byId("aside"));

      expect(
        asideWrapper.element.classList.contains("translate-x-0"),
      ).toBeTruthy();
      expect(
        asideWrapper.element.classList.contains("-translate-x-full"),
      ).toBeFalsy();

      await wrapper.find(byId("toggle-aside-btn")).trigger("click");

      asideWrapper = wrapper.find(byId("aside"));

      expect(
        asideWrapper.element.classList.contains("translate-x-0"),
      ).toBeFalsy();
      expect(
        asideWrapper.element.classList.contains("-translate-x-full"),
      ).toBeTruthy();
    });

    it("Devrait fermer l'aside au clique d'un item menu", async () => {
      let asideWrapper: DOMWrapper<Element> = wrapper.find(byId("aside"));
      const menuWrapper: DOMWrapper<Element>[] = wrapper.findAll(
        byId("menu-item"),
      );

      expect(menuWrapper.length).toBeGreaterThan(0);

      await wrapper.findAll(byId("menu-action"))[0]?.trigger("click");

      expect(
        asideWrapper.element.classList.contains("translate-x-0"),
      ).toBeFalsy();
      expect(
        asideWrapper.element.classList.contains("-translate-x-full"),
      ).toBeTruthy();
    });

    it("Devrait changer le thème de l'application au clique", async () => {
      const toggleTheme: DOMWrapper<Element> = wrapper.find(
        byId("toggle-theme"),
      );

      expect(toggleTheme.exists()).toBeTruthy();

      await toggleTheme.trigger("click");

      expect(setDarkMode).toHaveBeenCalled();
    });
  });
});
