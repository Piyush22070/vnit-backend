import { blogs } from './data';
import fs from "fs";
import path from "path";

// Define path to blogs.js file
const dataFilePath = path.join(process.cwd(), "src/app/api/data/data.js");

export async function GET() {
    return Response.json(blogs, { status: 200 });
}

export async function POST(req) {
    try {
        const newBlog = await req.json();
        const { title, content, name, category } = newBlog;

        if (!title || !content || !name || !category) {
            return Response.json({ 
                error: "Required fields missing", 
                requiredFields: ["title", "content", "name", "category"] 
            }, { status: 400 });
        }

        // Generate a new ID (find the highest existing ID and increment by 1)
        const highestId = blogs.reduce((max, blog) => Math.max(max, blog.id), 0);
        const newId = highestId + 1;

        // Create the new blog object with default values for optional fields
        const blogToAdd = {
            id: newId,
            title,
            content,
            name,
            category,
            image: newBlog.image || "https://example.com/blog-images/default.jpg",
            ownerImage: newBlog.ownerImage || "https://example.com/user-profiles/default.jpg",
            votes: {
                upvotes: 0,
                downvotes: 0
            },
            comments: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // Add the new blog to the array
        const updatedBlogs = [...blogs, blogToAdd];

        // Format the updated data file
        const updatedDataFile = `const blogs = ${JSON.stringify(updatedBlogs, null, 4)};\n\nexport { blogs };`;

        // Ensure the directory exists
        if (!fs.existsSync(path.dirname(dataFilePath))) {
            fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });
        }

        // Write the updated data to the file
        fs.writeFileSync(dataFilePath, updatedDataFile, "utf-8");

        return Response.json({ 
            message: "Blog created successfully", 
            blog: blogToAdd, 
            blogs: updatedBlogs 
        }, { status: 201 });
    } catch (error) {
        console.error("Error in POST function:", error);
        return Response.json({ 
            error: "Failed to create blog", 
            details: error.message 
        }, { status: 500 });
    }
}