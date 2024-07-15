import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useClassItemStore = defineStore('classItem', {
  state: () => ({
      activeSection: 0
  }),
  actions: {
      async setSection(n) {
          this.activeSection = n;
          //console.log(n)
      }
  }
})
