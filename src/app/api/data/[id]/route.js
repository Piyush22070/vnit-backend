import {blogs} from '../data'
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src/app/api/data/data.js"); // Path to blogs data file

export async function GET(req, { params }) {
    const { id } = params;
    const blog = blogs.find((blog) => blog.id === parseInt(id));

    if (blog) {
        return Response.json(blog, { status: 200 });
    } else {
        return Response.json({ error: "Blog not found" }, { status: 404 });
    }
}

export async function DELETE(req, { params }) {
    const { id } = params;
   // console.log(id)
    const blogIndex = blogs.findIndex((blog) => blog.id === parseInt(id));

    if (blogIndex === -1) {
        return Response.json({ error: "Blog not found" }, { status: 404 });
    }

    blogs.splice(blogIndex, 1);

    const updatedDataFile = `const blogs = ${JSON.stringify(blogs, null, 4)};\n\nexport { blogs };`;

    try {
        fs.writeFileSync(dataFilePath, updatedDataFile, "utf-8");
        return Response.json({ message: "Blog deleted successfully" }, { status: 200 });
    } catch (error) {
        return Response.json({ error: "Failed to update blogs file" }, { status: 500 });
    }
}

// Handle upvote/downvote operations
export async function PUT(req, { params }) {
    const { id } = params;
    const blogIndex = blogs.findIndex((blog) => blog.id === parseInt(id));
    
    if (blogIndex === -1) {
        return Response.json({ error: "Blog not found" }, { status: 404 });
    }
    
    try {
        const { action, commentId, comment } = await req.json();
        
        // Handle different actions
        if (action === "upvote" && !commentId) {
            blogs[blogIndex].votes.upvotes += 1;
        } else if (action === "downvote" && !commentId) {
            blogs[blogIndex].votes.downvotes += 1;
        } else if (commentId && (action === "upvote" || action === "downvote")) {
            // Handle comment votes
            const commentIndex = blogs[blogIndex].comments.findIndex(
                comment => comment.id === parseInt(commentId)
            );
            
            if (commentIndex === -1) {
                return Response.json({ error: "Comment not found" }, { status: 404 });
            }
            
            if (action === "upvote") {
                blogs[blogIndex].comments[commentIndex].votes.upvotes += 1;
            } else {
                blogs[blogIndex].comments[commentIndex].votes.downvotes += 1;
            }
        } else if (action === "addComment" && comment) {
            // Handle adding a new comment
            const newComment = {
                id: blogs[blogIndex].comments.length > 0 
                    ? Math.max(...blogs[blogIndex].comments.map(c => c.id)) + 1 
                    : 1,
                content: comment.content,
                author: comment.author,
                votes: {
                    upvotes: 0,
                    downvotes: 0
                },
                createdAt: new Date().toISOString()
            };
            
            blogs[blogIndex].comments.push(newComment);
        } else {
            return Response.json({ error: "Invalid action" }, { status: 400 });
        }
        
        const updatedDataFile = `const blogs = ${JSON.stringify(blogs, null, 4)};\n\nexport { blogs };`;
        
        fs.writeFileSync(dataFilePath, updatedDataFile, "utf-8");
        return Response.json({ 
            message: "Action completed successfully",
            blog: blogs[blogIndex]
        }, { status: 200 });
    } catch (error) {
        return Response.json({ 
            error: "Failed to process action", 
            details: error.message 
        }, { status: 500 });
    }
}