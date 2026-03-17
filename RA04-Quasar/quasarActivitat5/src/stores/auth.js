import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from 'src/boot/axios'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loggedIn = computed(() => !!user.value)

  const fetchSession = async () => {
    try {
      const { data } = await api.get('/auth/session')
      user.value = data.user || null
    } catch {
      user.value = null
    }
  }

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    user.value = data
  }

  const register = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password })
    user.value = data
  }

  const logout = async () => {
    await api.post('/auth/logout')
    user.value = null
  }

  const openInPopup = (url) => {
    const popup = window.open(url, 'oauth', 'width=600,height=700')
    const timer = setInterval(() => {
      if (popup?.closed) {
        clearInterval(timer)
        fetchSession()
      }
    }, 500)
  }

  return { user, loggedIn, fetchSession, login, register, logout, openInPopup }
})