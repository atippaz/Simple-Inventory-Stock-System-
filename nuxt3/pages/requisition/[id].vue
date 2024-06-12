<template>
  <div>
    <div class="px-10 pt-6">
      <a
        href="/receipt"
        class="rounded-full shadow-md bg-blue-700 text-white px-4 py-2"
      >
        back
      </a>
    </div>
    <div v-if="pending && skuData == null">loading . . .</div>
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
        <div><b>QTY</b> : {{ skuData.qty }}</div>
        <div><b>Total Cost</b> : {{ skuData.cost }}</div>
        <div><b>Total Cost Average Per Price</b> : {{ skuData.total }}</div>
      </template>
    </BlockContent>
  </div>
</template>
<script lang="ts" setup>
export interface RequisitionDetail {
  category: string;
  created_date: string;
  description: string;
  product_description: string;
  product_id: number;
  product_name: string;
  requisition_id: number;
  sku_description: string;
  sku_id: string;
  title: string;
  items: Item[];
}

export interface Item {
  batch_id: number;
  qty: number;
  cost: number;
}
const route = useRoute();
const id = route.params.id;
const { data, pending } = useLazyFetch<RequisitionDetail>(
  `http://localhost:5000/requisition/${id}`
);
const skuData = computed(() => {
  if (!data.value) return data.value as null;
  const qty = data.value.items.reduce((x, y) => x + y.qty, 0);
  const cost = data.value.items
    .map((x) => x.qty * x.cost)
    .reduce((x, y) => x + y, 0);
  return {
    qty,
    cost,
    total: cost / qty,
  };
});
console.log(route.params.id);
</script>
