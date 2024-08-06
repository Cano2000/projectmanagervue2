<template>  
    <div :class="{ 'is-collapsed': sidebarStorage.isCollapsed }" class="hello">
    <v-data-table :headers="headers" :items="projects" :sort-by="[{ key: 'id', order: 'asc' }]">
    <template v-slot:top>
        <v-toolbar flat>
        <v-btn class="mb-2" color="primary" dark @click="dialog = true">Nuevo Proyecto</v-btn>
        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
            <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                <v-row>
                    <v-col cols="12" md="12" sm="12" v-for="field in fields" :key="field.key">
                    <v-text-field v-model="editedItem[field.key]" :label="field.label"></v-text-field>
                    </v-col>
                </v-row>
                <!-- <v-select
                    :items="items"
                    label="Select an option"
                    v-model="selectedItem"
                ></v-select> -->
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
        </v-toolbar>
    </template>
    <!-- eslint-disable-next-line vue/valid-v-slot -->
    <template v-slot:item.actions="{ item }">
        <v-icon class="me-2" size="small" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon size="small" @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
    </v-data-table>
    </div>
</template>

<script setup>
import { useSidebarStore } from '@/store/sidebarStore';
import { useProjectStore } from '@/store/projectStore';

const projectStore = useProjectStore()

import { ref, reactive, computed, watch, nextTick, onMounted } from 'vue';

onMounted(async () => {
    console.log(headers.value)
    const response = await projectStore.getProjects()

    response.data.forEach(async element => {
        await projects.value.push(element)
    });
})

// const items = ref(['Option 1', 'Option 2', 'Option 3']);
// const selectedItem = ref(null);

const sidebarStorage = useSidebarStore()
const dialog = ref(false);
const dialogDelete = ref(false);
const editedIndex = ref(-1);
const fields = [
  { key: 'name', label: 'Project Name' },
  { key: 'description', label: 'Description' },
];

const editedItem = reactive({
  name: '', description: ""
});

const defaultItem = {
  name: '', description: ""
};

const headers = ref([
    { title: 'Id del Proyecto', value: 'id', sortable: true },
    { title: 'Nombre del Proyecto', value: 'name', sortable: true },
    { title: 'Descripción', value: 'description', sortable: true },
    { title: 'Creado el', value: 'created_at', sortable: true },
    { title: 'Acciones', value: 'actions', sortable: false }
]);

const projects = ref([]);

const formTitle = computed(() => editedIndex.value === -1 ? 'Nuevo Proyecto' : 'Editar Proyecto');

watch(dialog, (newValue) => { if (!newValue) close(); });
watch(dialogDelete, (newValue) => { if (!newValue) closeDelete(); });

async function initialize() {
    const response = await projectStore.getProjects()
    projects.value = []
    response.data.forEach(async element => {
        await projects.value.push(element)
    });
}

function editItem(item) {
  editedIndex.value = projects.value.indexOf(item);
  Object.assign(editedItem, item);
  dialog.value = true;
}

function deleteItem(item) {
  editedIndex.value = projects.value.indexOf(item);
  dialogDelete.value = true;
  deleteItemConfirm()
}

function deleteItemConfirm() {
  projects.value.splice(editedIndex.value, 1);
  closeDelete();
}

function close() {
  dialog.value = false;
  nextTick(() => {
    Object.assign(editedItem, defaultItem);
    editedIndex.value = -1;
  });
}

function closeDelete() {
  dialogDelete.value = false;
  nextTick(() => {
    Object.assign(editedItem, defaultItem);
    editedIndex.value = -1;
  });
}

async function save() {
  if (editedIndex.value > -1) {
    //editar
    Object.assign(projects.value[editedIndex.value], editedItem);
  } else {
    //crear nuevo
    await projectStore.createProject(editedItem.name, editedItem.description)
    initialize()
  }
  close();
}
</script>


<style scoped>
.hello {
  transition: margin-left 0.3s;
}

.hello.is-collapsed {
  margin-left: 70px; /* Cuando el sidebar está contraído */
}

.hello {
  margin-left: 250px; /* Cuando el sidebar está expandido */
}


</style>