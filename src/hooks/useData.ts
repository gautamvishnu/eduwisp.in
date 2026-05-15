import { useQuery, useMutation } from "@tanstack/react-query";

export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  instructor: string;
  instructorBio?: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  lessonsCount: number;
  studentsCount: number;
  rating: number;
  reviewsCount: number;
  isFeatured: boolean;
  tags: string[];
  createdAt: string;
}

export interface Lesson {
  id: number;
  title: string;
  duration: string;
  isPreview: boolean;
}

export interface CurriculumSection {
  id: number;
  title: string;
  lessons: Lesson[];
}

export interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export type CourseDetail = Course & {
  curriculum?: CurriculumSection[];
  requirements?: string[];
  whatYouLearn?: string[];
  reviews?: Review[];
};

export interface PlatformStats {
  totalStudents: number;
  totalCourses: number;
  totalInstructors: number;
  totalCategories: number;
  satisfactionRate: number;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  author: string;
  authorImageUrl?: string;
  imageUrl: string;
  tags: string[];
  readTime: string;
  publishedAt: string;
}

export interface Career {
  id: number;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "remote";
  description: string;
  requirements: string[];
  benefits: string[];
  postedAt: string;
}

export interface OrderItem {
  courseId: number;
  course: Course;
  price: number;
}

export interface Order {
  id: number;
  status: "pending" | "paid" | "failed" | "cancelled";
  items: OrderItem[];
  total: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  createdAt: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  message: string;
  orderId: number;
  status: string;
}

const BASE = import.meta.env.BASE_URL || "/";

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}data/${path}`);
  if (!res.ok) throw new Error(`Failed to fetch ${path}`);
  return res.json();
}

let coursesCache: CourseDetail[] | null = null;
async function getCourses(): Promise<CourseDetail[]> {
  if (coursesCache) return coursesCache;
  coursesCache = await fetchJson<CourseDetail[]>("courses.json");
  return coursesCache;
}

export function useGetFeaturedCourses() {
  return useQuery({
    queryKey: ["featured-courses"],
    queryFn: async () => {
      const all = await getCourses();
      return all.filter((c) => c.isFeatured);
    },
  });
}

export function useGetCourseStats() {
  return useQuery({
    queryKey: ["course-stats"],
    queryFn: () => fetchJson<PlatformStats>("stats.json"),
  });
}

export function useListCourses(params?: {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["courses", params],
    queryFn: async () => {
      let courses = await getCourses();
      if (params?.category) {
        courses = courses.filter((c) => c.category === params.category);
      }
      if (params?.search) {
        const q = params.search.toLowerCase();
        courses = courses.filter(
          (c) =>
            c.title.toLowerCase().includes(q) ||
            c.description.toLowerCase().includes(q) ||
            c.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      const page = params?.page || 1;
      const limit = params?.limit || 12;
      const start = (page - 1) * limit;
      const paged = courses.slice(start, start + limit);
      return {
        courses: paged,
        total: courses.length,
        page,
        totalPages: Math.ceil(courses.length / limit),
      };
    },
  });
}

export function useGetCourse(id: string | number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      const all = await getCourses();
      const numId = typeof id === "string" ? parseInt(id, 10) : id;
      const course = all.find((c) => c.id === numId || c.slug === String(id));
      if (!course) throw new Error("Course not found");
      return course;
    },
    enabled: options?.enabled,
  });
}

export function useListBlogPosts(params?: { limit?: number; page?: number; tag?: string }) {
  return useQuery({
    queryKey: ["blog-posts", params],
    queryFn: async () => {
      let posts = await fetchJson<BlogPost[]>("blogs.json");
      if (params?.tag) {
        posts = posts.filter((p) => p.tags.includes(params.tag!));
      }
      return { posts, total: posts.length };
    },
  });
}

export function useGetBlogPost(id: string | number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["blog-post", id],
    queryFn: async () => {
      const posts = await fetchJson<BlogPost[]>("blogs.json");
      const numId = typeof id === "string" ? parseInt(id, 10) : id;
      const post = posts.find((p) => p.id === numId || p.slug === String(id));
      if (!post) throw new Error("Blog post not found");
      return post;
    },
    enabled: options?.enabled,
  });
}

export function useListCareers() {
  return useQuery({
    queryKey: ["careers"],
    queryFn: () => fetchJson<Career[]>("careers.json"),
  });
}

const ordersStore: Record<number, Order> = {};
let nextOrderId = 1;

export function useCreateOrder() {
  return useMutation({
    mutationFn: async (body: {
      customerName: string;
      customerEmail: string;
      customerPhone?: string;
      address?: string;
      city?: string;
      state?: string;
      zipCode?: string;
      country?: string;
      cartItems: { courseId: number; price: number }[];
    }) => {
      const allCourses = await getCourses();
      const items: OrderItem[] = body.cartItems.map((ci) => ({
        courseId: ci.courseId,
        course: allCourses.find((c) => c.id === ci.courseId)!,
        price: ci.price,
      }));
      const order: Order = {
        id: nextOrderId++,
        status: "pending",
        items,
        total: items.reduce((s, i) => s + i.price, 0),
        customerName: body.customerName,
        customerEmail: body.customerEmail,
        customerPhone: body.customerPhone,
        address: body.address,
        city: body.city,
        state: body.state,
        zipCode: body.zipCode,
        country: body.country,
        createdAt: new Date().toISOString(),
      };
      ordersStore[order.id] = order;
      return order;
    },
  });
}

export function useGetOrder(id: number | string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const numId = typeof id === "string" ? parseInt(id, 10) : id;
      const order = ordersStore[numId];
      if (!order) throw new Error("Order not found");
      return order;
    },
    enabled: options?.enabled,
    retry: false,
  });
}

export function useProcessPayment() {
  return useMutation({
    mutationFn: async (params: {
      orderId: number;
      data: {
        cardNumber: string;
        cardName: string;
        expiryMonth: string;
        expiryYear: string;
        cvv: string;
      };
    }): Promise<PaymentResult> => {
      await new Promise((r) => setTimeout(r, 1500));
      const order = ordersStore[params.orderId];
      if (order) {
        order.status = "paid";
      }
      return {
        success: true,
        transactionId: `TXN-${Date.now()}`,
        message: "Payment processed successfully",
        orderId: params.orderId,
        status: "paid",
      };
    },
  });
}
