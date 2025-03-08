"use client";
import React, { useState } from "react";
import { cn } from "~/lib/utils";
import { RESUME_INFO, WorkExperience } from "~/data/resume";
import Link from "next/link";

export const Card = React.memo(
  ({
    experience,
    index,
    hovered,
    setHovered,
  }: {
    experience: WorkExperience;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg shadow-lg overflow-hidden h-60 md:h-96 w-full transition duration-500 ease-in-out transform hover:scale-105",
        hovered !== null &&
          hovered !== index &&
          "blur-sm scale-[0.98] opacity-70"
      )}
    >
      {/* Default view - job title and company */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200 text-center mb-2">
          {experience.company}
        </h3>
        <div className="text-lg font-medium text-blue-600 text-center">
          {experience.title}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {experience.dates}
        </div>
      </div>

      {/* Hover view - details */}
      <div
        className={cn(
          "absolute inset-0 bg-white dark:bg-gray-700 flex flex-col p-6 transition-all duration-300",
          hovered === index
            ? "opacity-100 transform-none"
            : "opacity-0 translate-y-8"
        )}
      >
        <h3 className="text-xl md:text-2xl font-semibold mb-1">
          {experience.url || experience.moreInfoLink ? (
            <Link
              href={experience.url || experience.moreInfoLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {experience.company}
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </Link>
          ) : (
            <span className="text-gray-900 dark:text-gray-200">
              {experience.company}
            </span>
          )}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {experience.dates}
        </p>
        <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-300 flex-1 overflow-y-auto">
          {experience.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>{bullet.content}</span>
            </li>
          ))}
        </ul>
        {(experience.moreInfoLink || experience.url) && (
          <Link
            href={experience.moreInfoLink || experience.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            Learn More
            <svg
              className="ml-1 w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        )}
      </div>
    </div>
  )
);

Card.displayName = "Card";

type Card = {
  title: string;
  src: string;
};

export function ExperienceCards() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="relative max-w-7xl mx-auto">
      <div className="mt-12 max-w-lg mx-auto grid gap-8  lg:grid-cols-3 md:max-w-none">
        {RESUME_INFO.experience
          .filter((experience) => !experience.hideFromResume)
          .map((experience, index) => (
            <Card
              key={experience.company}
              experience={experience}
              index={index}
              hovered={hovered}
              setHovered={setHovered}
            />
          ))}
      </div>
    </div>
  );
}
