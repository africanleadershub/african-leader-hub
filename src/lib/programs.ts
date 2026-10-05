export type ProgramApplicationMethod = "EMAIL" | "EXTERNAL_LINK" | "BUILT_IN_FORM";

export type ProgramApplicationState = {
  applicationsEnabled: boolean;
  applicationsOpenAt?: Date | string | null;
  applicationsCloseAt?: Date | string | null;
  applicationMethod?: ProgramApplicationMethod | null;
};

function asDate(value?: Date | string | null) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function isProgramAcceptingApplications(
  program: ProgramApplicationState,
  now = new Date()
) {
  if (!program.applicationsEnabled || !program.applicationMethod) return false;
  const opensAt = asDate(program.applicationsOpenAt);
  const closesAt = asDate(program.applicationsCloseAt);
  if (opensAt && now < opensAt) return false;
  if (closesAt && now > closesAt) return false;
  return true;
}

export function programApplyPath(slug: string) {
  return `/programs/${slug}/apply`;
}

export function programApplyAction(
  program: {
    slug: string;
    applicationMethod?: ProgramApplicationMethod | null;
    applicationUrl?: string | null;
    applicationEmail?: string | null;
  },
  fallbackEmail: string
) {
  switch (program.applicationMethod) {
    case "EMAIL":
      return {
        href: `mailto:${program.applicationEmail || fallbackEmail}`,
        label: "Apply via email",
        external: false,
      };
    case "EXTERNAL_LINK":
      return program.applicationUrl
        ? { href: program.applicationUrl, label: "Apply now", external: true }
        : null;
    case "BUILT_IN_FORM":
      return { href: programApplyPath(program.slug), label: "Apply now", external: false };
    default:
      return null;
  }
}

export function formatApplicationCloseDate(value?: Date | string | null) {
  const date = asDate(value);
  if (!date) return null;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
