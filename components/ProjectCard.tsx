import React from "react";
import { Projects } from "~/pages/projects";
import Link from "next/link";

export const ProjectCard: React.FC<{ project: Projects }> = ({ project }) => {
  return (
    <div className="p-4">
      <Link href={`/projects/${project.slug}`}>
        <div className="group relative h-full overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:border-gray-300 dark:border-gray-800 dark:bg-gray-800/50 dark:hover:border-gray-700">
          {project.imgUrl && (
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                alt={project.label}
                src={project.imgUrl}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          )}

          <div className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {project.label}
              </h2>
              {project.fromGithub && (
                <svg
                  className="h-5 w-5 text-gray-600 dark:text-gray-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              )}
            </div>

            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
              {project.excerpt}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};
