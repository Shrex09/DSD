import {
  Shield,
  ShieldCheck,
  Factory,
  Home,
  Calendar,
  Eye,
  Car,
  Zap,
  UserCheck,
  Radio,
  Cpu,
  Award,
  Users,
  History,
  Briefcase,
  Clock,
  Star,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Terminal,
  ShieldAlert,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";

/**
 * Map of icon name strings to Lucide React icon components.
 * Add new icons here when needed by content config files.
 */
const ICON_MAP: Record<string, LucideIcon> = {
  Shield,
  ShieldCheck,
  Factory,
  Home,
  Calendar,
  Eye,
  Car,
  Zap,
  UserCheck,
  Radio,
  Cpu,
  Award,
  Users,
  History,
  Briefcase,
  Clock,
  Star,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Terminal,
  ShieldAlert,
  Menu,
  X,
};

/**
 * Resolves a string icon name to a Lucide React icon component.
 * Falls back to the Shield icon if the name is not registered.
 *
 * @param name - Icon name matching a key in ICON_MAP
 * @returns Lucide icon component
 */
export const resolveIcon = (name: string): LucideIcon => {
  return ICON_MAP[name] ?? Shield;
};
