import type { InsertFormRequisition } from "~/interface";

export function useRequisition() {
  const insertFormRequisition = ref<InsertFormRequisition>({
    product_id: null,
    sku_id: null,
    qty: 0,
    title: "",
    description: "",
  });
  async function insertRequisition(): Promise<null | number> {
    if (
      Object.values(insertFormRequisition.value).some(
        (x) => x === null || x === "" || (typeof x === "number" && x <= 0)
      )
    ) {
      alert("เกิดข้อผิดพลาด");
      return null;
    }
    try {
      const res: number = await $fetch("http://localhost:5000/requisition", {
        method: "POST",
        body: { ...insertFormRequisition.value },
      });
      return res;
    } catch (ex) {
      console.log(ex);
      alert("เกิดข้อผิดพลาด");
      return null;
    }
  }
  function resetState() {
    insertFormRequisition.value = {
      product_id: null,
      sku_id: null,
      qty: 0,
      title: "",
      description: "",
    };
  }
  return {
    insertFormRequisition,
    insertRequisition,
    resetState,
  };
}
