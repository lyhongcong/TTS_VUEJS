<!-- src/components/ShoppingItemList.vue -->
<template>
  <div>
    <slot name="default"></slot>
    <div v-if="items.length">
      <ShoppingItem
        v-for="item in items"
        :key="item.id"
        :item="item"
        @toggle="$emit('toggle', $event)"
        @edit="$emit('edit', $event)"
        @delete="$emit('delete', $event)"
      />
    </div>
    <slot v-else name="empty"></slot>
  </div>
</template>

<script>
import ShoppingItem from './Item.vue';

export default {
  name: 'ItemList',
  components: { ShoppingItem },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  emits: ['toggle', 'edit', 'delete'],
};
</script>