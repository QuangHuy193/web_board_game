import bcrypt from "bcryptjs";

// test@gmail.com
async function main() {
  const hash = await bcrypt.hash(
    "Test123456",
    10
  );

  console.log(hash);
}

main();