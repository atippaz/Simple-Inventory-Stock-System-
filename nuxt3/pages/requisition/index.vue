<template>
  <div class="m-4">
    <div class="overflow-x-auto shadow-md">
      <div class="flex items-center justify-between mb-2">
        <div>
          <input
            type="text"
            class="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Title"
          />
        </div>
        <a
          href="/requisition/create"
          class="rounded-full shadow-md bg-blue-700 text-white px-4 py-2"
        >
          Add Receiption
        </a>
      </div>
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Title</th>
            <th scope="col" class="px-6 py-3">description</th>
            <th scope="col" class="px-6 py-3">Qty</th>
            <th scope="col" class="px-6 py-3">Cost Pre Price Average</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="receipt in data"
            @click="openReceiptPage(receipt.requisition_id)"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
          >
            <td class="px-6 py-4">{{ receipt.title }}</td>
            <td class="px-6 py-4">{{ receipt.description }}</td>
            <td class="px-6 py-4">
              {{
                receipt.requisition_item
                  .map((x) => x.qty)
                  .reduce((x, y) => x + y, 0)
              }}
            </td>
            <td class="px-6 py-4">
              {{
                receipt.requisition_item
                  .map((x) => x.qty * parseFloat(x.cost))
                  .reduce((x, y) => x + y, 0) /
                receipt.requisition_item
                  .map((x) => x.qty)
                  .reduce((x, y) => x + y, 0)
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts" setup>
export interface Requisition {
  requisition_id: number;
  created_on: string;
  title: string;
  requisition_item: RequisitionItem[];
  description: string;
}

export interface RequisitionItem {
  requisition_item_id: number;
  requisition_id: number;
  batch_id: number;
  qty: number;
  cost: string;
}
const { data } = useLazyFetch<Requisition[]>(
  "http://localhost:5000/requisition"
);
const router = useRouter();
function openReceiptPage(receiptId: number) {
  console.log();
  router.push({ path: `requisition/${receiptId}` });
}
</script>
