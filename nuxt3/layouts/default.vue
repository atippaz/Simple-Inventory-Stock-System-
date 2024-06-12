<template>
  <div class="h-full flex flex-col bg-slate-200">
    <nav
      class="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="w-full flex flex-wrap items-center justify-between p-4">
        <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            class="h-8"
            alt="Flowbite Logo"
          />
          <span
            class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >Inventory</span
          >
        </a>
        <button
          @click="visible = !visible"
          type="button"
          class="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-hamburger"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          v-if="visible"
          class="w-full bg-slate-100 p-2 rounded-lg mt-4"
          id="navbar-hamburger"
        >
          <ul class="flex flex-col font-medium">
            <li class="border-b border-gray-800 -mx-2 pb-2">
              <NuxtLink to="/inventory" @click="visible = false">
                <div class="w-full mx-2">inventory</div>
              </NuxtLink>
            </li>
            <li class="border-b border-gray-800 -mx-2 py-2">
              <NuxtLink to="/receipt" @click="visible = false">
                <div class="w-full mx-2">receipt</div>
              </NuxtLink>
            </li>
            <li class="pt-2 -mx-2">
              <NuxtLink to="/requisition" @click="visible = false">
                <div class="w-full mx-2">requisition</div>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="h-full bg-slate-200">
      <slot class="bg-slate-200" />
    </div>
  </div>
</template>
<script lang="ts" setup>
const visible = ref(false);
</script>
