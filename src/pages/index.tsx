import { useState } from "react";
import { Text } from "@mantine/core";
import SupplierSelect from "../components/SupplierSelect";
import MonthlySalesChart from "../components/MonthlySalesChart";
import ProductSalesChart from "../components/ProductSalesChart";

export default function IndexPage() {
  const [vendorId, setVendorId] = useState<string>();

  return (
    <div className="flex flex-col items-center min-h-screen px-4 pb-8">
      <div className="flex flex-row w-full justify-end py-3 px-6 m-4 bg-gray-500 rounded-lg">
        <SupplierSelect vendorId={vendorId} setVendorId={setVendorId} />
      </div>
      <div className="flex flex-col w-full justify-start px-12 pt-6">
        <div className="mb-6">
          <Text fw={500} fz={24} c="#202124" mb={12}>
            Monthly Sales Report
          </Text>
          <MonthlySalesChart vendorId={vendorId} />
        </div>
        <div>
          <Text fw={500} fz={24} c="#202124" mb={12}>
            Product Sales Report
          </Text>
          <ProductSalesChart vendorId={vendorId} />
        </div>
      </div>
    </div>
  );
}
