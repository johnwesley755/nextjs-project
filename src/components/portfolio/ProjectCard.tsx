"use client";

import React from "react";
import { ProjectItemData } from "@/data/projects";
import { ProjectImage } from "./ProjectImage";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  project: ProjectItemData;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      className={`w-full ${project.colSpanDesktop} group relative flex flex-col justify-between space-y-5`}
    >
      {/* Visual Image Presentation */}
      <ProjectImage
        src={project.imageSrc}
        alt={project.imageAlt}
        aspectRatio={project.aspectRatio}
        category={project.category}
        number={project.number}
      />

      {/* Project Metadata & Caption */}
      <div className="space-y-4 pt-1">
        {/* Top Header: Title, Year & Arrow */}
        <div className="flex items-baseline justify-between border-b border-[#292929] pb-3">
          <div className="flex items-baseline gap-3">
            <span className="font-grotesk text-sm font-semibold text-[#D7FF3F]">
              {project.number}
            </span>
            <h3 className="font-bebas text-3xl sm:text-4xl lg:text-5xl tracking-[0.02em] leading-none text-[#F2F0E9] group-hover:text-[#D7FF3F] transition-colors">
              {project.title}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-grotesk text-xs font-medium text-[#77776F]">
              {project.year}
            </span>
            <div className="w-7 h-7 rounded-full border border-[#292929] flex items-center justify-center text-[#77776F] group-hover:text-[#101010] group-hover:bg-[#D7FF3F] group-hover:border-[#D7FF3F] transition-colors duration-200">
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* Short Editorial Description */}
        <p className="font-grotesk text-sm sm:text-base text-[#A8A7A1] leading-relaxed max-w-xl">
          {project.description}
        </p>

        {/* Sub-Tags List */}
        <div className="flex flex-wrap items-center gap-2 pt-1 font-grotesk text-[11px] font-medium text-[#77776F]">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-[#161616] border border-[#292929] rounded-xs text-[#A8A7A1]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
