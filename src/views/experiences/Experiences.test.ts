import { DOMWrapper, mount, VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import Experiences from "./Experiences.vue";
import { byId } from "@/shared/tests/utils/by-id";

describe("Affichage de la vue Experiences", () => {
    let wrapper: VueWrapper;
    
    beforeEach(() => {
        wrapper = mount(Experiences);
        expect(wrapper).toBeTruthy();
    })

    it('Devrait contenir une section Experiences', () => {
        const experiencesSection: DOMWrapper<HTMLElement> = wrapper.find(byId('experiences-section'));
        expect(experiencesSection.exists()).toBe(true);
    });

    it('Devrait contenir un titre Experiences', () => {
        const experiencesTitle: DOMWrapper<HTMLElement> = wrapper.find('h2');
        expect(experiencesTitle.text()).toBe('EXPERIENCES');
    });

    it("Devrait contenir le composant Activity avec les expériences", () => {
        const activityComponent: DOMWrapper<HTMLElement> = wrapper.find(byId('experiences-activity'));
        expect(activityComponent.exists()).toBe(true);
    })
})