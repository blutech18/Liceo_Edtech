import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { getSectionContent, SectionContent } from "@/lib/api";

// Default org chart image URL
const defaultOrgChartUrl =
  "https://lh3.googleusercontent.com/sitesv/AAzXCkdhv_E3RdH3ta_3sfOeQabc_kwyYTva-TN-6kf3_OiBMd-ExFiXITgGzNAbGUqgfXlv8pUeWZhyeHqvIV5SIi1be0BNwn_9c-ohKPR52jubJ_V6T7re6tzd5hjNuOWqTDVUtLnlw5NQvSwnITOGmpX4sdNe7s-oKFfmhP4iEXWNhLKIMi0BdOFMMOl9aqvHkRz6aFn7p3VmitfLCzheGnSs3LZ8P1QZBHPaBf4=w1280";

const OrgChartSection = () => {
  const [loading, setLoading] = useState(true);
  const [orgChartImage, setOrgChartImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const contentData = await getSectionContent();
      // Check for org chart image in about_us or feedback sections
      if (contentData.about_us?.image_url) {
        setOrgChartImage(contentData.about_us.image_url);
      } else if (contentData.feedback?.image_url) {
        setOrgChartImage(contentData.feedback.image_url);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <section
      className="py-16 sm:py-20"
      style={{ backgroundColor: "hsl(var(--bg-main))" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 animate-fade-up">
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-4"
            style={{ color: "#A01010" }}
          >
            Our Structure
          </p>
          <h2
            className="text-2xl sm:text-3xl font-bold mb-3"
            style={{ color: "hsl(var(--text-main))" }}
          >
            Organizational Chart
          </h2>
          <div
            className="w-16 h-1 mx-auto rounded-full"
            style={{ backgroundColor: "#A01010" }}
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2
              className="w-8 h-8 animate-spin"
              style={{ color: "#A01010" }}
            />
          </div>
        ) : (
          <div
            className="rounded-xl overflow-hidden animate-fade-up"
            style={{
              backgroundColor: "hsl(var(--bg-surface))",
              border: "1px solid #800000",
            }}
          >
            <div className="max-h-[400px] sm:max-h-[500px] md:max-h-[600px] overflow-hidden flex items-center justify-center p-4">
              <img
                src={orgChartImage || defaultOrgChartUrl}
                alt="EdTech Organizational Chart"
                className="w-full h-auto max-h-full object-contain rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OrgChartSection;
