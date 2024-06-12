<template>
  <BlockContent>
    <template #title>Create A Requisition</template>
    <template #content>
      <v-select
        label="Select Product"
        :value="
          insertFormRequisition.product_id > 0
            ? insertFormRequisition.product_id
            : ''
        "
        :items="productDropdown"
        item-title="product_name"
        item-value="product_id"
        @update:modelValue="
          (e) => {
            getSkuDropdown(e);
          }
        "
      ></v-select>

      <v-select
        :items="skuDropdown"
        v-model="insertFormRequisition.sku_id"
        label="Select Sku"
        @update:modelValue="
          (e) => {
            insertFormRequisition.sku_id = e;
          }
        "
        :disabled="skuDropdown.length == 0"
      ></v-select>
      <div>
        <v-text-field
          label="title"
          density="compact"
          v-model="insertFormRequisition.title"
        ></v-text-field>
      </div>
      <div>
        <v-textarea
          label="description"
          v-model="insertFormRequisition.description"
        ></v-textarea>
      </div>

      <div>
        <v-text-field
          type="number"
          density="compact"
          v-model="insertFormRequisition.qty"
        ></v-text-field>
      </div>
      <div class="flex justify-end">
        <div class="flex gap-2">
          <button
            class="rounded-full shadow-md bg-red-700 hover:bg-red-800 focus:ring focus:ring-white font-medium text-sm text-white px-4 py-2"
            @click="router.back()"
          >
            close
          </button>
          <button
            class="rounded-full text-white bg-blue-700 hover:bg-blue-800 focus:ring focus:ring-white focus:outline-none font-medium text-sm px-4 py-2 text-center"
            @click="create"
          >
            submit
          </button>
        </div>
      </div>
    </template>
  </BlockContent>
</template>
<script lang="ts" setup>
import type { ProductDropdown } from "~/interface";
const router = useRouter();
const { insertFormRequisition, insertRequisition } = useRequisition();
const skuDropdown = ref<string[]>([]);
const { data: productDropdown } = useLazyFetch<ProductDropdown[]>(
  `http://localhost:5000/product/dropdown`
);
async function create() {
  insertFormRequisition.value.qty = parseFloat(
    `${insertFormRequisition.value.qty}`
  );
  const res = await insertRequisition();
  if (res != null) {
    router.push({ path: `/requisition/${res}` });
  }
}
async function getSkuDropdown(productId: number) {
  skuDropdown.value = [];
  insertFormRequisition.value.sku_id = null;
  insertFormRequisition.value.product_id = productId;
  const result = await $fetch<string[]>(
    `http://localhost:5000/sku/${productId}/dropdown`
  );
  skuDropdown.value = result;
}
</script>
