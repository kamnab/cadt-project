import { defineStore } from 'pinia'

export const useAppGlobalStore = defineStore('appGlobal', {
    state: () => ({
        toggleSearch: false,
        globalLoading: false,
    }),
    actions: {
        setToggleSearch(toggle) {
            this.toggleSearch = toggle;
            //console.log(n)
        },
        setLoading(val) {
            this.globalLoading = val;
            //console.log(n)
        }

    }
})
