<template>
    <div class="container mt-5">
        <div class="card border-primary">
            <div class="card-body">
                <h4 class="card-title">Todo</h4>
                <h1>
                    Hello {{ name }} 👋
                </h1>

                <!-- v-model -->
                 <input v-model="name" type="text" placeholder="Please Enter your text" class="form-control">

                <!--- v-if/v-else -->
                <p v-if="name" class="mt-2 text-green-600">
                    Welcome, {{ name }},
                </p>
                <p v-else class="mt-2 text-gray-600">
                    Please enter your name above
                </p>

                <h3 class="mt-6 text-xl font-semibold text-primary"><strong><u>MY TODO LIST</u></strong></h3>
                <div class="row "  v-for="(todo , index) in todos" :key="index"   >
                    <div class="col-md-1">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault_{{ index }}"  v-model="todo.done">
                        </div>
                    </div>
                    <div class="col-md-11">
                        <div class=" items-center gap-2 mt-4 col-md-12">

                            <span :class="todo.done ? 'alert alert-success' : 'alert alert-danger mt-5'">
                                {{ todo.text }}
                            </span>
                            &nbsp;
                            <button @click="removeTask(index)" :class="todo.done ? 'btn btn-danger btn-sm' : 'btn btn-danger btn-sm disabled'">Remove task </button>
                        </div>
                    </div>
                </div>

                <h3 class="mt-5 text-xl font-semibold text-primary"><strong><u>ADD NEW TASK</u></strong></h3>
                <div class="row">
                    <div class="col-md-8">
                        <input type="text" class="form-control" v-model="newTodo" placeholder="Please enter a new task">
                    </div>
                    <div class="col-md-4">
                        <button @click="addNewTask" class="btn btn-success btn-sm">ADD NEW TASK</button>&nbsp;&nbsp;
                        <button @click="clearAllTasks" class="btn btn-danger btn-sm">CLEAR ALL TASKS</button>

                    </div>

                    <div class="mt-4 col-md-12 alert alert-warning">
                        Completed Tasks : {{ completedcount }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

    import { ref, computed } from 'vue'

    const name = ref('');
    const newTodo = ref('');
    const todos = ref([
        { text:  'Arrive office at 10:00 AM', done: true },
        { text : 'Import data to new Database', done : false },
        { text : 'Contact Us Form', done : true },
    ]);

    function addNewTask() {
        if (newTodo.value.trim()) {
            todos.value.push({ 'text': newTodo.value, done: false });
            newTodo.value = "";
        }
    }

    function removeTask(index) {
        todos.value.splice(index, 1);
    }


    function clearAllTasks() {
        todos.value = [];
    }

    //Computed
    const completedcount = computed(() =>
        todos.value.filter(todo => todo.done).length
    )

</script>
