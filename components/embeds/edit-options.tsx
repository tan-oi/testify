"use client";

import { useStyleStore } from "@/lib/store/embedStore";
import { Checkbox } from "../ui/checkbox";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

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

        <RadioGroup
          value={styles.content.borderRadius}
          onValueChange={(value) => updateContentStyle("borderRadius", value)}
        >
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <RadioGroupItem value="0px" id="none" />
              <Label htmlFor="none">None</Label>
            </div>
            <div className="flex items-center gap-1">
              <RadioGroupItem value="4px" id="small" />
              <Label htmlFor="small">Small</Label>
            </div>
            <div className="flex items-center gap-1">
              <RadioGroupItem value="8px" id="medium" />
              <Label htmlFor="medium">Medium</Label>
            </div>
            <div className="flex items-center gap-1">
              <RadioGroupItem value="16px" id="large" />
              <Label htmlFor="large">Large</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h2>Border width/thickness</h2>
        <div className="flex items-center">
          <input
            type="number"
            min={0}
            max={30}
            className="text-white w-12"
            defaultValue={parseInt(styles.content.borderWidth)}
            onChange={(e) =>
              border && updateContentStyle("borderWidth", e.target.value + "px")
            }
          />
          <p className="rounded-r-lg bg-primary pl-2 pr-2 text-center text-white">
            px
          </p>
        </div>
      </div>

      <div>
        <h2>Border Color</h2>
        <div className="mb-4">
        
                <div className="flex flex-wrap gap-2 mb-2">
                  {colorPalette.slice(0, 6).map((color) => (
                    <button
                      key={color}
                      className={`h-8 w-8 rounded-md border-2 ${
                        styles.content.borderColor === color
                          ? `border-black`
                          : `border-gray-200`
                      }`}
                      style={{ background: color }}
                      onClick={() =>
                        updateContentStyle("borderColor", color)
                      }
                    />
                  ))}
                </div>
                <div className="flex gap-2 items-center">
                  {colorPalette.slice(6, 12).map((color) => (
                    <button
                      key={color}
                      className={`h-8 w-8 rounded-md border-2 ${
                        styles.content.borderColor === color
                          ? `border-black`
                          : `border-gray-200`
                      }`}
                      style={{ background: color }}
                      onClick={() =>
                        updateContentStyle("borderColor", color)
                      }
                    />
                  ))}
                </div>
              </div>
      </div>
    </div>
  );
}

export function EditBackgroundOption() {
  const { styles, updateWrapperStyle, updateContentStyle } = useStyleStore();

  return (
    <>
      <div>
        <div className="">
          <Tabs defaultValue="solid" className="">
            <div className="flex items-center gap-1">
              <h2 className="text-md">Edit Background Colors:</h2>
              <TabsList className="bg-transparent">
                <TabsTrigger
                  onClick={() => updateWrapperStyle("gradient", "")}
                  value="solid"
                  className="data-[state=active]:bg-muted data-[state=active]:shadow-none"
                >
                  Solid Color
                </TabsTrigger>
                <TabsTrigger
                  onClick={() =>
                    updateWrapperStyle("backgroundColor", "#ffffff")
                  }
                  value="gradient"
                  className="data-[state=active]:bg-muted data-[state=active]:shadow-none"
                >
                  Gradient
                </TabsTrigger>

                <TabsTrigger
                  value="transparent"
                  onClick={() => {
                    updateWrapperStyle("gradient", "");
                    updateWrapperStyle("backgroundColor", "#ffffff");
                  }}
                >
                  Transparent
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="solid">
              <div className="mb-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  {colorPalette.slice(0, 6).map((color) => (
                    <button
                      key={color}
                      className={`h-8 w-8 rounded-md border-2 ${
                        styles.wrapper.backgroundColor === color
                          ? `border-black`
                          : `border-gray-200`
                      }`}
                      style={{ background: color }}
                      onClick={() =>
                        updateWrapperStyle("backgroundColor", color)
                      }
                    />
                  ))}
                </div>
                <div className="flex gap-2 items-center">
                  {colorPalette.slice(6, 12).map((color) => (
                    <button
                      key={color}
                      className={`h-8 w-8 rounded-md border-2 ${
                        styles.wrapper.backgroundColor === color
                          ? `border-black`
                          : `border-gray-200`
                      }`}
                      style={{ background: color }}
                      onClick={() =>
                        updateWrapperStyle("backgroundColor", color)
                      }
                    />
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="gradient">
              <div className="mb-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  {gradientPalette.slice(0, 6).map((gradient, index) => (
                    <button
                      key={index}
                      className={`h-8 w-8 rounded-md border-2 ${
                        styles.wrapper.gradient === gradient
                          ? `border-black`
                          : `border-gray-200`
                      }`}
                      style={{ background: gradient }}
                      onClick={() => updateWrapperStyle("gradient", gradient)}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  {gradientPalette.slice(6, 12).map((gradient, index) => (
                    <button
                      key={index + 8}
                      className={`h-8 w-8 rounded-md border-2 ${
                        styles.wrapper.gradient === gradient
                          ? `border-black`
                          : `border-gray-200`
                      }`}
                      style={{ background: gradient }}
                      onClick={() => updateWrapperStyle("gradient", gradient)}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Tabs defaultValue="solid">
            <div className="flex items-center gap-1">
              <h2 className="text-md">Edit Card Colors:</h2>

              <TabsList className="bg-transparent">
                <TabsTrigger
                  // onClick={() => }
                  value="solid"
                  className="data-[state=active]:bg-muted data-[state=active]:shadow-none"
                >
                  Solid Color
                </TabsTrigger>
                <TabsTrigger
                  onClick={() =>
                    updateContentStyle("backgroundColor", "#ffffff")
                  }
                  value="transparent"
                  className="data-[state=active]:bg-muted data-[state=active]:shadow-none"
                >
                  Transparent
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="solid">
              <div className="mb-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  {colorPalette.slice(0, 6).map((color) => (
                    <button
                      key={color}
                      className={`h-8 w-8 rounded-md border-2 ${
                        styles.content.backgroundColor === color
                          ? `border-black`
                          : `border-gray-200`
                      }`}
                      style={{ background: color }}
                      onClick={() =>
                        updateContentStyle("backgroundColor", color)
                      }
                    />
                  ))}
                </div>
                <div className="flex gap-2 items-center">
                  {colorPalette.slice(6, 12).map((color) => (
                    <button
                      key={color}
                      className={`h-8 w-8 rounded-md border-2 ${
                        styles.content.backgroundColor === color
                          ? `border-black`
                          : `border-gray-200`
                      }`}
                      style={{ background: color }}
                      onClick={() =>
                        updateContentStyle("backgroundColor", color)
                      }
                    />
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export function EditFontOption() {
  const { styles, updateContentStyle } = useStyleStore();
  const handleValueChange = (value: string) => {
    updateContentStyle("fontSize", value);
  };

  const fontvalue = fontOptions.find((items) => (items.value === styles.content.fontFamily))
  return (
    <>
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-md">Font size</p>
          <Select
            value={styles.content.fontSize}
            onValueChange={handleValueChange}
          >
            <SelectTrigger className="w-[350px]">
              <SelectValue>
              {fontSizeLabels[styles.content.fontSize as FontSizeKey]}
               </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="hover:cursor-pointer text-sm font-thin">
                <SelectItem value="12px" className="hover:bg-white/5 rounded-md p-2">Extra small</SelectItem>
                <SelectItem value="14px"
                className="hover:bg-white/5 rounded-md p-2">Small</SelectItem>
                <SelectItem value="16px"
                className="hover:bg-white/5 rounded-md p-2">Base</SelectItem>
                <SelectItem value="18px"
                className="hover:bg-white/5 rounded-md p-2">Large</SelectItem>
                <SelectItem value="20px"
                className="hover:bg-white/5 rounded-md p-2">Extra large</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-4">
          <h2 className="text-base">Text color</h2>
                <div className="flex flex-wrap gap-2 mb-2">
                  {colorPalette.slice(0, 6).map((color) => (
                    <button
                      key={color}
                      className={`h-8 w-8 rounded-md border-2 ${
                        styles.content.textColor === color
                          ? `border-black`
                          : `border-gray-200`
                      }`}
                      style={{ background: color }}
                      onClick={() =>
                        updateContentStyle("textColor", color)
                      }
                    />
                  ))}
                </div>
                <div className="flex gap-2 items-center">
                  {colorPalette.slice(6, 12).map((color) => (
                    <button
                      key={color}
                      className={`h-8 w-8 rounded-md border-2 ${
                        styles.content.textColor === color
                          ? `border-black`
                          : `border-gray-200`
                      }`}
                      style={{ background: color }}
                      onClick={() =>
                        updateContentStyle("textColor", color)
                      }
                    />
                  ))}
                </div>
              </div>




              <div>
          <p className="text-md">Fonts</p>
          <Select
            value={styles.content.fontFamily}
            onValueChange={(value) => {
                updateContentStyle("fontFamily",value);
            }}
          >
            <SelectTrigger className="w-[350px]">
              <SelectValue>
                {fontvalue?.label}
               </SelectValue>
            </SelectTrigger>
            <SelectContent>
              
                {
                  fontOptions.map((item,i)=> (
                      <SelectItem key={item.label}
                      value={item.value}
                      style={{fontFamily : item.value}}>
                        {item.label}
                      </SelectItem>
                  ))
                }
           
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
}
