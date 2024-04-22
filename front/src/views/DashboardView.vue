<script lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import service from '@/api'
import { StudentModel } from '@/model/student.model'
import swal from '@/swal'
import _ from 'lodash'
import { useRouter } from 'vue-router'
import { Mask } from 'maska'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const page = ref(0)
    const limit = ref(10)
    const search = ref('')
    const orderBy = ref('')
    const desc = ref(false)
    const mask = new Mask({ mask: '###.###.###-##' })

    const students = computed(() => store.state.students)

    async function deleteStudent(student: StudentModel): Promise<void> {
      const result = await swal.custom({
        icon: 'question',
        title: 'Atenção!',
        html: `
        <p class="text-center">Deseja remover o estudante: </p>
        <div class="flex justify-center mt-3">
          <div class="text-start w-full md:w-1/2">
            <div class="flex items-center justify-between border-b border-gray-100/50">
              <span class="font-medium text-gray-600">RA:</span>
              <span class="text-gray-600 font-semibold">${student.id}</span>
            </div>
            <div class="flex items-center justify-between border-b border-gray-100/50">
              <span class="font-medium text-gray-600">Nome:</span>
              <span class="text-gray-600 font-semibold">${student.name}</span>
            </div>
            <div class="flex items-center justify-between border-b border-gray-100/50">
              <span class="font-medium text-gray-600">CPF:</span>
              <span class="text-gray-600 font-semibold">${student.cpf}</span>
            </div>
          </div>
        </div>`,
        showConfirmButton: true,
        showDenyButton: true,
        denyButtonText: 'Cancelar',
        confirmButtonText: 'Remover'
      })
      if (result.isConfirmed && student?.id) {
        const res = await service.deleteStudent(student.id)
        if (res.deleteCount > 0) {
          swal.success(`${res.deleteCount} Estudante Removido com sucesso!`)
        }
        loadStudentsWithFilters()
      }
    }

    function loadStudentsWithFilters() {
      const queryParams = {
        page: page.value,
        limit: limit.value,
        search: search.value,
        orderBy: orderBy.value,
        desc: desc.value
      }
      store.dispatch('getStudents', queryParams)
    }

    function toFirstPage() {
      page.value = 0
      loadStudentsWithFilters()
    }
    function toLastPage() {
      page.value = students.value.length
      loadStudentsWithFilters()
    }
    function changePage(value: number) {
      page.value = value
      loadStudentsWithFilters()
    }

    function sortBy(field: string) {
      if (orderBy.value === field) {
        if (desc.value) {
          orderBy.value = ''
          desc.value = false
        } else {
          desc.value = !desc.value
        }
      } else {
        orderBy.value = field
        desc.value = false
      }
      loadStudentsWithFilters()
    }

    function toEdit(student: StudentModel): void {
      router.push({ name: 'FormsId', params: { id: student.id } })
    }

    const debouncedSearch = _.debounce(loadStudentsWithFilters, 400)

    loadStudentsWithFilters()

    return {
      page,
      limit,
      search,
      orderBy,
      desc,
      students,
      loadStudentsWithFilters,
      toFirstPage,
      toLastPage,
      changePage,
      deleteStudent,
      debouncedSearch,
      sortBy,
      toEdit,
      mask
    }
  }
}
</script>

<template>
  <div>
    <div class="flex flex-wrap justify-between items">
      <h3 class="text-3xl font-medium text-gray-700">Listagem de Alunos</h3>
    </div>

    <div class="mt-4">
      <div class="flex flex-wrap -mx-6">
        <div class="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3">
          <div
            class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
            <div class="p-3 bg-blue-600 bg-opacity-75 rounded-full">
              <i class="fa-solid fa-users text-white text-2xl"></i>
            </div>

            <div class="mx-5">
              <h4 class="text-2xl font-semibold text-gray-700">
                {{ students.length }}
              </h4>
              <div class="text-gray-500">
                {{ students.length > 1 ? 'Alunos' : 'Aluno' }}
              </div>
            </div>
          </div>
        </div>
        <div class="flex w-full justify-between items-center px-2 mt-4 pe-6">
          <div class="relative mx-4 lg:mx-0">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                class="w-5 h-5 text-gray-500"
                viewBox="0 0 24 24"
                fill="none">
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </span>

            <input
              v-model="search"
              @input="debouncedSearch"
              class="w-full pl-10 pr-4 border-gray-200 rounded-md sm:w-64 focus:border-blue-600 focus:ring focus:ring-opacity-40 focus:ring-blue-500"
              type="text"
              placeholder="Digite sua Busca..." />
          </div>

          <router-link to="/forms" class="btn btn-primary">
            Cadastrar Aluno
          </router-link>
        </div>
      </div>
    </div>

    <div class="hidden md:flex flex-col mt-4">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div
          class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
          <v-table>
            <thead>
              <tr>
                <th class="text-center">
                  Registro Acadêmico
                  <i
                    @click="sortBy('id')"
                    :class="{
                      'hover:bg-gray-200 cursor-pointer ms-1 p-1.5 rounded-md ': true,
                      'fa-solid fa-arrow-right-arrow-left rotate-90':
                        orderBy !== 'id',
                      'fa-solid fa-arrow-down-9-1': orderBy === 'id' && !desc,
                      'fa-solid fa-arrow-up-9-1': orderBy === 'id' && desc
                    }"></i>
                </th>
                <th class="text-center">
                  Nome
                  <i
                    @click="sortBy('name')"
                    :class="{
                      'hover:bg-gray-200 cursor-pointer ms-1 p-1.5 rounded-md ': true,
                      'fa-solid fa-arrow-right-arrow-left rotate-90':
                        orderBy !== 'name',
                      'fa-solid fa-arrow-down-a-z': orderBy === 'name' && !desc,
                      'fa-solid fa-arrow-up-a-z': orderBy === 'name' && desc
                    }"></i>
                </th>
                <th class="text-center">
                  CPF
                  <i
                    @click="sortBy('cpf')"
                    :class="{
                      'hover:bg-gray-200 cursor-pointer ms-1 p-1.5 rounded-md ': true,
                      'fa-solid fa-arrow-right-arrow-left rotate-90':
                        orderBy !== 'cpf',
                      'fa-solid fa-arrow-down-9-1': orderBy === 'cpf' && !desc,
                      'fa-solid fa-arrow-up-9-1': orderBy === 'cpf' && desc
                    }"></i>
                </th>
                <th class="text-end">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in students.data" :key="item.id">
                <td class="text-center">{{ item.id }}</td>
                <td class="text-center">{{ item.name }}</td>
                <td class="text-center">{{ mask.masked(item.cpf) }}</td>
                <td class="text-end">
                  <button @click="toEdit(item)" class="btn btn-primary me-2">
                    Editar
                  </button>

                  <button @click="deleteStudent(item)" class="btn btn-danger">
                    Excluir
                  </button>
                </td>
              </tr>
              <tr
                v-if="!students.data.length"
                class="bg-white border-b dark:bg-night-800 dark:border-night-700">
                <td colspan="4" class="w-full pb-3">
                  <div class="flex justify-center">
                    <div class="w-fit">
                      <img
                        src="../assets/5.png"
                        class="max-w-[400px]"
                        alt="nada por aqui" />
                      <div
                        class="text-2xl font-semibold dark:text-white mb-4 text-center">
                        Ops, nada por aqui
                      </div>
                      <div class="dark:text-white text-center">
                        Tente procurar alguma palavra chave ou crie algo novo
                      </div>
                    </div>
                  </div>
                </td>
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
                        @change="loadStudentsWithFilters"
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
    <div class="md:hidden">
      <v-card
        v-for="item in students.data"
        :key="item.id"
        class="card my-6 neon-night-300 py-3 rounded-md">
        <ul class="ul-table">
          <li
            class="p-2 px-3 border-b border-b-night-300 dark:border-b-night-600">
            <div class="flex justify-between itens-center" style="height: auto">
              <span
                class="card-title font-semibold text-night-800 dark:text-night-100">
                RA:
              </span>
              <span
                class="first-uppercase text-night-800 dark:text-night-100 font-medium hover:text-primary-600 mb-1">
                {{ item.id }}
              </span>
            </div>
          </li>

          <li
            class="p-2 px-3 border-b border-b-night-300 dark:border-b-night-600">
            <div class="flex justify-between itens-center" style="height: auto">
              <span
                class="card-title font-semibold text-night-800 dark:text-night-100">
                Nome:
              </span>
              <span
                class="first-uppercase text-night-800 dark:text-night-100 font-medium hover:text-primary-600 mb-1">
                {{ item.name }}
              </span>
            </div>
          </li>

          <li
            class="p-2 px-3 border-b border-b-night-300 dark:border-b-night-600">
            <div class="flex justify-between itens-center" style="height: auto">
              <span
                class="card-title font-semibold text-night-800 dark:text-night-100">
                CPF:
              </span>
              <span
                class="first-uppercase text-night-800 dark:text-night-100 font-medium hover:text-primary-600 mb-1">
                {{ mask.masked(item.cpf) }}
              </span>
            </div>
          </li>

          <li class="py-1 pt-2 px-3 flex justify-center items-center">
            <button @click="toEdit(item)" class="btn btn-primary me-2">
              Editar
            </button>

            <button @click="deleteStudent(item)" class="btn btn-danger">
              Excluir
            </button>
          </li>
        </ul>
      </v-card>

      <v-card
        class="bg-white dark:bg-gray-800 dark:border-gray-700 mb-1 flex space-y-3 flex-col md:flex-row justify-between items-center px-6 rounded-md">
        <div class="dark:text-gray-100 flex items-center gap-3 mt-2">
          itens por página
          <select
            type="number"
            @change="loadStudentsWithFilters"
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
          {{ students.page * students.limit + (students.length > 0 ? 1 : 0) }}
          a
          {{
            students.length < 1
              ? 0
              : (students.page + 1) * students.limit > students.length
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
            <i class="fa-solid fa-angles-right text-primary-600"></i>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>
