<template>
    <form @submit.prevent="submitForm" class="mt-6">
        <div class="row">
            <div class="col-md-5">
                <label class="block font-semibold">Task Title</label>
                <input v-model="form.title" type="text" class="border p-2 w-full form-control" />
                <p v-if="errors.title" class=" text-sm text-danger">
                    {{ errors.title }}
                </p>
            </div>
            <div class="col-md-5">
                <label class="block font-semibold">Priority</label>
                <select v-model="form.done" class="form-control">
                    <option :value="null">Please Select</option>
                    <option :value="false">Pending</option>
                    <option :value="true">Success</option>
                </select>
                <p v-if="errors.done" class=" text-sm text-danger">
                    {{ errors.done }}
                </p>
            </div>
            <div class="col-md-2">
                <button class="btn btn-success mt-3 px-4 py-1 bg-blue-500 text-white rounded"> Submit </button>
            </div>
        </div>
    </form>
</template>



<script setup>

    import { reactive } from 'vue'

    const emit = defineEmits(['add'])


    const form = reactive({
        title: '',
        done: null
    })

    const errors = reactive({})

    function submitForm() {
        errors.title = ""
        errors.done = null

        if (!form.title.trim()) {
            errors.title = "Title is required"
            return
        }

        if (form.done === null) {
            errors.done = "Priority is required"
            return
        }

         emit('add', {
            text: form.title,
            done: form.done
        })

        form.title = ""
        form.done = null
    }

</script>
