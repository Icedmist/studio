"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { COURSE_CATEGORIES, COURSE_LEVELS } from "@/lib/constants";
import { Search } from "lucide-react";

export function CourseFilter() {
  return (
    <div className="p-4 rounded-lg bg-card/60 backdrop-blur-sm border border-border/50 flex flex-col md:flex-row gap-4 items-center">
      <div className="w-full md:flex-grow">
        <Input
          icon={<Search />}
          placeholder="Search for courses..."
          className="bg-background/80"
        />
      </div>
      <div className="w-full md:w-auto">
        <Select>
          <SelectTrigger className="w-full md:w-[200px] bg-background/80">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {COURSE_CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-full md:w-auto">
        <Select>
          <SelectTrigger className="w-full md:w-[180px] bg-background/80">
            <SelectValue placeholder="All Levels" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            {COURSE_LEVELS.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
