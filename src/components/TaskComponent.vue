<template>
  <div :class="{ 'is-collapsed': sidebarStorage.isCollapsed }" class="hello">
    <LoadingComponent v-if="notification.show" :is-loading="notification.isLoading" :is-error="notification.isError" :is-success="notification.isSuccess" :message="notification.message"/>
    <div class="container">
      <v-btn class="mb-2" color="primary" dark @click="dialog = true">Nuevo Tarea</v-btn>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            Creación nueva tarea
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" md="12" sm="12" v-for="field in fields" :key="field.key">
                  <v-text-field v-model="editedItem[field.key]" :label="field.label"></v-text-field>
                </v-col>
                <v-col cols="12" md="12" sm="12">
                  <v-select
                  :items="selectableColumns"
                  label="Estado"
                  v-model="editedItem.statusId"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="closeDialog">Cerrar</v-btn>
            <v-btn text @click="saveNewTask">Crear</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div v-if="dataLoaded" class="container">
      <!-- Iteramos sobre cada lista en nuestras listas -->
      <div v-for="(list, index) in columns" :key="'list-' + index" class="list-container" >
        <h3>{{ list.name }}</h3>
          <draggable class="draggable-list" v-model="list.items" group="shared" @end="onDragEnd" item-key="item" :data-column-id="list.id">
          <template #item="{ element }">
            <div class="draggable-item">
              <v-btn @click.stop="element.showDialog = true" class="buttonTask">
                {{ element.title }}
              </v-btn>

              <v-dialog v-model="element.showDialog" max-width="800px">
                <v-card>
                  <v-card-title class="d-flex align-items-center justify-content-space-between">
                    Detalles de {{ element.title }}
                    <v-spacer></v-spacer>
                    <v-icon size="small" @click="toggleCommentBox">mdi-forum-plus</v-icon>
                    <v-icon size="small" @click="deleteItem(element)">mdi-delete</v-icon>
                  </v-card-title>
                  <v-card-text>
                    {{ element.description }}
                    <div class="comments-container">
                      <div v-for="comment in element.comments" :key="comment.id" class="comment-bubble">
                        <v-avatar size="32" class="user-avatar">
                          <img src="https://assets.garmoth.com/classes/100/0.webp" alt="User avatar"
                          v-tooltip.bottom="comment.user.name" width="32" height="32">
                        </v-avatar>
                        <div class="text-content preserve-whitespace">
                          {{ comment.text }}
                        </div>
                      </div>
                    </div>
                    <v-textarea
                      v-if="showCommentBox"
                      v-model="newComment"
                      label="Añadir comentario"
                      hint="Escribe tu comentario aquí"
                      persistent-hint
                      auto-grow
                    ></v-textarea>
                    <v-btn
                      v-if="showCommentBox"
                      color="primary"
                      class="mt-2"
                      @click="saveComment(element)"
                    >Guardar Comentario</v-btn>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="element.showDialog = false">Close</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </template>
          
        </draggable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useSidebarStore } from '@/store/sidebarStore';
import draggable from 'vuedraggable';
import { useStatusStore } from '@/store/statusStore'
import { usetaskStore } from '@/store/tasksStore'
import { useCommentStore } from '@/store/commentStore'
import { useRoute } from "vue-router"
import LoadingComponent from './LoadingComponent.vue';

const statusStore = useStatusStore()
const taskStore = usetaskStore()
const sidebarStorage = useSidebarStore()
const CommentStore = useCommentStore()
const route = useRoute()

const columns = ref([])

const dialog = ref(false)
const dataLoaded = ref(false)
const showCommentBox = ref(false)
const newComment = ref("")
const projectId = route.params.id

const notification = ref({
  show: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ''
});

const fields = [
  { key: 'title', label: 'Nombre de Tarea' },
  { key: 'description', label: 'Description' },
];

const editedItem = ref({
  title: '', description: "", statusId: ""
});

// const defaultItem = {
//   title: '', description: ""
// };
// const lists = ref([
//   { items: [{ name: 'Item 1', showDialog: false }, { name: 'Item 4', showDialog: false }] },
//   { items: [{ name: 'Item 2', showDialog: false }] },
//   { items: [{ name: 'Item 3', showDialog: false }] },
//   { items: [{ name: 'Item 5', showDialog: false }] }
// ]);

const initializeColumns = () => {
  columns.value = statusStore.statuses.map(status => ({
    name: status.name,
    id: status.id,
    items: [] // Inicialmente vacío, luego puedes llenar esto con tareas reales
    // items: [{name: 'Item 1', showDialog: false }] // Inicialmente vacío, luego puedes llenar esto con tareas reales
  }));
  dataLoaded.value = true;
};

const toggleCommentBox = () => {
  showCommentBox.value = !showCommentBox.value;
}

const closeDialog = () => {
  dialog.value = false;
  editedItem.value.statusId = null;
};

const saveNewTask = async () => {
  notification.value.show = true
  notification.value.isLoading = true
  const statusId = statusStore.statuses.find(item => item.name === editedItem.value.statusId)
  const newTaskObj = {
    "title": editedItem.value.title,
    "description": editedItem.value.description,
    "statusId": statusId.id,
    "projectId": projectId,
  }
  
  const response = await taskStore.createTask(newTaskObj)
  
  if(response) {
    notification.value = { show: true, isSuccess: true, message: 'Datos guardados correctamente' }
  } else {
    notification.value = { show: true, isError: true, message: 'Error al guardar los datos' };
  }
  setTimeout(async () => {
    notification.value.show = false;
    await fetchTasksForProject(projectId)
  }, 3000);

  dialog.value = false;
  editedItem.value.statusId = null;
  editedItem.value.title = "";
  editedItem.value.description = "";
};

async function fetchTasksForProject(projectId) {
  const response = await taskStore.getTasksByProject(projectId); // Suponiendo que esta función ya existe y obtiene todas las tareas de un proyecto específico
  if (response.success) {
    distributeTasks(response.data);
  }
}

function distributeTasks(tasks) {
  // Asumiendo que 'columns.value' ya está inicializado con los estados
  columns.value.forEach(column => {
    // Filtra las tareas que corresponden a este estado específico
    column.items = tasks.filter(task => task.statusId === column.id);
  });
}

const onDragEnd = async (event) => {
  console.log("has dejado de mover")
  
  const oldIndex = event.oldIndex;
  const newIndex = event.newIndex;

  // Obteniendo IDs de las columnas de origen y destino
  const oldColumnId = event.from.dataset.columnId;
  const newColumnId = event.to.dataset.columnId;
  
  const movedItem = columns.value.find(col => col.id == newColumnId).items[event.newIndex];

  const reorderTaskObj = {
    "taskId": movedItem.id,
    "newOrder": newIndex,
    "oldOrder": oldIndex,
    "oldStatusId": oldColumnId,
    "newStatusId": newColumnId
}

  await taskStore.reorderTasks(reorderTaskObj);
};

const deleteItem = async (element) => {
  // element.showDialog = false
  notification.value.show = true
  notification.value.isLoading = true
  const response = await taskStore.removeTask(element.id)

  if(response) {
    element.showDialog = false
    notification.value = { show: true, isSuccess: true, message: 'Dato borrado correctamente' }
  } else {
    element.showDialog = false
    notification.value = { show: true, isError: true, message: 'Error al borrar el dato' };
  }
  setTimeout(async () => {
    notification.value.show = false;
    await fetchTasksForProject(projectId)
  }, 3000);

  
}



onMounted(async () => {
  if (statusStore.statuses.length === 0) {
    await statusStore.getStatuses();
  }
  initializeColumns();
  
  await fetchTasksForProject(projectId)
  // Aquí puedes agregar la lógica para obtener tareas para cada estado y llenar las columnas.items
});

const selectableColumns = computed(() => {
  return columns.value.map(col => col.name);
});

const saveComment = async (element) => {
  console.log(newComment.value)
  const idTask = element.id
  const columnWithTask = columns.value.find(column => column.items.some(item => item.id === idTask));
  const newCommentFetch = {
    "text": newComment.value,
    "taskId": idTask,
  }
  await CommentStore.createComment(newCommentFetch)
  console.log(columnWithTask)
  toggleCommentBox()
  await fetchTasksForProject(projectId)
  if (columnWithTask) {
    const task = columnWithTask.items.find(item => item.id === idTask);
    if (task) {
      task.showDialog = true;
      console.log('Task Updated with showDialog:', task);
    }
  } else {
    console.log('Task not found');
  }
}

</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
}

.list-container {
  width: 44%;
  background-color: #333b43;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 2vh;
  color: white;
}

.draggable-list {
  padding: 10px;
  background-color: #1a1e23;
  border: 1px solid #dee2e6;
  min-height: 66vh;
  max-height: 66vh;
  overflow-y: auto;
}

.draggable-item {
  padding: 10px;
  margin-bottom: 4px;
  background-color: #343d49;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hello {
  transition: margin-left 0.3s;
}

.hello.is-collapsed {
  margin-left: 70px; /* Cuando el sidebar está contraído */
}

.hello {
  margin-left: 250px; /* Cuando el sidebar está expandido */
}

.buttonTask{
  width: 100%;
}


.comment-bubble {
  display: flex;
  align-items: center;
  margin: 10px;
  position: relative;
}

.user-avatar {
  margin-right: 10px;
  position: relative;
}

.text-content {
  background-color: #312e2e;
  border-radius: 15px;
  padding: 8px 12px;
  max-width: 90%; 
  word-wrap: break-word;
}

.text-content::before {
  content: '';
  position: absolute;
  top: 50%;
  left: -10px; /* Ajusta según la posición del avatar */
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-right-color: #f4f4f4; /* Mismo color de fondo del bocadillo */
  border-left: 0;
  margin-top: -10px;
  transform: translateX(-100%);
}

.comments-container {
  max-height: 400px; 
  overflow-y: auto;
  overflow-x: hidden;
}

.preserve-whitespace {
    white-space: pre-wrap; /* Preserva los espacios y los saltos de línea, y ajusta las líneas */
}
</style>