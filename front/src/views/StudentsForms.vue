<script lang="ts">
import { StudentModel } from '@/model/student.model'
import service from '@/api'
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import swal from '@/swal'
import { Mask } from 'maska'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const itemId = computed(() => route.params.id)
    const mask = new Mask({ mask: '###.###.###-##' })
    if (itemId.value && typeof itemId.value === 'string') {
      getStudent(itemId.value)
    }

    const form = ref<StudentModel>({
      id: undefined,
      name: '',
      email: '',
      cpf: ''
    })

    const errors = computed(() => {
      const errs = []
      if (!form.value.name) errs.push('Name is required.')
      if (!form.value.email) errs.push('Email is required.')
      if (!form.value.cpf) errs.push('CPF is required.')
      return errs
    })

    async function getStudent(id: string): Promise<void> {
      const res = await service.FindStudentById(id)
      if (res) {
        form.value.id = res.id
        form.value.name = res.name
        form.value.cpf = res.cpf
        form.value.email = res.email
      }
    }

    async function onSubmit(): Promise<void> {
      const res = await service.SaveStudent(form.value)
      if (res) {
        await swal.success(
          form.value?.id
            ? 'Estudante atualizado com sucesso'
            : 'Estudante Cadastrado com sucesso'
        )
        router.push({ name: 'Dashboard' })
      }
    }

    function toList(): void {
      router.push({ name: 'Dashboard' })
    }

    return {
      mask,
      itemId,
      form,
      errors,
      onSubmit,
      toList
    }
  }
}
</script>

<template>
  <div>
    <h3 class="text-3xl font-semibold text-gray-700 mb-3">
      {{ form.id ? 'Atualize o perfil do aluno' : 'Cadastro de novo aluno' }}
    </h3>
  </div>

  <v-card variant="tonal" class="p-3">
    <v-form @submit.prevent="onSubmit">
      <div class="flex flex-wrap [&>*]:p-2">
        <div class="w-full">
          <v-text-field
            class="bg-white dark:bg-gray-800"
            variant="outlined"
            v-model="form.name"
            :counter="10"
            label="Nome"
            placeholder="Informe o nome completo"
            hide-details
            required />
        </div>

        <div class="w-full">
          <v-text-field
            class="bg-white dark:bg-gray-800"
            variant="outlined"
            v-model="form.email"
            label="E-mail"
            placeholder="Informe apenas um e-mail"
            hide-details
            required />
        </div>

        <div class="w-full">
          <v-text-field
            class="bg-white dark:bg-gray-800"
            variant="outlined"
            v-model="form.id"
            :counter="10"
            label="RA"
            placeholder="RA será gerado altomaticamente"
            hide-details
            disabled
            required />
        </div>

        <div class="w-full">
          <v-text-field
            class="bg-white dark:bg-gray-800"
            variant="outlined"
            :model-value="mask.masked(form.cpf)"
            @update:model-value="value => (form.cpf = mask.unmasked(value))"
            :counter="10"
            label="CPF"
            maxLength="14"
            placeholder="Informe o numero do documento"
            hide-details
            :disabled="!!form.id"
            required />
        </div>

        <div class="w-full gap-2 flex items-center justify-end">
          <button type="button" @click="toList" class="btn">Cancelar</button>
          <button type="submit" class="btn btn-primary">Salvar</button>
        </div>
      </div>
    </v-form>
  </v-card>
</template>
