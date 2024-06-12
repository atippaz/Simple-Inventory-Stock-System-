<template>
  <div v-if="pending || prepareData">loading . . .</div>
  <div v-else class="h-full flex flex-col">
    <div class="flex justify-end m-3">
      <!-- <a
        href="inventory/create"
        class="rounded-full text-white bg-blue-700 hover:bg-blue-800 focus:ring focus:ring-white focus:outline-none font-medium text-sm px-4 py-2 text-center"
      >
        New Product
      </a> -->
    </div>
    <div class="grid grid-cols-12 h-full" ref="detailElement">
      <div class="col-span-4 h-full p-2">
        <div
          :style="{
            height: '100%',
            maxHeight: `calc(${convasHeight}px - 1rem)`,
          }"
          class="overflow-auto scroll-smooth"
        >
          <div>
            <div
              v-for="product in data"
              @click="getProductData(product.product_id)"
              class="rounded-md border-slate-500 bg-white border-2 p-8 mb-2 cursor-pointer hover:bg-slate-200"
              :class="{
                'bg-slate-600':
                  selectProductData != null &&
                  selectProductData.product_id == product.product_id,
              }"
            >
              <div>product_name : {{ product.product_name }}</div>
              <div>category : {{ product.category }}</div>
              <div>description : {{ product.description }}</div>
              <div>qty : {{ product.sku.reduce((x, y) => x + y.qty, 0) }}</div>
              <div class="my-2">
                sku :
                <span
                  class="bg-slate-600 rounded-md px-2 text-white py-1 mr-2"
                  v-for="sku in product.sku.map((x) => x.sku_id)"
                >
                  {{ sku }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-8 h-full p-2">
        <div
          :style="{
            maxHeight: `calc(${convasHeight}px - 1rem)`,
            height: '100%',
          }"
          class="bg-white rounded-md border-slate-500 border-2 p-8 overflow-auto scroll-smooth"
        >
          <div v-if="selectProductData == null">
            <div class="text-3xl font-bold underline">
              Choose Item Your Left Hand Side
            </div>
          </div>
          <div v-else class="">
            <div class="flex justify-between">
              <div class="text-3xl font-bold underline">
                {{ selectProductData.product_name }}
              </div>
              <div>
                {{
                  new Date(
                    selectProductData.create_date.toString()
                  ).toLocaleDateString()
                }}
              </div>
            </div>
            <div><b>category</b> : {{ selectProductData.category }}</div>
            <div><b>description</b> : {{ selectProductData.description }}</div>
            <div>
              <b> total</b>
              :
              {{
                selectProductData.sku.reduce(
                  (i, j) => i + j.batch.reduce((x, y) => x + y.qty, 0),
                  0
                )
              }}
              items
            </div>
            <div class="mb-2">
              <b> sku Detail</b>
            </div>
            <div
              v-for="sku in selectProductData.sku"
              class="bg-slate-200 mb-4 border rounded-lg p-6 shadow-md"
            >
              <div class="flex justify-between">
                <div>
                  <div>sku Id : {{ sku.sku_id }}</div>
                  <div>description : {{ sku.description }}</div>
                  <div>
                    qty : {{ sku.batch.reduce((x, y) => x + y.qty, 0) }}
                  </div>
                </div>
                <div class="flex flex-col gap-2">
                  <button
                    @click="addSkuToStoreDialog(sku.sku_id)"
                    class="rounded-full text-white bg-blue-700 hover:bg-blue-800 focus:ring focus:ring-white focus:outline-none font-medium text-sm px-4 py-2 text-center"
                  >
                    Add to Stock
                  </button>
                  <button
                    @click="addSkuToExportDialog(sku.sku_id)"
                    class="rounded-full shadow-md bg-red-700 hover:bg-red-800 focus:ring focus:ring-white font-medium text-sm text-white px-4 py-2"
                  >
                    Check out
                  </button>
                </div>
              </div>
              <div class="mb-1">stock order</div>
              <div class="overflow-x-auto">
                <div class="flex w-full p-2 rounded-md">
                  <div v-for="(batch, index) in sku.batch">
                    <div
                      class="border-slate-700 rounded-md border mr-4 p-4 bg-slate-600 text-white"
                    >
                      <div>stock {{ index + 1 }} : {{ batch.qty }}</div>
                      <div>
                        stock cost :
                        {{ batch.cost }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-dialog
      v-model="dialogAdd"
      width="600"
      height="540"
      transition="dialog-bottom-transition"
    >
      <v-card width="600" height="540" rounded="lg">
        <v-card-title class="bg-gray-800 text-white">
          Add <b>{{ selectProductData.product_name }}</b> type
          <b>{{ insertFormReceiption.sku_id }}</b> to Store
        </v-card-title>

        <v-card-text class="text-h2">
          <v-row>
            <v-col>
              <v-text-field
                density="compact"
                label="title"
                v-model="insertFormReceiption.title"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                label="des"
                v-model="insertFormReceiption.description"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                density="compact"
                label="qty"
                type="number"
                v-model="insertFormReceiption.qty"
              />
            </v-col>
            <v-col>
              <v-text-field
                label="cost"
                type="number"
                density="compact"
                v-model="insertFormReceiption.cost"
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn text="Close" @click="closeImport"></v-btn>
          <v-btn text="Submit" @click="addSkuToStore"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogExport"
      width="600"
      height="540"
      transition="dialog-bottom-transition"
    >
      <v-card width="600" height="540" rounded="lg">
        <v-card-title class="bg-gray-800 text-white">
          Export <b>{{ selectProductData.product_name }}</b> type
          <b>{{ insertFormRequisition.sku_id }}</b>
        </v-card-title>

        <v-card-text class="text-h2">
          <v-row>
            <v-col>
              <v-text-field
                label="title"
                density="compact"
                v-model="insertFormRequisition.title"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                label="des"
                v-model="insertFormRequisition.description"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                label="qty"
                type="number"
                density="compact"
                v-model="insertFormRequisition.qty"
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn text="Close" @click="closeExport"></v-btn>
          <v-btn text="Submit" @click="addSkuToExport"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts" setup>
import type { Product } from "~/interface";
import { useRequisition } from "~/composables/requisition";
import { useReceiption } from "~/composables/receiption";
const route = useRoute();
const selectProductData = ref(null);
const queryStringObject = route.query;
const prepareData = ref(true);
const { data, pending } = useFetch<Product[]>("http://localhost:5000/product");

(async () => {
  prepareData.value = true;
  if (queryStringObject.productId) {
    await getProductData(parseInt(`${queryStringObject.productId}`));
  }
  prepareData.value = false;
})();

const detailElement = ref(null);
const convasHeight = ref(-1);
watch(
  () => detailElement.value,
  (e) => {
    convasHeight.value = e.clientHeight;
  },
  {
    deep: true,
  }
);
const {
  insertFormRequisition,
  insertRequisition,
  resetState: resetStateRequisition,
} = useRequisition();
const {
  insertReceiption,
  insertFormReceiption,
  resetState: resetStateReceiption,
} = useReceiption();

const dialogAdd = ref(false);
const dialogExport = ref(false);

async function getProductData(id: number) {
  if (
    selectProductData.value != null &&
    id === selectProductData.value.product_id
  )
    return;
  // @ts-ignore
  const product = await $fetch(`http://localhost:5000/product/${id}`);
  console.log(product);
  selectProductData.value = product;
}
function addSkuToStoreDialog(skuId: string) {
  insertFormReceiption.value.sku_id = skuId;
  insertFormReceiption.value.product_id = selectProductData.value.product_id;
  dialogAdd.value = true;
}
function addSkuToExportDialog(skuId: string) {
  insertFormRequisition.value.sku_id = skuId;
  insertFormRequisition.value.product_id = selectProductData.value.product_id;
  dialogExport.value = true;
}
async function addSkuToExport() {
  insertFormRequisition.value.qty = parseFloat(
    `${insertFormRequisition.value.qty}`
  );
  if (!(await insertRequisition())) return;

  const product = await $fetch(
    `http://localhost:5000/product/${insertFormRequisition.value.product_id}`
  );
  selectProductData.value = product;
  closeExport();
}
async function addSkuToStore() {
  insertFormReceiption.value.cost = parseFloat(
    `${insertFormReceiption.value.cost}`
  );
  insertFormReceiption.value.qty = parseFloat(
    `${insertFormReceiption.value.qty}`
  );
  if (!(await insertReceiption())) return;

  const product = await $fetch(
    `http://localhost:5000/product/${insertFormReceiption.value.product_id}`
  );
  console.log(product);
  selectProductData.value = product;
  closeImport();
}
function closeImport() {
  dialogAdd.value = false;
  resetStateReceiption();
}
function closeExport() {
  dialogExport.value = false;
  resetStateRequisition();
}
</script>
