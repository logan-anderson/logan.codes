import React from "react";
import { Projects } from "../pages/projects";
import Link from "next/link";

export const ProjectCard: React.FC<{ project: Projects }> = ({ project }) => {
  return (
    <div className=" cursor-pointer py-6 dark:text-gray-300 px-6 pb-10 transition duration-500 ease-in-out transform  hover:scale-105">
      <Link href={`/projects/${project.slug}`}>
        <div className="bg-white dark:bg-gray-700  relative block overflow-hidden rounded-lg border border-gray-100 dark:border-gray-800 p-4 sm:p-6 lg:p-8">
          <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r  from-green-300 via-blue-500 to-purple-600 dark:from-blue-600 dark:via-green-600 dark:to-purple-600"></span>

          <div className="sm:flex sm:justify-between sm:gap-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-200 sm:text-xl">
              {project.label}
            </h2>

            {project.imgUrl && (
              <img
                alt={project.label}
                src={project.imgUrl}
                className="h-56 rounded-lg object-cover shadow-sm mx-auto"
              />
            )}
          </div>

          <div className="mt-4">
            <p className="max-w-[40ch] text-lg text-gray-500 dark:text-gray-300 ">
              {project.excerpt}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};
