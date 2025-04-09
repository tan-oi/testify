"use client";

import { useStyleStore } from "@/lib/store/embedStore";
import { Checkbox } from "../ui/checkbox";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const alignOptions = [
  { label: "Left aligned", values: { align: "left", bold: false } },
  { label: "Right aligned", values: { align: "right", bold: false } },
  { label: "Center aligned", values: { align: "center", bold: false } },
  { label: "Left aligned - Bold ", values: { align: "left", bold: true } },
  { label: "Center aligned - Bold ", values: { align: "center", bold: true } },
];

export function EditDesignOption() {
  const { styles, updateContentStyle } = useStyleStore();

  const handleAlignChange = (values: { align: string; bold: boolean }) => {
    console.log(values);
    updateContentStyle("textAlign", values.align);
    updateContentStyle("fontBold", values.bold);
  };

  return (
    <div>
      <h3 className="mb-2 font-semibold">Design options</h3>
      <div className="flex gap-4">
        {alignOptions.map((item, i) => (
          <div key={i} className="flex gap-1 items-center">
            <Checkbox
              id={item.label}
              checked={
                styles.content.textAlign === item.values.align &&
                styles.content.fontBold === item.values.bold
              }
              onCheckedChange={() => handleAlignChange(item.values)}
            />
            <label htmlFor={item.label}>{item.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export function EditBorderOption() {
  const { styles, updateContentStyle, updateWrapperStyle } = useStyleStore();

  const [enabled, setEnabled] = useState(true);

  const border = styles.content.border;
  const updatedBorder = () => {
    updateContentStyle("border", !border);
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Switch id="border" checked={border} onCheckedChange={updatedBorder} />

        <Label>Border?</Label>
      </div>

      <div className="flex flex-col">
        <h2>Border radius</h2>

        <RadioGroup value={styles.content.borderRadius} onValueChange={(value) => updateContentStyle("borderRadius",value)}>
          <RadioGroupItem value="0px" id="option-one" />
          <Label htmlFor="option-one">None</Label>
          <RadioGroupItem value="2px" id="option-one" />
          <Label htmlFor="option-one">Small</Label>
          <RadioGroupItem value="4px" id="option-one" />
          <Label htmlFor="option-one">Medium</Label>
          <RadioGroupItem value="16px" id="option-one" />
          <Label htmlFor="option-one">Large</Label>
        </RadioGroup>
      </div>

      {enabled && (
        <>
          <div>
            <p>Border width</p>
          </div>

          <div>
            <p>Border color</p>
          </div>
        </>
      )}
    </div>
  );
}
