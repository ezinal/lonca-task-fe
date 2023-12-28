import React, { useEffect, useState } from "react";
import { Table } from "@mantine/core";
import axios from "../common/axios";

interface ProductSalesDto {
  name: string;
  salesCount: number;
}

interface Props {
  vendorId?: string;
}

export default function ProductSalesChart({ vendorId }: Props) {
  const [data, setData] = useState<ProductSalesDto[]>([]);

  useEffect(() => {
    if (vendorId) {
      axios
        .get<ProductSalesDto[]>(`/productSalesReport/${vendorId}`)
        .then((res) => {
          setData(res.data);
        });
    }
  }, [vendorId]);

  const rows = data.map((row) => (
    <Table.Tr key={row.name}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.salesCount}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table
      stickyHeader
      striped
      highlightOnHover
      withTableBorder
      withColumnBorders
      className="max-h-[300px] max-w-[450px]"
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Product</Table.Th>
          <Table.Th>Total Sales</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
