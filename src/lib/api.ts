import { supabase } from "./supabase";

// Types
export interface TeamMember {
  id: string;
  name: string;
  position: string;
  email: string;
  phone?: string;
  image?: string;
  department: string;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
}

export interface Training {
  id: string;
  title: string;
  description: string;
  date: string;
  start_time?: string;
  end_time?: string;
  training_type?: "online" | "in-person";
  venue?: string;
  status: "upcoming" | "conducted" | "cancelled";
  image?: string;
  participants?: number;
  poster_link?: string;
  training_details_link?: string;
  program_link?: string;
  created_at: string;
  updated_at: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: "document" | "video" | "link" | "tool";
  url: string;
  image?: string;
  created_at: string;
  updated_at: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  image?: string;
  date: string;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
}

// Team Members
export async function getTeamMembers(): Promise<TeamMember[]> {
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
  return data || [];
}

// Trainings
export async function getTrainings(): Promise<Training[]> {
  const { data, error } = await supabase
    .from("trainings")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching trainings:", error);
    return [];
  }
  return data || [];
}

export async function getUpcomingTrainings(): Promise<Training[]> {
  const { data, error } = await supabase
    .from("trainings")
    .select("*")
    .eq("status", "upcoming")
    .order("date", { ascending: true });

  if (error) {
    console.error("Error fetching upcoming trainings:", error);
    return [];
  }
  return data || [];
}

export async function getConductedTrainings(): Promise<Training[]> {
  const { data, error } = await supabase
    .from("trainings")
    .select("*")
    .eq("status", "conducted")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching conducted trainings:", error);
    return [];
  }
  return data || [];
}

// Resources
export async function getResources(): Promise<Resource[]> {
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .order("category", { ascending: true });

  if (error) {
    console.error("Error fetching resources:", error);
    return [];
  }
  return data || [];
}

// Activities (for homepage showcase)
export async function getActivities(): Promise<Activity[]> {
  const { data, error } = await supabase
    .from("homepage_activities")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching activities:", error);
    return [];
  }
  return data || [];
}

// Section Content
export interface SectionContent {
  id: string;
  section_key: string;
  title: string;
  subtitle?: string;
  content?: string;
  image_url?: string;
}

export async function getSectionContent(): Promise<
  Record<string, SectionContent>
> {
  const { data, error } = await supabase.from("section_content").select("*");

  if (error) {
    console.error("Error fetching section content:", error);
    return {};
  }

  const contentMap: Record<string, SectionContent> = {};
  data?.forEach((item) => {
    contentMap[item.section_key] = item;
  });
  return contentMap;
}

// Section Order
export async function getSectionOrder(): Promise<string[] | null> {
  const { data, error } = await supabase
    .from("section_content")
    .select("content")
    .eq("section_key", "section_order")
    .single();

  if (error || !data?.content) return null;
  try {
    return JSON.parse(data.content);
  } catch {
    return null;
  }
}

// About Us Sub-Section Order
export async function getAboutUsSubSectionOrder(): Promise<string[] | null> {
  const { data, error } = await supabase
    .from("section_content")
    .select("content")
    .eq("section_key", "about_us_subsection_order")
    .single();

  if (error || !data?.content) return null;
  try {
    return JSON.parse(data.content);
  } catch {
    return null;
  }
}

// Hotline Categories
export interface HotlineCategory {
  id: string;
  name: string;
  image_url?: string;
  display_order: number;
  status: string;
  created_at: string;
  updated_at: string;
}

// Hotline Contacts
export interface HotlineContact {
  id: string;
  category: string;
  name: string;
  email: string;
  campus?: string;
  display_order: number;
  status: string;
}

export async function getHotlineCategories(): Promise<HotlineCategory[]> {
  const { data, error } = await supabase
    .from("hotline_categories")
    .select("*")
    .eq("status", "active")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching hotline categories:", error);
    return [];
  }
  return data || [];
}

export async function getHotlineContacts(): Promise<HotlineContact[]> {
  const { data, error } = await supabase
    .from("hotline_contacts")
    .select("*")
    .eq("status", "active")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching hotline contacts:", error);
    return [];
  }
  return data || [];
}

// Coordinator Contact
export interface CoordinatorContact {
  id: string;
  name: string;
  title: string;
  email: string;
}

export async function getCoordinatorContact(): Promise<CoordinatorContact | null> {
  const { data, error } = await supabase
    .from("coordinator_contact")
    .select("*")
    .single();

  if (error) {
    console.error("Error fetching coordinator contact:", error);
    return null;
  }
  return data;
}

// Videos
export interface Video {
  id: string;
  youtube_id: string;
  title: string;
  channel?: string;
  display_order: number;
  status: string;
}

export async function getVideos(): Promise<Video[]> {
  const { data, error } = await supabase
    .from("videos")
    .select("*")
    .eq("status", "active")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
  return data || [];
}

// Downloadable Forms
export interface DownloadableForm {
  id: string;
  title: string;
  description?: string;
  url: string;
  icon: string;
  display_order: number;
  status: string;
}

export async function getDownloadableForms(): Promise<DownloadableForm[]> {
  const { data, error } = await supabase
    .from("downloadable_forms")
    .select("*")
    .eq("status", "active")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching downloadable forms:", error);
    return [];
  }
  return data || [];
}

// Feedback Config
export interface FeedbackConfig {
  id: string;
  form_url: string;
  button_text: string;
}

export async function getFeedbackConfig(): Promise<FeedbackConfig | null> {
  const { data, error } = await supabase
    .from("feedback_config")
    .select("*")
    .single();

  if (error) {
    console.error("Error fetching feedback config:", error);
    return null;
  }
  return data;
}

// Help Desk Config
export interface HelpDeskConfig {
  id: string;
  title: string;
  url: string;
}

export async function getHelpDeskConfig(): Promise<HelpDeskConfig | null> {
  const { data, error } = await supabase
    .from("help_desk_config")
    .select("*")
    .single();

  if (error) {
    console.error("Error fetching help desk config:", error);
    return null;
  }
  return data;
}

// About Us Content
export interface AboutUsContent {
  id: string;
  section_type: string;
  content: string;
  display_order: number;
}

export async function getAboutUsContent(): Promise<AboutUsContent[]> {
  const { data, error } = await supabase
    .from("about_us_content")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching about us content:", error);
    return [];
  }
  return data || [];
}

// Google Classroom
export interface GCGuideLink {
  id: string;
  section_id: string;
  title: string;
  url: string;
  display_order: number;
}

export interface GCGuideSection {
  id: string;
  role_id: string;
  title: string;
  display_order: number;
  links?: GCGuideLink[];
}

export interface GoogleClassroomRole {
  id: string;
  role_name: string;
  role_key: string;
  description: string;
  image_url?: string;
  color_gradient: string;
  display_order: number;
  status: string;
  sections?: GCGuideSection[];
}

export async function getGoogleClassroomRoles(): Promise<
  GoogleClassroomRole[]
> {
  const { data: roles, error: rolesError } = await supabase
    .from("google_classroom_roles")
    .select("*")
    .eq("status", "active")
    .order("display_order", { ascending: true });

  if (rolesError) {
    console.error("Error fetching google classroom roles:", rolesError);
    return [];
  }

  if (!roles || roles.length === 0) return [];

  // Fetch sections for all roles
  const { data: sections, error: sectionsError } = await supabase
    .from("gc_guide_sections")
    .select("*")
    .in(
      "role_id",
      roles.map((r) => r.id),
    )
    .order("display_order", { ascending: true });

  if (sectionsError) {
    console.error("Error fetching gc guide sections:", sectionsError);
  }

  // Fetch links for all sections
  const sectionIds = sections?.map((s) => s.id) || [];
  let links: GCGuideLink[] = [];

  if (sectionIds.length > 0) {
    const { data: linksData, error: linksError } = await supabase
      .from("gc_guide_links")
      .select("*")
      .in("section_id", sectionIds)
      .order("display_order", { ascending: true });

    if (linksError) {
      console.error("Error fetching gc guide links:", linksError);
    } else {
      links = linksData || [];
    }
  }

  // Organize data hierarchically
  const rolesWithData = roles.map((role) => {
    const roleSections = sections?.filter((s) => s.role_id === role.id) || [];
    const sectionsWithLinks = roleSections.map((section) => ({
      ...section,
      links: links.filter((l) => l.section_id === section.id),
    }));

    return {
      ...role,
      sections: sectionsWithLinks,
    };
  });

  return rolesWithData;
}

// Slider Images
export interface SliderImage {
  id: string;
  src: string;
  alt?: string;
  display_order: number;
  status: "active" | "inactive";
  show_in_hero: boolean;
  show_in_slider: boolean;
  created_at: string;
  updated_at: string;
}

export async function getSliderImages(): Promise<SliderImage[]> {
  const { data, error } = await supabase
    .from("slider_images")
    .select("*")
    .eq("status", "active")
    .eq("show_in_slider", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching slider images:", error);
    return [];
  }
  return data || [];
}

export async function getHeroImage(): Promise<string | null> {
  const { data, error } = await supabase
    .from("section_content")
    .select("image_url")
    .eq("section_key", "hero")
    .single();

  if (error || !data?.image_url) {
    return null;
  }
  return data.image_url;
}

export async function getHeroSliderImages(): Promise<SliderImage[]> {
  const { data, error } = await supabase
    .from("slider_images")
    .select("*")
    .eq("status", "active")
    .eq("show_in_hero", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching hero slider images:", error);
    return [];
  }
  return data || [];
}
