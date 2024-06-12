<template>
  <div class="w-full h-full px-6 py-6 flex flex-col">
    <div class="bg-gray-800 text-white p-4">
      <slot name="title"></slot>
    </div>
    <div class="bg-white p-8 h-full">
      <slot name="content"></slot>
    </div>
  </div>
</template>
