import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserSessionStore = defineStore('userSession', () => {
  const username = ref('Guest Builder')

  function visitGithub() {
    window.open('https://github.com/alexx-sanchez', '_blank')
  }

  return { username, visitGithub }
})
