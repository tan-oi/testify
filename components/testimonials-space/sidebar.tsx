import { SidebarElement } from "./sidebar-element";
import { sidebarData } from "@/lib/constant";
export function SpaceSidebar() {
  return (
    <>
      <div className="h-full my-5 px-2 flex flex-col w-full">
        <div className="px-4 overflow-y-scroll no-scrollbar flex flex-col gap-6">
          {sidebarData.map((section, sectionIdx) =>
            Object.entries(section).map(([parent, items]) => (
              <div
                key={`${parent}-${sectionIdx}`}
                className="flex flex-col gap-2 justify-start"
              >
                <div>
                  <h2 className="text-lg font-bold">{parent}</h2>
                </div>
                <div className="flex flex-col gap-1">
                  {items.map((item, itemIdx) => (
                    <SidebarElement key={item.viewName} {...item} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
