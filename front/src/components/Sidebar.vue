<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { ref } from 'vue'
import { useSidebar } from '../composables/useSidebar'

export default {
  setup() {
    const { isOpen } = useSidebar()
    const activeClass = ref(
      'bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100'
    )
    const inactiveClass = ref(
      'border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100'
    )

    const options = [
      {
        title: 'Listagem de Alunos',
        component: 'Dashboard',
        icon: 'fa-solid fa-id-card',
        to: '/dashboard'
      },
      {
        title: 'Cadastrar Aluno',
        component: 'Forms',
        icon: 'fa-solid fa-user-plus',
        to: '/forms'
      }
    ]

    return {
      options,
      isOpen,
      activeClass,
      inactiveClass
    }
  }
}
</script>

<template>
  <div class="flex">
    <div
      :class="isOpen ? 'block' : 'hidden'"
      class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
      @click="isOpen = false" />

    <div
      :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0 flex flex-col justify-between">
      <div class="">
        <div class="flex items-center justify-center mt-8">
          <div class="flex items-center">
            <img
              src="https://cdn.eadplataforma.app/client/growdev/upload/others/3643c0b6883d9b391aee2e087e7797a7.png"
              alt="logo"
              class="px-4" />
          </div>
        </div>

        <nav class="mt-10">
          <router-link
            v-for="item in options"
            :key="item.component"
            class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
            :class="[
              $route.name === item.component ? activeClass : inactiveClass
            ]"
            :to="item.to">
            <i :class="item.icon"></i>

            <span class="mx-4"> {{ item.title }} </span>
          </router-link>
        </nav>
      </div>

      <div class="pb-3">
        <a
          class="flex items-center px-6 py-2 mt-2 duration-200 border-l-4 border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"
          href="https://github.com/LiZzeira">
          <i class="fa-brands fa-github"></i>
          <span class="mx-4"> GitHub </span>
        </a>
        <a
          class="flex items-center px-6 py-2 duration-200 border-l-4 border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"
          href="https://github.com/LiZzeira/academy">
          <i class="fa-brands fa-github"></i>
          <span class="mx-4"> Repositório </span>
        </a>
        <a
          class="flex items-center px-6 py-2 duration-200 border-l-4 border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"
          href="https://api.whatsapp.com/send?phone=5535984191788&text=Gostei%20bastante%20do%20seu%20projeto%20podemos%20falar%20mais%20sobre%20sua%20contrata%C3%A7%C3%A3o?">
          <i class="fa-brands fa-whatsapp"></i>
          <span class="mx-4"> Whatsapp </span>
        </a>
      </div>
    </div>
  </div>
</template>
