<script lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    const page = ref(0)
    const limit = ref(10)
    const search = ref('')
    const orderBy = ref(null)

    const students = computed(() => store.state.students)

    function loadUsersWithFilters() {
      const queryParams = {
        page: page.value,
        limit: limit.value,
        search: search.value,
        orderBy: orderBy.value
      }
      store.dispatch('getUsers', queryParams)
    }

    function toFirstPage() {
      page.value = 0
      loadUsersWithFilters()
    }
    function toLastPage() {
      page.value = students.value.length
      loadUsersWithFilters()
    }
    function changePage(value: number) {
      page.value = value
      loadUsersWithFilters()
    }

    loadUsersWithFilters()

    return {
      page,
      limit,
      search,
      orderBy,
      students,
      loadUsersWithFilters,
      toFirstPage,
      toLastPage,
      changePage
    }
  }
}
</script>

<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">Dashboard</h3>
    <button @click="loadUsersWithFilters">Carregar Usuários com Filtros</button>

    <div class="mt-4">
      <div class="flex flex-wrap -mx-6">
        <div class="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3">
          <div
            class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
            <div class="p-3 bg-indigo-600 bg-opacity-75 rounded-full">
              <svg
                class="w-8 h-8 text-white"
                viewBox="0 0 28 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                  fill="currentColor" />
                <path
                  d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                  fill="currentColor" />
                <path
                  d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                  fill="currentColor" />
                <path
                  d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                  fill="currentColor" />
                <path
                  d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                  fill="currentColor" />
                <path
                  d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                  fill="currentColor" />
              </svg>
            </div>

            <div class="mx-5">
              <h4 class="text-2xl font-semibold text-gray-700">
                {{ students.length }}
              </h4>
              <div class="text-gray-500">New Users</div>
            </div>
          </div>
        </div>

        <div class="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
          <div
            class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
            <div class="p-3 bg-blue-600 bg-opacity-75 rounded-full">
              <svg
                class="w-8 h-8 text-white"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.19999 1.4C3.4268 1.4 2.79999 2.02681 2.79999 2.8C2.79999 3.57319 3.4268 4.2 4.19999 4.2H5.9069L6.33468 5.91114C6.33917 5.93092 6.34409 5.95055 6.34941 5.97001L8.24953 13.5705L6.99992 14.8201C5.23602 16.584 6.48528 19.6 8.97981 19.6H21C21.7731 19.6 22.4 18.9732 22.4 18.2C22.4 17.4268 21.7731 16.8 21 16.8H8.97983L10.3798 15.4H19.6C20.1303 15.4 20.615 15.1004 20.8521 14.6261L25.0521 6.22609C25.2691 5.79212 25.246 5.27673 24.991 4.86398C24.7357 4.45123 24.2852 4.2 23.8 4.2H8.79308L8.35818 2.46044C8.20238 1.83722 7.64241 1.4 6.99999 1.4H4.19999Z"
                  fill="currentColor" />
                <path
                  d="M22.4 23.1C22.4 24.2598 21.4598 25.2 20.3 25.2C19.1403 25.2 18.2 24.2598 18.2 23.1C18.2 21.9402 19.1403 21 20.3 21C21.4598 21 22.4 21.9402 22.4 23.1Z"
                  fill="currentColor" />
                <path
                  d="M9.1 25.2C10.2598 25.2 11.2 24.2598 11.2 23.1C11.2 21.9402 10.2598 21 9.1 21C7.9402 21 7 21.9402 7 23.1C7 24.2598 7.9402 25.2 9.1 25.2Z"
                  fill="currentColor" />
              </svg>
            </div>

            <div class="mx-5">
              <h4 class="text-2xl font-semibold text-gray-700">200,521</h4>
              <div class="text-gray-500">Total Orders</div>
            </div>
          </div>
        </div>

        <div class="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
          <div
            class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
            <div class="p-3 bg-pink-600 bg-opacity-75 rounded-full">
              <svg
                class="w-8 h-8 text-white"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linejoin="round" />
                <path
                  d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z"
                  stroke="currentColor"
                  stroke-width="2" />
              </svg>
            </div>

            <div class="mx-5">
              <h4 class="text-2xl font-semibold text-gray-700">215,542</h4>
              <div class="text-gray-500">Available Products</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8" />

    <div class="flex flex-col mt-8">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div
          class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
          <v-table>
            <thead>
              <tr>
                <th class="text-center">Registro Acadêmico</th>
                <th class="text-center">Nome</th>
                <th class="text-center">CPF</th>
                <th class="text-end">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in students.data" :key="item.id">
                <td class="text-center">{{ item.id }}</td>
                <td class="text-center">{{ item.name }}</td>
                <td class="text-center">{{ item.cpf }}</td>
                <td class="text-end">[editar] [excluir]</td>
              </tr>
            </tbody>
            <tfoot class="border-t min-h-12 w-full">
              <tr>
                <td colspan="4">
                  <div
                    class="bg-white dark:bg-gray-800 dark:border-gray-700 mb-1 flex space-y-3 flex-col md:flex-row justify-between items-center px-6">
                    <div
                      class="dark:text-gray-100 flex items-center gap-3 mt-2">
                      itens por página
                      <select
                        type="number"
                        @change="loadUsersWithFilters"
                        v-model="limit"
                        class="px-3 py-3 text-sm focus:z-10 focus:outline-none focus:ring-primary-500 dark:border-night-500 dark:bg-night-800 dark:text-night-100 dark:placeholder-night-200 none border-none rounded-md w-20 focus:border-none checked:border-none font-semibold">
                        <option :value="5">5</option>
                        <option :value="10">10</option>
                        <option :value="20">20</option>
                        <option :value="50">50</option>
                        <option :value="100">100</option>
                      </select>
                    </div>

                    <div class="dark:text-gray-100">
                      Exibindo
                      {{
                        students.page * students.limit +
                        (students.length > 0 ? 1 : 0)
                      }}
                      a
                      {{
                        students.length < 1
                          ? 0
                          : (students.page + 1) * students.limit >
                            students.length
                          ? students.length
                          : (students.page + 1) * students.limit
                      }}
                      de {{ students.length }} itens
                    </div>

                    <div class="flex gap-1 items-center">
                      <div
                        @click="toFirstPage()"
                        class="cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 p-1 px-2 rounded-md">
                        <i class="fa-solid fa-angles-left text-primary-600"></i>
                      </div>
                      <div
                        @click="changePage(students.page - 1)"
                        class="cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 p-1 px-2 rounded-md">
                        <i class="fa-solid fa-angle-left text-primary-600"></i>
                      </div>
                      <div class="font-semibold p-1 px-2 dark:text-gray-100">
                        {{ students.page + 1 }}
                      </div>
                      <div
                        @click="changePage(students.page + 1)"
                        class="cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 p-1 px-2 rounded-md">
                        <i class="fa-solid fa-angle-right text-primary-600"></i>
                      </div>
                      <div
                        @click="toLastPage"
                        class="cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 p-1 px-2 rounded-md">
                        <i
                          class="fa-solid fa-angles-right text-primary-600"></i>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </v-table>
        </div>
      </div>
    </div>
  </div>
</template>
