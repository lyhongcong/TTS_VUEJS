<template>
  <div class="mt-4">
    <PostItem v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script>
import PostItem from './PostItem.vue';

export default {
  name: 'PostList',
  components: { PostItem },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
};
</script>