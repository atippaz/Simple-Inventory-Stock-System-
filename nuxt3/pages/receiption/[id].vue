<template>
  <div>
    <div class="px-10 pt-6">
      <a
        href="/receiption"
        class="rounded-full shadow-md bg-blue-700 text-white px-4 py-2"
      >
        back
      </a>
    </div>
    <div v-if="pending">loading . . .</div>
    <BlockContent v-else>
      <template #title>{{ data.title }}</template>
      <template #content>
        <div><b>Description</b> : {{ data.description }}</div>
        <div><b>category</b> : {{ data.category }}</div>
        <div>
          <b> created at </b>:
          {{ new Date(data.created_date.toString()).toLocaleDateString() }}
        </div>
        <div><b>Specific Detail</b></div>
        <div><b>SKU</b> : {{ data.sku_id }}</div>
        <div><b>QTY</b> : {{ data.qty }}</div>
        <div><b>Cost</b> : {{ data.cost }}</div>
        <div><b>Total</b> : {{ data.qty * data.cost }}</div>
      </template>
    </BlockContent>
  </div>
</template>
<script lang="ts" setup>
import type { ReceiptDetail } from "~/interface";
const route = useRoute();
const id = route.params.id;
const { data, pending } = useLazyFetch<ReceiptDetail>(
  `http://localhost:5000/receipt/${id}`
);
console.log(route.params.id);
</script>
