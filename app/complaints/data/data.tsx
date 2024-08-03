import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"

export const names = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
]

export const statuses = [
  {
    value: "Active",
    label: "Active",
    icon: CircleIcon,
  },
  {
    value: "Inactive",
    label: "Inactive",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "Warranty",
    label: "Warranty",
    icon: CheckCircledIcon,
  },
  {
    value: "Out Of Warranty",
    label: "Out Of Warranty",
    icon: StopwatchIcon,
  },

  {
    value: "Canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
  {
    value: "Completed",
    label: "Completed",
    icon: CheckCircledIcon,
  },
  {
    value: "Other",
    label: "Other",
    icon: CheckCircledIcon,
  },
]
