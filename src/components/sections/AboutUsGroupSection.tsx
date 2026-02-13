import { useState, useEffect, ComponentType } from "react";
import AboutUsSection from "./AboutUsSection";
import CoreFunctionsSection from "./CoreFunctionsSection";
import ServicesRolesSection from "./ServicesRolesSection";
import { getAboutUsSubSectionOrder } from "@/lib/api";

const subSectionMap: Record<string, ComponentType> = {
  about_us: AboutUsSection,
  core_functions: CoreFunctionsSection,
  services_roles: ServicesRolesSection,
};

const defaultSubSectionOrder = [
  "about_us",
  "core_functions",
  "services_roles",
];

const AboutUsGroupSection = () => {
  const [subOrder, setSubOrder] = useState<string[]>(defaultSubSectionOrder);

  useEffect(() => {
    async function fetchOrder() {
      const saved = await getAboutUsSubSectionOrder();
      if (saved && saved.length > 0) {
        const merged = [...saved];
        defaultSubSectionOrder.forEach((key) => {
          if (!merged.includes(key)) merged.push(key);
        });
        setSubOrder(merged);
      }
    }
    fetchOrder();
  }, []);

  return (
    <>
      {subOrder.map((key) => {
        const SubSection = subSectionMap[key];
        if (!SubSection) return null;
        return <SubSection key={key} />;
      })}
    </>
  );
};

export default AboutUsGroupSection;
