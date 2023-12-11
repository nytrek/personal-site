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
    <Meta
      name="description"
      content="I'm Kenny, a frontend developer with a passion for crafting seamless digital experiences."
    />
    <Meta property="og:type" content="website" />
    <Meta property="og:url" content="https://www.nytrek.dev/" />
    <Meta property="og:title" content="Kenny Tran" />
    <Meta
      property="og:description"
      content="I'm Kenny, a frontend developer with a passion for crafting seamless digital experiences."
    />
    <Meta property="og:image" content="https://www.nytrek.dev/preview.png" />
    <Meta property="twitter:card" content="summary_large_image" />
    <Meta property="twitter:url" content="https://www.nytrek.dev/" />
    <Meta property="twitter:title" content="Kenny Tran" />
    <Meta
      property="twitter:description"
      content="I'm Kenny, a frontend developer with a passion for crafting seamless digital experiences."
    />
    <Meta
      property="twitter:image"
      content="https://www.nytrek.dev/preview.png"
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
