<script lang="ts">
import { LoginModel } from '@/model/login.model'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import service from '@/api'

export default {
  setup() {
    const router = useRouter()

    const user = ref<LoginModel>({
      email: '',
      password: ''
    })

    async function onSubmit() {
      const res = await service.login(user.value)
      if (res) {
        router.push('/dashboard')
      }
    }

    return {
      user,
      onSubmit
    }
  }
}
</script>

<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <div class="flex items-center justify-center">
        <img
          src="https://cdn.eadplataforma.app/client/growdev/upload/others/3643c0b6883d9b391aee2e087e7797a7.png"
          alt="logo" />
      </div>

      <form class="mt-4" @submit.prevent="onSubmit">
        <v-text-field
          class="bg-white dark:bg-gray-800"
          variant="outlined"
          v-model="user.email"
          type="email"
          label="E-mail"
          placeholder="ex: mail@mail.com"
          required />

        <v-text-field
          class="bg-white dark:bg-gray-800 mt-3"
          variant="outlined"
          v-model="user.password"
          label="Senha"
          type="password"
          placeholder="ex: mail@mail.com"
          required />

        <div class="flex items-center justify-between mt-4">
          <div>
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                checked="true"
                class="text-blue-900 border-gray-200 rounded-md focus:border-blue-900 focus:ring focus:ring-opacity-40 focus:ring-blue-800" />
              <span class="mx-2 text-sm text-gray-600">lembrar-me</span>
            </label>
          </div>

          <div>
            <a class="block text-sm text-blue-800 hover:underline" href="#">
              Esqueceu sua senha?
            </a>
          </div>
        </div>

        <div class="mt-6">
          <button
            type="submit"
            class="w-full px-4 py-2 text-sm text-center text-white bg-blue-900 rounded-md focus:outline-none hover:bg-blue-800">
            Entrar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
