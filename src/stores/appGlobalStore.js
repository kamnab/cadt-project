import { defineStore } from 'pinia'

export const useAppGlobalStore = defineStore('appGlobal', {
    state: () => ({
        toggleSearch: false,
        globalLoading: false,
        tenantName: 'Loading',
        iframeEditModalOpen: false,
        tenantActivityDrawerOpen: false,
    }),
    actions: {
        setToggleSearch(toggle) {
            this.toggleSearch = toggle;
        },
        setLoading(val) {
            this.globalLoading = val;
        },
        setTenantName(val) {
            this.tenantName = val;
        },
        setIframeEditModalOpen(val) {
            this.iframeEditModalOpen = val;
        },
        setTenantActivityDrawerOpen(val) {
            this.tenantActivityDrawerOpen = val;
        }
    }
})
