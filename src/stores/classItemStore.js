import { defineStore } from 'pinia'

export const useClassItemStore = defineStore('classItem', {
    state: () => ({
        activeSection: 0
    }),
    actions: {
        setSection(n) {
            this.activeSection = n;
            //console.log(n)
        }
    }
})
