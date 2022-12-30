<template>
  <div class="sm:w-[45rem] mx-auto">
    <div
      class="rounded-xl w-full sm:mt-3 mt-1 bg-gradient-to-r p-[0.1rem] from-teal-500 via-orange-300 to-fuchsia-400"
    >
      <div class="bg-gray-800 text-white rounded-lg">
        <section class="p-3 sm:p-5">
          <div class="p-1 rounded-md">
            <form id="image-formtwo" class="flex flex-col form-control">
              <h1
                class="mx-auto text-xl sm:text-2xl sm:mt-2 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-600 mb-3"
              >
                CV
              </h1>
              <div class="flex flex-col indicator w-full z-45">
                <Transition>
                  <svg
                    v-if="inputValue"
                    @click="resetText()"
                    xmlns="http://www.w3.org/2000/svg"
                    class="cursor-pointer hover:opacity-50 transition-all duration-300 indicator-item mt-[3.3rem] mr-[0.85rem] text-red-400 icon icon-tabler icon-tabler-backspace"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M20 6a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-11l-5 -5a1.5 1.5 0 0 1 0 -2l5 -5z"
                    ></path>
                    <path d="M12 10l4 4m0 -4l-4 4"></path></svg
                ></Transition>
                <input
                  style="overflow: hidden"
                  type="text"
                  ref="myinput"
                  v-model="inputValue"
                  id="inputText"
                  class="input w-full outline outline-cyan-300 mb-3 placeholder-cyan-300 mt-4"
                  placeholder="Stillings beskrivelse...."
                />
                <input
                  style="overflow: hidden"
                  type="text"
                  ref="myinput"
                  v-model="inputValue"
                  id="inputText"
                  class="input w-full outline outline-cyan-300 mb-3 placeholder-cyan-300 mt-4"
                  placeholder="Stillings beskrivelse...."
                />
                <input
                  style="overflow: hidden"
                  type="text"
                  ref="myinput"
                  v-model="inputValue"
                  id="inputText"
                  class="input w-full outline outline-cyan-300 mb-3 placeholder-cyan-300 mt-4"
                  placeholder="Stillings beskrivelse...."
                />

                <!-- size -->
                <div class="form-control"></div>
              </div>
              <button
                type="submit"
                class="btn bg-fuchsia-500 border-4 border-black text-black hover:bg-fuchsia-300 mt-2"
              >
                Send inn⌛
              </button>
            </form>
            <div
              class="mx-auto transition-all duration-700 flex justify-center"
            >
              <div
                class="mt-10 absolute radial-progress spinner text-pink-400 my-6 animate-spin invisible"
                style="--value: 50; --size: 12rem; --thickness: 4px"
              ></div>
              <div class="pl-[0.7rem] pt-3">
                <ul
                  v-for="text in textResponseVue"
                  class="list-disc list-outside"
                >
                  <li
                    class="text-gray-300 sm:w-[40rem] h-full sm:text-md text-base w-full leading-[1.3rem] sm:leading-6 mb-2"
                  >
                    {{ text }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <!-- <h1 class="classList">{{ textResponseVue }}</h1>
    <button class="btn" @click="resetText">A</button>
    <button class="btn" @click="removeClass">R</button> -->
  </div>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
// const classList = ref(["text-teal-300"]);

// const addClass = () => {
//   classList.value.push("text-red-500 invisible");
//   classList.value.push("text-2xl");
// };
// const removeClass = () => {
//   classList.value = classList.value.filter(
//     (c) => c !== "text-red-500 invisible"
//   );
//   classList.value = classList.value.filter((c) => c !== "text-2xl");
//   classList.value = classList.value.filter((c) => c !== "invisible");
// };
const myinput = ref(null);
const inputValue = ref("");
const inputValue1 = ref("");
const inputValue2 = ref("");

const resetText = () => {
  inputValue.value = "";
  myinput.value.focus();
};

const textResponseVue2 = ref();
const textResponseVue = ref();
// const textResponseVue3 = ref([
//   "",
//   "1. Lær om økonomi. Det er viktig å ha en god forst…, slik at du kan ta bedre beslutninger om penger.",
//   "2. Lag et budsjett og følg det. Dette vil hjelpe d…u har til rådighet og hvordan du best bruker dem.",
//   "3. Spar penger. Prøv å spare så mye som mulig, sli…tår eller når du trenger å kjøpe noe som er dyrt.",
//   "4. Bruk kredittkort med forsiktighet. Kredittkort …uker mer enn det du har råd til å betale tilbake.",
//   "5. Investér pengene dine smartere. Prøv å finne in…r penger over tid uten å risikere alt på en gang.",
// ]);
// const textResponseVue = textResponseVue3.value.map((s) => s.slice(3)).slice(1);
function onSubmitTwo(e) {
  e.preventDefault();

  textResponseVue.value = "";
  // document.querySelector("#image").src = "";

  //   const inputText = document.querySelector("#inputText").value;
  const inputText = inputValue.value;

  if (inputText === "") {
    alert("Please add some text for question");
    return;
  }

  generateTextRequest(inputValue.value);
}

// TEXT REQUEST NEW
async function generateTextRequest(inputText) {
  try {
    showSpinner();

    const response = await fetch("/openai/generatetext", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputText,
      }),
    });

    if (!response.ok) {
      removeSpinner();
      throw new Error("That image could not be generated");
    }

    const data = await response.json();
    console.log(data);

    const content = await data.data
      .split("\n\n")
      //   .map((s) => s.slice(3))
      .slice(1);

    // const content = [
    //   "",
    //   "1. Lær om økonomi. Det er viktig å ha en god forst…, slik at du kan ta bedre beslutninger om penger.",
    //   "2. Lag et budsjett og følg det. Dette vil hjelpe d…u har til rådighet og hvordan du best bruker dem.",
    //   "3. Spar penger. Prøv å spare så mye som mulig, sli…tår eller når du trenger å kjøpe noe som er dyrt.",
    //   "4. Bruk kredittkort med forsiktighet. Kredittkort …uker mer enn det du har råd til å betale tilbake.",
    //   "5. Investér pengene dine smartere. Prøv å finne in…r penger over tid uten å risikere alt på en gang.",
    // ];

    // let globArr = [];
    // let arr = data.data;
    // let answ = arr.split("\n\n");
    // answ.forEach(function (obj) {
    //   globArr.push(parseInt(obj, 10));
    // });
    // console.log(globArr);
    // console.log("content", content);

    // const textResponse = data.data;
    textResponseVue.value = content;

    // document.querySelector(".msgtwo").textContent = textResponse;

    removeSpinner();
  } catch (error) {
    textResponseVue.value = data.data;
    // document.querySelector(".msgtwo").textContent = error;
  }
}

function showSpinner() {
  document.querySelector(".spinner").classList.remove("invisible");
}

function removeSpinner() {
  document.querySelector(".spinner").classList.add("invisible");
}
onMounted(() => {
  document
    .querySelector("#image-formtwo")
    .addEventListener("submit", onSubmitTwo);
});
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.6s ease-out;
  flex-direction: column-reverse;
  justify-self: start;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  justify-self: start;
}
</style>
