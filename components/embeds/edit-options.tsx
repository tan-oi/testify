"use client";

import { useStyleStore } from "@/lib/store/embedStore";
import { Checkbox } from "../ui/checkbox";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectGroup, SelectItem
} from "../ui/select";
import { alignOptions,colorPalette,gradientPalette,fontSizeLabels, fontOptions } from "@/lib/constant";
import { FontSizeKey } from "@/lib/types";


export function EditDesignOption() {
  const { styles, updateContentStyle } = useStyleStore();

  const handleAlignChange = (values: { align: string; bold: boolean }) => {
    console.log(values);
    updateContentStyle("textAlign", values.align);
    updateContentStyle("fontBold", values.bold);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Text Alignment & Style</Label>
        <p className="text-xs text-muted-foreground mb-3">
          Choose how your testimonial text is aligned and styled
        </p>
        <div className="grid grid-cols-1 gap-3">
          {alignOptions.map((item, i) => (
            <div key={i} className="flex items-center space-x-2">
              <Checkbox
                id={item.label}
                checked={
                  styles.content.textAlign === item.values.align &&
                  styles.content.fontBold === item.values.bold
                }
                onCheckedChange={() => handleAlignChange(item.values)}
              />
              <Label htmlFor={item.label} className="text-sm">{item.label}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function EditBorderOption() {
  const { styles, updateContentStyle, updateWrapperStyle } = useStyleStore();

  const border = styles.content.border;
  const updatedBorder = () => {
    updateContentStyle("border", !border);
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm font-medium">Show Border</Label>
            <p className="text-xs text-muted-foreground">Add a border around your testimonial</p>
          </div>
          <Switch id="border" checked={border} onCheckedChange={updatedBorder} />
        </div>
      </div>

      {border && (
        <>
          <div className="space-y-3">
            <Label className="text-sm font-medium">Border Radius</Label>
            <RadioGroup
              value={styles.content.borderRadius}
              onValueChange={(value) => updateContentStyle("borderRadius", value)}
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0px" id="none" />
                  <Label htmlFor="none" className="text-sm">None</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="4px" id="small" />
                  <Label htmlFor="small" className="text-sm">Small</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="8px" id="medium" />
                  <Label htmlFor="medium" className="text-sm">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="16px" id="large" />
                  <Label htmlFor="large" className="text-sm">Large</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Border Width</Label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min={0}
                max={30}
                className="w-16 h-9 px-3 text-sm border rounded-md bg-background"
                defaultValue={parseInt(styles.content.borderWidth)}
                onChange={(e) =>
                  border && updateContentStyle("borderWidth", e.target.value + "px")
                }
              />
              <span className="text-sm text-muted-foreground">px</span>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Border Color</Label>
            <div className="grid grid-cols-6 gap-2">
              {colorPalette.map((color) => (
                <button
                  key={color}
                  className={`h-8 w-8 rounded-md border-2 transition-all ${
                    styles.content.borderColor === color
                      ? `border-foreground ring-2 ring-primary/20`
                      : `border-border hover:border-foreground/50`
                  }`}
                  style={{ background: color }}
                  onClick={() =>
                    updateContentStyle("borderColor", color)
                  }
                  title={color}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function EditBackgroundOption() {
  const { styles, updateWrapperStyle, updateContentStyle } = useStyleStore();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="text-sm font-medium">Background Style</Label>
        <Tabs defaultValue="solid" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              onClick={() => updateWrapperStyle("gradient", "")}
              value="solid"
            >
              Solid
            </TabsTrigger>
            <TabsTrigger
              onClick={() =>
                updateWrapperStyle("backgroundColor", "#ffffff")
              }
              value="gradient"
            >
              Gradient
            </TabsTrigger>
            <TabsTrigger
              value="transparent"
              onClick={() => {
                updateWrapperStyle("gradient", "");
                updateWrapperStyle("backgroundColor", "transparent");
              }}
            >
              Transparent
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="solid" className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-3 block">Background Colors</Label>
              <div className="grid grid-cols-6 gap-2">
                {colorPalette.map((color) => (
                  <button
                    key={color}
                    className={`h-8 w-8 rounded-md border-2 transition-all ${
                      styles.wrapper.backgroundColor === color
                        ? `border-foreground ring-2 ring-primary/20`
                        : `border-border hover:border-foreground/50`
                    }`}
                    style={{ background: color }}
                    onClick={() =>
                      updateWrapperStyle("backgroundColor", color)
                    }
                    title={color}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="gradient" className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-3 block">Gradient Backgrounds</Label>
              <div className="grid grid-cols-6 gap-2">
                {gradientPalette.map((gradient, index) => (
                  <button
                    key={index}
                    className={`h-8 w-8 rounded-md border-2 transition-all ${
                      styles.wrapper.gradient === gradient
                        ? `border-foreground ring-2 ring-primary/20`
                        : `border-border hover:border-foreground/50`
                    }`}
                    style={{ background: gradient }}
                    onClick={() => updateWrapperStyle("gradient", gradient)}
                    title={`Gradient ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-4">
        <Label className="text-sm font-medium">Card Background</Label>
        <Tabs defaultValue="solid">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="solid">
              Solid Color
            </TabsTrigger>
            <TabsTrigger
              onClick={() =>
                updateContentStyle("backgroundColor", "transparent")
              }
              value="transparent"
            >
              Transparent
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="solid" className="space-y-4">
            <div className="grid grid-cols-6 gap-2">
              {colorPalette.map((color) => (
                <button
                  key={color}
                  className={`h-8 w-8 rounded-md border-2 transition-all ${
                    styles.content.backgroundColor === color
                      ? `border-foreground ring-2 ring-primary/20`
                      : `border-border hover:border-foreground/50`
                  }`}
                  style={{ background: color }}
                  onClick={() =>
                    updateContentStyle("backgroundColor", color)
                  }
                  title={color}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export function EditFontOption() {
  const { styles, updateContentStyle } = useStyleStore();
  const handleValueChange = (value: string) => {
    updateContentStyle("fontSize", value);
  };

  const fontvalue = fontOptions.find((items) => (items.value === styles.content.fontFamily))
  
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-sm font-medium">Font Size</Label>
        <Select
          value={styles.content.fontSize}
          onValueChange={handleValueChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue>
              {fontSizeLabels[styles.content.fontSize as FontSizeKey]}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="12px">Extra small</SelectItem>
              <SelectItem value="14px">Small</SelectItem>
              <SelectItem value="16px">Base</SelectItem>
              <SelectItem value="18px">Large</SelectItem>
              <SelectItem value="20px">Extra large</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium">Font Family</Label>
        <Select
          value={styles.content.fontFamily}
          onValueChange={(value) => {
            updateContentStyle("fontFamily", value);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue>
              {fontvalue?.label}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {fontOptions.map((item, i) => (
              <SelectItem 
                key={item.label}
                value={item.value}
                style={{ fontFamily: item.value }}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium">Text Color</Label>
        <div className="grid grid-cols-6 gap-2">
          {colorPalette.map((color) => (
            <button
              key={color}
              className={`h-8 w-8 rounded-md border-2 transition-all ${
                styles.content.textColor === color
                  ? `border-foreground ring-2 ring-primary/20`
                  : `border-border hover:border-foreground/50`
              }`}
              style={{ background: color }}
              onClick={() =>
                updateContentStyle("textColor", color)
              }
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
