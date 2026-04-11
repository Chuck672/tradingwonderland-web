import { db } from "./lib/db";
import { bbsPosts } from "./lib/schema/bbs";

async function main() {
  try {
    const user = await db.query.users.findFirst();
    if (!user) {
      console.log("No user found");
      process.exit(0);
    }

    const [result] = await db.insert(bbsPosts).values({
      userId: user.id,
      categoryId: 1,
      title: "Test Post with Images",
      content: "This is a test post with images",
      images: ["/uploads/bbs/test.jpg"],
    });
    console.log("Insert post with images result:", result);

  } catch (error) {
    console.error("Error:", error);
  }
  process.exit(0);
}
main();
