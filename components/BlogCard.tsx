import React from 'react'
import Link from "next/link";
import { Post } from '../interfaces'

interface Props {
  post: Post
  small?: Boolean
}

const navBar = ({ post, small = false }: Props) => {
  return (
    <div className={`w-full lg:w-1/${small ? "3" : "1"} px-4 mb-5`}>
      <div className="h-full pb-8 rounded-lg shadow-md hover:shadow-lg ">
        <Link href={`blog/${post.fileName}`}>
          <a>
            <img className="mb-4" src="placeholders/pictures/work.jpg" alt="" />
            <div className="px-6">
              <small>{`${post.date} | ${post.author}`}</small>
              <h3 className="text-xl my-3 font-heading">{post.title}</h3>
              <p className="text-gray-500">{post.description}</p>
            </div>
          </a>
        </Link>
      </div>
    </div>
  )
};

export default navBar;
