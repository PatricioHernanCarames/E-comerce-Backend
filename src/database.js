import { connect } from "mongoose";

(async () => {
  try {
    const db = await connect(
      "mongodb+srv://PatricioHCarames:Back1234@backende-commerce.8rpdxkg.mongodb.net/products?retryWrites=true&w=majority"
    );
    console.log("db connected to ", db.connection.name);
  } catch (error) {
    console.log(error);
  }
})();
