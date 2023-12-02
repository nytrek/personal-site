<script setup lang="ts">
const route = useRoute();
const article = await queryContent()
  .where({
    _path: route.path as string,
  })
  .find();
const links = [
  {
    label: "Home",
    icon: "i-heroicons-home",
    to: "/",
  },
  {
    label: "Solutions",
    icon: "i-heroicons-squares-2x2",
    to: "/solutions",
  },
  {
    label: article[0]?.title ?? (route.params.slug as string),
    icon: "i-heroicons-link",
    to: route.path,
  },
];
</script>

<template>
  <main class="space-y-10">
    <UBreadcrumb :links="links" class="overflow-x-auto whitespace-nowrap" />
    <ContentDoc class="prose max-w-none overflow-x-auto">
      <template #not-found>
        <h1>Solution not found</h1>
      </template>
    </ContentDoc>
  </main>
</template>
