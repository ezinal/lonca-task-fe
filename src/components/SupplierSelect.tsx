import { Combobox, Input, InputBase, useCombobox } from "@mantine/core";
import React, { useEffect, useMemo, useState } from "react";
import axios from "../common/axios";

export type Vendor = { _id: string; name: string };

interface Props {
  vendorId?: string;
  setVendorId?: (id: string) => void;
}

export default function SupplierSelect({ vendorId, setVendorId }: Props) {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const getVendorName = (id: string) => {
    return vendors.find((vendor) => vendor._id === id)?.name;
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get<Vendor[]>("/vendors/all")
      .then((res) => {
        setVendors(res.data);
        setVendorId?.(res.data[0]._id);
      })
      .finally(() => setLoading(false));
  }, [setVendorId]);

  const options = vendors.map((item, index) => (
    <Combobox.Option
      value={item._id}
      key={item._id}
      onMouseOver={() => combobox.selectOption(index)}
    >
      {item.name}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        setVendorId?.(val);
        combobox.closeDropdown();
      }}
      disabled={loading}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
        >
          {(vendorId && getVendorName(vendorId)) || (
            <Input.Placeholder>Change Supplier</Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown
        className="w-fit min-w-[150px] max-w-[300px]"
        onMouseLeave={() => combobox.resetSelectedOption()}
      >
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
