import { defineStore } from 'pinia'

export const useAppGlobalStore = defineStore('appGlobal', {
    state: () => ({
        toggleSearch: false,
        globalLoading: false,
        tenantName: 'Loading',
        iframeEditModalOpen: false,
    }),
    actions: {
        setToggleSearch(toggle) {
            this.toggleSearch = toggle;
            //console.log(n)
        },
        setLoading(val) {
            this.globalLoading = val;
            //console.log(n)
        },
        setTenantName(val) {
            this.tenantName = val;
            //console.log(n)
        },
        setIframeEditModalOpen(val) {
            this.iframeEditModalOpen = val;
            //console.log(n)
        }
    }
})
