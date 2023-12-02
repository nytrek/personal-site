<script setup lang="ts">
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LineElement,
  LinearScale,
  PointElement,
} from "chart.js";
import { format, formatDistanceToNow } from "date-fns";
import { Line } from "vue-chartjs";

ChartJS.register(Filler, CategoryScale, LinearScale, PointElement, LineElement);

const yAxis = ref<number | null>(null);

const { data: lichess } = await useFetch("/api/lichess");
const { data: toggl } = await useFetch("/api/toggl");
const { data: github } = await useFetch("/api/github");
const { data: steps } = await useFetch("/api/steps");
const { data: notion } = await useFetch("/api/notion");

const articles = await queryContent().limit(5).find();

/**
 * @see https://stackoverflow.com/questions/70112637/draw-a-horizontal-and-vertical-line-on-mouse-hover-in-chart-js
 */
const plugins = [
  {
    id: "corsair",
    afterInit: (chart: any) => {
      chart.corsair = {
        x: 0,
        y: 0,
      };
    },
    afterEvent: (chart: any, evt: any) => {
      const {
        chartArea: { top, bottom, left, right },
      } = chart;
      const {
        event: { x, y },
      } = evt;
      const value = Math.ceil(chart.scales.y.getValueForPixel(y));
      if (x < left || x > right || y < top || y > bottom) {
        chart.corsair = {
          x,
          y,
          draw: false,
        };
        chart.draw();
        yAxis.value = null;
        return;
      }

      chart.corsair = {
        x,
        y,
        draw: true,
      };

      chart.draw();

      yAxis.value = value;
    },
    afterDatasetsDraw: (chart: any, _: any, opts: any) => {
      const {
        ctx,
        chartArea: { top, bottom },
      } = chart;
      const { x, draw } = chart.corsair;

      if (!draw) {
        return;
      }

      ctx.lineWidth = opts.width || 0;
      ctx.setLineDash(opts.dash || []);
      ctx.strokeStyle = "gray";

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, bottom);
      ctx.lineTo(x, top);
      ctx.stroke();
      ctx.restore();
    },
  },
];

/**
 * @see https://stackoverflow.com/questions/70073007/chartjs-backgroundcolor-for-line-chart-does-not-appear-in-vue-app
 */
const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Steps",
      borderColor: "rgba(64, 196, 99, 0.25)",
      backgroundColor: "rgba(64, 196, 99, 0.25)",
      fill: true,
      data: (JSON.parse(steps.value as string) as number[]) ?? [
        0, 0, 0, 0, 0, 0, 0,
      ],
    },
  ],
};

/**
 * @see https://stackoverflow.com/questions/34403510/chart-js-straight-lines-instead-of-curves
 * @see https://stackoverflow.com/questions/39544767/how-can-i-show-dotted-gridlines-with-chartjs
 */
const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        color: "gray",
      },
      border: {
        dash: [2, 4],
      },
    },
  },
  elements: {
    line: {
      tension: 0.4,
    },
  },
};

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
  <main class="flex flex-col gap-y-6">
    <section class="flex flex-col gap-y-4">
      <h2 class="text-2xl font-semibold">Summary</h2>
      <p>
        Hey 👋 I'm Kenny, a creative mind navigating the digital realms as a
        frontend developer. My journey is fueled by a genuine passion for
        sculpting seamless and captivating digital experiences that resonate
        with users.
      </p>
    </section>
    <section class="flex flex-col gap-y-6">
      <h2 class="text-2xl font-semibold">Profile</h2>
      <div
        class="flex gap-6 overflow-x-auto p-0.5 sm:grid sm:grid-cols-2 lg:grid-cols-3"
      >
        <NuxtLink href="https://lichess.org/@/nytrek">
          <UCard
            class="h-52 w-72 border border-transparent transition duration-300 hover:border-gray-600 dark:hover:border-gray-300 sm:h-full sm:w-full"
          >
            <div class="mb-4 flex items-start justify-between">
              <UIcon class="text-2xl" dynamic name="i-simple-icons-lichess" />
              <UBadge color="white" variant="solid">Chess</UBadge>
            </div>
            <div class="flex flex-col gap-y-1.5">
              <span>Games: {{ lichess?.games }}</span>
              <span>Rating: {{ lichess?.rating }}</span>
              <span>Rating deviation: {{ lichess?.rd }} </span>
            </div>
          </UCard>
        </NuxtLink>
        <div>
          <UCard
            class="h-52 w-72 border border-transparent transition duration-300 hover:border-gray-600 dark:hover:border-gray-300 sm:h-full sm:w-full"
          >
            <div class="mb-4 flex items-start justify-between">
              <UIcon class="text-2xl" dynamic name="i-ph-activity-light" />
              <UBadge color="white" variant="solid">Latest activity</UBadge>
            </div>
            <div class="flex flex-col gap-y-1.5">
              <span>{{ toggl?.description ?? "Inactive" }}</span>
              <span v-if="toggl">
                Started
                {{
                  formatDistanceToNow(new Date(toggl?.start), {
                    addSuffix: true,
                  })
                }}
              </span>
              <span v-else>N/A</span>
            </div>
          </UCard>
        </div>
        <NuxtLink href="https://github.com/nytrek">
          <UCard
            class="h-52 w-72 border border-transparent transition duration-300 hover:border-gray-600 dark:hover:border-gray-300 sm:h-full sm:w-full"
          >
            <div class="mb-4 flex items-start justify-between">
              <UIcon class="text-2xl" dynamic name="i-uit-github-alt" />
              <UBadge color="white" variant="solid"
                >{{ github?.totalContributions ?? 0 }} Contributions</UBadge
              >
            </div>
            <div class="flex gap-0.5 overflow-x-auto rounded-md">
              <div
                v-for="(item, index) in github?.weeks"
                :key="index"
                class="flex flex-col gap-0.5"
              >
                <div
                  v-for="day in item.contributionDays"
                  class="h-3.5 w-3.5 rounded-sm"
                  :style="{ backgroundColor: day.color }"
                ></div>
              </div>
            </div>
          </UCard>
        </NuxtLink>
        <NuxtLink href="https://www.upwork.com/freelancers/~019a5657f93b409619">
          <UCard
            class="h-52 w-72 border border-transparent transition duration-300 hover:border-gray-600 dark:hover:border-gray-300 sm:h-full sm:w-full"
          >
            <div class="mb-6 flex items-start justify-between">
              <UIcon class="text-2xl" dynamic name="i-heroicons-user" />
              <UBadge color="white" variant="solid">Review</UBadge>
            </div>
            <div class="mb-1.5 flex gap-x-0.5">
              <UIcon
                class="text-lg"
                dynamic
                name="i-material-symbols-kid-star"
                v-for="(_, index) in Array.from(Array(5))"
                :key="index"
              />
            </div>
            <span class="text-sm">
              Kenny deserves to be at the top of Upwork. We are lucky to work
              with him.
              <br /><br />
              - Upwork client
            </span>
          </UCard>
        </NuxtLink>
        <div>
          <UCard
            class="h-52 w-72 border border-transparent transition duration-300 hover:border-gray-600 dark:hover:border-gray-300 sm:h-full sm:w-full"
          >
            <div class="mb-4 flex items-start justify-between">
              <UIcon
                class="text-2xl"
                dynamic
                name="i-emojione-monotone-running-shoe"
              />
              <UBadge color="white" variant="solid"
                >{{
                  yAxis ??
                  data.datasets[0].data.reduce((acc, curr) => acc + curr, 0)
                }}
                Steps</UBadge
              >
            </div>
            <div>
              <Line :data="data" :options="options" :plugins="plugins" />
            </div>
          </UCard>
        </div>
        <div>
          <UCard
            class="h-52 w-72 border border-transparent transition duration-300 hover:border-gray-600 dark:hover:border-gray-300 sm:h-full sm:w-full"
          >
            <div class="mb-4 flex items-start justify-between">
              <UIcon class="text-3xl" dynamic name="i-lets-icons-status" />
              <UBadge color="white" variant="solid">Open for work</UBadge>
            </div>
            <div class="flex flex-col gap-y-3 text-sm">
              <span>
                Currently on the lookout for new opportunities to bring my
                skills to your team. Let's chat and make some magic happen!
              </span>
              <NuxtLink
                class="underline decoration-dotted"
                href="mailto:kennytran.dev@outlook.com"
                >Send email</NuxtLink
              >
            </div>
          </UCard>
        </div>
      </div>
    </section>
    <section class="flex flex-col gap-y-6 text-sm">
      <h2 class="text-2xl font-semibold">Featured project</h2>
      <NuxtLink href="https://www.bostadsval.se/">
        <UCard
          class="border border-transparent transition duration-300 hover:border-gray-600 dark:hover:border-gray-300"
        >
          <NuxtImg
            alt="mockup"
            class="w-full rounded-lg"
            src="https://raw.githubusercontent.com/nytrek/personal-site/main/public/mockup.png"
          />
        </UCard>
      </NuxtLink>
    </section>
    <section class="flex flex-col gap-y-6 text-sm">
      <h2 class="text-2xl font-semibold">Tech stack</h2>
      <div
        class="flex gap-6 overflow-x-auto p-0.5 sm:grid sm:grid-cols-2 lg:grid-cols-3"
      >
        <div v-for="(item, index) in notion" :key="index">
          <UCard
            class="h-auto w-52 border border-transparent transition duration-300 hover:border-gray-600 dark:hover:border-gray-300 sm:h-full sm:w-full"
          >
            <div class="mb-4 flex items-start justify-between">
              <NuxtImg
                alt="logo"
                class="h-4 w-4"
                :src="item.icon.external?.url ?? item.icon.file?.url"
              />
              <UBadge color="white" variant="solid">{{
                item.properties.Tags["multi_select"][0].name
              }}</UBadge>
            </div>
            <span>{{ item.properties.Name.title[0].text.content }}</span>
          </UCard>
        </div>
      </div>
    </section>
    <section class="flex flex-col gap-y-10 text-sm">
      <h2 class="text-2xl font-semibold">Leetcode</h2>
      <article
        class="flex items-center gap-x-2 overflow-x-auto whitespace-nowrap"
        v-for="(item, index) in articles
          .slice()
          .sort((a, b) => (a.index < b.index ? -1 : 1))"
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
      <NuxtLink
        class="flex items-center gap-x-0.5 underline decoration-dotted"
        href="/solutions"
      >
        <span>All solutions</span>
        <UIcon
          class="text-2xl"
          dynamic
          name="i-material-symbols-light-arrow-right-alt"
        />
      </NuxtLink>
    </section>
  </main>
</template>
