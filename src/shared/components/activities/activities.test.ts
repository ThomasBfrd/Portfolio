import { DOMWrapper, VueWrapper, mount } from "@vue/test-utils";
import Activities from "./activities.vue";
import { beforeEach, describe, expect, it } from "vitest";
import { byId } from "@/shared/tests/utils/by-id";
import type { Activity } from "@/shared/interfaces/activity.interface";
import { experiencesDataMock, worksDataMock } from "@/shared/tests/mocks/data-mocks";

describe("Social", () => {
  let wrapper: VueWrapper;

  describe("Affichage de la vue", () => {
    beforeEach(() => {
      wrapper = mount(Activities, {
        props: {
          activities: experiencesDataMock
        }
      });
    });

    it("Devrait monter le composant Activity", () => {
      expect(wrapper.exists()).toBe(true);
    });

    it("Devrait afficher la section de la vue", () => {
      const activitySection: DOMWrapper<Element> = wrapper.find(
        byId("activity-section"),
      );
      expect(activitySection).toBeTruthy();
    });

    it("Devrait afficher toutes les activités reçues", () => {
      const activities: DOMWrapper<Element>[] = wrapper.findAll(
        byId("activity"),
      );

      expect(activities.length).toBeGreaterThan(0);
    });
  });

  describe("Affichage d'une activity", () => {
    beforeEach(() => {
      wrapper = mount(Activities, {
        props: {
          activities: worksDataMock,
        },
      });
    });

    it("Devrait afficher toutes les activités reçues", () => {
      const activities: DOMWrapper<Element>[] = wrapper.findAll(
        byId("activity"),
      );

      expect(activities.length).toBeGreaterThan(0);
    });

    it("Devrait masquer la partie TODO s'il n'y a pas d'informations", () => {
      wrapper = mount(Activities, {
        props: {
          activities: experiencesDataMock,
        },
      });
      const activities: DOMWrapper<Element>[] = wrapper.findAll(
        byId("activity"),
      );

      const todoDiv: DOMWrapper<Element> | undefined = activities[0]?.find(
        byId("activity-todo"),
      );

      expect(activities.length).toBeGreaterThan(0);
      expect(todoDiv?.exists()).toBe(false);
    });

    it("Devrait masquer la partie URL s'il n'y a pas d'informations", () => {
      wrapper = mount(Activities, {
        props: {
          activities: [
            {
              ...worksDataMock[0],
              website: "",
            } as Activity,
          ],
        },
      });
      const activities: DOMWrapper<Element>[] = wrapper.findAll(
        byId("activity"),
      );

      const urlDiv: DOMWrapper<Element> | undefined = activities[0]?.find(
        byId("activity-url"),
      );

      expect(activities.length).toBeGreaterThan(0);
      expect(urlDiv?.exists()).toBe(false);
    });

    it("Devrait masquer la partie Screen s'il n'y a pas d'images", () => {
      wrapper = mount(Activities, {
        props: {
          activities: [
            {
              ...experiencesDataMock[0],
              screen: "",
            } as Activity,
          ],
        },
      });
      const activities: DOMWrapper<Element>[] = wrapper.findAll(
        byId("activity"),
      );

      const screenDiv: DOMWrapper<Element> | undefined = activities[0]?.find(
        byId("activity-screen"),
      );

      expect(activities.length).toBeGreaterThan(0);
      expect(screenDiv?.exists()).toBe(false);
    });
  });

  describe("Comportement d'une activity", () => {
    beforeEach(() => {
      wrapper = mount(Activities, {
        props: {
          activities: experiencesDataMock,
        },
      });
    });
    it("Devrait afficher l'image en overlay au clique", async () => {
      const activities: DOMWrapper<Element>[] = wrapper.findAll(
        byId("activity"),
      );

      await activities[0]?.find(byId("activity-screen")).trigger("click");

      let screenOverlay: DOMWrapper<Element> | undefined = wrapper.find(
        byId("activity-screen-overlay"),
      );

      expect(screenOverlay.exists()).toBe(true);
      expect(screenOverlay.isVisible()).toBe(true);

      await screenOverlay.trigger('click');

      screenOverlay = wrapper.find(
        byId("activity-screen-overlay"),
      );

      expect(screenOverlay.exists()).toBe(false);
    });
  });
});
