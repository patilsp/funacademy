"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export function RecentCourses() {
  return (
    <div className="space-y-4">
      <div className="flex items-center rounded border border-gray-200 p-4 transition-shadow hover:shadow-lg">
        <Avatar className="size-9">
          <AvatarImage src="/avatars/course1.png" alt="Course" />
          <AvatarFallback>MA</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Math Fun</p>
          <p className="text-sm text-muted-foreground">
            Taught by: Mr. Teacher 1
          </p>
        </div>
        <div className="ml-auto font-medium">
        <p className="text-xs text-muted-foreground">Level: Grade 2</p>
          3 hours ago</div>
      </div>

      <div className="flex items-center rounded border border-gray-200 p-4 transition-shadow hover:shadow-lg">
        <Avatar className="size-9">
          <AvatarImage src="/avatars/course2.png" alt="Course" />
          <AvatarFallback>LS</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Science Adventures</p>
          <p className="text-sm text-muted-foreground">
            Taught by: Ms. Teacher 2
          </p>
        </div>
        <div className="ml-auto font-medium">
        <p className="text-xs text-muted-foreground">Level: Grade 3</p>
          1 day ago</div>
      </div>

      <div className="flex items-center rounded border border-gray-200 p-4 transition-shadow hover:shadow-lg">
        <Avatar className="size-9">
          <AvatarImage src="/avatars/course3.png" alt="Course" />
          <AvatarFallback>LC</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Story Time</p>
          <p className="text-sm text-muted-foreground">
            Taught by: Mrs. Teacher 3
          </p>
          {/* <p className="text-xs text-muted-foreground">Level: Grade 1</p> */}
        </div>
        <div className="ml-auto font-medium">
        <p className="text-xs text-muted-foreground">Level: Grade 1</p>
        2 days ago</div>
      </div>

      <div className="flex items-center rounded border border-gray-200 p-4 transition-shadow hover:shadow-lg">
        <Avatar className="size-9">
          <AvatarImage src="/avatars/course4.png" alt="Course" />
          <AvatarFallback>AR</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Art & Crafts</p>
          <p className="text-sm text-muted-foreground">
            Taught by: Ms. Teacher 4
          </p>
        </div>
        <div className="ml-auto font-medium">
        <p className="text-xs text-muted-foreground">Level: Grade 4</p>
          4 days ago</div>
      </div>

      <div className="flex items-center rounded border border-gray-200 p-4 transition-shadow hover:shadow-lg">
        <Avatar className="size-9">
          <AvatarImage src="/avatars/course5.png" alt="Course" />
          <AvatarFallback>MU</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Music Basics</p>
          <p className="text-sm text-muted-foreground">
            Taught by: Mr. Teacher 5
          </p>
        </div>
        <div className="ml-auto font-medium">
        <p className="text-xs text-muted-foreground">Level: Grade 5</p>
          5 days ago</div>
      </div>
    </div>
  );
}
