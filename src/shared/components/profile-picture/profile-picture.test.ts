import { DOMWrapper, mount, type VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import ProfilePicture from "./profile-picture.vue";
import { byId } from "@/shared/tests/utils/by-id";

describe("Profile-Picture", () => {
    let wrapper: VueWrapper;
    beforeEach(() => {
        wrapper = mount(ProfilePicture);
    })

    it("Devrait afficher le div Profile-Picture", () => {
        expect(wrapper.exists()).toBeTruthy();
    })

    it("Devrait afficher l'image de profile", () => {
        const imgWrapper: DOMWrapper<Element> = wrapper.find(byId('profile-picture'));

        expect(imgWrapper.exists()).toBeTruthy();
    })
})