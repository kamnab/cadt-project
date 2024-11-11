import { defineStore } from 'pinia'

export const useTenantItemStore = defineStore('tenantItem', {
    state: () => ({
        toggleSearch: false,
    }),
    actions: {
        setToggleSearch(toggle) {
            this.toggleSearch = toggle;
            //console.log(n)
        }
    }
})
