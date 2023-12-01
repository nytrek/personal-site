<script setup lang="ts">
import { format } from "date-fns";
const articles = await queryContent().find();
</script>

<template>
  <main class="space-y-10">
    <NuxtLink href="/">
      <UIcon
        class="text-2xl"
        dynamic
        name="i-material-symbols-arrow-left-alt-rounded"
      />
    </NuxtLink>
    <section class="mt-12 flex flex-col gap-y-10 text-sm">
      <h2 class="text-2xl font-semibold">Leetcode</h2>
      <article
        class="flex items-center gap-x-2 whitespace-nowrap"
        v-for="(item, index) in articles"
        :key="index"
      >
        <NuxtLink :to="item._path">
          <h3 class="font-medium">{{ item.title }}</h3>
        </NuxtLink>
        <p class="text-gray-500 dark:text-gray-400">
          {{ item.description }}
        </p>
        <hr class="w-full border-dashed border-gray-300 dark:border-gray-600" />
        <time :datetime="item.date">{{
          format(new Date(item.date), "MMM dd, yyyy")
        }}</time>
      </article>
    </section>
  </main>
</template>
