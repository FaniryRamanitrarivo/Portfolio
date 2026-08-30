import type { IconType } from "react-icons";
import {
  FiDatabase,
  FiLayout,
  FiServer,
  FiCloud,
  FiShield,
  FiTerminal,
  FiCpu,
  FiSmartphone,
  FiTool,
  FiGitBranch,
  FiBarChart2,
  FiUsers,
  FiZap,
  FiLock,
  FiSearch,
  FiSettings,
} from "react-icons/fi";
import { FaCode, FaReact, FaDocker } from "react-icons/fa6";
import { RiSpeedUpLine, RiGlobalLine } from "react-icons/ri";
import { GrDatabase } from "react-icons/gr";
import { TbApi } from "react-icons/tb";

/**
 * Curated set of icons selectable from the admin for Services/Skills.
 * Stored in the DB as the key (e.g. "FiDatabase"), resolved back to a
 * component here — keeps arbitrary code out of the DB while still letting
 * the admin pick a reasonably wide range of icons.
 */
export const ICON_OPTIONS = {
  FiDatabase,
  FaCode,
  RiSpeedUpLine,
  FiLayout,
  FiServer,
  GrDatabase,
  RiGlobalLine,
  FiCloud,
  FiShield,
  FiTerminal,
  FiCpu,
  FiSmartphone,
  FiTool,
  FiGitBranch,
  FiBarChart2,
  FiUsers,
  FiZap,
  FiLock,
  FiSearch,
  FiSettings,
  FaReact,
  FaDocker,
  TbApi,
} satisfies Record<string, IconType>;

export type IconKey = keyof typeof ICON_OPTIONS;

export const ICON_KEYS = Object.keys(ICON_OPTIONS) as [IconKey, ...IconKey[]];
