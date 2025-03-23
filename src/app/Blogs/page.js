import AddBlog from '../Components/AddBlog'
import BlogList from '../Components/BlogList'
export default function Blogs() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-2xl flex flex-col gap-3">
          <AddBlog />
          <BlogList />
        </div>
      </div>
    );
  }