<template>
  <div class="container">
    <!-- Iteramos sobre cada lista en nuestras listas -->
    <div v-for="(list, index) in lists" :key="'list-' + index" class="list-container">
      <h3>List {{ index + 1 }}</h3>
      <draggable class="draggable-list" v-model="list.items" group="shared" @end="onDragEnd">
        <template #item="{ element }">
          <div class="draggable-item">
            <v-btn @click.stop="element.showDialog = true">
              {{ element.name }}
            </v-btn>

            <v-dialog v-model="element.showDialog" max-width="500px">
              <v-card>
                <v-card-title>
                  Details for {{ element.name }}
                </v-card-title>
                <v-card-text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text="Close" @click="element.showDialog = false">Close</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  components: {
    draggable,
  },
  data() {
    return {
      lists: [
        { items: [{ name: 'Item 1', showDialog: false }, { name: 'Item 4', showDialog: false }] },
        { items: [{ name: 'Item 2', showDialog: false }] },
        { items: [{ name: 'Item 3', showDialog: false }] },
        { items: [{ name: 'Item 5', showDialog: false }] }
      ],
    };
  },
  methods: {
    onDragEnd() {
      console.log('Drag and drop operation completed.');
    }
  }
}
</script>

<style>
.container {
  display: flex;
  justify-content: space-around;
  padding: 20px;
}

.list-container {
  width: 20%;
  background-color: #e9ecef;
  padding: 10px;
  border-radius: 8px;
}

.draggable-list {
  padding: 10px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  min-height: 100px;
}

.draggable-item {
  padding: 10px;
  margin-bottom: 4px;
  background-color: #f4f4f4;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
}
</style>
