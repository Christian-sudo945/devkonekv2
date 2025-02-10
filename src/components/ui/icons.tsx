import {
  Menu,
  HomeIcon,
  Users,
  Code2,
  ShoppingBag,
  MessageSquare,
  FolderKanban,
  Loader2,
  LucideProps,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebook } from "react-icons/fa";

export const Icons = {
  menu: Menu,
  feed: HomeIcon,
  developers: Users,
  codeHelp: Code2,
  marketplace: ShoppingBag,
  messages: MessageSquare,
  projects: FolderKanban,
  spinner: Loader2,
  google: FcGoogle,
  github: FaGithub,
  facebook: FaFacebook,
} as const;

export type IconKeys = keyof typeof Icons;
