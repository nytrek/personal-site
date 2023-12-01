<script setup lang="ts">
/**
 * @see https://stackoverflow.com/questions/73866334/how-to-add-canonical-url-in-nuxt3
 */
const route = useRoute();
useHead(() => ({
  link: [
    {
      rel: "canonical",
      href: "https://nytrek.dev" + route.path,
    },
  ],
  htmlAttrs: {
    lang: "en",
  },
}));
</script>

<template>
  <Head>
    <Title>Kenny Tran</Title>
    <Meta content="noindex,nofollow" name="robots" />
    <Meta
      name="description"
      content="I'm Kenny, a frontend developer with a passion for crafting seamless digital experiences."
    />
  </Head>
  <UContainer>
    <UCard class="my-10">
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-x-3">
            <UAvatar
              src="https://avatars.githubusercontent.com/u/82717216?v=4"
              alt="Avatar"
            />
            <h1 class="leading-none">Kenny Tran</h1>
          </div>
        </div>
      </template>
      <NuxtPage />
    </UCard>
  </UContainer>
</template>
