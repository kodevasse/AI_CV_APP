<template>
  <div class="flex flex-col justify-center">
    <div class="flex flex-col justify-center">
      <h1
        class="pt-2 sm:py-2 mx-auto font-extrabold text-transparent text-xl sm:text-5xl bg-clip-text bg-gradient-to-r from-fuchsia-300 to-emerald-400"
      >
        Magisk AI
      </h1>

      <!-- <a
        class="sm:text-xs text-[0.5rem] mx-auto sm:mt-2 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-300"
        href="https://beta.openai.com/docs"
        target="_blank"
        >OpenAI API Dokumentasjon</a>>
      > -->
      <div class="flex flex-row justify-center">
        <!-- <label class="cursor-pointer label">
          <span class="label-text mr-2 text-accent">Tekst</span>
          <input
            @click="handleCheckboxClick"
            class="toggle toggle-accent"
            type="checkbox"
          />
        </label> -->
        <div
          class="flex items-center flex-row space-x-3 bg-gray-700 p-2 rounded-md sm:mt-4 sm:mb-4 h-16 mt-2 mb-2"
        >
          <span class="sm:text-lg text-xs sm:mr-4 text-lime-300">
            Hva trenger du hjelp til?</span
          >
          <button
            @click="(cv = true), (text = false), (image = true)"
            class="px-4 text-md py-1 rounded-md bg-gray-900 cursor-pointer hover:bg-opacity-70"
            :class="
              cv && 'text-lime-300 outline-lime-800 outline outline-[0.02rem]  '
            "
          >
            CV
            <span class="text-[0.6rem] absolute text-red-300 -ml-7 -mt-1.5"
              >Ongoing</span
            >
          </button>
          <button
            @click="(text = true), (cv = false), (image = true)"
            class="px-4 text-md py-1 rounded-md bg-gray-900 cursor-pointer hover:bg-opacity-70"
            :class="
              text &&
              'text-lime-300  outline-lime-800 outline outline-[0.02rem] '
            "
          >
            Tekst
          </button>

          <button
            @click="(image = false), (cv = false), (text = false)"
            class="px-4 text-md py-1 rounded-md bg-gray-900 cursor-pointer hover:bg-opacity-70"
            :class="
              !image &&
              'text-lime-300  outline-lime-800 outline outline-[0.02rem] '
            "
          >
            Bilde
          </button>
          <button
            class="px-4 text-md py-1 rounded-md bg-gray-900 cursor-pointer hover:bg-opacity-70"
            :class="
              avatar &&
              'text-lime-300  outline-lime-800 outline outline-[0.02rem] '
            "
          >
            Avatar
            <span class="text-[0.6rem] absolute text-red-300 -ml-8 -mt-1"
              >Comming</span
            >
          </button>
        </div>
      </div>

      <div
        class="flex flex-col justify-center w-full"
        :class="(showRef = cv) && ' flex-col-reverse'"
      >
        <Transition :class="(showRef = cv) && 'order-3'">
          <ViewImgAi v-if="(showRef = !image)" />
        </Transition>
        <Transition :class="(showRef = cv) && 'order-2'">
          <ViewTextAi v-if="(showRef = text)" />
        </Transition>
        <Transition :class="(showRef = cv) && 'order-1'">
          <ViewCV v-if="(showRef = cv)" />
        </Transition>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import ViewTextAi from "@/components/ViewTextAi.vue";
import ViewImgAi from "@/components/ViewImgAi.vue";
import ViewCV from "@/components/ViewCV.vue";

const text = ref(true);
const image = ref(true);
const cv = ref(false);
const avatar = ref(false);

const showRef = computed(() => {
  if ((cv = true)) return "cv";
  else if ((image = true)) return "image";
  else return "text";
});
const isChecked = ref(false);
const handleCheckboxClick = (event) => {
  if (event.target.checked) {
    isChecked.value = true;
  } else {
    isChecked.value = false;
  }
};
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease-out;
  flex-direction: column-reverse;
  justify-self: start;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  justify-self: start;
}
</style>
