<!-- src/App.vue -->
<template>
  <div class="container mx-auto max-w-2xl p-4">
    <AppNavbar />
    <FilterTabs :active-filter="currentFilter" @change-filter="setFilter" />
    <ItemForm :initial-data="editingItem" @submit="handleSubmit" />
    <keep-alive>
      <component :is="currentView" :items="filteredItems" @toggle="toggleItem" @edit="startEditing" @delete="deleteItem">
        <template #default>
          <h2 class="text-2xl font-bold mb-4">Danh sách Mua sắm</h2>
        </template>
        <template #empty>
          <p class="text-gray-500 text-center">Không có mặt hàng nào trong danh sách</p>
        </template>
      </component>
    </keep-alive>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';
import Navbar from './components/Navbar.vue';
import ItemForm from './components/ItemForm.vue';
import ItemList from './components/ItemList.vue';
import FilterTabs from './components/FilterTabs.vue';

export default {
  name: 'App',
  components: { Navbar, ItemForm, ItemList, FilterTabs },
  setup() {
    const items = ref([]);
    const currentFilter = ref('all');
    const editingItem = ref(null);
    const currentView = ref('ItemList');

    const filteredItems = computed(() => {
      if (currentFilter.value === 'purchased') {
        return items.value.filter(item => item.purchased);
      } else if (currentFilter.value === 'not-purchased') {
        return items.value.filter(item => !item.purchased);
      }
      return items.value;
    });

    const setFilter = (filter) => {
      currentFilter.value = filter;
    };

    const handleSubmit = (itemData) => {
      if (editingItem.value) {
        const index = items.value.findIndex(item => item.id === editingItem.value.id);
        if (index !== -1) {
          items.value[index] = { ...itemData, id: editingItem.value.id, purchased: items.value[index].purchased };
        }
        editingItem.value = null;
      } else {
        items.value.push({ ...itemData, id: Date.now(), purchased: false });
      }
    };

    const toggleItem = (id) => {
      const item = items.value.find(item => item.id === id);
      if (item) {
        item.purchased = !item.purchased;
      }
    };

    const startEditing = (item) => {
      editingItem.value = { ...item };
    };

    const deleteItem = (id) => {
      items.value = items.value.filter(item => item.id !== id);
    };

    watch(items, (newItems) => {
      localStorage.setItem('shoppingList', JSON.stringify(newItems));
    }, { deep: true });

    onMounted(() => {
      const savedItems = localStorage.getItem('shoppingList');
      if (savedItems) {
        items.value = JSON.parse(savedItems);
      }
    });

    return {
      items,
      currentFilter,
      editingItem,
      currentView,
      filteredItems,
      setFilter,
      handleSubmit,
      toggleItem,
      startEditing,
      deleteItem,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
}
</style>