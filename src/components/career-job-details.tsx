import Link from "next/link";
import { Briefcase, Calendar, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function typeColor(type: string) {
  switch (type) {
    case "full-time":
      return "bg-green-600";
    case "part-time":
      return "bg-blue-600";
    case "contract":
      return "bg-purple-600";
    case "internship":
      return "bg-orange-600";
    default:
      return "bg-gray-600";
  }
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function CareerJobDetails({
  department,
  location,
  type,
  postedDate,
  applicationDeadline,
  applyHref,
}: {
  department: string;
  location: string;
  type: string;
  postedDate: string;
  applicationDeadline?: string;
  applyHref?: string;
}) {
  return (
    <Card className="bg-amber-900/10 lg:sticky lg:top-28">
      <CardHeader>
        <CardTitle className="text-xl">Job Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="mb-1 flex items-center text-gray-600">
            <Briefcase className="mr-2 h-4 w-4" />
            <span className="text-sm font-medium">Department</span>
          </div>
          <p className="font-semibold text-gray-900">{department}</p>
        </div>
        <div>
          <div className="mb-1 flex items-center text-gray-600">
            <MapPin className="mr-2 h-4 w-4" />
            <span className="text-sm font-medium">Location</span>
          </div>
          <p className="font-semibold text-gray-900">{location}</p>
        </div>
        <div>
          <div className="mb-1 flex items-center text-gray-600">
            <Clock className="mr-2 h-4 w-4" />
            <span className="text-sm font-medium">Type</span>
          </div>
          <Badge className={`${typeColor(type)} text-white`}>{type.replace("-", " ")}</Badge>
        </div>
        <div>
          <div className="mb-1 flex items-center text-gray-600">
            <Calendar className="mr-2 h-4 w-4" />
            <span className="text-sm font-medium">Posted</span>
          </div>
          <p className="font-semibold text-gray-900">{formatDate(postedDate)}</p>
        </div>
        {applicationDeadline ? (
          <div>
            <div className="mb-1 flex items-center text-gray-600">
              <Calendar className="mr-2 h-4 w-4" />
              <span className="text-sm font-medium">Application Deadline</span>
            </div>
            <p className="font-semibold text-gray-900">{formatDate(applicationDeadline)}</p>
          </div>
        ) : null}
        {applyHref ? (
          <Button asChild className="w-full rounded-full bg-[#8B4513] text-white hover:bg-[#6B3410]">
            <Link href={applyHref}>Apply for this role</Link>
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
}
