// src/stores/auth.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

interface User {
  id?: number
  name?: string
  email?: string
  login?: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loggedIn = ref(false)

  const apiBase = 'http://localhost:3000' // Tu backend Nuxt

  // Registro
  async function register(name: string, email: string, password: string) {
    const { data } = await axios.post(`${apiBase}/auth/register`, { name, email, password }, { withCredentials: true })
    user.value = data
    loggedIn.value = true
    return data
  }

  // Login
  async function login(email: string, password: string) {
    const { data } = await axios.post(`${apiBase}/auth/login`, { email, password }, { withCredentials: true })
    user.value = data
    loggedIn.value = true
    return data
  }

  // Logout
  async function logout() {
    await axios.post(`${apiBase}/auth/logout`, {}, { withCredentials: true })
    user.value = null
    loggedIn.value = false
  }

  // Login con GitHub (abrir popup)
  function openInPopup(path: string) {
    const width = 600
    const height = 700
    const left = (window.innerWidth - width) / 2
    const top = (window.innerHeight - height) / 2

    window.open(`${apiBase}${path}`, 'GitHub Login', `width=${width},height=${height},top=${top},left=${left}`)
  }

  return { user, loggedIn, register, login, logout, openInPopup }
})